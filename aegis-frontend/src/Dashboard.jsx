import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Activity, Globe, Lock, Server, MapPin, Zap, Building, UserCheck, Layers, Terminal, AlertOctagon, BarChart3, Menu, FileCheck, CheckCircle } from 'lucide-react';

export default function Dashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState("GLOBAL"); 
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ verified: 14205, blocked: 892 });
  const [threatLevel, setThreatLevel] = useState("LOW");

  useEffect(() => {
    const interval = setInterval(() => {
      const isAttack = Math.random() > 0.7; 
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: isAttack ? "BLOCKED" : "VERIFIED",
        loc: isAttack ? "Unknown Proxy" : "New York, US",
        msg: isAttack ? "Deepfake Signature Detected" : "Entra ID Handshake Confirmed"
      };
      setLogs(prev => [newLog, ...prev.slice(0, 10)]); 
      setStats(prev => ({ verified: prev.verified + (isAttack ? 0 : 1), blocked: prev.blocked + (isAttack ? 1 : 0) }));
      setThreatLevel(isAttack ? "ELEVATED" : "LOW");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black text-white flex flex-col font-sans overflow-hidden z-[100]">
      
      {/* HEADER */}
      <div className="bg-gray-950 border-b border-gray-800 p-4 flex flex-col md:flex-row justify-between items-center shadow-2xl z-50">
        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-500/50">
              <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-widest text-white">AEGIS <span className="text-blue-500">OVERWATCH</span></h1>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] text-gray-400 tracking-widest font-mono">FABRIC INTELLIGENCE: ONLINE</p>
            </div>
          </div>
        </div>
        
        {/* TABS - NOW FULLY INTERACTIVE */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 items-center">
            <button 
                onClick={() => setActiveTab("GLOBAL")} 
                className={`px-6 py-2 text-xs font-bold rounded transition-all cursor-pointer border ${activeTab === 'GLOBAL' ? 'bg-blue-700 border-blue-500 text-white' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-white'}`}
            >
                GLOBAL RADAR
            </button>
            <button 
                onClick={() => setActiveTab("ENTERPRISE")} 
                className={`px-6 py-2 text-xs font-bold rounded transition-all cursor-pointer border ${activeTab === 'ENTERPRISE' ? 'bg-blue-700 border-blue-500 text-white' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-white'}`}
            >
                ENTERPRISE
            </button>
            <button onClick={onBack} className="px-6 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 rounded text-xs font-bold text-red-400 cursor-pointer ml-4">
                EXIT
            </button>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto p-6 bg-black custom-scrollbar">
      
      {/* GLOBAL TAB */}
      {activeTab === "GLOBAL" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in pb-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gray-950 p-5 rounded-xl border-l-4 border-blue-500 border border-gray-800">
                  <h4 className="text-xs font-bold text-blue-400 uppercase mb-4 flex items-center gap-2"><Layers className="w-4 h-4"/> System Status</h4>
                  <div className="space-y-3">
                      <div className="flex justify-between text-[11px] border-b border-gray-800 pb-2"><span className="text-gray-400">Identity Fabric</span><span className="text-green-400 font-mono bg-green-900/20 px-2 py-0.5 rounded">ONLINE</span></div>
                      <div className="flex justify-between text-[11px] border-b border-gray-800 pb-2"><span className="text-gray-400">Swarm Detection</span><span className="text-green-400 font-mono bg-green-900/20 px-2 py-0.5 rounded">ACTIVE</span></div>
                      <div className="flex justify-between text-[11px]"><span className="text-gray-400">KQL Anomaly Engine</span><span className="text-purple-400 font-mono bg-purple-900/20 px-2 py-0.5 rounded">RUNNING</span></div>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-950 border border-green-900/50 p-5 rounded-xl"><div className="text-green-500 text-[10px] font-bold uppercase mb-1">Secure</div><div className="text-3xl font-mono font-bold text-white">{stats.verified.toLocaleString()}</div></div>
                  <div className="bg-gray-950 border border-red-900/50 p-5 rounded-xl"><div className="text-red-500 text-[10px] font-bold uppercase mb-1">Blocked</div><div className="text-3xl font-mono font-bold text-white">{stats.blocked.toLocaleString()}</div></div>
              </div>
              <div className="bg-gray-950 p-4 rounded-xl h-[300px] flex flex-col border border-gray-800">
                 <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase mb-4"><Terminal className="w-3 h-3 text-blue-400"/> Live Event Stream</div>
                 <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-2">
                   {logs.map((log, i) => (
                     <div key={log.id} className="text-[10px] font-mono flex gap-3 p-2 rounded bg-black border-l-2 border-blue-900">
                       <span className="text-gray-500">{log.time}</span>
                       <span className={log.type === "VERIFIED" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{log.type}</span>
                       <span className="text-gray-400 truncate">{log.msg}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-gray-950 rounded-xl border border-gray-800 relative overflow-hidden flex-1 min-h-[500px] flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" className="w-[90%] opacity-20 invert" alt="Global Map" />
                  <div className="absolute top-[30%] left-[22%]"><span className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></span></div>
                  <div className="absolute top-[28%] right-[40%]"><span className="absolute w-10 h-10 bg-red-600 rounded-full animate-ping opacity-30"></span></div>
                  <div className="absolute top-6 right-6 bg-black/90 border border-gray-700 p-4 rounded-xl flex items-center gap-4 shadow-xl">
                      <AlertOctagon className={`w-6 h-6 ${threatLevel === 'ELEVATED' ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />
                      <div><div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Global Risk</div><div className={`text-xl font-black ${threatLevel === 'ELEVATED' ? 'text-red-500' : 'text-green-500'}`}>{threatLevel}</div></div>
                  </div>
                </div>
            </div>
          </div>
      )}

      {/* ENTERPRISE TAB */}
      {activeTab === "ENTERPRISE" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in pb-10">
              <div className="bg-gray-950 p-8 rounded-xl col-span-1 border-t-4 border-blue-600 shadow-2xl border-x border-b border-gray-800">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white"><Building className="w-6 h-6 text-blue-400"/> Organization</h3>
                  <div className="p-6 bg-black/40 rounded-xl border border-blue-500/20 mb-6 text-center">
                      <div className="text-xs text-blue-400 font-bold uppercase mb-2 tracking-widest">Verification Status</div>
                      <div className="text-3xl font-black text-white tracking-widest flex items-center justify-center gap-3"><CheckCircle className="w-8 h-8 text-green-500"/> VERIFIED</div>
                  </div>
                  <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-black rounded border border-gray-800"><span className="text-xs text-gray-400 font-bold">Agent ID</span><span className="text-sm font-mono text-white">AG-8829-X</span></div>
                      <div className="flex justify-between items-center p-4 bg-black rounded border border-gray-800"><span className="text-xs text-gray-400 font-bold">Trust Score</span><span className="text-sm font-black text-blue-400 text-lg">99.9</span></div>
                  </div>
              </div>
              <div className="bg-gray-950 p-8 rounded-xl col-span-1 md:col-span-2 border-t-4 border-gray-700 shadow-2xl border-x border-b border-gray-800">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-3 text-white"><UserCheck className="w-6 h-6 text-green-400"/> Trusted Agent Registry</h3>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded flex items-center gap-2"><FileCheck className="w-4 h-4"/> EXPORT</button>
                  </div>
                  <div className="overflow-x-auto bg-black rounded-lg border border-gray-800">
                      <table className="w-full text-sm text-left">
                          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                              <tr><th className="px-6 py-4">Agent Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Status</th></tr>
                          </thead>
                          <tbody className="text-gray-300 divide-y divide-gray-800">
                              <tr className="hover:bg-gray-800/50"><td className="px-6 py-4 font-bold text-white">Bank of America Support</td><td className="px-6 py-4">FINANCE</td><td className="px-6 py-4 text-right"><span className="text-green-400 font-bold border border-green-900 bg-green-900/20 px-2 py-1 rounded text-xs">VERIFIED</span></td></tr>
                              <tr className="hover:bg-gray-800/50"><td className="px-6 py-4 font-bold text-white">Microsoft Azure Support</td><td className="px-6 py-4">TECH</td><td className="px-6 py-4 text-right"><span className="text-green-400 font-bold border border-green-900 bg-green-900/20 px-2 py-1 rounded text-xs">VERIFIED</span></td></tr>
                              <tr className="hover:bg-red-900/10 bg-red-900/5"><td className="px-6 py-4 font-bold text-red-400">Unknown Dialer</td><td className="px-6 py-4 text-gray-500">UNKNOWN</td><td className="px-6 py-4 text-right"><span className="text-red-400 font-bold border border-red-900 bg-red-900/20 px-2 py-1 rounded text-xs">BLOCKED</span></td></tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}
      
      </div>
    </div>
  );
}