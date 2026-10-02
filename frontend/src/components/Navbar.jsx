import React from 'react';
import { Shield, Sparkles, Activity, BookOpen, BarChart3, AlertCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const isLiveGemini = healthInfo?.hasGeminiKey;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070A12]/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('analyzer')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-glow-cyan">
            <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center group-hover:bg-[#101726] transition-colors">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                ScamShield<span className="text-cyan-400 font-mono">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                Hackathon Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              AI-Powered Scam & Phishing Defense
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'analyzer'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 hidden md:flex ${
              activeTab === 'guide'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Red Flag Guide</span>
          </button>
        </nav>

        {/* Engine Status Indicator */}
        <div className="flex items-center gap-2">
          {isLiveGemini ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">Gemini AI Active</span>
              <span className="sm:hidden">Gemini</span>
            </div>
          ) : (
            <div 
              title="Demo Mode: Gemini API Key not set. Using built-in realistic mock analyzer."
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="hidden sm:inline">Demo Sandbox Mode</span>
              <span className="sm:hidden">Demo</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
