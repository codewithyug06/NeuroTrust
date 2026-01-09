import React, { useState } from 'react';
import { Settings, Shield, Lock, FileText, Download, Trash2, ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import CyberButton from './ui/CyberButton';

export default function SettingsDashboard({ onBack }) {
    const [privacyMode, setPrivacyMode] = useState(true);
    const [biometrics, setBiometrics] = useState(true);

    return (
        <div className="min-h-screen bg-guardian-dark text-white p-8 pt-24 animate-fade-in">
            <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group border border-transparent hover:border-white/10">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <Settings className="w-8 h-8 text-gray-400" />
                            System Policy
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-wider">PRIVACY & CONTROL</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-8">

                {/* PRIVACY CONTROLS */}
                <GlassCard>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400"><Lock className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Privacy & Consent</h3>
                            <p className="text-sm text-gray-400">Manage how your data is processed and stored.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                                <div className="font-bold text-white mb-1">Local Processing Only</div>
                                <div className="text-xs text-gray-400 max-w-md">Ensure all biometric and audio analysis happens on-device. No raw data leaves your phone.</div>
                            </div>
                            <button onClick={() => setPrivacyMode(!privacyMode)} className={`transition-colors ${privacyMode ? 'text-green-400' : 'text-gray-600'}`}>
                                {privacyMode ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                                <div className="font-bold text-white mb-1">Biometric Retention</div>
                                <div className="text-xs text-gray-400 max-w-md">Allow storage of voice print for family verification improvement.</div>
                            </div>
                            <button onClick={() => setBiometrics(!biometrics)} className={`transition-colors ${biometrics ? 'text-green-400' : 'text-gray-600'}`}>
                                {biometrics ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* DATA MANAGEMENT */}
                <GlassCard>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400"><FileText className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Data Sovereignty</h3>
                            <p className="text-sm text-gray-400">Export or delete your trust history.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CyberButton className="justify-center py-4 bg-white/5 hover:bg-white/10 border-white/10">
                            <Download className="w-4 h-4 mr-2" /> Export Trust Log (JSON)
                        </CyberButton>
                        <CyberButton className="justify-center py-4 bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete All History
                        </CyberButton>
                    </div>
                </GlassCard>

                <div className="text-center text-xs text-gray-600 font-mono pt-8">
                    NEUROTRUST CORE v2.4.0 • BUILD 2026.01.09
                </div>
            </main>
        </div>
    );
}
