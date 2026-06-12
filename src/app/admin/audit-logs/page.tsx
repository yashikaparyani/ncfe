import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Audit Logs',
  path: '/admin/audit-logs',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'AUD-90012', name: 'Assessment "NFLAT – Q2 2024" published', category: 'Assessment', status: 'Active' },
  { id: 'AUD-90011', name: 'Entity "Amity University" suspended', category: 'Entity', status: 'Active' },
  { id: 'AUD-90010', name: 'Role permissions updated for Reviewer', category: 'RBAC', status: 'Active' },
  { id: 'AUD-90009', name: 'Bulk candidate upload processed', category: 'Candidate', status: 'Active' },
  { id: 'AUD-90008', name: 'OTP policy modified', category: 'Master', status: 'Active' },
];

export default function AdminAuditLogsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Audit Logs"
      subtitle="Searchable, tamper-evident trail of sensitive actions with actor and timestamp."
      categoryLabel="Module"
      rows={rows}
    />
  );
}
