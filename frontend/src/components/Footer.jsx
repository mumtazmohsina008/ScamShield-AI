import React from 'react';
import { Shield, Lock, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070A12] mt-16 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300 font-sans">
              ScamShield AI
            </span>
            <span className="text-slate-600">|</span>
            <span>Intelligent Scam & Phishing Analysis Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Zero Credential Retention</span>
            </span>
            <span>•</span>
            <span>Passive Static Link Inspection</span>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
          <strong className="text-slate-300">Disclaimer:</strong> ScamShield AI is an educational advisory tool designed to highlight common deceptive patterns in electronic messages. It does not provide legal advice or an absolute security guarantee. If you suspect an attempt at financial fraud, contact the relevant financial institution directly through their verified official channels or report it to local cybercrime authorities.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-500">
          <div>
            Built with React, Vite, Tailwind CSS, Express, and Google Gemini AI.
          </div>
          <div>
            Hackathon Demo Project • ScamShield AI
          </div>
        </div>
      </div>
    </footer>
  );
}
