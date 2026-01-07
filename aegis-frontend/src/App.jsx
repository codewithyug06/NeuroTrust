import { useState, useEffect, useRef } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard, ScanLine, AlertTriangle, CheckCircle, Database, Cpu, Fingerprint, Bot, Brain, Info, Wifi, Eye, Globe, Zap, Menu, PhoneIncoming, PhoneMissed, X } from 'lucide-react'
import Dashboard from './Dashboard';

const API_URL = `http://${window.location.hostname}:8000/api/v1`;

function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile };
}

export default function App() {
  const { isMobile } = useDeviceDetect();
  const [view, setView] = useState("PHONE");
  
  // FLOW STATES: IDLE -> RINGING -> CONNECTED -> ANALYZING -> RESULT (ACTIVE/BLOCKED)
  const [callStatus, setCallStatus] = useState("IDLE"); 
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");
  
  // FEATURE STATES
  const [memoryRecall, setMemoryRecall] = useState(null); 
  const [sponsorName, setSponsorName] = useState(null); 
  const [transcriptLines, setTranscriptLines] = useState([]); 
  const [callDuration, setCallDuration] = useState(0);

  // UI STATES
  const [step1Status, setStep1Status] = useState("PENDING"); 
  const [step2Status, setStep2Status] = useState("PENDING");
  const [showFeatureHud, setShowFeatureHud] = useState(!isMobile);
  const [showJudgeControls, setShowJudgeControls] = useState(false); 
  const [liveLogs, setLiveLogs] = useState([]);

  const logsEndRef = useRef(null);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [liveLogs]);

  // Call Timer Logic
  useEffect(() => {
      let interval;
      if (callStatus === "CONNECTED" || callStatus === "ANALYZING") {
          interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
      } else {
          setCallDuration(0);
      }
      return () => clearInterval(interval);
  }, [callStatus]);

  const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setLiveLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  }

  const addTranscript = (line) => {
    setTranscriptLines(prev => [...prev, line]);
  }

  // --- STEP 1: TRIGGER INCOMING CALL (Ringing State) ---
  const triggerIncomingCall = (safeMode) => {
      setIsSafeMode(safeMode);
      setCallStatus("RINGING"); 
      setAgentName(safeMode ? "Bank of America Support" : "Unknown Caller");
      setLiveLogs([]);
      setTranscriptLines([]);
      setMemoryRecall(null);
      setSponsorName(null);
      setStep1Status("PENDING");
      setStep2Status("PENDING");
      setTrustScore(null);
      setVerdictReason("");
      
      // Haptic feedback for ringing (Mobile only)
      if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
  };

  // --- STEP 2: ANSWER CALL (Connected State) ---
  const handleAnswerCall = () => {
      setCallStatus("CONNECTED"); 
      addLog("CALL ESTABLISHED. VOICE CHANNEL OPEN.");
      addLog("WAITING FOR USER VERIFICATION TRIGGER...");
  };

  // --- STEP 3: USER CLICKS "VERIFY" (Triggers Analysis) ---
  const handleManualVerify = async () => {
    setCallStatus("ANALYZING"); 
    setStep1Status("PROCESSING");
    
    addLog("INITIATING AEGIS PROTOCOL v4.0...");
    addLog("INTERCEPTING PACKET STREAM...");
    
    const token = isSafeMode ? "valid-token" : "unknown-attacker";

    // Simulate Backend Analysis Delay (2.5 Seconds for dramatic effect)
    setTimeout(async () => {
        try {
            addLog("CONNECTING TO MICROSOFT ENTRA...");
            const handshakeRes = await fetch(`${API_URL}/verify-handshake`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    oid: isSafeMode ? "00000003-0000-0000-c000-000000000000" : "hacker-oid",
                    name: agentName
                })
            });
            const handshakeData = await handshakeRes.json();
            
            if(handshakeData.logs) handshakeData.logs.forEach(l => addLog(l));

            if (handshakeData.details?.context?.relationship !== "None" && handshakeData.details?.context?.relationship) {
                addLog(`MICROSOFT GRAPH: ${handshakeData.details.context.relationship.toUpperCase()}`);
                if (handshakeData.details.context.memory_recall) {
                    setMemoryRecall(handshakeData.details.context.memory_recall);
                }
            }
            
            if (handshakeData.details?.sponsor) {
                setSponsorName(handshakeData.details.sponsor);
            }

            if (handshakeData.status === "VERIFIED") {
                setStep1Status("SUCCESS");
                addLog("IDENTITY CONFIRMED.");
            } else {
                setStep1Status("FAILED");
                addLog("IDENTITY CHECK FAILED.");
            }

            setStep2Status("PROCESSING");
            addLog("SCANNING MEDIA FRAMES (AZURE AI)...");

            const analysisRes = await fetch(`${API_URL}/analyze-stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scenario: isSafeMode ? "SAFE" : "ATTACK" })
            });
            const analysisData = await analysisRes.json();
            if(analysisData.logs) analysisData.logs.forEach(l => addLog(l));

            // FINAL VERDICT
            if (handshakeData.status === "VERIFIED" && analysisData.verdict !== "SYNTHETIC_MEDIA_DETECTED") {
                setStep2Status("SUCCESS");
                setCallStatus("ACTIVE"); 
                setTrustScore(98);
                setVerdictReason("Identity Confirmed | C2PA Valid");
                addLog("CONNECTION SECURE.");
            } else {
                setStep2Status("FAILED");
                setCallStatus("GUARDIAN_INTERVENTION"); 
                setTrustScore(12);
                setVerdictReason("Deepfake Detected");
                addLog("THREAT DETECTED. GUARDIAN ACTIVATED.");
                
                // Simulate Guardian Conversation
                setTimeout(() => addTranscript("🤖 Guardian: Call intercepted. State intent."), 500);
                setTimeout(() => addTranscript("👤 Caller: Verify transaction..."), 1500);
                setTimeout(() => addTranscript("🤖 Guardian: C2PA missing. Access Denied."), 2500);
                setTimeout(() => addTranscript("🤖 Guardian: Terminating connection."), 3500);
                
                setTimeout(() => {
                    setCallStatus("BLOCKED");
                }, 4500); 
            }

        } catch (error) {
            console.error(error);
            addLog("ERROR: BACKEND UNREACHABLE.");
            // Fallback for demo stability
            if (isSafeMode) { 
                setCallStatus("ACTIVE"); setTrustScore(99); setStep1Status("SUCCESS"); setStep2Status("SUCCESS"); setVerdictReason("Identity Verified (Offline Mode)");
            } else { 
                setCallStatus("BLOCKED"); setTrustScore(0); setStep1Status("FAILED"); setStep2Status("FAILED"); setVerdictReason("Potential Fraud Detected");
            }
        }
    }, 1500); 
  };

  if (view === "DASHBOARD") return <Dashboard onBack={() => setView("PHONE")} />;

  // --- STYLING ---
  const wrapperClass = isMobile 
    ? "w-full h-full bg-black overflow-hidden relative" 
    : "relative w-[380px] h-[780px] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-4 ring-gray-900/50 transition-all duration-500";

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${isMobile ? 'bg-black' : 'bg-black bg-cyber-grid'} font-sans text-white`}>
      
      {/* PHONE FRAME */}
      <div className={wrapperClass}>
        
        {/* TOP BAR (Minimal - No Status Bar) */}
        <div className="absolute top-0 left-0 right-0 h-24 z-20 flex flex-col items-center pt-8 pointer-events-none bg-gradient-to-b from-black/90 to-transparent">
          <div className="flex items-center gap-2 text-blue-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">
             <Shield className="w-3 h-3" /> Aegis Secure
          </div>
          {/* Show name only if not IDLE */}
          {(callStatus !== 'IDLE') && (
             <div className="text-white text-xl font-bold tracking-tight drop-shadow-xl">{agentName}</div>
          )}
          {sponsorName && callStatus === 'ACTIVE' && (
              <div className="flex items-center gap-1.5 mt-1 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30 backdrop-blur-md shadow-lg">
                  <CheckCircle className="w-3 h-3 text-blue-300" /> 
                  <span className="text-[9px] font-bold text-white tracking-wide uppercase">{sponsorName}</span>
              </div>
          )}
        </div>

        {/* --- MAIN SCREEN CONTENT --- */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div className="scanline absolute inset-0 z-10 pointer-events-none"></div> 
          
          {/* 1. IDLE SCREEN */}
          {callStatus === "IDLE" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
                  <Shield className="w-20 h-20 text-gray-800 mb-6" />
                  <div className="text-gray-600 font-mono text-xs tracking-widest">SYSTEM STANDBY</div>
              </div>
          )}

          {/* 2. VIDEO FEED (Background) */}
          {(callStatus !== "IDLE") && (
            <div className="absolute inset-0 w-full h-full">
                <img src={isSafeMode 
                    ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop"}
                    className={`w-full h-full object-cover transition-all duration-700 
                    ${(callStatus === 'ANALYZING') ? 'opacity-50 blur-sm scale-105' : 
                      callStatus === 'RINGING' ? 'opacity-40 blur-xl' : 'opacity-90 scale-100'}`} 
                />
            </div>
          )}

          {/* 3. INCOMING CALL UI (Ringing) */}
          {callStatus === "RINGING" && (
            <div className="absolute inset-0 z-30 flex flex-col items-center pt-32 bg-black/40 backdrop-blur-sm">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl mb-4 animate-pulse ring-4 ring-blue-500/20">
                    <img src={isSafeMode 
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200" 
                        : "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200"} 
                        className="w-full h-full object-cover" />
                </div>
                <p className="text-blue-400 text-xs font-mono tracking-widest animate-pulse mb-8">INCOMING SECURE CALL...</p>
                
                <div className="absolute bottom-24 w-full flex justify-around px-8">
                    <button onClick={() => setCallStatus("IDLE")} className="flex flex-col items-center gap-2 group">
                        <div className="p-4 rounded-full bg-red-600 shadow-xl hover:scale-110 transition-transform group-active:scale-95"><PhoneMissed className="w-6 h-6 text-white" /></div>
                        <span className="text-[10px] font-bold text-gray-400">DECLINE</span>
                    </button>
                    <button onClick={handleAnswerCall} className="flex flex-col items-center gap-2 group">
                        <div className="p-4 rounded-full bg-green-600 shadow-xl hover:scale-110 transition-transform animate-bounce group-active:scale-95"><PhoneIncoming className="w-6 h-6 text-white" /></div>
                        <span className="text-[10px] font-bold text-gray-400">ACCEPT</span>
                    </button>
                </div>
            </div>
          )}

          {/* 4. CONNECTED - WAITING FOR TRIGGER */}
          {callStatus === "CONNECTED" && (
            <div className="absolute inset-0 z-30 flex flex-col justify-between py-12 px-6 bg-gradient-to-b from-black/80 via-transparent to-black/90">
                <div className="flex flex-col items-center pt-8">
                    <div className="px-3 py-1 bg-gray-800/50 rounded-full text-xs font-mono text-gray-300 mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> {formatTime(callDuration)}
                    </div>
                </div>

                <div className="mb-12">
                    <div className="text-center text-xs text-gray-400 mb-4 font-mono">IDENTITY UNVERIFIED</div>
                    <button 
                        onClick={handleManualVerify}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-95 group border border-blue-400/30"
                    >
                        <Shield className="w-5 h-5 fill-white/20" />
                        <span>VERIFY IDENTITY</span>
                    </button>
                </div>
            </div>
          )}

          {/* 5. ANALYZING ANIMATION */}
          {callStatus === "ANALYZING" && (
            <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black/80 backdrop-blur-md p-6">
                <div className="relative">
                    <ScanLine className="w-24 h-24 text-blue-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center"><Fingerprint className="w-8 h-8 text-blue-300 opacity-50"/></div>
                </div>
                <div className="text-blue-400 font-mono text-xs tracking-widest animate-pulse mt-6">RUNNING NEURO-TRUST ENGINE...</div>
                
                <div className="w-full mt-8 space-y-3">
                    <div className={`flex items-center gap-3 p-3 rounded bg-gray-900 border ${step1Status==='PROCESSING' ? 'border-blue-500 animate-pulse' : step1Status==='SUCCESS' ? 'border-green-500' : 'border-gray-800'}`}>
                        {step1Status==='SUCCESS' ? <CheckCircle className="w-4 h-4 text-green-500"/> : <Activity className="w-4 h-4 text-blue-500"/>}
                        <div className="text-[10px] font-mono text-gray-300">ENTRA ID VERIFICATION</div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded bg-gray-900 border ${step2Status==='PROCESSING' ? 'border-blue-500 animate-pulse' : step2Status==='SUCCESS' ? 'border-green-500' : 'border-gray-800'}`}>
                        {step2Status==='SUCCESS' ? <CheckCircle className="w-4 h-4 text-green-500"/> : <Eye className="w-4 h-4 text-blue-500"/>}
                        <div className="text-[10px] font-mono text-gray-300">DEEPFAKE ANALYSIS</div>
                    </div>
                </div>
            </div>
          )}

          {/* 6. FINAL RESULT (ACTIVE/BLOCKED) */}
          {(callStatus === "ACTIVE" || callStatus === "BLOCKED") && (
            <>
                <div className={`absolute inset-0 z-20 pointer-events-none border-[12px] ${callStatus === 'ACTIVE' ? 'border-green-500/80 shadow-[inset_0_0_100px_rgba(34,197,94,0.4)]' : 'border-red-600/80 shadow-[inset_0_0_100px_rgba(220,38,38,0.5)]'}`}></div>
                <div className="absolute bottom-8 left-4 right-4 bg-black/95 border border-white/10 p-5 rounded-2xl z-40 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-2">
                        <div className={`font-black text-xl tracking-widest ${callStatus === 'ACTIVE' ? 'text-green-400' : 'text-red-500'}`}>
                            {callStatus === 'ACTIVE' ? 'VERIFIED' : 'BLOCKED'}
                        </div>
                        <div className="text-3xl font-bold text-white">{trustScore}%</div>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mb-4 uppercase tracking-wide">
                        {verdictReason}
                    </div>
                    {/* Live Logs Mini Window */}
                    <div className="h-24 overflow-y-auto custom-scrollbar bg-gray-950/50 rounded-lg p-2 border border-gray-800">
                        {liveLogs.map((log, i) => (
                            <div key={i} className="text-[8px] font-mono text-gray-500 truncate mb-1">{log}</div>
                        ))}
                        <div ref={logsEndRef}/>
                    </div>
                </div>
            </>
          )}

          {/* GUARDIAN INTERVENTION */}
          {callStatus === 'GUARDIAN_INTERVENTION' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-950/95 backdrop-blur-xl p-6 animate-fade-in">
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

          {/* MEMORY CARD */}
          {callStatus === "ACTIVE" && memoryRecall && (
            <div className="absolute top-24 left-4 right-4 bg-slate-900/95 border border-blue-500/50 p-3 rounded-xl z-30 flex items-start gap-3 shadow-xl animate-fade-in">
                <Brain className="w-5 h-5 text-blue-300 mt-1" />
                <div>
                    <div className="text-[9px] text-blue-300 font-bold uppercase tracking-wider">Aegis Memory</div>
                    <div className="text-xs text-white leading-tight">"{memoryRecall}"</div>
                </div>
            </div>
          )}

        </div>
      </div>

      {/* --- DESKTOP CONTROLS --- */}
      {!isMobile && (
        <div className="fixed bottom-8 right-8 bg-black/90 backdrop-blur border border-gray-700 p-5 rounded-2xl w-72 shadow-2xl z-50">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Eye className="w-4 h-4"/> Simulation Control</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
                <button onClick={() => triggerIncomingCall(true)} className="px-2 py-3 rounded bg-gray-900 border border-green-900 hover:border-green-500 transition-all text-left group">
                    <div className="text-[10px] font-bold text-green-500 group-hover:text-white">SCENARIO A</div>
                    <div className="text-[9px] text-gray-500">Authentic</div>
                </button>
                <button onClick={() => triggerIncomingCall(false)} className="px-2 py-3 rounded bg-gray-900 border border-red-900 hover:border-red-500 transition-all text-left group">
                    <div className="text-[10px] font-bold text-red-500 group-hover:text-white">SCENARIO B</div>
                    <div className="text-[9px] text-gray-500">Deepfake</div>
                </button>
            </div>
            <button onClick={() => setView("DASHBOARD")} className="w-full py-3 bg-blue-900/50 hover:bg-blue-800 border border-blue-600 text-white text-xs font-bold rounded flex items-center justify-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> GLOBAL DASHBOARD
            </button>
        </div>
      )}

      {/* --- MOBILE CONTROLS (FAB) --- */}
      {isMobile && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
              <button onClick={() => triggerIncomingCall(!isSafeMode)} className={`p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-lg ${isSafeMode ? 'bg-green-600' : 'bg-red-600'}`}>
                  {isSafeMode ? <PhoneIncoming className="w-6 h-6 text-white"/> : <AlertTriangle className="w-6 h-6 text-white"/>}
              </button>
              <button onClick={() => setView("DASHBOARD")} className="p-4 rounded-full bg-blue-600 shadow-2xl text-white border-2 border-white/20 backdrop-blur-lg">
                  <LayoutDashboard className="w-6 h-6"/>
              </button>
          </div>
      )}

    </div>
  )
}