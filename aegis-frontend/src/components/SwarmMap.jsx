import React, { useEffect, useState } from 'react';
import { Globe, ShieldAlert, Zap } from 'lucide-react';

export default function SwarmMap() {
    const [threats, setThreats] = useState([]);
    const [metrics, setMetrics] = useState({ blocked: 1402391, nodes: 842 });

    useEffect(() => {
        // Mock fetch for now, replacing with API call later
        // In real impl: fetch('http://localhost:8000/api/v1/telemetry/map')

        const mockData = [
            { id: 1, lat: 40.7128, lng: -74.0060, type: "Deepfake", intensity: "HIGH" }, // NYC
            { id: 2, lat: 51.5074, lng: -0.1278, type: "Botnet", intensity: "MEDIUM" }, // London
            { id: 3, lat: 35.6762, lng: 139.6503, type: "SMS", intensity: "LOW" }, // Tokyo
            { id: 4, lat: 28.6139, lng: 77.2090, type: "Scam", intensity: "CRITICAL" } // Delhi
        ];
        setThreats(mockData);

        // Animate metrics
        const interval = setInterval(() => {
            setMetrics(prev => ({
                blocked: prev.blocked + Math.floor(Math.random() * 5),
                nodes: prev.nodes
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden relative border border-gray-800 shadow-2xl">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white tracking-widest">GLOBAL THREAT INTEL</span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                    CONNECTED NODES: <span className="text-green-400">{metrics.nodes}</span>
                </div>
            </div>

            {/* Right Metrics Overlay */}
            <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700 text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-white tracking-widest">THREATS NEUTRALIZED</span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                    {metrics.blocked.toLocaleString()}
                </div>
            </div>

            {/* Simulated Map Background */}
            <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-20 grayscale brightness-50 contrast-125">
            </div>

            {/* Threat Pins */}
            {threats.map((threat) => (
                <div
                    key={threat.id}
                    className="absolute w-3 h-3 rounded-full bg-red-500 animate-ping"
                    style={{
                        top: `${(90 - threat.lat) * (100 / 180)}%`, // Rough Mercator approximation
                        left: `${(threat.lng + 180) * (100 / 360)}%`
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-50 blur-sm"></div>
                </div>
            ))}

            {threats.map((threat) => (
                <div
                    key={`pin-${threat.id}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-white border border-red-500 z-20"
                    style={{
                        top: `${(90 - threat.lat) * (100 / 180)}%`,
                        left: `${(threat.lng + 180) * (100 / 360)}%`
                    }}
                    title={`${threat.type}: ${threat.intensity}`}
                />
            ))}

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
}
