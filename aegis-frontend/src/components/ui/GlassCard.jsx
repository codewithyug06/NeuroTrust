import React from 'react';

export const GlassCard = ({ children, className = '', hoverEffect = true, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
            relative overflow-hidden rounded-3xl
            bg-guardian-slate/40 border border-white/5
            backdrop-blur-xl shadow-2xl
            transition-all duration-500 ease-out
            group
            ${hoverEffect ? 'hover:border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-1 cursor-pointer' : ''}
            ${className}
        `}
        >
            {/* Subtle internal noise texture for "premium" feel */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-10 p-6 h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
