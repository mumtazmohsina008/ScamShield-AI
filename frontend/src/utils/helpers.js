/**
 * Helper utility functions for ScamShield AI
 */

export function getRiskLevelConfig(level, score, category) {
  const norm = String(level || 'LOW').toUpperCase();
  const isBenign = category === 'Benign' || (score !== undefined && score <= 15);

  if (isBenign) {
    return {
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      cardBorder: 'border-emerald-500/40',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      color: 'text-emerald-400',
      ringColor: '#10B981',
      label: 'BENIGN / NO THREAT',
      accentBar: 'bg-emerald-500',
    };
  }

  switch (norm) {
    case 'CRITICAL':
      return {
        badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        cardBorder: 'border-rose-500/40',
        glow: 'shadow-[0_0_30px_rgba(244,63,94,0.25)]',
        color: 'text-rose-400',
        ringColor: '#F43F5E',
        label: 'CRITICAL THREAT',
        accentBar: 'bg-rose-500',
      };
    case 'HIGH':
      return {
        badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        cardBorder: 'border-orange-500/40',
        glow: 'shadow-[0_0_25px_rgba(249,115,22,0.2)]',
        color: 'text-orange-400',
        ringColor: '#F97316',
        label: 'HIGH RISK',
        accentBar: 'bg-orange-500',
      };
    case 'MEDIUM':
      return {
        badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        cardBorder: 'border-amber-500/40',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        color: 'text-amber-400',
        ringColor: '#F59E0B',
        label: 'MEDIUM CAUTION',
        accentBar: 'bg-amber-500',
      };
    case 'LOW':
    default:
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        cardBorder: 'border-emerald-500/40',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        color: 'text-emerald-400',
        ringColor: '#10B981',
        label: 'LOW RISK',
        accentBar: 'bg-emerald-500',
      };
  }
}

export function formatTimeAgo(isoString) {
  if (!isoString) return 'recently';
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * Highlights suspicious fragments inside the raw text without HTML injection
 */
export function buildHighlightedSegments(fullText, suspiciousElements = []) {
  if (!fullText) return [];
  if (!suspiciousElements || suspiciousElements.length === 0) {
    return [{ text: fullText, isHighlighted: false }];
  }

  // Find occurrences of suspicious phrases in the text
  const matches = [];
  for (const element of suspiciousElements) {
    const needle = element.text.trim();
    if (!needle) continue;

    let startIndex = 0;
    const lowerFull = fullText.toLowerCase();
    const lowerNeedle = needle.toLowerCase();

    while (startIndex < fullText.length) {
      const idx = lowerFull.indexOf(lowerNeedle, startIndex);
      if (idx === -1) break;
      matches.push({
        start: idx,
        end: idx + needle.length,
        text: fullText.substring(idx, idx + needle.length),
        reason: element.reason,
      });
      startIndex = idx + needle.length;
    }
  }

  if (matches.length === 0) {
    return [{ text: fullText, isHighlighted: false }];
  }

  // Sort and deduplicate/merge overlapping matches
  matches.sort((a, b) => a.start - b.start);
  const nonOverlapping = [];
  for (const match of matches) {
    if (nonOverlapping.length === 0) {
      nonOverlapping.push(match);
    } else {
      const prev = nonOverlapping[nonOverlapping.length - 1];
      if (match.start >= prev.end) {
        nonOverlapping.push(match);
      }
    }
  }

  // Build segments array
  const segments = [];
  let cursor = 0;
  for (const match of nonOverlapping) {
    if (match.start > cursor) {
      segments.push({
        text: fullText.substring(cursor, match.start),
        isHighlighted: false,
      });
    }
    segments.push({
      text: match.text,
      isHighlighted: true,
      reason: match.reason,
    });
    cursor = match.end;
  }
  if (cursor < fullText.length) {
    segments.push({
      text: fullText.substring(cursor),
      isHighlighted: false,
    });
  }

  return segments;
}

/**
 * Generates plain-text exportable report
 */
export function generatePlainTextReport(result, originalText) {
  const date = new Date(result.analyzedAt || Date.now()).toLocaleString();
  return `=== SCAMSHIELD AI ANALYSIS REPORT ===
Date: ${date}
Risk Level: ${result.riskLevel} (Score: ${result.riskScore}/100)
Category: ${result.category}
Confidence: ${result.confidence}

SUMMARY:
${result.summary}

EXPLAIN LIKE I'M NEW:
Headline: ${result.explainLikeImNew?.headline || 'N/A'}
Bottom Line: ${result.explainLikeImNew?.bottomLine || 'N/A'}

RED FLAGS IDENTIFIED:
${(result.redFlags || [])
  .map((rf, i) => `${i + 1}. [${rf.severity}] ${rf.indicator}: ${rf.explanation}`)
  .join('\n')}

EXTRACTED URLS:
${
  (result.extractedUrls || []).length > 0
    ? (result.extractedUrls || [])
        .map((u) => `- ${u.rawUrl} (${u.overallRisk}) - Host: ${u.hostname}`)
        .join('\n')
    : 'No external URLs detected.'
}

RECOMMENDED ACTIONS:
${(result.recommendedActions || []).map((a, i) => `${i + 1}. ${a}`).join('\n')}

SAFETY NOTICE:
${result.safetyNotice}
=====================================`;
}
