import React, { useState, useEffect } from 'react';
import {
    AlertTriangle, CheckCircle, Brain, Siren, Lock, Share2,
    Bot, Activity, MessageSquare, Eye, Hexagon, ShieldAlert
} from 'lucide-react';

export default function GuardianOverlay({
    isSafeMode,
    callStatus,
    elderlyMode,
    trustScore,
    moodScore,
    verdictReason,
    intentFlag,
    captions,
    graphContext,
    statusBar,

    biometrics, // New prop for HUD
    callerImage // New Prop
}) { // Add callerImage to destructuring
    // --- GUARDIAN CHAT SIMULATION ---
    const [chatLog, setChatLog] = useState([]);
    const [showTraceDetails, setShowTraceDetails] = useState(false); // New State

    useEffect(() => {
        if (callStatus === "GUARDIAN_INTERVENTION") {
            // Dynamic Backend-Driven Chat
            const runChatSimulation = async () => {
                const phrases = [
                    "Halt. Identify yourself immediately.",
                    "False. Biometric signature mismatch.",
                    "Fraud pattern confirmed. Disconnecting."
                ];

                // Add initial AI message
                setChatLog([{ sender: "AI", text: phrases[0] }]);

                // Simulate Scammer Response (Client-side trigger)
                setTimeout(() => {
                    setChatLog(prev => [...prev, { sender: "Caller", text: "I'm calling from the bank..." }]);

                    // Call Backend for Next AI Response
                    setTimeout(async () => {
                        try {
                            const res = await fetch(`http://127.0.0.1:8000/api/v1/guardian/chat`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: "verify money card" }) // Trigger 'INTERROGATE' logic
                            });
                            if (res.ok) {
                                const data = await res.json();
                                setChatLog(prev => [...prev, { sender: "AI", text: data.response }]);
                            }
                        } catch (e) {
                            setChatLog(prev => [...prev, { sender: "AI", text: "Connection terminating." }]);
                        }
                    }, 1000);

                }, 1500);

                // Detailed Fraud Response (Second turn)
                setTimeout(() => {
                    setChatLog(prev => [...prev, { sender: "Caller", text: "Just give me the code!" }]);

                    setTimeout(async () => {
                        try {
                            const res = await fetch(`http://127.0.0.1:8000/api/v1/guardian/chat`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: "urgent police" }) // Trigger 'WARN' logic
                            });
                            if (res.ok) {
                                const data = await res.json();
                                setChatLog(prev => [...prev, { sender: "AI", text: data.response }]);
                            }
                        } catch (e) { }
                    }, 1000);
                }, 4500);
            };

            runChatSimulation();
        }
    }, [callStatus]);

    // --- TELEMETRY REPORTING ---
    useEffect(() => {
        if (callStatus === "GUARDIAN_INTERVENTION" || (callStatus === "BLOCKED")) {
            fetch(`http://127.0.0.1:8000/api/v1/telemetry/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    threat_type: isSafeMode ? "FALSE_POSITIVE" : "DEEPFAKE_VOICE",
                    severity: "CRITICAL"
                })
            }).catch(console.error);
        }
    }, [callStatus, isSafeMode]);


    // --- ELDERLY MODE UI (Social Impact) ---
    if (elderlyMode) {
        if (callStatus === "ACTIVE" || callStatus === "GUARDIAN_INTERVENTION") {
            const isSafe = isSafeMode && callStatus === "ACTIVE"; // Strict check

            return (
                <div className="absolute inset-x-0 bottom-0 top-0 z-50 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
                    {isSafe ? (
                        <>
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-8">
                                {/* Consistent Caller Image */}
                                <img src={callerImage} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-3xl font-black text-green-400 mb-2 tracking-wide uppercase">Family Verified</h2>
                            <p className="text-gray-300 text-lg font-medium mb-8 text-center">It is safe to answer this call.</p>

                            <div className="bg-green-500/20 px-8 py-4 rounded-2xl border border-green-500/50 text-xl font-bold text-green-300 flex items-center gap-3 shadow-lg">
                                <Lock className="w-6 h-6" />
                                <span>SAFE WORD: <span className="text-white">"GARDEN"</span></span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)] mb-8 relative">
                                <img src={callerImage} className="w-full h-full object-cover opacity-50 grayscale" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                    <Hexagon className="w-20 h-20 text-red-500 fill-red-500/20 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-red-500 mb-2 text-center tracking-wide uppercase">Do Not Answer</h2>
                            <p className="text-gray-300 text-lg font-medium text-center max-w-xs mb-8">
                                <span className="block text-xs text-red-400 uppercase tracking-[0.2em] mb-2">Potential Fraud Detected</span>
                                Caller identity could not be verified.
                            </p>

                            <button className="w-full py-5 bg-red-600 hover:bg-red-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 border border-red-400/50">
                                <ShieldAlert className="w-7 h-7" />
                                HANG UP NOW
                            </button>
                        </>
                    )}
                </div>
            )
        }
        return null;
    }

    // --- STANDARD MODE UI ---

    // 1. ANALYSIS RESULTS & HUD
    const showResults = (callStatus === "ACTIVE" || callStatus === "BLOCKED" || callStatus === "GUARDIAN_INTERVENTION");
    const showGuardian = (callStatus === "GUARDIAN_INTERVENTION");

    return (
        <>
            {/* ANALYSIS RESULT CARD (Z-30) */}
            {showResults && (
                <div className={`absolute bottom-4 left-2 right-2 flex flex-col gap-2 transition-all duration-500 ${showGuardian ? 'z-20 opacity-20 scale-95 blur-sm' : 'z-40'}`}>

                    {/* FORENSIC HUD (Technical Depth) */}
                    <div className="grid grid-cols-3 gap-1 mb-1">
                        <div className="bg-black/80 backdrop-blur p-2 rounded border border-gray-800 flex flex-col items-center">
                            <span className="text-[8px] text-gray-400 uppercase">BLINK RATE</span>
                            <span className={`text-xs font-bold ${biometrics?.blink_rate < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                {biometrics?.blink_rate || "--"}/min
                            </span>
                        </div>
                        <div className="bg-black/80 backdrop-blur p-2 rounded border border-gray-800 flex flex-col items-center">
                            <span className="text-[8px] text-gray-400 uppercase">HEAD YAW</span>
                            <span className="text-xs font-bold text-blue-400">{biometrics?.head_yaw || "0"}°</span>
                        </div>
                        <div className="bg-black/80 backdrop-blur p-2 rounded border border-gray-800 flex flex-col items-center">
                            <span className="text-[8px] text-gray-400 uppercase">JITTER</span>
                            <span className={`text-xs font-bold ${moodScore < 40 ? 'text-red-500' : 'text-green-500'}`}>
                                0.{(100 - moodScore).toString().slice(0, 2)}%
                            </span>
                        </div>
                    </div>

                    {/* Metric Card */}
                    <div className="bg-black/95 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className={`text-xl font-black ${isSafeMode ? 'text-green-500' : 'text-red-500'}`}>
                                    {isSafeMode ? "VERIFIED" : "DEEPFAKE"}
                                </div>
                                <div className="text-[9px] text-gray-500 uppercase">{verdictReason}</div>
                            </div>
                            <div className="text-3xl font-bold text-white">{trustScore}%</div>
                        </div>

                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-[9px] text-gray-400"><span>MOOD MATCH (VOICE vs FACE)</span><span>{moodScore}%</span></div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full ${moodScore > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${moodScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* GUARDIAN INTERVENTION OVERLAY (Z-40) */}
            {showGuardian && (
                <div className="absolute top-24 left-4 right-4 z-50 bg-red-950/95 backdrop-blur-xl p-6 rounded-2xl border border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.5)] animate-bounce-in">
                    <div className="flex flex-col items-center w-full">
                        <Bot className="w-12 h-12 text-white mb-2 animate-bounce" />
                        <h2 className="text-lg font-black text-white text-center mb-4">GUARDIAN INTERCEPTING</h2>

                        {/* INTERACTIVE LOG */}
                        <div className="w-full h-32 overflow-y-auto custom-scrollbar bg-black/50 p-3 rounded-lg border border-red-900/50 mb-3 flex flex-col gap-2">
                            {chatLog.map((msg, i) => (
                                <div key={i} className={`text-xs ${msg.sender === 'AI' ? 'text-red-200 self-start' : 'text-white self-end text-right'}`}>
                                    <span className="font-bold opacity-50 block text-[8px] uppercase">{msg.sender}</span>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {showTraceDetails ? (
                            <div className="w-full mt-2 bg-black/80 rounded border border-red-500/30 p-2 text-[9px] font-mono text-gray-300 animate-fade-in space-y-1">
                                <div className="flex justify-between"><span>CASE ID:</span><span className="text-white">#TR-{Math.floor(Math.random() * 99999)}</span></div>
                                <div className="flex justify-between"><span>ORIGIN IP:</span><span className="text-red-400">192.168.44.12</span></div>
                                <div className="flex justify-between"><span>GEO:</span><span className="text-red-400">LAGOS, NG (VPN DETECTED)</span></div>
                                <div className="text-center text-green-500 font-bold mt-1">AUTHORITIES NOTIFIED</div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowTraceDetails(true)}
                                className="bg-red-800/80 hover:bg-red-700 px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors mt-2"
                            >
                                <Share2 className="w-3 h-3 text-white" />
                                <span className="text-[10px] text-white font-bold">View Trace Details</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
