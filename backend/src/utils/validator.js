/**
 * Validator and Normalizer for ScamShield AI output
 */

export const VALID_CATEGORIES = [
  'Benign',
  'Phishing',
  'Financial scam',
  'Impersonation',
  'Fake prize/giveaway',
  'Job scam',
  'Investment scam',
  'Delivery/package scam',
  'Credential theft',
  'Social engineering',
  'Suspicious/unknown',
];

export const VALID_RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
export const VALID_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH'];

/**
 * Risk Scoring Guidance:
 * 0–15 = Benign (LOW)
 * 16–30 = Low (LOW)
 * 31–55 = Medium (MEDIUM)
 * 56–75 = High (HIGH)
 * 76–100 = Critical (CRITICAL)
 */
export function determineRiskLevel(score) {
  if (score >= 76) return 'CRITICAL';
  if (score >= 56) return 'HIGH';
  if (score >= 31) return 'MEDIUM';
  return 'LOW';
}

/**
 * Normalizes and validates the AI JSON analysis result
 */
export function normalizeAnalysisResult(data, options = {}) {
  if (!data || typeof data !== 'object') {
    throw new Error('AI output must be a valid JSON object');
  }

  // 1. Risk Score (0-100)
  let rawScore = Number(data.riskScore);
  if (isNaN(rawScore)) {
    rawScore = 15;
  }
  let riskScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // 2. Category matching
  let category = String(data.category || '').trim();
  const matchedCat = VALID_CATEGORIES.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );
  if (matchedCat) {
    category = matchedCat;
  } else if (!category || category.toLowerCase().includes('unknown')) {
    category = 'Suspicious/unknown';
  } else {
    // Check if category closely relates to any valid category
    const partialMatch = VALID_CATEGORIES.find((c) =>
      category.toLowerCase().includes(c.toLowerCase().split(' ')[0])
    );
    category = partialMatch || 'Suspicious/unknown';
  }

  // 3. Special handling for Benign / No Obvious Threat messages
  const isBenign =
    category === 'Benign' ||
    (riskScore <= 15 && (!data.redFlags || data.redFlags.length === 0));

  if (isBenign) {
    category = 'Benign';
    riskScore = Math.min(riskScore, 15);
  }

  // 4. Risk Level (LOW, MEDIUM, HIGH, CRITICAL)
  let riskLevel = String(data.riskLevel || '').toUpperCase();
  if (isBenign) {
    riskLevel = 'LOW';
  } else if (!VALID_RISK_LEVELS.includes(riskLevel)) {
    riskLevel = determineRiskLevel(riskScore);
  }

  // 5. Summary
  let summary = String(data.summary || '').trim();
  if (isBenign) {
    if (!summary || summary.toLowerCase().includes('suspicious') || summary.toLowerCase().includes('caution')) {
      summary = 'No obvious scam indicators detected. This message appears to be a legitimate, routine communication.';
    }
  } else if (!summary) {
    summary = 'Analysis completed. Review the identified indicators and recommendations.';
  }

  // Soften absolute certainty statements if present
  summary = summary
    .replace(/\bthis is definitely a scam\b/gi, 'This appears to be a potential scam')
    .replace(/\b100% scam\b/gi, 'Highly suspicious scam indicators')
    .replace(/\bguaranteed scam\b/gi, 'Strong indications of a scam');

  // 6. Red Flags
  let redFlags = [];
  if (!isBenign && Array.isArray(data.redFlags)) {
    redFlags = data.redFlags
      .filter((rf) => rf && typeof rf === 'object')
      .map((rf) => {
        let sev = String(rf.severity || 'MEDIUM').toUpperCase();
        if (!VALID_SEVERITIES.includes(sev)) sev = 'MEDIUM';
        return {
          indicator: String(rf.indicator || 'Suspicious cue').trim(),
          explanation: String(rf.explanation || 'No explanation provided').trim(),
          severity: sev,
        };
      });
  }

  // 7. Suspicious Elements (highlightable text fragments)
  let suspiciousElements = [];
  if (!isBenign && Array.isArray(data.suspiciousElements)) {
    suspiciousElements = data.suspiciousElements
      .filter((el) => el && typeof el === 'object')
      .map((el) => ({
        text: String(el.text || '').trim(),
        reason: String(el.reason || '').trim(),
      }))
      .filter((el) => el.text.length > 0);
  }

  // 8. Recommended Actions
  let recommendedActions = [];
  if (isBenign) {
    recommendedActions = [
      'No immediate action required.',
      'Exercise normal digital awareness as with any routine message.',
      'If any unexpected requests for money or credentials follow, verify directly with the sender.',
    ];
  } else if (Array.isArray(data.recommendedActions) && data.recommendedActions.length > 0) {
    recommendedActions = data.recommendedActions
      .map((act) => String(act || '').trim())
      .filter((act) => act.length > 0);
  } else {
    recommendedActions = getDefaultActionsForCategory(category);
  }

  // 9. Confidence
  let rawConfidence = data.confidence;
  let confidence = 'HIGH';
  if (typeof rawConfidence === 'number') {
    confidence = rawConfidence > 75 ? 'HIGH' : rawConfidence > 45 ? 'MEDIUM' : 'LOW';
  } else if (typeof rawConfidence === 'string') {
    const upper = rawConfidence.toUpperCase();
    if (['HIGH', 'MEDIUM', 'LOW'].includes(upper)) {
      confidence = upper;
    } else if (upper.includes('%')) {
      const val = parseInt(upper, 10);
      confidence = val > 75 ? 'HIGH' : val > 45 ? 'MEDIUM' : 'LOW';
    }
  }

  // 10. Plain Language ("Explain Like I'm New") explanation
  const explainLikeImNew = buildExplainLikeImNew(data, category, riskLevel, isBenign, redFlags);

  return {
    riskScore,
    riskLevel,
    category,
    summary,
    redFlags,
    suspiciousElements,
    recommendedActions,
    confidence,
    explainLikeImNew,
    analyzedAt: new Date().toISOString(),
    safetyNotice:
      'AI analysis is an educational aid and risk indicator, not a guarantee or legal verdict. Always verify directly through verified official contacts.',
  };
}

function getDefaultActionsForCategory(category) {
  switch (category) {
    case 'Job scam':
      return [
        'Never pay upfront registration, application, or training fees for any job.',
        'Do not send money via UPI, wire transfer, or cryptocurrency to an employer.',
        'Verify open roles directly on the official company careers page or LinkedIn profile.',
        'Block and report the contact on the messaging platform.',
      ];
    case 'Fake prize/giveaway':
      return [
        'Do not pay any "processing fee", "customs charge", or "tax" to claim a prize.',
        'Never share your bank account, debit card, or UPI details to receive lottery winnings.',
        'Remember: If you did not enter a contest, you cannot win it.',
        'Delete the message and block the sender immediately.',
      ];
    case 'Investment scam':
      return [
        'Never invest in schemes promising "guaranteed" daily or weekly returns with "zero risk".',
        'Check registration with financial regulators (such as SEBI, SEC, or FCA) before investing.',
        'Never transfer cryptocurrency or funds to personal WhatsApp or Telegram handlers.',
      ];
    case 'Credential theft':
    case 'Phishing':
      return [
        'Do not click the link or enter your login, password, or security PINs.',
        'Never share your 6-digit OTP code with anyone, even if they claim to be bank staff.',
        'Access your account only through the official verified app or official website bookmark.',
        'Call the official bank support number on the back of your card to check account status.',
      ];
    default:
      return [
        'Do not click any embedded links or call phone numbers in the message.',
        'Never share OTPs, passwords, or banking information.',
        'Contact the official company or institution using verified contact info.',
        'Report the message as spam and block the sender.',
      ];
  }
}

function buildExplainLikeImNew(data, category, riskLevel, isBenign, redFlags) {
  if (isBenign) {
    return {
      headline: 'This message looks safe and normal.',
      simpleBreakdown: [],
      bottomLine: 'No scam indicators detected. This message does not exhibit any of the manipulative tricks scammers use.',
    };
  }

  // If Gemini provided a detailed, tailored explainLikeImNew, use it
  if (
    data.explainLikeImNew &&
    typeof data.explainLikeImNew === 'object' &&
    data.explainLikeImNew.headline &&
    data.explainLikeImNew.headline !== 'Headline'
  ) {
    return {
      headline: String(data.explainLikeImNew.headline),
      simpleBreakdown: Array.isArray(data.explainLikeImNew.simpleBreakdown)
        ? data.explainLikeImNew.simpleBreakdown.map((item) => ({
            point: String(item.point || 'Notice'),
            plainExplanation: String(item.plainExplanation || ''),
          }))
        : redFlags.map((rf) => ({
            point: rf.indicator,
            plainExplanation: translateToPlainLanguage(rf.explanation),
          })),
      bottomLine:
        String(data.explainLikeImNew.bottomLine || getPlainBottomLine(category, riskLevel)),
    };
  }

  // Category-specific fallback plain language explanations
  return {
    headline: getPlainHeadline(category, riskLevel),
    simpleBreakdown: redFlags.map((rf) => ({
      point: rf.indicator,
      plainExplanation: translateToPlainLanguage(rf.explanation),
    })),
    bottomLine: getPlainBottomLine(category, riskLevel),
  };
}

function getPlainHeadline(category, riskLevel) {
  switch (category) {
    case 'Benign':
      return 'This message looks safe and normal.';
    case 'Job scam':
      return 'Warning: This looks like a fake job scam trying to take your money upfront.';
    case 'Fake prize/giveaway':
      return 'Warning: This looks like a fake prize scam trying to trick you into paying a fee.';
    case 'Financial scam':
      return 'Warning: This message is asking for money or payment under false pretenses.';
    case 'Credential theft':
    case 'Phishing':
      return 'Warning: This message is trying to scare you into handing over your password or bank login.';
    case 'Investment scam':
      return 'Warning: This looks like a get-rich-quick investment trap promising unrealistic returns.';
    case 'Delivery/package scam':
      return 'Warning: This looks like a fake parcel notice trying to steal your card details.';
    case 'Impersonation':
      return 'Warning: Someone is pretending to be a trusted organization or person to deceive you.';
    case 'Suspicious/unknown':
      return 'Caution: This message contains unusual signals, but evidence is insufficient to verify.';
    default:
      if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
        return `Warning: This message looks like a ${category.toLowerCase()} designed to trick you.`;
      }
      return 'Caution: This message contains several suspicious cues common in online scams.';
  }
}

function getPlainBottomLine(category, riskLevel) {
  switch (category) {
    case 'Benign':
      return 'No scam detected. You do not need to worry about this message.';
    case 'Job scam':
      return 'Real companies pay you—they never ask you to pay them to start working. Do not send any registration fee.';
    case 'Fake prize/giveaway':
      return 'Do not pay any fee or share bank details. You did not win this prize; it is an advance-fee trap.';
    case 'Investment scam':
      return 'Never send money or crypto to unsolicited investment schemes. Guaranteed profits do not exist.';
    case 'Credential theft':
    case 'Phishing':
      return 'Do not click any link and never enter your passwords or OTPs. Check your account only on the official bank app.';
    case 'Suspicious/unknown':
      return 'Be careful. The message lacks clear verification. Do not click links or send information until confirmed.';
    default:
      if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
        return 'Do not interact, do not click anything, and do not reply. Block the sender immediately.';
      }
      return 'Take your time. Do not click links inside the message. Verify with the supposed sender independently.';
  }
}

function translateToPlainLanguage(technicalText) {
  if (!technicalText) return 'This looks suspicious.';
  let plain = technicalText
    .replace(/credential harvesting/gi, 'trying to steal your login or passwords')
    .replace(/advance-fee (?:fraud|pattern)/gi, 'demanding you pay money first to receive a fake reward')
    .replace(/phishing heuristic/gi, 'impersonation trick')
    .replace(/social engineering/gi, 'psychological tricks to make you react fast without thinking')
    .replace(/urgency cues?/gi, 'creating fake panic or rush')
    .replace(/malicious payload/gi, 'dangerous file or spyware')
    .replace(/spoofed domain/gi, 'fake lookalike web address')
    .replace(/unsolicited communications?/gi, 'messages you never asked for');
  return plain;
}
