import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Activity, Globe, Lock, Server, MapPin, Zap, Building, UserCheck, Layers, Terminal, AlertOctagon, BarChart3, Menu, FileCheck, Users, Briefcase } from 'lucide-react';

export default function Dashboard({ onBack, isMobile }) {
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
        loc: isAttack ? ["Moscow, RU", "Unknown Proxy", "Pyongyang, KP"][Math.floor(Math.random()*3)] : ["New York, US", "London, UK", "Tokyo, JP"][Math.floor(Math.random()*3)],
        msg: isAttack ? "Deepfake Signature Detected (ResNet-50)" : "Entra ID Handshake Confirmed"
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 12)]); 
      setStats(prev => ({ verified: prev.verified + (isAttack ? 0 : 1), blocked: prev.blocked + (isAttack ? 1 : 0) }));
      setThreatLevel(isAttack ? "ELEVATED" : "LOW");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6 flex flex-col font-sans overflow-auto custom-scrollbar">
      
      {/* HEADER NAV */}
      <div className="glass-panel-dark p-4 rounded-xl flex flex-col md:flex-row justify-between items-center mb-6 sticky top-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          <div className="p-3 bg-blue-900/30 rounded-xl border border-blue-500/50">
              <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">AEGIS <span className="text-blue-500">OVERWATCH</span></h1>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-gray-400 tracking-widest font-mono">FABRIC INTELLIGENCE: ONLINE</p>
            </div>
          </div>
        </div>
        
        {/* TABS - NOW HIGH CONTRAST */}
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <button 
                onClick={() => setActiveTab("GLOBAL")} 
                className={`flex-1 md:flex-none px-6 py-3 text-xs font-bold rounded-lg border transition-all whitespace-nowrap flex items-center gap-2
                ${activeTab === 'GLOBAL' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]' 
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
            >
                <Globe className="w-4 h-4" /> GLOBAL RADAR
            </button>
            <button 
                onClick={() => setActiveTab("ENTERPRISE")} 
                className={`flex-1 md:flex-none px-6 py-3 text-xs font-bold rounded-lg border transition-all whitespace-nowrap flex items-center gap-2
                ${activeTab === 'ENTERPRISE' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]' 
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
            >
                <Building className="w-4 h-4" /> ENTERPRISE
            </button>
            <button onClick={() => onBack()} className="px-6 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 rounded-lg text-xs font-bold text-red-400 whitespace-nowrap ml-2">
                EXIT
            </button>
        </div>
      </div>

      {/* --- GLOBAL RADAR TAB --- */}
      {activeTab === "GLOBAL" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 animate-fade-in pb-10">
            
            {/* LEFT SIDE: METRICS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* STATUS INDICATORS */}
              <div className="glass-panel-dark p-5 rounded-xl border-l-4 border-blue-500">
                  <h4 className="text-xs font-bold text-blue-400 uppercase mb-4 flex items-center gap-2"><Layers className="w-4 h-4"/> System Status</h4>
                  <div className="space-y-3">
                      {[
                          { name: "Identity Fabric", status: "ONLINE", color: "text-green-400", bg: "bg-green-900/20" },
                          { name: "AI Swarm Detection", status: "ACTIVE", color: "text-green-400", bg: "bg-green-900/20" },
                          { name: "Threat Immunization", status: "PROPAGATING", color: "text-blue-400", bg: "bg-blue-900/20" },
                          { name: "KQL Anomaly Engine", status: "RUNNING", color: "text-purple-400", bg: "bg-purple-900/20" }
                      ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-[11px] border-b border-gray-800 pb-2 last:border-0">
                              <span className="text-gray-300 font-medium">{item.name}</span>
                              <span className={`${item.bg} ${item.color} px-2 py-0.5 rounded font-mono border border-white/5`}>{item.status}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* LIVE STATS */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black border border-green-500/30 p-5 rounded-xl relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                     <Lock className="absolute top-2 right-2 w-8 h-8 text-green-500/20"/>
                     <div className="text-green-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Secure Sessions</div>
                     <div className="text-3xl font-mono font-bold text-white">{stats.verified.toLocaleString()}</div>
                  </div>
                  <div className="bg-black border border-red-500/30 p-5 rounded-xl relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                     <ShieldAlert className="absolute top-2 right-2 w-8 h-8 text-red-500/20"/>
                     <div className="text-red-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Threats Blocked</div>
                     <div className="text-3xl font-mono font-bold text-white">{stats.blocked.toLocaleString()}</div>
                  </div>
              </div>

              {/* CONSOLE LOGS */}
              <div className="glass-panel-dark p-4 rounded-xl h-[400px] flex flex-col">
                 <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                     <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 uppercase"><Terminal className="w-3 h-3 text-blue-400"/> Live Event Stream</div>
                     <div className="flex items-center gap-2 px-2 py-1 bg-green-900/20 rounded border border-green-500/30"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div><span className="text-[9px] text-green-400 font-bold">RECEIVING</span></div>
                 </div>
                 <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-2">
                   {logs.map((log, i) => (
                     <div key={log.id} className="text-[10px] font-mono flex gap-3 p-2 rounded bg-gray-900/50 border-l-2 border-transparent hover:border-blue-500 transition-colors animate-fade-in">
                       <span className="text-gray-500 shrink-0">{log.time}</span>
                       <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                               <span className={`font-bold px-1 rounded ${log.type === "VERIFIED" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>{log.type}</span>
                               <span className="text-gray-400 text-[9px] border border-gray-700 px-1 rounded">{log.loc}</span>
                           </div>
                           <span className="text-gray-300">{log.msg}</span>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            {/* RIGHT SIDE: GLOBAL MAP */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="glass-panel-dark rounded-xl p-2 relative overflow-hidden flex-1 min-h-[500px] flex items-center justify-center group bg-black">
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>
                  
                  {/* Map Image */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
                    className="w-[95%] h-full object-contain opacity-30 invert drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]" alt="Global Map" />
                  
                  {/* Animated Pings */}
                  <div className="absolute top-[30%] left-[22%] group-hover:scale-125 transition-transform">
                      <span className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></span>
                      <span className="relative w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]"></span>
                  </div>
                  <div className="absolute top-[28%] right-[40%] group-hover:scale-125 transition-transform">
                      <span className="absolute w-10 h-10 bg-red-600 rounded-full animate-ping opacity-30"></span>
                      <span className="relative w-3 h-3 bg-red-600 rounded-full shadow-[0_0_30px_#ef4444] border border-white"></span>
                  </div>
                  <div className="absolute bottom-[35%] right-[25%] group-hover:scale-125 transition-transform">
                      <span className="absolute w-6 h-6 bg-red-600 rounded-full animate-ping opacity-40 delay-700"></span>
                      <span className="relative w-2 h-2 bg-red-600 rounded-full shadow-[0_0_25px_#ef4444]"></span>
                  </div>

                  {/* Threat Level Badge */}
                  <div className="absolute top-6 right-6 bg-black/90 border border-gray-700 p-4 rounded-xl flex items-center gap-4 shadow-2xl">
                      <div className={`p-3 rounded-full ${threatLevel === 'ELEVATED' ? 'bg-red-900/30 animate-pulse border border-red-500/50' : 'bg-green-900/30 border border-green-500/50'}`}>
                          <AlertOctagon className={`w-6 h-6 ${threatLevel === 'ELEVATED' ? 'text-red-500' : 'text-green-500'}`} />
                      </div>
                      <div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Global Risk Level</div>
                          <div className={`text-xl font-black tracking-widest ${threatLevel === 'ELEVATED' ? 'text-red-500' : 'text-green-500'}`}>{threatLevel}</div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      )}

      {/* --- ENTERPRISE TAB (REBUILT FOR VISIBILITY) --- */}
      {activeTab === "ENTERPRISE" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 animate-fade-in pb-10">
              {/* ORG CARD */}
              <div className="glass-panel-dark p-8 rounded-xl col-span-1 border-t-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white"><Building className="w-6 h-6 text-blue-400"/> My Organization</h3>
                  
                  <div className="p-6 bg-blue-950/30 rounded-xl border border-blue-500/30 mb-6 text-center shadow-inner">
                      <div className="text-xs text-blue-300 font-bold uppercase mb-2 tracking-widest">Verification Status</div>
                      <div className="text-3xl font-black text-white tracking-widest flex items-center justify-center gap-3">
                          <CheckCircle className="w-8 h-8 text-green-400 fill-green-900/50"/> VERIFIED
                      </div>
                      <div className="text-[10px] text-gray-400 mt-2 font-mono">Microsoft Entra Verified ID</div>
                  </div>

                  <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-black rounded border border-gray-800 hover:border-gray-600 transition-colors">
                          <span className="text-xs text-gray-400 uppercase font-bold">Agent ID</span>
                          <span className="text-sm font-mono text-white bg-gray-900 px-2 py-1 rounded">AG-8829-X</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-black rounded border border-gray-800 hover:border-gray-600 transition-colors">
                          <span className="text-xs text-gray-400 uppercase font-bold">Sponsorship</span>
                          <span className="text-sm text-green-400 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Active</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-black rounded border border-gray-800 hover:border-gray-600 transition-colors">
                          <span className="text-xs text-gray-400 uppercase font-bold">Trust Score</span>
                          <span className="text-sm font-black text-blue-400 text-lg">99.9</span>
                      </div>
                  </div>
              </div>

              {/* REGISTRY TABLE */}
              <div className="glass-panel-dark p-8 rounded-xl col-span-1 md:col-span-2 border-t-4 border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-3 text-white"><UserCheck className="w-6 h-6 text-green-400"/> Trusted Agent Registry</h3>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded flex items-center gap-2">
                          <FileCheck className="w-4 h-4"/> EXPORT REPORT
                      </button>
                  </div>
                  
                  <div className="overflow-x-auto bg-black/50 rounded-lg border border-gray-800">
                      <table className="w-full text-sm text-left">
                          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                              <tr>
                                  <th className="px-6 py-4">Agent Name</th>
                                  <th className="px-6 py-4">Sponsor Entity</th>
                                  <th className="px-6 py-4">Category</th>
                                  <th className="px-6 py-4 text-right">Status</th>
                              </tr>
                          </thead>
                          <tbody className="text-gray-300 divide-y divide-gray-800">
                              <tr className="hover:bg-gray-800/50 transition-colors">
                                  <td className="px-6 py-4 flex items-center gap-3"><div className="w-8 h-8 rounded bg-red-900/50 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">B</div><span className="font-bold text-white">Bank of America Support</span></td>
                                  <td className="px-6 py-4">Bank of America Corp</td>
                                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-gray-800 text-[10px] border border-gray-700 text-gray-300">FINANCE</span></td>
                                  <td className="px-6 py-4 text-right"><span className="text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30 text-[10px]">VERIFIED</span></td>
                              </tr>
                              <tr className="hover:bg-gray-800/50 transition-colors">
                                  <td className="px-6 py-4 flex items-center gap-3"><div className="w-8 h-8 rounded bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">M</div><span className="font-bold text-white">Microsoft Azure Support</span></td>
                                  <td className="px-6 py-4">Microsoft Corporation</td>
                                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-gray-800 text-[10px] border border-gray-700 text-gray-300">TECH</span></td>
                                  <td className="px-6 py-4 text-right"><span className="text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30 text-[10px]">VERIFIED</span></td>
                              </tr>
                              <tr className="hover:bg-red-900/10 transition-colors bg-red-900/5">
                                  <td className="px-6 py-4 flex items-center gap-3"><div className="w-8 h-8 rounded bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 font-bold">?</div><span className="font-bold text-red-300">Unknown Dialer</span></td>
                                  <td className="px-6 py-4 text-gray-500 italic">Unknown / Hidden</td>
                                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-red-900/20 text-[10px] border border-red-800 text-red-400">UNKNOWN</span></td>
                                  <td className="px-6 py-4 text-right"><span className="text-red-400 font-bold bg-red-900/30 px-3 py-1 rounded-full border border-red-500/30 text-[10px]">BLOCKED</span></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}