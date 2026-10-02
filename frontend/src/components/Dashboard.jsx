import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Activity,
  RefreshCw,
  Clock,
  Layers,
  Flame,
  Lock,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { getDashboardStats, resetDashboard } from '../services/api';
import { formatTimeAgo, getRiskLevelConfig } from '../utils/helpers';

export default function Dashboard({ onLoadSnippet }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetting, setResetting] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset demo history metrics?')) return;
    try {
      setResetting(true);
      await resetDashboard();
      await fetchStats();
    } catch (err) {
      alert('Failed to reset history: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="glass-panel rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono">Loading threat intelligence metrics...</p>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="glass-panel rounded-2xl border border-rose-500/30 p-8 text-center text-rose-300">
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const {
    totalAnalyses = 0,
    highRiskCount = 0,
    averageRiskScore = 0,
    commonCategories = [],
    recentAnalyses = [],
  } = stats || {};

  const highRiskPercentage =
    totalAnalyses > 0 ? Math.round((highRiskCount / totalAnalyses) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>Threat Intelligence Dashboard</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time aggregate detection telemetry across analyzed messages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            disabled={resetting}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-colors flex items-center gap-1.5"
            title="Clear history"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyses */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Total Scanned</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono mb-1">
            {totalAnalyses}
          </div>
          <div className="text-[11px] text-slate-400">
            Messages & snippets processed
          </div>
        </div>

        {/* High Risk Detections */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-rose-300">High Risk Detections</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-rose-400 font-mono">
              {highRiskCount}
            </span>
            <span className="text-xs font-mono text-rose-400/80">
              ({highRiskPercentage}%)
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Critical or High threat levels
          </div>
        </div>

        {/* Average Threat Score */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Avg Threat Score</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono mb-1">
            {averageRiskScore} <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Mean severity index
          </div>
        </div>

        {/* Privacy Metric */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Data Redaction</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-1">
            100%
          </div>
          <div className="text-[11px] text-slate-400">
            Zero credentials or OTPs stored
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: Category Breakdown & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Common Scam Categories (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Common Scam Categories</span>
          </h3>

          {commonCategories.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No categories recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {commonCategories.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-300">{item.category}</span>
                    <span className="font-mono text-slate-400">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${Math.max(5, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Analyses Log (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Analyses Feed</span>
            </span>
            <span className="text-[10px] text-slate-500 normal-case font-sans">
              (Scrubbed 40-char snippets)
            </span>
          </h3>

          {recentAnalyses.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">No recent analyses recorded.</p>
          ) : (
            <div className="space-y-2.5">
              {recentAnalyses.map((item) => {
                const conf = getRiskLevelConfig(item.riskLevel);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${conf.badgeBg}`}
                      >
                        {item.riskLevel}
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-slate-200 truncate">
                          {item.snippet || 'Snippet redacted'}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>Score: {item.riskScore}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(item.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
