import { CheckCircle2 } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', borderBottom: '1px solid #E0E7FF', paddingBottom: '16px' }}>
      <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{label}</div>
      <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{value}</div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={CheckCircle2} color="#22C55E" bg="#F0FDF4" title="Review & Publish" desc="Verify your configuration before making the assessment live." />

      <div style={{ background: '#F8FAFF', borderRadius: '8px', border: '1px solid #E0E7FF', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Row label="Assessment Name" value="National Financial Literacy Assessment Test (NFLAT) 2024" />
        <Row label="Cycle & Timing" value="NFLAT 2024-25 • Auto-lock after end date • IST" />
        <Row label="Type & Delivery" value="Automated • SEB Mandatory • AI Proctoring" />
        <Row label="Questions & Scoring" value="Rule-Based • 15 Questions • 1 Mark Each • 40% Pass" />
        <Row label="Randomization" value="Question & Option shuffle enabled" />
        <Row label="Duration & Retake" value="60 Minutes • 0 Retakes • Best Score" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Result & Eligibility</div>
          <div style={{ fontWeight: 600, color: 'var(--navy)' }}>Instant results • Students • Mapped entities</div>
        </div>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#FFF7ED', borderRadius: 'var(--radius-md)', border: '1px solid #FFEDD5', fontSize: '0.875rem', color: '#9A3412' }}>
        <strong>Note:</strong> Once published, structural changes (like total duration or scoring method) cannot be modified if candidates have already enrolled.
      </div>
    </div>
  );
}
