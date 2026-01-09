import time
import uuid
import random
from typing import Dict, Optional
from app.models import HandshakeResponse, TrustScore, AgentPassport, TelemetryData, AgentSponsor
from app.services.agent_registry import AgentRegistry
from app.core.config import settings

class BTPService:
    """
    Implements Category 1: Bi-Directional Trust Protocol.
    Handles the handshake between Human (User) and AI (Agent).
    """
    
    @staticmethod
    def verify_agent_identity(oid: str, client_proof: Optional[str] = None) -> Dict:
        """
        Verifies the Agent's identity against the Registry and checks cryptographic proofs.
        """
        # 1. Registry Lookup
        lookup = AgentRegistry.lookup_agent(oid)
        if not lookup["found"]:
            return {"status": "UNKNOWN", "data": None}
            
        if lookup["is_threat"]:
            return {"status": "THREAT", "data": lookup["metadata"]}
            
        # 2. Simulate Crypto Verification of the Agent's "Passport"
        # In real world: Verify DID signature
        is_crypto_valid = True 
        if not is_crypto_valid:
             return {"status": "INVALID_SIG", "data": None}
             
        return {"status": "VERIFIED", "data": lookup["metadata"]}

    @staticmethod
    def execute_handshake(oid: str, context: Optional[Dict] = None) -> HandshakeResponse:
        """
        Main BTP Handshake logic.
        Orchestrates: Identity -> Deepfake -> Intent -> Trust Score -> Guardian -> Threat.
        """
        start_time = time.time()
        logs = [f"Initiating BTP Handshake for OID: {oid}...", f"Timestamp: {time.time()}"]
        
        # --- 1. IDENTITY & THREAT INTELLIGENCE ---
        # Category 1 (Identity) & Category 6 (Threat Swarms)
        
        # Check Global Swarms first
        from app.services.models.threat_models import SwarmDetector
        if SwarmDetector.detect_swarm():
            logs.append("!! GLOBAL THREAT SWARM DETECTED !! - Heightened Defenses Active")
        
        # Verify Identity
        verification = BTPService.verify_agent_identity(oid)
        identity_score = 98 if verification["status"] == "VERIFIED" else 45
        if verification["status"] == "THREAT":
            identity_score = 10
            
        logs.append(f"Identity Status: {verification['status']} (Score: {identity_score})")

        # --- 2. DEEPFAKE & AUTHENTICITY ANALYSIS ---
        # Category 2 (Deepfake Models)
        from app.services.deepfake_service import DeepfakeService
        
        # Mocking media stream ID for demo purposes
        stream_id = "live_stream_01" 
        # In a real call, we would process actual audio bytes here.
        # For now, we simulate the result based on context or random demo data.
        deepfake_result = DeepfakeService.analyze_media_stream(stream_id, b"mock_audio_bytes")
        logs.append(f"Deepfake Analysis: {deepfake_result['type']} ({deepfake_result['trust_impact']} trust impact)")
        
        deepfake_prob = 98 if deepfake_result["detected"] else 2
        
        # --- 3. SEMANTIC FRAUD & INTENT ---
        # Category 3 (Intent Models)
        from app.services.models.fraud_models import IntentClassifier, SocialEngineeringDetector
        
        # Simulate conversation text (would come from Speech-to-Text)
        transcript = context.get("transcript", "Hello, I am calling about your account access.")
        intent_level, intent_score = IntentClassifier.analyze_intent(transcript)
        logs.append(f"Intent Analysis: {intent_level} (Risk: {intent_score})")
        
        soc_eng_result = SocialEngineeringDetector.detect_coercion(transcript, intent_score)
        if soc_eng_result["is_social_engineering"]:
            logs.append(f"!! SOCIAL ENGINEERING DETECTED !! - Tactic: {soc_eng_result['tactic']}")
            intent_score = 95 # Max risk

        # --- 4. TRUST SCORE ENGINE ---
        # Category 4 (Trust Scoring)
        from app.services.trust_engine import TrustScoreEngine
        from datetime import datetime
        
        trust_eval = TrustScoreEngine.calculate_trust(
            identity_score=float(identity_score),
            deepfake_probability=float(deepfake_prob),
            intent_risk_score=float(intent_score),
            context="handshake"
        )
        final_score = trust_eval["score"]
        trust_level = trust_eval["level"]
        logs.append(f"Final Trust Calculation: {final_score}/100 ({trust_level})")

        # --- 5. GUARDIAN ACTIVE DEFENSE ---
        # Category 5 (Guardian Models)
        from app.services.models.guardian_models import InterventionLogic
        
        guardian_action = InterventionLogic.decide_action(final_score, "HIGH" if intent_score > 80 else "LOW")
        logs.append(f"Guardian Decision: {guardian_action}")
        
        # Response Construction
        ui_action = "SHOW_GREEN_SHIELD"
        if guardian_action == "BLOCK" or verification["status"] == "THREAT":
            ui_action = "SHOW_RED_WARNING"
            final_score = 0
            trust_level = "BLOCKED"
        elif guardian_action == "INTERCEPT" or trust_level == "CAUTION":
            ui_action = "SHOW_YELLOW_WARNING"
        
        # Assemble Passport if verified
        passport = None
        if verification["status"] == "VERIFIED":
             data = verification["data"]
             sponsor_data = data.get("sponsor", "Unknown")
             sponsor_name = sponsor_data.split("(")[0].strip() if "(" in sponsor_data else sponsor_data
             
             passport = AgentPassport(
                did=data["did"],
                name=data["name"],
                category=data["category"],
                tier=data["tier"],
                issued_at=data.get("issued_at", datetime.now()),
                expiry=data.get("expiry", datetime.now()),
                public_key_thumbprint=data.get("public_key_thumbprint", "unknown"),
                sponsor=AgentSponsor(name=sponsor_name, verified=True),
                c2pa_profile=data.get("c2pa_profile"),
                verification_proof=data.get("verification_proof"),
                liability_bond=5000000,
                model_hash="sha256:8f4b..."
            )

        return HandshakeResponse(
            status=guardian_action, # ALLOW, BLOCK, INTERCEPT
            trust_score=TrustScore(score=final_score, level=trust_level, factors=trust_eval["breakdown"]),
            agent_passport=passport,
            ui_action=ui_action,
            details={
                "message": f"Connection {guardian_action}",
                "reason": logs[-1],
                "guardian_intervention": guardian_action in ["INTERCEPT", "BLOCK"]
            },
            logs=logs,
            telemetry=TelemetryData(latency_ms=(time.time()-start_time)*1000, region="East US", protocol="AEGIS-BTP-v2")
        )
