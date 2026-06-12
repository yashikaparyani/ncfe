import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminAssessments from '@/components/portal/admin/AdminAssessments';

export const metadata: Metadata = buildMetadata({
  title: 'Assessments',
  path: '/admin/assessments',
  noindex: true,
});

export default function AdminAssessmentsPage() {
  return <AdminAssessments />;
}
