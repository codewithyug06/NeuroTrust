from fastapi import APIRouter
from app.services.azure_mock import AzureSimulationEngine
import asyncio

router = APIRouter()

@router.get("/global-intel")
async def get_global_intel():
    """
    Simulates a KQL Query to Microsoft Fabric Real-Time Hub.
    Returns live threat data for the Dashboard.
    """
    # Simulate data aggregation delay
    await asyncio.sleep(0.1)
    
    # Generate a batch of recent events
    events = [AzureSimulationEngine.generate_fabric_telemetry() for _ in range(8)]
    
    return {
        "active_nodes": 8420,
        "threat_level": "ELEVATED",
        "recent_logs": events,
        "swarm_detection": {
            "active_swarms": 2,
            "signature": "Audio-Clone-V4-Beta"
        }
    }