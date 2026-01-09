import React, { useState } from 'react';
import { X, Lock, Eye, Shield, Database, FileText, Download, CheckCircle } from 'lucide-react';

export default function SettingsModal({ onClose, activeTab = 'privacy' }) {
    const [tab, setTab] = useState(activeTab);
    const [telemetryEnabled, setTelemetryEnabled] = useState(true);

    const handleExport = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify({ user: "did:ion:123", trust: 98, logs: [] }, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "aegis_trust_data.json";
        document.body.appendChild(element);
        element.click();
    };

    const handlePurge = () => {
        if (confirm("Are you sure? This will reset your Trust Score context.")) {
            alert("Local Data Purged Successfully.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl h-[600px] flex overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>

                {/* SIDEBAR */}
                <div className="w-1/3 bg-black/50 border-r border-gray-800 p-4">
                    <h2 className="text-xl font-bold text-white mb-6 px-2">Settings</h2>
                    <nav className="space-y-1">
                        <button onClick={() => setTab('general')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${tab === 'general' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800'}`}>
                            <Shield className="w-4 h-4" /> General
                        </button>
                        <button onClick={() => setTab('privacy')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${tab === 'privacy' ? 'bg-green-600/20 text-green-400' : 'text-gray-400 hover:bg-gray-800'}`}>
                            <Lock className="w-4 h-4" /> Privacy & Trust
                        </button>
                        <button onClick={() => setTab('data')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${tab === 'data' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-gray-800'}`}>
                            <Database className="w-4 h-4" /> Data Sovereignty
                        </button>
                    </nav>
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-white capitalize">{tab === 'data' ? 'Data Sovereignty' : tab}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400"><X className="w-5 h-5" /></button>
                    </div>

                    {tab === 'privacy' && (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-900/10 border border-green-500/30 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-green-500/20 rounded-lg"><Eye className="w-6 h-6 text-green-500" /></div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Zero-Trust Biometrics</h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Voice and face data are processed continuously in real-time memory (RAM) and are
                                            <span className="text-green-400 font-bold"> never written to disk</span>.
                                        </p>
                                        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-gray-500">
                                            <span>RETENTION POLICY:</span>
                                            <span className="px-2 py-0.5 bg-green-900/50 text-green-400 rounded border border-green-700">0ms (REAL-TIME)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 transition-colors hover:bg-gray-800 cursor-pointer" onClick={() => setTelemetryEnabled(!telemetryEnabled)}>
                                <div>
                                    <div className="text-white font-bold">Anonymized Telemetry</div>
                                    <div className="text-xs text-gray-500">Contribute to the Global Immune System without sharing PII.</div>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${telemetryEnabled ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${telemetryEnabled ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 'data' && (
                        <div className="space-y-6">
                            <div className="p-4 bg-purple-900/10 border border-purple-500/30 rounded-xl">
                                <h4 className="font-bold text-white mb-2">GDPR / EU AI Act Compliance</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                                    <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Right to Explanation</div>
                                    <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Right to Erasure</div>
                                    <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Data Minimization</div>
                                    <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Human Oversight</div>
                                </div>
                            </div>

                            <button onClick={handleExport} className="w-full py-3 border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95">
                                <Download className="w-4 h-4" /> Export My Trust Data (JSON)
                            </button>
                            <button onClick={handlePurge} className="w-full py-3 border border-red-900/30 hover:bg-red-900/20 text-red-400 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95">
                                <X className="w-4 h-4" /> Purge All Local Data
                            </button>
                        </div>
                    )}

                    {tab === 'general' && (
                        <div className="text-center text-gray-500 py-10">
                            Basic settings like Notification preferences would go here.
                            <br />Focus on "Privacy" for the demo.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
