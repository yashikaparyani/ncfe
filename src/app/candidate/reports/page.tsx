import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Reports',
  path: '/candidate/reports',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'RPT-1001', name: 'Assessment History Report', category: 'History', status: 'Active' },
  { id: 'RPT-1002', name: 'Score Progress Summary', category: 'Performance', status: 'Active' },
  { id: 'RPT-1003', name: 'Attendance Record', category: 'Attendance', status: 'Active' },
  { id: 'RPT-1004', name: 'Certificate Issuance Log', category: 'Certificates', status: 'Active' },
];

export default function CandidateReportsPage() {
  return (
    <PortalListPage
      title="Reports"
      subtitle="Download personal assessment, score and attendance reports."
      categoryLabel="Report Type"
      rows={rows}
      topbar={{ name: 'Rohan Sharma', meta: 'Candidate ID: CND125678', initials: 'RS' }}
    />
  );
}
