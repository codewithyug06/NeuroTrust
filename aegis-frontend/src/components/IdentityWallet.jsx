import React, { useState } from 'react';
import { X, Shield, User, CheckCircle, Briefcase, Plus, MoreHorizontal } from 'lucide-react';

export default function IdentityWallet({ onClose }) {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-guardian-slate border border-white/10 rounded-2xl w-full max-w-4xl h-[600px] flex overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>

                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full text-gray-400 z-10"><X className="w-5 h-5" /></button>

                {/* SIDEBAR */}
                <div className="w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded bg-trust-green/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-trust-green" />
                        </div>
                        <h2 className="font-bold text-white tracking-wide">TRUST WALLET</h2>
                    </div>

                    <nav className="space-y-2 flex-1">
                        <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                            <User className="w-4 h-4" /> My Identity
                        </button>
                        <button onClick={() => setActiveTab('contacts')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${activeTab === 'contacts' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                            <CheckCircle className="w-4 h-4" /> Trusted Contacts
                        </button>
                        <button onClick={() => setActiveTab('orgs')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${activeTab === 'orgs' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                            <Briefcase className="w-4 h-4" /> Organizations
                        </button>
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="text-[10px] text-gray-500 font-mono mb-2">NETWORK STATUS</div>
                        <div className="flex items-center gap-2 text-trust-green text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-trust-green animate-pulse"></div>
                            Connected to Entra ID
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 p-8 overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">

                    {activeTab === 'profile' && (
                        <div className="animate-fade-in space-y-8">
                            {/* DIGITAL ID CARD */}
                            <div className="relative w-full max-w-lg mx-auto h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-message-shimmer opacity-20"></div>

                                <div className="absolute top-6 right-6">
                                    <Shield className="w-12 h-12 text-white/5" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-800 border-2 border-trust-green flex items-center justify-center overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-trust-green font-bold tracking-widest text-xs mb-1">C2PA VERIFIED</div>
                                            <div className="text-white font-mono text-xl tracking-widest">**** 4291</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">John Doe</h3>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                                            <span>ISSUED: 12/24</span>
                                            <span>•</span>
                                            <span>EXP: 12/28</span>
                                            <span>•</span>
                                            <span className="text-trust-green">LEVEL 3 CLEARANCE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CREDENTIALS LIST */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Verifiable Credentials</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-trust-green/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-500/20 rounded-lg"><Briefcase className="w-5 h-5 text-blue-400" /></div>
                                            <div>
                                                <div className="font-bold text-white">Employment Verification</div>
                                                <div className="text-xs text-gray-500">Microsoft Corp • Issued via Entra</div>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-trust-green" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-trust-green/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-purple-500/20 rounded-lg"><User className="w-5 h-5 text-purple-400" /></div>
                                            <div>
                                                <div className="font-bold text-white">Government ID</div>
                                                <div className="text-xs text-gray-500">State of California • RealID Compliant</div>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-trust-green" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <div className="animate-fade-in space-y-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Trusted Circle</h3>
                                    <p className="text-sm text-gray-400">People whose voices are cryptographically signed.</p>
                                </div>
                                <button className="p-3 bg-trust-green hover:bg-green-400 text-black rounded-lg transition-colors">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Mom", "Dad", "Sarah (Wife)", "Dr. Smith"].map((name, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-500 border-2 border-trust-green">
                                                {name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{name}</div>
                                                <div className="text-xs text-trust-green flex items-center gap-1">
                                                    <Shield className="w-3 h-3" /> Voiceprint Active
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'orgs' && (
                        <div className="animate-fade-in space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-6">Verified Organizations</h3>
                            <div className="space-y-3">
                                {["Chase Bank", "IRS (Official)", "Medicare Support", "Amazon Customer Service"].map((org, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                                                <Briefcase className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{org}</div>
                                                <div className="text-xs text-gray-500">DID: did:web:{org.toLowerCase().replace(/ /g, '')}:...</div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-trust-green/10 text-trust-green text-xs font-bold rounded border border-trust-green/20">
                                            VERIFIED
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
