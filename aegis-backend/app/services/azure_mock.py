import random
import time
from datetime import datetime

class AzureMockService:
    """
    Simulates high-fidelity responses from Azure AI Services.
    This ensures the demo works 100% of the time without burning API credits.
    """

    @staticmethod
    def simulate_face_liveness_detection(is_safe: bool):
        """
        Simulates Azure AI Vision Face API Liveness Detection.
        Returns detailed biometrics (blinks, head pose).
        """
        if is_safe:
            return {
                "liveness_status": "REAL",
                "confidence": 0.998,
                "biometrics": {
                    "blink_rate": "Normal (15/min)",
                    "head_pose_yaw": f"{random.uniform(-5, 5):.1f} deg",
                    "head_pose_pitch": f"{random.uniform(-2, 2):.1f} deg",
                    "texture_analysis": "Consistent skin scattering"
                }
            }
        else:
            return {
                "liveness_status": "SPOOF_DETECTED",
                "confidence": 0.12,
                "biometrics": {
                    "blink_rate": "Abnormal (0/min)",
                    "head_pose_yaw": "Static (0.0 deg)",
                    "head_pose_pitch": "Static (0.0 deg)",
                    "texture_analysis": "Smoothing artifacts detected (GAN signature)"
                }
            }

    @staticmethod
    def simulate_guardian_llm_response(input_text: str):
        """
        Simulates Azure OpenAI GPT-4o acting as the Guardian Agent.
        """
        scam_keywords = ["verify", "transfer", "urgent", "password", "bank", "card"]
        
        if any(word in input_text.lower() for word in scam_keywords):
            responses = [
                "I cannot comply. This request violates NeuroTrust Safety Policy 4.2 (Financial Coercion).",
                "Identity verification required before proceeding. Please present your Entra ID credentials.",
                "I have detected stress markers in your voice pattern. This interaction is being logged to Microsoft Fabric.",
                "NeuroTrust Guardian active. I am blocking this transaction pattern."
            ]
            return random.choice(responses)
        
        return "I am the user's automated Guardian. Please state your business for identity verification."

    @staticmethod
    def simulate_c2pa_check(url: str):
        """
        Simulates Content Credentials (C2PA) verification for Media/News.
        """
        if "fake" in url or "manipulated" in url:
            return {
                "valid": False,
                "issuer": "Unknown / Stripped",
                "edit_history": ["Adobe Photoshop (Likely)", "Unknown GAN Tool"],
                "timestamp": None
            }
        return {
            "valid": True,
            "issuer": "Associated Press (AP)",
            "signing_key": "did:web:ap.org",
            "timestamp": datetime.utcnow().isoformat()
        }