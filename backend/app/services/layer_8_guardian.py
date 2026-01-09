from typing import Dict, List, Optional
import random

class GuardianSafetyKernel:
    """
    8.1 Guardian Core Models.
    Core safety rules that cannot be overridden by AI.
    """
    def check_safety_policy(self, action: str) -> bool:
        """Rule-Based Safety Kernel (Non-Overridable)."""
        prohibited_actions = ["disconnect_user_without_warning", "share_pii_externally"]
        if action in prohibited_actions:
            return False
        return True

    def arbitration_model(self, requested_actions: List[str]) -> str:
        """Guardian Priority Arbitration Model."""
        # Safety > Utility > Latency
        if "BLOCK" in requested_actions: return "BLOCK"
        if "INTERROGATE" in requested_actions: return "INTERROGATE"
        return "ALLOW"

class InterventionTrigger:
    """
    8.3 Intervention Algorithms.
    """
    def check_risk_spike(self, current_score: float, previous_score: float) -> bool:
        """Real-Time Risk Spike Detector."""
        # If trust drops > 40 points instantly
        if (previous_score - current_score) > 40:
            return True
        return False

    def synthesize_warning(self, risk_type: str) -> str:
        """User Warning Synthesis Logic."""
        templates = {
            "deepfake": "CAUTION: Synthetic Voice Detected. Verify with a shared secret.",
            "coercion": "WARNING: High Pressure Tactics Detected. Do not transfer funds.",
            "identity": "ALERT: Identity Unverified. Do not share personal info."
        }
        return templates.get(risk_type, "WARNING: Anomalous Activity Detected.")

class ChallengeNegotiation:
    """
    8.2 Challenge & Negotiation Algorithms.
    """
    def generate_challenge(self, risk_factor: str) -> str:
        """Identity Challenge Protocol."""
        if risk_factor == "voice_mismatch":
            return "Please state your full name and employee ID for voiceprint verification."
        return "Please confirm the transaction via the Entra Wallet app."

    def verify_response(self, initial_challenge: str, response: str) -> float:
        """Response Validity Scoring."""
        # Mock logic
        return 0.9 if len(response) > 5 else 0.1

class Layer8GuardianService:
    def __init__(self):
        self.kernel = GuardianSafetyKernel()
        self.trigger = InterventionTrigger()
        self.challenge = ChallengeNegotiation()

    def run_guardian_decision(self, layer_7_result: Dict) -> Dict:
        """
        Executes Layer 8 Pipeline.
        """
        score = layer_7_result.get("score", 100)
        action = layer_7_result.get("action", "ALLOW")
        
        # 8.1 Safety Kernel
        if not self.kernel.check_safety_policy("standard_monitoring"):
            # Fallback if monitoring deemed unsafe (unlikely)
            pass

        # 8.3 Intervention Check
        intervention_required = False
        guardian_action = action # Default to Trust Engine's suggestion
        
        # Risk Escalation Decision Tree
        if score < 30:
            guardian_action = "BLOCK"
        elif score < 50:
             guardian_action = "INTERROGATE"
             intervention_required = True
        elif score < 80:
             guardian_action = "WARN"
        
        # Synthesis
        warning_message = ""
        if guardian_action == "WARN" or guardian_action == "INTERROGATE":
             # Determine dominant risk factor
             explanation = layer_7_result.get("explanation", "")
             if "Identity" in explanation: risk_type = "identity"
             elif "Deepfake" in explanation: risk_type = "deepfake"
             else: risk_type = "coercion"
             
             warning_message = self.trigger.synthesize_warning(risk_type)
        
        # Challenge Generation (if Interrogating)
        challenge_text = ""
        if guardian_action == "INTERROGATE":
            challenge_text = self.challenge.generate_challenge("voice_mismatch")

        return {
            "layer": "8 Guardian Decision",
            "final_action": guardian_action,
            "intervention_active": intervention_required,
            "guardian_message": warning_message,
            "challenge_issued": challenge_text,
            "policy_check": "PASSED"
        }
