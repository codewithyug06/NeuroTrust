from fastapi import APIRouter, Header, HTTPException, Body, Depends
from typing import Optional
from app.services.btp_service import BTPService
from app.services.identity_service import IdentityService
from app.models import HandshakeResponse, HandshakeRequest

router = APIRouter()

@router.post("/verify-handshake", response_model=HandshakeResponse)
async def verify_handshake(
    authorization: Optional[str] = Header(None),
    payload: HandshakeRequest = Body(...)
):
    """
    NEUROTRUST PROTOCOL HANDSHAKE (Phase 1)
    Implements Bi-Directional Trust Protocol (BTP) using BTPService.
    """
    # Extract OID from payload
    oid = payload.oid
    
    # Delegate logic to BTP Service
    response = BTPService.execute_handshake(oid, context=payload.context)
    
    return response

@router.get("/agents")
async def get_verified_agents():
    """
    Returns the Registry of Verified Agents.
    Uses IdentityService (conceptually, or direct Registry access for list).
    """
    from app.services.agent_registry import AgentRegistry
    # We can keep using the registry directly for listing for now, 
    # or add a list method to IdentityService. 
    # For now, let's keep the logic simple but ensure it maps to our new models if needed.
    
    agents = []
    for oid, data in AgentRegistry.TRUSTED_AGENTS.items():
        if oid in AgentRegistry.DYNAMIC_BLACKLIST:
             continue 

        # Using the logic from IdentityService to consistency
        passport = IdentityService.get_agent_passport(oid)
        if passport:
            agents.append(passport.dict())
            
    return agents

@router.post("/revoke")
async def revoke_agent(payload: dict = Body(...)):
    """
    FEATURE: Identity Revocation.
    """
    oid = payload.get("oid")
    if not oid:
         raise HTTPException(status_code=400, detail="Missing OID")
    
    IdentityService.revoke_identity(oid, reason="Manual Revocation Request")
    
    return {
        "status": "REVOKED",
        "message": f"Identity {oid} has been revoked."
    }
