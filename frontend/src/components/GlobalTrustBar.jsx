import React, { useState } from 'react';
import { Shield, ChevronDown, HelpCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const GlobalTrustBar = ({ status = 'safe' }) => {
    const [expanded, setExpanded] = useState(false);

    // Status configurations
    const statusConfig = {
        safe: {
            color: 'bg-trust-green',
            icon: <CheckCircle className="w-4 h-4" />,
            text: 'Verified Safe',
            borderColor: 'border-trust-green/30'
        },
        warning: {
            color: 'bg-trust-yellow',
            icon: <HelpCircle className="w-4 h-4" />,
            text: 'Uncertain State',
            borderColor: 'border-trust-yellow/30'
        },
        risk: {
            color: 'bg-trust-red',
            icon: <AlertTriangle className="w-4 h-4" />,
            text: 'High Risk Detected',
            borderColor: 'border-trust-red/30'
        }
    };

    const currentStatus = statusConfig[status] || statusConfig.safe;

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${expanded ? 'h-auto' : 'h-12'}`}>
            {/* Main Bar */}
            <div
                className={`w-full h-12 ${currentStatus.color} bg-opacity-10 backdrop-blur-md border-b ${currentStatus.borderColor} flex items-center justify-between px-4 sm:px-6 cursor-pointer hover:bg-opacity-20 transition-all`}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    <div className={`${currentStatus.color} text-white p-1 rounded-full bg-opacity-80`}>
                        {currentStatus.icon}
                    </div>
                    <span className="font-sans font-medium text-white tracking-wide text-sm sm:text-base">
                        NeuroTrust PROTECTION: <span className="font-bold opacity-90">{currentStatus.text.toUpperCase()}</span>
                    </span>
                </div>

                <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                    <span className="hidden sm:inline">Why am I seeing this?</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Expanded Explanation Panel */}
            {expanded && (
                <div className="w-full bg-guardian-slate/95 border-b border-white/10 backdrop-blur-xl p-6 text-white animate-slide-up shadow-2xl">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-guardian-blue" />
                                System Status Explanation
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                {status === 'safe' && "All proactive monitoring systems are active. No anomalies detected in current voice or video streams. Identity verification is complete."}
                                {status === 'warning' && "We detected a slight anomaly in the audio pattern that matches deepfake signatures. Proceed with caution."}
                                {status === 'risk' && "CRITICAL WARNING: The incoming video stream lacks cryptographic signatures and matches known fraud patterns. Do not share personal info."}
                            </p>
                            <button onClick={() => { setExpanded(false); alert("Navigating to Real-time Metrics..."); }} className="text-xs text-trust-green hover:underline">View Live Metrics &rarr;</button>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Guardian Engine</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Voice Auth</span>
                                    <span className="text-trust-green">98% Verified</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-trust-green h-full w-[98%]"></div>
                                </div>

                                <div className="flex justify-between text-xs mt-2">
                                    <span>Video Auth</span>
                                    <span className={status === 'risk' ? 'text-trust-red' : 'text-trust-green'}>
                                        {status === 'risk' ? '12% FAIL' : '100% Verified'}
                                    </span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className={`${status === 'risk' ? 'bg-trust-red' : 'bg-trust-green'} h-full`} style={{ width: status === 'risk' ? '12%' : '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalTrustBar;
