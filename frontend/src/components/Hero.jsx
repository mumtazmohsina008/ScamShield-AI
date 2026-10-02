import React from 'react';
import { ShieldCheck, Lock, EyeOff, Sparkles, AlertTriangle } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-8 pb-6 sm:pt-12 sm:pb-8 text-center max-w-4xl mx-auto px-4">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Gemini AI Scam & Phishing Detection Engine</span>
      </div>

      {/* Primary Tagline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        Detect the red flags before they{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
          become a threat.
        </span>
      </h1>

      {/* Short Product Description */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
        Paste any suspicious SMS, WhatsApp message, email, job offer, or website snippet. 
        ScamShield AI diagnoses deceptive cues, extracts threat indicators, and explains the danger in plain English everyone can understand.
      </p>

      {/* Safety & Trust Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
        <div className="glass-panel p-3 rounded-xl border border-slate-800/90 flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Zero Password Log</div>
            <div className="text-[11px] text-slate-400">Credentials never stored</div>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl border border-slate-800/90 flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Safe Static URLs</div>
            <div className="text-[11px] text-slate-400">Links are never visited</div>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl border border-slate-800/90 flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Plain English</div>
            <div className="text-[11px] text-slate-400">Zero confusing jargon</div>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl border border-slate-800/90 flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Multi-Signal AI</div>
            <div className="text-[11px] text-slate-400">Urgency, spoofing & fraud</div>
          </div>
        </div>
      </div>
    </div>
  );
}
