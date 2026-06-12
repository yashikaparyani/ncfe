import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Globe, Repeat, ShieldCheck, Award, type LucideIcon } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import ScreenScaffold from '@/components/common/ScreenScaffold';

export const metadata: Metadata = buildMetadata({
  title: 'Exam Details',
  path: '/candidate/exams',
  noindex: true,
});

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
      <Icon size={20} style={{ color: 'var(--navy)' }} aria-hidden="true" />
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{label}</div>
        <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
      </div>
    </div>
  );
}

export default async function ExamDetailsPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;

  return (
    <ScreenScaffold
      title="National Financial Literacy Assessment Test (NFLAT)"
      subtitle={`Exam ${examId} • NFLAT Cycle 2024-25`}
      backTo="/candidate/exams"
      backLabel="Back to Exams"
      actions={<Link href={`/candidate/exams/${examId}/enroll`} className="btn btn--primary">Enroll</Link>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <Fact icon={Clock} label="Duration" value="60 Minutes" />
        <Fact icon={Repeat} label="Attempts" value="1 Attempt" />
        <Fact icon={Globe} label="Mode" value="Remote Proctored" />
        <Fact icon={ShieldCheck} label="Security" value="SEB + AI Proctoring" />
        <Fact icon={Award} label="Result Policy" value="Instant on submission" />
      </div>

      <h2 style={{ color: 'var(--navy)', marginBottom: '8px', fontSize: '1.1rem' }}>Eligibility</h2>
      <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginBottom: '16px' }}>
        Open to candidates of associated entities for the current exam cycle. You must have an approved
        profile and an available attempt within the cycle window.
      </p>

      <h2 style={{ color: 'var(--navy)', marginBottom: '8px', fontSize: '1.1rem' }}>About this assessment</h2>
      <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
        NFLAT evaluates core financial literacy across budgeting, banking, savings, investments and
        insurance. Questions are multilingual and randomized per candidate.
      </p>
    </ScreenScaffold>
  );
}
