import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ScanFace } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import ScreenScaffold from '@/components/common/ScreenScaffold';

export const metadata: Metadata = buildMetadata({
  title: 'Identity Verification',
  path: '/candidate/exam',
  noindex: true,
});

const dropZone = {
  aspectRatio: '4/3',
  background: 'var(--gray-100)',
  borderRadius: 'var(--radius-md)',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--gray-500)',
  border: '2px dashed var(--gray-300)',
};

export default async function IdentityVerificationPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;

  return (
    <ScreenScaffold
      title="Identity Verification"
      subtitle="Capture a live photo and verify your ID before starting the exam."
      backTo={`/candidate/exam/${attemptId}/precheck`}
      backLabel="Back to Pre-Check"
      maxWidth={760}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <span className="form__label">Live Photo</span>
          <div style={dropZone}>
            <Camera size={40} aria-hidden="true" />
            <span style={{ fontSize: '0.8125rem', marginTop: '8px' }}>Camera preview</span>
          </div>
          <button type="button" className="btn btn--secondary" style={{ marginTop: '12px', width: '100%' }}>
            <Camera size={16} aria-hidden="true" /> Capture Photo
          </button>
        </div>
        <div>
          <span className="form__label">ID Proof</span>
          <div style={dropZone}>
            <ScanFace size={40} aria-hidden="true" />
            <span style={{ fontSize: '0.8125rem', marginTop: '8px' }}>Upload / scan ID</span>
          </div>
          <button type="button" className="btn btn--secondary" style={{ marginTop: '12px', width: '100%' }}>
            Upload ID
          </button>
        </div>
      </div>

      <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={`/candidate/exam/${attemptId}/instructions`} className="btn btn--primary">
          Submit &amp; Continue
        </Link>
      </div>
    </ScreenScaffold>
  );
}
