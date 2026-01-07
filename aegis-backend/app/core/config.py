from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Aegis Trust Protocol"
    
    # Entra Configuration (Optional for Prototype/Demo)
    # If these are missing from .env, the app enters "Mock Mode"
    TENANT_ID: Optional[str] = None
    CLIENT_ID: Optional[str] = None
    CLIENT_SECRET: Optional[str] = None
    
    # Force Mock Mode (Set to True to bypass Azure checks entirely)
    USE_MOCK_SERVICES: bool = True 

    @property
    def IS_MOCK_MODE(self) -> bool:
        """Returns True if explicitly requested OR if keys are missing."""
        return self.USE_MOCK_SERVICES or not (self.TENANT_ID and self.CLIENT_ID)

    @property
    def OPENID_CONFIG_URL(self) -> str:
        tenant = self.TENANT_ID or "common"
        return f"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration"

    class Config:
        env_file = ".env"
        extra = "ignore" # Prevents crashing if .env has extra fields

settings = Settings()