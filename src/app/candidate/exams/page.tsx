import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateExams from '@/components/portal/candidate/CandidateExams';

export const metadata: Metadata = buildMetadata({
  title: 'My Assessments',
  path: '/candidate/exams',
  noindex: true,
});

export default function CandidateExamsPage() {
  return <CandidateExams />;
}
