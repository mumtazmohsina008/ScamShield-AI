import React from 'react';
import {
  AlertTriangle,
  Clock,
  Lock,
  Gift,
  Briefcase,
  TrendingUp,
  Link,
  MessageSquare,
  Shield,
  CheckCircle2,
} from 'lucide-react';

const RED_FLAGS_CATALOG = [
  {
    icon: Clock,
    title: '1. Artificial Urgency & Countdown Timers',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    description:
      'Phrases like "Urgent: 2 hours left", "Account will be permanently deleted", or "Immediate action required".',
    whyDangerous:
      'Scammers use time pressure to bypass your natural analytical thinking and force panic decisions before you can verify.',
    safeAction: 'Step back and breathe. Legitimate institutions do not delete accounts on 2-hour ultimatums.',
  },
  {
    icon: Lock,
    title: '2. Requests for Passwords, OTPs, or PINs',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    description:
      'Anyone asking you to read back a 6-digit text code, password, or security answer over chat or phone.',
    whyDangerous:
      'One-time passwords (OTPs) are meant exclusively for your eyes. Sharing them allows attackers to reset your logins.',
    safeAction: 'Never read or send OTPs to anyone. Banks explicitly state their staff will never ask for your code.',
  },
  {
    icon: Link,
    title: '3. Lookalike URLs & Unusual Domain Endings',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    description:
      'Domains like "chase-security-login.xyz", "apple-support.rest", or shortened bit.ly links that hide the true destination.',
    whyDangerous:
      'Attackers create clone websites that visually mimic legitimate login pages down to the pixel to harvest credentials.',
    safeAction: 'Never click unsolicited links. Navigate directly by typing the official address or using your saved app.',
  },
  {
    icon: Gift,
    title: '4. The "Advance-Fee" Lottery / Prize Hook',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    description:
      'Announcements that you won a $1,000 gift card, iPhone, or lottery draw you never entered, asking for a small "$4.99 shipping fee".',
    whyDangerous:
      'Once you pay the small fee, attackers steal your credit card details or enroll you in unauthorized monthly recurring charges.',
    safeAction: 'If you did not enter a raffle or contest, you cannot win it. Delete and report the message.',
  },
  {
    icon: Briefcase,
    title: '5. Work-From-Home Task Scams',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    description:
      'Offers of $300-$800/day for 30 minutes of "clicking product reviews", moving the conversation to Telegram or WhatsApp.',
    whyDangerous:
      'Victims are tricked into paying their own money as a "deposit" to unlock high-tier tasks that can never be withdrawn.',
    safeAction: 'Real companies conduct structured interviews and do not manage business payroll through Telegram handles.',
  },
  {
    icon: TrendingUp,
    title: '6. Guaranteed Investment Returns (Zero Risk)',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    description:
      'Promises of guaranteed 10%-25% daily compounding profits via "quantum AI bots" or private crypto trading syndicates.',
    whyDangerous:
      'All legitimate financial markets have inherent risk. Any promise of guaranteed returns with zero risk is Ponzi fraud.',
    safeAction: 'Never send cryptocurrency or wire funds to unregistered financial advisers on social media.',
  },
];

export default function RedFlagGuide() {
  return (
    <div className="space-y-8 animate-in fade-in max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>ScamShield Educational Defense</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          The Essential Scam Red Flag Guide
        </h2>
        <p className="text-sm text-slate-300">
          Recognize the psychological manipulation patterns scammers use so you never fall victim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RED_FLAGS_CATALOG.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                {item.description}
              </p>

              <div className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-rose-400">Why it's dangerous:</strong>{' '}
                {item.whyDangerous}
              </div>

              <div className="text-xs text-slate-300 flex items-start gap-2 pt-2 border-t border-slate-800/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-emerald-400">Safe Rule:</strong>{' '}
                  {item.safeAction}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
