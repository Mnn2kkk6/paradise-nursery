"""
RAG retrieval: embeds Flora's symptom knowledge base with a
multilingual sentence-transformers model (so Vietnamese and English
free text both embed well), stores it in a persistent Chroma
collection, and retrieves the top-k most relevant entries for a
user's message.

The collection is built once (on first request) and persisted to
disk under CHROMA_PERSIST_DIR, so subsequent server restarts don't
re-embed the knowledge base unless it changed.
"""
import json
import os
from typing import List

import chromadb
from chromadb.utils import embedding_functions

from .config import settings

_KB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "knowledge_base.json")
_COLLECTION_NAME = "flora_knowledge_base"

_client = None
_collection = None


def _load_knowledge_base() -> List[dict]:
    with open(_KB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _entry_to_embedding_text(entry: dict) -> str:
    """
    Concatenate Vietnamese + English symptom phrasing so a query in
    either language matches this entry well, without needing two
    separate collections or a translation step.
    """
    parts = [*entry["symptom_vi"], *entry["symptom_en"]]
    return " | ".join(parts)


def _index_knowledge_base(collection) -> None:
    entries = _load_knowledge_base()
    collection.add(
        ids=[entry["id"] for entry in entries],
        documents=[_entry_to_embedding_text(entry) for entry in entries],
        metadatas=[{"entry_json": json.dumps(entry, ensure_ascii=False)} for entry in entries],
    )


def get_collection():
    global _client, _collection
    if _collection is not None:
        return _collection

    _client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
    embed_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name=settings.EMBEDDING_MODEL
    )
    _collection = _client.get_or_create_collection(
        name=_COLLECTION_NAME,
        embedding_function=embed_fn,
        metadata={"hnsw:space": "cosine"},
    )

    if _collection.count() == 0:
        _index_knowledge_base(_collection)

    return _collection


def reindex() -> int:
    """Force a full re-embed — call after editing knowledge_base.json."""
    global _client, _collection
    _client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
    try:
        _client.delete_collection(_COLLECTION_NAME)
    except Exception:
        pass
    _collection = None
    collection = get_collection()
    return collection.count()


def retrieve(query: str, top_k: int = None) -> List[dict]:
    collection = get_collection()
    k = top_k or settings.TOP_K
    k = min(k, collection.count()) or 1

    results = collection.query(query_texts=[query], n_results=k)
    metadatas = results.get("metadatas") or [[]]
    return [json.loads(m["entry_json"]) for m in metadatas[0]]
