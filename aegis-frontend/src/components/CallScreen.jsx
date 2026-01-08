import React, { useEffect, useState } from 'react';
import { PhoneMissed, PhoneIncoming, Shield, ScanLine, Activity, CheckCircle, Brain, Siren, Lock } from 'lucide-react';

export default function CallScreen({
    status,
    isSafeMode,
    elderlyMode,
    onAnswer,
    onReject,
    onVerify,
    guardianData = {}
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

    // --- RENDER STATES ---

    if (status === "RINGING") {
        return (
            <div className="absolute inset-0 z-30 flex flex-col items-center pt-32 bg-black/40 backdrop-blur-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl mb-4 animate-pulse ring-4 ring-blue-500/20 relative">
                    <img src={isSafeMode
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200"
                        : "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200"}
                        className="w-full h-full object-cover" />
                </div>
                <p className="text-blue-400 text-xs font-mono tracking-widest animate-pulse mb-8">INCOMING SECURE CALL...</p>

                <div className="absolute bottom-24 w-full flex justify-around px-8">
                    <button onClick={onReject} className="p-4 rounded-full bg-red-600 shadow-xl hover:scale-110 transition-transform"><PhoneMissed className="w-8 h-8 text-white" /></button>
                    <button onClick={onAnswer} className="p-4 rounded-full bg-green-600 shadow-xl animate-bounce hover:scale-110 transition-transform"><PhoneIncoming className="w-8 h-8 text-white" /></button>
                </div>
            </div>
        );
    }

    if (status === "CONNECTED") {
        return (
            <div className="absolute inset-0 z-30 flex flex-col justify-end pb-24 px-6 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                {/* Live Audio Visualizer */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-1 h-24 items-center opacity-50">
                    {waveformHeight.map((h, i) => (
                        <div key={i} className="w-2 bg-blue-500 rounded-full transition-all duration-150" style={{ height: `${h}%` }}></div>
                    ))}
                </div>

                <div className="text-center text-xs text-gray-400 mb-4 font-mono">IDENTITY UNVERIFIED</div>
                <button onClick={onVerify} className="w-full py-4 bg-blue-600 border border-blue-400/50 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    <Shield className="w-5 h-5 fill-white/20" /> <span>VERIFY IDENTITY</span>
                </button>
            </div>
        );
    }

    if (status === "ANALYZING") {
        return (
            <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black/80 backdrop-blur-md p-6">
                <ScanLine className="w-24 h-24 text-blue-500 animate-spin mb-6" />
                <div className="text-blue-400 font-mono text-xs tracking-widest animate-pulse">RUNNING NEURO-TRUST ENGINE...</div>

                {/* Progress Steps */}
                <div className="w-full max-w-[200px] mt-8 space-y-2">
                    <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-blue-500 animate-[width_1.5s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return null; // Active/Guardian handled by overlay or parent
}
