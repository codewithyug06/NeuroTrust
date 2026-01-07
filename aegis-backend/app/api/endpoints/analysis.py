from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AnalysisRequest(BaseModel):
    scenario: str = "SAFE" # Options: SAFE, ATTACK

@router.post("/analyze-stream")
async def analyze_stream(request: AnalysisRequest):
    """
    Simulates Azure AI Content Safety & Speech Analysis.
    
    If scenario == 'ATTACK', it returns a high 'Synthetic Risk Score'.
    If scenario == 'SAFE', it returns a high 'Trust Score'.
    """
    if request.scenario == "ATTACK":
        # Simulate a Deepfake Attack (Red Light)
        return {
            "status": "BLOCKED",
            "trust_score": 12,
            "verdict": "SYNTHETIC_MEDIA_DETECTED",
            "anomalies": [
                "Visual: Lip-sync mismatch (98% confidence)",
                "Audio: Missing C2PA Watermark"
            ],
            "ui_action": "SHOW_RED_WARNING"
        }
        
    # Default: Verified Call (Green Light)
    return {
        "status": "VERIFIED",
        "trust_score": 99,
        "verdict": "AUTHENTIC",
        "anomalies": [],
        "metadata": {
            "source": "Azure AI Content Safety",
            "latency": "45ms"
        },
        "ui_action": "SHOW_GREEN_SHIELD"
    }