import React, { useEffect, useState } from 'react';
import { PhoneMissed, PhoneIncoming, Shield, ScanLine, Activity, CheckCircle, Brain, Siren, Lock, Ban, ShieldAlert } from 'lucide-react';
import TrustAnalysisPanel from './TrustAnalysisPanel';

export default function CallScreen({
    status,
    isSafeMode,
    elderlyMode,
    onAnswer,
    onReject,
    onVerify,
    guardianData = {},
    verificationData = null // Result from Handshake
}) {
    const [waveformHeight, setWaveformHeight] = useState([20, 40, 60, 30, 50]);

    // Simulate Audio Waveform
    useEffect(() => {
        if (status === 'CONNECTED' || status === 'ACTIVE') {
            const interval = setInterval(() => {
                const newHeights = Array(5).fill(0).map(() => Math.floor(Math.random() * 80) + 10);
                setWaveformHeight(newHeights);
            }, 150);
            return () => clearInterval(interval);
        }
    }, [status]);

    if (status === "RINGING") {
        return (
            <div className={`absolute inset-0 z-30 flex flex-col items-center pt-32 bg-black/40 backdrop-blur-sm ${elderlyMode ? 'bg-white/90 pt-12' : ''}`}>
                <div className={`rounded-full overflow-hidden border-4 shadow-xl mb-4 animate-pulse relative ring-4 
                    ${isSafeMode ? 'border-gray-700 ring-blue-500/20' : 'border-red-500 ring-red-500/20'} 
                    ${elderlyMode ? 'w-56 h-56 border-8 ring-0 shadow-2xl' : 'w-32 h-32'}`}>
                    <img src={isSafeMode
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200"
                        : "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200"}
                        className="w-full h-full object-cover" />
                </div>

                <p className={`text-blue-400 font-mono tracking-widest animate-pulse mb-8 ${elderlyMode ? 'text-black text-3xl font-black uppercase tracking-normal' : 'text-xs'}`}>
                    {elderlyMode ? (isSafeMode ? "SAFE CALL: BANK" : "UNKNOWN CALLER") : "INCOMING SECURE CALL..."}
                </p>

                <div className="absolute bottom-24 w-full flex justify-around px-8">
                    <button onClick={onReject} className={`rounded-full bg-red-600 shadow-xl hover:scale-110 transition-transform flex flex-col items-center justify-center gap-2 ${elderlyMode ? 'p-10 w-44 h-44 border-4 border-white shadow-2xl' : 'p-4'}`}>
                        <PhoneMissed className={`${elderlyMode ? 'w-20 h-20' : 'w-8 h-8'} text-white`} />
                        {elderlyMode && <span className="text-white font-black text-2xl">DECLINE</span>}
                    </button>
                    <button onClick={onAnswer} className={`rounded-full bg-green-600 shadow-xl animate-bounce hover:scale-110 transition-transform flex flex-col items-center justify-center gap-2 ${elderlyMode ? 'p-10 w-44 h-44 border-4 border-white shadow-2xl' : 'p-4'}`}>
                        <PhoneIncoming className={`${elderlyMode ? 'w-20 h-20' : 'w-8 h-8'} text-white`} />
                        {elderlyMode && <span className="text-white font-black text-2xl">ANSWER</span>}
                    </button>
                </div>
            </div>
        );
    }

    if (status === "CONNECTED") {
        return (
            <div className={`absolute inset-0 z-30 flex flex-col justify-end pb-24 px-6 ${elderlyMode ? 'bg-white/90 justify-center pb-0' : 'bg-gradient-to-t from-black/90 via-transparent to-transparent'}`}>
                {/* Live Audio Visualizer - HIDDEN IN ELDERLY MODE */}
                {!elderlyMode && (
                    <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-1 h-24 items-center opacity-50">
                        {waveformHeight.map((h, i) => (
                            <div key={i} className="w-2 bg-blue-500 rounded-full transition-all duration-150" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                )}

                {!elderlyMode ? (
                    <>
                        <div className="text-center text-xs text-gray-400 mb-4 font-mono">IDENTITY UNVERIFIED</div>
                        <button onClick={onVerify} className="w-full py-4 bg-blue-600 border border-blue-400/50 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
                            <Shield className="w-5 h-5 fill-white/20" /> <span>VERIFY IDENTITY</span>
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-8">
                        <p className="text-black text-2xl font-bold text-center">Is this person safe?</p>
                        <button onClick={onVerify} className="w-64 h-64 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-3xl shadow-2xl flex flex-col items-center justify-center gap-4 animate-pulse">
                            <Shield className="w-24 h-24" />
                            <span>CHECK<br />SAFETY</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }

    if (status === "ANALYZING") {
        return (
            <div className={`absolute inset-0 z-30 flex flex-col justify-center items-center backdrop-blur-md p-6 ${elderlyMode ? 'bg-white/95' : 'bg-black/80'}`}>
                <ScanLine className={`animate-spin mb-6 ${elderlyMode ? 'w-32 h-32 text-blue-600' : 'w-24 h-24 text-blue-500'}`} />
                <div className={`${elderlyMode ? 'text-blue-800 text-2xl font-bold uppercase' : 'text-blue-400 font-mono text-xs tracking-widest animate-pulse'}`}>
                    {elderlyMode ? "CHECKING CALL..." : "RUNNING NEURO-TRUST ENGINE..."}
                </div>
            </div>
        );
    }

    // --- ACTIVE / TRUSTED STATE ---
    if ((status === "ACTIVE" || status === "GUARDIAN_INTERVENTION" || status === "BLOCKED") && verificationData) {
        const isIntervention = status === 'GUARDIAN_INTERVENTION' || guardianData.action === 'INTERCEPT';
        const isSafe = verificationData.trust_score.score > 80;

        // PARANOID CHECK: Ensure data integrity for Normal Mode
        const canRenderPanel = !elderlyMode && verificationData.layer_details && verificationData.pipeline_trace;

        return (
            <div className="absolute inset-0 z-20 pointer-events-none">
                {/* ELDERLY MODE: SIMPLE VIEW */}
                {elderlyMode ? (
                    <div className="absolute top-24 left-0 right-0 flex flex-col items-center p-6">
                        <div className={`w-full p-8 rounded-3xl text-center shadow-2xl ${isSafe ? 'bg-green-500' : 'bg-red-500'} pointer-events-auto`}>
                            {isSafe ? <CheckCircle className="w-24 h-24 text-white mx-auto mb-4" /> : <Ban className="w-24 h-24 text-white mx-auto mb-4" />}
                            <h2 className="text-4xl font-black text-white mb-2">{isSafe ? "SAFE" : "DANGEROUS"}</h2>
                            <p className="text-white/90 text-xl font-bold mb-6">{isSafe ? "This call is verified." : "Do not share money or info."}</p>

                            {!isSafe && (
                                <button onClick={onReject} className="w-full py-6 bg-white text-red-600 font-black text-2xl rounded-2xl shadow-lg hover:scale-105 transition-transform">
                                    HANG UP NOW
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* NORMAL MODE: DETAILED VIEW */
                    canRenderPanel && <TrustAnalysisPanel data={verificationData} />
                )}

                {/* --- GUARDIAN INTERVENTION (SCENARIO B) --- */}
                {isIntervention && (
                    <div className="absolute inset-0 bg-red-600 z-50 flex flex-col items-center justify-center p-6 text-center pointer-events-auto animate-fade-in">
                        <div className="w-full h-full absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 border-[20px] border-red-900/50 animate-pulse-glow pointer-events-none"></div>

                        {elderlyMode ? (
                            // ELDERLY MODE: SIMPLE REASSURANCE
                            <div className="z-10 flex flex-col items-center">
                                <Shield className="w-32 h-32 text-white mb-6 animate-pulse" />
                                <h2 className="text-4xl font-black text-white mb-4">NEUROTRUST IS SPEAKING</h2>
                                <p className="text-white text-xl font-bold max-w-xs mb-8">
                                    Our automated agent is interrogating the caller. You are safe.
                                </p>
                                <button onClick={onReject} className="w-full py-6 bg-white text-red-600 font-black text-2xl rounded-2xl shadow-2xl">
                                    HANG UP
                                </button>
                            </div>
                        ) : (
                            // STANDARD MODE: TRANSCRIPT
                            <div className="z-10 w-full flex flex-col items-center">
                                <Siren className="w-16 h-16 text-white mb-4 animate-pulse" />
                                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Guardian Intercept</h2>
                                <p className="text-white/80 font-mono text-xs mb-6">AUTOMATED INTERROGATION IN PROGRESS</p>

                                {/* TERMINAL UI */}
                                <div className="w-full bg-black/50 rounded-xl border border-white/20 p-4 h-48 overflow-y-auto mb-6 text-left font-mono text-xs flex flex-col-reverse shadow-inner">
                                    <div className="flex flex-col gap-2">
                                        {Array.isArray(guardianData.transcript) && guardianData.transcript.map((line, i) => (
                                            <div key={i} className={`flex gap-2 ${line.sender === 'AEGIS' || line.sender === 'NeuroTrust' ? 'text-blue-300' : 'text-red-300'}`}>
                                                <span className="font-bold opacity-50">[{line.sender}]:</span>
                                                <span className="text-white">{line.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 w-full">
                                    <button onClick={onReject} className="flex-1 py-4 bg-white text-red-600 font-black rounded-xl shadow-lg hover:bg-gray-100">
                                        END CALL
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return null;
}
