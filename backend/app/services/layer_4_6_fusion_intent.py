from typing import Dict, List, Optional
import math

class MultimodalFusionModel:
    """
    4. Multimodal Fusion & Authenticity Models.
    Aggregates scores from Audio, Video, and Identity layers.
    """
    def bayesian_risk_aggregation(self, priors: Dict[str, float]) -> float:
        """Bayesian Risk Aggregation."""
        # Calculate posterior probability of fraud given priors
        # P(Fraud | Audio, Video, Identity)
        
        # Simplified probability fusion for demo
        combined_risk = 1.0
        for source, risk_prob in priors.items():
            combined_risk *= (1.0 - risk_prob)
        
        return 1.0 - combined_risk

    def confidence_weighted_ensemble(self, scores: List[Dict]) -> float:
        """Confidence-Weighted Ensemble Model."""
        weighted_sum = 0.0
        total_weight = 0.0
        
        for item in scores:
            weighted_sum += item['score'] * item['confidence']
            total_weight += item['confidence']
            
        return weighted_sum / total_weight if total_weight > 0 else 0.0

class IntentClassifier:
    """
    6.1 Language & Conversation Models.
    """
    def classify_intent(self, transcript: str) -> Dict:
        """Intent Classification & Urgency Detection."""
        transcript_lower = transcript.lower()
        
        intent = "neutral"
        urgency = 0.0
        pressure = 0.0
        
        # Urgency Detection Algorithm
        if any(w in transcript_lower for w in ["now", "immediate", "urgent", "seconds"]):
            urgency = 0.8
            intent = "urgent_action"
            
        # Financial Coercion Pattern Model
        if any(w in transcript_lower for w in ["irs", "transfer", "bank", "card", "pay"]):
            pressure = 0.9
            intent = "financial_request"

        # Authority Impersonation Detection
        if "fbi" in transcript_lower or "police" in transcript_lower:
            intent = "authority_impersonation"
            pressure = 1.0

        return {
            "intent": intent,
            "urgency_score": urgency,
            "pressure_score": pressure
        }

class SocialEngineeringDetector:
    """
    6.2 Social Engineering Detection.
    """
    def analyze_behavior(self, interaction_history: List) -> float:
        """Behavioral Deception Model."""
        # Conversation Risk Accumulator
        risk = 0.0
        for event in interaction_history:
            if event['type'] == 'escalation':
                risk += 0.2
        return min(risk, 1.0)
    
    def score_victim_vulnerability(self, user_profile: Dict) -> float:
        """Victim Vulnerability Scoring."""
        # e.g., Elderly users might have a higher base vulnerability multiplier
        if user_profile.get("mode") == "elderly":
            return 0.8
        return 0.2

class Layer46FusionIntentService:
    def __init__(self):
        self.fusion = MultimodalFusionModel()
        self.intent = IntentClassifier()
        self.social = SocialEngineeringDetector()

    def run_fusion_intent_check(self, identity_res: Dict, auth_res: Dict, text_input: str) -> Dict:
        """
        Executes Layers 4 and 6.
        """
        # --- LAYER 4: FUSION ---
        # Convert previous layer scores to probabilities of fraud
        p_identity_fraud = 1.0 - (identity_res.get("score", 100) / 100.0)
        p_auth_fraud = 1.0 - (auth_res.get("score", 100) / 100.0)
        
        fusion_prob = self.fusion.bayesian_risk_aggregation({
            "identity": p_identity_fraud,
            "authenticity": p_auth_fraud
        })
        
        # --- LAYER 6: INTENT ---
        intent_res = self.intent.classify_intent(text_input)
        
        # 6.2 Social Engineering
        social_risk = self.social.analyze_behavior([{"type": "escalation"} if intent_res['pressure_score'] > 0.5 else {}])
        
        # Final Score Calculation (0-100 Trust)
        # High fusion_prob (fraud prob) -> Low Trust
        base_trust = (1.0 - fusion_prob) * 100
        
        # Penalize for Intent
        if intent_res["intent"] in ["financial_request", "authority_impersonation"]:
            base_trust -= 30
            
        if intent_res["urgency_score"] > 0.7:
             base_trust -= 20

        return {
            "layer": "4 & 6 Fusion & Intent",
            "score": max(0, base_trust),
            "details": {
                "fusion_fraud_probability": fusion_prob,
                "intent_classification": intent_res,
                "social_engineering_risk": social_risk,
                "explainable_breakdown": f"Identity Risk: {p_identity_fraud:.2f}, Auth Risk: {p_auth_fraud:.2f}"
            }
        }
