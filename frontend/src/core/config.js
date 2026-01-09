export const Settings = {
    // Feature Flags
    ENABLE_REALTIME_RADAR: true,
    ENABLE_AUDIO_SIM: true,

    // API Endpoints
    API_BASE: `http://${window.location.hostname}:8000/api/v1`,

    // UI Constants
    THEME: {
        primary: 'blue',
        alert: 'red',
        safe: 'green'
    },

    // Asset Paths
    ASSETS: {
        RING_TONE: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
        SCAM_VOICE: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav" // Placeholder
    }
};
