from typing import Dict, List, Optional
import time

class DynamicTrustScorer:
    """
    7.1 Trust Computation Models.
    """
    def __init__(self):
        self.context_history = []

    def compute_trust_score(self, 
                            identity_score: float, 
                            authenticity_score: float, 
                            intent_score: float,
                            context: Dict = {}) -> float:
        """
        Dynamic Trust Scoring Model with Weighted Risk Aggregation.
        """
        # Weighted Risk Aggregation
        w_id = 0.4
        w_auth = 0.4
        w_intent = 0.2
        
        base_score = (identity_score * w_id) + (authenticity_score * w_auth) + (intent_score * w_intent)
        
        # Contextual Risk Modifier
        if context.get("new_device", False):
            base_score *= 0.9 # 10% penalty
            
        # Relationship-Based Trust Boost
        if context.get("trusted_contact", False):
            base_score = min(base_score + 20, 100)
            
        # Negative Trust Propagation
        if context.get("flagged_ip", False):
            base_score -= 50
            
        return max(0, min(100, base_score))

    def apply_time_decay(self, current_trust: float, last_interaction_ts: float) -> float:
        """Time-Decay Trust Algorithm."""
        # Trust decays over time if not refreshed
        hours_since = (time.time() - last_interaction_ts) / 3600
        decay_factor = 0.01 * hours_since # 1% decay per hour
        return max(0, current_trust * (1.0 - decay_factor))

class TrustThresholdLogic:
    """
    7.2 Trust Threshold Logic.
    """
    def determine_verdict(self, score: float) -> Dict:
        """Green / Yellow / Red Thresholding."""
        # Adaptive Threshold Adjustment (Mock: Fixed for now)
        thresholds = {"safe": 80, "subtle": 50}
        
        verdict = "RED" # Default Block
        action = "BLOCK"
        confidence = "HIGH"
        
        if score >= thresholds["safe"]:
            verdict = "GREEN"
            action = "ALLOW"
        elif score >= thresholds["subtle"]:
            verdict = "YELLOW"
            action = "WARN"
            confidence = "MEDIUM"
            
        return {
            "verdict": verdict,
            "recommended_action": action,
            "confidence": confidence,
            "threshold_used": thresholds
        }
    
    def explain_decision(self, score: float, components: Dict) -> str:
        """Explainable Trust Decision Model."""
        reasons = []
        if components.get("identity", 100) < 50: reasons.append("Identity unverifiable")
        if components.get("authenticity", 100) < 50: reasons.append("Deepfake signatures detected")
        if components.get("intent", 100) < 50: reasons.append("High-pressure tactics detected")
        
        if not reasons: return "Trusted Interaction"
        return "Trust Reduced: " + ", ".join(reasons)

class Layer7TrustService:
    def __init__(self):
        self.scorer = DynamicTrustScorer()
        self.logic = TrustThresholdLogic()

    def run_trust_engine(self, layer_4_6_result: Dict) -> Dict:
        """
        Executes Layer 7 Pipeline.
        """
        # Extract inputs from Fusion Layer
        # For simplicity, we approximate component scores from the fusion details
        details = layer_4_6_result.get("details", {})
        risk_prob = details.get("fusion_fraud_probability", 0.0)
        intent_res = details.get("intent_classification", {})
        
        # Reverse engineer component scores for the weighted model
        # Identity/Auth are aggregated in fusion_prob.
        # Let's say (1 - risk) is the combined ID/Auth score
        combined_id_auth = (1.0 - risk_prob) * 100
        
        # Intent score
        intent_score = 100
        if intent_res.get("pressure_score", 0) > 0.5: intent_score -= 50
        if intent_res.get("urgency_score", 0) > 0.5: intent_score -= 30
        
        final_score = self.scorer.compute_trust_score(
            identity_score=combined_id_auth,
            authenticity_score=combined_id_auth, # Treating them similarly for this pass
            intent_score=intent_score
        )
        
        decision = self.logic.determine_verdict(final_score)
        
        explanation = self.logic.explain_decision(final_score, {
            "identity": combined_id_auth,
            "authenticity": combined_id_auth,
            "intent": intent_score
        })
        
        return {
            "layer": "7 Trust Engine",
            "score": final_score,
            "verdict": decision["verdict"],
            "action": decision["recommended_action"],
            "explanation": explanation,
            "details": decision
        }
