import React, { useState } from 'react';
import { Bot, Shield, Activity, ArrowLeft, MoreHorizontal, History, Filter, ArrowDownUp, Check, AlertOctagon, Brain, Zap, X } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';
import NeuralBackground from './NeuralBackground';

export default function AgentDashboard({ onBack }) {
    const [filter, setFilter] = useState('ALL');
    const [sort, setSort] = useState('TRUST');
    const [selectedAgent, setSelectedAgent] = useState(null); // For Neural View
    const [showRevokeModal, setShowRevokeModal] = useState(false);

    const [agents, setAgents] = useState([
        { id: 1, name: "Travel_Concierge_X", role: "Booking Assistant", trust: 98, status: "VERIFIED", lastActive: "2 mins ago", sponsor: "Expedia Group", signatures: ["Logic Chain Valid", "Identity Signed"] },
        { id: 2, name: "FinBot_Advisor", role: "Financial Planner", trust: 92, status: "VERIFIED", lastActive: "1 hour ago", sponsor: "Chase Bank", signatures: ["Financial Regs Compliant"] },
        { id: 3, name: "Health_Monitor_AI", role: "Medical Assistant", trust: 99, status: "VERIFIED", lastActive: "Active Now", sponsor: "Mayo Clinic", signatures: ["HIPAA Compliant", "Biometric Lock"] },
        { id: 4, name: "Unknown_Sales_Bot", role: "Unsolicited Outreach", trust: 15, status: "BLOCKED", lastActive: "Yesterday", sponsor: "Unknown Origin", signatures: ["Suspected Spam", "Aggressive Sales Pattern"] },
    ]);

    const filteredAgents = agents
        .filter(a => filter === 'ALL' || (filter === 'BLOCKED' ? a.status === 'BLOCKED' : a.status === 'VERIFIED'))
        .sort((a, b) => sort === 'TRUST' ? b.trust - a.trust : 0);

    const handleRevoke = () => {
        setAgents(prev => prev.map(a => a.id === selectedAgent.id ? { ...a, status: "BLOCKED", trust: 0, name: `[BLOCKED] ${a.name}` } : a));
        setShowRevokeModal(false);
        setSelectedAgent(null);
    };

    return (
        <div className="min-h-screen bg-guardian-dark text-white p-8 pt-24 animate-fade-in relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>

            <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group border border-transparent hover:border-white/10">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <Bot className="w-8 h-8 text-cyan-400" />
                            Agent Interactions
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-wider">AI ECONOMY OVERSIGHT</p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                {/* ACTIVE AGENTS LIST */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Active AI Agents</h2>
                        <div className="flex gap-2">
                            <div className="flex bg-black/20 rounded-lg p-1 border border-white/10">
                                {['ALL', 'ACTIVE', 'BLOCKED'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${filter === f ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setSort(prev => prev === 'TRUST' ? 'RECENT' : 'TRUST')} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white">
                                <ArrowDownUp className="w-4 h-4" />
                            </button>
                        </div>
                    </div>


                    {filteredAgents.map(agent => (
                        <GlassCard
                            key={agent.id}
                            onClick={() => setSelectedAgent(agent)}
                            className={`flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden ${selectedAgent?.id === agent.id ? 'border-cyan-500 box-shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}
                        >
                            {/* Background Progress Bar for Trust */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20 w-full">
                                <div className="absolute right-0 top-0 h-full bg-black" style={{ width: `${100 - agent.trust}%` }}></div>
                            </div>

                            <div className="flex items-center gap-6 relative z-10">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold border ${agent.status === 'BLOCKED' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'}`}>
                                    {agent.status === 'BLOCKED' ? <AlertOctagon className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                        {agent.name}
                                        {agent.trust > 90 && <Check className="w-4 h-4 text-cyan-500 bg-cyan-500/10 rounded-full p-0.5" />}
                                    </h3>
                                    <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                                        <span>{agent.role}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <span>by {agent.sponsor}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 relative z-10">
                                <StatusBadge status={agent.status === 'BLOCKED' ? 'risk' : 'secure'}>
                                    {agent.trust}% TRUST
                                </StatusBadge>
                                <div className="text-[10px] text-gray-500 font-mono">{agent.lastActive}</div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* INSPECTION PANEL */}
                <div className="space-y-6">
                    {selectedAgent ? (
                        <GlassCard className="sticky top-24 bg-cyan-900/10 border-cyan-500/30 p-0 overflow-hidden flex flex-col min-h-[500px] animate-fade-in-left">
                            <div className="h-32 bg-black/50 relative overflow-hidden">
                                <NeuralBackground />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Brain className="w-16 h-16 text-cyan-500/50 animate-pulse" />
                                </div>
                                <div className="absolute bottom-2 left-4 text-xs font-mono text-cyan-400">ANALYZING NEURAL SIGNATURE...</div>
                            </div>

                            <div className="p-6 space-y-6 flex-1">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{selectedAgent.name}</h3>
                                    <div className="text-gray-400 text-sm">{selectedAgent.role}</div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-cyan-500 uppercase flex items-center gap-2"><Activity className="w-3 h-3" /> Cognitive Patterns</h4>
                                    {selectedAgent.signatures?.map((sig, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm bg-black/20 p-2 rounded border border-white/5">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            {sig}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-cyan-500 uppercase">Permissions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">Calendar Write</span>
                                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">Email Read</span>
                                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">Payments (Capped $50)</span>
                                    </div>
                                </div>

                                {selectedAgent.status !== 'BLOCKED' && (
                                    <button
                                        onClick={() => setShowRevokeModal(true)}
                                        className="w-full mt-auto py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" /> EMERGENCY REVOKE
                                    </button>
                                )}
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="sticky top-24 flex items-center justify-center min-h-[300px] text-gray-500 flex-col gap-4 border-dashed">
                            <Bot className="w-12 h-12 opacity-20" />
                            <div className="text-sm">Select an agent to inspect neural signatures</div>
                        </GlassCard>
                    )}
                </div>
            </main>

            {/* REVOKE MODAL */}
            {showRevokeModal && (
                <div className="fixed inset-0 z-50 bg-red-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-black border border-red-500 rounded-2xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.5)] relative text-center">
                        <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-6 animate-bounce" />
                        <h2 className="text-2xl font-black text-white mb-2 uppercase">Revoke Authorization?</h2>
                        <p className="text-red-400 mb-8 font-mono text-sm leading-relaxed">
                            This action will immediately terminate {selectedAgent?.name}'s access to your data wallet and identity keys. This cannot be undone without re-verification.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setShowRevokeModal(false)} className="py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold">CANCEL</button>
                            <button onClick={handleRevoke} className="py-3 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]">CONFIRM REVOCATION</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
