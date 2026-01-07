import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Activity, Globe, Lock, Server, MapPin, Zap } from 'lucide-react';

export default function Dashboard({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ verified: 14205, blocked: 892 });
  const [threatLevel, setThreatLevel] = useState("LOW");

  // Simulate Microsoft Fabric Real-Time Stream with Dynamic Threat Levels
  useEffect(() => {
    const interval = setInterval(() => {
      const isAttack = Math.random() > 0.7; // 30% chance of attack
      
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: isAttack ? "BLOCKED" : "VERIFIED",
        loc: isAttack ? ["Moscow, RU", "Unknown Proxy", "Pyongyang, KP"][Math.floor(Math.random()*3)] : ["New York, US", "London, UK", "Tokyo, JP"][Math.floor(Math.random()*3)],
        msg: isAttack ? "Deepfake Signature Detected (ResNet-50)" : "Entra ID Handshake Confirmed"
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 7)]); 
      
      setStats(prev => ({
        verified: prev.verified + (isAttack ? 0 : 1),
        blocked: prev.blocked + (isAttack ? 1 : 0)
      }));

      // Dynamic Threat Level
      setThreatLevel(isAttack ? "ELEVATED" : "LOW");

    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-950 bg-grid text-white p-6 flex flex-col font-mono">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4 bg-gray-950/80 backdrop-blur">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AEGIS <span className="text-white">OVERWATCH</span></h1>
            <p className="text-[10px] text-gray-500 tracking-[0.3em]">MICROSOFT FABRIC REAL-TIME INTELLIGENCE</p>
          </div>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded text-xs transition-all flex items-center gap-2 text-blue-400">
          &larr; RETURN TO DEVICE VIEW
        </button>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        
        {/* LEFT COLUMN: LIVE METRICS */}
        <div className="col-span-4 space-y-4">
          
          {/* THREAT MONITOR */}
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase">Global Threat Level</span>
            <span className={`text-sm font-bold px-2 py-1 rounded ${threatLevel === 'ELEVATED' ? 'bg-red-900/50 text-red-400 animate-pulse' : 'bg-green-900/50 text-green-400'}`}>
                {threatLevel}
            </span>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-green-900/30 relative">
             <div className="absolute top-0 right-0 p-2 opacity-20"><Lock className="w-12 h-12 text-green-500"/></div>
             <div className="text-gray-400 text-xs uppercase mb-1">Secure Sessions</div>
             <div className="text-4xl font-mono text-green-400">{stats.verified.toLocaleString()}</div>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-red-900/30 relative">
             <div className="absolute top-0 right-0 p-2 opacity-20"><ShieldAlert className="w-12 h-12 text-red-500"/></div>
             <div className="text-gray-400 text-xs uppercase mb-1">Threats Neutralized</div>
             <div className="text-4xl font-mono text-red-500">{stats.blocked.toLocaleString()}</div>
          </div>

          {/* STREAM LOGS */}
          <div className="bg-black p-4 rounded-xl border border-gray-800 h-[300px] overflow-hidden">
             <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-500 uppercase border-b border-gray-800 pb-2">
                <Server className="w-3 h-3"/> KQL Event Stream
             </div>
             <div className="space-y-2">
               {logs.map(log => (
                 <div key={log.id} className="text-[10px] flex gap-2 border-l-2 pl-2 animate-pulse" 
                      style={{borderColor: log.type === 'VERIFIED' ? '#22c55e' : '#ef4444'}}>
                   <span className="text-gray-500">[{log.time}]</span>
                   <span className={log.type === "VERIFIED" ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{log.type}</span>
                   <span className="text-gray-400 truncate w-32">{log.msg}</span>
                   <span className="text-gray-600 text-[8px]">{log.loc}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAP VISUALIZATION */}
        <div className="col-span-8 bg-black rounded-xl border border-gray-800 relative overflow-hidden flex items-center justify-center group">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
            className="w-[95%] opacity-30 invert transition-transform duration-[10s] group-hover:scale-105" alt="Global Map" />
          
          <div className="absolute top-[30%] left-[22%] group-hover:scale-125 transition-transform">
            <span className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></span>
            <span className="relative w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          </div>
          <div className="absolute top-[28%] right-[40%] group-hover:scale-125 transition-transform">
            <span className="absolute w-6 h-6 bg-red-600 rounded-full animate-ping opacity-50"></span>
            <span className="relative w-2 h-2 bg-red-600 rounded-full shadow-[0_0_20px_red]"></span>
          </div>

           <div className="absolute bottom-6 right-6 text-xs text-blue-400 font-mono flex items-center gap-2 bg-black/80 p-2 rounded border border-blue-900/50">
             <Activity className="w-4 h-4 animate-spin"/>
             SYSTEM STATUS: OPERATIONAL
          </div>
        </div>

      </div>
    </div>
  );
}