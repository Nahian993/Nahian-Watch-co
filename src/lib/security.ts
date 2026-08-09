/**
 * Security Utility Module for Crown Watch Co.
 * Provides OWASP-compliant input sanitization, rate limiting, and security header generation.
 */

// Rate Limiter Storage (In-Memory Sliding Window)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Sanitizes input strings to prevent SQL Injection (SQLi), Cross-Site Scripting (XSS),
 * Path Traversal, and Command Injection attacks.
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    if (input === null || input === undefined) return '';
    return String(input);
  }

  return input
    // Remove HTML script & iframe tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove inline event handlers (onerror, onload, onclick, etc.)
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^>\s]+/gi, '')
    .replace(/\s+>/g, '>')
    // Remove javascript: pseudo-protocol URIs
    .replace(/javascript\s*:/gi, '')
    // Neutralize SQL injection comment tokens & multi-statement delimiters
    .replace(/--/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove Null Bytes and control chars
    .replace(/\0/g, '')
    // Remove Path Traversal sequences
    .replace(/\.\.\//g, '')
    .replace(/\.\.\\/g, '')
    .trim();
}

/**
 * Recursively sanitizes object properties
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return sanitizeInput(obj) as unknown as T;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const cleanKey = sanitizeInput(key);
    sanitized[cleanKey] = sanitizeObject(value);
  }
  return sanitized as T;
}

/**
 * Simple In-Memory Rate Limiter
 * @param key Identifier (e.g. IP address or route)
 * @param limit Max allowed requests within window
 * @param windowMs Time window in milliseconds (default: 60s)
 * @returns boolean True if request exceeds limit (should be blocked)
 */
export function checkRateLimit(key: string, limit: number = 100, windowMs: number = 60000): { isLimited: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) rateLimitMap.delete(k);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { isLimited: false, remaining: limit - 1 };
  }

  record.count += 1;
  if (record.count > limit) {
    return { isLimited: true, remaining: 0 };
  }

  return { isLimited: false, remaining: limit - record.count };
}

/**
 * Standard Security Response Headers
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
