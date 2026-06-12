/**
 * Server-only session reader for Server Components and Server Actions.
 * Reads the HttpOnly cookie via `next/headers` and verifies its signature.
 * Importing `next/headers` makes this module server-only at build time, so it
 * can never be pulled into the client bundle.
 */
import { cookies } from 'next/headers';
import { SESSION_COOKIE, type Session } from './config';
import { verifySessionToken } from './session';

/** Returns the verified session for the current request, or null. */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
