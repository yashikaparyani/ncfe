import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Exam Submitted',
  path: '/candidate/exam',
  noindex: true,
});

const summary = [
  { value: '40', label: 'Attempted' },
  { value: '5', label: 'Unattempted' },
  { value: '3', label: 'Marked for Review' },
];

export default async function ExamCompletedPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '48px', maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <CheckCircle2 size={64} style={{ color: 'var(--green)', margin: '0 auto 16px' }} aria-hidden="true" />
        <h1 style={{ color: 'var(--navy)', fontSize: '1.75rem', marginBottom: '8px' }}>Exam Submitted Successfully</h1>
        <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>
          Your responses for attempt <strong>{attemptId}</strong> have been recorded. Results will be available
          as per the assessment&apos;s result policy.
        </p>
        <div style={{ background: '#F8FAFF', border: '1px solid #E0E7FF', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-around' }}>
          {summary.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/candidate/dashboard" className="btn btn--primary">Back to Dashboard</Link>
          <Link href="/candidate/results" className="btn btn--secondary">View Results</Link>
        </div>
      </div>
    </div>
  );
}
