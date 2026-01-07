from fastapi import APIRouter, Header, HTTPException, Body, Depends
from typing import Optional
from app.core.config import settings
from app.services.agent_registry import AgentRegistry
import time
import random

router = APIRouter()

def simulate_crypto_challenge():
    """
    Simulates the cryptographic challenge-response protocol.
    """
    time.sleep(0.1)
    return True

@router.post("/verify-handshake")
async def verify_handshake(
    authorization: Optional[str] = Header(None),
    payload: dict = Body(...)
):
    """
    AEGIS PROTOCOL HANDSHAKE (Phase 1)
    """
    
    # 1. Simulate Network Latency
    if settings.SIMULATE_LATENCY:
        time.sleep(settings.LATENCY_HANDSHAKE_MS / 1000.0)

    # 2. Extract Token
    token = authorization.replace("Bearer ", "") if authorization else "unknown-token"
    
    # 3. Perform Cryptographic Verification
    is_signature_valid = simulate_crypto_challenge()
    
    input_oid = payload.get("oid")
    
    # 4. Registry Lookup
    registry_result = AgentRegistry.lookup_agent(input_oid)
    
    # --- SCENARIO A: VERIFIED AGENT (Green Light) ---
    if registry_result["is_trusted"] and is_signature_valid:
        # Fetch extra context
        graph_data = AgentRegistry.get_extended_graph_data(input_oid)
        
        return {
            "status": "VERIFIED",
            "trust_score": 98, 
            "ui_action": "SHOW_GREEN_SHIELD",
            "details": {
                "agent": registry_result["metadata"]["name"],
                "tier": registry_result["metadata"]["tier"],
                "message": "Identity Confirmed via Microsoft Entra.",
                "c2pa_status": "VALID_SIGNATURE",
                "accreditation": registry_result["metadata"]["accreditation"],
                "proof": registry_result["metadata"]["verification_proof"],
                "context": graph_data
            },
            "logs": [
                "Entra ID Token Decoded...",
                "DID Resolution: did:ion:... Success",
                "Public Key Match: 0x7A8B9C...",
                "Graph API: Relationship Confirmed"
            ]
        }

    # --- SCENARIO B: KNOWN THREAT / UNVERIFIED (Red Light) ---
    return {
        "status": "BLOCKED",
        "trust_score": 12, 
        "ui_action": "SHOW_RED_WARNING",
        "details": {
            "agent": "Unverified Caller",
            "message": "CRITICAL: Identity Signature Missing.",
            "reason": "Caller failed biometric challenge & C2PA check.",
            "recommendation": "Do not engage. Call terminated.",
            "proof": "INVALID"
        },
        "logs": [
            "Entra ID Token Missing or Invalid...",
            "DID Resolution: Failed",
            "Anomaly: High-Risk IP detected",
            "Blocklist Check: MATCH FOUND (DarkNexus-v4)"
        ]
    }