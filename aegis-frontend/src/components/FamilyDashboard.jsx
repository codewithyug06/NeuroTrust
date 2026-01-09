import React, { useState, useEffect } from 'react';
import { Users, Shield, Heart, Activity, Plus, ArrowLeft, Phone, X, CheckCircle, Smartphone, MapPin, AlertTriangle, Lock } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import StatusBadge from './ui/StatusBadge';
import CyberButton from './ui/CyberButton';
import SwarmMap from './SwarmMap'; // Reusing the visual map component

export default function FamilyDashboard({ onBack }) {
    const [elderlyMode, setElderlyMode] = useState(true);
    const [showAddMember, setShowAddMember] = useState(false);
    const [intercepting, setIntercepting] = useState(false); // For the dramatic overlay
    const [members, setMembers] = useState([
        { id: 1, name: "Grandma Sarah", initials: "S", color: "pink", status: "secure", lastActive: "2m ago", elderly: true, location: "Home - Living Room", lat: 30, lng: -40 },
        { id: 2, name: "Jack (Son)", initials: "J", color: "blue", status: "warning", lastActive: "Active Now", elderly: false, context: "In call with Unknown", location: "Downtown - Transit", lat: 45, lng: 10 }
    ]);
    const [activityLog, setActivityLog] = useState([
        { id: 1, member: "Jack", event: "Incoming call from Unknown Number (Flagged Spam)", time: "Just now", type: "warning" },
        { id: 2, member: "Sarah", event: "Guardian blocked 'IRS Scam' attempt", time: "2h ago", type: "success" }
    ]);
    const [toast, setToast] = useState(null);

    // Simulate real-time updates and threat resolution
    useEffect(() => {
        const interval = setInterval(() => {
            if (members.find(m => m.name === "Jack")?.status === "warning" && !intercepting) {
                // Auto-resolve if not intercepted manually
                // kept simple for now
            }
        }, 8000);
        return () => clearInterval(interval);
    }, [members, intercepting]);

    const handleAddMember = (e) => {
        e.preventDefault();
        setShowAddMember(false);
        setMembers(prev => [...prev, { id: Date.now(), name: "New Member", initials: "N", color: "green", status: "secure", lastActive: "Just added", elderly: false, location: "Unknown", lat: 0, lng: 0 }]);
        showToast("Member Added Successfully");
    };

    const toggleElderlyMode = () => {
        setElderlyMode(!elderlyMode);
        showToast(elderlyMode ? "Elderly Protection Disabled" : "Elderly Protection Activated");
    };

    const triggerIntercept = (memberId) => {
        setIntercepting(true);
        // Dramatic sequence
        setTimeout(() => {
            setMembers(prev => prev.map(m => m.id === memberId ? { ...m, status: "secure", context: "Guardian Intervened" } : m));
            setActivityLog(prev => [{ id: Date.now(), member: "Admin", event: "REMOTE INTERCEPT TRIGGERED", time: "Now", type: "success" }, ...prev]);

            setTimeout(() => {
                setIntercepting(false);
                showToast("Threat Neutralized");
            }, 2500);
        }, 2000);
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen bg-guardian-dark text-white p-8 pt-24 animate-fade-in relative">

            {/* DRAMATIC INTERCEPT OVERLAY */}
            {intercepting && (
                <div className="fixed inset-0 z-[100] bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
                    <div className="text-red-500 animate-pulse mb-8"><Shield className="w-32 h-32" /></div>
                    <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">GUARDIAN INTERVENTION</h1>
                    <p className="text-xl text-red-400 font-mono tracking-widest mb-12">SEIZING CONTROL OF REMOTE DEVICE</p>

                    <div className="w-96 bg-black/50 h-2 rounded-full overflow-hidden border border-red-500/30">
                        <div className="h-full bg-red-500 animate-[width_2s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
                    </div>
                    <div className="mt-4 font-mono text-xs text-red-300">
                        > TERMINATING AUDIO STREAM... <br />
                        > INJECTING PROTECTIVE PROMPT... <br />
                        > DISCONNECTING ADVERSARY...
                    </div>
                </div>
            )}

            {/* TOAST */}
            {toast && (
                <div className="fixed top-20 right-8 z-50 bg-trust-green/20 border border-trust-green/50 text-trust-green px-6 py-3 rounded-xl backdrop-blur-md animate-fade-in-up flex items-center gap-3 font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-5 h-5" /> {toast}
                </div>
            )}

            <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group border border-transparent hover:border-white/10">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <Heart className="w-8 h-8 text-pink-500" />
                            Family Safety
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-wider">PROTECTING {members.length} MEMBERS</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <CyberButton onClick={() => setShowAddMember(true)} className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 border-pink-500/30">
                        <Plus className="w-4 h-4 mr-2" /> Add Member
                    </CyberButton>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: MEMBERS & LOGS */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-pink-500" /> Protected Members
                    </h2>

                    {members.map(member => (
                        <GlassCard key={member.id} className="flex items-center justify-between p-6 transition-all hover:border-pink-500/30 group relative overflow-hidden">
                            {/* Context Alert Background */}
                            {member.status === 'warning' && (
                                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-12 h-12 rounded-full bg-${member.color}-500/20 flex items-center justify-center text-${member.color}-400 font-bold text-xl border border-${member.color}-500/30`}>
                                    {member.initials}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-pink-400 transition-colors">{member.name}</h3>
                                    <div className="text-xs text-gray-400 flex items-center gap-2">
                                        <StatusBadge status={member.status}>{member.status === 'secure' ? 'SAFE' : 'RISK'}</StatusBadge>
                                        <span className="flex items-center gap-1 text-gray-500"><MapPin className="w-3 h-3" /> {member.location}</span>
                                    </div>
                                    {member.context && <div className="text-xs text-pink-400 mt-1 font-bold animate-pulse">⚠️ {member.context}</div>}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                {member.elderly && (
                                    <div className="text-right hidden sm:block">
                                        <div className="text-xs text-gray-500">CONTROLS</div>
                                        <div className="text-sm font-bold text-pink-400">Elderly Mode {elderlyMode ? 'Active' : 'Paused'}</div>
                                    </div>
                                )}
                                {member.status === 'warning' && (
                                    <button onClick={() => triggerIntercept(member.id)} className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold rounded-lg animate-pulse shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-white/20">
                                        INTERCEPT
                                    </button>
                                )}
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"><SettingsIcon /></button>
                            </div>
                        </GlassCard>
                    ))}

                    {/* ACTIVITY LOG */}
                    <div className="pt-4">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-gray-400" /> Recent Family Activity</h2>
                        <GlassCard className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                                        <th className="pb-3 pl-2">MEMBER</th>
                                        <th className="pb-3">EVENT</th>
                                        <th className="pb-3 text-right pr-2">TIME</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {activityLog.map(log => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-3 pl-2 font-bold">{log.member}</td>
                                            <td className={`py-3 ${log.type === 'warning' ? 'text-yellow-500' : log.type === 'success' ? 'text-green-500' : 'text-gray-300'}`}>
                                                {log.event}
                                            </td>
                                            <td className="py-3 text-right pr-2 text-gray-500">{log.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </GlassCard>
                    </div>
                </div>

                {/* RIGHT COLUMN: MAP & SETTINGS */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-green-500" /> Elderly Mode Config
                    </h2>
                    <GlassCard className={`border-green-500/20 transition-all duration-500 ${elderlyMode ? 'bg-green-900/10' : 'opacity-50 grayscale'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold">Active for Sarah</span>
                            <button
                                onClick={toggleElderlyMode}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${elderlyMode ? 'bg-green-500' : 'bg-gray-700'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300 ${elderlyMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Simplifies the phone interface to large buttons and blocks all unknown numbers automatically.</p>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm p-2 bg-black/20 rounded">
                                <span>Auto-Block Unknown</span>
                                <span className={elderlyMode ? "text-green-400" : "text-gray-500"}>{elderlyMode ? "ON" : "OFF"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-2 bg-black/20 rounded">
                                <span>Guardian Intercept</span>
                                <span className={elderlyMode ? "text-green-400" : "text-gray-500"}>{elderlyMode ? "AGGRESSIVE" : "STANDARD"}</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* LIVE LOCATION MAP */}
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-blue-500" /> Live Safety Map
                        </h2>
                        <GlassCard className="h-64 p-0 overflow-hidden relative">
                            <SwarmMap showGlobe={false} />
                            {/* Overlay Markers */}
                            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                                <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping absolute"></div>
                                <div className="w-3 h-3 bg-pink-500 rounded-full relative border border-white"></div>
                                <span className="text-[10px] font-bold bg-black/50 px-1 rounded text-pink-400">Sarah</span>
                            </div>
                            <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full relative border border-white"></div>
                                <span className="text-[10px] font-bold bg-black/50 px-1 rounded text-blue-400">Jack</span>
                            </div>
                        </GlassCard>
                    </div>
                </div>

            </main>

            {/* ADD MEMBER MODAL */}
            {showAddMember && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                        <button onClick={() => setShowAddMember(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-pink-500" /> Add Family Member</h3>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">FULL NAME</label>
                                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-pink-500 outline-none" placeholder="e.g. Uncle Bob" required />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">PHONE NUMBER</label>
                                <input type="tel" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-pink-500 outline-none" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-pink-500 focus:ring-pink-500" />
                                <span className="text-sm font-bold text-pink-400">Enable Elderly Protection Mode</span>
                            </div>
                            <button type="submit" className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-bold text-white transition-colors mt-4">
                                SEND INVITE
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
    )
}
