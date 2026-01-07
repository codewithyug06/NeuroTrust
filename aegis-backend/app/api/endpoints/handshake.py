from fastapi import APIRouter, Depends
from app.core.security import get_current_agent
from app.services.agent_registry import AgentRegistry

router = APIRouter()

@router.post("/verify-handshake")
async def verify_handshake(agent_payload: dict = Depends(get_current_agent)):
    """
    The Reverse Turing Test API.
    
    1. Receives the Agent's Digital Passport (Token).
    2. Checks if the Passport is Valid (Security).
    3. Checks if the Agent is Trusted (Registry).
    4. Returns the UI instruction (Green Shield vs. Red Warning).
    """
    
    agent_oid = agent_payload.get("oid")
    agent_name = agent_payload.get("name", "Unknown")
    
    # Check the Registry
    status = AgentRegistry.get_agent_status(agent_oid)

    # SCENARIO 1: RED LIGHT (The Hacker/Grandmother Attack)
    if not status["is_trusted"]:
        return {
            "status": "BLOCKED",
            "trust_score": 0,
            "ui_action": "SHOW_RED_WARNING",
            "details": {
                "message": f"CRITICAL ALERT: '{agent_name}' is not verified.",
                "reason": "Identity Signature Valid, but Agent not in Trust Registry.",
                "recommendation": "Do not answer. Forwarding to voicemail."
            }
        }

    # SCENARIO 2: GREEN LIGHT (The Verified Bank Agent)
    return {
        "status": "VERIFIED",
        "trust_score": 100,
        "ui_action": "SHOW_GREEN_SHIELD",
        "details": {
            "message": "Secure Connection Established.",
            "agent": status["metadata"]["name"],
            "sponsor": status["metadata"]["sponsor"],
            "session_id": "secure-session-8829-alpha"
        }
    }