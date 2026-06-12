/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────
// Security headers applied to every response.
// Note: Content-Security-Policy is set per-request (with a nonce) in
// `src/middleware.ts`, so it is intentionally NOT listed here.
// ─────────────────────────────────────────────────────────────
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains, and allow preload listing.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Disallow the site from being framed (clickjacking protection).
  { key: 'X-Frame-Options', value: 'DENY' },
  // Stop browsers from MIME-sniffing responses away from the declared type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Send only the origin on cross-origin requests.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Lock down powerful browser features the site does not use.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  },
  // Isolate this origin's browsing context group.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework/version to attackers.
  poweredByHeader: false,
  // Emit a standalone server bundle for lean, reproducible container deploys.
  // On Netlify the official Next.js runtime packages the app itself, so we let
  // it use the default output there (standalone confuses the adapter).
  output: process.env.NETLIFY ? undefined : 'standalone',
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    // No remote image hosts are trusted by default; add them explicitly here.
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
