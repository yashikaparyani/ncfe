# NCFE Web — Source of Truth (Security, Accessibility, SEO & Compliance)

> **Read this before every change.** This is the binding engineering standard for the
> `d:\ncfe2\web` production frontend (Next.js 15 App Router, React 19, TypeScript strict).
> It encodes GIGW 3.0, RBI Cyber Security Framework, MeitY/GoI digital-platform norms,
> OWASP, and WCAG 2.1 AA. If a request conflicts with these rules, flag it — do not
> silently weaken the security/compliance posture.
>
> `web/` is the **production** app. `frontend/` is the old demo — do not touch it for prod work.

---

## 0. Golden rules (apply to every prompt)

1. **Never weaken the CSP, security headers, or HSTS** in `next.config.mjs` / `src/middleware.ts`. Adding a new origin to `connect-src`/`img-src`/`script-src` requires an explicit, documented reason.
2. **No third-party CDNs for scripts, styles, or fonts.** Everything is self-hosted and same-origin (`'self'`). No Google Fonts, no `cdn.jsdelivr`, no inline `<script>` without a nonce.
3. **No secrets in client code.** Only `NEXT_PUBLIC_*` env vars reach the browser. API keys, tokens, DB URLs stay server-only.
4. **All user input is untrusted.** Validate and sanitize on the server. Never trust client values, even with client-side validation present.
5. **Every page uses `buildMetadata()`** from `src/lib/seo.ts`. Never hand-roll `<title>`/`<meta>`.
6. **External links must be safe:** `target="_blank"` always pairs with `rel="noopener noreferrer"`.
7. **Accessibility is mandatory, not optional** (GIGW + WCAG 2.1 AA). Semantic HTML, labels, focus, contrast — every component.
8. **Government compliance pages are required and must show a "Last updated" date** (privacy, terms, copyright, hyperlinking, disclaimer, accessibility).
9. **TypeScript strict — no `any`.** Keep `next lint` and `tsc --noEmit` green.
10. **Run only ONE `next dev` at a time** (multiple corrupt `.next` and 404 the CSS).

---

## 1. Architecture & where things live

```
web/
  next.config.mjs              # Security headers (HSTS, XFO, etc.), image policy, output:standalone
  src/
    middleware.ts              # Per-request nonce CSP (production); dev exempt for HMR
    config/site.ts             # SINGLE source of truth: name, URL, nav, keywords, org/social
    lib/
      seo.ts                   # buildMetadata() — use on EVERY page
      structured-data.ts       # JSON-LD: GovernmentOrganization, WebSite, FAQPage
    app/
      layout.tsx               # Root metadata, fonts, JSON-LD injection (nonce-aware)
      robots.ts                # /robots.txt — auth areas disallowed
      sitemap.ts               # /sitemap.xml — public routes only
      manifest.ts              # PWA manifest
      <route>/page.tsx         # Thin pages; export metadata via buildMetadata()
    components/
      common/JsonLd.tsx        # CSP-safe JSON-LD renderer (reads x-nonce)
      layout/ home/ public/    # UI
    styles/globals.css         # Design tokens, reset, a11y utilities, forms, buttons
```

**Pattern:** pages stay thin. Strings about "the site" live in `config/site.ts`. SEO comes from `lib/seo.ts`. Security comes from `middleware.ts` + `next.config.mjs`. Don't duplicate these anywhere else.

---

## 2. Security — the binding standard

### 2.1 HTTP security headers (`next.config.mjs`) — keep all of these
| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS for 2 yrs, preload-eligible |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (legacy backstop for `frame-ancestors`) |
| `X-Content-Type-Options` | `nosniff` | Stop MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()` | Disable unused/abusive features + opt out of FLoC/Topics |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolate browsing context |
| `X-DNS-Prefetch-Control` | `on` | Perf |
| `poweredByHeader` | `false` | Don't advertise Next.js version |

**HTTPS/TLS:** site is HTTPS-only; HSTS enforces it. Submit the domain to the HSTS preload list at deploy. No mixed content (`upgrade-insecure-requests` is in the CSP).

### 2.2 Content-Security-Policy (`src/middleware.ts`) — strongest XSS defense
- **Production:** per-request nonce (`btoa(crypto.randomUUID())`) + `'strict-dynamic'`. Only nonced scripts (and scripts they load) execute. Injected inline scripts are blocked.
- **Development:** strict CSP is skipped (Next HMR/Fast Refresh/error overlay use inline/eval). This is intentional and correct — do not "fix" it.
- Current directives (do not loosen without reason):
  ```
  default-src 'self'
  script-src 'self' 'nonce-…' 'strict-dynamic'
  style-src  'self' 'unsafe-inline'      # Next injects inline <style>; tolerated
  img-src    'self' blob: data:
  font-src   'self'                       # self-hosted fonts only
  connect-src 'self'                      # add API origin here when backend wires in
  object-src 'none'  base-uri 'self'  form-action 'self'
  frame-ancestors 'none'  manifest-src 'self'  upgrade-insecure-requests
  ```
- **Any inline `<script>` (e.g. JSON-LD) MUST carry the nonce.** Use `components/common/JsonLd.tsx` (it reads `x-nonce` from headers) — never write a raw `<script>` in a page.
- When the backend API is on another origin, add it to `connect-src` **only** (not `default-src`).

### 2.3 XSS prevention
- React escapes by default — rely on it. **`dangerouslySetInnerHTML` is banned** except for (a) JSON-LD via `JsonLd.tsx`, (b) sanitized CMS HTML run through a vetted sanitizer (e.g. `isomorphic-dompurify`) on the server. Any new use needs justification in the PR.
- Never build HTML by string concatenation of user input.
- Server-encode/validate all input; treat URL params, headers, and form bodies as hostile.

### 2.4 CSRF protection (required once forms/auth go live)
The contact form (`components/public/ContactForm.tsx`) is **not yet wired** — it must not ship to prod without this. For any state-changing request:
- **Prefer Next.js Server Actions** — they have built-in origin checks (POST + Origin/Host validation) and are the default-safe path. Use them for the contact form and all mutations.
- If using a custom API route instead: implement the **double-submit cookie** or **synchronizer token** pattern, and set session cookies `HttpOnly; Secure; SameSite=Lax` (or `Strict` for auth).
- Add **rate limiting + CAPTCHA** (e.g. hCaptcha/Cloudflare Turnstile, self-hostable) on public forms to stop abuse.
- Validate `Content-Type` and reject cross-origin form posts (`form-action 'self'` already helps).

### 2.5 Authentication & session (RBI / digital-banking aligned — when auth lands)
- Cookies: `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, short TTL, rotate on privilege change.
- Enforce strong password policy + support **MFA** for candidate/entity/admin logins (RBI CSF expectation).
- Lockout/throttling on repeated failures; never reveal whether an account exists.
- All auth routes are `noindex` and `disallow`ed in robots (already done: `/login`, `/forgot-password`, etc.).
- **Encrypt data in transit (TLS) and sensitive data at rest.** No PII in logs, URLs, or localStorage.
- **Audit logs & activity tracking** (GIGW + RBI): log auth events, admin actions, document access — with timestamps and user/IP — to a tamper-evident server-side store. Never log secrets/passwords/OTPs.
- **Secure document handling:** certificates/results served through authenticated, access-controlled endpoints; signed, expiring URLs; never publicly guessable paths.

### 2.6 External links & cross-site safety
- Every `target="_blank"` → `rel="noopener noreferrer"` (prevents reverse-tabnabbing + referrer leak).
- For user-supplied/CMS links, also consider `rel="ugc nofollow"`.
- **Subresource Integrity (SRI):** because we self-host everything there are no third-party `<script>`/`<link>` tags. If one is ever unavoidable, it **must** carry `integrity="sha384-…"` + `crossorigin="anonymous"`. Default answer: self-host instead.
- A **hyperlinking policy page** is a GIGW requirement (see §5).

### 2.7 Dependency & supply-chain hygiene
- Keep the dependency tree minimal (currently: `next`, `react`, `react-dom`, `lucide-react`). Justify every new dependency.
- Run `npm audit` before releases; pin/patch known vulns. Commit `package-lock.json`.
- Never add a dependency that injects remote scripts or phones home.

### 2.8 Fonts — self-host, no Google CDN (GDPR / GIGW privacy)
**Why:** loading fonts from `fonts.googleapis.com` sends the visitor's IP to Google. A German court (LG München, 2022) ruled this a GDPR violation. GIGW/MeitY likewise require minimizing third-party data leakage. So: **zero third-party font requests.**

- **Current:** `next/font/google` (Inter) in `layout.tsx`. This *self-hosts at build time* (no runtime Google request) — already privacy-safe at runtime.
- **Required for full compliance (no Google dependency even at build):** switch to **`next/font/local`** with a **downloaded font package** (e.g. `@fontsource-variable/inter` or committed `.woff2` files in `public/fonts`). This removes the build-time fetch to Google entirely.
  ```ts
  // src/app/layout.tsx — target state
  import localFont from 'next/font/local';
  const inter = localFont({
    src: '../../public/fonts/InterVariable.woff2',  // downloaded, committed
    variable: '--font-inter',
    display: 'swap',
  });
  ```
- `font-src 'self'` in the CSP already enforces this. Never reintroduce a Google Fonts `<link>` or `@import`.

---

## 3. SEO — the binding standard

### 3.1 Every page
- Export `metadata` (or `generateMetadata`) built with **`buildMetadata({ title, description, path })`** from `lib/seo.ts`. This gives you canonical URL, robots, Open Graph, and Twitter card consistently. Never duplicate these by hand.
- `path` must be set so the **canonical URL** is correct (avoids duplicate-content penalties).
- Unique, descriptive `title` (≤ ~60 chars) and `description` (≤ ~160 chars) per page.
- Non-indexable pages (auth, dashboards) → `buildMetadata({ noindex: true })`.

### 3.2 Site-wide (already in place — keep correct)
- `robots.ts` — public crawlable; `/api/`, `/admin/`, `/candidate/`, `/entity/`, `/proctor/`, `/invigilator/`, `/login`, etc. disallowed. Add new private routes here.
- `sitemap.ts` — list every new public, indexable route with sensible `priority`/`changeFrequency`.
- `manifest.ts` — PWA manifest (theme `#0b2545`, categories education/finance/government).
- **Structured data (JSON-LD)** in `lib/structured-data.ts`: `GovernmentOrganization` + `WebSite` injected in `layout.tsx`; `FAQPage` on FAQs. Add `BreadcrumbList` on deep pages and relevant `Course`/`Event` types as content grows. Always render via nonce-aware `JsonLd.tsx`.
- `metadataBase` is set → relative OG images resolve to absolute. OG image is 1200×630.

### 3.3 Semantic HTML & Core Web Vitals
- One `<h1>` per page; logical heading order; `<nav> <main> <header> <footer> <article> <section>` used correctly. `<main id="main-content">` exists for the skip link.
- Descriptive `alt` on all meaningful images; `alt=""` on decorative ones. Use `next/image` (AVIF/WebP already configured).
- Performance counts as SEO **and** GIGW quality: lazy-load below the fold, preload the hero/font, avoid layout shift (CLS), keep JS lean. Target green Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
- Mobile-first **responsive** layout (desktop/tablet/mobile) — a GIGW mandate.

---

## 4. Accessibility — WCAG 2.1 AA + GIGW (mandatory)

- **Semantic, keyboard-operable, screen-reader-friendly.** Every interactive element reachable and usable by keyboard; visible focus states (don't remove outlines without replacement).
- **Labels:** every form control has an associated `<label>` (see `ContactForm.tsx`). Use `aria-*` only to fill gaps semantic HTML can't.
- **Contrast:** text ≥ 4.5:1 (≥ 3:1 large text). Verify token colors in `globals.css`.
- **Images/icons:** meaningful images get `alt`; decorative icons get `aria-hidden="true"` (as Lucide icons do).
- **Status messages:** use `role="status"`/`aria-live` for async feedback (already in contact form).
- **Skip link** to `#main-content`; correct `lang="en-IN"` on `<html>`.
- **Font scaling / "Aa" controls** (gov accessibility bar) must not break layout.
- Provide an **Accessibility Statement page** declaring WCAG 2.1 AA conformance + contact for issues (GIGW required — see §5). Keep its "Last updated" current.
- Don't rely on color alone to convey meaning; respect `prefers-reduced-motion`.

---

## 5. GIGW / RBI / GoI compliance checklist

GIGW 3.0 (MeitY/NIC) + RBI norms. These are **required** for a government financial portal and gate launch:

**Mandatory policy/info pages (each with a visible "Last updated: DD Mon YYYY"):**
- [x] Privacy Policy (`/privacy-policy`)
- [x] Terms of Use / Terms & Conditions (`/terms`)
- [x] Accessibility Statement (`/accessibility`)
- [ ] **Copyright Policy** — add (`/copyright`)
- [ ] **Hyperlinking Policy** — add (`/hyperlinking-policy`)
- [ ] **Disclaimer** — add (`/disclaimer`)
- [ ] **Website Policies** hub linking all of the above (footer "Legal" group)
- [ ] **Help / Sitemap (human-readable)** page

**Ownership & contact (GIGW transparency):**
- Official organization name, ownership ("Owned by NCFE / managed by…"), and full contact (address, email, phone) clearly displayed — footer + Contact page.
- Official branding/emblem; link to parent bodies (RBI/MeitY/GoI) where applicable.
- "Last reviewed/updated" date on important content pages.

**Quality & certification:**
- Target **STQC / CQW (Certified Quality Website)** conformance: valid HTML, working links (no broken links), consistent navigation, error-free content, responsive, accessible.
- No broken links — verify before release.
- Content in plain language; English (`en-IN`); consider Hindi/regional where mandated.

**Security posture (GIGW + RBI CSF):**
- HTTPS everywhere, security headers, audit logging, data encryption, vulnerability protection (OWASP Top 10), regular security testing/VAPT before go-live.
- Incident response & periodic audit alignment with RBI Cyber Security Framework where the portal touches financial data.

**Reference standards:** GIGW 3.0 (guidelines.gov.in), RBI Cyber Security Framework circulars, OWASP Top 10 / ASVS, W3C WCAG 2.1, NIST 800-53.

---

## 6. Definition of done (run before declaring a task complete)

- [ ] `npm run typecheck` (`tsc --noEmit`) and `npm run lint` are clean.
- [ ] New page: uses `buildMetadata({ path })`; added to `sitemap.ts`; private routes added to `robots.ts`.
- [ ] No new third-party CDN/script/font/style origins; CSP unchanged or justified.
- [ ] External links have `rel="noopener noreferrer"`; no unsafe `dangerouslySetInnerHTML`.
- [ ] Forms/mutations use Server Actions (CSRF-safe) + server-side validation/sanitization.
- [ ] Accessibility: labels, keyboard, focus, contrast, alt text checked.
- [ ] Any new policy/legal page shows a "Last updated" date.
- [ ] No secrets outside server-only env; only `NEXT_PUBLIC_*` exposed.
- [ ] Only one `next dev` running; page renders styled.

---

_Keep this file authoritative. When you change a security/SEO/compliance behavior, update this doc in the same change._
