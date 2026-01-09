from typing import List, Optional, Dict
from app.services.agent_registry import AgentRegistry
from app.models import AgentPassport, AgentSponsor
from app.services.models.identity_models import DIDManager, VerifiableCredentialIssuer, TrustGraph
from datetime import datetime

class IdentityService:
    """
    Implements Category 2: Identity & Agent Uniqueness.
    Manages Agent Passports, Sponsorships, and Revocations.
    """
    
    @staticmethod
    def verify_user_did(did: str) -> Dict:
        """
        Verifies a human user's Decentralized Identifier.
        """
        resolution = DIDManager.resolve_did(did)
        if resolution["valid"]:
            return {"verified": True, "did_doc": resolution["document"]}
        return {"verified": False, "reason": "DID Resolution Failed"}

    @staticmethod
    def get_agent_passport(oid: str) -> Optional[AgentPassport]:
        """
        Retrieves the full cryptographic passport for an agent.
        """
        lookup = AgentRegistry.lookup_agent(oid)
        if not lookup["found"] or not lookup["is_trusted"]:
            return None
            
        data = lookup["metadata"]
        sponsor_str = data.get("sponsor", "Unknown")
        sponsor_name = sponsor_str.split("(")[0].strip() if "(" in sponsor_str else sponsor_str
        
        return AgentPassport(
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
            model_hash="sha256:8f4b3c2d1e..."
        )

    @staticmethod
    def revoke_identity(oid: str, reason: str) -> bool:
        """
        Revokes an agent's identity and adds to global blacklist.
        """
        # In a real system, this would write to the blockchain/ledger.
        AgentRegistry.block_agent(oid)
        # Log revocation reason...
        print(f"REVOKING AGENT {oid}: {reason}")
        return True
