import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Reports',
  path: '/entity/reports',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'RPT-1001', name: 'Candidate Enrollment Report', category: 'Enrollment', status: 'Active' },
  { id: 'RPT-1002', name: 'Exam Attendance Report', category: 'Attendance', status: 'Active' },
  { id: 'RPT-1003', name: 'Slot Performance Summary', category: 'Performance', status: 'Active' },
  { id: 'RPT-1004', name: 'Incident & Escalation Log', category: 'Incidents', status: 'Active' },
  { id: 'RPT-1005', name: 'Candidate Result Summary', category: 'Results', status: 'Active' },
];

export default function EntityReportsPage() {
  return (
    <PortalListPage
      title="Reports"
      subtitle="Generate candidate, attendance, slot-utilisation and incident reports."
      categoryLabel="Report Type"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
