from fastapi import APIRouter, Header, HTTPException, Body, Depends
from typing import Optional
from app.core.config import settings
from app.services.agent_registry import AgentRegistry
import time
import random

router = APIRouter()

def simulate_crypto_challenge():
    """
    Simulates the cryptographic challenge-response protocol (Entra Verified ID).
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
    Implements:
    1. Identity Verification (Entra)
    2. Conditional Access Policy Check (Geo-fencing/Risk)
    3. Sponsor Verification (Accountability)
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
    
    # 5. FEATURE: Conditional Access Check
    # We simulate checking if the agent is connecting from a suspicious location
    is_compliant = AgentRegistry.check_conditional_access(input_oid)
    
    # --- SCENARIO A: VERIFIED AGENT (Green Light) ---
    if registry_result["is_trusted"] and is_signature_valid and is_compliant:
        # Fetch extra context
        graph_data = AgentRegistry.get_extended_graph_data(input_oid)
        sponsor_data = registry_result["metadata"].get("sponsor", "Unknown")
        
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
                "sponsor": sponsor_data, # FEATURE: Sponsor Accountability
                "context": graph_data
            },
            "logs": [
                "Entra ID Token Decoded...",
                "DID Resolution: did:ion:... Success",
                "Public Key Match: 0x7A8B9C...",
                "Conditional Access Policy: PASS (US Region)",
                "Graph API: Relationship Confirmed"
            ],
            "telemetry": {
                "latency_ms": settings.LATENCY_HANDSHAKE_MS,
                "region": "East US 2",
                "protocol": "Aegis-v2-Secure"
            }
        }

    # --- SCENARIO B: KNOWN THREAT / UNVERIFIED (Red Light) ---
    failure_reason = "Identity Signature Missing"
    if not is_compliant:
        failure_reason = "Conditional Access Policy Violation (High Risk Location)"

    return {
        "status": "BLOCKED",
        "trust_score": 12, 
        "ui_action": "SHOW_RED_WARNING",
        "details": {
            "agent": "Unverified Caller",
            "message": f"CRITICAL: {failure_reason}.",
            "reason": "Caller failed biometric challenge & C2PA check.",
            "recommendation": "Do not engage. Call terminated.",
            "proof": "INVALID"
        },
        "logs": [
            "Entra ID Token Missing or Invalid...",
            "DID Resolution: Failed",
            "Anomaly: High-Risk IP detected (Geo-fencing)",
            "Blocklist Check: MATCH FOUND (DarkNexus-v4)",
            "Policy Action: BLOCK"
        ],
        "telemetry": {
            "latency_ms": settings.LATENCY_HANDSHAKE_MS,
            "region": "Unknown Proxy",
            "protocol": "Block-v1"
        }
    }