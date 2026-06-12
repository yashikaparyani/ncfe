import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ExamInstructions from '@/components/portal/candidate/ExamInstructions';

export const metadata: Metadata = buildMetadata({
  title: 'Exam Instructions',
  path: '/candidate/exam',
  noindex: true,
});

export default async function ExamInstructionsPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  return <ExamInstructions attemptId={attemptId} />;
}
