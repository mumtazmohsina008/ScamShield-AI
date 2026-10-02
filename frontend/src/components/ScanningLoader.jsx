import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Search, CheckCircle2, Lock } from 'lucide-react';

const SCAN_STEPS = [
  'Sanitizing untrusted input against prompt injections...',
  'Evaluating social engineering & urgency cues...',
  'Inspecting brand impersonation & lookalike domains...',
  'Extracting static URL traits (zero outbound network requests)...',
  'Translating findings into plain English...',
];

export default function ScanningLoader() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % SCAN_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl border border-cyan-500/30 p-8 sm:p-12 mb-8 text-center relative overflow-hidden shadow-glow-cyan animate-in fade-in zoom-in-95">
      {/* Decorative cyber scan line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />

      {/* Radar scanning circle */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse" />
        <div className="w-full h-full rounded-full bg-cyan-950/40 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <Shield className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
        Scanning Message for Scam Indicators
      </h3>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
        ScamShield AI is analyzing the linguistic, structural, and domain markers of this message.
      </p>

      {/* Stepper text */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>{SCAN_STEPS[currentStepIndex]}</span>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {SCAN_STEPS.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentStepIndex
                ? 'w-6 bg-cyan-400'
                : idx < currentStepIndex
                ? 'w-2 bg-cyan-600/60'
                : 'w-2 bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
