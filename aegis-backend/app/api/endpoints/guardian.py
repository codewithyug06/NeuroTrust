from fastapi import APIRouter, Body
from app.services.mock_ai_service import MockAIService

router = APIRouter()

@router.post("/guardian/chat")
async def guardian_chat(payload: dict = Body(...)):
    """
    Simulates Guardian AI (GPT-4o) via MockAIService.
    """
    return MockAIService.generate_guardian_response(payload.get("message", ""))