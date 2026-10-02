/**
 * Static URL Analysis Service
 * CRITICAL RULE: NEVER fetch, ping, or visit user-provided URLs.
 * Analysis is strictly syntactic and heuristic on the visible string.
 */

const KNOWN_SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  'is.gd',
  't.co',
  'ow.ly',
  'cutt.ly',
  'rb.gy',
  'goo.gl',
  'v.gd',
  'buff.ly',
  'rebrand.ly',
  'shorte.st',
  't.ly',
  'qr.ae',
  'bl.ink',
]);

const HIGH_ABUSE_TLDS = new Set([
  'xyz',
  'top',
  'club',
  'work',
  'click',
  'buzz',
  'rest',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
  'site',
  'vip',
  'icu',
  'monster',
  'link',
  'cam',
  'stream',
  'surf',
  'space',
  'kim',
  'gdn',
  'download',
  'racing',
  'review',
  'country',
  'science',
]);

const BRAND_TARGETS = [
  { name: 'PayPal', keyword: 'paypal', legitimateDomain: 'paypal.com' },
  { name: 'Apple', keyword: 'apple', legitimateDomain: 'apple.com' },
  { name: 'Amazon', keyword: 'amazon', legitimateDomain: 'amazon.com' },
  { name: 'Google', keyword: 'google', legitimateDomain: 'google.com' },
  { name: 'Microsoft', keyword: 'microsoft', legitimateDomain: 'microsoft.com' },
  { name: 'Netflix', keyword: 'netflix', legitimateDomain: 'netflix.com' },
  { name: 'Chase Bank', keyword: 'chase', legitimateDomain: 'chase.com' },
  { name: 'Wells Fargo', keyword: 'wellsfargo', legitimateDomain: 'wellsfargo.com' },
  { name: 'Bank of America', keyword: 'bankofamerica', legitimateDomain: 'bankofamerica.com' },
  { name: 'USPS', keyword: 'usps', legitimateDomain: 'usps.com' },
  { name: 'FedEx', keyword: 'fedex', legitimateDomain: 'fedex.com' },
  { name: 'DHL', keyword: 'dhl', legitimateDomain: 'dhl.com' },
  { name: 'UPS', keyword: 'ups', legitimateDomain: 'ups.com' },
  { name: 'WhatsApp', keyword: 'whatsapp', legitimateDomain: 'whatsapp.com' },
  { name: 'Telegram', keyword: 'telegram', legitimateDomain: 'telegram.org' },
  { name: 'Binance', keyword: 'binance', legitimateDomain: 'binance.com' },
  { name: 'Coinbase', keyword: 'coinbase', legitimateDomain: 'coinbase.com' },
  { name: 'Meta / Facebook', keyword: 'facebook', legitimateDomain: 'facebook.com' },
  { name: 'IRS', keyword: 'irs', legitimateDomain: 'irs.gov' },
];

/**
 * Extracts and inspects URLs from arbitrary text
 */
export function extractAndAnalyzeUrls(text) {
  if (!text || typeof text !== 'string') return [];

  // Match URLs starting with http://, https://, or common shorteners / naked domains
  const urlRegex = /\b(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`]+|\b(?:bit\.ly|tinyurl\.com|t\.co|cutt\.ly|rb\.gy)\/[a-zA-Z0-9_\-]+/gi;
  const rawMatches = text.match(urlRegex) || [];

  // Deduplicate matches
  const uniqueUrls = Array.from(new Set(rawMatches));

  return uniqueUrls.map((rawUrl) => analyzeSingleUrl(rawUrl));
}

function analyzeSingleUrl(rawUrl) {
  let urlString = rawUrl.trim();
  // Strip trailing punctuation often caught in regex
  urlString = urlString.replace(/[.,;:!?)]+$/, '');

  let normalizedUrl = urlString;
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'http://' + normalizedUrl;
  }

  const redFlags = [];
  let isIpAddress = false;
  let isShortener = false;
  let isSuspiciousTld = false;
  let brandSpoofing = null;
  let excessiveSubdomains = false;
  let hostname = '';
  let pathname = '';
  let protocol = 'unknown';

  try {
    const parsed = new URL(normalizedUrl);
    hostname = parsed.hostname.toLowerCase();
    pathname = parsed.pathname;
    protocol = parsed.protocol.replace(':', '');

    // 1. IP address host check
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ipRegex.test(hostname)) {
      isIpAddress = true;
      redFlags.push({
        flag: 'IP Address as Hostname',
        description: `Direct IP address (${hostname}) used instead of a registered domain name, common in malicious phishing infrastructure.`,
        severity: 'HIGH',
      });
    }

    // 2. URL Shortener check
    if (KNOWN_SHORTENERS.has(hostname) || hostname.endsWith('.ly')) {
      isShortener = true;
      redFlags.push({
        flag: 'URL Shortener Detected',
        description: `Shortened link (${hostname}) obscures the true destination URL. Scammers use this to hide phishing domains.`,
        severity: 'MEDIUM',
      });
    }

    // 3. TLD Analysis
    const domainParts = hostname.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (HIGH_ABUSE_TLDS.has(tld)) {
      isSuspiciousTld = true;
      redFlags.push({
        flag: `High-Risk Top-Level Domain (.${tld})`,
        description: `The .${tld} domain extension is frequently associated with cheap, disposable spam and phishing domains.`,
        severity: 'MEDIUM',
      });
    }

    // 4. Excessive Subdomains (more than 3 dot-separated parts)
    if (domainParts.length > 3 && !isIpAddress) {
      excessiveSubdomains = true;
      redFlags.push({
        flag: 'Excessive Subdomains',
        description: `Domain has unusual depth (${hostname}), often designed to mimic genuine domains in mobile preview bars.`,
        severity: 'MEDIUM',
      });
    }

    // 5. Brand Spoofing / Impersonation Check
    for (const brand of BRAND_TARGETS) {
      if (hostname.includes(brand.keyword)) {
        // If hostname contains brand but does not end with the legitimate domain
        const isLegit =
          hostname === brand.legitimateDomain ||
          hostname.endsWith('.' + brand.legitimateDomain);
        if (!isLegit) {
          brandSpoofing = brand.name;
          redFlags.push({
            flag: `Brand Lookalike Spoof (${brand.name})`,
            description: `Domain contains "${brand.name}" keywords (${hostname}) but is NOT hosted on the genuine ${brand.legitimateDomain} domain!`,
            severity: 'HIGH',
          });
          break;
        }
      }
    }

    // 6. Suspicious Phishing Keywords in Path or Hostname
    const phishKeywords = ['login', 'signin', 'verify', 'update', 'banking', 'secure', 'wallet', 'claim', 'bonus', 'suspend'];
    const matchedKeywords = phishKeywords.filter(
      (kw) => hostname.includes(kw) || pathname.toLowerCase().includes(kw)
    );
    if (matchedKeywords.length > 0 && !brandSpoofing) {
      redFlags.push({
        flag: 'Credential / Security Trigger Keywords',
        description: `Contains sensitive verification terms (${matchedKeywords.join(', ')}) typical of credential harvest pages.`,
        severity: 'LOW',
      });
    }

    // 7. Insecure HTTP for security/account actions
    if (protocol === 'http' && !isShortener) {
      redFlags.push({
        flag: 'Unencrypted Connection (HTTP)',
        description: 'Plain HTTP protocol without modern TLS encryption, unsafe for credential or identity input.',
        severity: 'LOW',
      });
    }

    // 8. Punycode check
    if (hostname.includes('xn--')) {
      redFlags.push({
        flag: 'Internationalized / Punycode Characters',
        description: 'Uses homoglyph / punycode characters to visually spoof legitimate brand spellings.',
        severity: 'HIGH',
      });
    }
  } catch {
    redFlags.push({
      flag: 'Malformed URL',
      description: 'The URL structure appears invalid or intentionally obfuscated.',
      severity: 'MEDIUM',
    });
  }

  // Determine overall URL Risk
  let overallRisk = 'NEUTRAL';
  if (redFlags.some((f) => f.severity === 'HIGH')) {
    overallRisk = 'SUSPICIOUS';
  } else if (redFlags.length > 0) {
    overallRisk = 'CAUTION';
  }

  return {
    rawUrl: urlString,
    hostname: hostname || 'unknown',
    protocol,
    isShortener,
    isIpAddress,
    isSuspiciousTld,
    brandSpoofing,
    redFlags,
    overallRisk,
    inspectionNotice: 'Static heuristic scan only. ScamShield NEVER connects to or requests external links.',
  };
}
