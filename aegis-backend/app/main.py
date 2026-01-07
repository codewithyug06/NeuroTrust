from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import handshake, analysis  # <--- IMPORT ANALYSIS
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Universal Trust Protocol Middleware",
    version="1.0.0",
    docs_url="/docs"
)

# Enable CORS so your React Frontend can talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the Routes
app.include_router(handshake.router, prefix=settings.API_V1_STR)
app.include_router(analysis.router, prefix=settings.API_V1_STR) # <--- REGISTER IT

@app.get("/")
def health_check():
    return {
        "system": "Aegis Trust Protocol", 
        "status": "ONLINE",
        "phase": "PHASE_2_COMPLETE"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)