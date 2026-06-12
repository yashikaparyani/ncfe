import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Roles & Permissions',
  path: '/admin/roles-permissions',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'ROL-1001', name: 'Super Admin', category: 'Global', status: 'Active' },
  { id: 'ROL-1002', name: 'Reviewer', category: 'Verification', status: 'Active' },
  { id: 'ROL-1003', name: 'Question Bank Admin', category: 'Question Bank', status: 'Active' },
  { id: 'ROL-1004', name: 'Reports Analyst', category: 'Reporting', status: 'Active' },
  { id: 'ROL-1005', name: 'System Admin', category: 'System Operations', status: 'Active' },
];

export default function AdminRolesPermissionsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Roles & Permissions"
      subtitle="Configure RBAC roles and the permission matrix with an auditable trail."
      categoryLabel="Scope"
      rows={rows}
    />
  );
}
