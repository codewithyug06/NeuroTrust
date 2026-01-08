import { useState, useEffect, useRef } from 'react'
import { Eye, Smartphone, Book, Settings, Mic, Volume2, Home } from 'lucide-react'
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import PhoneInterface from './components/PhoneInterface';
import CallScreen from './components/CallScreen';
import GuardianOverlay from './components/GuardianOverlay';
import SettingsModal from './components/SettingsModal'; // New Import
import { Settings as Config } from './core/config';

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

    // AUDIO SIMULATION REFS
    const ringAudio = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"));
    const voiceAudio = useRef(null);

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

    // --- TRIGGER CALL ---
    const triggerIncomingCall = (safeMode) => {
        setIsSafeMode(safeMode);
        setCallStatus("RINGING");
        setAgentName(safeMode ? "Bank of America Support" : "Unknown Number");
        setMemoryRecall(null);
        setGraphContext(null);
        setDeviceFingerprint(null);
        setTrustScore(null);
        setIntentFlag(null);
        setMoodScore(98);
        ringAudio.current.loop = true;
        ringAudio.current.play().catch(e => console.log("Audio blocked:", e));
        if (!safeMode && navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
    };

    const handleReject = () => {
        setCallStatus("IDLE");
        ringAudio.current.pause();
        ringAudio.current.currentTime = 0;
    }

    const handleAnswer = () => {
        setCallStatus("CONNECTED");
        ringAudio.current.pause();
        ringAudio.current.currentTime = 0;
    }

    // --- VERITY SEQUENCE ---
    const handleVerify = async () => {
        if (!walletConnected && !elderlyMode) {
            setShowQrScan(true);
            return;
        }

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
                    const response = await fetch(`${API_URL}/analyze-stream`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ scenario: isSafeMode ? "SAFE" : "DEEPFAKE" })
                    });
                    if (!response.ok) throw new Error("Backend offline");
                    data = await response.json();
                } catch (e) {
                    console.warn("Backend unavailable, using mock data for demo.");
                    data = isSafeMode ? {
                        mood_score: 98,
                        biometrics: { blink_rate: 18, head_yaw: 2 },
                        device_fingerprint: { model: "iPhone 15 Pro Max" },
                        safety_score: 99,
                        verdict: "AUTHENTIC_MEDIA"
                    } : {
                        mood_score: 12,
                        biometrics: { blink_rate: 4, head_yaw: 0 },
                        device_fingerprint: { model: "Unknown Emulator" },
                        safety_score: 15,
                        verdict: "DEEPFAKE_DETECTED"
                    };
                }

                if (data.mood_score) setMoodScore(data.mood_score);
                if (data.biometrics) setBiometrics(data.biometrics);
                if (data.device_fingerprint?.model) setDeviceFingerprint(data.device_fingerprint.model);

                setTrustScore(data.safety_score);

                if (data.verdict === "AUTHENTIC_MEDIA" && isSafeMode) {
                    setCallStatus("ACTIVE");
                    setVerdictReason("Identity Confirmed");
                } else {
                    setCallStatus("ACTIVE");
                    setVerdictReason("Deepfake Detected");
                    setTimeout(() => setCallStatus("GUARDIAN_INTERVENTION"), 2000);
                }
            } catch (error) {
                console.error("Critical Failure:", error);
                setCallStatus("BLOCKED");
            }
        }, 1500);
    };


    // --- ROUTING ---
    if (view === "DASHBOARD") return <Dashboard onBack={() => setView("LANDING")} />;
    if (view === "LANDING") return <LandingPage onLaunchDemo={() => setView("PHONE")} onLaunchDashboard={() => setView("DASHBOARD")} />;

    // --- PHONE UI ---
    return (
        <PhoneInterface
            isMobile={isMobile}
            statusBar={{ agentName, deviceFingerprint, graphContext }}
            onSettingsClick={() => setShowSettings(true)}
            desktopControls={
                !isMobile && (
                    <div className="glass-panel p-6 rounded-3xl w-80 animate-fade-in-up z-50">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs text-blue-400 font-bold tracking-widest uppercase">Simulation Controls</span>
                            <Settings className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        </div>

                        <div className="flex items-center justify-between mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Elderly Mode</span>
                                <span className="text-[10px] text-gray-400">Simplified Interface</span>
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
                            onClick={() => setView("LANDING")}
                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:text-white"
                        >
                            <Home className="w-3 h-3" /> RETURN HOME
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
                        <div className="text-3xl font-bold mb-8">Recents</div>
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
                                    <div className="font-bold">Mom</div>
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
            />

            <GuardianOverlay
                isSafeMode={isSafeMode}
                callStatus={callStatus}
                elderlyMode={elderlyMode}
                trustScore={trustScore}
                moodScore={moodScore}
                verdictReason={verdictReason}
                intentFlag={intentFlag}
                captions={captions}
                graphContext={graphContext}
                statusBar={{ deviceFingerprint }}
                biometrics={biometrics}
                callerImage={isSafeMode ? CALLER_IMAGES.SAFE : CALLER_IMAGES.FAKE} // Pass Image
            />

            {/* SETTINGS MODAL */}
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

            {/* QR MODAL */}
            {
                showQrScan && (
                    <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur flex flex-col items-center justify-center p-6 animate-fade-in">
                        <div className="bg-white p-4 rounded-xl mb-4"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AEGIS_ENTRA_VERIFY_INIT" className="w-40 h-40" /></div>
                        <h3 className="text-lg font-bold text-white mb-6">Scan with Entra Wallet</h3>
                        <button onClick={() => { setWalletConnected(true); setShowQrScan(false); handleVerify(); }} className="w-full py-4 bg-blue-600 rounded-xl font-bold">SIMULATE SCAN</button>
                        <button onClick={() => setShowQrScan(false)} className="mt-4 text-gray-500 text-xs">Cancel</button>
                    </div>
                )
            }

            {/* DESKTOP CONTROLS - Now Glassmorphized */}

        </PhoneInterface >
    )
}