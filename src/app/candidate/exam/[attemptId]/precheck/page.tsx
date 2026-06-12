import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ExamPreCheck from '@/components/portal/candidate/ExamPreCheck';

export const metadata: Metadata = buildMetadata({
  title: 'System Readiness Check',
  path: '/candidate/exam',
  noindex: true,
});

export default async function ExamPreCheckPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  return <ExamPreCheck attemptId={attemptId} />;
}
