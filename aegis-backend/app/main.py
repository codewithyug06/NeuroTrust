from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import handshake, analysis 

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend service for Aegis: The Universal Trust Protocol. Powered by Microsoft Entra & Azure AI.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# --- MIDDLEWARE ---
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["POST", "GET", "OPTIONS"],
        allow_headers=["*"],
    )

# --- ROUTER REGISTRATION ---
app.include_router(handshake.router, prefix=settings.API_V1_STR)
app.include_router(analysis.router, prefix=settings.API_V1_STR) 

@app.get("/health")
def health_check():
    """
    Heartbeat endpoint.
    """
    return {
        "status": "online",
        "system": "Aegis Core",
        "version": settings.VERSION,
        "mode": "MOCK_SIMULATION" if settings.USE_MOCK_SERVICES else "PRODUCTION",
        "fabric_stream": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)