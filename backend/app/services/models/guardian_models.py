from typing import Dict, List, Tuple
import random

# --- 5.1 GUARDIAN REASONING ---

class SafetyPolicyCore:
    """
    Non-overridable safety rules (Asimov-style).
    Model: Rule-based Safety Core.
    """
    @staticmethod
    def evaluate_policy(action_context: Dict) -> bool:
        # Mock policy check
        # Rule 1: Cannot transfer > $10k without biometric step-up
        if action_context.get("action") == "transfer" and action_context.get("amount", 0) > 10000:
            if not action_context.get("biometrics_verified"):
                return False
        return True

class InterventionLogic:
    """
    Decides when to interrupt/block based on Trust Score.
    Model: Real-Time Risk Threshold Model.
    """
    @staticmethod
    def decide_action(trust_score: float, fraud_risk: str) -> str:
        """
        Returns: ALLOW, WARN, INTERCEPT, BLOCK
        """
        if trust_score < 30 or fraud_risk == "HIGH":
            return "BLOCK"
        if trust_score < 60:
            return "INTERCEPT" # Guardian jumps in
        if trust_score < 80:
            return "WARN"
        return "ALLOW"

# --- 5.2 CHALLENGE PROTOCOL ---

class ChallengeProtocol:
    """
    Generates cryptographic challenges for agents.
    Model: Identity Challenge Protocol.
    """
    @staticmethod
    def generate_challenge(agent_did: str) -> str:
        # Create a nonce that the agent must sign with their private key
        nonce = f"challenge_{random.randint(10000, 99999)}"
        return nonce

    @staticmethod
    def verify_response(challenge: str, signature: str, public_key: str) -> bool:
        # Mock signature verification
        return True
