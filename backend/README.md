# Flora API — Plant Care Assistant backend

The AI backend behind Flora, Paradise Nursery's plant care assistant.

```
React (FloraChat.jsx)
   │  POST /api/flora/diagnose { message, department }
   ▼
FastAPI (app/main.py)
   │
   ├─► Retrieval: embed the message (multilingual, VI+EN) and find the
   │   top-k closest entries in a Chroma vector store built from
   │   data/knowledge_base.json  (app/retrieval.py)
   │
   ├─► Generation: send the retrieved context + a list of valid product
   │   names to an LLM (Groq or Ollama), which must respond with
   │   strict JSON  (app/llm.py)
   │
   └─► Validation: drop any recommended product name that isn't
       actually in the catalog, so Flora can never suggest something
       the store doesn't sell  (app/catalog.py)
   │
   ▼
JSON { diagnosis, care_steps, recommended_items, source }
```

If the LLM call fails or times out (no API key, Ollama not running,
bad JSON, etc.), the API doesn't error out — it returns the top
knowledge-base match directly (`"source": "fallback"`), so the chat
always has something useful to say.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Pick a provider in `.env`:

- **Ollama** (free, local): install [Ollama](https://ollama.com), run
  `ollama pull llama3.1`, then `ollama serve`. Keep `LLM_PROVIDER=ollama`.
- **Groq** (hosted, fast): get a free key at
  [console.groq.com/keys](https://console.groq.com/keys), set
  `LLM_PROVIDER=groq` and `GROQ_API_KEY=...` in `.env`.

Then run the server:

```bash
uvicorn app.main:app --reload --port 8000
```

First request will download the embedding model and build the Chroma
index (needs internet once); after that it's cached in `CHROMA_PERSIST_DIR`.

Check it's alive: `curl http://localhost:8000/api/health`

## Keeping the catalog in sync

The backend only recommends product names it knows exist. Whenever
`src/data/plantsData.js` changes, regenerate `data/catalog.json` from
the project root:

```bash
node backend/scripts/export_catalog.mjs
```

## Updating the knowledge base

Edit `data/knowledge_base.json` (each entry: symptom phrasing in VI/EN,
causes, care steps, suited catalog items), then force a re-embed:

```bash
python3 -c "from app.retrieval import reindex; print(reindex(), 'entries indexed')"
```

## Frontend

Set `VITE_FLORA_API_URL=http://localhost:8000` in the frontend's `.env`
(see the project root `.env.example`) and run `npm run dev` as usual —
`FloraChat.jsx` will call this API for free-text messages and fall
back to its built-in rule-based matching if the API is unreachable.
