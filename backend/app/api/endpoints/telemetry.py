from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
import random

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

class ThreatReport(BaseModel):
    threat_type: str = "DEEPFAKE_VOICE"
    origin_ip: str | None = None
    severity: str = "CRITICAL"
    timestamp: str | None = None

class StatsResponse(BaseModel):
    threats_blocked: int
    active_nodes: int
    regions_protected: List[str]
    attack_distribution: Dict[str, float]

from app.services.telemetry_service import TelemetryService

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

@router.post("/report")
async def report_threat(report: ThreatReport):
    """
    Ingest a threat report via TelemetryService.
    """
    return TelemetryService.ingest_report(report.dict())

@router.get("/global-stats", response_model=StatsResponse)
async def get_stats():
    """
    Returns live global telemetry via TelemetryService.
    """
    return TelemetryService.get_global_stats()
