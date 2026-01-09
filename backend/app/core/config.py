import secrets
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Global Configuration for NeuroTrust Protocol.
    Includes 'Production-Grade' simulation settings for Microsoft Imagine Cup 2026.
    """
    # --- PROJECT IDENTIFICATION ---
    PROJECT_NAME: str = "NeuroTrust: Universal Trust Protocol"
    VERSION: str = "6.0.0-ULTIMATE (Imagine Cup Final)"
    API_V1_STR: str = "/api/v1"
    
    # --- SECURITY (MOCK HSM / KEY VAULT) ---
    SECRET_KEY: str = "neurotrust-production-secret-key-998877-do-not-share"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # --- MICROSOFT CLOUD CONFIGURATION (SIMULATED) ---
    # Identity - Microsoft Entra Verified ID
    ENTRA_TENANT_ID: str = "f8cdef31-a31e-4b4a-93e4-5f571e91255a"
    ENTRA_CLIENT_ID: str = "neurotrust-core-app"
    ENTRA_VERIFIABLE_CREDENTIAL_SERVICE: str = "https://verifiedid.did.msidentity.com/v1.0/"
    
    # Azure AI Services
    AZURE_OPENAI_ENDPOINT: str = "https://neurotrust-gpt4o.openai.azure.com/"
    AZURE_OPENAI_KEY: str = "mock-key-for-demo-purposes-only"
    AZURE_OPENAI_DEPLOYMENT: str = "neurotrust-guardian-gpt4o"
    
    AZURE_CONTENT_SAFETY_ENDPOINT: str = "https://neurotrust-safety.cognitiveservices.azure.com/"
    AZURE_FACE_API_ENDPOINT: str = "https://neurotrust-vision.cognitiveservices.azure.com/"
    
    # Data & Analytics - Microsoft Fabric
    COSMOS_DB_CONNECTION: str = "AccountEndpoint=https://neurotrust-db.documents.azure.com:443/;"
    FABRIC_EVENTHUB_CONN: str = "Endpoint=sb://neurotrust-stream.servicebus.windows.net/;"
    FABRIC_KQL_DATABASE: str = "NeuroTrustTelemetry"

    # --- CORS CONFIGURATION ---
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        # Mobile Testing IPs (Subnet Wildcard Logic in Production)
        "http://192.168.1.2:5173", "http://192.168.1.3:5173",
        "http://192.168.1.4:5173", "http://192.168.1.5:5173",
        "http://192.168.1.6:5173", "http://192.168.1.7:5173",
        "http://192.168.1.8:5173", "http://192.168.1.9:5173",
        "http://192.168.0.100:5173", "http://192.168.0.101:5173",
        "http://192.168.0.102:5173", "http://192.168.0.103:5173",
        "http://192.168.0.104:5173", "http://192.168.0.105:5173"
    ]

    # --- SIMULATION CONTROLS ---
    USE_MOCK_SERVICES: bool = True 
    SIMULATE_LATENCY: bool = True
    LATENCY_HANDSHAKE_MS: int = 1500 # Slightly longer for "Realism"
    LATENCY_ANALYSIS_MS: int = 3000  # Deep Scan takes time

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore" 

settings = Settings()