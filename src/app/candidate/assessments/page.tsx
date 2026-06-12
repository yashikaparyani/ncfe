import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateAssessments from '@/components/portal/candidate/CandidateAssessments';

export const metadata: Metadata = buildMetadata({
  title: 'My Assessments',
  path: '/candidate/assessments',
  noindex: true,
});

export default function CandidateAssessmentsPage() {
  return <CandidateAssessments />;
}
