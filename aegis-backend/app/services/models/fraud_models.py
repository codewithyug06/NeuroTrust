from typing import Dict, List, Tuple

# --- 3.1 SEMANTIC FRAUD MODELS ---

class IntentClassifier:
    """
    Classifies conversation intent into Low/Medium/High risk.
    Model: Semantic Intent Classification.
    """
    RISK_PHRASES = {
        "urgent": 10, "immediate": 10, "police": 20, "arrest": 30,
        "gift card": 50, "transfer": 15, "password": 40, "ssn": 45
    }

    @staticmethod
    def analyze_intent(text: str) -> Tuple[str, float]:
        """
        Returns (RiskLevel, RiskScore 0-100)
        """
        score = 0
        text = text.lower()
        
        for phrase, weight in IntentClassifier.RISK_PHRASES.items():
            if phrase in text:
                score += weight
                
        if score > 60: return "HIGH", min(score, 100)
        if score > 20: return "MEDIUM", score
        return "LOW", score

# --- 3.2 SOCIAL ENGINEERING MODELS ---

class SocialEngineeringDetector:
    """
    Detects behavioral deception.
    Model: Social Engineering Detection Model.
    """
    @staticmethod
    def detect_coercion(text: str, intent_score: float) -> Dict:
        # Heuristic: High urgency + financial request = Social Engineering
        is_coercion = False
        confidence = 0.0
        
        financial_terms = ["bank", "wire", "btc", "crypto", "money", "fund"]
        has_financial = any(t in text.lower() for t in financial_terms)
        
        if intent_score > 40 and has_financial:
            is_coercion = True
            confidence = 0.85
            
        return {
            "is_social_engineering": is_coercion,
            "tactic": "Urgency + Finance" if is_coercion else "None",
            "confidence": confidence
        }
