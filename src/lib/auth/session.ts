/**
 * Stateless session token: a base64url JSON payload with an HMAC-SHA256
 * signature, verified on every protected request.
 *
 * Uses the Web Crypto API (`crypto.subtle`) so the exact same code runs in the
 * Edge middleware and in Node server actions/components. The signing key is a
 * server-only secret (`AUTH_SECRET`) and never reaches the client. This is the
 * demo's stand-in for a real session store; the cookie that carries the token
 * is HttpOnly + Secure + SameSite (see `actions.ts`), so the token is not
 * readable from JavaScript and cannot be tampered with without the secret.
 */
import { isRole, type Session } from './config';

const encoder = new TextEncoder();

/**
 * Server-only signing secret. In production this MUST be provided via the
 * `AUTH_SECRET` environment variable; the development fallback is intentionally
 * obvious so a missing secret is caught before go-live.
 */
function configuredSecret(): string | null {
  const value = process.env.AUTH_SECRET;
  if (value && value.length > 0) return value;
  return null;
}

function requireSecret(): string {
  const value = configuredSecret();
  if (value) return value;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET must be set in production.');
  }
  return 'dev-insecure-secret-change-me';
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    input.length + ((4 - (input.length % 4)) % 4),
    '=',
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Constant-time comparison to avoid leaking signature bytes via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

/** Create a signed `payload.signature` token for the given session. */
export async function createSessionToken(session: Session): Promise<string> {
  const payload = base64UrlEncode(encoder.encode(JSON.stringify(session)));
  const key = await hmacKey(requireSecret());
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return `${payload}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/** Verify a token and return its session, or null if missing/invalid/tampered. */
export async function verifySessionToken(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  const dot = token.indexOf('.');
  if (dot <= 0) return null;

  const payload = token.slice(0, dot);
  const providedSig = token.slice(dot + 1);

  const secret = configuredSecret() ?? (process.env.NODE_ENV === 'production' ? null : requireSecret());
  if (!secret) return null;

  const key = await hmacKey(secret);
  const expectedSig = base64UrlEncode(
    new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload))),
  );
  if (!timingSafeEqual(providedSig, expectedSig)) return null;

  try {
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload))) as unknown;
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'email' in decoded &&
      'role' in decoded &&
      'name' in decoded &&
      typeof (decoded as Session).email === 'string' &&
      typeof (decoded as Session).name === 'string' &&
      isRole((decoded as Session).role)
    ) {
      return decoded as Session;
    }
    return null;
  } catch {
    return null;
  }
}
