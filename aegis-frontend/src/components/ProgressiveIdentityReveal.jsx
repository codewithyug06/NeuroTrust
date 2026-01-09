import React, { useState, useEffect } from 'react';
import { Fingerprint, Users, Brain, CheckCircle, Lock, ShieldCheck, ArrowRight, Siren } from 'lucide-react';
import GlassCard from './ui/GlassCard';

export default function ProgressiveIdentityReveal({ onComplete, isSafe }) {
    const [step, setStep] = useState(0); // 0: Start, 1: Human, 2: Relationship, 3: Intent, 4: Complete

    const STEPS = [
        { id: 'HUMAN', label: 'Biometric Liveness', icon: Fingerprint, color: 'text-blue-400', duration: 600 },
        { id: 'RELATION', label: 'Relationship Graph', icon: Users, color: 'text-purple-400', duration: 800 },
        { id: 'INTENT', label: 'Semantic Intent', icon: Brain, color: 'text-orange-400', duration: 600 }
    ];

    useEffect(() => {
        let currentStep = 0;

        const runSequence = async () => {
            // Step 1: Human
            setStep(1);
            await new Promise(r => setTimeout(r, STEPS[0].duration));

            // Step 2: Relation
            setStep(2);
            await new Promise(r => setTimeout(r, STEPS[1].duration));

            // Step 3: Intent
            setStep(3);
            await new Promise(r => setTimeout(r, STEPS[2].duration));

            // Complete
            setStep(4);
            await new Promise(r => setTimeout(r, 500));
            if (onComplete) onComplete();
        };

        runSequence();
    }, []);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <GlassCard className="w-full max-w-sm p-6 border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 relative">
                        <Lock className="w-8 h-8 text-blue-400" />
                        <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wider">Verifying Identity</h3>
                    <p className="text-xs text-blue-300/70 font-mono mt-1">PROGRESSIVE DISCLOSURE PROTOCOL</p>
                </div>

                <div className="space-y-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-800 -z-10"></div>

                    {STEPS.map((s, index) => {
                        const isActive = step === index + 1;
                        const isDone = step > index + 1;
                        const Icon = s.icon;

                        // Scenario B Logic
                        const isThreat = !isSafe;
                        let statusLabel = "SECURE";
                        let statusColor = "text-green-500 bg-green-500/10 border-green-500/20";
                        let checkColor = "text-green-500";
                        let ringColor = "bg-green-500/20 border-green-500";

                        if (isThreat && isDone) {
                            if (s.id === 'HUMAN') {
                                statusLabel = "SYNTHETIC";
                                statusColor = "text-red-500 bg-red-500/10 border-red-500/20";
                                checkColor = "text-red-500";
                                ringColor = "bg-red-500/20 border-red-500";
                            } else if (s.id === 'RELATION') {
                                statusLabel = "UNKNOWN";
                                statusColor = "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
                                checkColor = "text-yellow-500";
                                ringColor = "bg-yellow-500/20 border-yellow-500";
                            } else if (s.id === 'INTENT') {
                                statusLabel = "MALICIOUS";
                                statusColor = "text-red-500 bg-red-500/10 border-red-500/20";
                                checkColor = "text-red-500";
                                ringColor = "bg-red-500/20 border-red-500";
                            }
                        }

                        return (
                            <div key={s.id} className={`flex items-center gap-4 transition-all duration-500 ${isActive || isDone ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300 
                                    ${isActive ? 'bg-black border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' :
                                        isDone ? ringColor : 'bg-gray-900 border-gray-700'}`}>
                                    {isDone ?
                                        (isThreat && (s.id === 'HUMAN' || s.id === 'INTENT') ? <Siren className="w-6 h-6 text-red-500" /> : <CheckCircle className={`w-6 h-6 ${checkColor}`} />)
                                        : <Icon className={`w-5 h-5 ${isActive ? 'text-white animate-pulse' : 'text-gray-500'}`} />}
                                </div>
                                <div className="flex-1">
                                    <div className={`text-sm font-bold uppercase transition-colors ${isActive ? 'text-white' : isDone ? (isThreat ? 'text-red-400' : 'text-green-400') : 'text-gray-600'}`}>
                                        {s.label}
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-500">
                                        {isActive ? 'ANALYZING...' : isDone ? 'COMPLETED' : 'PENDING'}
                                    </div>
                                </div>
                                {isDone && (
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColor}`}>
                                        {statusLabel}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
}
