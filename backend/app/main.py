"""
Flora API — the AI backend behind the "Plant Care Assistant" chat in
Paradise Nursery.

Pipeline: React (FloraChat.jsx) -> this API -> RAG retrieval (Chroma,
multilingual embeddings) -> LLM (Groq or Ollama) -> validated,
catalog-grounded recommendation -> JSON back to React.

Run locally:
    uvicorn app.main:app --reload --port 8000
"""
import json
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import llm
from .catalog import catalog_names_list, name_to_department
from .config import settings
from .retrieval import retrieve
from .schemas import DiagnoseRequest, DiagnoseResponse

logger = logging.getLogger("flora")
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Flora Plant Care Assistant API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _build_prompt(message: str, kb_entries: list[dict]) -> str:
    context_blocks = []
    for entry in kb_entries:
        causes = "; ".join(
            f"{c['cause_en']} / {c['cause_vi']} ({c['likelihood']})" for c in entry["causes"]
        )
        care_vi = "; ".join(entry["care_steps_vi"])
        care_en = "; ".join(entry["care_steps_en"])
        items = ", ".join(entry["suited_items"])
        context_blocks.append(
            f"Symptom: {', '.join(entry['symptom_en'])} / {', '.join(entry['symptom_vi'])}\n"
            f"Likely causes: {causes}\n"
            f"Care steps (EN): {care_en}\n"
            f"Care steps (VI): {care_vi}\n"
            f"Suited products: {items}"
        )
    context = "\n\n".join(context_blocks) if context_blocks else "(no close match found)"
    valid_names = ", ".join(catalog_names_list())

    return (
        f'User message: "{message}"\n\n'
        f"Relevant knowledge base entries:\n{context}\n\n"
        f"Valid product names (use ONLY these, exactly as written):\n{valid_names}\n\n"
        "Respond with a JSON object of this exact shape:\n"
        "{\n"
        '  "diagnosis": [{"cause": "...", "likelihood": "high|medium|low"}],\n'
        '  "care_steps": ["...", "..."],\n'
        '  "recommended_items": [{"name": "...", "reason": "..."}]\n'
        "}"
    )


def _validate_recommendations(raw_items: list[dict]) -> list[dict]:
    """Drop anything the LLM invented that isn't actually in the catalog."""
    names_map = name_to_department()
    validated = []
    for item in raw_items or []:
        name = item.get("name")
        if name in names_map:
            validated.append(
                {"name": name, "department": names_map[name], "reason": item.get("reason", "")}
            )
    return validated


def _fallback_from_kb(kb_entries: list[dict]) -> DiagnoseResponse:
    """Used when the LLM is unreachable/misconfigured/returns bad JSON —
    returns the top retrieved KB entry directly, still catalog-grounded."""
    if not kb_entries:
        return DiagnoseResponse(source="fallback")

    top = kb_entries[0]
    names_map = name_to_department()
    recs = [
        {"name": n, "department": names_map[n], "reason": ""}
        for n in top["suited_items"]
        if n in names_map
    ]
    return DiagnoseResponse(
        diagnosis=[
            {"cause": f"{c['cause_en']} / {c['cause_vi']}", "likelihood": c["likelihood"]}
            for c in top["causes"]
        ],
        care_steps=[f"{en} / {vi}" for en, vi in zip(top["care_steps_en"], top["care_steps_vi"])],
        recommended_items=recs,
        source="fallback",
    )


@app.post("/api/flora/diagnose", response_model=DiagnoseResponse)
def diagnose(req: DiagnoseRequest) -> DiagnoseResponse:
    kb_entries = retrieve(req.message)
    prompt = _build_prompt(req.message, kb_entries)

    try:
        raw = llm.generate(prompt)
        parsed = json.loads(raw)
    except (llm.LLMError, json.JSONDecodeError, KeyError) as exc:
        logger.warning("LLM step failed (%s) — falling back to top KB match", exc)
        return _fallback_from_kb(kb_entries)

    recommended = _validate_recommendations(parsed.get("recommended_items", []))
    if not recommended and kb_entries:
        # LLM gave no (valid) recommendations — fall back to the KB's own suggestions
        names_map = name_to_department()
        recommended = [
            {"name": n, "department": names_map[n], "reason": ""}
            for n in kb_entries[0]["suited_items"]
            if n in names_map
        ]

    return DiagnoseResponse(
        diagnosis=parsed.get("diagnosis", []),
        care_steps=parsed.get("care_steps", []),
        recommended_items=recommended,
        source="ai",
    )


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "llm_provider": settings.LLM_PROVIDER}
