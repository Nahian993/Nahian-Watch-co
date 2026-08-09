import { sanitizeInput, sanitizeObject, checkRateLimit, SECURITY_HEADERS } from '@/lib/security';

describe('Security Utility Module Tests', () => {
  describe('sanitizeInput', () => {
    it('should strip XSS script tags and iframes', () => {
      const malicious = '<script>alert("XSS")</script>Casio Watch';
      expect(sanitizeInput(malicious)).toBe('Casio Watch');
    });

    it('should strip inline event handlers', () => {
      const payload = '<img src="x" onerror="alert(1)">Seiko';
      expect(sanitizeInput(payload)).toBe('<img src="x">Seiko');
    });

    it('should neutralize SQL injection comment tokens', () => {
      const sqli = "SELECT * FROM users WHERE username = 'admin'--";
      expect(sanitizeInput(sqli)).toBe("SELECT * FROM users WHERE username = 'admin'");
    });

    it('should remove path traversal sequences', () => {
      const path = '../../etc/passwd';
      expect(sanitizeInput(path)).toBe('etc/passwd');
    });

    it('should handle non-string values gracefully', () => {
      expect(sanitizeInput(123)).toBe('123');
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
    });
  });

  describe('sanitizeObject', () => {
    it('should recursively sanitize object fields', () => {
      const maliciousObj = {
        name: '<b>Rolex</b><script>eval()</script>',
        query: {
          search: 'Casio--',
        },
      };

      const clean = sanitizeObject(maliciousObj);
      expect(clean.name).toBe('<b>Rolex</b>');
      expect(clean.query.search).toBe('Casio');
    });
  });

  describe('checkRateLimit', () => {
    it('should enforce request limits per IP/key', () => {
      const testKey = 'test-ip-1';
      const limit = 3;
      
      expect(checkRateLimit(testKey, limit, 60000).isLimited).toBe(false);
      expect(checkRateLimit(testKey, limit, 60000).isLimited).toBe(false);
      expect(checkRateLimit(testKey, limit, 60000).isLimited).toBe(false);
      // 4th request exceeds limit of 3
      expect(checkRateLimit(testKey, limit, 60000).isLimited).toBe(true);
    });
  });

  describe('SECURITY_HEADERS', () => {
    it('should define critical OWASP security headers', () => {
      expect(SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff');
      expect(SECURITY_HEADERS['X-Frame-Options']).toBe('DENY');
      expect(SECURITY_HEADERS['X-XSS-Protection']).toBe('1; mode=block');
    });
  });
});
