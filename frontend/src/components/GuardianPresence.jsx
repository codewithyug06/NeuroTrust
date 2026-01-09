import React from 'react';
import { Shield, Eye, AlertTriangle, ShieldAlert } from 'lucide-react';

const GuardianPresence = ({ state = 'monitoring' }) => {
    // State: 'monitoring' | 'investigating' | 'intervening'

    const getStatusConfig = () => {
        switch (state) {
            case 'investigating':
                return {
                    text: 'ANALYZING THREAT...',
                    color: 'text-trust-yellow',
                    borderColor: 'border-trust-yellow',
                    shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
                    icon: AlertTriangle,
                    bg: 'bg-trust-yellow/10',
                    animation: 'animate-pulse'
                };
            case 'intervening':
                return {
                    text: 'THREAT BLOCKED',
                    color: 'text-trust-red',
                    borderColor: 'border-trust-red',
                    shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.6)]',
                    icon: ShieldAlert,
                    bg: 'bg-trust-red/20',
                    animation: 'animate-pulse'
                };
            case 'monitoring':
            default:
                return {
                    text: 'GUARDIAN ACTIVE',
                    color: 'text-trust-green',
                    borderColor: 'border-trust-green',
                    shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
                    icon: Eye,
                    bg: 'bg-trust-green/10',
                    animation: ''
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 transition-all duration-500 ${state === 'intervening' ? 'scale-110' : 'scale-100'}`}>

            {/* Context Label (Only shows when not idle monitoring for cleaner look, or always show if preferred) */}
            <div className={`
                px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 bg-black/60
                text-[10px] font-mono font-bold tracking-[0.2em] uppercase
                transition-all duration-300
                ${config.color}
                ${state === 'monitoring' ? 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' : 'opacity-100 translate-x-0'}
            `}>
                {config.text}
            </div>

            <div className="relative group cursor-default">
                {/* Outer Glow Ring */}
                <div className={`absolute inset-0 rounded-full border ${config.borderColor} opacity-50 ${state === 'monitoring' ? 'animate-ping-slow' : 'animate-ping'}`}></div>

                {/* Rotating Ring for Investigation */}
                {state === 'investigating' && (
                    <div className="absolute -inset-2 rounded-full border-t-2 border-trust-yellow/50 animate-spin"></div>
                )}

                {/* Main Orb */}
                <div className={`
                    relative w-14 h-14 rounded-full 
                    bg-black border-2 ${config.borderColor} 
                    flex items-center justify-center 
                    ${config.shadow}
                    transition-all duration-500
                    overflow-hidden
                `}>
                    {/* Inner Scanning Effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className={`absolute inset-0 ${config.bg}`}></div>

                    {/* Scan Line */}
                    <div className="absolute inset-x-0 h-[2px] bg-white/50 animate-scan-fast shadow-[0_0_10px_white]"></div>

                    <Icon className={`w-6 h-6 z-10 ${config.color} ${config.animation}`} />
                </div>

                {/* Status Dot */}
                <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-black ${state === 'monitoring' ? 'bg-trust-green' : state === 'investigating' ? 'bg-trust-yellow' : 'bg-trust-red'}`}></div>
            </div>
        </div>
    );
};

export default GuardianPresence;
