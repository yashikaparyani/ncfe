/**
 * Auth configuration — pure constants and types shared by the server actions,
 * the Edge middleware route guard, and server components.
 *
 * This module has NO runtime dependencies on `next/headers`, Node APIs, or the
 * DOM, so it is safe to import from the Edge runtime (middleware) and the
 * browser bundle alike. Secrets and credential checks live elsewhere
 * (`actions.ts`, server-only) — nothing here is sensitive.
 */

export const ROLES = ['candidate', 'entity', 'admin', 'invigilator', 'proctor'] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}

/** A logged-in user's session payload (stored signed in an HttpOnly cookie). */
export interface Session {
  readonly email: string;
  readonly role: Role;
  readonly name: string;
}

/** Name of the HttpOnly session cookie. */
export const SESSION_COOKIE = 'ncfe_session';

/** Landing dashboard for each role after login. */
export const DASHBOARD_BY_ROLE: Record<Role, string> = {
  candidate: '/candidate/dashboard',
  entity: '/entity/dashboard',
  admin: '/admin/dashboard',
  invigilator: '/invigilator/dashboard',
  proctor: '/proctor/dashboard',
};

/** Public auth routes (rendered without the marketing header/footer chrome). */
export const AUTH_ROUTES = ['/login', '/staff-login', '/forgot-password', '/change-password-first-login'] as const;

/** Path prefixes that require an authenticated session of the given role. */
const PROTECTED_PREFIXES: ReadonlyArray<{ prefix: string; role: Role }> = [
  { prefix: '/candidate', role: 'candidate' },
  { prefix: '/entity', role: 'entity' },
  { prefix: '/admin', role: 'admin' },
  { prefix: '/invigilator', role: 'invigilator' },
  { prefix: '/proctor', role: 'proctor' },
];

/**
 * Routes that live under a protected prefix but stay publicly reachable
 * (registration entry points used before an account exists).
 */
const PUBLIC_EXCEPTIONS = ['/candidate/register', '/entity/register'];

/** Returns the role required to view `pathname`, or null if it is public. */
export function requiredRoleFor(pathname: string): Role | null {
  if (PUBLIC_EXCEPTIONS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }
  const match = PROTECTED_PREFIXES.find(
    (p) => pathname === p.prefix || pathname.startsWith(`${p.prefix}/`),
  );
  return match ? match.role : null;
}

/** True for the auth pages, which render chrome-free and must not be indexed. */
export function isAuthRoute(pathname: string): boolean {
  return (AUTH_ROUTES as readonly string[]).includes(pathname);
}
