import React from 'react';

const GuardianPresence = ({ state = 'monitoring' }) => {
    // State: 'monitoring' | 'investigating' | 'intervening'

    const getStateStyles = () => {
        switch (state) {
            case 'investigating':
                return 'border-trust-yellow shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse-fast';
            case 'intervening':
                return 'border-trust-red shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse';
            case 'monitoring':
            default:
                return 'border-trust-green shadow-[0_0_10px_rgba(16,185,129,0.3)]';
        }
    };

    const getStatusText = () => {
        switch (state) {
            case 'investigating': return 'Analyzing...';
            case 'intervening': return 'BLOCKING';
            default: return 'Guardian Active';
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none pointer-events-none">
            <div className={`text-xs font-mono font-medium tracking-wider text-white/80 transition-opacity duration-300 ${state === 'monitoring' ? 'opacity-50' : 'opacity-100'}`}>
                {getStatusText()}
            </div>

            <div className="relative">
                {/* Core Avatar */}
                <GuardianAvatar state={state} />

                {/* Outer Rings */}
                {state === 'monitoring' && (
                    <div className="absolute inset-0 rounded-full border border-trust-green/20 scale-150 animate-ping-slow"></div>
                )}

                {state === 'investigating' && (
                    <div className="absolute inset-0 rounded-full border-t-2 border-trust-yellow animate-spin transition-all"></div>
                )}
            </div>
        </div>
    );
};

const GuardianAvatar = ({ state }) => {
    const baseClasses = "w-12 h-12 rounded-full border-2 bg-guardian-dark flex items-center justify-center transition-all duration-500 overflow-hidden relative";

    // Inner graphic
    return (
        <div className={`${baseClasses} ${state === 'investigating' ? 'border-trust-yellow' : state === 'intervening' ? 'border-trust-red' : 'border-trust-green'}`}>
            <div className={`absolute inset-0 opacity-20 ${state === 'intervening' ? 'bg-trust-red' : 'bg-guardian-blue'}`}></div>

            {/* Simple Shield Icon */}
            <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 z-10 ${state === 'intervening' ? 'text-trust-red' : 'text-trust-green'}`} stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>

            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[200%] w-full animate-scan opacity-30"></div>
        </div>
    )
}

export default GuardianPresence;
