/**
 * Mock Demo Analysis Service
 * Provides authentic, high-fidelity mock results for demo samples
 * and intelligent heuristic fallback aligning strictly with ScamShield AI classification rules.
 */

export const DEMO_PRESETS = [
  {
    id: 'bank-verification',
    title: 'Fake Bank / Account Verification',
    category: 'Credential theft',
    text: 'URGENT from Chase Bank Security: Your account has been temporarily restricted due to unauthorized login attempts from IP 185.220.101.5. To restore full access and prevent permanent suspension within 12 hours, verify your identity immediately at https://chase-security-restore.xyz/verify-login?id=8923. Do not share your OTP.',
    expectedResult: {
      riskScore: 94,
      riskLevel: 'CRITICAL',
      category: 'Credential theft',
      summary: 'Likely high-risk phishing attack impersonating Chase Bank. Uses artificial urgency and fear of account suspension to trick the recipient into clicking a fraudulent lookalike domain designed to steal credentials and banking codes.',
      confidence: 'HIGH',
      redFlags: [
        {
          indicator: 'Artificial Panic & Time Limit',
          explanation: 'Imposes a strict 12-hour deadline to induce panic so the victim acts before verifying the legitimacy of the request.',
          severity: 'HIGH',
        },
        {
          indicator: 'Spoofed Brand Domain (.xyz TLD)',
          explanation: 'The link "chase-security-restore.xyz" is not the authentic Chase domain (chase.com) and uses a cheap .xyz TLD commonly used in disposable phishing operations.',
          severity: 'HIGH',
        },
        {
          indicator: 'Account Restriction Threat',
          explanation: 'Claims account is restricted due to suspicious IP login, a classic social engineering pretext to manipulate fear.',
          severity: 'MEDIUM',
        },
      ],
      suspiciousElements: [
        { text: 'URGENT from Chase Bank Security', reason: 'False authority and urgency cue designed to trigger fear' },
        { text: 'within 12 hours', reason: 'High-pressure countdown tactic to prevent rational cross-checking' },
        { text: 'https://chase-security-restore.xyz/verify-login?id=8923', reason: 'Unverified spoofed domain masquerading as Chase' },
      ],
      recommendedActions: [
        'Do not click the link or input your username, password, or security PINs.',
        'Open your official Chase mobile app or browser bookmark to check your account status safely.',
        'Call the official customer service number printed directly on the back of your debit/credit card.',
        'Forward the SMS to 7726 (SPAM) to notify telecom security providers.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This message is a fake bank notice trying to steal your login credentials.',
        simpleBreakdown: [
          {
            point: 'Creating Fake Rush',
            plainExplanation: 'They give you a 12-hour deadline so you panic and tap the link before thinking.',
          },
          {
            point: 'Fake Website Address',
            plainExplanation: 'Chase owns "chase.com", not "chase-security-restore.xyz". Scammers set up copycat websites that look identical to real banks.',
          },
          {
            point: 'Fear of Being Locked Out',
            plainExplanation: 'Threatening that your money or account will be frozen is the #1 trick scammers use to get fast reactions.',
          },
        ],
        bottomLine: 'Do not click anything. If you are worried, check your official bank app directly.',
      },
    },
  },
  {
    id: 'fake-prize',
    title: 'Fake Prize / Giveaway',
    category: 'Fake prize/giveaway',
    text: 'CONGRATULATIONS!! Your mobile number has been selected as the 1st prize winner of a brand new Apple iPhone 16 Pro Max + $2,500 Amazon Gift Voucher in the International Mega Draw #8841! Claim your prize within 24 hours by paying a minor courier customs clearance fee of $4.99 at https://bit.ly/apple-claim-winner2025. Unclaimed prizes will be forfeited!',
    expectedResult: {
      riskScore: 90,
      riskLevel: 'CRITICAL',
      category: 'Fake prize/giveaway',
      summary: 'Likely advance-fee fraud masquerading as an international giveaway. Uses promises of high-value gifts to extract payment details under the guise of an upfront fee.',
      confidence: 'HIGH',
      redFlags: [
        {
          indicator: 'Advance-Fee Scam Pattern',
          explanation: 'Requires an upfront payment ($4.99) to claim a supposed prize. Legitimate contests never require payment or credit card details to receive winnings.',
          severity: 'HIGH',
        },
        {
          indicator: 'Unsolicited Win Claim',
          explanation: 'Recipient never entered this draw; claiming a random mobile number won an international lottery is a standard lure.',
          severity: 'HIGH',
        },
        {
          indicator: 'Obfuscated Short URL',
          explanation: 'Uses bit.ly URL shortener to hide the real destination website.',
          severity: 'MEDIUM',
        },
      ],
      suspiciousElements: [
        { text: 'CONGRATULATIONS!! Your mobile number has been selected', reason: 'Unsolicited prize hook aimed at triggering excitement' },
        { text: 'paying a minor courier customs clearance fee of $4.99', reason: 'Advance fee trap to harvest credit card and CVV details' },
        { text: 'https://bit.ly/apple-claim-winner2025', reason: 'Shortened URL concealing untrusted destination' },
      ],
      recommendedActions: [
        'Never pay money or provide credit card information to receive any prize or lottery.',
        'Delete the message and block the sender phone number / handle.',
        'Remember the universal rule: If you did not enter a contest, you cannot win it.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This is a fake prize scam trying to trick you into paying a fee.',
        simpleBreakdown: [
          {
            point: 'You Cannot Win What You Never Entered',
            plainExplanation: 'If you didn\'t sign up for a lottery, nobody is giving you a free $1,200 phone or cash.',
          },
          {
            point: 'The "Small Fee" Trap',
            plainExplanation: 'They ask for a small fee so it seems harmless. But once you pay, they steal your money and card details.',
          },
        ],
        bottomLine: 'Do not pay any fee or share bank details. You did not win this prize; it is an advance-fee scam.',
      },
    },
  },
  {
    id: 'job-scam',
    title: 'Work-From-Home Job Scam',
    category: 'Job scam',
    text: 'Hi! I am Sarah from Global Talent HR Solutions. We reviewed your profile and are thrilled to offer you a flexible remote position as an Online Product Review Optimizer! Work only 30-45 minutes a day from home and earn $250 - $600 daily paid directly via USDT/Crypto or PayPal. No experience required. To activate your employee portal and begin training tasks today, contact our HR manager on Telegram: @GlobalTaskHR_Sarah.',
    expectedResult: {
      riskScore: 84,
      riskLevel: 'CRITICAL',
      category: 'Job scam',
      summary: 'Likely "task scam" and employment impersonation fraud. Promises unrealistic compensation ($300+/day for 30 minutes of simple work) with no interview or qualifications, steering the conversation to encrypted Telegram channels.',
      confidence: 'HIGH',
      redFlags: [
        {
          indicator: 'Unrealistic Pay-to-Effort Ratio',
          explanation: 'Offering high daily earnings for 30 minutes of low-skill tasks is economically impossible for legitimate employers.',
          severity: 'HIGH',
        },
        {
          indicator: 'Redirection to Encrypted Messaging (Telegram)',
          explanation: 'Scammers shift victims off legitimate professional platforms onto Telegram or WhatsApp to evade monitoring and law enforcement.',
          severity: 'HIGH',
        },
        {
          indicator: 'Crypto / USDT Payment Mentions',
          explanation: 'Mentions of cryptocurrency payroll for introductory entry-level micro-tasks is a standard marker of task deposit scams.',
          severity: 'MEDIUM',
        },
      ],
      suspiciousElements: [
        { text: 'earn $250 - $600 daily', reason: 'Absurdly inflated compensation designed to bait job seekers' },
        { text: 'Work only 30-45 minutes a day', reason: 'Unrealistic low effort promise common in fraudulent job postings' },
        { text: 'contact our HR manager on Telegram: @GlobalTaskHR_Sarah', reason: 'Off-platform steering to untraceable messaging handles' },
      ],
      recommendedActions: [
        'Do not contact the Telegram account or share your resume, address, or payment info.',
        'Never deposit money or cryptocurrency to "unlock" work tasks or VIP tiers.',
        'Verify legitimate job postings directly on official company careers portals.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This looks like a fake job scam trying to take your money upfront.',
        simpleBreakdown: [
          {
            point: 'Too Good To Be True Pay',
            plainExplanation: 'Nobody pays huge daily sums for 30 minutes of clicking reviews from your couch. It is bait.',
          },
          {
            point: 'Moving to Telegram',
            plainExplanation: 'Real companies use corporate emails (like name@company.com), not anonymous Telegram usernames.',
          },
          {
            point: 'The Hidden Trap',
            plainExplanation: 'Later, they will ask you to deposit your own money as a "registration fee" or to "unlock" tasks.',
          },
        ],
        bottomLine: 'Real companies pay you—they never ask you to pay them to start working. Do not send any registration fee.',
      },
    },
  },
  {
    id: 'investment-opportunity',
    title: 'Suspicious Investment Opportunity',
    category: 'Investment scam',
    text: 'EXCLUSIVE INVITATION: Join our elite Crypto Arbitrage AI Trading Club. Our proprietary quantum algorithmic bot guarantees 15% to 25% DAILY compounded returns with ZERO RISK. Investors who started with $500 last month are already withdrawing over $25,000. Limited slots for beta access! Deposit minimum 0.05 BTC to start your passive income stream today. WhatsApp VIP desk: +1-829-555-0199.',
    expectedResult: {
      riskScore: 92,
      riskLevel: 'CRITICAL',
      category: 'Investment scam',
      summary: 'Likely fraudulent Ponzi / high-yield investment program (HYIP). Promotes legally and mathematically impossible guaranteed daily returns (15-25% daily) with "zero risk" using buzzwords like "quantum algorithmic bot".',
      confidence: 'HIGH',
      redFlags: [
        {
          indicator: 'Guaranteed Returns with "Zero Risk"',
          explanation: 'All real financial investments carry risk. Any promise of guaranteed high profits is the primary legal red flag for investment fraud.',
          severity: 'HIGH',
        },
        {
          indicator: 'Mathematically Impossible Compounding',
          explanation: '15-25% daily compounded returns would yield trillions in months, a hallmark indicator of Ponzi schemes.',
          severity: 'HIGH',
        },
        {
          indicator: 'Irreversible Cryptocurrency Deposit Demands',
          explanation: 'Demanding upfront Bitcoin/cryptocurrency deposits ensures transactions cannot be reversed or refunded when the scheme collapses.',
          severity: 'HIGH',
        },
      ],
      suspiciousElements: [
        { text: 'guarantees 15% to 25% DAILY compounded returns with ZERO RISK', reason: 'False claims of risk-free hyper returns' },
        { text: 'Deposit minimum 0.05 BTC to start', reason: 'Irreversible crypto payment solicitation' },
        { text: 'WhatsApp VIP desk: +1-829-555-0199', reason: 'Unregistered financial solicitation over private messaging' },
      ],
      recommendedActions: [
        'Never send cryptocurrency or money to unsolicited investment offers or WhatsApp groups.',
        'Check registered broker-dealers and financial licenses with regulatory bodies (such as SEC, FINRA, or FCA).',
        'Block and report the contact immediately.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This looks like a get-rich-quick investment trap promising unrealistic returns.',
        simpleBreakdown: [
          {
            point: 'The "Guaranteed Profit" Lie',
            plainExplanation: 'In the real world, no investment is ever 100% risk-free. Anyone promising guaranteed profits is lying.',
          },
          {
            point: 'Crypto Cannot Be Taken Back',
            plainExplanation: 'Once you transfer Bitcoin or money to their wallet, it is gone forever.',
          },
          {
            point: 'Tech Buzzwords',
            plainExplanation: 'Words like "quantum bot" or "AI trading club" are used to make simple scams sound sophisticated.',
          },
        ],
        bottomLine: 'Never send money or crypto to unsolicited investment schemes. Guaranteed profits do not exist.',
      },
    },
  },
];

/**
 * Intelligent heuristic fallback analyzer that complies strictly with ScamShield AI rules:
 * - Benign messages get score 0-15, category 'Benign', empty redFlags, empty suspiciousElements.
 * - Primary scam objectives prioritized (Job scam for upfront fee job offers, Fake prize for rewards with fees, Credential theft for login theft).
 * - Multi-indicator scoring increases score appropriately to High/Critical.
 */
export function getMockAnalysis(text) {
  const normalizedText = (text || '').trim();
  const lower = normalizedText.toLowerCase();

  // 1. Check exact/near match with demo presets
  for (const preset of DEMO_PRESETS) {
    const snippet = preset.text.toLowerCase().substring(0, 40);
    if (lower.includes(snippet) || (lower.length > 20 && preset.text.toLowerCase().includes(lower.substring(0, 30)))) {
      return {
        ...preset.expectedResult,
        isDemoResult: true,
      };
    }
  }

  // 2. Strong Scam Indicator Tests
  // Upfront fee / money demand
  const hasFeeDemand = /(?:registration|processing|application|activation|clearance|courier|delivery|advance|service)\s*fee/i.test(lower) ||
    /fee\s*(?:of|is)?\s*(?:₹|\$|rs\.?|inr|usd)?\s*\d+/i.test(lower) ||
    /pay\s*(?:₹|\$|rs\.?|inr|usd)?\s*\d+/i.test(lower) ||
    /(?:deposit|transfer|send)\s*(?:₹|\$|rs\.?|inr|usd)?\s*\d+/i.test(lower);

  // Job scam signals
  const hasJobCues = /(?:job|work from home|wfh|hiring|vacancy|vacancies|position|openings|remote work|review optimizer|employee portal|salary)/i.test(lower);
  const hasJobSalary = /(?:₹|\$|rs\.?|inr|usd)?\s*\d{3,}(?:,\d{3})*\s*(?:\/|\s*per\s*)(?:month|day|week)|daily|monthly/i.test(lower);
  const hasNoInterview = /no interview|without interview|direct selection|no experience|limited (?:seats|positions|openings)/i.test(lower);

  // Prize / Giveaway signals
  const hasPrizeCues = /(?:congratulations|congrats|won|winner|lottery|lucky draw|mega draw|selected for|reward of|gift voucher|claim your (?:prize|reward))/i.test(lower);
  const hasPrizeAmount = /(?:₹|\$|rs\.?|inr|usd)\s*\d{3,}(?:,\d{3})*|\b\d{3,}(?:,\d{3})*\s*(?:reward|prize|cash)/i.test(lower);

  // Credential theft / Phishing signals
  const hasCredentialTheft = /(?:password|pin|otp|passcode|secret code|one-time password)/i.test(lower) ||
    /(?:account.*(?:restricted|suspended|blocked|frozen|locked)|unauthorized login|verify identity immediately|verify login|restore access)/i.test(lower);

  // Bank details request
  const hasBankDetails = /(?:bank details|account number|ifsc|cvv|card number|debit card|credit card|netbanking)/i.test(lower);

  // Investment scam signals
  const hasInvestmentCues = /(?:guaranteed.*(?:return|profit)|compounded return|zero risk|crypto arbitrage|trading bot|passive income|daily profit|15% to 25%|double your money)/i.test(lower);

  // Urgency & Deadlines
  const hasHighUrgency = /(?:within \d+ (?:hours?|mins?|minutes?)|2 hours|12 hours|24 hours|30 minutes?|hurry|immediate action|expires today|act now|limited time)/i.test(lower);

  // Threats
  const hasThreats = /(?:permanent(?:ly)? (?:suspended|deleted|blocked|closed)|police|arrest|legal action|court)/i.test(lower);

  // Suspicious URLs
  const hasSuspiciousUrl = /https?:\/\/[^\s]+(?:\.xyz|\.top|\.club|\.rest|\.buzz|\.tk|\.site|\.icu)|bit\.ly\/|tinyurl\.com\/|cutt\.ly\//i.test(lower);

  // 3. BENIGN DETECTION: If no meaningful scam indicators are found
  const hasAnyScamTrigger =
    hasFeeDemand ||
    (hasJobCues && (hasFeeDemand || hasNoInterview || hasJobSalary)) ||
    (hasPrizeCues && (hasFeeDemand || hasBankDetails || hasHighUrgency)) ||
    hasCredentialTheft ||
    hasInvestmentCues ||
    hasThreats ||
    hasSuspiciousUrl ||
    (hasBankDetails && (hasHighUrgency || hasFeeDemand || hasPrizeCues));

  if (!hasAnyScamTrigger) {
    return {
      riskScore: 5,
      riskLevel: 'LOW',
      category: 'Benign',
      summary: 'No obvious scam indicators detected. This message appears to be a legitimate, routine communication without deceptive or coercive patterns.',
      confidence: 'HIGH',
      redFlags: [],
      suspiciousElements: [],
      recommendedActions: [
        'No immediate action required.',
        'Exercise normal digital awareness as with any routine message.',
        'If any unexpected requests for money, OTPs, or credentials follow, verify directly with the sender.',
      ],
      explainLikeImNew: {
        headline: 'This message looks safe and normal.',
        simpleBreakdown: [],
        bottomLine: 'No scam indicators detected. This message does not exhibit any of the manipulative tricks scammers use.',
      },
      isDemoResult: true,
    };
  }

  // 4. SUSPICIOUS CLASSIFICATION BY PRIMARY SCAM OBJECTIVE
  let category = 'Suspicious/unknown';
  let riskScore = 40;
  const redFlags = [];
  const suspiciousElements = [];

  // CASE A: JOB SCAM (Primary objective: Fake job recruitment extracting fee or fake tasks)
  if (hasJobCues && (hasFeeDemand || hasNoInterview || hasJobSalary)) {
    category = 'Job scam';
    riskScore = 80;

    if (hasFeeDemand) {
      riskScore += 8;
      redFlags.push({
        indicator: 'Upfront Registration / Application Fee Demand',
        explanation: 'Legitimate employers never demand upfront registration, training, or application fees from prospective job applicants.',
        severity: 'HIGH',
      });
      const match = text.match(/(?:registration|application|processing|advance|training)\s*fee[^\n.,;]*/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Demanding upfront fee before employment is standard job scam fraud' });
      }
    }

    if (hasNoInterview || hasJobSalary) {
      riskScore += 5;
      redFlags.push({
        indicator: 'Unrealistic Pay Without Standard Interview',
        explanation: 'Offering inflated compensation without formal interviews or qualifications is a classic recruitment lure.',
        severity: 'HIGH',
      });
      const match = text.match(/(?:no interview|without interview|₹\s*\d+.*(?:month|day)|\$\s*\d+.*(?:month|day))/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Inflated pay and skipping standard hiring screening' });
      }
    }

    if (hasHighUrgency) {
      riskScore += 4;
      redFlags.push({
        indicator: 'Artificial Urgency & Scarcity',
        explanation: 'Strict short deadlines (e.g. 30 minutes) create psychological pressure to rush candidates into paying before verifying.',
        severity: 'MEDIUM',
      });
      const match = text.match(/(?:within \d+ (?:hours?|mins?|minutes?)|limited (?:positions|seats)|hurry)/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Artificial deadline to force hasty payment' });
      }
    }

    riskScore = Math.min(95, Math.max(76, riskScore));
    return {
      riskScore,
      riskLevel: 'CRITICAL',
      category: 'Job scam',
      summary: 'Likely fraudulent job offer scam. Demands upfront registration fees and promises unrealistic compensation without standard hiring procedures.',
      confidence: 'HIGH',
      redFlags,
      suspiciousElements,
      recommendedActions: [
        'Do not pay any registration, application, or training fee.',
        'Never send money or cryptocurrency to prospective employers.',
        'Verify legitimate career openings on official verified company websites.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This looks like a fake job scam trying to take your money upfront.',
        simpleBreakdown: [
          {
            point: 'Upfront Registration Fee',
            plainExplanation: 'Real companies pay you—they never ask you to pay them a registration fee to start working.',
          },
          {
            point: 'Too Good To Be True Salary',
            plainExplanation: 'High monthly salaries with zero interview or experience is bait to attract job seekers.',
          },
          {
            point: 'Artificial Countdown',
            plainExplanation: 'The short deadline is created to make you pay before having time to research the company.',
          },
        ],
        bottomLine: 'Real companies pay you—they never ask you to pay them to start working. Do not send any registration fee.',
      },
      isDemoResult: true,
    };
  }

  // CASE B: FAKE PRIZE / GIVEAWAY (Primary objective: Advance-fee fraud pretending to award prize)
  if (hasPrizeCues || (hasFeeDemand && hasPrizeAmount)) {
    category = 'Fake prize/giveaway';
    riskScore = 85;

    if (hasFeeDemand) {
      riskScore += 8;
      redFlags.push({
        indicator: 'Advance-Fee Scam Pattern',
        explanation: 'Requires payment of an upfront "processing fee", "clearance charge", or "tax" to release winnings. Legitimate lotteries never require payment to receive a prize.',
        severity: 'HIGH',
      });
      const match = text.match(/(?:processing|clearance|courier|service|advance)\s*fee[^\n.,;]*/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Demanding upfront fee to release prize money is advance-fee fraud' });
      }
    }

    if (hasBankDetails) {
      riskScore += 4;
      redFlags.push({
        indicator: 'Sensitive Financial Information Request',
        explanation: 'Prompting for bank account numbers, IFSC codes, or debit card details under the pretext of depositing rewards.',
        severity: 'HIGH',
      });
      const match = text.match(/(?:bank details|account number|ifsc|card details)[^\n.,;]*/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Harvesting bank details under the guise of sending prize money' });
      }
    }

    if (hasHighUrgency) {
      riskScore += 4;
      redFlags.push({
        indicator: 'Artificial Deadline & Pressure',
        explanation: 'Imposes short countdowns (e.g. 2 hours) to induce panic so the victim pays before realizing it is a scam.',
        severity: 'MEDIUM',
      });
      const match = text.match(/(?:within \d+ (?:hours?|mins?)|2 hours|claim.*today)/i);
      if (match) {
        suspiciousElements.push({ text: match[0], reason: 'Time pressure designed to bypass critical thinking' });
      }
    }

    riskScore = Math.min(96, Math.max(76, riskScore));
    return {
      riskScore,
      riskLevel: 'CRITICAL',
      category: 'Fake prize/giveaway',
      summary: 'Likely fake prize or lottery advance-fee fraud. Prompts the recipient with an unsolicited reward and demands an upfront processing fee and banking details.',
      confidence: 'HIGH',
      redFlags,
      suspiciousElements,
      recommendedActions: [
        'Never pay money or processing fees to claim any prize or lottery.',
        'Never share bank account, debit card, or UPI details with unverified contacts.',
        'Remember: If you did not enter a contest or lottery, you cannot win it.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This is a fake prize scam trying to trick you into paying a fee.',
        simpleBreakdown: [
          {
            point: 'The Fake Prize Bait',
            plainExplanation: 'Scammers claim you won huge cash or a gift to make you excited and lower your guard.',
          },
          {
            point: 'The "Processing Fee" Trap',
            plainExplanation: 'They ask for a small processing fee. Once you send that money, the scammers disappear and no prize exists.',
          },
          {
            point: 'Short Deadline Panic',
            plainExplanation: 'The short deadline is designed to make you act fast before asking friends or checking if it\'s real.',
          },
        ],
        bottomLine: 'Do not pay any fee or share bank details. You did not win this prize; it is an advance-fee trap.',
      },
      isDemoResult: true,
    };
  }

  // CASE C: INVESTMENT SCAM (Primary objective: Ponzi / High-Yield fraud)
  if (hasInvestmentCues) {
    category = 'Investment scam';
    riskScore = 90;
    redFlags.push({
      indicator: 'Guaranteed Returns with "Zero Risk"',
      explanation: 'All real financial investments carry risk. Promising guaranteed compounding daily/weekly profits is a hallmark signature of Ponzi fraud.',
      severity: 'HIGH',
    });
    if (hasFeeDemand || /deposit/i.test(lower)) {
      redFlags.push({
        indicator: 'Upfront Capital Deposit Demands',
        explanation: 'Soliciting deposits via unmonitored channels like crypto or private transfers.',
        severity: 'HIGH',
      });
    }

    return {
      riskScore,
      riskLevel: 'CRITICAL',
      category: 'Investment scam',
      summary: 'Likely fraudulent high-yield investment scheme promising impossible guaranteed returns with zero risk.',
      confidence: 'HIGH',
      redFlags,
      suspiciousElements: [{ text: text.substring(0, Math.min(text.length, 40)), reason: 'Unrealistic investment claims' }],
      recommendedActions: [
        'Never send cryptocurrency or funds to unsolicited investment offers.',
        'Check registered broker licenses with financial regulators before investing.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This looks like a get-rich-quick investment trap promising unrealistic returns.',
        simpleBreakdown: [
          {
            point: 'No Guaranteed Wealth',
            plainExplanation: 'In real investing, nothing is risk-free. Anyone guaranteeing 20% daily returns is running a scam.',
          },
        ],
        bottomLine: 'Never send money or crypto to unsolicited investment schemes. Guaranteed profits do not exist.',
      },
      isDemoResult: true,
    };
  }

  // CASE D: CREDENTIAL THEFT / PHISHING (Primary objective: Stealing account passwords or OTPs)
  if (hasCredentialTheft) {
    category = 'Credential theft';
    riskScore = 92;
    redFlags.push({
      indicator: 'Urgent Account Suspension Threat',
      explanation: 'Uses artificial panic regarding restricted accounts to compel immediate login or verification.',
      severity: 'HIGH',
    });
    redFlags.push({
      indicator: 'Credential or Security Code Solicitation',
      explanation: 'Directs victim to unverified authentication pages or prompts for confidential codes.',
      severity: 'HIGH',
    });

    return {
      riskScore,
      riskLevel: 'CRITICAL',
      category: 'Credential theft',
      summary: 'Likely phishing attack aimed at harvesting account credentials and security codes through intimidation.',
      confidence: 'HIGH',
      redFlags,
      suspiciousElements: [{ text: text.substring(0, Math.min(text.length, 40)), reason: 'Urgent account verification threat' }],
      recommendedActions: [
        'Do not click the link or enter login credentials.',
        'Never share OTPs or passwords with anyone.',
        'Check your account status only through your official bank mobile app.',
      ],
      explainLikeImNew: {
        headline: 'Warning: This message is trying to scare you into handing over your password or bank login.',
        simpleBreakdown: [
          {
            point: 'Fake Account Panic',
            plainExplanation: 'They threaten that your account will be frozen so you panic and enter your password on their copycat site.',
          },
        ],
        bottomLine: 'Do not click any link and never enter your passwords or OTPs. Check your account only on the official bank app.',
      },
      isDemoResult: true,
    };
  }

  // CASE E: AMBIGUOUS / UNCERTAIN
  return {
    riskScore: 30,
    riskLevel: 'LOW',
    category: 'Suspicious/unknown',
    summary: 'The message contains minor unusual signals, but evidence is insufficient to verify a definitive scam category. Exercise standard caution.',
    confidence: 'LOW',
    redFlags: [
      {
        indicator: 'Unverified Communication',
        explanation: 'The context and origin of this message cannot be conclusively established from the provided text alone.',
        severity: 'LOW',
      },
    ],
    suspiciousElements: [],
    recommendedActions: [
      'Do not click unverified links or share personal details.',
      'Confirm directly with the supposed sender using an independent, known contact method.',
    ],
    explainLikeImNew: {
      headline: 'Caution: This message contains unusual signals, but evidence is insufficient to verify.',
      simpleBreakdown: [
        {
          point: 'Unclear Sender',
          plainExplanation: 'There isn\'t enough clear evidence to say for sure if this is a scam, so stay alert.',
        },
      ],
      bottomLine: 'Be careful. The message lacks clear verification. Do not click links or send information until confirmed.',
    },
    isDemoResult: true,
  };
}
