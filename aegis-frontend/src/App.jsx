import { useState, useEffect, useRef } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard, ScanLine, AlertTriangle, CheckCircle, Database, Cpu, Fingerprint, Bot, Brain, Info, Wifi, Eye, Globe, Zap, Menu } from 'lucide-react'
import Dashboard from './Dashboard';

// --- SMART NETWORK DETECTION ---
// Automatically uses your computer's IP when accessed from phone, or localhost on laptop.
// This ensures you don't need to change code when switching devices.
const API_URL = `http://${window.location.hostname}:8000/api/v1`;

export default function App() {
  const [view, setView] = useState("PHONE");
  const [callStatus, setCallStatus] = useState("IDLE"); // IDLE, STAGE_1_IDENTITY, STAGE_2_AI, ACTIVE, BLOCKED, GUARDIAN_INTERVENTION
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");
  const [liveLogs, setLiveLogs] = useState([]);
  
  // ADVANCED FEATURE STATES
  const [memoryRecall, setMemoryRecall] = useState(null); 
  const [sponsorName, setSponsorName] = useState(null); 
  const [transcriptLines, setTranscriptLines] = useState([]); 
  
  // VISUALIZATION STATES
  const [step1Status, setStep1Status] = useState("PENDING"); 
  const [step2Status, setStep2Status] = useState("PENDING");
  const [showFeatureHud, setShowFeatureHud] = useState(true);

  // Auto-scroll logs
  const logsEndRef = useRef(null);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [liveLogs]);

  // Reset transcript when status changes
  useEffect(() => {
    if (callStatus === 'IDLE') {
        setTranscriptLines([]);
        setLiveLogs([]);
    }
  }, [callStatus]);

  useEffect(() => {
    if (view === "PHONE" && callStatus === "IDLE") {
      // Optional: Auto-start logic here if needed
    }
  }, [view]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setLiveLogs(prev => [...prev, `[${time}] ${msg}`]);
  }

  const addTranscript = (line) => {
    setTranscriptLines(prev => [...prev, line]);
  }

  // --- THE CORE LOGIC FLOW ---
  const startSecureConnectionFlow = async () => {
    // RESET
    setCallStatus("STAGE_1_IDENTITY");
    setStep1Status("PROCESSING");
    setStep2Status("PENDING");
    setAgentName(isSafeMode ? "Bank of America Support" : "Unknown Caller");
    setLiveLogs([]);
    setTranscriptLines([]);
    setMemoryRecall(null);
    setSponsorName(null);
    
    addLog("INITIATING AEGIS PROTOCOL v4.0...");
    addLog("INTERCEPTING INCOMING SIP STREAM...");

    const token = isSafeMode ? "valid-token" : "unknown-attacker";

    // STAGE 1: IDENTITY HANDSHAKE
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
            
            if(handshakeData.logs) handshakeData.logs.forEach(l => addLog(l));

            if (handshakeData.details?.context?.relationship !== "None" && handshakeData.details?.context?.relationship) {
                addLog(`MICROSOFT GRAPH: ${handshakeData.details.context.relationship.toUpperCase()} (Case ${handshakeData.details.context.case_id})`);
                if (handshakeData.details.context.memory_recall) {
                    setMemoryRecall(handshakeData.details.context.memory_recall);
                    addLog(`COGNITIVE RECALL: Found context "${handshakeData.details.context.memory_recall}"`);
                }
            }
            
            if (handshakeData.details?.sponsor) {
                setSponsorName(handshakeData.details.sponsor);
            }

            if (handshakeData.status === "VERIFIED") {
                setStep1Status("SUCCESS");
                addLog("IDENTITY CONFIRMED. PROCEEDING TO AI ANALYSIS...");
            } else {
                setStep1Status("FAILED");
                addLog("IDENTITY CHECK FAILED. SUSPICIOUS.");
            }

            // STAGE 2: AI MEDIA ANALYSIS
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
                setCallStatus("GUARDIAN_INTERVENTION"); 
                setTrustScore(12);
                setVerdictReason("Deepfake Detected | Identity Mismatch");
                addLog("THREAT DETECTED. GUARDIAN AGENT ACTIVATED.");
                
                // Simulate Guardian Conversation
                setTimeout(() => addTranscript("🤖 Guardian: I have intercepted this call. State your purpose."), 500);
                setTimeout(() => addTranscript("👤 Caller: I... I need to verify a transaction."), 1500);
                setTimeout(() => addTranscript("🤖 Guardian: Your C2PA signature is missing. Verification denied."), 2500);
                setTimeout(() => addTranscript("🤖 Guardian: Terminating connection to protect user."), 3500);
                
                setTimeout(() => {
                    setCallStatus("BLOCKED");
                }, 4500); 
            }

        } catch (error) {
            console.error("Connection Error:", error);
            addLog("ERROR: BACKEND UNREACHABLE.");
            // Robust Fallback
            if (isSafeMode) { 
                setCallStatus("ACTIVE"); setTrustScore(99); setStep1Status("SUCCESS"); setStep2Status("SUCCESS"); setVerdictReason("Identity Verified (Offline Mode)");
            } else { 
                setCallStatus("BLOCKED"); setTrustScore(0); setStep1Status("FAILED"); setStep2Status("FAILED"); setVerdictReason("Potential Fraud Detected");
            }
        }
    }, 1000); 
  };

  if (view === "DASHBOARD") return <Dashboard onBack={() => setView("PHONE")} />;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden relative text-white selection:bg-blue-500 selection:text-white font-sans">
      
      {/* BACKGROUND ACCENTS (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>

      {/* --- PHONE CONTAINER (RESPONSIVE MAGIC) --- */}
      {/* ON MOBILE: w-full h-full, no border. ON LAPTOP: Fixed width/height, rounded border. */}
      <div className="relative w-full h-screen md:w-[380px] md:h-[750px] bg-black md:rounded-[45px] md:border-[8px] md:border-gray-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out">
        
        {/* DYNAMIC BORDER GLOW (Desktop Only) */}
        <div className={`absolute -inset-[3px] rounded-[3.2rem] opacity-0 md:opacity-100 transition-colors duration-500 pointer-events-none z-50 hidden md:block
            ${callStatus === 'ACTIVE' ? 'bg-gradient-to-b from-green-500/50 to-transparent' : 
              callStatus === 'BLOCKED' ? 'bg-gradient-to-b from-red-500/50 to-transparent' : 
              'bg-gray-800'}`}>
        </div>

        {/* TOP HEADER */}
        <div className="absolute top-0 left-0 right-0 h-32 z-20 flex flex-col items-center pt-10 md:pt-12 pointer-events-none bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center gap-2 text-blue-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">
             <Activity className="w-3 h-3 animate-pulse" /> Aegis Protocol
          </div>
          <div className="text-white text-2xl font-bold tracking-tight drop-shadow-xl">{agentName}</div>
          {sponsorName && callStatus !== 'BLOCKED' && (
              <div className="flex items-center gap-1.5 mt-2 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <CheckCircle className="w-3 h-3 text-blue-400" /> 
                  <span className="text-[10px] font-medium text-blue-200 tracking-wide uppercase">{sponsorName}</span>
              </div>
          )}
        </div>

        {/* VIDEO LAYER */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div> 
          {isSafeMode ? (
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover transition-opacity duration-700 ${(callStatus.startsWith('STAGE') || callStatus === 'GUARDIAN_INTERVENTION') ? 'opacity-30 blur-md scale-105' : 'opacity-90 scale-100'}`} />
          ) : (
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-300 ${(callStatus.startsWith('STAGE') || callStatus === 'GUARDIAN_INTERVENTION') ? 'opacity-30 blur-md scale-105' : 'opacity-80 scale-100'}`} />
          )}
        </div>

        {/* FEATURE HUD (Top Left - Judge's View) */}
        {showFeatureHud && (
            <div className="absolute top-4 left-4 z-40 flex flex-col gap-1.5 pointer-events-none">
                <div className="bg-black/60 backdrop-blur px-2 py-1 rounded flex items-center gap-2 border border-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-gray-300 tracking-wider">ENTRA VERIFIED ID</span>
                </div>
                <div className="bg-black/60 backdrop-blur px-2 py-1 rounded flex items-center gap-2 border border-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-gray-300 tracking-wider">AZURE AI SAFETY</span>
                </div>
                <div className="bg-black/60 backdrop-blur px-2 py-1 rounded flex items-center gap-2 border border-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-gray-300 tracking-wider">C2PA PROVENANCE</span>
                </div>
            </div>
        )}

        {/* --- LOGIC VISUALIZATION OVERLAY --- */}
        {(callStatus.startsWith('STAGE')) && (
            <div className="absolute inset-0 z-20 flex flex-col justify-center gap-4 bg-black/60 backdrop-blur-md p-6 pt-32 pb-40 animate-pulse">
                
                {/* STEP 1: IDENTITY */}
                <div className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-500 bg-black/40 border ${step1Status === 'PROCESSING' ? 'border-blue-500/50' : step1Status === 'FAILED' ? 'border-red-500/50' : 'border-gray-700'}`}>
                    <div className={`p-3 rounded-full ${step1Status === 'PROCESSING' ? 'bg-blue-500/20' : step1Status === 'SUCCESS' ? 'bg-green-500/20' : 'bg-gray-800'}`}>
                        {step1Status === 'PROCESSING' ? <Fingerprint className="w-6 h-6 text-blue-400 animate-pulse"/> : 
                         step1Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6 text-green-400"/> : 
                         step1Status === 'FAILED' ? <AlertTriangle className="w-6 h-6 text-red-400"/> : 
                         <Fingerprint className="w-6 h-6 text-gray-500"/>}
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-wider">STAGE 1: IDENTITY</div>
                        <div className="text-sm font-bold text-white">MICROSOFT ENTRA</div>
                        {step1Status === 'PROCESSING' && <div className="text-[10px] text-blue-400 mt-1 font-mono">Verifying DID Credentials...</div>}
                    </div>
                </div>

                {/* STEP 2: AI SCANNING */}
                <div className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-500 bg-black/40 border ${step2Status === 'PROCESSING' ? 'border-blue-500/50' : step2Status === 'FAILED' ? 'border-red-500/50' : 'border-gray-700'}`}>
                    <div className={`p-3 rounded-full ${step2Status === 'PROCESSING' ? 'bg-blue-500/20' : step2Status === 'SUCCESS' ? 'bg-green-500/20' : 'bg-gray-800'}`}>
                        {step2Status === 'PROCESSING' ? <Cpu className="w-6 h-6 text-blue-400 animate-spin"/> : 
                         step2Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6 text-green-400"/> : 
                         step2Status === 'FAILED' ? <AlertTriangle className="w-6 h-6 text-red-400"/> : 
                         <Cpu className="w-6 h-6 text-gray-500"/>}
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-wider">STAGE 2: REALITY</div>
                        <div className="text-sm font-bold text-white">AZURE AI CONTENT SAFETY</div>
                        {step2Status === 'PROCESSING' && <div className="text-[10px] text-blue-400 mt-1 font-mono">Analyzing Video Frames...</div>}
                    </div>
                </div>

                {/* LIVE TERMINAL */}
                <div className="mt-4 flex-1 bg-black/90 rounded-xl border border-gray-800 p-3 font-mono text-[9px] text-green-500 overflow-hidden relative shadow-inner">
                    <div className="absolute top-0 right-0 bg-gray-800 px-2 py-0.5 text-[7px] text-gray-400 rounded-bl">LIVE TELEMETRY</div>
                    <div className="h-full overflow-y-auto flex flex-col justify-end space-y-1">
                        {liveLogs.map((log, i) => (
                            <div key={i} className="opacity-90 border-l-2 border-green-900 pl-2 leading-tight break-words">{log}</div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            </div>
        )}

        {/* --- GUARDIAN INTERVENTION OVERLAY --- */}
        {callStatus === 'GUARDIAN_INTERVENTION' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-950/95 backdrop-blur-xl p-6">
                <div className="p-6 bg-red-900/30 rounded-full border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-pulse mb-6">
                    <Bot className="w-20 h-20 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">GUARDIAN ACTIVE</h2>
                <p className="text-red-200 text-center text-xs mb-6 max-w-[80%]">
                    High-Risk Fraud Pattern Detected. Aegis is negotiating intent with the caller.
                </p>
                <div className="w-full bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3 border-b border-red-500/20 pb-2">
                        <div className="text-[10px] text-red-300 font-bold uppercase tracking-wider">COPILOT STUDIO TRANSCRIPT</div>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    </div>
                    <div className="space-y-3">
                        {transcriptLines.map((line, i) => (
                            <div key={i} className="text-white text-xs font-mono border-l-2 border-red-500 pl-3 py-1 bg-red-900/10 rounded-r">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- MEMORY CARD (COGNITIVE SUPPORT) --- */}
        {callStatus === 'ACTIVE' && memoryRecall && (
            <div className="absolute top-32 left-4 right-4 bg-slate-900/80 backdrop-blur border border-blue-500/30 p-4 rounded-xl z-20 flex items-start gap-4 shadow-lg">
                <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                    <Brain className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                    <div className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-1">Aegis Memory Recall</div>
                    <div className="text-sm text-white font-medium leading-snug">"{memoryRecall}"</div>
                </div>
            </div>
        )}

        {/* SHIELD OVERLAY */}
        <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-700
            ${callStatus === 'ACTIVE' ? 'border-[12px] border-green-500/80 shadow-[inset_0_0_100px_rgba(16,185,129,0.3)]' : 
              (callStatus === 'BLOCKED' || callStatus === 'GUARDIAN_INTERVENTION') ? 'border-[12px] border-red-500/80 shadow-[inset_0_0_100px_rgba(239,68,68,0.3)]' : ''}`}>
        </div>

        {/* BOTTOM CARD */}
        <div className="absolute bottom-8 left-4 right-4 bg-slate-900/80 backdrop-blur border border-white/10 p-5 rounded-2xl z-30 transition-all duration-500">
          {(callStatus.startsWith('STAGE')) && (
             <div className="flex items-center gap-4 text-blue-400">
               <Activity className="w-6 h-6 animate-spin" />
               <div>
                   <div className="font-bold text-sm tracking-wider">NEGOTIATING TRUST</div>
                   <div className="text-[10px] text-blue-200/70 font-mono">Running Zero-Trust Protocol...</div>
               </div>
             </div>
          )}
          {callStatus === 'ACTIVE' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-green-400">
                <CheckCircle className="w-8 h-8" />
                <div>
                    <div className="font-bold text-base tracking-widest">VERIFIED</div>
                    <div className="text-[10px] text-green-200/70 font-mono">Entra ID + C2PA Valid</div>
                </div>
              </div>
              <div className="text-4xl font-bold text-white tracking-tighter">{trustScore}%</div>
            </div>
          )}
          {callStatus === 'BLOCKED' && (
            <div className="flex items-center gap-4 text-red-500 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
              <div>
                  <div className="font-bold text-base tracking-widest">CALL BLOCKED</div>
                  <div className="text-[10px] text-red-200/80 font-mono uppercase">{verdictReason}</div>
              </div>
            </div>
          )}
        </div>

        {/* CALL CONTROLS */}
        <div className="absolute bottom-36 w-full flex justify-center gap-8 z-30 pointer-events-auto">
          <button className="p-5 rounded-full bg-red-600 hover:bg-red-700 shadow-xl transform hover:scale-110 transition-all text-white border border-red-400/50">
              <Phone className="w-8 h-8 rotate-[135deg]" />
          </button>
          <button className="p-5 rounded-full bg-gray-700/50 hover:bg-gray-700 shadow-xl backdrop-blur text-white border border-white/10">
              <Video className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* --- DESKTOP CONTROLLER (HIDDEN ON MOBILE) --- */}
      <div className="hidden md:flex fixed bottom-8 right-8 bg-slate-900/90 backdrop-blur p-5 rounded-2xl flex-col gap-4 w-72 shadow-2xl z-50 border border-gray-700">
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-4 h-4"/> Judge Control
            </h3>
            <button onClick={() => setShowFeatureHud(!showFeatureHud)} className="text-[10px] bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-gray-300 transition-colors">HUD</button>
        </div>
        
        <div className="space-y-2">
            <button onClick={() => startSecureConnectionFlow()} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4"/> RESTART DEMO FLOW
            </button>
            
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setIsSafeMode(true)} className={`px-2 py-3 rounded-lg border text-left transition-all ${isSafeMode ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                    <div className="text-[10px] font-bold mb-1">SCENARIO A</div>
                    <div className="text-[9px] opacity-70">Authentic Human</div>
                </button>
                <button onClick={() => setIsSafeMode(false)} className={`px-2 py-3 rounded-lg border text-left transition-all ${!isSafeMode ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                    <div className="text-[10px] font-bold mb-1">SCENARIO B</div>
                    <div className="text-[9px] opacity-70">Deepfake Attack</div>
                </button>
            </div>
        </div>

        <button onClick={() => setView("DASHBOARD")} className="w-full py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all">
          <LayoutDashboard className="w-4 h-4" /> GLOBAL COMMAND CENTER
        </button>
      </div>

      {/* --- MOBILE CONTROLLER (FAB - ONLY VISIBLE ON MOBILE) --- */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-auto">
          {/* Mobile Scenario Toggle */}
          <button onClick={() => setIsSafeMode(!isSafeMode)} className={`p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-lg ${isSafeMode ? 'bg-green-600' : 'bg-red-600'}`}>
              {isSafeMode ? <CheckCircle className="w-6 h-6 text-white"/> : <AlertTriangle className="w-6 h-6 text-white"/>}
          </button>
          
          {/* Dashboard Toggle */}
          <button onClick={() => setView("DASHBOARD")} className="p-4 rounded-full bg-blue-600 shadow-2xl text-white border-2 border-white/20 backdrop-blur-lg">
              <LayoutDashboard className="w-6 h-6"/>
          </button>
      </div>

    </div>
  )
}