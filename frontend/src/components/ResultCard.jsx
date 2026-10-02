import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Link as LinkIcon,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Info,
  CheckCircle,
  EyeOff,
  Baby,
  Cpu,
} from 'lucide-react';
import {
  getRiskLevelConfig,
  buildHighlightedSegments,
  generatePlainTextReport,
} from '../utils/helpers';

export default function ResultCard({
  result,
  originalText,
  onReset,
  onAnalyzeAnother,
}) {
  const [explainNewbieMode, setExplainNewbieMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (!result) return null;

  const riskConfig = getRiskLevelConfig(result.riskLevel, result.riskScore, result.category);
  const highlightedSegments = buildHighlightedSegments(
    originalText,
    result.suspiciousElements || []
  );

  const handleCopyReport = async () => {
    const report = generatePlainTextReport(result, originalText);
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      id="analysis-result-card"
      className={`glass-panel rounded-2xl border ${riskConfig.cardBorder} p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
    >
      {/* Top ambient color glow */}
      <div
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl pointer-events-none opacity-20 ${
          result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH'
            ? 'bg-rose-500'
            : result.riskLevel === 'MEDIUM'
            ? 'bg-amber-500'
            : 'bg-emerald-500'
        }`}
      />

      {/* HEADER SECTION: Risk Badge, Score Meter, Mode Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          {/* Animated Gauge Ring / Risk Icon */}
          <div className="relative flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke={riskConfig.ringColor}
                strokeWidth="6"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * result.riskScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-white font-mono leading-none">
                {result.riskScore}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5">
                / 100
              </span>
            </div>
          </div>

          {/* Risk Level & Category info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider border uppercase flex items-center gap-1.5 ${riskConfig.badgeBg}`}
              >
                {result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH' ? (
                  <ShieldAlert className="w-3.5 h-3.5" />
                ) : result.riskLevel === 'MEDIUM' ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5" />
                )}
                <span>{riskConfig.label}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {result.category}
              </span>

              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                Confidence: <strong className="text-slate-200">{result.confidence}</strong>
              </span>

              {result.isDemoResult && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  🧪 Demo Simulation
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Evaluated using Gemini threat classification heuristics
            </p>
          </div>
        </div>

        {/* Explain Like I'm New Toggle Switch */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl self-stretch md:self-auto justify-between">
          <div className="flex items-center gap-2 pl-2">
            <Baby className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-200">
                Explain Like I'm New
              </div>
              <div className="text-[10px] text-slate-400">
                Plain English translation
              </div>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={explainNewbieMode}
            onClick={() => setExplainNewbieMode(!explainNewbieMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              explainNewbieMode ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                explainNewbieMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* SUMMARY BANNER */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Assessment</span>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          {result.summary}
        </p>
      </div>

      {/* "EXPLAIN LIKE I'M NEW" PLAIN ENGLISH CARD (WHEN TOGGLED) */}
      {explainNewbieMode && result.explainLikeImNew && (
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border border-cyan-500/40 shadow-glow-cyan animate-in fade-in">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3">
            <Baby className="w-4 h-4" />
            <span>Plain English Translation (No Cybersecurity Jargon)</span>
          </div>

          <div className="p-3.5 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-100 text-sm font-semibold mb-4">
            💡 {result.explainLikeImNew.headline}
          </div>

          {result.explainLikeImNew.simpleBreakdown && result.explainLikeImNew.simpleBreakdown.length > 0 ? (
            <div className="space-y-3 mb-4">
              {result.explainLikeImNew.simpleBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 mb-0.5">
                      {item.point}
                    </div>
                    <div className="text-slate-300 leading-relaxed">
                      {item.plainExplanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-emerald-500/30 text-xs sm:text-sm text-emerald-300 mb-4 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No deceptive tricks, artificial urgency, or scam manipulation patterns detected in this message.</span>
            </div>
          )}

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 font-bold text-xs">
              Action
            </div>
            <div className="text-xs sm:text-sm text-slate-200">
              <strong className="text-emerald-400">The Bottom Line:</strong>{' '}
              {result.explainLikeImNew.bottomLine}
            </div>
          </div>
        </div>
      )}

      {/* HIGHLIGHTED SUSPICIOUS PHRASES INSPECTOR */}
      {result.suspiciousElements && result.suspiciousElements.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>🔍 Suspicious Phrases Highlighted</span>
              <span className="text-[10px] text-slate-500 font-sans normal-case">
                (Click or hover a highlighted phrase to inspect why it's flagged)
              </span>
            </h4>
          </div>

          <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap relative">
            {highlightedSegments.map((segment, idx) => {
              if (!segment.isHighlighted) {
                return <span key={idx} className="text-slate-300">{segment.text}</span>;
              }
              const isTooltipActive = activeTooltip === idx;

              return (
                <span
                  key={idx}
                  onClick={() => setActiveTooltip(isTooltipActive ? null : idx)}
                  onMouseEnter={() => setActiveTooltip(idx)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="relative inline-block cursor-pointer bg-rose-500/20 text-rose-300 border-b-2 border-rose-500 px-1 py-0.5 rounded-sm font-semibold transition-colors hover:bg-rose-500/30"
                >
                  {segment.text}

                  {/* Popover Tooltip */}
                  {isTooltipActive && segment.reason && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-slate-900 border border-rose-500/50 text-white text-[11px] shadow-2xl z-30 font-sans leading-normal normal-case block pointer-events-none">
                      <span className="font-bold text-rose-400 block mb-1">
                        🚩 Flagged Phrase:
                      </span>
                      {segment.reason}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* RED FLAGS ACCORDION / LIST */}
      <div className="mt-6">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>🚩 Identified Red Flags ({result.redFlags?.length || 0})</span>
        </h4>

        {result.redFlags && result.redFlags.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {result.redFlags.map((flag, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      flag.severity === 'HIGH'
                        ? 'bg-rose-500/10 text-rose-400'
                        : flag.severity === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200 mb-1">
                      {flag.indicator}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {flag.explanation}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold shrink-0 ${
                    flag.severity === 'HIGH'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : flag.severity === 'MEDIUM'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {flag.severity}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-slate-200">No Scam Red Flags Detected</div>
              <div className="text-slate-400 text-xs mt-0.5">This text does not exhibit artificial urgency, credential requests, upfront fee traps, or fraudulent demands.</div>
            </div>
          </div>
        )}
      </div>

      {/* EXTRACTED URLS STATIC INSPECTION (IF PRESENT) */}
      {result.extractedUrls && result.extractedUrls.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Extracted URL Safety & Visible Traits ({result.extractedUrls.length})</span>
            </h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <EyeOff className="w-3 h-3 text-blue-400" />
              <span>Static Inspection Only - Never Visited</span>
            </span>
          </div>

          <div className="space-y-3">
            {result.extractedUrls.map((urlItem, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#0B0F19] border border-slate-800 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-slate-300 break-all">
                    {urlItem.rawUrl}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      urlItem.overallRisk === 'SUSPICIOUS'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : urlItem.overallRisk === 'CAUTION'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {urlItem.overallRisk}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-400 py-1.5 border-y border-slate-800/80 mb-2">
                  <div>
                    Host:{' '}
                    <span className="text-slate-200">{urlItem.hostname}</span>
                  </div>
                  <div>
                    Protocol:{' '}
                    <span className="text-slate-200">{urlItem.protocol}</span>
                  </div>
                  <div>
                    Shortener:{' '}
                    <span className={urlItem.isShortener ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {urlItem.isShortener ? 'YES' : 'NO'}
                    </span>
                  </div>
                  <div>
                    IP Host:{' '}
                    <span className={urlItem.isIpAddress ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {urlItem.isIpAddress ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>

                {urlItem.redFlags?.length > 0 ? (
                  <div className="space-y-1">
                    {urlItem.redFlags.map((rf, rIdx) => (
                      <div key={rIdx} className="text-slate-400 flex items-start gap-1.5 text-[11px]">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>
                          <strong className="text-slate-300">{rf.flag}:</strong>{' '}
                          {rf.description}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>No abnormal structural red flags detected in domain syntax.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED ACTIONS */}
      <div className="mt-6">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>🛡️ Recommended Safety Actions</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.recommendedActions?.map((action, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SAFETY ADVISORY NOTICE */}
      <div className="mt-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong className="text-slate-300">Safety Notice:</strong> {result.safetyNotice}
        </span>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyReport}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onAnalyzeAnother}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-glow-cyan flex items-center gap-2"
        >
          <span>Analyze Another Message</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
