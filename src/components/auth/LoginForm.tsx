'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, KeyRound, AlertCircle } from 'lucide-react';
import { loginAction, type LoginState } from '@/lib/auth/actions';
import { LOGIN_ROLE_TABS, DEMO_EMAILS, DEMO_PASSWORD } from '@/lib/auth/demo';
import type { Role } from '@/lib/auth/config';

const INITIAL: LoginState = { error: null };

/** Public sign-in shows only candidate & entity; NCFE staff sign in elsewhere. */
const PUBLIC_TABS = LOGIN_ROLE_TABS.filter((t) => t.key !== 'admin');
/** Staff sign-in (separate URL) shows the NCFE Staff role only. */
const STAFF_TABS = LOGIN_ROLE_TABS.filter((t) => t.key === 'admin');

/** Demo emails visible under each form, scoped to its audience. */
const PUBLIC_DEMO_EMAILS = DEMO_EMAILS.filter(
  (e) => e === 'candidate@ncfe.com' || e === 'entity@ncfe.com',
);
const STAFF_DEMO_EMAILS = DEMO_EMAILS.filter(
  (e) => e !== 'candidate@ncfe.com' && e !== 'entity@ncfe.com',
);

/**
 * Login form. Submits to the `loginAction` Server Action (CSRF-safe), which
 * verifies credentials server-side and sets an HttpOnly session cookie. The
 * role tabs are a demo convenience that prefill a matching account email; the
 * server determines the real role from the credentials.
 *
 * `audience` separates the public candidate/entity sign-in from the NCFE staff
 * sign-in, which lives at its own URL (`/staff-login`) so staff access is not
 * advertised on the public login page.
 */
export default function LoginForm({ audience = 'public' }: { audience?: 'public' | 'staff' }) {
  const staff = audience === 'staff';
  const tabs = staff ? STAFF_TABS : PUBLIC_TABS;
  const demoEmails = staff ? STAFF_DEMO_EMAILS : PUBLIC_DEMO_EMAILS;
  const defaultTab = tabs[0] ?? { key: 'candidate' as Role, email: '' };

  const [state, formAction, pending] = useActionState(loginAction, INITIAL);
  const [activeRole, setActiveRole] = useState<Role>(defaultTab.key);
  const [email, setEmail] = useState(defaultTab.email);

  const selectRole = (key: Role, demoEmail: string) => {
    setActiveRole(key);
    setEmail(demoEmail);
  };

  return (
    <div className="auth-page">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">{staff ? 'NCFE Staff Sign In' : 'Welcome Back'}</h1>
          <p className="auth__subtitle">
            {staff ? 'Restricted access for NCFE staff accounts' : 'Sign in to your NCFE account'}
          </p>
        </div>

        <div className="auth__role-tabs" role="tablist" aria-label="Select account type">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeRole === tab.key}
              className={`auth__role-tab ${activeRole === tab.key ? 'auth__role-tab--active' : ''}`}
              onClick={() => selectRole(tab.key, tab.email)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="auth__form" action={formAction}>
          {state.error && (
            <div className="auth__error" role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              <span>{state.error}</span>
            </div>
          )}

          <div className="auth__field">
            <label className="auth__label" htmlFor="login-email">
              Email Address
            </label>
            <div className="auth__input-wrap">
              <Mail className="auth__input-icon" aria-hidden="true" />
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                className="auth__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="login-password">
              Password
            </label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon" aria-hidden="true" />
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="auth__input"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="auth__options">
            <label className="auth__checkbox-label" htmlFor="login-remember">
              <input id="login-remember" name="remember" type="checkbox" className="auth__checkbox" />
              Remember me
            </label>
            <Link href="/forgot-password" className="auth__link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth__btn" disabled={pending}>
            <LogIn size={18} aria-hidden="true" /> {pending ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="auth__divider">OR</div>

          <button type="button" className="auth__btn auth__btn--secondary" disabled>
            <KeyRound size={18} aria-hidden="true" /> Login with OTP
          </button>
        </form>

        <div className="auth__demo">
          <span className="auth__demo-title">
            Demo accounts — password <code>{DEMO_PASSWORD}</code>
          </span>
          <ul className="auth__demo-list">
            {demoEmails.map((demoEmail) => (
              <li key={demoEmail}>{demoEmail}</li>
            ))}
          </ul>
        </div>

        {staff ? (
          <div className="auth__footer">
            <Link href="/login" className="auth__link">
              ← Back to candidate / entity sign in
            </Link>
          </div>
        ) : (
          <div className="auth__footer">
            Don&apos;t have an account?{' '}
            <Link href="/candidate/register" className="auth__link">
              Register Here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
