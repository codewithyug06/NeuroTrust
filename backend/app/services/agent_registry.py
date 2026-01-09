from datetime import datetime, timedelta
from typing import Dict, Optional, List
import random

class AgentRegistry:
    """
    Simulates a decentralized identity registry (DID) running on Azure Cosmos DB.
    Source of Truth for Identity, Sponsorship, and Enterprise Compliance.
    """
    
    # --- PERSISTENCE SIMULATION (In-Memory Database) ---
    # In a real app, this would be Azure Cosmos DB.
    DYNAMIC_BLACKLIST = set(["hacker-oid", "bot-net-id"])

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
            "sponsor": "Bank of America Corp (LEI: 5493005F...",
            
            # FEATURE: Business Viability & Compliance
            "compliance_score": 98,
            "fraud_insurance_reduction": "15%",
            "sfi_alignment": "TIER_1_COMPLIANT",
            
            "graph_context": {
                "relationship": "Assigned Case Worker",
                "case_id": "CAS-29381-X9Y2",
                "last_interaction": "2 days ago",
                "memory_recall": "Last discussed: Mortgage Refinance Rate"
            }
        },
        "microsoft-support-id": {
            "name": "Microsoft Azure Support",
            "tier": "ENTERPRISE_VERIFIED",
            "category": "Technical Support",
            "did": "did:web:microsoft.com",
            "accreditation": "Official Partner",
            "reputation_score": 100.0,
            "verification_proof": "Entra_Verifiable_Credential_v2",
            "sponsor": "Microsoft Corporation",
            
            "compliance_score": 100,
            "fraud_insurance_reduction": "20%",
            "sfi_alignment": "NATIVE_IMPLEMENTATION",
            
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
            "verification_proof": "MISSING_SIGNATURE",
            "sponsor": "UNKNOWN / ANONYMOUS",
            "graph_context": None
        }
    }

    @staticmethod
    def lookup_agent(oid: str) -> Dict:
        """
        Check Trust Registry & Dynamic Blacklist.
        """
        if oid in AgentRegistry.DYNAMIC_BLACKLIST:
             return {
                "found": True,
                "is_trusted": False,
                "is_threat": True,
                "metadata": AgentRegistry.KNOWN_THREATS.get(oid, {"name": "Blocked ID"}),
                "timestamp": datetime.utcnow().isoformat(),
                "trace_id": f"alert-{random.randint(1000,9999)}-block"
            }

        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent:
            return {
                "found": True,
                "is_trusted": True,
                "metadata": agent,
                "timestamp": datetime.utcnow().isoformat(),
                "trace_id": f"req-{random.randint(1000,9999)}-secure"
            }
        
        return {
            "found": False,
            "is_trusted": False,
            "metadata": None,
            "timestamp": datetime.utcnow().isoformat(),
            "trace_id": f"unknown-{random.randint(1000,9999)}"
        }

    @staticmethod
    def block_agent(oid: str):
        """
        FEATURE: Persistent Storage / Immunization.
        Adds an agent to the dynamic blacklist.
        """
        AgentRegistry.DYNAMIC_BLACKLIST.add(oid)
        return True

    @staticmethod
    def get_extended_graph_data(oid: str) -> Dict:
        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent and agent.get("graph_context"):
            return agent["graph_context"]
        return {"relationship": "None", "case_id": "N/A", "memory_recall": "No previous interaction"}