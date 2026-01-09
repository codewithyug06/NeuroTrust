from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- CORE TRUST MODELS ---

class TelemetryData(BaseModel):
    latency_ms: float
    region: str
    protocol: str = "Aegis-v2-Secure"

class TrustScore(BaseModel):
    score: int = Field(..., ge=0, le=100, description="0-100 Trust Score")
    level: str = Field(..., description="TRUSTED, CAUTION, BLOCKED")
    factors: List[str] = []

# --- IDENTITY & AGENT PASSPORT MODELS ---

class AgentSponsor(BaseModel):
    name: str
    lei_code: Optional[str] = None # Legal Entity Identifier
    verified: bool = True

class AgentPassport(BaseModel):
    """
    Electronic Passport for AI Agents (Category 2).
    """
    did: str = Field(..., description="Decentralized Identifier")
    name: str
    category: str
    tier: str
    issued_at: datetime
    expiry: datetime
    public_key_thumbprint: str
    sponsor: AgentSponsor
    c2pa_profile: Optional[str] = None
    verification_proof: Optional[str] = None
    
    # Metadata for accountability
    liability_bond: Optional[int] = Field(None, description="Insurance/Liability coverage in USD")
    model_hash: Optional[str] = Field(None, description="SHA-256 hash of the model weights/config")

# --- BTP (Bi-Directional Trust Protocol) MODELS ---

class HandshakeRequest(BaseModel):
    oid: str
    client_challenge_response: Optional[str] = None # Proof from Client
    context: Optional[Dict[str, Any]] = {}

class HandshakeResponse(BaseModel):
    status: str # VERIFIED, BLOCKED, CHALLENGE_REQUIRED
    trust_score: TrustScore
    agent_passport: Optional[AgentPassport] = None
    server_challenge: Optional[str] = None # Challenge for Client to solve
    ui_action: str
    details: Dict[str, Any]
    logs: List[str]
    telemetry: TelemetryData
