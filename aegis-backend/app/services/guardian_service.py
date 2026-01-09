from typing import Dict
from app.models import TrustScore

class GuardianService:
    """
    Implements Category 4: Active Defense.
    The Guardian Agent negotiates on behalf of the user.
    """
    
    @staticmethod
    def intervene(session_id: str, threat_data: Dict) -> Dict:
        """
        Active logic: Intercepts the call and challenges the caller.
        """
        threat_type = threat_data.get("type", "UNKNOWN")
        
        if threat_type == "LIP_SYNC_FAILURE":
            return {
                "action": "INTERCEPT",
                "guardian_message": "This is NeuroTrust Guardian. I detected an anomaly in your video feed. Please authenticate with a cryptographic challenge.",
                "challenge_required": True,
                "status": "NEGOTIATING"
            }
            
        if threat_type == "COERCION_ATTEMPT":
             return {
                "action": "WARN_USER",
                "guardian_message": "Warning: High urgency language detected. This is a common tactic in social engineering.",
                "status": "MONITORING"
            }
            
        return {"action": "NONE", "status": "PASSIVE"}
