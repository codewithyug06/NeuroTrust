import React, { useState } from 'react';
import { Wifi, Battery, Signal, Settings, Home } from 'lucide-react';

export default function PhoneInterface({
    isMobile,
    children,
    statusBar = { agentName: null, deviceFingerprint: null, graphContext: null },
    onSettingsClick,
    desktopControls
}) {

    // Desktop "Simulator" Wrapper
    if (!isMobile) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="flex gap-16 items-center z-10 transition-transform">
                    {/* PHONE CHASSIS - iPhone 15 Pro Style */}
                    <div className="relative w-[400px] h-[850px] bg-black rounded-[60px] shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_0_12px_#1a1a1a,0_0_0_13px_#333] border-4 border-[#222] overflow-hidden select-none scale-[0.9] xl:scale-100 origin-center">

                        {/* DYNAMIC ISLAND / NOTCH */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[35px] w-[120px] bg-black rounded-b-3xl z-50 flex items-center justify-center gap-2">
                            <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center gap-1">
                                {/* Custom Dynamic Island Content */}
                            </div>
                        </div>

                        {/* STATUS BAR */}
                        <div className="absolute top-0 w-full px-8 py-4 flex justify-between items-end z-40 text-white font-medium text-sm">
                            <div className="flex items-center gap-1">
                                <span>9:41</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Signal className="w-4 h-4" />
                                <Wifi className="w-4 h-4" />
                                <Battery className="w-5 h-5" />
                            </div>
                        </div>

                        {/* SCREEN CONTENT */}
                        <div className="relative w-full h-full bg-black overflow-hidden font-sans text-white">
                            {children}
                        </div>

                        {/* HOME BAR */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
                    </div>

                    {/* DESKTOP CONTROLS */}
                    {desktopControls}
                </div>
            </div>
        );
    }

    // Mobile View (Simple Fullscreen)
    return (
        <div className="w-full h-screen bg-black overflow-hidden relative font-sans text-white">
            {children}
            {/* Mobile Status Bar Overlay */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between z-50 pointer-events-none">
                <span className="text-xs font-mono opacity-50">LIVE SIGNAL</span>
                <Wifi className="w-4 h-4 opacity-50" />
            </div>
        </div>
    );
}
