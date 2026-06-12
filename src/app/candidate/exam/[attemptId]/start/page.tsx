import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ExamPlayer from '@/components/portal/candidate/ExamPlayer';

export const metadata: Metadata = buildMetadata({
  title: 'Exam in Progress',
  path: '/candidate/exam',
  noindex: true,
});

export default async function ExamStartPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  return <ExamPlayer attemptId={attemptId} />;
}
