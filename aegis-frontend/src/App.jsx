import { useState, useEffect } from 'react'
import { Shield, ShieldAlert, Phone, Video, Mic, Lock, Activity, LayoutDashboard } from 'lucide-react'
import Dashboard from './Dashboard'; // <--- Import the new component

const API_URL = "http://localhost:8000/api/v1";

function App() {
  const [view, setView] = useState("PHONE"); // 'PHONE' or 'DASHBOARD'
  const [callStatus, setCallStatus] = useState("CONNECTING");
  const [trustScore, setTrustScore] = useState(null);
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [agentName, setAgentName] = useState("Unknown Caller");
  const [verdictReason, setVerdictReason] = useState("");

  useEffect(() => {
    if (view === "PHONE") performRealHandshake();
  }, [isSafeMode, view]);

  const performRealHandshake = async () => {
    setCallStatus("CONNECTING");
    setVerdictReason("Verifying Identity via Microsoft Entra...");
    const token = isSafeMode ? "valid-token" : "unknown-attacker"; 
    
    try {
      const response = await fetch(`${API_URL}/verify-handshake`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          oid: isSafeMode ? "00000003-0000-0000-c000-000000000000" : "hacker-oid",
          name: isSafeMode ? "Bank of America Support" : "Unknown Caller" 
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();

      if (data.status === "VERIFIED") {
        setCallStatus("ACTIVE");
        setTrustScore(data.trust_score || 98);
        setAgentName(data.details?.agent || "Verified Agent");
        setVerdictReason("Identity Confirmed");
      } else {
        setCallStatus("BLOCKED");
        setTrustScore(data.trust_score || 0);
        setAgentName("Unverified Caller");
        setVerdictReason(data.details?.message || "Identity Mismatch");
      }
    } catch (error) {
      console.error("Backend Error:", error);
      if (isSafeMode) { setCallStatus("ACTIVE"); setTrustScore(99); setAgentName("Bank of America"); }
      else { setCallStatus("BLOCKED"); setTrustScore(10); }
    }
  };

  // --- RENDER DASHBOARD IF TOGGLED ---
  if (view === "DASHBOARD") {
    return <Dashboard onBack={() => setView("PHONE")} />;
  }

  // --- RENDER PHONE INTERFACE ---
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-900 text-white font-sans">
      
      {/* PHONE CONTAINER */}
      <div className="relative w-[380px] h-[750px] bg-black rounded-[45px] border-[8px] border-gray-800 overflow-hidden shadow-2xl ring-4 ring-gray-900/50">
        
        {/* TOP STATUS */}
        <div className="absolute top-0 w-full h-28 bg-gradient-to-b from-black/90 to-transparent z-20 flex flex-col items-center pt-8 pointer-events-none">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-mono tracking-widest uppercase mb-1">
             <Activity className="w-3 h-3 text-blue-500 animate-pulse" /> Live Analysis
          </div>
          <div className="text-white text-xl font-bold tracking-tight">{agentName}</div>
        </div>

        {/* VIDEO FEED */}
        <div className="absolute inset-0 z-0 bg-gray-800">
          {isSafeMode ? (
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Verified Agent" />
          ) : (
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 grayscale contrast-125" alt="Attacker" />
          )}
        </div>

        {/* SHIELD OVERLAY */}
        <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 border-[8px]
          ${callStatus === 'ACTIVE' ? 'border-green-500/80 shadow-[inset_0_0_80px_rgba(34,197,94,0.4)]' : ''}
          ${callStatus === 'BLOCKED' ? 'border-red-600/90 shadow-[inset_0_0_100px_rgba(220,38,38,0.6)] bg-red-900/10' : ''}
          ${callStatus === 'CONNECTING' ? 'border-yellow-500/50' : ''}
        `}></div>

        {/* BOTTOM CARD */}
        <div className="absolute bottom-10 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 z-30 shadow-2xl">
          {callStatus === 'ACTIVE' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-green-400">
                <Shield className="w-6 h-6" />
                <div><div className="font-bold text-xs tracking-widest">AEGIS VERIFIED</div><div className="text-[10px] text-green-200/70">Entra ID: VALID</div></div>
              </div>
              <div className="text-3xl font-bold text-white">{trustScore}%</div>
            </div>
          )}
          {callStatus === 'BLOCKED' && (
            <div className="flex items-center gap-3 text-red-500 animate-pulse-fast">
              <ShieldAlert className="w-6 h-6" />
              <div><div className="font-bold text-xs tracking-widest">THREAT BLOCKED</div><div className="text-[10px] text-red-200/80">{verdictReason}</div></div>
            </div>
          )}
        </div>

        {/* DUMMY BUTTONS */}
        <div className="absolute bottom-32 w-full flex justify-center gap-6 z-30">
          <button className="p-4 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"><Phone className="w-6 h-6 text-white rotate-[135deg]" /></button>
          <button className="p-4 rounded-full bg-gray-600/40 backdrop-blur"><Video className="w-6 h-6 text-white" /></button>
          <button className="p-4 rounded-full bg-gray-600/40 backdrop-blur"><Mic className="w-6 h-6 text-white" /></button>
        </div>
      </div>

      {/* --- MASTER CONTROLS (Demo Only) --- */}
      <div className="fixed bottom-6 right-6 bg-gray-900/90 backdrop-blur p-4 rounded-xl border border-gray-700 shadow-2xl z-50 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Demo Controller</h3>
        <div className="flex gap-2">
          <button onClick={() => setIsSafeMode(true)} className={`px-4 py-2 text-xs rounded-lg font-bold ${isSafeMode ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>SCENARIO A</button>
          <button onClick={() => setIsSafeMode(false)} className={`px-4 py-2 text-xs rounded-lg font-bold ${!isSafeMode ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>SCENARIO B</button>
        </div>
        <button 
          onClick={() => setView("DASHBOARD")}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4" /> VIEW GLOBAL MAP
        </button>
      </div>

    </div>
  )
}

export default App