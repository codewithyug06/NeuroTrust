import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Activity, Globe, Lock, Server } from 'lucide-react';

export default function Dashboard({ onBack }) {
  const [stats, setStats] = useState({
    verified: 14205,
    blocked: 892,
    active: 34
  });

  const [logs, setLogs] = useState([
    { id: 1, time: "10:42:01", type: "VERIFIED", loc: "New York, USA", msg: "Entra ID Confirmed" },
    { id: 2, time: "10:42:05", type: "BLOCKED", loc: "Moscow, RU", msg: "Deepfake Audio Detect" },
    { id: 3, time: "10:42:12", type: "VERIFIED", loc: "London, UK", msg: "Biometric Match" },
  ]);

  // Simulate Live Data
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        verified: prev.verified + Math.floor(Math.random() * 3),
        blocked: prev.blocked + (Math.random() > 0.7 ? 1 : 0),
        active: prev.active
      }));

      const newLog = Math.random() > 0.7 
        ? { id: Date.now(), time: new Date().toLocaleTimeString(), type: "BLOCKED", loc: "Unknown IP", msg: "Synthetic Video Signature" }
        : { id: Date.now(), time: new Date().toLocaleTimeString(), type: "VERIFIED", loc: "California, USA", msg: "Secure Handshake" };

      setLogs(prev => [newLog, ...prev.slice(0, 6)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white font-mono p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold tracking-wider">AEGIS <span className="text-blue-500">GLOBAL INTELLIGENCE</span></h1>
            <p className="text-xs text-gray-500">MICROSOFT FABRIC REAL-TIME ANALYTICS</p>
          </div>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 text-xs">
          RETURN TO DEVICE VIEW
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
          <div className="text-gray-400 text-xs uppercase mb-1">Secure Sessions</div>
          <div className="text-3xl font-bold text-green-400">{stats.verified.toLocaleString()}</div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
          <div className="text-gray-400 text-xs uppercase mb-1">Threats Neutralized</div>
          <div className="text-3xl font-bold text-red-500">{stats.blocked.toLocaleString()}</div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
          <div className="text-gray-400 text-xs uppercase mb-1">Active Nodes</div>
          <div className="text-3xl font-bold text-blue-400">8,420</div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded border border-gray-800 flex items-center justify-center gap-2">
           <Activity className="animate-pulse text-green-500" />
           <span className="text-sm font-bold">SYSTEM OPTIMAL</span>
        </div>
      </div>

      {/* MAIN CONTENT: MAP & LOGS */}
      <div className="grid grid-cols-3 gap-6 h-[500px]">
        
        {/* WORLD MAP (Visual Simulation) */}
        <div className="col-span-2 bg-black rounded-xl border border-gray-800 relative overflow-hidden flex items-center justify-center">
          {/* Background Map Image */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
            className="opacity-20 w-full object-cover invert"
            alt="World Map"
          />
          
          {/* Simulated Pings */}
          <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <div className="absolute top-[35%] left-[22%] w-2 h-2 bg-green-500 rounded-full"></div>
          
          <div className="absolute top-[40%] right-[30%] w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
          <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-red-600 rounded-full"></div>

          <div className="absolute bottom-[30%] right-[20%] w-3 h-3 bg-green-500 rounded-full animate-ping delay-700"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            <Globe className="w-4 h-4 inline mr-2" />
            Live Threat Vector Map (KQL Stream)
          </div>
        </div>

        {/* LIVE LOGS */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">
            <Server className="w-4 h-4" /> Incoming Signals
          </div>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-xs animate-pulse-fast">
                {log.type === "VERIFIED" ? (
                  <Lock className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 font-mono">{log.time}</span>
                    <span className={log.type === "VERIFIED" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                      {log.type}
                    </span>
                  </div>
                  <div className="text-gray-300">{log.msg}</div>
                  <div className="text-gray-600 text-[10px]">{log.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}