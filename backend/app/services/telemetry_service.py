import random
from typing import Dict, List

class GlobalState:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(GlobalState, cls).__new__(cls)
            cls._instance.threats_blocked = 1402391
            cls._instance.active_nodes = 842
        return cls._instance

class TelemetryService:
    """
    Manages global threat intelligence state.
    """
    state = GlobalState()

    @classmethod
    def ingest_report(cls, report: dict) -> dict:
        """
        Process incoming threat signal.
        """
        cls.state.threats_blocked += 1
        
        # Dynamic swarming logic
        swarm_status = "stable"
        if random.random() > 0.8:
            cls.state.active_nodes += 1
            swarm_status = "expanding"
            
        return {
            "status": "acknowledged",
            "new_global_count": cls.state.threats_blocked,
            "swarm_status": swarm_status
        }

    @classmethod
    def get_global_stats(cls) -> dict:
        """
        Return dashboard metrics.
        """
        # Background simulation
        if random.random() > 0.5:
            cls.state.threats_blocked += random.randint(1, 5)
            
        return {
            "threats_blocked": cls.state.threats_blocked,
            "active_nodes": cls.state.active_nodes,
            "regions_protected": ["US-EAST", "EU-WEST", "APAC-SG"],
            "attack_distribution": {
                "Audio Deepfakes": 42.5,
                "Video Injection": 28.1,
                "Phishing Bots": 15.3,
                "Replay Attacks": 14.1
            }
        }
