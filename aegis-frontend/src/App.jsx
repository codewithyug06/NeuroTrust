import { useState, useEffect, useRef } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard, ScanLine, AlertTriangle, CheckCircle, Database, Cpu, Fingerprint, Bot, Brain, Info, Wifi, Eye, Globe, Zap, Menu, Battery, Signal, Settings } from 'lucide-react'
import Dashboard from './Dashboard';

// --- SMART NETWORK DETECTION ---
const API_URL = `http://${window.location.hostname}:8000/api/v1`;

// --- HOOK: DEVICE ANALYSIS ---
function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile };
}

// --- HOOK: SYSTEM STATUS ---
function useSystemStatus() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return { time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
}

export default function App() {
  const { isMobile } = useDeviceDetect();
  const { time } = useSystemStatus();
  
  const [view, setView] = useState("PHONE");
  const [callStatus, setCallStatus] = useState("BOOTING"); 
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");
  const [liveLogs, setLiveLogs] = useState([]);
  
  // ADVANCED FEATURE STATES
  const [memoryRecall, setMemoryRecall] = useState(null); 
  const [sponsorName, setSponsorName] = useState(null); 
  const [transcriptLines, setTranscriptLines] = useState([]); 
  
  // VISUALIZATION & UI STATES
  const [step1Status, setStep1Status] = useState("PENDING"); 
  const [step2Status, setStep2Status] = useState("PENDING");
  const [showFeatureHud, setShowFeatureHud] = useState(!isMobile);
  const [showJudgeControls, setShowJudgeControls] = useState(false); 

  const logsEndRef = useRef(null);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [liveLogs]);

  // AUTO-START
  useEffect(() => {
    if (callStatus === "BOOTING") {
        setTimeout(() => { startSecureConnectionFlow(isSafeMode); }, 1000);
    }
  }, []);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setLiveLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  }

  const addTranscript = (line) => {
    setTranscriptLines(prev => [...prev, line]);
  }

  const startSecureConnectionFlow = async (forceMode = null) => {
    const currentMode = forceMode !== null ? forceMode : isSafeMode;
    if (forceMode !== null) setIsSafeMode(forceMode);

    setCallStatus("STAGE_1_IDENTITY");
    setStep1Status("PROCESSING");
    setStep2Status("PENDING");
    setAgentName(currentMode ? "Bank of America Support" : "Unknown Caller");
    setLiveLogs([]);
    setTranscriptLines([]);
    setMemoryRecall(null);
    setSponsorName(null);
    setTrustScore(null);
    setVerdictReason("");
    
    addLog("INITIATING AEGIS PROTOCOL v4.0...");
    addLog(`DEVICE FINGERPRINT: ${isMobile ? 'MOBILE_ARM64' : 'DESKTOP_X64'}`);
    addLog("INTERCEPTING INCOMING SIP STREAM...");

    const token = currentMode ? "valid-token" : "unknown-attacker";

    setTimeout(async () => {
        try {
            addLog("CONNECTING TO MICROSOFT ENTRA...");
            const handshakeRes = await fetch(`${API_URL}/verify-handshake`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    oid: currentMode ? "00000003-0000-0000-c000-000000000000" : "hacker-oid",
                    name: currentMode ? "Bank of America Support" : "Unknown Caller" 
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

            setCallStatus("STAGE_2_AI");
            setStep2Status("PROCESSING");
            addLog("STREAMING FRAMES TO AZURE AI CONTENT SAFETY...");

            const analysisRes = await fetch(`${API_URL}/analyze-stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    scenario: currentMode ? "SAFE" : "ATTACK",
                    token: token
                })
            });
            const analysisData = await analysisRes.json();
            if(analysisData.logs) analysisData.logs.forEach(l => addLog(l));

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
            if (currentMode) { 
                setCallStatus("ACTIVE"); setTrustScore(99); setStep1Status("SUCCESS"); setStep2Status("SUCCESS"); setVerdictReason("Identity Verified (Offline Mode)");
            } else { 
                setCallStatus("BLOCKED"); setTrustScore(0); setStep1Status("FAILED"); setStep2Status("FAILED"); setVerdictReason("Potential Fraud Detected");
            }
        }
    }, 1000); 
  };

  if (view === "DASHBOARD") return <Dashboard onBack={() => setView("PHONE")} isMobile={isMobile} />;

  // --- DYNAMIC STYLES BASED ON DEVICE ---
  const wrapperClass = isMobile 
    ? "w-full h-full bg-black overflow-hidden relative" 
    : "relative w-[400px] h-[820px] bg-black rounded-[3.5rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-4 ring-gray-900/50 transition-all duration-500";

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${isMobile ? 'bg-black p-0' : 'bg-black bg-cyber-grid p-8'} font-sans text-white selection:bg-blue-500 selection:text-white`}>
      
      {/* BACKGROUND ACCENTS (Desktop Only) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]"></div>
        </div>
      )}

      {/* --- PHONE CONTAINER --- */}
      <div className={wrapperClass}>
        
        {/* DYNAMIC BORDER GLOW (Desktop) */}
        {!isMobile && (
            <div className={`absolute -inset-[3px] rounded-[3.7rem] opacity-100 transition-colors duration-500 pointer-events-none z-50
                ${callStatus === 'ACTIVE' ? 'bg-gradient-to-b from-green-500/50 to-transparent' : 
                callStatus === 'BLOCKED' ? 'bg-gradient-to-b from-red-500/50 to-transparent' : 
                'bg-gray-800'}`}>
            </div>
        )}

        {/* STATUS BAR */}
        <div className="absolute top-0 w-full h-8 z-50 flex justify-between items-center px-6 pt-3 text-white/90 text-[10px] font-bold tracking-wide">
            <div>{time}</div>
            <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4 fill-white" />
            </div>
        </div>

        {/* NOTCH / HEADER */}
        <div className="absolute top-0 left-0 right-0 h-36 z-20 flex flex-col items-center pt-12 pointer-events-none bg-gradient-to-b from-black/95 via-black/70 to-transparent">
          <div className="flex items-center gap-2 text-blue-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">
             <Activity className="w-3 h-3 animate-pulse" /> Aegis Protected
          </div>
          <div className="text-white text-2xl font-bold tracking-tight drop-shadow-xl">{agentName}</div>
          {sponsorName && callStatus !== 'BLOCKED' && (
              <div className="flex items-center gap-1.5 mt-2 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30 backdrop-blur-md shadow-lg">
                  <CheckCircle className="w-3 h-3 text-blue-300" /> 
                  <span className="text-[9px] font-bold text-white tracking-wide uppercase">{sponsorName}</span>
              </div>
          )}
        </div>

        {/* VIDEO LAYER */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div className="scanline absolute inset-0 z-10 pointer-events-none"></div> 
          {isSafeMode ? (
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover transition-opacity duration-700 ${(callStatus.startsWith('STAGE') || callStatus === 'GUARDIAN_INTERVENTION' || callStatus === 'BOOTING') ? 'opacity-30 blur-md scale-105' : 'opacity-90 scale-100'}`} />
          ) : (
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop" 
                 className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-300 ${(callStatus.startsWith('STAGE') || callStatus === 'GUARDIAN_INTERVENTION' || callStatus === 'BOOTING') ? 'opacity-30 blur-md scale-105' : 'opacity-80 scale-100'}`} />
          )}
        </div>

        {/* FEATURE HUD */}
        {showFeatureHud && (
            <div className="absolute top-28 left-4 z-40 flex flex-col gap-1.5 pointer-events-none">
                {["ENTRA VERIFIED ID", "AZURE AI SAFETY", "C2PA PROVENANCE"].map((tech, i) => (
                    <div key={tech} className="bg-black/80 backdrop-blur px-2 py-1 rounded flex items-center gap-2 w-max border border-gray-700 shadow-lg">
                        <div className={`w-1.5 h-1.5 rounded-full ${i===0 ? 'bg-green-500' : i===1 ? 'bg-blue-500' : 'bg-yellow-500'} animate-pulse`}></div>
                        <span className="text-[8px] font-bold text-white tracking-wider">{tech}</span>
                    </div>
                ))}
            </div>
        )}

        {/* --- SYSTEM BOOT SCREEN --- */}
        {callStatus === "BOOTING" && (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 text-center">
                <Shield className="w-16 h-16 text-blue-600 animate-pulse mb-6" />
                <h1 className="text-3xl font-black text-white tracking-[0.2em] mb-2">AEGIS</h1>
                <p className="text-xs text-blue-500 font-mono tracking-widest">INITIALIZING TRUST PROTOCOL...</p>
                <div className="mt-8 w-40 h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
            </div>
        )}

        {/* --- LOGIC VISUALIZATION --- */}
        {(callStatus.startsWith('STAGE')) && (
            <div className="absolute inset-0 z-20 flex flex-col justify-center gap-4 bg-black/80 backdrop-blur-md p-6 pt-32 pb-40">
                {/* STEP 1 */}
                <div className={`p-4 rounded-xl flex items-center gap-4 border bg-black/60 shadow-xl ${step1Status === 'PROCESSING' ? 'border-blue-500/50' : step1Status === 'FAILED' ? 'border-red-500/50' : 'border-gray-800'}`}>
                    <div className={`p-3 rounded-full ${step1Status === 'PROCESSING' ? 'bg-blue-900/30 text-blue-400' : step1Status === 'SUCCESS' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                        {step1Status === 'PROCESSING' ? <Fingerprint className="w-6 h-6 animate-pulse"/> : 
                         step1Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6"/> : 
                         <AlertTriangle className="w-6 h-6 text-red-400"/>}
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-wider">STAGE 1: IDENTITY</div>
                        <div className="text-sm font-bold text-white">MICROSOFT ENTRA</div>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className={`p-4 rounded-xl flex items-center gap-4 border bg-black/60 shadow-xl ${step2Status === 'PROCESSING' ? 'border-blue-500/50' : step2Status === 'FAILED' ? 'border-red-500/50' : 'border-gray-800'}`}>
                    <div className={`p-3 rounded-full ${step2Status === 'PROCESSING' ? 'bg-blue-900/30 text-blue-400' : step2Status === 'SUCCESS' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                        {step2Status === 'PROCESSING' ? <Cpu className="w-6 h-6 animate-spin"/> : 
                         step2Status === 'SUCCESS' ? <CheckCircle className="w-6 h-6"/> : 
                         <Cpu className="w-6 h-6"/>}
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-wider">STAGE 2: REALITY</div>
                        <div className="text-sm font-bold text-white">AZURE AI CONTENT SAFETY</div>
                    </div>
                </div>

                {/* LOGS */}
                <div className="mt-4 flex-1 bg-black rounded-xl border border-gray-800 p-3 font-mono text-[9px] text-green-500 overflow-hidden relative shadow-inner">
                    <div className="absolute top-0 right-0 bg-gray-900 px-2 py-0.5 text-[7px] text-gray-400 rounded-bl">LIVE TELEMETRY</div>
                    <div className="h-full overflow-y-auto flex flex-col justify-end space-y-1">
                        {liveLogs.map((log, i) => (
                            <div key={i} className="opacity-90 border-l-2 border-green-900 pl-2 leading-tight break-words">{log}</div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            </div>
        )}

        {/* --- GUARDIAN INTERVENTION --- */}
        {callStatus === 'GUARDIAN_INTERVENTION' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-950/95 backdrop-blur-xl p-6">
                <div className="p-6 bg-red-900/30 rounded-full border border-red-500/50 shadow-[0_0_60px_rgba(239,68,68,0.5)] animate-pulse mb-6">
                    <Bot className="w-20 h-20 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white text-center mb-2 tracking-tight">GUARDIAN ACTIVE</h2>
                <div className="w-full bg-black/60 border border-red-500/50 rounded-xl p-4 shadow-2xl">
                    <div className="flex justify-between items-center mb-3 border-b border-red-500/30 pb-2">
                        <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider">COPILOT STUDIO TRANSCRIPT</div>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    </div>
                    <div className="space-y-3">
                        {transcriptLines.map((line, i) => (
                            <div key={i} className="text-white text-xs font-mono border-l-2 border-red-500 pl-3 py-1 bg-red-900/20 rounded-r">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- MEMORY CARD --- */}
        {callStatus === 'ACTIVE' && memoryRecall && (
            <div className="absolute top-32 left-4 right-4 bg-slate-900/90 backdrop-blur border border-blue-500/50 p-4 rounded-xl z-20 flex items-start gap-4 shadow-2xl">
                <div className="p-2 bg-blue-600/20 rounded-lg shrink-0">
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
              (callStatus === 'BLOCKED' || callStatus === 'GUARDIAN_INTERVENTION') ? 'border-[12px] border-red-600/80 shadow-[inset_0_0_100px_rgba(239,68,68,0.4)]' : ''}`}>
        </div>

        {/* BOTTOM CARD */}
        <div className="absolute bottom-8 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/20 p-5 rounded-2xl z-30 transition-all duration-500 shadow-2xl">
          {(callStatus.startsWith('STAGE')) && (
             <div className="flex items-center gap-4 text-blue-400">
               <Activity className="w-6 h-6 animate-spin" />
               <div>
                   <div className="font-bold text-sm tracking-wider">NEGOTIATING TRUST</div>
                   <div className="text-[10px] text-gray-400 font-mono">Running Zero-Trust Protocol...</div>
               </div>
             </div>
          )}
          {callStatus === 'ACTIVE' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-green-400">
                <CheckCircle className="w-8 h-8" />
                <div>
                    <div className="font-bold text-base tracking-widest">VERIFIED</div>
                    <div className="text-[10px] text-gray-400 font-mono">Entra ID + C2PA Valid</div>
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
                  <div className="text-[10px] text-gray-300 font-mono uppercase">{verdictReason}</div>
              </div>
            </div>
          )}
        </div>

        {/* CALL CONTROLS */}
        <div className="absolute bottom-36 w-full flex justify-center gap-8 z-30 pointer-events-auto">
          <button className="p-5 rounded-full bg-red-600 hover:bg-red-700 shadow-xl transform hover:scale-110 transition-all text-white border border-red-400/50">
              <Phone className="w-8 h-8 rotate-[135deg]" />
          </button>
          <button className="p-5 rounded-full bg-gray-800/80 hover:bg-gray-700 shadow-xl backdrop-blur text-white border border-white/20">
              <Video className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* --- JUDGE CONTROL TOGGLE --- */}
      <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => setShowJudgeControls(!showJudgeControls)}
            className="p-4 bg-slate-900/90 border border-blue-500/50 rounded-full text-blue-400 shadow-2xl hover:bg-slate-800 transition-all group"
            title="Toggle Judge Controls"
          >
            <Settings className={`w-6 h-6 group-hover:rotate-90 transition-transform`} />
          </button>
      </div>

      {/* --- EXPANDED JUDGE CONTROLLER --- */}
      {showJudgeControls && (
        <div className="fixed bottom-24 right-8 bg-black/90 backdrop-blur p-5 rounded-2xl flex-col gap-4 w-72 shadow-2xl z-50 border border-gray-700 animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <Eye className="w-4 h-4"/> Demo Control
                </h3>
                <button onClick={() => setShowFeatureHud(!showFeatureHud)} className="text-[10px] bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-gray-300 transition-colors">
                    {showFeatureHud ? 'HIDE HUD' : 'SHOW HUD'}
                </button>
            </div>
            
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => startSecureConnectionFlow(true)} className="px-2 py-3 rounded-lg border text-left transition-all bg-green-900/20 border-green-500/50 hover:bg-green-900/40 group">
                        <div className="text-[10px] font-bold text-green-400 mb-1 group-hover:text-white">SCENARIO A</div>
                        <div className="text-[9px] text-gray-400 group-hover:text-gray-300">Authentic</div>
                    </button>
                    <button onClick={() => startSecureConnectionFlow(false)} className="px-2 py-3 rounded-lg border text-left transition-all bg-red-900/20 border-red-500/50 hover:bg-red-900/40 group">
                        <div className="text-[10px] font-bold text-red-400 mb-1 group-hover:text-white">SCENARIO B</div>
                        <div className="text-[9px] text-gray-400 group-hover:text-gray-300">Deepfake</div>
                    </button>
                </div>

                <button onClick={() => setView("DASHBOARD")} className="w-full py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all">
                    <LayoutDashboard className="w-4 h-4" /> OPEN DASHBOARD
                </button>
            </div>
        </div>
      )}

      {/* --- MOBILE CONTROLLER (FAB) --- */}
      {isMobile && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-auto pb-safe">
              <button onClick={() => startSecureConnectionFlow(!isSafeMode)} className={`p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-lg ${isSafeMode ? 'bg-green-600' : 'bg-red-600'}`}>
                  {isSafeMode ? <CheckCircle className="w-6 h-6 text-white"/> : <AlertTriangle className="w-6 h-6 text-white"/>}
              </button>
              <button onClick={() => setView("DASHBOARD")} className="p-4 rounded-full bg-blue-600 shadow-2xl text-white border-2 border-white/20 backdrop-blur-lg">
                  <LayoutDashboard className="w-6 h-6"/>
              </button>
          </div>
      )}

    </div>
  )
}