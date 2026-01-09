from typing import Dict, List, Optional
from datetime import datetime
import hashlib
import random

# --- 1.1 HUMAN IDENTITY MODELS ---

class DIDManager:
    """
    Manages Decentralized Identifiers (DID) for users and agents.
    Model: Decentralized Identifier (DID) Model.
    """
    @staticmethod
    def resolve_did(did: str) -> Dict:
        # Mock DID Resolution
        return {
            "did": did,
            "document": {
                "id": did,
                "verificationMethod": [{
                    "id": f"{did}#key-1",
                    "type": "Ed25519VerificationKey2020",
                    "controller": did,
                    "publicKeyMultibase": "z6MkpTHR8VNsBxYAAWh0..."
                }]
            },
            "valid": True
        }

class VerifiableCredentialIssuer:
    """
    Issues and verifies VCs.
    Model: Verifiable Credentials (VC) Model.
    """
    @staticmethod
    def issue_credential(subject_did: str, claims: Dict) -> Dict:
        return {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            "type": ["VerifiableCredential", "IdentityCredential"],
            "issuer": "did:web:aegis.neurotrust.ai",
            "issuanceDate": datetime.now().isoformat(),
            "credentialSubject": {
                "id": subject_did,
                **claims
            },
            "proof": {
                "type": "Ed25519Signature2018",
                "jwt": "eyJhbGciOiJFZERTQS..."
            }
        }

class TrustGraph:
    """
    Manages relationship trust nodes.
    Model: Relationship Trust Graph.
    """
    def __init__(self):
        self.nodes = {} # userid -> [related_did]

    def get_relationship_strength(self, did_a: str, did_b: str) -> float:
        """
        Returns trust modifier based on relationship (Family, Org, Stranger).
        """
        # Mock Graph Lookup
        if did_b.endswith("family"): return 1.5 # Boost trust
        if did_b.endswith("org"): return 1.2
        return 1.0

# --- 1.2 AI AGENT IDENTITY MODELS ---

class AgentRoleBlueprint:
    """
    Defines permissible actions for an agent role.
    Model: Agent Role Blueprint Model.
    """
    ROLES = {
        "Customer Service": ["read_order", "process_refund", "chat"],
        "Financial Advisor": ["view_balance", "transfer_funds", "advising"],
        "Medical Assistant": ["read_history", "schedule_appointment"]
    }

    @staticmethod
    def validate_action(role: str, action: str) -> bool:
        allowed = AgentRoleBlueprint.ROLES.get(role, [])
        return action in allowed

class AgentSponsorshipModel:
    """
    Validates agent sponsors.
    Model: Agent Sponsorship Model.
    """
    @staticmethod
    def verify_sponsor(sponsor_name: str) -> Dict:
        # Mock Legal Entity Identifier (LEI) check
        trusted_sponsors = ["Chase Bank", "Microsoft", "Mayo Clinic"]
        if any(s in sponsor_name for s in trusted_sponsors):
            return {"verified": True, "lei": "5493001KJTIIGC8Y1R17", "reputation": 99}
        return {"verified": False, "lei": None, "reputation": 10}
