'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';

/**
 * Contact form. Client component for local submit state.
 *
 * NOTE: wire `handleSubmit` to a server action or authenticated API endpoint
 * before going live. Any real endpoint MUST validate/sanitise input
 * server-side and add anti-abuse protection (rate limiting + CAPTCHA);
 * never trust these client values.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form__group">
        <label className="form__label" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          className="form__input"
          type="text"
          autoComplete="name"
          maxLength={120}
          required
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          className="form__input"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form__input"
          rows={5}
          maxLength={2000}
          required
        />
      </div>
      <button type="submit" className="btn btn--primary btn--lg" disabled={submitted}>
        {submitted ? (
          'Message Sent!'
        ) : (
          <>
            <Send size={18} aria-hidden="true" /> Send Message
          </>
        )}
      </button>
      {submitted && (
        <p className="contact-form__status" role="status">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      )}
    </form>
  );
}
