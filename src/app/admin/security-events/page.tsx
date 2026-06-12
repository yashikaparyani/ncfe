import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Security Events',
  path: '/admin/security-events',
  noindex: true,
});

// Status is read as: Active = open, Pending = under investigation, Inactive = resolved.
const rows: readonly ListRow[] = [
  { id: 'SEC-7001', name: 'Repeated failed logins (5+)', category: 'Authentication', status: 'Active' },
  { id: 'SEC-7002', name: 'Account locked after lockout threshold', category: 'Authentication', status: 'Pending' },
  { id: 'SEC-7003', name: 'MFA disabled by admin', category: 'MFA', status: 'Pending' },
  { id: 'SEC-7004', name: 'Permission-denied access attempt', category: 'Authorization', status: 'Inactive' },
  { id: 'SEC-7005', name: 'Suspicious data export request', category: 'Data Access', status: 'Active' },
];

export default function AdminSecurityEventsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Security Events"
      subtitle="Track failed logins, lockouts, MFA changes, denied access and suspicious activity."
      categoryLabel="Event Type"
      rows={rows}
    />
  );
}
