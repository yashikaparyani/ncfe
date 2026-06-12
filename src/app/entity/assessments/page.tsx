import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Assessments',
  path: '/entity/assessments',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'ASMT-1001', name: 'NFLAT – Class 10', category: 'Aptitude', status: 'Active' },
  { id: 'ASMT-1002', name: 'FLQ Quiz – Foundation', category: 'Quiz', status: 'Active' },
  { id: 'ASMT-1003', name: 'Money Smart Assessment', category: 'Certification', status: 'Pending' },
  { id: 'ASMT-1004', name: 'Banking Basics Test', category: 'Module', status: 'Active' },
  { id: 'ASMT-1005', name: 'Investor Awareness Exam', category: 'Certification', status: 'Inactive' },
];

export default function EntityAssessmentsPage() {
  return (
    <PortalListPage
      title="Assessments"
      subtitle="View assigned assessments and manage permitted entity exams."
      categoryLabel="Type"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
