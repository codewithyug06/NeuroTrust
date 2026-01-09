import React, { useState } from 'react';
import { Shield, CheckCircle, ExternalLink, MoreHorizontal, List, X } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import AgentProfile from './AgentProfile';

export default function TrustRegistry() {
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const agents = [
        { id: 'S', name: 'Support_Agent_01', did: 'did:sov:E1...429', trust: 98, role: 'CUSTOMER SERVICE' },
        { id: 'B', name: 'Bank_Verifier_X', did: 'did:web:bank.chase.com', trust: 95, role: 'FINANCE' },
        { id: 'G', name: 'Global_Auth_Node_4', did: 'did:web:auth.global.net', trust: 99, role: 'INFRASTRUCTURE' },
        { id: 'L', name: 'Legal Verifier NY', did: 'did:web:legal.ny.gov', trust: 92, role: 'LEGAL' },
    ];

    // Extended list for "View All"
    const allAgents = [
        ...agents,
        { id: 'M', name: 'Med_Record_Sync', did: 'did:web:hospital.mayo.edu', trust: 97, role: 'HEALTH' },
        { id: 'T', name: 'Travel_Logic_Core', did: 'did:web:expedia.partners', trust: 88, role: 'TRAVEL' },
        { id: 'I', name: 'Insure_Bot_Alpha', did: 'did:web:liberty.mutual', trust: 91, role: 'INSURANCE' },
    ];

    return (
        <GlassCard className="h-full flex flex-col p-6 border-blue-500/20 relative">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white leading-none">Trust Registry</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">Verified institutional agents.</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAll(true)}
                    className="text-xs font-bold text-blue-400 border border-blue-500/30 px-3 py-1 rounded hover:bg-blue-500/10 transition-colors uppercase tracking-wider"
                >
                    View All
                </button>
            </div>

            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
                {agents.map((agent, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedAgent(agent)}
                        className="flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-xl group hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-400 group-hover:text-white border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                {agent.id}
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-200 group-hover:text-blue-200">{agent.name}</div>
                                <div className="text-[10px] text-gray-600 font-mono group-hover:text-gray-500 truncate w-32">{agent.did}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-xs font-bold text-green-400">{agent.trust}% TRUST</div>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <span className="text-[9px] uppercase bg-white/10 text-gray-400 px-1.5 py-0.5 rounded">{agent.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Profile Modal */}
            {selectedAgent && (
                <AgentProfile agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
            )}

            {/* View All Modal */}
            {showAll && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <GlassCard className="w-full max-w-lg h-[80vh] flex flex-col p-6 border-blue-500/30 relative">
                        <button onClick={() => setShowAll(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <List className="w-6 h-6 text-blue-500" /> Full Registry
                        </h2>

                        <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
                            {allAgents.map((agent, i) => (
                                <div
                                    key={i}
                                    onClick={() => { setSelectedAgent(agent); setShowAll(false); }}
                                    className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs">
                                            {agent.id}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-white">{agent.name}</div>
                                            <div className="text-[10px] text-gray-500">{agent.role}</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-green-400 text-sm">{agent.trust}%</div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}
        </GlassCard>
    );
}
