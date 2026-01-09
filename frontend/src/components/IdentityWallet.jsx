import React, { useState } from 'react';
import { X, Shield, User, CheckCircle, Briefcase, Plus, MoreHorizontal, LayoutGrid, Users, Building2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';
import CyberButton from './ui/CyberButton';

export default function IdentityWallet({ onClose }) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'My Identity', icon: User },
        { id: 'contacts', label: 'Trusted Contacts', icon: Users },
        { id: 'orgs', label: 'Organizations', icon: Building2 },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-5xl h-[650px] max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
                <GlassCard className="h-full !p-0 flex overflow-hidden border-guardian-blue/30 shadow-[0_0_100px_rgba(59,130,246,0.15)]">

                    {/* BUTTON CLOSE Absolute */}
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full text-gray-400 z-50 transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    {/* SIDEBAR */}
                    <div className="w-64 bg-black/40 border-r border-white/5 p-6 flex flex-col relative">
                        <div className="absolute inset-0 bg-guardian-blue/5 pointer-events-none" />

                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-trust-green/10 flex items-center justify-center border border-trust-green/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <Shield className="w-5 h-5 text-trust-green" />
                            </div>
                            <div>
                                <h2 className="font-black text-white tracking-wide text-lg">TRUST</h2>
                                <div className="text-[10px] text-gray-400 font-mono tracking-[0.2em] -mt-1">WALLET</div>
                            </div>
                        </div>

                        <nav className="space-y-2 flex-1 relative z-10">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-300 border ${activeTab === tab.id
                                        ? 'bg-guardian-blue/20 text-white border-guardian-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5 border-transparent'
                                        }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-guardian-blue' : ''}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                            <div className="text-[10px] text-gray-500 font-mono mb-2 tracking-widest">NETWORK STATUS</div>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trust-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-trust-green"></span>
                                </span>
                                <span className="text-trust-green text-xs font-bold font-mono">CONNECTED: ENTRA ID</span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex-1 p-8 overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')] relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black pointer-events-none" />

                        <div className="relative z-10 max-w-3xl mx-auto h-full">
                            {activeTab === 'profile' && (
                                <div className="animate-fade-in space-y-8">
                                    {/* DIGITAL ID CARD */}
                                    <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group perspective-1000">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black transition-transform duration-500 group-hover:scale-110"></div>
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-message-shimmer opacity-30"></div>

                                        {/* Grid Pattern Overlay */}
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                        <div className="absolute top-8 right-8 animate-pulse">
                                            <Shield className="w-16 h-16 text-white/5" />
                                        </div>

                                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div className="relative group/avatar">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-trust-green to-guardian-blue rounded-2xl opacity-75 blur group-hover/avatar:opacity-100 transition duration-500"></div>
                                                    <div className="relative w-20 h-20 rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-white/10">
                                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <StatusBadge status="secure" className="mb-2 ml-auto">C2PA VERIFIED</StatusBadge>
                                                    <div className="text-white/80 font-mono text-xl tracking-[0.2em] shadow-black drop-shadow-md">**** 4291</div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-lg">John Doe</h3>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                                                    <span className="bg-white/5 px-2 py-1 rounded">ISSUED: 12/24</span>
                                                    <span className="bg-white/5 px-2 py-1 rounded">EXP: 12/28</span>
                                                    <span className="text-trust-green font-bold flex items-center gap-1">
                                                        <Shield className="w-3 h-3" /> LEVEL 3 CLEARANCE
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CREDENTIALS LIST */}
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Verifiable Credentials</h3>
                                        <div className="space-y-3">
                                            <GlassCard className="!p-4 flex items-center justify-between hover:border-guardian-blue/30 group cursor-pointer transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                                        <Briefcase className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">Employment Verification</div>
                                                        <div className="text-xs text-gray-500 font-mono">Microsoft Corp • Issued via Entra</div>
                                                    </div>
                                                </div>
                                                <StatusBadge status="secure">VALID</StatusBadge>
                                            </GlassCard>

                                            <GlassCard className="!p-4 flex items-center justify-between hover:border-purple-500/30 group cursor-pointer transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                                        <User className="w-5 h-5 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-purple-400 transition-colors">Government ID</div>
                                                        <div className="text-xs text-gray-500 font-mono">State of California • RealID Compliant</div>
                                                    </div>
                                                </div>
                                                <StatusBadge status="secure">VALID</StatusBadge>
                                            </GlassCard>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'contacts' && (
                                <div className="animate-fade-in space-y-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-white">Trusted Circle</h3>
                                            <p className="text-sm text-gray-400 mt-1">People whose voices are cryptographically signed.</p>
                                        </div>
                                        <CyberButton>
                                            <Plus className="w-4 h-4 mr-2" /> Add Contact
                                        </CyberButton>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["Mom", "Dad", "Sarah (Wife)", "Dr. Smith"].map((name, i) => (
                                            <GlassCard key={i} className="!p-4 flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-gray-500 border border-white/10 group-hover:border-trust-green transition-colors">
                                                        {name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-trust-green transition-colors">{name}</div>
                                                        <div className="text-[10px] text-trust-green/80 flex items-center gap-1 mt-0.5 font-mono">
                                                            <Shield className="w-3 h-3" /> Voiceprint Active
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="text-gray-600 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'orgs' && (
                                <div className="animate-fade-in space-y-6">
                                    <h3 className="text-2xl font-black text-white mb-6">Verified Organizations</h3>
                                    <div className="space-y-3">
                                        {["Chase Bank", "IRS (Official)", "Medicare Support", "Amazon Customer Service"].map((org, i) => (
                                            <GlassCard key={i} className="!p-4 flex items-center justify-between group cursor-pointer hover:border-trust-green/30">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20">
                                                        <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-trust-green transition-colors">{org}</div>
                                                        <div className="text-[10px] text-gray-500 font-mono">DID: did:web:{org.toLowerCase().replace(/ /g, '')}:...</div>
                                                    </div>
                                                </div>
                                                <StatusBadge status="secure">VERIFIED</StatusBadge>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
