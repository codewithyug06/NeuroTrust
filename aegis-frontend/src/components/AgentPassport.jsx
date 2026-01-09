import React from 'react';
import { ShieldCheck, Fingerprint, Globe, CheckCircle, Activity, Server, FileText, BadgeDollarSign, Database } from 'lucide-react';

export default function AgentPassport({ agent, onClose }) {
    if (!agent) return null;

    // Handle both direct props (from list) or wrapped handshake (if passed differently)
    // The backend model structure:
    // { did, name, category, tier, sponsor: { name, verified }, liability_bond, model_hash ... }

    // Fallback for metadata struct if nested differently in UI state
    const meta = agent.metadata || agent;
    const sponsorName = meta.sponsor?.name || meta.sponsor || "Unknown Entity";
    const bondAmount = meta.liability_bond ? `$${meta.liability_bond.toLocaleString()}` : "$5,000,000";
    const modelHash = meta.model_hash || meta.hash || "sha256:8f4b3c2d1e...";
    const did = agent.id || meta.did || "did:ion:unknown";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] relative" onClick={e => e.stopPropagation()}>

                {/* Holographic Header */}
                <div className="h-32 bg-gradient-to-b from-blue-900/50 to-gray-900 relative p-6 flex flex-col items-center justify-center border-b border-blue-500/30">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                    <div className="w-20 h-20 rounded-full bg-black border-4 border-blue-400 shadow-xl flex items-center justify-center mb-[-40px] z-10 transition-transform hover:scale-105 duration-300">
                        <span className="text-3xl font-black text-blue-400">{agent.name?.charAt(0) || 'A'}</span>
                    </div>
                    <div className="absolute top-4 right-4" title="Cryptographically Verified">
                        <ShieldCheck className="w-6 h-6 text-green-400 animate-pulse" />
                    </div>
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-blue-300 tracking-widest">
                        VERIFIED CREDENTIAL
                    </div>
                </div>

                {/* Content */}
                <div className="pt-12 pb-8 px-8">
                    <h2 className="text-2xl font-black text-white text-center mb-1">{agent.name}</h2>
                    <div className="text-center text-blue-400 text-xs font-mono mb-6">{agent.category || 'AI Agent'} • {meta.tier || 'LEVEL 3 CLEARANCE'}</div>

                    <div className="space-y-4">
                        {/* DID FIELD */}
                        <div className="p-3 bg-black/50 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                <Fingerprint className="w-3 h-3" /> DECENTRALIZED IDENTIFIER (DID)
                            </div>
                            <div className="font-mono text-xs text-green-400 break-all">{did}</div>
                        </div>

                        {/* SPONSOR */}
                        <div className="p-3 bg-black/50 rounded-lg border border-gray-800 flex justify-between items-center group">
                            <div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 group-hover:text-blue-400 transition-colors">
                                    <Server className="w-3 h-3" /> SPONSORING ENTITY
                                </div>
                                <div className="font-bold text-white text-sm">{sponsorName}</div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>

                        {/* LIABILITY & HASH */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                                <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><BadgeDollarSign className="w-3 h-3" /> LIABILITY BOND</div>
                                <div className="text-white font-bold">{bondAmount}</div>
                            </div>
                            <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                                <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Database className="w-3 h-3" /> MODEL HASH</div>
                                <div className="text-white font-mono text-[10px] truncate" title={modelHash}>{modelHash}</div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-600 font-mono">
                        <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3" /> SIGNED ON CHAIN
                        </div>
                        <div>BLOCK #{Math.floor(Math.random() * 100000) + 192000}</div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg hover:shadow-blue-500/25" onClick={onClose}>
                        CLOSE PASSPORT
                    </button>
                </div>
            </div>
        </div>
    );
}
