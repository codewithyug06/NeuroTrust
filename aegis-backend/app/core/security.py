from fastapi import HTTPException
from typing import Dict

def verify_identity_token(token: str) -> Dict:
    """
    Simulates Microsoft Entra Verified ID check.
    In production, this validates the DID (Decentralized Identity) signature.
    """
    # DEMO LOGIC: 
    # If token contains 'valid', we assume the cryptographic signature is good.
    if "valid" in token.lower():
        return {
            "verified": True,
            "did": "did:ion:EiD3...8921",
            "issuer": "Microsoft Entra Verified ID",
            "assurance_level": "high"
        }
    
    # If token is 'unknown' or 'hacker'
    return {
        "verified": False,
        "error": "DID_SIGNATURE_MISMATCH"
    }

def verify_c2pa_manifest(stream_metadata: dict) -> Dict:
    """
    Simulates checking the C2PA (Coalition for Content Provenance and Authenticity) watermark.
    """
    if stream_metadata.get("has_watermark"):
        return {"valid": True, "signer": "Adobe/Microsoft Trust List"}
    return {"valid": False, "risk": "NO_PROVENANCE_DATA"}