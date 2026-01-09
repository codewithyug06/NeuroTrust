from typing import List, Dict
from datetime import datetime

# --- 6.1 GLOBAL THREAT INTELLIGENCE ---

class SwarmDetector:
    """
    Clusters similar attack patterns globally.
    Model: Fraud Swarm Detection.
    """
    # Mock in-memory store of recent attacks
    RECENT_ATTACKS = [] 

    @staticmethod
    def report_attack(attack_signature: Dict):
        SwarmDetector.RECENT_ATTACKS.append({
            "sig": attack_signature,
            "ts": datetime.now()
        })

    @staticmethod
    def detect_swarm() -> bool:
        """
        Returns True if a coordinated swarm is detected.
        """
        # If > 5 similar attacks in last minute
        count = len(SwarmDetector.RECENT_ATTACKS)
        return count > 5

class ImmunityPropagator:
    """
    Distributes new threat signatures to all nodes.
    Model: Collective Immunity Propagation.
    """
    @staticmethod
    def broadcast_immunity(threat_sig: Dict):
        # Mock broadcasting to other Aegis nodes
        print(f"[GLOBAL_IMMUNITY] Broadcasting new threat signature: {threat_sig}")
        
    @staticmethod
    def get_active_threats() -> List[Dict]:
        return [{"type": "voice_clone_v2", "pattern": "0x4f..."}]
