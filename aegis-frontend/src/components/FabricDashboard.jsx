import { useState, useEffect } from 'react';
import { Activity, Globe, Server, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function FabricDashboard({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ active: 8420, blocked: 1205 });

  // Simulate Real-Time Fabric Stream
  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/global-intel");
        const data = await res.json();
        setLogs(prev => [...data.recent_logs, ...prev].slice(0, 7));
        setStats(prev => ({ 
            active: data.active_nodes, 
            blocked: prev.blocked + (data.recent_logs.some(l => l.status === "BLOCKED") ? 1 : 0) 
        }));
      } catch (e) { console.error("Fabric Stream Offline"); }
    };

    const interval = setInterval(fetchIntel, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white p-6 flex flex-col font-mono">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <Activity className="text-blue-500" />
          <h1 className="text-xl font-bold tracking-widest">MICROSOFT FABRIC <span className="text-gray-500">REAL-TIME INTELLIGENCE</span></h1>
        </div>
        <button onClick={onBack} className="bg-gray-800 px-4 py-2 rounded text-xs hover:bg-gray-700">EXIT TO DEVICE</button>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Left: Stats */}
        <div className="space-y-4">
           <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 uppercase">Global Verified Agents</div>
              <div className="text-4xl text-green-400 font-bold">{stats.active.toLocaleString()}</div>
           </div>
           <div className="p-6 bg-gray-900 border border-red-900/50 rounded-lg">
              <div className="text-xs text-gray-400 uppercase">Swarm Attacks Blocked</div>
              <div className="text-4xl text-red-500 font-bold">{stats.blocked.toLocaleString()}</div>
           </div>
           
           {/* Live KQL Logs */}
           <div className="bg-black border border-gray-800 rounded-lg p-4 h-[300px] overflow-hidden">
             <div className="flex items-center gap-2 mb-2 text-xs text-blue-400"><Server size={12}/> KQL EVENT STREAM</div>
             <div className="space-y-2">
               {logs.map((log) => (
                 <div key={log.id} className="text-[10px] flex gap-2 animate-pulse">
                   <span className="text-gray-600">{log.timestamp.split('T')[1].split('.')[0]}</span>
                   <span className={log.status === "VERIFIED" ? "text-green-500" : "text-red-500"}>{log.status}</span>
                   <span className="text-gray-400 truncate">{log.event_type} - {log.location}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Right: Map */}
        <div className="col-span-2 bg-gray-900 rounded-lg border border-gray-800 relative overflow-hidden flex items-center justify-center">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
                className="w-[90%] opacity-20 invert" alt="Map" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
           <div className="absolute bottom-4 left-4 text-xs text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> SYSTEM OPTIMAL
           </div>
        </div>
      </div>
    </div>
  );
}