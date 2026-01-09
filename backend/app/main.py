from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import handshake, analysis, guardian, telemetry

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend service for NeuroTrust: The Universal Trust Protocol. Powered by Microsoft Entra & Azure AI.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# --- MIDDLEWARE ---
# Explicitly define origins to avoid Pydantic URL normalization (trailing slash) issues
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Add any from settings if they exist and are not duplicates
if settings.BACKEND_CORS_ORIGINS:
    for origin in settings.BACKEND_CORS_ORIGINS:
        origin_str = str(origin).rstrip("/") # Ensure no trailing slash
        if origin_str not in origins:
            origins.append(origin_str)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["*"],
)

# --- ROUTER REGISTRATION ---
app.include_router(handshake.router, prefix=f"{settings.API_V1_STR}/handshake")
app.include_router(analysis.router, prefix=settings.API_V1_STR)
app.include_router(guardian.router, prefix=settings.API_V1_STR) # NEW: Guardian AI
app.include_router(telemetry.router, prefix=settings.API_V1_STR) # NEW: Telemetry Pipeline

@app.get("/health")
def health_check():
    """
    Heartbeat endpoint.
    """
    return {
        "status": "online",
        "system": "NeuroTrust Core",
        "version": settings.VERSION,
        "mode": "MOCK_SIMULATION" if settings.USE_MOCK_SERVICES else "PRODUCTION",
        "fabric_stream": "connected",
        "azure_regions": ["East US 2", "West Europe", "Southeast Asia"]
    }

if __name__ == "__main__":
    import uvicorn
    print(f"Starting {settings.PROJECT_NAME} in {'MOCK' if settings.USE_MOCK_SERVICES else 'LIVE'} mode...")
    # Print origins for debugging
    print(f"Allowed CORS Origins: {origins}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)