import React, { useState, useEffect } from 'react';
import {
  Shield, Globe, Activity, ArrowLeft, Zap,
  Cpu, Users, Search, ShieldAlert, CheckCircle, Lock, LayoutGrid
} from 'lucide-react';
import AgentPassport from './components/AgentPassport';

// --- BACKEND API URL ---
const API_URL = `http://127.0.0.1:8000/api/v1`;

export default function Dashboard({ onBack }) {
  const [newsUrl, setNewsUrl] = useState("");
  const [newsResult, setNewsResult] = useState(null);
  const [analyzingNews, setAnalyzingNews] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentsList, setAgentsList] = useState([]);

  // --- MOCK DATA ---
  const threatsBlocked = 14205;
  const activeNodes = 843;
  const blips = [
    { id: 1, top: '30%', left: '25%', color: 'shadow-[0_0_15px_rgba(239,68,68,0.8)] bg-red-500' },
    { id: 2, top: '45%', left: '55%', color: 'shadow-[0_0_15px_rgba(234,179,8,0.8)] bg-yellow-500' },
    { id: 3, top: '65%', left: '75%', color: 'shadow-[0_0_15px_rgba(249,115,22,0.8)] bg-orange-500' },
    { id: 4, top: '25%', left: '45%', color: 'shadow-[0_0_15px_rgba(59,130,246,0.8)] bg-blue-500' },
    { id: 5, top: '55%', left: '15%', color: 'shadow-[0_0_15px_rgba(168,85,247,0.8)] bg-purple-500' },
  ];

  // --- FETCH AGENTS ---
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`${API_URL}/handshake/agents`);
        if (res.ok) setAgentsList(await res.json());
      } catch (e) {
        setAgentsList([
          { name: "Support_Agent_01", id: "did:ion:123...", trust: 98, category: "Customer Service" },
          { name: "Bank_Verifier_X", id: "did:web:bank...", trust: 95, category: "Finance" }
        ]);
      }
    }
    fetchAgents();
  }, []);

  // --- NEWS VERIFICATION HANDLER ---
  const handleVerifyNews = async () => {
    if (!newsUrl.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 500);
      return;
    }

    setAnalyzingNews(true);
    setNewsResult(null);

    try {
      const response = await fetch(`${API_URL}/verify-news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newsUrl })
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      setNewsResult(data);
    } catch (e) {
      console.error("Verification error:", e);
      // Fallback Mock for Demo if Backend fails
      setTimeout(() => {
        const isFake = newsUrl.toLowerCase().includes("fake");
        setNewsResult({
          trust_score: isFake ? 12 : 99,
          publisher: isFake ? "Unknown Source" : "Verified Publisher",
          c2pa_valid: !isFake,
          metadata: { timestamp: new Date().toISOString() }
        });
      }, 1000);
    } finally {
      setTimeout(() => setAnalyzingNews(false), 1000);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">

      {/* HEADER */}
      <header className="h-20 glass-panel sticky top-0 z-50 px-8 flex items-center justify-between border-b-0 border-white/5">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-full transition-all group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 text-2xl font-black tracking-tighter">
              <Shield className="w-8 h-8 text-blue-500 fill-blue-500/10" />
              <span className="text-glow-blue">AEGIS</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400/60 tracking-[0.3em] uppercase ml-1">Neuro-Trust Engine V1.0</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12 font-mono text-xs">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="tracking-widest">GLOBAL NET</span>
          </div>
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="tracking-widest">SYSTEM OPTIMAL</span>
          </div>
        </div>

        <button className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 text-xs font-bold rounded-lg transition-all tracking-widest uppercase">
          Terminate Session
        </button>
      </header>

      {/* AGENT PASSPORT MODAL */}
      {selectedAgent && <AgentPassport agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}

      <main className="p-8 max-w-[1600px] mx-auto space-y-8">

        {/* --- ROW 1: HUD & MAP --- */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

          {/* STATS COLUMN */}
          <div className="space-y-6">
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity"><Shield className="w-32 h-32" /></div>
              <div className="text-gray-400 text-xs font-mono mb-1 uppercase tracking-wider">Threats Repelled</div>
              <div className="text-5xl font-black text-white tracking-tighter text-glow-blue">{threatsBlocked.toLocaleString()}</div>
              <div className="flex items-center gap-2 mt-4 text-xs font-bold text-green-400">
                <Activity className="w-3 h-3" /> +12.4% Efficiency
              </div>
            </div>

            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity"><Cpu className="w-32 h-32" /></div>
              <div className="text-gray-400 text-xs font-mono mb-1 uppercase tracking-wider">Neural Nodes</div>
              <div className="text-5xl font-black text-white tracking-tighter">{activeNodes}</div>
              <div className="flex items-center gap-2 mt-4 text-xs font-bold text-blue-400">
                <Zap className="w-3 h-3" /> 12ms Latency
              </div>
            </div>
          </div>

          {/* LIVE MAP */}
          <div className="col-span-1 xl:col-span-3 glass-panel rounded-3xl relative overflow-hidden min-h-[400px] flex items-center justify-center scanner-overlay">
            {/* Map Art */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center invert filter contrast-125"></div>

            <div className="absolute top-6 left-8 z-10">
              <h3 className="text-xl font-bold flex items-center gap-3"><Globe className="w-5 h-5 text-blue-500 animate-pulse" /> LIVE THREAT VECTORS</h3>
              <p className="text-xs text-blue-300/50 font-mono mt-1">REAL-TIME GLOBAL TELEMETRY</p>
            </div>

            {/* Animated Blips */}
            {blips.map((blip) => (
              <div key={blip.id} className="absolute group cursor-pointer" style={{ top: blip.top, left: blip.left }}>
                <div className={`w-3 h-3 rounded-full ${blip.color} animate-ping absolute`}></div>
                <div className={`w-3 h-3 rounded-full ${blip.color} relative`}></div>
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-white/10 px-3 py-1 rounded text-[10px] whitespace-nowrap z-20 pointer-events-none">
                  THREAT ID: #{Math.floor(Math.random() * 9999)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- ROW 2: CONTROL PANELS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* MISINFORMATION DEFENSE */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex items-start gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400"><Search className="w-8 h-8" /></div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Deepfake Detective</h3>
                <p className="text-sm text-gray-400 max-w-sm">Paste any URL to verify content authenticity using C2PA provenance ledger and Azure AI analysis.</p>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className={`flex-1 relative transition-all ${inputError ? 'animate-shake' : ''}`}>
                <input
                  type="text"
                  value={newsUrl}
                  onChange={(e) => setNewsUrl(e.target.value)}
                  placeholder="Paste media link here..."
                  className={`w-full bg-[#0A0A0A] border ${inputError ? 'border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-xl px-5 py-4 text-sm focus:outline-none transition-colors text-white placeholder:text-gray-600 font-mono`}
                />
              </div>
              <button
                onClick={handleVerifyNews}
                disabled={analyzingNews}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {analyzingNews ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                ANALYZE
              </button>
            </div>

            {/* RESULT DISPLAY */}
            {newsResult && (
              <div className="mt-8 animate-fade-in-up">
                <div className={`p-6 rounded-2xl border ${newsResult.trust_score > 80 ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-2xl font-black uppercase tracking-tight ${newsResult.trust_score > 80 ? 'text-green-500' : 'text-red-500'}`}>
                      {newsResult.trust_score > 80 ? 'AUTHENTIC CONTENT' : 'SUSPICIOUS MEDIA'}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">TRUST SCORE</div>
                      <div className="text-3xl font-bold text-white">{newsResult.trust_score}%</div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

                  <div className="flex items-center gap-6 text-xs text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span>PUBLISHER: <span className="text-white font-bold">{newsResult.publisher}</span></span>
                    </div>
                    {newsResult.c2pa_valid && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>C2PA DIGITALLY SIGNED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TRUST REGISTRY */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400"><Users className="w-8 h-8" /></div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Trust Registry</h3>
                  <p className="text-sm text-gray-400">Verified institutional agents.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-green-500 hover:text-green-400 border border-green-500/30 px-4 py-2 rounded-lg transition-colors">VIEW ALL</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {agentsList.map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center font-bold text-gray-400 border border-white/10 group-hover:border-green-500/50 group-hover:text-green-500 transition-all">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-green-400 transition-colors">{agent.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{agent.id.substring(0, 24)}...</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-green-500">{agent.trust}% TRUST</span>
                    <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gray-400 uppercase">{agent.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}