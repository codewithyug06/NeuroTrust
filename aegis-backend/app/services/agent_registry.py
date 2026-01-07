from datetime import datetime, timedelta
from typing import Dict, Optional, List
import random

class AgentRegistry:
    """
    Simulates a decentralized identity registry (DID) running on Azure Cosmos DB.
    Now includes 'Cognitive Support' (Memory) and 'Sponsorship' tracking.
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
            "reputation_score": 99.9,
            "verification_proof": "Entra_Verifiable_Credential_v2",
            "sponsor": "Bank of America Corp (LEI: 5493005F...", # FEATURE: Agent Sponsorship
            "graph_context": {
                "relationship": "Assigned Case Worker",
                "case_id": "CAS-29381-X9Y2",
                "last_interaction": "2 days ago",
                "memory_recall": "Last discussed: Mortgage Refinance Rate" # FEATURE: Cognitive Support
            }
        },
        "microsoft-support-id": {
            "name": "Microsoft Azure Support",
            "tier": "ENTERPRISE_VERIFIED",
            "category": "Technical Support",
            "did": "did:web:microsoft.com",
            "issued_at": "2025-05-12T10:00:00Z",
            "accreditation": "Official Partner",
            "c2pa_profile": "MS_Enterprise_v2",
            "reputation_score": 100.0,
            "verification_proof": "Entra_Verifiable_Credential_v2",
            "sponsor": "Microsoft Corporation",
            "graph_context": {
                "relationship": "Enterprise Support Plan",
                "case_id": "SR-99281-AZ",
                "last_interaction": "1 hour ago",
                "memory_recall": "Last discussed: VM Quota Increase"
            }
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
            "associated_botnet": "DarkNexus-v4",
            "verification_proof": "MISSING_SIGNATURE",
            "sponsor": "UNKNOWN / ANONYMOUS",
            "graph_context": None
        },
        "bot-net-id": {
            "name": "Automated Dialer",
            "risk_level": "HIGH",
            "threat_vector": "Spam / Phishing",
            "reported_count": 50000,
            "verification_proof": "REVOKED_CERTIFICATE",
            "sponsor": "Shell Company LLC",
            "graph_context": None
        }
    }

    @staticmethod
    def lookup_agent(oid: str) -> Dict:
        """
        Phase 1: Identity Resolution.
        Queries the registry for an Agent's OID (Object ID).
        """
        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent:
            return {
                "found": True,
                "is_trusted": True,
                "metadata": agent,
                "timestamp": datetime.utcnow().isoformat(),
                "trace_id": f"req-{random.randint(1000,9999)}-secure"
            }
        
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
        Simulates Microsoft Graph API: Fetches relationship context and 'Memory' 
        to support elderly/dementia users (Social Impact).
        """
        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent and agent.get("graph_context"):
            return agent["graph_context"]
        return {"relationship": "None", "case_id": "N/A", "memory_recall": "No previous interaction"}
        
    @staticmethod
    def check_conditional_access(oid: str, ip_address: str = "192.168.1.1") -> bool:
        """
        FEATURE: Conditional Access for Agents.
        Blocks agents based on risk signals (Location Anomaly).
        """
        # Simulation: Block if IP simulates a "Risky Region"
        if "Proxy" in ip_address or oid in AgentRegistry.KNOWN_THREATS:
            return False # Block Access
        return True # Allow Access