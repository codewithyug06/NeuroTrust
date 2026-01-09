from fastapi import APIRouter, Body
from app.services.guardian_service import GuardianService

router = APIRouter()

@router.post("/guardian/chat")
async def guardian_chat(payload: dict = Body(...)):
    """
    Simulates Guardian AI Active Defense.
    """
    session_id = payload.get("session_id", "default")
    threat_data = payload.get("threat_context", {})
    
    result = GuardianService.intervene(session_id, threat_data)
    
    return {
        "response": result.get("guardian_message", "Monitoring conversation."),
        "action": result.get("action", "NONE"),
        "status": result.get("status", "PASSIVE")
    }
