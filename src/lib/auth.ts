const ADMIN_COOKIE = 'crown_admin_token';
const ADMIN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'crown-admin-1974';
const VALID_CREDENTIALS = {
  admin: process.env.ADMIN_PASSWORD || 'crownwatch2024',
};

export async function signToken(username: string): Promise<string> {
  const payload = `${username}:${Date.now()}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ADMIN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const hash = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${btoa(payload)}.${hash}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [payloadB64, hash] = token.split('.');
    if (!payloadB64 || !hash) return false;
    const payload = atob(payloadB64);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(ADMIN_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const sigBytes = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
    return crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payload));
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  return (
    username === 'admin' &&
    password === VALID_CREDENTIALS.admin
  );
}

export const AUTH_COOKIE_NAME = ADMIN_COOKIE;
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24, // 24 hours
};
