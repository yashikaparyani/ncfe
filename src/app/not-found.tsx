import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        gap: '12px',
      }}
    >
      <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy)' }}>404</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>Page not found</h1>
      <p style={{ color: 'var(--gray-600)', maxWidth: '420px' }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn--primary" style={{ marginTop: '8px' }}>
        Back to home
      </Link>
    </section>
  );
}
