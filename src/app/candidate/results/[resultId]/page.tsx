import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AssessmentResult from '@/components/portal/candidate/AssessmentResult';

export const metadata: Metadata = buildMetadata({
  title: 'Assessment Result',
  path: '/candidate/results',
  noindex: true,
});

export default async function CandidateResultDetailPage({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const { resultId } = await params;
  return <AssessmentResult resultId={resultId} />;
}
