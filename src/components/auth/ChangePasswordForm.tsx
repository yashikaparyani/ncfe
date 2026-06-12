'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * First-login password change (demo scaffold). Enforces a basic match check
 * client-side; a real implementation would also validate the policy and
 * persist server-side, then rotate the session.
 */
export default function ChangePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    router.push('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Update Password</h1>
          <p className="auth__subtitle">
            For your security, please change your system-generated password before continuing.
          </p>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth__error" role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="auth__field">
            <label className="auth__label" htmlFor="new-password">
              New Password
            </label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon" aria-hidden="true" />
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                className="auth__input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
            </div>
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon" aria-hidden="true" />
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                className="auth__input"
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setError('');
                }}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth__btn">
            <CheckCircle2 size={18} aria-hidden="true" /> Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
