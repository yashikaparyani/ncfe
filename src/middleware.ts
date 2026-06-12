import { NextResponse, type NextRequest } from 'next/server';
import { DASHBOARD_BY_ROLE, SESSION_COOKIE, requiredRoleFor } from '@/lib/auth/config';
import { verifySessionToken } from '@/lib/auth/session';

/**
 * Per-request middleware. Two responsibilities, in order:
 *
 *  1. Route guard — protected role areas (`/candidate`, `/admin`, …) require a
 *     valid signed session cookie for the matching role; otherwise the request
 *     is redirected to `/login`. An already-authenticated user hitting
 *     `/login` is sent on to their dashboard. This runs in BOTH dev and prod.
 *
 *  2. Content-Security-Policy — a per-request nonce + `strict-dynamic` CSP, the
 *     strongest practical defence against XSS. Enforced in PRODUCTION ONLY:
 *     Next's dev server (Fast Refresh, HMR, error overlay, client CSS
 *     injection) uses inline/eval scripts a strict CSP would block, leaving the
 *     page unstyled. Do not "fix" the dev exemption.
 *
 * The request pathname is exposed via the `x-pathname` header so the root
 * layout can render auth/dashboard routes without the public header/footer.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Route guard ──────────────────────────────────────────────────────
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const requiredRole = requiredRoleFor(pathname);
  if (requiredRole && session?.role !== requiredRole) {
    const url = request.nextUrl.clone();
    url.pathname = session ? DASHBOARD_BY_ROLE[session.role] : '/login';
    url.search = '';
    return NextResponse.redirect(url);
  }
  // Bounce authenticated users away from the login page to their dashboard.
  if (pathname === '/login' && session) {
    const url = request.nextUrl.clone();
    url.pathname = DASHBOARD_BY_ROLE[session.role];
    url.search = '';
    return NextResponse.redirect(url);
  }

  // The Resources library is for registered users only: any authenticated
  // session may view it; guests are sent to sign in first.
  if (!session && (pathname === '/resources' || pathname.startsWith('/resources/'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // ── 2. CSP (production only) ─────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const nonce = btoa(crypto.randomUUID());
  const csp = [
    `default-src 'self'`,
    // 'strict-dynamic' lets trusted (nonced) scripts load further scripts;
    // host-source allowlists are ignored by browsers when it is present.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // Next injects some inline <style>; allow inline styles only.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
  ]
    .filter(Boolean)
    .join('; ');

  // Expose the nonce to the app and re-send the CSP so Next can read the nonce.
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static assets and image optimisation, and skip
     * prefetch requests (no need to spend a nonce on those).
     */
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
