"""
LLM provider abstraction. Both providers are given the same system
prompt and are instructed to return a single JSON object — the caller
(main.py) parses and validates that JSON the same way regardless of
which provider produced it.

Switch providers with the LLM_PROVIDER env var: "groq" or "ollama".
"""
import requests

from .config import settings

SYSTEM_PROMPT = (
    "You are Flora, the plant care assistant embedded in Paradise Nursery, "
    "an online plant shop. A user describes a problem with their plant, in "
    "Vietnamese or English. You are given relevant knowledge base context "
    "and a list of valid product names. Using ONLY that context, diagnose "
    "the likely cause(s), give clear care steps, and recommend suitable "
    "products from the valid list.\n\n"
    "Rules:\n"
    "- Reply with a single JSON object and nothing else — no markdown, no "
    "commentary, no code fences.\n"
    "- Write the diagnosis, care_steps, and reason text in the SAME "
    "language the user wrote in.\n"
    "- Every recommended_items[].name MUST be copied exactly from the "
    "valid product list you were given — never invent a product name.\n"
    "- If the user's message doesn't match a plant problem at all, return "
    "empty arrays for diagnosis and recommended_items, and use care_steps "
    "for a brief, friendly clarifying message instead."
)


class LLMError(RuntimeError):
    """Raised when the configured provider fails to produce a usable reply."""


def _generate_groq(prompt: str) -> str:
    if not settings.GROQ_API_KEY:
        raise LLMError("GROQ_API_KEY is not set")

    from groq import Groq  # imported lazily so it's only required when used

    client = Groq(api_key=settings.GROQ_API_KEY)
    try:
        response = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )
    except Exception as exc:  # noqa: BLE001 - surface as LLMError for the caller
        raise LLMError(f"Groq request failed: {exc}") from exc

    return response.choices[0].message.content


def _generate_ollama(prompt: str) -> str:
    try:
        response = requests.post(
            f"{settings.OLLAMA_HOST}/api/chat",
            json={
                "model": settings.OLLAMA_MODEL,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                "stream": False,
                "format": "json",
                "options": {"temperature": 0.3},
            },
            timeout=settings.REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise LLMError(
            f"Ollama request failed (is `ollama serve` running at {settings.OLLAMA_HOST}?): {exc}"
        ) from exc

    return response.json()["message"]["content"]


def generate(prompt: str) -> str:
    """Returns the raw JSON string from whichever provider is configured."""
    if settings.LLM_PROVIDER == "groq":
        return _generate_groq(prompt)
    if settings.LLM_PROVIDER == "ollama":
        return _generate_ollama(prompt)
    raise LLMError(
        f"Unknown LLM_PROVIDER '{settings.LLM_PROVIDER}' — use 'groq' or 'ollama'"
    )
