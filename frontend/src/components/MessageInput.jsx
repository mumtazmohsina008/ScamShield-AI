import React, { useState } from 'react';
import { Shield, Sparkles, Clipboard, Trash2, AlertCircle, Lock, EyeOff } from 'lucide-react';

const MAX_CHARS = 5000;

export default function MessageInput({
  text,
  setText,
  onAnalyze,
  isLoading,
  error,
  setError,
  isDemoMode,
}) {
  const [copiedNotice, setCopiedNotice] = useState(false);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText.substring(0, MAX_CHARS));
        setError(null);
      }
    } catch {
      // Fallback if clipboard permissions denied
      alert('Unable to access clipboard automatically. Please paste using Ctrl+V / Cmd+V.');
    }
  };

  const handleClear = () => {
    setText('');
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || text.trim().length < 5) {
      setError('Please enter or paste at least 5 characters to analyze.');
      return;
    }
    setError(null);
    onAnalyze();
  };

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6 mb-8 shadow-2xl relative overflow-hidden">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <label htmlFor="message-textarea" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Suspicious Message or Link Content</span>
          <span className="text-[11px] font-normal text-slate-400">
            (SMS, WhatsApp, email, job DM, or website text)
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5"
          >
            <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Paste</span>
          </button>

          {text && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          id="message-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          disabled={isLoading}
          rows={5}
          placeholder="Paste the suspicious message here... Example: 'URGENT: Your bank account will be suspended in 2 hours. Click here to verify identity: http://secure-bank-login.xyz'"
          className={`w-full p-4 rounded-xl bg-[#090D16] border text-slate-100 placeholder-slate-500 font-sans text-sm sm:text-base focus:outline-none transition-all resize-y min-h-[140px] ${
            error
              ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
              : 'border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40'
          }`}
        />

        {/* Character Count */}
        <div className="absolute right-3 bottom-3 text-[11px] font-mono pointer-events-none px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800/80">
          <span className={isOverLimit ? 'text-rose-400 font-bold' : 'text-slate-400'}>
            {charCount.toLocaleString()}
          </span>
          <span className="text-slate-600"> / {MAX_CHARS.toLocaleString()}</span>
        </div>
      </div>

      {/* Validation Error Message */}
      {error && (
        <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Privacy Note Banner */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-slate-300 font-medium">Privacy Guaranteed:</strong> Untrusted text is strictly evaluated in passive memory. Passwords, PINs, and full text are never retained.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
          <EyeOff className="w-3.5 h-3.5 text-blue-400" />
          <span>Zero External Network Pings</span>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          {isDemoMode && (
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
              💡 Demo Mode Enabled
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg ${
            isLoading || !text.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-glow-cyan hover:shadow-cyan-500/40 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Threat Signals...</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 fill-current" />
              <span>Analyze with AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
