import secrets
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Global Configuration for Aegis Trust Protocol.
    Includes "Production-Grade" simulation settings for the Imagine Cup demo.
    """
    # --- PROJECT IDENTIFICATION ---
    PROJECT_NAME: str = "Aegis Trust Protocol"
    VERSION: str = "3.1.0-rc (Imagine Cup Final)"
    API_V1_STR: str = "/api/v1"
    
    # --- SECURITY CONFIGURATION (HARDCODED FOR DEMO STABILITY) ---
    SECRET_KEY: str = "mock-production-secret-key-do-not-use-in-real-prod-839283"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # --- MICROSOFT ENTRA ID SETTINGS (SIMULATED) ---
    TENANT_ID: str = "f8cdef31-a31e-4b4a-93e4-5f571e91255a"
    CLIENT_ID: str = "aegis-core-application-id"
    CLIENT_SECRET: str = "mock-client-secret-value"
    AUTHORITY: str = f"https://login.microsoftonline.com/{TENANT_ID}"
    
    # --- CORS CONFIGURATION ---
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]

    # --- ADVANCED SIMULATION FLAGS ---
    # Ensures zero downtime during the presentation
    USE_MOCK_SERVICES: bool = True 
    
    # Latency Simulation to mimic real 5G network round-trip time
    SIMULATE_LATENCY: bool = True
    LATENCY_HANDSHAKE_MS: int = 800  # Identity Check (Fast)
    LATENCY_ANALYSIS_MS: int = 1500  # AI Media Analysis (Heavy)

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