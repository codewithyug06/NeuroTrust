import { useState, useEffect, useRef } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard, ScanLine, AlertTriangle, CheckCircle, Database, Cpu, Fingerprint } from 'lucide-react'
import Dashboard from './Dashboard';

const API_URL = "http://localhost:8000/api/v1";

export default function App() {
  const [view, setView] = useState("PHONE");
  const [callStatus, setCallStatus] = useState("IDLE"); // IDLE, STAGE_1_IDENTITY, STAGE_2_AI, ACTIVE, BLOCKED
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");
  const [liveLogs, setLiveLogs] = useState([]);
  
  // LOGIC VISUALIZATION STATES
  const [step1Status, setStep1Status] = useState("PENDING"); // PENDING, PROCESSING, SUCCESS, FAILED
  const [step2Status, setStep2Status] = useState("PENDING");

  // Auto-scroll logs
  const logsEndRef = useRef(null);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [liveLogs]);

  useEffect(() => {
    if (view === "PHONE") {
      startSecureConnectionFlow();
    }
  }, [isSafeMode, view]);

  const addLog = (msg) => {
    setLiveLogs(prev => [...prev, `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`]);
  }

  // --- THE ENHANCED LOGIC FLOW ---
  const startSecureConnectionFlow = async () => {
    // RESET
    setCallStatus("STAGE_1_IDENTITY");
    setStep1Status("PROCESSING");
    setStep2Status("PENDING");
    setAgentName(isSafeMode ? "Bank of America Support" : "Unknown Caller");
    setLiveLogs([]);
    addLog("INITIATING AEGIS PROTOCOL v4.0...");
    addLog("INTERCEPTING INCOMING SIP STREAM...");

    const token = isSafeMode ? "valid-token" : "unknown-attacker";

    // STAGE 1: IDENTITY (Entra ID)
    setTimeout(async () => {
        try {
            addLog("CONNECTING TO MICROSOFT ENTRA...");
            const handshakeRes = await fetch(`${API_URL}/verify-handshake`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    oid: isSafeMode ? "00000003-0000-0000-c000-000000000000" : "hacker-oid",
                    name: isSafeMode ? "Bank of America Support" : "Unknown Caller" 
                })
            });
            const handshakeData = await handshakeRes.json();
            
            // Show backend logs in UI
            if(handshakeData.logs) handshakeData.logs.forEach(l => addLog(l));

            if (handshakeData.status === "VERIFIED") {
                setStep1Status("SUCCESS");
                addLog("IDENTITY CONFIRMED. PROCEEDING TO AI ANALYSIS...");
            } else {
                setStep1Status("FAILED");
                addLog("IDENTITY CHECK FAILED. SUSPICIOUS.");
            }

            // STAGE 2: AI MEDIA ANALYSIS (Azure Content Safety)
            setCallStatus("STAGE_2_AI");
            setStep2Status("PROCESSING");
            addLog("STREAMING FRAMES TO AZURE AI CONTENT SAFETY...");

            const analysisRes = await fetch(`${API_URL}/analyze-stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    scenario: isSafeMode ? "SAFE" : "ATTACK",
                    token: token
                })
            });
            const analysisData = await analysisRes.json();
            if(analysisData.logs) analysisData.logs.forEach(l => addLog(l));

            // FINAL VERDICT
            if (handshakeData.status === "VERIFIED" && analysisData.verdict !== "SYNTHETIC_MEDIA_DETECTED") {
                setStep2Status("SUCCESS");
                setCallStatus("ACTIVE");
                setTrustScore(98);
                setVerdictReason("Identity Confirmed | C2PA Valid");
                addLog("CONNECTION SECURE. ALLOWING CALL.");
            } else {
                setStep2Status("FAILED");
                setCallStatus("BLOCKED");
                setTrustScore(12);
                setVerdictReason("Deepfake Detected | Identity Mismatch");
                addLog("THREAT DETECTED. BLOCKING CONNECTION.");
            }

        } catch (error) {
            console.error(error);
            addLog("ERROR: BACKEND UNREACHABLE.");
            // Fallback for demo
            if (isSafeMode) { 
                setCallStatus("ACTIVE"); setTrustScore(99); setStep1Status("SUCCESS"); setStep2Status("SUCCESS");
            } else { 
                setCallStatus("BLOCKED"); setTrustScore(0); setStep1Status("FAILED"); setStep2Status("FAILED");
            }
        }
    }, 1000);
  };

  if (view === "DASHBOARD") return <Dashboard onBack={() => setView("PHONE")} />;

  // Inline fallback style
  const phoneStyle = {
    width: '380px', height: '750px', backgroundColor: 'black', borderRadius: '45px', 
    border: '8px solid #1f2937', position: 'relative', overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 p-4 font-sans">
      
      <div style={phoneStyle} className="relative ring-4 ring-gray-900/50">
        
        {/* TOP HEADER */}
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
                 className={`w-full h-full object-cover transition-opacity duration-700 ${(callStatus.startsWith('STAGE')) ? 'opacity-40 blur-sm' : 'opacity-90'}`} />
          ) : (
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-300 ${(callStatus.startsWith('STAGE')) ? 'opacity-40 blur-sm' : 'opacity-80'}`} />
          )}
        </div>

        {/* --- LOGIC VISUALIZATION OVERLAY (The "Matrix" Mode) --- */}
        {(callStatus.startsWith('STAGE')) && (
            <div className="absolute inset-0 z-20 flex flex-col justify-between bg-black/70 backdrop-blur-md p-6 pt-24 pb-40">
                
                {/* STEP 1: IDENTITY */}
                <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${step1Status === 'PROCESSING' ? 'bg-blue-900/30 border-blue-500/50 animate-pulse' : step1Status === 'SUCCESS' ? 'bg-green-900/30 border-green-500/50' : step1Status === 'FAILED' ? 'bg-red-900/30 border-red-500/50' : 'opacity-50 border-gray-700'}`}>
                    <div className="p-2 bg-gray-800 rounded-full">
                        {step1Status === 'PROCESSING' ? <Fingerprint className="w-6 h-6 text-blue-400 animate-pulse"/> : step1Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6 text-green-400"/> : step1Status === 'FAILED' ? <AlertTriangle className="w-6 h-6 text-red-400"/> : <Fingerprint className="w-6 h-6 text-gray-500"/>}
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-mono">STEP 1: IDENTITY</div>
                        <div className="text-sm font-bold text-white">MICROSOFT ENTRA</div>
                        {step1Status === 'PROCESSING' && <div className="text-[10px] text-blue-400">Verifying DID...</div>}
                    </div>
                </div>

                {/* STEP 2: AI ANALYSIS */}
                <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all mt-4 ${step2Status === 'PROCESSING' ? 'bg-blue-900/30 border-blue-500/50 animate-pulse' : step2Status === 'SUCCESS' ? 'bg-green-900/30 border-green-500/50' : step2Status === 'FAILED' ? 'bg-red-900/30 border-red-500/50' : 'opacity-50 border-gray-700'}`}>
                    <div className="p-2 bg-gray-800 rounded-full">
                        {step2Status === 'PROCESSING' ? <Cpu className="w-6 h-6 text-blue-400 animate-spin"/> : step2Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6 text-green-400"/> : step2Status === 'FAILED' ? <AlertTriangle className="w-6 h-6 text-red-400"/> : <Cpu className="w-6 h-6 text-gray-500"/>}
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-mono">STEP 2: MEDIA INTEGRITY</div>
                        <div className="text-sm font-bold text-white">AZURE AI SAFETY</div>
                        {step2Status === 'PROCESSING' && <div className="text-[10px] text-blue-400">Scanning Frames...</div>}
                    </div>
                </div>

                {/* LIVE CODE LOGS */}
                <div className="mt-8 flex-1 bg-black/80 rounded border border-gray-800 p-2 font-mono text-[9px] text-green-500 overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-gray-900 px-1 text-[8px] text-gray-400">LIVE TERMINAL</div>
                    <div className="h-full overflow-y-auto no-scrollbar flex flex-col justify-end">
                        {liveLogs.map((log, i) => (
                            <div key={i} className="mb-1 opacity-80 border-l-2 border-green-900 pl-1">{log}</div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>

            </div>
        )}

        {/* SHIELD OVERLAY (Final Result) */}
        <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
             style={{
                 border: callStatus === 'ACTIVE' ? '8px solid #22c55e' : callStatus === 'BLOCKED' ? '8px solid #dc2626' : 'none',
                 boxShadow: callStatus === 'ACTIVE' ? 'inset 0 0 80px rgba(34,197,94,0.4)' : callStatus === 'BLOCKED' ? 'inset 0 0 100px rgba(220,38,38,0.6)' : 'none'
             }}></div>

        {/* BOTTOM CARD */}
        <div className="absolute bottom-10 left-4 right-4 bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 z-30 shadow-2xl transition-all duration-500">
          {(callStatus.startsWith('STAGE')) && (
             <div className="flex items-center gap-3 text-blue-400">
               <Activity className="w-5 h-5 animate-spin" />
               <div><div className="font-bold text-xs tracking-wider">SECURE HANDSHAKE</div><div className="text-[10px] text-blue-200/70 font-mono">Negotiating Trust Protocol...</div></div>
             </div>
          )}
          {callStatus === 'ACTIVE' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle className="w-8 h-8" />
                <div><div className="font-bold text-sm tracking-widest">VERIFIED</div><div className="text-[10px] text-green-200/70">Entra ID + C2PA Valid</div></div>
              </div>
              <div className="text-3xl font-bold text-white">{trustScore}%</div>
            </div>
          )}
          {callStatus === 'BLOCKED' && (
            <div className="flex items-center gap-3 text-red-500 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
              <div><div className="font-bold text-sm tracking-widest">BLOCKED</div><div className="text-[10px] text-red-200/80">{verdictReason}</div></div>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="absolute bottom-32 w-full flex justify-center gap-6 z-30">
          <button className="p-4 rounded-full bg-red-600 hover:bg-red-700 shadow-lg transform hover:scale-110 transition-all text-white"><Phone className="w-6 h-6 rotate-[135deg]" /></button>
          <button className="p-4 rounded-full bg-gray-700/50 backdrop-blur text-white hover:bg-gray-600"><Video className="w-6 h-6" /></button>
        </div>
      </div>

      {/* --- WIZARD OF OZ --- */}
      <div className="fixed bottom-6 right-6 bg-gray-900/90 backdrop-blur p-4 rounded-xl border border-gray-700 shadow-2xl z-50 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Demo Controller</h3>
        <div className="flex gap-2">
          <button onClick={() => setIsSafeMode(true)} className={`px-4 py-2 text-xs rounded-lg font-bold border transition-all ${isSafeMode ? 'bg-green-900/50 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>SCENARIO A<br/><span className="text-[8px] font-normal">Authentic</span></button>
          <button onClick={() => setIsSafeMode(false)} className={`px-4 py-2 text-xs rounded-lg font-bold border transition-all ${!isSafeMode ? 'bg-red-900/50 border-red-500 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>SCENARIO B<br/><span className="text-[8px] font-normal">Deepfake</span></button>
        </div>
        <button onClick={() => setView("DASHBOARD")} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all">
          <LayoutDashboard className="w-4 h-4" /> GLOBAL MAP
        </button>
      </div>

    </div>
  )
}