import { useState, useEffect } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard, ScanLine, AlertTriangle, CheckCircle } from 'lucide-react'
import Dashboard from './Dashboard';

// Define Backend URL
const API_URL = "http://localhost:8000/api/v1";

function App() {
  const [view, setView] = useState("PHONE");
  const [callStatus, setCallStatus] = useState("IDLE"); // IDLE, HANDSHAKING, ANALYZING, ACTIVE, BLOCKED
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");
  const [scanMessage, setScanMessage] = useState("");

  // Trigger Logic when View or Mode changes
  useEffect(() => {
    if (view === "PHONE") {
      startSecureConnectionFlow();
    }
  }, [isSafeMode, view]);

  // --- THE PERFECT LOGIC FLOW (2-STAGE VERIFICATION) ---
  const startSecureConnectionFlow = async () => {
    // RESET STATE
    setCallStatus("HANDSHAKING");
    setScanMessage("ESTABLISHING SECURE TUNNEL...");
    setAgentName(isSafeMode ? "Bank of America Support" : "Unknown Caller");
    setVerdictReason("");

    // TOKEN SELECTION (Simulate Entra ID)
    const token = isSafeMode ? "valid-token" : "unknown-attacker";
    
    // STEP 1: IDENTITY HANDSHAKE (PHASE 1)
    setTimeout(async () => {
        try {
            setScanMessage("VERIFYING ENTRA ID CREDENTIALS...");
            const handshakeRes = await fetch(`${API_URL}/verify-handshake`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    oid: isSafeMode ? "00000003-0000-0000-c000-000000000000" : "hacker-oid",
                    name: isSafeMode ? "Bank of America Support" : "Unknown Caller" 
                })
            });
            const handshakeData = await handshakeRes.json();

            // STEP 2: AI MEDIA ANALYSIS (PHASE 2 - NEW!)
            setCallStatus("ANALYZING"); // Switch UI to Scanning Mode
            setScanMessage("ANALYZING C2PA & BIOMETRICS...");
            
            const analysisRes = await fetch(`${API_URL}/analyze-stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    scenario: isSafeMode ? "SAFE" : "ATTACK",
                    token: token
                })
            });
            const analysisData = await analysisRes.json();

            // STEP 3: FINAL VERDICT
            // We combine both Phase 1 and Phase 2 results for a robust decision
            if (handshakeData.status === "VERIFIED" && analysisData.verdict !== "SYNTHETIC_MEDIA_DETECTED") {
                setCallStatus("ACTIVE");
                setTrustScore(98);
                setVerdictReason("Identity Confirmed | C2PA Valid");
            } else {
                setCallStatus("BLOCKED");
                setTrustScore(12);
                setVerdictReason("Deepfake Detected | Identity Mismatch");
            }

        } catch (error) {
            console.error("Connection Error:", error);
            // ROBUST FALLBACK (Simulate success/fail if backend offline)
            if (isSafeMode) { 
                setCallStatus("ACTIVE"); setTrustScore(99); setVerdictReason("Identity Verified (Offline Mode)");
            } else { 
                setCallStatus("BLOCKED"); setTrustScore(0); setVerdictReason("Potential Fraud Detected");
            }
        }
    }, 1000); // Initial delay
  };

  if (view === "DASHBOARD") {
    return <Dashboard onBack={() => setView("PHONE")} />;
  }

  // Styles for robustness (in case CSS fails)
  const phoneStyle = {
    width: '380px', height: '750px', backgroundColor: 'black', borderRadius: '45px', 
    border: '8px solid #1f2937', position: 'relative', overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 p-4 font-sans">
      
      {/* --- PHONE DEVICE --- */}
      <div style={phoneStyle} className="relative ring-4 ring-gray-900/50">
        
        {/* TOP STATUS BAR */}
        <div className="absolute top-0 left-0 right-0 h-28 z-20 flex flex-col items-center pt-8 pointer-events-none" 
             style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)'}}>
          <div className="flex items-center gap-2 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-1">
             <Activity className="w-3 h-3 animate-pulse" /> Aegis Secure Protocol
          </div>
          <div className="text-white text-xl font-bold tracking-tight drop-shadow-md">{agentName}</div>
        </div>

        {/* VIDEO LAYER */}
        <div className="absolute inset-0 z-0 bg-gray-800">
          <div className="scanline absolute inset-0 z-10 pointer-events-none"></div> 
          {isSafeMode ? (
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover transition-opacity duration-700 ${(callStatus === 'HANDSHAKING' || callStatus === 'ANALYZING') ? 'opacity-40 blur-sm' : 'opacity-90'}`} />
          ) : (
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-300 ${(callStatus === 'HANDSHAKING' || callStatus === 'ANALYZING') ? 'opacity-40 blur-sm' : 'opacity-80'}`} />
          )}
        </div>

        {/* LOADING / SCANNING OVERLAY */}
        {(callStatus === 'HANDSHAKING' || callStatus === 'ANALYZING') && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-all">
                {callStatus === 'HANDSHAKING' && <Lock className="w-16 h-16 text-yellow-500 animate-bounce mb-4" />}
                {callStatus === 'ANALYZING' && <ScanLine className="w-16 h-16 text-blue-500 animate-spin mb-4" />}
                <div className="text-blue-400 font-mono text-xs animate-pulse tracking-widest uppercase text-center px-8">
                    {scanMessage}
                </div>
                <div className="mt-2 w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-scan"></div>
                </div>
            </div>
        )}

        {/* TRAFFIC LIGHT SHIELD OVERLAY */}
        <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
             style={{
                 border: callStatus === 'ACTIVE' ? '8px solid #22c55e' : callStatus === 'BLOCKED' ? '8px solid #dc2626' : 'none',
                 boxShadow: callStatus === 'ACTIVE' ? 'inset 0 0 80px rgba(34,197,94,0.4)' : callStatus === 'BLOCKED' ? 'inset 0 0 100px rgba(220,38,38,0.6)' : 'none'
             }}></div>

        {/* INTELLIGENCE CARD (Bottom) */}
        <div className="absolute bottom-10 left-4 right-4 bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 z-30 shadow-2xl transition-all duration-500">
          
          {/* STATE: CONNECTING/ANALYZING */}
          {(callStatus === 'HANDSHAKING' || callStatus === 'ANALYZING') && (
             <div className="flex items-center gap-3 text-blue-400">
               <Activity className="w-5 h-5 animate-spin" />
               <div><div className="font-bold text-xs tracking-wider">AEGIS AI ENGINE</div><div className="text-[10px] text-blue-200/70 font-mono">Processing real-time telemetry...</div></div>
             </div>
          )}

          {/* STATE: ACTIVE (GREEN) */}
          {callStatus === 'ACTIVE' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle className="w-8 h-8" />
                <div><div className="font-bold text-sm tracking-widest">VERIFIED</div><div className="text-[10px] text-green-200/70">Entra ID + C2PA Valid</div></div>
              </div>
              <div className="text-3xl font-bold text-white">{trustScore}%</div>
            </div>
          )}

          {/* STATE: BLOCKED (RED) */}
          {callStatus === 'BLOCKED' && (
            <div className="flex items-center gap-3 text-red-500 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
              <div><div className="font-bold text-sm tracking-widest">BLOCKED</div><div className="text-[10px] text-red-200/80">{verdictReason}</div></div>
            </div>
          )}
        </div>

        {/* CALL CONTROLS */}
        <div className="absolute bottom-32 w-full flex justify-center gap-6 z-30">
          <button className="p-4 rounded-full bg-red-600 hover:bg-red-700 shadow-lg transform hover:scale-110 transition-all text-white"><Phone className="w-6 h-6 rotate-[135deg]" /></button>
          <button className="p-4 rounded-full bg-gray-700/50 backdrop-blur text-white hover:bg-gray-600"><Video className="w-6 h-6" /></button>
        </div>
      </div>

      {/* --- WIZARD OF OZ CONTROLLER (Bottom Right) --- */}
      <div className="fixed bottom-6 right-6 bg-gray-900/90 backdrop-blur p-4 rounded-xl border border-gray-700 shadow-2xl z-50 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Demo Controller</h3>
        <div className="flex gap-2">
          <button onClick={() => setIsSafeMode(true)} className={`px-4 py-2 text-xs rounded-lg font-bold border transition-all ${isSafeMode ? 'bg-green-900/50 border-green-500 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>SCENARIO A<br/><span className="text-[8px] font-normal">Authentic</span></button>
          <button onClick={() => setIsSafeMode(false)} className={`px-4 py-2 text-xs rounded-lg font-bold border transition-all ${!isSafeMode ? 'bg-red-900/50 border-red-500 text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>SCENARIO B<br/><span className="text-[8px] font-normal">Deepfake</span></button>
        </div>
        <button onClick={() => setView("DASHBOARD")} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20">
          <LayoutDashboard className="w-4 h-4" /> GLOBAL MAP
        </button>
      </div>

    </div>
  )
}

export default App