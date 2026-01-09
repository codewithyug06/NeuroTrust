import React from 'react';

const variants = {
    success: 'bg-trust-green/10 text-trust-green border-trust-green/20',
    warning: 'bg-trust-yellow/10 text-trust-yellow border-trust-yellow/20',
    danger: 'bg-trust-red/10 text-trust-red border-trust-red/20',
    info: 'bg-guardian-blue/10 text-guardian-blue border-guardian-blue/20',
    neutral: 'bg-white/5 text-gray-400 border-white/10'
};

export const StatusBadge = ({ status = 'neutral', children, className = '' }) => {
    const variantClass = variants[status] || variants.neutral;

    return (
        <span className={`
      inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border
      ${variantClass}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default StatusBadge;
