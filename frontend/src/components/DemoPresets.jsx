import React from 'react';
import { Landmark, Gift, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';

const PRESETS = [
  {
    id: 'bank-verification',
    title: 'Fake Bank Verification',
    category: 'Credential theft',
    icon: Landmark,
    accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    hover: 'hover:border-rose-500/50',
    description: 'Urgent notice claiming frozen Chase account with spoofed verification link.',
    text: 'URGENT from Chase Bank Security: Your account has been temporarily restricted due to unauthorized login attempts from IP 185.220.101.5. To restore full access and prevent permanent suspension within 12 hours, verify your identity immediately at https://chase-security-restore.xyz/verify-login?id=8923. Do not share your OTP.',
  },
  {
    id: 'fake-prize',
    title: 'Fake Prize / Giveaway',
    category: 'Fake prize/giveaway',
    icon: Gift,
    accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    hover: 'hover:border-amber-500/50',
    description: 'iPhone 16 Pro lottery notification asking for a $4.99 "customs fee".',
    text: 'CONGRATULATIONS!! Your mobile number has been selected as the 1st prize winner of a brand new Apple iPhone 16 Pro Max + $2,500 Amazon Gift Voucher in the International Mega Draw #8841! Claim your prize within 24 hours by paying a minor courier customs clearance fee of $4.99 at https://bit.ly/apple-claim-winner2025. Unclaimed prizes will be forfeited!',
  },
  {
    id: 'job-scam',
    title: 'Work-From-Home Job Scam',
    category: 'Job scam',
    icon: Briefcase,
    accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    hover: 'hover:border-blue-500/50',
    description: 'Offers $600/day for 30 mins task review and moves talk to Telegram.',
    text: 'Hi! I am Sarah from Global Talent HR Solutions. We reviewed your profile and are thrilled to offer you a flexible remote position as an Online Product Review Optimizer! Work only 30-45 minutes a day from home and earn $250 - $600 daily paid directly via USDT/Crypto or PayPal. No experience required. To activate your employee portal and begin training tasks today, contact our HR manager on Telegram: @GlobalTaskHR_Sarah.',
  },
  {
    id: 'investment-opportunity',
    title: 'Crypto Investment Scam',
    category: 'Investment scam',
    icon: TrendingUp,
    accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    hover: 'hover:border-purple-500/50',
    description: 'Quantum AI trading bot promising guaranteed 25% daily returns with zero risk.',
    text: 'EXCLUSIVE INVITATION: Join our elite Crypto Arbitrage AI Trading Club. Our proprietary quantum algorithmic bot guarantees 15% to 25% DAILY compounded returns with ZERO RISK. Investors who started with $500 last month are already withdrawing over $25,000. Limited slots for beta access! Deposit minimum 0.05 BTC to start your passive income stream today. WhatsApp VIP desk: +1-829-555-0199.',
  },
];

export default function DemoPresets({ onSelectPreset, currentText }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <span>⚡ Try Demo Samples (Click to Load)</span>
        </span>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Ready-to-analyze real-world scam patterns
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isSelected = currentText.trim().startsWith(preset.text.trim().substring(0, 30));

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.text)}
              className={`text-left p-3.5 rounded-xl border transition-all glass-panel glass-panel-hover group ${
                isSelected
                  ? 'border-cyan-400/70 bg-cyan-950/40 shadow-glow-cyan'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg border ${preset.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                  {preset.category}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors mb-1 flex items-center justify-between">
                <span>{preset.title}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-cyan-400" />
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
