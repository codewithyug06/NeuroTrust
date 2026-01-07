from datetime import datetime, timedelta
from typing import Dict, Optional, List
import random

class AgentRegistry:
    """
    Simulates a decentralized identity registry (DID) running on Azure Cosmos DB.
    Acts as the 'Source of Truth' for the Trust Protocol.
    """
    
    # --- THE GREEN LIST (Trusted Identities) ---
    TRUSTED_AGENTS = {
        "00000003-0000-0000-c000-000000000000": {
            "name": "Bank of America Support",
            "tier": "PLATINUM_VERIFIED",
            "category": "Financial Services",
            "did": "did:ion:EiCPH9...239",
            "public_key_thumbprint": "7A8B9C0D1E2F3G4H...",
            "issued_at": "2024-01-01T00:00:00Z",
            "expiry": "2030-01-01T00:00:00Z",
            "accreditation": "FDIC Insured Contact Center",
            "c2pa_profile": "Standard_Banking_v1",
            "reputation_score": 99.9
        },
        "microsoft-support-id": {
            "name": "Microsoft Azure Support",
            "tier": "ENTERPRISE_VERIFIED",
            "category": "Technical Support",
            "did": "did:web:microsoft.com",
            "issued_at": "2025-05-12T10:00:00Z",
            "accreditation": "Official Partner",
            "c2pa_profile": "MS_Enterprise_v2",
            "reputation_score": 100.0
        }
    }

    # --- THE BLACK LIST (Known Threat Signatures) ---
    KNOWN_THREATS = {
        "hacker-oid": {
            "name": "Unknown Caller",
            "risk_level": "CRITICAL",
            "threat_vector": "Synthetic Voice / Deepfake Video",
            "reported_count": 1420,
            "last_seen_location": "Unknown Proxy",
            "associated_botnet": "DarkNexus-v4"
        }
    }

    @staticmethod
    def lookup_agent(oid: str) -> Dict:
        """
        Phase 1: Identity Resolution.
        Queries the registry for an Agent's OID (Object ID).
        """
        # 1. Check Trusted List
        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent:
            return {
                "found": True,
                "is_trusted": True,
                "metadata": agent,
                "timestamp": datetime.utcnow().isoformat(),
                "trace_id": f"req-{random.randint(1000,9999)}-secure"
            }
        
        # 2. Check Threat List
        threat = AgentRegistry.KNOWN_THREATS.get(oid)
        if threat:
             return {
                "found": True,
                "is_trusted": False,
                "is_threat": True,
                "metadata": threat,
                "timestamp": datetime.utcnow().isoformat(),
                "trace_id": f"alert-{random.randint(1000,9999)}-block"
            }

        # 3. Default: Unknown/Untrusted
        return {
            "found": False,
            "is_trusted": False,
            "metadata": None,
            "timestamp": datetime.utcnow().isoformat(),
            "trace_id": f"unknown-{random.randint(1000,9999)}"
        }

    @staticmethod
    def get_extended_graph_data(oid: str) -> Dict:
        """
        NEW FUNCTION: Simulates a Microsoft Graph API call to fetch
        relationship context (e.g., 'Is this agent assigned to my case?').
        """
        if oid in AgentRegistry.TRUSTED_AGENTS:
            return {
                "relationship": "Assigned Case Worker",
                "case_id": "CAS-29381-X9Y2",
                "last_interaction": "2 days ago"
            }
        return {"relationship": "None", "case_id": None}