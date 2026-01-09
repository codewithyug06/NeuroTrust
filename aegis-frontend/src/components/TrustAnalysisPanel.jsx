import React, { useState } from 'react';
import { Shield, Activity, Lock, Users, AlertTriangle, CheckCircle, Mic, Video, Brain, Fingerprint, Terminal, List } from 'lucide-react';
import GlassCard from './ui/GlassCard';

export default function TrustAnalysisPanel({ data }) {
    if (!data) return null;

    const { trust_score, details, pipeline_trace, layer_details } = data;
    const score = trust_score?.score || 0;
    const level = trust_score?.level || 'UNKNOWN';
    const isBlocked = level === 'BLOCKED';

    const [activeTab, setActiveTab] = useState('SCORES'); // SCORES | TRACE
    const [isReplaying, setIsReplaying] = useState(false); // Level 6: Replay State

    // Level 6: Replay Logic
    const handleReplay = () => {
        setIsReplaying(true);
        setTimeout(() => setIsReplaying(false), 5000); // 5s Mock Replay
    };

    // Granular Backend Data
    const audioRisk = layer_details?.authenticity?.details?.audio?.neural_artifacts || 0;
    const videoSync = layer_details?.authenticity?.details?.video?.lip_sync_correlation || 1;
    const intent = layer_details?.fusion_intent?.details?.intent_classification?.intent || 'neutral';
    const identityScore = layer_details?.identity?.score || 0;

    return (
        <div className="absolute top-24 right-8 w-80 pointer-events-auto animate-slide-in-right z-50">
            {/* TABS */}
            <div className="flex mb-2 bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10">
                <button
                    onClick={() => setActiveTab('SCORES')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${activeTab === 'SCORES' ? 'bg-white/20 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <List className="w-3 h-3" /> Intelligence
                </button>
                <button
                    onClick={() => setActiveTab('TRACE')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${activeTab === 'TRACE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <Terminal className="w-3 h-3" /> System Trace
                </button>
            </div>

            {/* MAIN TRUST CARD */}
            <GlassCard
                hoverEffect={false}
                className={`p-4 rounded-2xl border-l-4 mb-4 backdrop-blur-xl transition-colors duration-500
                ${level === 'TRUSTED' ? 'border-l-green-500 bg-black/80' :
                        level === 'BLOCKED' ? 'border-l-red-500 bg-red-950/90' : 'border-l-yellow-500 bg-black/80'}`}>

                {/* HEADER */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <Shield className={`w-10 h-10 ${level === 'TRUSTED' ? 'text-green-500' :
                            level === 'BLOCKED' ? 'text-red-500 animate-pulse' : 'text-yellow-500'
                            }`} />
                        <div>
                            <div className="text-[9px] opacity-60 font-mono tracking-widest uppercase">AEGIS TRUST ENGINE</div>
                            <div className="text-4xl font-black text-white tracking-tighter flex items-baseline gap-1">
                                {score} <span className="text-sm opacity-50 font-normal">/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'SCORES' ? (
                    <div className="space-y-4">
                        {/* ADVANCED: AI CONFIDENCE & DRIFT */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">AI Confidence</div>
                                <div className="text-lg font-black text-white">{details?.ai_confidence ? Math.round(details.ai_confidence * 100) : 98}%</div>
                            </div>
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Intent Drift</div>
                                <div className={`text-md font-bold flex items-center gap-1 ${details?.intent_drift?.status === 'DRIFTING' ? 'text-yellow-400' : 'text-green-400'}`}>
                                    {details?.intent_drift?.status === 'DRIFTING' ? <Activity className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                    {details?.intent_drift?.status || 'STABLE'}
                                </div>
                            </div>
                        </div>

                        {/* ADVANCED: PSYCHOLOGICAL TRIGGERS */}
                        {details?.psychological_triggers && details.psychological_triggers.length > 0 && (
                            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg animate-pulse">
                                <div className="flex items-center gap-2 mb-1">
                                    <Brain className="w-3 h-3 text-red-400" />
                                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Psychological Trigger Detected</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {details.psychological_triggers.map((trig, i) => (
                                        <span key={i} className="px-1.5 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded border border-red-500/20">
                                            {trig.type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* LAYER 1: IDENTITY */}
                        <div>
                            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gray-400 mb-1">
                                <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3 text-blue-400" /> Identity Layer</span>
                                <span className={identityScore > 80 ? "text-green-400" : "text-red-400"}>{identityScore}% MATCH</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${identityScore > 80 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${identityScore}%` }}></div>
                            </div>
                        </div>

                        {/* LAYER 2: AUTHENTICITY (Deepfake) */}
                        <div>
                            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gray-400 mb-1">
                                <span className="flex items-center gap-1"><Video className="w-3 h-3 text-purple-400" /> Authenticity Layer</span>
                                <span className={audioRisk < 0.2 ? "text-green-400" : "text-red-400"}>
                                    {audioRisk > 0.5 ? 'SYNTHETIC' : 'NATURAL'}
                                </span>
                            </div>
                            {/* Mock Waveform */}
                            <div className="h-6 flex items-end gap-0.5 opacity-60 mask-linear-fade">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className={`w-full rounded-t-sm transition-all duration-300 ${audioRisk > 0.5 ? 'bg-red-500' : 'bg-purple-500'}`}
                                        style={{
                                            height: `${Math.random() * 100}%`,
                                            opacity: Math.random() > 0.5 ? 1 : 0.5
                                        }}></div>
                                ))}
                            </div>
                        </div>

                        {/* LAYER 3: INTENT */}
                        <div>
                            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gray-400 mb-1">
                                <span className="flex items-center gap-1"><Brain className="w-3 h-3 text-orange-400" /> Semantic Intent</span>
                                <span className={intent === 'neutral' ? "text-green-400" : "text-red-400"}>
                                    {intent.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-[10px] font-mono text-gray-300 truncate">
                                    "{intent === 'financial_request' ? 'Transfer funds immediately...' : 'Confirming appointment details...'}"
                                </p>
                            </div>
                        </div>
                        {/* LEVEL 3: TRUST ESCROW */}
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isBlocked ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Trust Escrow Status</span>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${isBlocked ? 'text-red-400 border-red-500/30 bg-red-500/10' : 'text-green-400 border-green-500/30 bg-green-500/10'}`}>
                                    {isBlocked ? 'LOCKED' : 'RELEASED'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500">Authorized Limit</div>
                                <div className="text-lg font-mono font-bold text-white tracking-tight flex items-center gap-1">
                                    <span className="opacity-50 text-xs">$</span>
                                    {isBlocked ? '0.00' : '5,000.00'}
                                </div>
                            </div>
                            {/* Visual Stripe */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 ${isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        </div>
                    </div>
                ) : (
                    // TRACE VIEW
                    <div className="h-64 overflow-y-auto bg-black/50 rounded-lg p-2 font-mono text-[9px] text-green-400/80 border border-green-500/20 shadow-inner custom-scrollbar">
                        <div className="mb-2 text-green-500 font-bold border-b border-green-500/30 pb-1">PIPELINE TRACE (14 LAYERS)</div>
                        <div className="flex flex-col gap-1">
                            {pipelineTrace ? pipelineTrace.map((log, i) => (
                                <div key={i} className="whitespace-nowrap animate-fade-in-left" style={{ animationDelay: `${i * 50}ms` }}>
                                    <span className="opacity-50 mr-2">{i + 1}.</span>
                                    {log}
                                </div>
                            )) : (
                                <span className="italic opacity-50">Waiting for analysis stream...</span>
                            )}
                        </div>
                    </div>
                )}
            </GlassCard>

            {/* GUARDIAN MESSAGE */}
            {isBlocked && (
                <div className="space-y-2">
                    <GlassCard hoverEffect={false} className="bg-red-600/20 border-red-500/50 p-3 rounded-xl animate-bounce-in shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                            <div>
                                <div className="text-xs font-bold text-white uppercase mb-1">Guardian Intervention</div>
                                <p className="text-[10px] text-red-200 leading-tight">
                                    {data?.guardian_message || details?.reason || "Threat signature detected."}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* LEVEL 6: TIME-SLOWED THREAT REPLAY */}
                    <button onClick={handleReplay} className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-all group">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                        REPLAY THREAT (0.25x SPEED)
                    </button>
                </div>
            )}

            {/* LEVEL 6: REPLAY OVERLAY */}
            {isReplaying && (
                <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 border-2 border-red-500 animate-fade-in">
                    <div className="text-red-500 font-mono text-xs tracking-[0.2em] mb-4 animate-pulse">SLOW-MOTION ANALYSIS</div>
                    <div className="w-full h-32 flex items-center justify-center relative mb-4">
                        {/* Mock Spectrogram */}
                        <div className="flex items-end gap-1 h-20 w-full opacity-50">
                            {[...Array(40)].map((_, i) => (
                                <div key={i}
                                    className="w-1 bg-red-500 rounded-full transition-all duration-[2000ms] ease-in-out"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        opacity: Math.random(),
                                        animation: `pulse 3s infinite ${i * 0.1}s`
                                    }}>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-1 rounded">0.25x</div>
                    </div>
                    <div className="text-white font-bold text-lg text-center leading-tight mb-2">
                        "I need those gift cards <span className="text-red-500 bg-red-500/10 px-1">NOW</span>..."
                    </div>
                    <div className="text-xs text-red-400 font-mono bg-red-900/20 px-2 py-1 rounded border border-red-500/30">
                        DETECTED: ARTIFICIAL MICRO-TREMORS
                    </div>
                </div>
            )}
        </div>
    );
}
