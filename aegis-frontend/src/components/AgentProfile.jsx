import React from 'react';
import { Shield, CheckCircle, Activity, Globe, X, Server, Clock, FileText } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';

export default function AgentProfile({ agent, onClose }) {
    if (!agent) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <GlassCard className="max-w-2xl w-full relative overflow-hidden border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20">
                    <X className="w-6 h-6" />
                </button>

                <div className="flex gap-8 relative z-10">
                    {/* Left Col: Identity */}
                    <div className="w-1/3 flex flex-col items-center text-center border-r border-white/10 pr-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
                            {agent.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{agent.name}</h2>
                        <div className="text-xs text-cyan-400 font-mono mb-4 break-all">{agent.did || 'did:web:unknown'}</div>

                        <StatusBadge status="secure" className="mb-6">VERIFIED AGENT</StatusBadge>

                        <div className="w-full text-left space-y-3">
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Trust Score</div>
                                <div className="text-2xl font-black text-green-400">{agent.trust}%</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Uptime</div>
                                <div className="text-lg font-bold text-white">99.98%</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Details */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-cyan-500" /> Security Clearances
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['GDPR Compliant', 'SOC2 Type II', 'Financial Grade API', 'Identity Bound'].map(tag => (
                                    <span key={tag} className="text-xs bg-cyan-900/30 text-cyan-200 border border-cyan-500/30 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-green-500" /> Recent Activity
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { text: 'Verified transaction batch #9281', time: '2 mins ago' },
                                    { text: 'Updated security handshake keys', time: '1 hour ago' },
                                    { text: 'Synced with Global Ledger', time: '4 hours ago' }
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm p-2 hover:bg-white/5 rounded transition-colors border-b border-white/5 last:border-0">
                                        <span className="text-gray-300">{act.text}</span>
                                        <span className="text-xs text-gray-500 font-mono">{act.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors">
                                VIEW LOGS
                            </button>
                            <button className="px-4 py-2 text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-lg shadow-cyan-900/20">
                                REQUEST AUDIT
                            </button>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
