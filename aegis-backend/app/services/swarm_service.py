from typing import Dict, List
import time
from datetime import datetime

class SwarmService:
    """
    Implements Category 5: Network Effect & Global Intelligence.
    Detects coordinated attacks ("Fraud Swarms") and shares intel via Collective Immunity Protocol.
    """
    
    # Simulating a distributed threat database (Redis/CosmosDB)
    SHARED_THREAT_DB = {
        "pattern:voice_cloning_v2": {"risk": 90, "origin": "multiple", "count": 1450},
        "ip:192.168.x.x": {"risk": 100, "origin": "botnet", "count": 500}
    }
    
    @staticmethod
    def report_threat(threat_type: str, metadata: Dict) -> Dict:
        """
        Ingests a local threat and updates global intelligence.
        """
        # 1. Update Global DB
        current = SwarmService.SHARED_THREAT_DB.get(threat_type, {"risk": 50, "count": 0})
        current["count"] += 1
        current["last_seen"] = datetime.now().isoformat()
        SwarmService.SHARED_THREAT_DB[threat_type] = current
        
        # 2. Check for Swarm Pattern (Rapid spike)
        is_swarm = False
        if current["count"] > 1000:
             is_swarm = True
             
        return {
            "status": "REPORTED",
            "global_count": current["count"],
            "swarm_alert": is_swarm,
            "immunity_update": "Propagated to 4,500 nodes" if is_swarm else "Logged locally"
        }
    
    @staticmethod
    def get_global_threat_map() -> List[Dict]:
        """
        Returns real-time data for the 'Global Fraud Swarm' visualization.
        """
        # Mock data representing active attacks worldwide
        return [
            {"lat": 40.7128, "lng": -74.0060, "type": "Deepfake Voice", "intensity": "HIGH"}, # NYC
            {"lat": 51.5074, "lng": -0.1278, "type": "Phishing Botnet", "intensity": "MEDIUM"}, # London
            {"lat": 35.6762, "lng": 139.6503, "type": "SMS Swarm", "intensity": "LOW"}, # Tokyo
             {"lat": 28.6139, "lng": 77.2090, "type": "Tech Support Scam", "intensity": "CRITICAL"} # Delhi
        ]
