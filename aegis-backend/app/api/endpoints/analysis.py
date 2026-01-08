from fastapi import APIRouter
import time
from pydantic import BaseModel
from app.services.mock_ai_service import MockAIService

router = APIRouter()

class AnalysisRequest(BaseModel):
    scenario: str # "SAFE" or "DEEPFAKE"

class BiometricData(BaseModel):
    liveness: str
    voice_match: str
    blink_rate: int
    head_yaw: int

class DeviceFingerprint(BaseModel):
    model: str
    ip_region: str
    trust_level: str

class AnalysisResponse(BaseModel):
    verdict: str
    safety_score: int
    confidence: str
    entra_verified: bool
    biometrics: BiometricData
    mood_score: int
    voice_jitter: float
    device_fingerprint: DeviceFingerprint
    logs: list[str]

@router.post("/analyze-stream", response_model=AnalysisResponse)
def analyze_stream_mock(request: AnalysisRequest):
    """
    Simulates Azure AI + Entra ID analysis via MockAIService.
    """
    return MockAIService.analyze_scan(request.scenario)

@router.post("/guardian-chat")
def guardian_chat_mock(request: dict):
    """
    Mock Guardian AI Chat response.
    """
    time.sleep(1)
    return {
        "response": "I have intercepted this call. The caller failed biometric verification. Do not provide any personal information.",
        "action": "BLOCK_RECOMMENDED"
    }

@router.post("/verify-news")
def verify_news_mock(request: dict):
    """
    Verifies News URL via MockAIService (C2PA Check).
    """
    return MockAIService.verify_news(request.get("url", ""))