import React from 'react';
import { ShieldCheck, Fingerprint, Globe, CheckCircle, Activity, Server, FileText } from 'lucide-react';

export default function AgentPassport({ agent, onClose }) {
    if (!agent) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] relative" onClick={e => e.stopPropagation()}>

                {/* Holographic Header */}
                <div className="h-32 bg-gradient-to-b from-blue-900/50 to-gray-900 relative p-6 flex flex-col items-center justify-center border-b border-blue-500/30">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                    <div className="w-20 h-20 rounded-full bg-black border-4 border-blue-400 shadow-xl flex items-center justify-center mb-[-40px] z-10">
                        <span className="text-3xl font-black text-blue-400">{agent.name.charAt(0)}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                        <ShieldCheck className="w-6 h-6 text-green-400 animate-pulse" />
                    </div>
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-blue-300 tracking-widest">
                        VERIFIED CREDENTIAL
                    </div>
                </div>

                {/* content */}
                <div className="pt-12 pb-8 px-8">
                    <h2 className="text-2xl font-black text-white text-center mb-1">{agent.name}</h2>
                    <div className="text-center text-blue-400 text-xs font-mono mb-6">{agent.category} • LEVEL 4 CLEARANCE</div>

                    <div className="space-y-4">
                        {/* DID FIELD */}
                        <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                <Fingerprint className="w-3 h-3" /> DECENTRALIZED IDENTIFIER (DID)
                            </div>
                            <div className="font-mono text-xs text-green-400 break-all">{agent.id}</div>
                        </div>

                        {/* SPONSOR */}
                        <div className="p-3 bg-black/50 rounded-lg border border-gray-800 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                    <Server className="w-3 h-3" /> SPONSORING ENTITY
                                </div>
                                <div className="font-bold text-white text-sm">Microsoft Corporation</div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>

                        {/* LIABILITY & HASH */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                                <div className="text-[10px] text-gray-500 mb-1">LIABILITY BOND</div>
                                <div className="text-white font-bold">$5,000,000</div>
                            </div>
                            <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                                <div className="text-[10px] text-gray-500 mb-1">MODEL HASH</div>
                                <div className="text-white font-mono text-[10px]">sha256:8f4...</div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-600 font-mono">
                        <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3" /> SIGNED ON CHAIN
                        </div>
                        <div>BLOCK #192834</div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-sm" onClick={onClose}>
                        CLOSE PASSPORT
                    </button>
                </div>
            </div>
        </div>
    );
}
