import React, { useState } from 'react';
import { Shield, Smartphone, Eye, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Welcome to NeuroTrust",
            subtitle: "The Universal Trust Protocol",
            description: "In an age of AI deepfakes and voice clones, seeing is no longer believing. NeuroTrust invalidates deception by verifying the cryptographic signature of reality.",
            icon: <Shield className="w-16 h-16 text-guardian-blue" />,
            color: "border-guardian-blue/50"
        },
        {
            title: "Meet Your Guardian",
            subtitle: "Always watching. Never sleeping.",
            description: "Your personalized AI agent lives on your device. It listens for semantic anomalies, analyzes video artifacts, and verifies identity signatures in real-time.",
            icon: <Eye className="w-16 h-16 text-trust-green" />,
            color: "border-trust-green/50"
        },
        {
            title: "Know Your Status",
            subtitle: "Universal Color Code",
            description: (
                <div className="space-y-4 mt-4 w-full text-left">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-trust-green/10 border border-trust-green/30">
                        <div className="w-4 h-4 rounded-full bg-trust-green shadow-[0_0_10px_#10B981]"></div>
                        <div>
                            <div className="text-trust-green font-bold text-sm">VERIFIED SAFE</div>
                            <div className="text-xs text-white/50">Cryptographically signed & bio-verified.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-trust-yellow/10 border border-trust-yellow/30">
                        <div className="w-4 h-4 rounded-full bg-trust-yellow shadow-[0_0_10px_#F59E0B]"></div>
                        <div>
                            <div className="text-trust-yellow font-bold text-sm">UNCERTAIN / AI AGENT</div>
                            <div className="text-xs text-white/50">Use caution. Intent is unclear.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-trust-red/10 border border-trust-red/30">
                        <div className="w-4 h-4 rounded-full bg-trust-red shadow-[0_0_10px_#EF4444] animate-pulse"></div>
                        <div>
                            <div className="text-trust-red font-bold text-sm">HIGH RISK / BLOCKED</div>
                            <div className="text-xs text-white/50">Deepfake detected. Interaction intercepted.</div>
                        </div>
                    </div>
                </div>
            ),
            icon: <CheckCircle className="w-16 h-16 text-trust-yellow" />,
            color: "border-trust-yellow/50"
        },
        {
            title: "You Are Protected",
            subtitle: "Ready to verify reality?",
            description: "We are about to launch a live simulation. You will see how AEGIS detects and blocks a voice cloning attack in real-time.",
            icon: <Smartphone className="w-16 h-16 text-white" />,
            color: "border-white/50"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-guardian-dark flex items-center justify-center p-6">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-guardian-blue/10 via-guardian-dark to-guardian-dark pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10">

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8 justify-center">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700'}`}></div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-guardian-slate border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-fade-in-up">

                    <div className="min-h-[320px] flex flex-col items-center text-center">
                        <div className={`mb-8 p-6 rounded-full bg-white/5 border ${steps[step].color} shadow-lg transition-all duration-500`}>
                            {steps[step].icon}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">{steps[step].title}</h2>
                        <h3 className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-6">{steps[step].subtitle}</h3>

                        <div className="text-gray-400 leading-relaxed text-sm">
                            {steps[step].description}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
                    >
                        {step === steps.length - 1 ? 'Enter Demo Mode' : 'Continue'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Onboarding;
