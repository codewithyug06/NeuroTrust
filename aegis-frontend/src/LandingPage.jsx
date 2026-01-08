import { Shield, ArrowRight, Activity, Lock, Globe, Zap, PlayCircle, Layers } from 'lucide-react';

export default function LandingPage({ onLaunchDemo, onLaunchDashboard }) {
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 bg-cyber-grid pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black z-0 pointer-events-none"></div>

      {/* Warning Ticker */}
      <div className="w-full bg-blue-900/20 border-b border-blue-500/30 py-2 overflow-hidden flex whitespace-nowrap z-10 relative backdrop-blur-sm">
        <div className="animate-marquee flex gap-12 text-[10px] font-mono text-blue-300 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-red-500 animate-pulse"/> GLOBAL THREAT ALERT: SWARM ID-X99 DETECTED IN EAST EU REGION</span>
            <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-green-500"/> SYSTEM INTEGRITY: 99.9%</span>
            <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-blue-500"/> NEW NODES VERIFIED: +1,240 (LAST HOUR)</span>
            <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500"/> GUARDIAN AI: ACTIVE</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-12 flex flex-col items-center text-center">
        
        <div className="mb-6 p-4 rounded-full bg-blue-500/10 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-fade-in-up">
            <Shield className="w-16 h-16 text-blue-400" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 animate-fade-in-up delay-100">
          The Internet is Broken. <br/> <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(37,99,235,0.8)]">We Fixed It.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          <strong className="text-white">AEGIS</strong> is the Universal Trust Protocol for the AI Era. 
          We act as the "SSL for Reality," protecting humanity from deepfakes, voice clones, and agentic identity fraud.
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg animate-fade-in-up delay-300">
            <button 
                onClick={onLaunchDemo}
                className="group flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 border border-blue-400/30"
            >
                <PlayCircle className="w-6 h-6 fill-white/20"/>
                <div className="text-left">
                    <div className="text-[10px] uppercase opacity-70 tracking-widest">Live Prototype</div>
                    <div className="text-lg">Launch Guardian</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </button>

            <button 
                onClick={onLaunchDashboard}
                className="group flex-1 py-4 px-8 bg-gray-900/80 hover:bg-gray-800 text-white font-bold rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3 backdrop-blur-md"
            >
                <Layers className="w-6 h-6 text-gray-400 group-hover:text-blue-400"/>
                <div className="text-left">
                    <div className="text-[10px] uppercase opacity-70 tracking-widest">System View</div>
                    <div className="text-lg">Threat Map</div>
                </div>
            </button>
        </div>

      </div>

      {/* Features Grid */}
      <div className="relative z-10 container mx-auto px-6 py-20 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-blue-500/30 transition-all group backdrop-blur-sm">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform"><Lock className="w-6 h-6 text-blue-400"/></div>
                  <h3 className="text-xl font-bold mb-3 text-white">Trust, Verified.</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                      Every call, message, and agent interaction is cryptographically signed using <strong>Microsoft Entra Verified ID</strong>. No more guessing who is on the other end.
                  </p>
              </div>

              <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-purple-500/30 transition-all group backdrop-blur-sm">
                  <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform"><Zap className="w-6 h-6 text-purple-400"/></div>
                  <h3 className="text-xl font-bold mb-3 text-white">Deepfake Defense.</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                      Real-time multimodal analysis using <strong>Azure AI Content Safety</strong> detects synthetic voice patterns and video artifacts before fraud can occur.
                  </p>
              </div>

              <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-green-500/30 transition-all group backdrop-blur-sm">
                  <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform"><Globe className="w-6 h-6 text-green-400"/></div>
                  <h3 className="text-xl font-bold mb-3 text-white">Global Immunity.</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                      Threat intelligence shared across the <strong>Fabric</strong> network. When one user blocks a scammer, the entire network becomes immune instantly.
                  </p>
              </div>

          </div>
      </div>

      {/* Footer */}
      <div className="w-full py-8 text-center border-t border-gray-900 text-gray-600 text-xs font-mono relative z-10">
          <p>BUILT ON MICROSOFT AZURE • POWERED BY COSMOS DB & ENTRA • IMAGINE CUP 2026</p>
      </div>

    </div>
  );
}
