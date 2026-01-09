import { Bot, User, ShieldCheck } from 'lucide-react';

export default function GuardianChat({ status }) {
  if (status === "CONNECTING") return null;

  return (
    <div className="absolute top-24 left-4 right-4 z-40 flex flex-col gap-2">
      {/* The Guardian's Automated Interception */}
      <div className="flex gap-2 animate-fade-in-up">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot size={16} />
        </div>
        <div className="bg-blue-900/80 p-3 rounded-r-xl rounded-bl-xl text-xs backdrop-blur-md border border-blue-500/30">
          <span className="font-bold block text-blue-300 mb-1">Guardian Agent</span>
          {status === "ACTIVE" 
            ? "Identity Verified via Entra. Context checked against Outlook Calendar: 'Grandson is in London'. Call Allowed."
            : "INTERCEPTION: Caller failed biometric challenge. Deepfake probability 98%. Blocking audio channel."
          }
        </div>
      </div>
    </div>
  );
}   