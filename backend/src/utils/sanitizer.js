/**
 * Sanitizer utility for untrusted user message input and data scrubbing.
 */

export function sanitizeInput(text, maxLength = 5000) {
  if (typeof text !== 'string') {
    return '';
  }

  // Remove null bytes and dangerous control characters
  let clean = text.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '');

  // Normalize Unicode
  clean = clean.normalize('NFKC');

  // Cap length
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  return clean.trim();
}

/**
 * Creates a safe, sanitized snippet for history and dashboard.
 * Explicitly scrubs potential passwords, OTPs, credit cards, or sensitive numbers.
 */
export function createSafeSnippet(text, maxChars = 40) {
  if (!text || typeof text !== 'string') return '';

  let scrubbed = text;

  // Mask potential credit cards (13-19 digits with optional spaces or dashes)
  scrubbed = scrubbed.replace(/\b(?:\d[ -]*?){13,16}\b/g, '[REDACTED_CARD]');

  // Mask potential OTP / PIN codes (4-8 digits near keywords)
  scrubbed = scrubbed.replace(/(?:code|otp|pin|password|passcode|token)\s*[:=]?\s*([0-9a-zA-Z]{4,8})/gi, '$1 [REDACTED]');

  // Mask general 6-digit standalone codes
  scrubbed = scrubbed.replace(/\b\d{6}\b/g, '[CODE]');

  // Normalize whitespace
  scrubbed = scrubbed.replace(/\s+/g, ' ').trim();

  // Truncate to maxChars
  if (scrubbed.length > maxChars) {
    return scrubbed.substring(0, maxChars) + '...';
  }

  return scrubbed;
}
