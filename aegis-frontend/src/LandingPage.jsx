import React, { useState, useEffect } from 'react';
import { Shield, Lock, Activity, ArrowRight, Play, Users, Bot, Building2, CheckCircle, Fingerprint } from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import CyberButton from './components/ui/CyberButton';
import StatusBadge from './components/ui/StatusBadge';

export default function LandingPage({ onEnterApp, onDemoStart }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-trust-green/30 font-sans overflow-x-hidden">

            {/* NAVBAR */}
            <nav className={`fixed top-12 w-full z-40 transition-all duration-500 ease-in-out ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-8'}`}>
                <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 items-center h-full">

                    {/* LEFT: LOGO */}
                    <div className="col-span-3 flex items-center gap-4 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-trust-green/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Shield className="w-10 h-10 text-trust-green relative z-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-white leading-none group-hover:text-gray-100 transition-colors">
                                NeuroTrust
                            </span>
                            <span className="text-[10px] font-mono font-bold text-trust-green/60 uppercase tracking-[0.2em] group-hover:text-trust-green transition-colors">
                                Zero Trust Perception
                            </span>
                        </div>
                    </div>

                    {/* CENTER: NAV LINKS */}
                    <div className="col-span-6 hidden md:flex items-center justify-center gap-12">
                        {['How it Works', 'Use Cases', 'Trust Center'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* RIGHT: ACTIONS */}
                    <div className="col-span-3 flex items-center justify-end gap-6">
                        <button
                            onClick={() => onEnterApp('LOGIN')}
                            className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
                        >
                            Sign In
                        </button>
                        <CyberButton onClick={() => onEnterApp('DASHBOARD')} className="!px-8 !py-3">
                            <span className="flex items-center gap-2 font-bold tracking-wide">
                                GET PROTECTED <ArrowRight className="w-4 h-4" />
                            </span>
                        </CyberButton>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-guardian-blue/20 via-black to-black opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-trust-green mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse"></span>
                        SYSTEM ONLINE • PROTECTING 24M+ IDENTITIES
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none animate-fade-in-up delay-100">
                        Verify reality <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">before it reaches you.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
                        The first AI-native defense grid against deepfakes, voice cloning, and autonomous agent fraud.
                        <span className="text-white font-bold"> Zero Trust Perception</span> for the post-truth era.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
                        <button onClick={() => onEnterApp('DASHBOARD')} className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3">
                            <Shield className="w-5 h-5" /> Start Protection
                        </button>
                        <button onClick={onDemoStart} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-3">
                            <Play className="w-5 h-5 fill-white" /> Live Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="features" className="py-32 relative border-t border-white/5 bg-guardian-dark">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Defense in Depth</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We don't just check phone numbers. We analyze the physics of sound and light to separate human from synthetic.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-guardian-blue/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Fingerprint className="w-8 h-8 text-trust-green" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">1. Identity Check</h3>
                            <p className="text-gray-400 leading-relaxed">Cryptographic verification of caller ID using Decentralized Identifiers (DIDs). We know *who* is calling before you pick up.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-guardian-blue/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Activity className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">2. Reality Verification</h3>
                            <p className="text-gray-400 leading-relaxed">Real-time spectral analysis detects synthetic voice artifacts and lip-sync inconsistencies invisible to the human ear.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-guardian-blue/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Lock className="w-8 h-8 text-amber-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">3. Guardian Intercept</h3>
                            <p className="text-gray-400 leading-relaxed">If trust is low, our AI Guardian steps in. It interrogates the caller, protecting you from coercion and scams.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* USE CASES */}
            <section id="use-cases" className="py-32 relative bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-black mb-16 text-center">Protection for Every Layer of Society</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GlassCard className="p-10 flex flex-col justify-between min-h-[300px] cursor-pointer hover:bg-white/5 transition-colors" onClick={() => onEnterApp('FAMILY')}>
                            <div>
                                <Users className="w-10 h-10 text-pink-500 mb-6" />
                                <h3 className="text-3xl font-bold mb-2">Families & Elderly</h3>
                                <p className="text-gray-400">Simplified implementation for vulnerable loved ones. Auto-blocking and guardian intervention.</p>
                            </div>
                            <div className="flex items-center gap-2 text-pink-500 mt-8 font-bold">
                                EXPLORE FAMILY DASHBOARD <ArrowRight className="w-4 h-4" />
                            </div>
                        </GlassCard>

                        <GlassCard className="p-10 flex flex-col justify-between min-h-[300px] cursor-pointer hover:bg-white/5 transition-colors" onClick={() => onEnterApp('ENTERPRISE')}>
                            <div>
                                <Building2 className="w-10 h-10 text-amber-500 mb-6" />
                                <h3 className="text-3xl font-bold mb-2">Enterprise & Leaders</h3>
                                <p className="text-gray-400">Protect executives from high-stakes impersonation and secure corporate AI agents.</p>
                            </div>
                            <div className="flex items-center gap-2 text-amber-500 mt-8 font-bold">
                                VIEW ENTERPRISE SUITE <ArrowRight className="w-4 h-4" />
                            </div>
                        </GlassCard>

                        <GlassCard className="p-10 flex flex-col justify-between min-h-[300px] cursor-pointer hover:bg-white/5 transition-colors md:col-span-2" onClick={() => onEnterApp('AGENTS')}>
                            <div className="relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <Bot className="w-10 h-10 text-cyan-500 mb-6 relative z-10" />
                                <h3 className="text-3xl font-bold mb-2 relative z-10">The AI Agent Economy</h3>
                                <p className="text-gray-400 max-w-xl relative z-10">As AI agents begin to act on your behalf, verify their identity and intent. Maintain oversight of your digital delegates.</p>
                            </div>
                            <div className="flex items-center gap-2 text-cyan-500 mt-8 font-bold">
                                MANAGE AGENT TRUST <ArrowRight className="w-4 h-4" />
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 border-t border-white/5 bg-guardian-dark">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-trust-green" />
                            <div className="text-xl font-bold">NeuroTrust</div>
                        </div>
                        <p className="text-gray-500 max-w-sm mb-6">Pioneering Zero Trust Perception for a safer digital future.</p>
                        <div className="text-xs text-gray-600">© 2026 NeuroTrust Inc. All rights reserved.</div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><button onClick={() => onEnterApp('DASHBOARD')} className="hover:text-white">Personal Dashboard</button></li>
                            <li><button onClick={() => onEnterApp('FAMILY')} className="hover:text-white">Family Safety</button></li>
                            <li><button onClick={() => onEnterApp('ENTERPRISE')} className="hover:text-white">Enterprise</button></li>
                            <li><button onClick={() => onEnterApp('SETTINGS')} className="hover:text-white">Privacy Policy</button></li>
                        </ul>
                    </div>
                </div>
            </footer>

        </div>
    );
}
