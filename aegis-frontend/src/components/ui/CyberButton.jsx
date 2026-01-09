import React from 'react';

export const CyberButton = ({ children, onClick, variant = 'primary', className = '', icon: Icon }) => {
    const baseStyles = "relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden group";

    const variants = {
        primary: "bg-trust-green text-guardian-dark hover:bg-green-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm",
        danger: "bg-trust-red/10 text-trust-red border border-trust-red/20 hover:bg-trust-red/20"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Shimmer Effect for Primary */}
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
            )}

            {Icon && <Icon className="w-5 h-5 fill-current" />}
            <span>{children}</span>
        </button>
    );
};

export default CyberButton;
