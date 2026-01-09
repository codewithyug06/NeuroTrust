import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Users, ArrowLeft, BarChart3, Globe, Briefcase, Plus, X, Search, MoreVertical, Zap } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';
import CyberButton from './ui/CyberButton';
import SwarmMap from './SwarmMap';

export default function EnterpriseDashboard({ onBack }) {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [agents, setAgents] = useState([
        { id: 'corp_supp_01', role: 'Internal IT Support', reputation: 99, status: 'secure' },
        { id: 'sales_outreach_ai', role: 'Cold Outreach Bot', reputation: 72, status: 'warning' },
        { id: 'hr_assistant_v2', role: 'Recruiting Screener', reputation: 95, status: 'secure' }
    ]);
    const [newAgentId, setNewAgentId] = useState('');
    const [ticker, setTicker] = useState("System Normal. No active threats.");

    // Simulate Live Ticker
    useEffect(() => {
        const messages = [
            "THREAT BLOCKED: IP 192.168.4.1 [RUSSIA]",
            "AGENT VERIFIED: sales_bot_04 [SALESFORCE]",
            "ANOMALY DETECTED: Voice pattern mismatch in Sector 7",
            "SYSTEM UPDATE: Guardian Model v4.2 Deployed",
            "THREAT BLOCKED: Deepfake Injection Attempt [CHINA]"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setTicker(messages[i]);
            i = (i + 1) % messages.length;
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        setShowRegisterModal(false);
        setAgents([...agents, { id: newAgentId, role: 'Unassigned Agent', reputation: 50, status: 'neutral' }]);
        setNewAgentId('');
    };

    return (
        <div className="min-h-screen bg-guardian-dark text-white p-8 pt-24 animate-fade-in relative">
            <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group border border-transparent hover:border-white/10">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-amber-500" />
                            Enterprise Override
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-wider">ORGANIZATIONAL DEFENSE</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 animate-pulse">ADMIN ACCESS GRANTED</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* STATS OVERVIEW */}
                <div className="lg:col-span-4">
                    <GlassCard className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="text-gray-400 text-xs font-mono mb-2 uppercase group-hover:text-white transition-colors">Protected Employees</div>
                            <div className="text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">4,281</div>
                            <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden">
                                <div className="h-full w-[98%] bg-trust-green shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            </div>
                        </div>
                        <div className="group">
                            <div className="text-gray-400 text-xs font-mono mb-2 uppercase group-hover:text-white transition-colors">Executive Impersonations</div>
                            <div className="text-4xl font-bold text-amber-500 group-hover:scale-105 transition-transform origin-left">12</div>
                            <div className="text-[10px] text-gray-500 mt-1">BLOCKED LAST 30 DAYS</div>
                        </div>
                        <div className="group">
                            <div className="text-gray-400 text-xs font-mono mb-2 uppercase group-hover:text-white transition-colors">System Uptime</div>
                            <div className="text-4xl font-bold text-trust-green group-hover:scale-105 transition-transform origin-left">99.9%</div>
                        </div>
                        <div className="group">
                            <div className="text-gray-400 text-xs font-mono mb-2 uppercase group-hover:text-white transition-colors">Global Threat Level</div>
                            <div className="text-4xl font-bold text-blue-400 group-hover:scale-105 transition-transform origin-left">LOW</div>
                            <div className="flex gap-1 mt-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1.5 w-full rounded-sm ${i < 2 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    {/* LIVE TICKER */}
                    <div className="mt-4 bg-black/40 border border-white/5 rounded-lg p-2 overflow-hidden flex items-center gap-4">
                        <div className="flex items-center gap-2 px-2 border-r border-amber-500/20 text-amber-500 font-bold text-xs whitespace-nowrap">
                            <Zap className="w-3 h-3" /> LIVE FEED
                        </div>
                        <div className="font-mono text-xs text-gray-400 animate-pulse truncate w-full">
                            {ticker}
                        </div>
                    </div>
                </div>

                {/* AGENT CERTIFICATION PANEL */}
                <div className="lg:col-span-3 space-y-6">
                    <GlassCard className="min-h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-amber-500" />
                                Corporate Agent Certifications
                            </h3>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                                    <input type="text" placeholder="Search Agents..." className="bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50" />
                                </div>
                                <button onClick={() => setShowRegisterModal(true)} className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 px-4 py-2 rounded-lg transition-colors border border-amber-500/20 font-bold flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> REGISTER NEW
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-500 border-b border-white/10">
                                        <th className="py-3 font-mono pl-4">AGENT ID</th>
                                        <th className="py-3 font-mono">ROLE</th>
                                        <th className="py-3 font-mono">REPUTATION</th>
                                        <th className="py-3 font-mono">STATUS</th>
                                        <th className="py-3 font-mono text-right pr-4">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {agents.map((agent, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="py-4 font-mono text-gray-300 pl-4 group-hover:text-white transition-colors">{agent.id}</td>
                                            <td className="py-4 text-white font-bold">{agent.role}</td>
                                            <td className={`py-4 font-bold ${agent.reputation > 90 ? 'text-trust-green' : agent.reputation > 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {agent.reputation}/100
                                            </td>
                                            <td className="py-4"><StatusBadge status={agent.status}>{agent.status.toUpperCase()}</StatusBadge></td>
                                            <td className="py-4 text-right pr-4">
                                                <button className="text-gray-500 hover:text-white p-2 rounded hover:bg-white/10"><MoreVertical className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </div>

                {/* GLOBAL ACTIVE THREAT MAP */}
                <div className="space-y-6">
                    <GlassCard className="h-full bg-blue-900/10 border-blue-500/20 relative overflow-hidden flex flex-col p-0">
                        <div className="flex items-center gap-3 p-4 relative z-10 bg-gradient-to-b from-black/80 to-transparent">
                            <Globe className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-bold text-white">Global Threat Map</h3>
                        </div>

                        {/* THE MAP (Clickable simulation) */}
                        <div className="flex-1 min-h-[300px] relative">
                            <SwarmMap showGlobe={true} />
                        </div>

                        <div className="p-4 bg-black/40 border-t border-white/5 relative z-10">
                            <div className="text-xs text-gray-400 font-mono mb-2">MOST TARGETED REGIONS</div>
                            <div className="flex gap-2">
                                <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded border border-red-500/30">EAST EUROPE</span>
                                <span className="bg-orange-500/20 text-orange-400 text-[10px] px-2 py-1 rounded border border-orange-500/30">SE ASIA</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

            </main>

            {/* REGISTER AGENT MODAL */}
            {showRegisterModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                        <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-500" /> Register Corporate Agent</h3>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">AGENT IDENTIFIER (DID)</label>
                                <input
                                    type="text"
                                    value={newAgentId}
                                    onChange={(e) => setNewAgentId(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none font-mono text-sm"
                                    placeholder="did:web:example.com:agent"
                                    required
                                />
                            </div>
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-xs text-amber-300">
                                Validating a new agent requires a 3-step handshake with the NeuroTrust kernel.
                            </div>
                            <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-white transition-colors mt-4">
                                INITIATE HANDSHAKE
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
