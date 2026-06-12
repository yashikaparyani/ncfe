import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Reports & Analytics',
  path: '/admin/reports',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'RPT-3001', name: 'Cycle Participation Summary', category: 'Participation', status: 'Active' },
  { id: 'RPT-3002', name: 'Entity-wise Performance', category: 'Performance', status: 'Active' },
  { id: 'RPT-3003', name: 'Pass / Fail Analytics', category: 'Results', status: 'Active' },
  { id: 'RPT-3004', name: 'Incident & Compliance Report', category: 'Compliance', status: 'Active' },
  { id: 'RPT-3005', name: 'QR Geo-fence Compliance', category: 'Proctoring', status: 'Active' },
];

export default function AdminReportsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Reports & Analytics"
      subtitle="System-wide performance, participation, compliance and incident reports."
      categoryLabel="Report Type"
      rows={rows}
    />
  );
}
