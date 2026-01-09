from typing import List, Dict
from datetime import datetime, timedelta

# --- 4. TRUST SCORE ENGINE ---

class TimeDecayModel:
    """
    Reduces trust over time if not reinforced.
    Model: Time-Decay Trust Model.
    """
    MAX_TRUST_LIFE_HOURS = 24
    
    @staticmethod
    def apply_decay(base_score: float, last_interaction: datetime) -> float:
        now = datetime.now()
        hours_passed = (now - last_interaction).total_seconds() / 3600
        
        if hours_passed > TimeDecayModel.MAX_TRUST_LIFE_HOURS:
            return 0.0 # Trust expired
            
        # Linear decay: Lose 2 points per hour
        decay = hours_passed * 2.0
        return max(0.0, base_score - decay)

class ContextRiskAdjuster:
    """
    Adjusts score based on transaction sensitivity.
    Model: Contextual Risk Adjuster.
    """
    CONTEXT_RISK_FACTORS = {
        "view_balance": 1.0,  # Normal
        "transfer_funds": 0.8, # Higher bar for trust
        "change_password": 0.7 # Very high bar
    }
    
    @staticmethod
    def adjust(score: float, context: str) -> float:
        factor = ContextRiskAdjuster.CONTEXT_RISK_FACTORS.get(context, 1.0)
        return score * factor

class TrustScoreEngine:
    """
    Core engine aggregating all signals.
    Model: Dynamic Trust Scoring Model.
    """
    @staticmethod
    def calculate_trust(
        identity_score: float, # 0-100
        deepfake_probability: float, # 0-100 (100 = definitely fake)
        intent_risk_score: float, # 0-100 (100 = high risk)
        context: str = "general"
    ) -> Dict:
        
        # 1. Base Identity Trust
        score = identity_score
        
        # 2. Subtract Deepfake Risk
        # If deepfake prob is 90%, we subtract heavily.
        if deepfake_probability > 50:
            score -= (deepfake_probability * 1.5) # Penalty multiplier
            
        # 3. Subtract Intent Risk
        if intent_risk_score > 30:
            score -= (intent_risk_score * 0.8)
            
        # 4. Apply Context Adjustment
        score = ContextRiskAdjuster.adjust(score, context)
        
        # 5. Normalize
        score = max(0, min(100, score))
        
        level = "TRUSTED"
        if score < 40: level = "BLOCKED"
        elif score < 75: level = "CAUTION"
        
        return {
            "score": int(score),
            "level": level,
            "breakdown": {
                "identity": identity_score,
                "deepfake_penalty": deepfake_probability,
                "intent_penalty": intent_risk_score
            }
        }
