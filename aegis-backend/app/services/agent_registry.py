from datetime import datetime

class AgentRegistry:
    # Simulates a Cosmos DB query
    # Only these IDs get the "Green Shield"
    TRUSTED_AGENTS = {
        "00000003-0000-0000-c000-000000000000": {
            "name": "Bank of America Support Bot",
            "tier": "Platinum",
            "category": "Financial Services",
            "sponsor": "Bank of America Corp.",
            "verification_date": "2026-01-01T00:00:00Z"
        }
    }

    @staticmethod
    def get_agent_status(oid: str):
        agent = AgentRegistry.TRUSTED_AGENTS.get(oid)
        if agent:
            return {
                "is_trusted": True, 
                "metadata": agent,
                "timestamp": datetime.utcnow().isoformat()
            }
        
        return {
            "is_trusted": False, 
            "metadata": None,
            "timestamp": datetime.utcnow().isoformat()
        }