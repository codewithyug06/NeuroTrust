from fastapi import APIRouter
from pydantic import BaseModel
from app.services.pipeline_orchestrator import orchestrator
from app.services.mock_ai_service import MockAIService

router = APIRouter()

class AnalysisRequest(BaseModel):
    scenario: str # "SAFE" or "DEEPFAKE"
    stream_id: str = "default-stream" 
    transcript: str = "Hello" # Added for intent analysis

@router.post("/analyze-stream")
async def analyze_stream_mock(request: AnalysisRequest):
    """
    Executes the 14-Layer Intelligence Stack via PipelineOrchestrator.
    Maps the advanced result back to the frontend contract.
    """
    # Run the full 14-layer pipeline
    result = await orchestrator.run_pipeline({
        "scenario": request.scenario,
        "transcript": request.transcript,
        "ip_address": "127.0.0.1" # Mock client IP
    })
    
    # Map back to Frontend Contract (Legacy Compatibility)
    is_safe = result["final_verdict"] == "GREEN"
    
    response = {
        "verdict": "AUTHENTIC_MEDIA" if is_safe else "DEEPFAKE_DETECTED",
        "safety_score": int(result["trust_score"]),
        "mood_score": 98 if is_safe else 15, # Mock mapping
        "biometrics": {
            "blink_rate": 18 if is_safe else 4,
            "head_yaw": 2 if is_safe else 0
        },
        "device_fingerprint": {
            "model": "iPhone 15 Pro Max" if is_safe else "Unknown Emulator"
        },
        "pipeline_trace": result["layer_14_trace"],
        "guardian_action": result["guardian_action"],
        "details": result["details"]
    }
    
    return response


@router.post("/verify-news")
def verify_news_mock(request: dict):
    """
    Verifies News URL via MockAIService (C2PA Check).
    """
    return MockAIService.verify_news(request.get("url", ""))