import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Activity, Eye, Info } from 'lucide-react';

export default function TrustOverlay({ trustScore, status, details, biometrics }) {
    // status: VERIFIED | CAUTION | BLOCKED | ANALYZING

    // Determine color scheme based on status
    const getStatusStyle = () => {
        switch (status) {
            case 'VERIFIED': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500', icon: ShieldCheck };
            case 'BLOCKED': return { bg: 'bg-red-600', text: 'text-red-500', border: 'border-red-600', icon: ShieldAlert };
            case 'CAUTION': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500', icon: Info };
            default: return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', icon: Shield };
        }
    };

    const style = getStatusStyle();
    const Icon = style.icon;

    return (
        <div className="absolute top-4 right-4 z-50 pointer-events-none">
            {/* Main Holographic Shield */}
            <div className={`
                relativebackdrop-blur-md bg-black/60 border ${style.border}/50 
                rounded-2xl p-4 w-72 shadow-[0_0_30px_rgba(0,0,0,0.5)]
                transition-all duration-500 ease-in-out
                ${status === 'BLOCKED' ? 'animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.5)]' : ''}
            `}>

                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2">
                        <Icon className={`w-6 h-6 ${style.text}`} />
                        <span className={`font-black text-sm tracking-widest ${style.text}`}>
                            {status === 'VERIFIED' ? 'TRUSTED CONNECTION' : status}
                        </span>
                    </div>
                    <div className="text-xs font-mono text-gray-500 animate-pulse">
                        LIVE
                    </div>
                </div>

                {/* Score Big Display */}
                <div className="flex items-end justify-between mb-4">
                    <div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">REALITY SCORE</div>
                        <div className={`text-4xl font-black ${style.text} tabular-nums`}>
                            {trustScore}%
                        </div>
                    </div>
                    {/* Mini Sparkline Visualization (Mock) */}
                    <div className="h-8 flex gap-1 items-end">
                        {[40, 60, 45, 70, 90, 85, trustScore].map((val, i) => (
                            <div key={i}
                                className={`w-1 rounded-t-sm ${style.bg}`}
                                style={{ height: `${val / 3}px`, opacity: 0.3 + (i * 0.1) }}
                            />
                        ))}
                    </div>
                </div>

                {/* Biometric Analysis Feed */}
                {biometrics && (
                    <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 flex items-center gap-1"><Eye className="w-3 h-3" /> LIP SYNC</span>
                            <span className={biometrics.lip_sync_status === 'MATCH' ? 'text-green-500' : 'text-red-500 font-bold'}>
                                {biometrics.lip_sync_status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 flex items-center gap-1"><Activity className="w-3 h-3" /> LIVENESS</span>
                            <span className={biometrics.liveness === 'PASS' ? 'text-green-500' : 'text-red-500 font-bold'}>
                                {biometrics.liveness}
                            </span>
                        </div>
                    </div>
                )}

                {/* Footer Details */}
                <div className="text-[10px] text-gray-400 font-mono leading-tight border-t border-gray-700 pt-2">
                    {details?.message || "Scanning media stream..."}
                </div>
            </div>
        </div>
    );
}
