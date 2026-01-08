import random
import time
from datetime import datetime

class MockAIService:
    """
    Centralized Service for simulating Azure AI, OpenAI, and Verification logic.
    Refactored to provide clean, reusable business logic separate from API controllers.
    """

    @staticmethod
    def analyze_scan(scenario: str) -> dict:
        """
        Simulates Azure Face API & Voice biometric analysis.
        """
        # Simulate Processing Latency
        time.sleep(random.uniform(0.8, 1.5))
        
        current_time = datetime.now().strftime("%H:%M:%S")

        if scenario == "SAFE":
            # High Trust Scenario
            return {
                "verdict": "AUTHENTIC_MEDIA",
                "safety_score": random.randint(96, 99),
                "confidence": "HIGH",
                "entra_verified": True,
                "biometrics": {
                    "liveness": "PASSED",
                    "voice_match": "MATCH_CONFIRMED",
                    "blink_rate": random.randint(12, 18),
                    "head_yaw": random.randint(-5, 5)
                },
                "mood_score": random.randint(95, 99),
                "voice_jitter": random.uniform(0.01, 0.03),
                "device_fingerprint": {
                    "model": "iPhone 15 Pro",
                    "ip_region": "New York, USA",
                    "trust_level": "KNOWN_DEVICE"
                },
                "logs": [
                    f"[{current_time}] Azure Vision: Liveness Confirmed (99.8%)",
                    f"[{current_time}] Voice ID: Match (Sample 44kHz)",
                    f"[{current_time}] Entra: Verified Credential Present"
                ]
            }
        else:
            # Deepfake Scenario
            vals = {
                "blink": random.randint(0, 5),
                "jitter": random.uniform(0.35, 0.65),
                "mood": random.randint(15, 35)
            }
            return {
                "verdict": "SYNTHETIC_MEDIA_DETECTED",
                "safety_score": random.randint(12, 28),
                "confidence": "CRITICAL",
                "entra_verified": False,
                "biometrics": {
                    "liveness": "FAILED",
                    "voice_match": "NO_MATCH",
                    "blink_rate": vals["blink"],
                    "head_yaw": 0 
                },
                "mood_score": vals["mood"],
                "voice_jitter": vals["jitter"],
                "device_fingerprint": {
                    "model": "Unknown/Emulator",
                    "ip_region": "Relay Node (Tor)",
                    "trust_level": "HIGH_RISK"
                },
                "logs": [
                    f"[{current_time}] Azure Vision: Artifacts Detected (GAN)",
                    f"[{current_time}] Voice ID: Jitter High ({vals['jitter']:.2f})",
                    f"[{current_time}] Entra: No Credential Found"
                ]
            }

    @staticmethod
    def generate_guardian_response(message: str) -> dict:
        """
        Simulates Azure OpenAI GPT-4o Guardian Agent.
        """
        prompt = message.lower()
        response = "I am monitoring this connection."
        action = "MONITOR"
        
        # Intent Matching
        if any(k in prompt for k in ["verify", "money", "card", "pay", "bank"]):
            response = "I have detected a financial request. Please provide your Agent ID and C2PA credentials immediately."
            action = "INTERROGATE"
        elif any(k in prompt for k in ["urgent", "police", "jail", "arrest", "now"]):
            response = "Your sentiment analysis indicates artificial urgency. This call is being recorded for forensic analysis."
            action = "WARN"
        elif any(k in prompt for k in ["ssn", "social security", "password", "code", "otp"]):
            response = "SENSITIVE DATA REQUEST BLOCKED. You are engaging in a prohibited pattern. Trace initiated."
            action = "BLOCK"
        elif "who are you" in prompt:
            response = "I am the NeuroTrust Guardian Agent assigned to this user. I intercept unverified communications."
            action = "IDENTIFY"
            
        # Simulate Token Streaming Latency
        latency_ms = 300 + (len(response) * 20)
        time.sleep(latency_ms / 1000.0)

        return {
            "response": response,
            "action": action,
            "model": "gpt-4o",
            "latency_ms": latency_ms
        }

    @staticmethod
    def verify_news(url: str) -> dict:
        """
        Simulates C2PA Content Credentials verification.
        """
        time.sleep(0.8) # Network layency
        is_safe = "fake" not in url.lower()

        if is_safe:
            return {
                "trust_score": 99,
                "publisher": "Associated Press (AP)",
                "c2pa_valid": True,
                "ai_generated_prob": 1,
                "metadata": {
                    "signed_by": "did:web:ap.org",
                    "timestamp": datetime.utcnow().isoformat()
                }
            }
        else:
             return {
                "trust_score": 12,
                "publisher": "Unknown Source",
                "c2pa_valid": False,
                "ai_generated_prob": 88,
                "metadata": {
                    "error": "Signature Missing"
                }
            }
