"""
Central configuration for the Flora API, read from environment
variables (see .env.example). No secrets are hardcoded here.
"""
import os
from dataclasses import dataclass, field
from typing import List


def _split_origins(raw: str) -> List[str]:
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


@dataclass
class Settings:
    # "groq" (hosted, needs GROQ_API_KEY) or "ollama" (local, needs Ollama running)
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "ollama")

    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    OLLAMA_HOST: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.1")

    # Multilingual so it embeds Vietnamese and English symptom text equally well
    EMBEDDING_MODEL: str = os.getenv(
        "EMBEDDING_MODEL", "paraphrase-multilingual-MiniLM-L12-v2"
    )
    CHROMA_PERSIST_DIR: str = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
    TOP_K: int = int(os.getenv("FLORA_TOP_K", "3"))

    CORS_ORIGINS: List[str] = field(
        default_factory=lambda: _split_origins(
            os.getenv("CORS_ORIGINS", "http://localhost:5173")
        )
    )

    REQUEST_TIMEOUT_SECONDS: int = int(os.getenv("FLORA_LLM_TIMEOUT", "60"))


settings = Settings()
