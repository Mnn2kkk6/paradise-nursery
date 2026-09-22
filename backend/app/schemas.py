from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class DiagnoseRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    department: Optional[str] = None


class Cause(BaseModel):
    cause: str
    likelihood: Literal["high", "medium", "low"] = "medium"


class RecommendedItem(BaseModel):
    name: str
    department: str
    reason: str = ""


class DiagnoseResponse(BaseModel):
    diagnosis: List[Cause] = []
    care_steps: List[str] = []
    recommended_items: List[RecommendedItem] = []
    # "ai" when the LLM produced the answer, "fallback" when the KB's
    # top match was returned directly (LLM unavailable/failed/timed out)
    source: Literal["ai", "fallback"] = "ai"
