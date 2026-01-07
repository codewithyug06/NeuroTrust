import requests
from jose import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

security = HTTPBearer()

def verify_entra_token(token: str):
    """
    Validates the Identity Token.
    
    MODE: MOCK
    - Accepts any token.
    - If token is "bad-token", returns failure.
    - Otherwise returns a valid 'Bank of America' agent profile.
    
    MODE: REAL (Prepared for Phase 2)
    - Fetches Microsoft public keys.
    - Validates RSA signature.
    """
    if settings.IS_MOCK_MODE:
        # --- SIMULATION LOGIC ---
        if token == "malicious-hacker-token":
            raise HTTPException(status_code=401, detail="Invalid Signature: Identity Spoofed")
            
        # Determine scenario based on token content (for Demo flexibility)
        # You can paste "unknown" into the token field to test the Red Light.
        agent_name = "Bank of America Support Bot"
        agent_oid = "00000003-0000-0000-c000-000000000000"
        
        if "unknown" in token.lower():
            agent_name = "Unknown Caller (Spoofed)"
            agent_oid = "unknown-oid"

        return {
            "aud": settings.CLIENT_ID or "mock-client-id",
            "iss": "https://login.microsoftonline.com/mock-tenant/v2.0",
            "oid": agent_oid,
            "name": agent_name,
            "roles": ["Agent.Verify"]
        }
        # --- END SIMULATION ---

    # Real Production Logic (Disabled for now)
    try:
        # Code to fetch JWKS and verify signature would go here
        pass 
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

def get_current_agent(credentials: HTTPAuthorizationCredentials = Security(security)):
    """FastAPI Dependency to lock down routes."""
    token = credentials.credentials
    return verify_entra_token(token)