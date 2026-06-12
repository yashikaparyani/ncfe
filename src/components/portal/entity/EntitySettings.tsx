'use client';

import { useMemo, useState } from 'react';
import { Clock, Info, Lock, Mail, Phone } from 'lucide-react';
import PortalTopbar from '../PortalTopbar';
import '@/styles/portal/pages.css';
import '@/styles/portal/entity.css';

const TOPBAR = {
  name: 'Entity Manager',
  meta: 'Delhi Public School · ENT-1001',
  initials: 'DP',
  avatarColor: 'navy' as const,
};

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST) — UTC+5:30' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST) — UTC+4' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT) — UTC+8' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT) — UTC+0' },
  { value: 'America/New_York', label: 'Eastern Time (ET) — UTC−5' },
] as const;

function formatInTimezone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function formatIst(date: Date): string {
  return formatInTimezone(date, 'Asia/Kolkata');
}

export default function EntitySettings() {
  const [email, setEmail] = useState('contact@dpsdwarka.edu.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [timezone, setTimezone] = useState<(typeof TIMEZONES)[number]['value']>('Asia/Kolkata');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(true);

  const now = useMemo(() => new Date(), [timezone]);

  const verifyEmail = () => {
    if (emailOtpSent && emailOtp.trim().length >= 4) {
      setEmailVerified(true);
      setEmailOtpSent(false);
      setEmailOtp('');
    } else {
      setEmailVerified(false);
      setEmailOtpSent(true);
    }
  };

  const verifyPhone = () => {
    if (phoneOtpSent && phoneOtp.trim().length >= 4) {
      setPhoneVerified(true);
      setPhoneOtpSent(false);
      setPhoneOtp('');
    } else {
      setPhoneVerified(false);
      setPhoneOtpSent(true);
    }
  };

  return (
    <div className="dash__main">
      <PortalTopbar {...TOPBAR} />
      <div className="dash__content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Settings</h1>
            <p className="pg-head__sub">
              Manage contact details and display timezone. Exam slots and quiz attempts run on IST.
            </p>
          </div>
        </header>

        <p className="pg-banner pg-banner--warn">
          <Info size={16} aria-hidden="true" />
          Slot scheduling and quiz attempts are always executed in <strong>IST (Asia/Kolkata)</strong>.
          Your selected timezone is for display only.
        </p>

        <div className="entity-settings">
          <section className="entity-settings__card" aria-labelledby="entity-profile-title">
            <h2 id="entity-profile-title" className="entity-settings__title">
              Entity Profile
            </h2>

            <div className="form__group">
              <label className="form__label" htmlFor="entity-name">
                Entity name
              </label>
              <div className="entity-settings__locked">
                <input
                  id="entity-name"
                  className="form__input"
                  value="Delhi Public School, Dwarka"
                  readOnly
                  aria-readonly="true"
                />
                <span className="entity-settings__lock-badge">
                  <Lock size={14} aria-hidden="true" /> NCFE managed
                </span>
              </div>
              <p className="entity-settings__hint">
                Entity name can only be changed by NCFE after verification.
              </p>
            </div>
          </section>

          <section className="entity-settings__card" aria-labelledby="entity-contact-title">
            <h2 id="entity-contact-title" className="entity-settings__title">
              Contact Details
            </h2>
            <p className="entity-settings__hint" style={{ marginTop: 0 }}>
              Email and phone changes require OTP verification before they take effect.
            </p>

            <div className="form__group">
              <label className="form__label" htmlFor="entity-email">
                <Mail size={14} aria-hidden="true" /> Official email
              </label>
              <input
                id="entity-email"
                type="email"
                className="form__input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailVerified(false);
                }}
              />
              {emailOtpSent && (
                <input
                  type="text"
                  className="form__input"
                  placeholder="Enter OTP sent to email"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label="Email verification OTP"
                  style={{ marginTop: 8 }}
                />
              )}
              <div className="entity-settings__verify-row">
                <button type="button" className="btn btn--secondary btn--sm" onClick={verifyEmail}>
                  {emailOtpSent ? 'Confirm OTP' : 'Verify with OTP'}
                </button>
                {emailVerified && <span className="entity-settings__verified">Verified</span>}
              </div>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="entity-phone">
                <Phone size={14} aria-hidden="true" /> Contact number
              </label>
              <input
                id="entity-phone"
                type="tel"
                className="form__input"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneVerified(false);
                }}
              />
              {phoneOtpSent && (
                <input
                  type="text"
                  className="form__input"
                  placeholder="Enter OTP sent to mobile"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label="Phone verification OTP"
                  style={{ marginTop: 8 }}
                />
              )}
              <div className="entity-settings__verify-row">
                <button type="button" className="btn btn--secondary btn--sm" onClick={verifyPhone}>
                  {phoneOtpSent ? 'Confirm OTP' : 'Verify with OTP'}
                </button>
                {phoneVerified && <span className="entity-settings__verified">Verified</span>}
              </div>
            </div>
          </section>

          <section className="entity-settings__card" aria-labelledby="entity-timezone-title">
            <h2 id="entity-timezone-title" className="entity-settings__title">
              <Clock size={18} aria-hidden="true" /> Timezone
            </h2>

            <div className="form__group">
              <label className="form__label" htmlFor="entity-timezone">
                Display timezone
              </label>
              <select
                id="entity-timezone"
                className="form__select"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value as (typeof TIMEZONES)[number]['value'])}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="entity-settings__time-preview">
              <div>
                <span className="entity-settings__time-label">Your timezone</span>
                <strong>{formatInTimezone(now, timezone)}</strong>
              </div>
              <div>
                <span className="entity-settings__time-label">Exam time (IST)</span>
                <strong>{formatIst(now)}</strong>
              </div>
            </div>
            <p className="entity-settings__hint">
              All slot management and quiz attempt windows are enforced in IST regardless of your display
              preference.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
