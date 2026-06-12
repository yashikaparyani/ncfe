'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

/**
 * Forgot-password request form (demo scaffold — no mail is actually sent).
 * On submit it shows a neutral confirmation that never reveals whether the
 * account exists, per web/CLAUDE.md §2.5.
 */
export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth__container">
        <Link
          href="/login"
          className="auth__link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Login
        </Link>

        <div className="auth__header">
          <h1 className="auth__title">Forgot Password</h1>
          <p className="auth__subtitle">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="auth__error" role="status" style={{ color: 'var(--green)', background: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>If an account exists for that email, a reset link is on its way.</span>
          </div>
        ) : (
          <form
            className="auth__form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="auth__field">
              <label className="auth__label" htmlFor="forgot-email">
                Email Address
              </label>
              <div className="auth__input-wrap">
                <Mail className="auth__input-icon" aria-hidden="true" />
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="auth__input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth__btn">
              Send Reset Link <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        )}

        <div className="auth__footer">
          Remember your password?{' '}
          <Link href="/login" className="auth__link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
