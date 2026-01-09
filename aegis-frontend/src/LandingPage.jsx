import { Shield, ArrowRight, Play, AlertTriangle, Users, Lock, CheckCircle, Activity, Smartphone } from 'lucide-react';

export default function LandingPage({ onLaunchDemo, onLaunchDashboard }) {
    return (
        <div className="min-h-screen w-full bg-guardian-dark text-white font-sans selection:bg-trust-green selection:text-white overflow-x-hidden relative">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-guardian-blue/20 via-guardian-dark to-guardian-dark pointer-events-none"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            {/* Navigation */}
            <nav className="relative z-50 w-full px-6 py-6 pt-16 flex items-center justify-between container mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-trust-green rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-guardian-dark" />
                    </div>
                    <span className="font-bold text-xl tracking-wide">NeuroTrust</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</button>
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">For Enterprise</button>
                    <button onClick={onLaunchDashboard} className="text-sm text-trust-green hover:text-green-400 transition-colors">Dashboard</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center">

                {/* Trust signal badge */}
                <div className="mb-6 px-4 py-1.5 rounded-full bg-trust-green/10 border border-trust-green/20 flex items-center gap-2 animate-fade-in-up">
                    <div className="w-2 h-2 rounded-full bg-trust-green animate-pulse"></div>
                    <span className="text-trust-green text-xs font-bold tracking-widest uppercase">Global Trust Network Active</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 animate-fade-in-up delay-100 max-w-4xl leading-tight">
                    Verify reality<br />
                    <span className="text-white">before it reaches you.</span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
                    The invisible guardian against deepfakes, voice clones, and agentic fraud.
                    NeuroTrust validates the authenticity of every digital interaction in real-time.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-md animate-fade-in-up delay-300">
                    <button
                        onClick={onLaunchDemo}
                        className="group flex-1 py-4 px-8 bg-trust-green hover:bg-green-400 text-guardian-dark font-bold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        <span>Launch Demo</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={onLaunchDashboard}
                        className="group flex-1 py-4 px-8 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
                    >
                        <Activity className="w-5 h-5 text-trust-red" />
                        <span>Live Threat Map</span>
                    </button>
                </div>
            </div>

            {/* Hero Visual - Simulated Incoming Threat */}
            <div className="relative z-10 container mx-auto px-6 pb-32 animate-fade-in-up delay-500">
                <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-guardian-slate/50 backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trust-green via-trust-yellow to-trust-red"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left: Enhanced Reality */}
                        <div className="p-8 border-r border-white/5 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-guardian-blue/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-guardian-blue" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Guardian Core</div>
                                    <div className="text-xs text-gray-500">Real-time Analysis</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <span className="text-sm text-green-400 font-medium">Platform Integrity</span>
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <span className="text-sm text-yellow-400 font-medium">Voice Clone Detected</span>
                                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <span className="text-sm text-red-400 font-medium">Scam Pattern Match</span>
                                    <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-1 rounded">BLOCKED</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: User View */}
                        <div className="relative h-64 md:h-auto bg-black">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-20 h-20 rounded-full bg-gray-800 mb-4 border-2 border-red-500 animate-pulse overflow-hidden relative">
                                    <div className="absolute inset-0 bg-red-500/20"></div>
                                    <Users className="w-full h-full p-4 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-red-500 mb-1">Unknown Caller</h3>
                                <p className="text-xs text-red-400 bg-red-950/50 px-3 py-1 rounded-full border border-red-900">High Risk • Financial Scam</p>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 border-4 border-red-500 pointer-events-none opacity-50 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Sections */}
            <div className="bg-guardian-slate/50 border-t border-white/5 py-24 relative z-10">
                <div className="container mx-auto px-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="group">
                            <div className="w-12 h-12 bg-guardian-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-6 h-6 text-guardian-blue" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Who It Protects</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Designed for the elderly, families, and high-value targets. NeuroTrust acts as a digital bodyguard that never sleeps.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group">
                            <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="w-6 h-6 text-trust-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">How It Works</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Multi-modal analysis inspects audio waveforms and video pixels for generational artifacts, verifying reality instantly.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group">
                            <div className="w-12 h-12 bg-trust-yellow/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Lock className="w-6 h-6 text-trust-yellow" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Your conversations never leave your device. Analysis happens locally or via secure, anonymized enclaves.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="w-full py-8 text-center border-t border-white/5 text-gray-600 text-xs font-mono">
                <p>NeuroTrust PROTOCOL • IMAGINE CUP 2026</p>
            </div>

        </div>
    );
}
