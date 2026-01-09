import React from 'react';
import { ShieldCheck, Fingerprint, Globe, CheckCircle, Activity, Server, FileText, BadgeDollarSign, Database, Scale } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';
import CyberButton from './ui/CyberButton';

export default function AgentPassport({ agent, onClose }) {
    if (!agent) return null;

    // Handle both direct props (from list) or wrapped handshake (if passed differently)
    const meta = agent.metadata || agent;
    const sponsorName = meta.sponsor?.name || meta.sponsor || "Unknown Entity";
    const bondAmount = meta.liability_bond ? `$${meta.liability_bond.toLocaleString()}` : "$5,000,000";
    const modelHash = meta.model_hash || meta.hash || "sha256:8f4b3c2d1e...";
    const did = agent.id || meta.did || "did:ion:unknown";
    const roleCompliance = meta.compliance_score || 98.5;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-md relative" onClick={e => e.stopPropagation()}>

                <GlassCard className="overflow-hidden border-guardian-blue/50 shadow-[0_0_100px_rgba(59,130,246,0.2)]">

                    {/* Holographic Header */}
                    <div className="relative -m-6 mb-0 h-40 bg-gradient-to-b from-guardian-blue/20 to-transparent p-6 flex flex-col items-center justify-center border-b border-white/10">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 animate-pulse"></div>

                        <div className="w-24 h-24 rounded-full bg-black/80 border-4 border-guardian-blue shadow-2xl flex items-center justify-center mb-[-50px] z-10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-guardian-blue/20 animate-scan-beam" />
                            <span className="text-4xl font-black text-white relative z-10 drop-shadow-glow">{agent.name?.charAt(0) || 'A'}</span>
                        </div>

                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <StatusBadge status="secure">VERIFIED</StatusBadge>
                        </div>

                        <div className="absolute top-4 left-4 text-[10px] font-mono text-guardian-blue tracking-[0.2em] flex items-center gap-1">
                            <Globe className="w-3 h-3" /> GLOBAL TRUST LEDGER
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-14 pb-4 space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">{agent.name}</h2>
                            <div className="flex items-center justify-center gap-2">
                                <StatusBadge status="neutral">{agent.category || 'AI Agent'}</StatusBadge>
                                <span className="text-xs font-mono text-gray-400">• {meta.tier || 'LEVEL 3 CLEARANCE'}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* DID FIELD */}
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-guardian-blue/30 transition-colors group">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1 tracking-wider uppercase group-hover:text-guardian-blue transition-colors">
                                    <Fingerprint className="w-3 h-3" /> Decentralized Identifier
                                </div>
                                <div className="font-mono text-xs text-trust-green break-all select-all">{did}</div>
                            </div>

                            {/* SPONSOR & ROLE COMPLIANCE */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-guardian-blue/30 transition-colors">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1 tracking-wider uppercase">
                                        <Server className="w-3 h-3" /> Sponsor
                                    </div>
                                    <div className="font-bold text-white text-sm truncate" title={sponsorName}>{sponsorName}</div>
                                </div>

                                <div className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-guardian-blue/30 transition-colors">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1 tracking-wider uppercase">
                                        <Scale className="w-3 h-3" /> Role Compliance
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-trust-green" style={{ width: `${roleCompliance}%` }} />
                                        </div>
                                        <span className="text-trust-green text-xs font-bold">{roleCompliance}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* LIABILITY & HASH */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-guardian-blue/30 transition-colors">
                                    <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1 uppercase tracking-wider"><BadgeDollarSign className="w-3 h-3" /> Bond</div>
                                    <div className="text-white font-bold">{bondAmount}</div>
                                </div>
                                <div className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-guardian-blue/30 transition-colors">
                                    <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1 uppercase tracking-wider"><Database className="w-3 h-3" /> Hash</div>
                                    <div className="text-gray-400 font-mono text-[10px] truncate" title={modelHash}>{modelHash}</div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3 text-trust-green" /> SIGNED BY NEUROTRUST
                            </div>
                            <div>BLOCK #{Math.floor(Math.random() * 100000) + 192000}</div>
                        </div>

                        <CyberButton variant="primary" className="w-full justify-center" onClick={onClose}>
                            CLOSE PASSPORT
                        </CyberButton>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
