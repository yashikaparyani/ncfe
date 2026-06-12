import type { Metadata } from 'next';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import ScreenScaffold from '@/components/common/ScreenScaffold';

export const metadata: Metadata = buildMetadata({
  title: 'Confirm Enrollment',
  path: '/candidate/exams',
  noindex: true,
});

const detailRows = [
  { label: 'Cycle', value: 'NFLAT 2024-25' },
  { label: 'Mode', value: 'Remote Proctored' },
  { label: 'Entity', value: 'Kendriya Vidyalaya, Vashi' },
];

export default async function EnrollPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;

  return (
    <ScreenScaffold
      title="Confirm Enrollment"
      subtitle={`Exam ${examId} • National Financial Literacy Assessment Test (NFLAT)`}
      backTo={`/candidate/exams/${examId}`}
      backLabel="Back to Exam Details"
      maxWidth={680}
    >
      <div style={{ background: '#F8FAFF', border: '1px solid #E0E7FF', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
        {detailRows.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < detailRows.length - 1 ? '1px solid #E0E7FF' : 'none' }}>
            <span style={{ color: 'var(--gray-500)' }}>{row.label}</span>
            <strong style={{ color: 'var(--navy)' }}>{row.value}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '14px', background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: 'var(--radius-md)', color: '#9A3412', fontSize: '0.875rem', marginBottom: '20px' }}>
        <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
        <span>Your enrollment request will be sent to your entity admin for slot assignment and approval.</span>
      </div>

      <label className="auth__checkbox-label" style={{ marginBottom: '20px' }}>
        <input type="checkbox" className="auth__checkbox" />
        <span style={{ fontSize: '0.8125rem' }}>I confirm my eligibility and agree to the exam rules and proctoring policy.</span>
      </label>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/candidate/exams" className="btn btn--primary">Submit Enrollment Request</Link>
      </div>
    </ScreenScaffold>
  );
}
