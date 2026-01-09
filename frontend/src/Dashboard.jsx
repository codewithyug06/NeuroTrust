import React, { useState, useEffect } from 'react';
import {
    Shield, Globe, Activity, ArrowLeft, Zap,
    Cpu, Users, Search, AlertTriangle, CheckCircle, Lock
} from 'lucide-react';
import AgentPassport from './components/AgentPassport';
import GlobalTrustBar from './components/GlobalTrustBar';
import IdentityWallet from './components/IdentityWallet';
import GlassCard from './components/ui/GlassCard';
import StatusBadge from './components/ui/StatusBadge';
import CyberButton from './components/ui/CyberButton';

// --- BACKEND API URL ---
const API_URL = `http://127.0.0.1:8000/api/v1`;

export default function Dashboard({ onBack }) {
    const [newsUrl, setNewsUrl] = useState("");
    const [newsResult, setNewsResult] = useState(null);
    const [analyzingNews, setAnalyzingNews] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [showWallet, setShowWallet] = useState(false);

    // --- MOCK DATA & STATE ---
    const [selectedAgent, setSelectedAgent] = useState(null);

    // Initialize with data immediately to prevent "empty" flash
    const [agentsList, setAgentsList] = useState([
        { name: "Support_Agent_01", id: "did:ion:EiD...429", trust: 98, category: "Customer Service" },
        { name: "Bank_Verifier_X", id: "did:web:bank.chase.com...", trust: 95, category: "Finance" },
        { name: "Global_Auth_Node_4", id: "did:web:auth.global.net...", trust: 99, category: "Infrastructure" },
        { name: "Legal_Verifier_NY", id: "did:ion:legal.ny.gov...", trust: 92, category: "Legal" }
    ]);

    const [stats, setStats] = useState({ threats: 14205, nodes: 843 });
    const [mapBlips, setMapBlips] = useState([
        { id: 1, top: '35%', left: '22%', color: 'shadow-[0_0_15px_rgba(239,68,68,0.8)] bg-trust-red' },
        { id: 2, top: '28%', left: '48%', color: 'shadow-[0_0_15px_rgba(245,158,11,0.8)] bg-trust-yellow' },
        { id: 3, top: '42%', left: '72%', color: 'shadow-[0_0_15px_rgba(239,68,68,0.8)] bg-trust-red' },
        { id: 4, top: '65%', left: '29%', color: 'shadow-[0_0_15px_rgba(59,130,246,0.8)] bg-guardian-blue' },
        { id: 5, top: '75%', left: '82%', color: 'shadow-[0_0_15px_rgba(168,85,247,0.8)] bg-purple-500' },
    ]);

    // --- LIVE STATS SIMULATION ---
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                threats: prev.threats + Math.floor(Math.random() * 3), // Increment threats randomly
                nodes: prev.nodes + (Math.random() > 0.8 ? 1 : 0) // Occasionally add a node
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // --- LIVE MAP SIMULATION ---
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly move blips slightly or toggle visibility to simulate activity
            setMapBlips(prev => prev.map(blip => ({
                ...blip,
                scale: 0.8 + Math.random() * 0.4, // Pulsing effect
                opacity: 0.5 + Math.random() * 0.5
            })));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // --- NEWS VERIFICATION HANDLER ---
    const handleVerifyNews = async () => {
        if (!newsUrl.trim()) {
            setInputError(true);
            setTimeout(() => setInputError(false), 500);
            return;
        }

        setAnalyzingNews(true);
        setNewsResult(null);

        // Guaranteed Mock Result Sequence for Demo Stability
        setTimeout(() => {
            const isFake = newsUrl.toLowerCase().includes("fake") || newsUrl.includes("rumor");
            setNewsResult({
                trust_score: isFake ? 12 : 99,
                publisher: isFake ? "Unknown Source" : "Verified Publisher (NYT)",
                c2pa_valid: !isFake,
                metadata: { timestamp: new Date().toISOString() }
            });
            setAnalyzingNews(false);
        }, 2000); // 2s analysis simulation
    }

    // --- DASHBOARD ACTIONS ---
    const handleViewAllRegistry = () => {
        setAgentsList(prev => [
            ...prev,
            { name: "Medical_Data_Bridge", id: "did:web:med.bridge...", trust: 97, category: "Healthcare" },
            { name: "Gov_Services_Portal", id: "did:gov:usa.portal...", trust: 99, category: "Government" }
        ]);
    };

    const handleBlipClick = (id) => {
        alert(`THREAT INTERCEPTED [ID: ${id}]\nORIGIN: UNKNOWN PROXY\nACTION: BLOCKED BY GUARDIAN`);
    };

    return (
        <div className="min-h-screen bg-guardian-dark text-white font-sans selection:bg-trust-green/30 pt-16">

            {/* Global Bar included via App.jsx usually, but here checking if we need it explicitly or if App handles it. 
          App handles it globally, so we assume it overlays. We added padding-top. */}

            {/* HEADER */}
            <header className="h-20 bg-guardian-slate/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group border border-transparent hover:border-white/10">
                            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                                <Shield className="w-8 h-8 text-trust-green" />
                                <span className="text-white glitch-text" data-text="NeuroTrust COMMAND">NeuroTrust <span className="text-trust-green">COMMAND</span></span>
                            </div>
                            <span className="text-[10px] font-mono text-trust-green/60 tracking-[0.3em] uppercase ml-1">Identity Defense Grid</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-12 font-mono text-xs">
                        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <Globe className="w-4 h-4 text-guardian-blue" />
                            <span className="tracking-widest">GLOBAL NET: PROTECTED</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <Activity className="w-4 h-4 text-trust-green" />
                            <span className="tracking-widest">SYSTEM OPTIMAL</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setShowWallet(true)}>
                        <div className="flex flex-col items-end mr-4">
                            <span className="text-sm font-bold text-white">John Doe</span>
                            <span className="text-[10px] text-trust-green bg-trust-green/10 px-2 py-0.5 rounded border border-trust-green/20">VERIFIED ID</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-guardian-slate border border-white/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-trust-green" />
                        </div>
                    </div>
                </div>
            </header>

            {/* AGENT PASSPORT MODAL */}
            {selectedAgent && <AgentPassport agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}

            {/* IDENTITY WALLET */}
            {showWallet && <IdentityWallet onClose={() => setShowWallet(false)} />}

            <main className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in-up">

                {/* --- ROW 1: HUD & MAP --- */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                    {/* STATS COLUMN */}
                    <div className="space-y-6 perspective-1000">
                        <GlassCard className="preserve-3d tilt-card hover:rotate-x-12 hover:rotate-y-12">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity"><Shield className="w-32 h-32" /></div>
                            <div className="text-gray-400 text-xs font-mono mb-1 uppercase tracking-wider">Threats Repelled</div>
                            <div className="text-5xl font-bold text-white tracking-tighter text-glow-blue">{stats.threats.toLocaleString()}</div>
                            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-trust-green">
                                <Activity className="w-3 h-3" /> +12.4% Efficiency
                            </div>
                        </GlassCard>

                        <GlassCard className="hover:border-guardian-blue/30">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity"><Cpu className="w-32 h-32" /></div>
                            <div className="text-gray-400 text-xs font-mono mb-1 uppercase tracking-wider">Active Guardians</div>
                            <div className="text-5xl font-bold text-white tracking-tighter">{stats.nodes.toLocaleString()}</div>
                            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-guardian-blue">
                                <Zap className="w-3 h-3" /> All Systems Online
                            </div>
                        </GlassCard>
                    </div>

                    {/* LIVE MAP */}
                    <GlassCard className="col-span-1 xl:col-span-3 bg-black/40 min-h-[400px] flex items-center justify-center relative shadow-none border-white/5">
                        {/* Map Art */}
                        <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center invert filter contrast-125 saturate-0"></div>
                        <div className="absolute inset-0 bg-scan-beam mix-blend-overlay opacity-10 animate-scan-beam pointer-events-none"></div>

                        <div className="absolute top-6 left-8 z-10">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Globe className="w-5 h-5 text-guardian-blue animate-pulse" /> LIVE THREAT VECTORS</h3>
                            <p className="text-xs text-white/40 font-mono mt-1">REAL-TIME GLOBAL TELEMETRY</p>
                        </div>

                        {/* Animated Blips & Federated Connections */}
                        {mapBlips.map((blip) => (
                            <div key={blip.id}
                                className="absolute group cursor-pointer transition-all duration-1000 ease-in-out"
                                style={{
                                    top: blip.top,
                                    left: blip.left,
                                    transform: `scale(${blip.scale || 1})`,
                                    opacity: blip.opacity || 1
                                }}>

                                {/* Visual Connection Line (Simulating Network) */}
                                <div className="absolute top-1.5 left-1.5 w-[200px] h-[1px] bg-gradient-to-r from-guardian-blue/50 to-transparent origin-left animate-pulse-fast opacity-0 group-hover:opacity-100 rotate-45 pointer-events-none"></div>

                                <div className={`w-3 h-3 rounded-full ${blip.color} animate-ping absolute opacity-50`}></div>
                                <div className={`w-3 h-3 rounded-full ${blip.color} relative shadow-[0_0_10px_currentColor] transition-transform group-hover:scale-150`}></div>

                                {/* Tooltip */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-guardian-dark border border-white/20 px-3 py-1 rounded text-[10px] whitespace-nowrap z-20 pointer-events-none text-white shadow-xl">
                                    <div className="font-bold mb-0.5">FEDERATED NODE #{blip.id}</div>
                                    <div className="text-gray-400 text-[9px] flex items-center gap-1">
                                        <Activity className="w-2 h-2 text-trust-green" /> MESH ACTIVE
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Level 4: Global Federated Pulse Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-guardian-blue/10 rounded-full animate-ping-slow opacity-20"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-guardian-blue/20 rounded-full animate-ping-slower opacity-30"></div>
                        </div>
                    </GlassCard>
                </div>

                {/* --- ROW 2: CONTROL PANELS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* MISINFORMATION DEFENSE */}
                    <GlassCard className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-guardian-blue/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-guardian-blue/10 border border-guardian-blue/20 text-guardian-blue"><Search className="w-8 h-8" /></div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Deepfake Detective</h3>
                                <p className="text-sm text-gray-400 max-w-sm">Paste any URL to verify content authenticity using C2PA provenance ledger and Azure AI analysis.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <div className={`flex-1 relative transition-all ${inputError ? 'animate-shake' : ''}`}>
                                <input
                                    type="text"
                                    value={newsUrl}
                                    onChange={(e) => setNewsUrl(e.target.value)}
                                    placeholder="Paste media link here..."
                                    className={`w-full bg-black/50 border ${inputError ? 'border-trust-red' : 'border-white/10 focus:border-guardian-blue'} rounded-xl px-5 py-4 text-sm focus:outline-none transition-colors text-white placeholder:text-gray-600 font-mono`}
                                />
                            </div>
                            <button
                                onClick={handleVerifyNews}
                                disabled={analyzingNews}
                                className="bg-guardian-blue hover:bg-blue-500 text-white font-bold px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                            >
                                {analyzingNews ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                                ANALYZE
                            </button>
                        </div>

                        {/* RESULT DISPLAY */}
                        {newsResult && (
                            <div className="mt-8 animate-fade-in-up">
                                <div className={`p-6 rounded-2xl border ${newsResult.trust_score > 80 ? 'bg-trust-green/5 border-trust-green/20' : 'bg-trust-red/5 border-trust-red/20'}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`text-2xl font-bold uppercase tracking-tight ${newsResult.trust_score > 80 ? 'text-trust-green' : 'text-trust-red'}`}>
                                            {newsResult.trust_score > 80 ? 'AUTHENTIC CONTENT' : 'SUSPICIOUS MEDIA'}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">TRUST SCORE</div>
                                            <div className="text-3xl font-bold text-white">{newsResult.trust_score}%</div>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

                                    <div className="flex items-center gap-6 text-xs text-gray-300 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-guardian-blue" />
                                            <span>PUBLISHER: <span className="text-white font-bold">{newsResult.publisher}</span></span>
                                        </div>
                                        {newsResult.c2pa_valid && (
                                            <div className="flex items-center gap-2 text-trust-green">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>C2PA DIGITALLY SIGNED</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </GlassCard>

                    {/* TRUST REGISTRY */}
                    <GlassCard className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-trust-green/10 border border-trust-green/20 text-trust-green"><Users className="w-8 h-8" /></div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Trust Registry</h3>
                                    <p className="text-sm text-gray-400">Verified institutional agents.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleViewAllRegistry}
                                className="text-xs font-bold text-trust-green hover:text-green-400 border border-trust-green/30 px-4 py-2 rounded-lg transition-all hover:bg-trust-green/10 active:scale-95">
                                VIEW ALL
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                            {agentsList.map((agent, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group"
                                    onClick={() => setSelectedAgent(agent)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-guardian-dark flex items-center justify-center font-bold text-gray-400 border border-white/10 group-hover:border-trust-green/50 group-hover:text-trust-green transition-all">
                                            {agent.name ? agent.name.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-trust-green transition-colors">{agent.name || 'Unknown Agent'}</div>
                                            <div className="text-[10px] text-gray-500 font-mono">{(agent.id || '').substring(0, 24)}...</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs font-bold text-trust-green">{agent.trust}% TRUST</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] text-gray-500">BY: {agent.category === 'Finance' ? 'CHASE BANK' : 'MICROSOFT'}</span>
                                            <StatusBadge status="neutral">{agent.category}</StatusBadge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

            </main >
        </div >
    );
}
