import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Alerts',
  path: '/proctor/alerts',
  noindex: true,
});

const TOPBAR = { name: 'NCFE Proctor', meta: 'Proctoring Console', initials: 'NP', avatarColor: 'navy' as const };

// Status is read as: Active = open alert, Pending = acknowledged, Inactive = dismissed.
const rows: readonly ListRow[] = [
  { id: 'ALR-1001', name: 'Multiple faces detected', category: 'High', status: 'Active' },
  { id: 'ALR-1002', name: 'Candidate left the frame', category: 'Medium', status: 'Active' },
  { id: 'ALR-1003', name: 'Tab switch detected', category: 'Medium', status: 'Pending' },
  { id: 'ALR-1004', name: 'Background audio anomaly', category: 'Low', status: 'Inactive' },
  { id: 'ALR-1005', name: 'No face detected', category: 'High', status: 'Active' },
];

export default function ProctorAlertsPage() {
  return (
    <PortalListPage
      title="Alerts"
      subtitle="Live proctoring alerts and AI-flagged behaviour, by severity."
      categoryLabel="Severity"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
