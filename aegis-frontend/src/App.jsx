import { useState, useEffect, useRef } from 'react'
import { Eye, Smartphone, Book, Settings, Mic, Volume2, Home } from 'lucide-react'
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import PhoneInterface from './components/PhoneInterface';
import CallScreen from './components/CallScreen';
import GuardianOverlay from './components/GuardianOverlay';
import SettingsModal from './components/SettingsModal';
import GlobalTrustBar from './components/GlobalTrustBar';
import GuardianPresence from './components/GuardianPresence';
import Onboarding from './components/Onboarding';
import { Settings as Config } from './core/config';

import FamilyDashboard from './components/FamilyDashboard';
import AgentDashboard from './components/AgentDashboard';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import SettingsDashboard from './components/SettingsDashboard';

// --- BACKEND API URL ---
const API_URL = `http://127.0.0.1:8000/api/v1`;

const CALLER_IMAGES = {
    SAFE: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    FAKE: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop"
};

function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { isMobile };
}

export default function App() {
    const { isMobile } = useDeviceDetect();
    const [view, setView] = useState("LANDING");

    // CORE STATES
    const [callStatus, setCallStatus] = useState("IDLE");
    const [trustScore, setTrustScore] = useState(null);
    const [isSafeMode, setIsSafeMode] = useState(true);
    const [agentName, setAgentName] = useState("Unknown Caller");
    const [verdictReason, setVerdictReason] = useState("");

    // MODES
    const [elderlyMode, setElderlyMode] = useState(() => localStorage.getItem("aegis_elderly") === "true");
    useEffect(() => localStorage.setItem("aegis_elderly", elderlyMode), [elderlyMode]);

    const [showQrScan, setShowQrScan] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);

    // PILLAR DATA
    const [memoryRecall, setMemoryRecall] = useState(null);
    const [graphContext, setGraphContext] = useState(null);
    const [deviceFingerprint, setDeviceFingerprint] = useState(null);
    const [moodScore, setMoodScore] = useState(98);
    const [biometrics, setBiometrics] = useState(null);
    const [intentFlag, setIntentFlag] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [captions, setCaptions] = useState([]);
    const [guardianTranscript, setGuardianTranscript] = useState([]);

    const [pipelineTrace, setPipelineTrace] = useState(null);
    const [layerDetails, setLayerDetails] = useState(null);

    // AUDIO SIMULATION REFS
    const ringAudio = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"));
    const timeoutRef = useRef(null);
    const voiceAudio = useRef(null);

    // --- SYSTEM STATE DERIVATION ---
    const getSystemState = () => {
        if (callStatus === 'ANALYZING') return { trust: 'warning', guardian: 'investigating' };
        if (callStatus === 'GUARDIAN_INTERVENTION' || callStatus === 'BLOCKED') return { trust: 'risk', guardian: 'intervening' };
        if (callStatus === 'ACTIVE') {
            // Deepfake logic
            if (!isSafeMode) return { trust: 'risk', guardian: 'intervening' };
            // Fraud logic simulation
            if (intentFlag) return { trust: 'warning', guardian: 'investigating' };
            return { trust: 'safe', guardian: 'monitoring' };
        }
        return { trust: 'safe', guardian: 'monitoring' };
    };

    const systemState = getSystemState();

    // --- CAPTION SIMULATION ---
    useEffect(() => {
        if (callStatus === "ACTIVE" && !elderlyMode) {
            const lines = isSafeMode
                ? ["Hello, confirming your appointment.", "Is this a good time?", "Thanks for verifying identity."]
                : ["This is URGENT.", "IRS warrant issued.", "Pay now or be arrested."];

            let i = 0;
            const interval = setInterval(() => {
                if (i < lines.length) {
                    const text = lines[i];
                    const hasFraud = text.match(/(URGENT|IRS|arrest|deported|pay)/i);
                    setCaptions(prev => [...prev.slice(-2), { text, isFraud: !!hasFraud }]);
                    if (hasFraud) setIntentFlag("HIGH PRESSURE TACTICS DETECTED");
                    i++;
                }
            }, 2500);
            return () => clearInterval(interval);
        } else {
            setCaptions([]);
            setIntentFlag(null);
        }
    }, [callStatus, isSafeMode, elderlyMode]);

    // --- GUARDIAN INTERROGATION SIMULATION ---
    useEffect(() => {
        if (callStatus === "GUARDIAN_INTERVENTION") {
            setGuardianTranscript([]);
            const sequence = [
                { sender: "NeuroTrust", text: "Protection Protocol Activated. This line is secured." },
                { sender: "NeuroTrust", text: "Identity verification failed. State your purpose immediately." },
                { sender: "CALLER", text: "Uh, look, I'm just calling about the refund..." },
                { sender: "NeuroTrust", text: "Lie detected. Biometric signatures do not match authorized personnel." },
                { sender: "CALLER", text: "Let me speak to the owner!" },
                { sender: "NeuroTrust", text: "Access Denied. Trace initiated. Disconnecting user from audio feed." }
            ];
            let i = 0;
            const interval = setInterval(() => {
                if (i < sequence.length) {
                    setGuardianTranscript(prev => [...prev, sequence[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                    // AUTO-HANGUP SEQUENCE
                    timeoutRef.current = setTimeout(() => {
                        handleReject();
                    }, 3000);
                }
            }, 1000);
            return () => {
                clearInterval(interval);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }
    }, [callStatus]);

    // --- TRIGGER CALL ---
    const triggerIncomingCall = (safeMode) => {
        setIsSafeMode(safeMode);
        setCallStatus("RINGING");
        setWalletConnected(true); // Auto-connect wallet for smooth demo flow
        setAgentName(safeMode ? "Bank of America Support" : "Unknown Number");
        setMemoryRecall(null);
        setGraphContext(null);
        setDeviceFingerprint(null);
        setTrustScore(null);
        setIntentFlag(null);
        setMoodScore(98);
        setPipelineTrace(null);
        setLayerDetails(null);
        ringAudio.current.loop = true;
        ringAudio.current.play().catch(e => console.log("Audio blocked:", e));
        if (!safeMode && navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
    };

    const handleReject = () => {
        setCallStatus("IDLE");

        // IMPORTANT: Do NOT clear trustScore/details here. 
        // Clearing them causes a race condition where the UI tries to render 
        // the active call screen with null data before switching to IDLE.
        // triggerIncomingCall() handles the reset for the next call.

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (ringAudio.current) {
            ringAudio.current.pause();
            ringAudio.current.currentTime = 0;
        }
    }

    const handleAnswer = () => {
        setCallStatus("CONNECTED");
        if (ringAudio.current) {
            ringAudio.current.pause();
            ringAudio.current.currentTime = 0;
        }
    }

    // --- VERITY SEQUENCE ---
    const runAnalysis = async () => {
        setCallStatus("ANALYZING");

        setTimeout(async () => { // Simulate network delay
            try {
                // MOCK FRONTEND IDENTITY
                if (isSafeMode) {
                    setGraphContext("Assigned Case Worker");
                    setMemoryRecall("Last discussed: Rates");
                }

                // BACKEND CALL - WITH FALLBACK
                let data;
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s Timeout

                    const response = await fetch(`${API_URL}/analyze-stream`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ scenario: isSafeMode ? "SAFE" : "DEEPFAKE" }),
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (!response.ok) throw new Error("Backend offline");
                    data = await response.json();
                } catch (e) {
                    console.warn("Backend unavailable/timed out, using mock data for demo.", e);
                    data = isSafeMode ? {
                        mood_score: 98,
                        biometrics: { blink_rate: 18, head_yaw: 2 },
                        device_fingerprint: { model: "iPhone 15 Pro Max" },
                        safety_score: 99,
                        verdict: "AUTHENTIC_MEDIA",
                        pipeline_trace: ["MOCK: Identity Verified", "MOCK: Audio Authentic"],
                        details: { reason: "Identity Confirmed" }
                    } : {
                        mood_score: 12,
                        biometrics: { blink_rate: 4, head_yaw: 0 },
                        device_fingerprint: { model: "Unknown Emulator" },
                        safety_score: 15,
                        verdict: "DEEPFAKE_DETECTED",
                        pipeline_trace: ["MOCK: Face Swap Detected", "MOCK: Voice Clone Match"],
                        details: { reason: "Deepfake Detected" }
                    };
                }

                if (data.mood_score) setMoodScore(data.mood_score);
                if (data.biometrics) setBiometrics(data.biometrics);
                if (data.device_fingerprint?.model) setDeviceFingerprint(data.device_fingerprint.model);

                // NEW: Capture Trace & Details (With Robust Fallbacks)
                setPipelineTrace(data.pipeline_trace || ["System Analysis Complete", "Trace Log Unavailable"]);
                setLayerDetails(data.details || {
                    reason: "Data Unavailable",
                    psychological_triggers: [],
                    intent_drift: { status: "UNKNOWN", trend: "FLAT" }
                });

                setTrustScore(data.safety_score);

                if (data.verdict === "AUTHENTIC_MEDIA" && isSafeMode) {
                    setCallStatus("ACTIVE");
                    setVerdictReason("Identity Confirmed");
                } else {
                    setCallStatus("ACTIVE");
                    setVerdictReason("Deepfake Detected");
                    timeoutRef.current = setTimeout(() => setCallStatus("GUARDIAN_INTERVENTION"), 4000);
                }
            } catch (error) {
                console.error("Critical Failure:", error);
                setTrustScore(0);
                setVerdictReason("System Error - Connection Failed");
                setCallStatus("BLOCKED");
            }
        }, 1500);
    };

    const handleVerify = () => {
        if (!walletConnected && !elderlyMode) {
            setShowQrScan(true);
            return;
        }
        runAnalysis();
    };

    return (
        <>
            {/* GLOBAL OVERLAYS */}
            <GlobalTrustBar status={systemState.trust} />
            <GuardianPresence state={systemState.guardian} />

            {/* ROUTING */}
            {view === "DASHBOARD" && <Dashboard onBack={() => setView("LANDING")} />}

            {view === "FAMILY" && <FamilyDashboard onBack={() => setView("LANDING")} />}
            {view === "AGENTS" && <AgentDashboard onBack={() => setView("LANDING")} />}
            {view === "ENTERPRISE" && <EnterpriseDashboard onBack={() => setView("LANDING")} />}
            {view === "SETTINGS" && <SettingsDashboard onBack={() => setView("LANDING")} />}

            {view === "LANDING" && (
                <LandingPage
                    onEnterApp={(dest) => setView(dest === 'LOGIN' ? 'DASHBOARD' : dest)}
                    onDemoStart={() => setView("ONBOARDING")}
                />
            )}

            {view === "ONBOARDING" && (
                <Onboarding onComplete={() => setView("PHONE")} />
            )}


            {/* PHONE UI */}
            {view === "PHONE" && (
                <PhoneInterface
                    isMobile={isMobile}
                    statusBar={{ agentName, deviceFingerprint, graphContext, elderlyMode }}
                    onSettingsClick={() => setShowSettings(true)}
                    desktopControls={
                        !isMobile && (
                            <div className="glass-panel p-6 rounded-3xl w-80 animate-fade-in-up z-40 fixed top-20 right-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs text-blue-400 font-bold tracking-widest uppercase">Simulation Controls</span>
                                    <Settings className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                                </div>

                                <div className="flex items-center justify-between mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Cognitive Safety Mode</span>
                                        <span className="text-[10px] text-gray-400">Reduced Load Interface</span>
                                    </div>
                                    <button
                                        onClick={() => setElderlyMode(!elderlyMode)}
                                        className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${elderlyMode ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-gray-700'}`}
                                        role="switch"
                                        aria-checked={elderlyMode}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${elderlyMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <button
                                        onClick={() => triggerIncomingCall(true)}
                                        className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 text-green-400 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                                    >
                                        SCENARIO A<br /><span className="opacity-60 font-normal">SAFE CALL</span>
                                    </button>
                                    <button
                                        onClick={() => triggerIncomingCall(false)}
                                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                                    >
                                        SCENARIO B<br /><span className="opacity-60 font-normal">DEEPFAKE</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => setCallStatus("IDLE")}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:text-white"
                                >
                                    <Home className="w-3 h-3" /> RESET PHONE
                                </button>
                                <button
                                    onClick={() => setView("LANDING")}
                                    className="w-full mt-2 py-3 bg-transparent text-gray-500 text-[10px] font-bold uppercase hover:text-white hover:underline transition-all"
                                >
                                    EXIT DEMO
                                </button>
                            </div>
                        )
                    }
                >
                    {/* BACKGROUND IMAGE (Video Feed) */}
                    {
                        (callStatus !== "IDLE") && (
                            <div className="absolute inset-0 w-full h-full">
                                <img src={isSafeMode ? CALLER_IMAGES.SAFE : CALLER_IMAGES.FAKE}
                                    className={`w-full h-full object-cover transition-all duration-700 ${callStatus === 'ANALYZING' ? 'blur-sm scale-110' : ''}`}
                                />
                            </div>
                        )
                    }

                    {/* IDLE SCREEN (Recent Calls) */}
                    {
                        callStatus === "IDLE" && (
                            <div className="absolute inset-0 flex flex-col pt-32 px-6">
                                <div className="text-3xl font-bold mb-8 text-white">Recents</div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"><Mic className="w-5 h-5 text-red-500" /></div>
                                        <div>
                                            <div className="font-bold text-red-500">Unknown Caller</div>
                                            <div className="text-xs text-gray-500">Blocked by Guardian • 10:42 AM</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"><Smartphone className="w-5 h-5 text-green-500" /></div>
                                        <div>
                                            <div className="font-bold text-white">Mom</div>
                                            <div className="text-xs text-gray-500">Incoming Call • Yesterday</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Wallet Status */}
                                <div className={`mt-auto mb-20 px-4 py-3 rounded-xl border flex items-center justify-between ${walletConnected ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-800 border-gray-700'}`}>
                                    <span className="text-xs font-bold text-gray-400">{walletConnected ? 'ENTRA WALLET ACTIVE' : 'WALLET DISCONNECTED'}</span>
                                    <Settings className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                        )
                    }

                    {/* ACTIVE CALL & OVERLAY */}
                    <CallScreen
                        status={callStatus}
                        isSafeMode={isSafeMode}
                        elderlyMode={elderlyMode}
                        onAnswer={handleAnswer}
                        onReject={handleReject}
                        onVerify={handleVerify}

                        // Pass new prop structures
                        verificationData={trustScore !== null ? {
                            trust_score: {
                                score: trustScore,
                                level: callStatus === 'GUARDIAN_INTERVENTION' ? 'BLOCKED' : (trustScore > 80 ? 'TRUSTED' : 'WARNING'),
                                factors: {
                                    identity: isSafeMode ? 98 : 45,
                                    deepfake_penalty: isSafeMode ? 0 : 85,
                                    intent_penalty: isSafeMode ? 10 : 75
                                }
                            },
                            details: { reason: verdictReason },
                            biometrics: biometrics,
                            // NEW: Pass Trace & Layer Details to CallScreen -> TrustPanel
                            pipeline_trace: pipelineTrace,
                            layer_details: layerDetails
                        } : null}

                        guardianData={callStatus === 'GUARDIAN_INTERVENTION' ? {
                            action: 'INTERCEPT',
                            guardian_message: "Halt. Identify yourself immediately... Monitoring conversation.",
                            transcript: guardianTranscript
                        } : {}}
                    />

                    {/* SETTINGS MODAL */}
                    {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

                    {/* QR MODAL */}
                    {showQrScan && (
                        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur flex flex-col items-center justify-center p-6 animate-fade-in">
                            <div className="bg-white p-4 rounded-xl mb-4"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AEGIS_ENTRA_VERIFY_INIT" className="w-40 h-40" /></div>
                            <h3 className="text-lg font-bold text-white mb-6">Scan with Entra Wallet</h3>
                            <button onClick={() => { setWalletConnected(true); setShowQrScan(false); runAnalysis(); }} className="w-full py-4 bg-blue-600 rounded-xl font-bold">SIMULATE SCAN</button>
                            <button onClick={() => setShowQrScan(false)} className="mt-4 text-gray-500 text-xs">Cancel</button>
                        </div>
                    )}

                    {/* PREVIEW MODE / DEBUG OVERLAY */}
                    <div className="absolute top-2 left-2 z-50 pointer-events-none opacity-50">
                        <div className="bg-black/50 p-2 rounded text-[8px] font-mono text-green-400">
                            <div>STATUS: {callStatus}</div>
                            <div>WALLET: {walletConnected ? 'CONNECTED' : 'DISCONNECTED'}</div>
                            <div>SAFE_MODE: {isSafeMode ? 'TRUE' : 'FALSE'}</div>
                        </div>
                    </div>
                </PhoneInterface>
            )}
        </>
    )
}