'use client';

import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/styles/portal/pages.css';

/**
 * Lightweight standalone-screen scaffold: gray page background, a Back action,
 * and a white content card with title/subtitle. Used by detail/form screens
 * that aren't part of a wizard or dashboard sidebar (ported from the prototype).
 */
export default function ScreenScaffold({
  title,
  subtitle,
  backTo,
  backLabel = 'Back',
  actions,
  children,
  maxWidth = 960,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  children: ReactNode;
  maxWidth?: number;
}) {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)', padding: '32px 20px' }}>
      <div style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
        <button
          type="button"
          onClick={() => (backTo ? router.push(backTo) : router.back())}
          className="btn btn--secondary"
          style={{ marginBottom: '20px', background: 'var(--white)' }}
        >
          <ArrowLeft size={16} aria-hidden="true" /> {backLabel}
        </button>

        <div
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '24px',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h1 style={{ color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '4px' }}>{title}</h1>
              {subtitle && <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{subtitle}</p>}
            </div>
            {actions}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
