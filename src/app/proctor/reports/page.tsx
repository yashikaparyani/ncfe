import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Reports',
  path: '/proctor/reports',
  noindex: true,
});

const TOPBAR = { name: 'NCFE Proctor', meta: 'Proctoring Console', initials: 'NP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'RPT-4001', name: 'Session Activity Report', category: 'Sessions', status: 'Active' },
  { id: 'RPT-4002', name: 'Flagged Events Summary', category: 'Incidents', status: 'Active' },
  { id: 'RPT-4003', name: 'AI Risk Score Report', category: 'AI Review', status: 'Active' },
  { id: 'RPT-4004', name: 'Escalation Log', category: 'Escalations', status: 'Active' },
];

export default function ProctorReportsPage() {
  return (
    <PortalListPage
      title="Reports"
      subtitle="Session activity, flagged events, AI risk scores and escalation logs."
      categoryLabel="Report Type"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
