import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Entity Users',
  path: '/entity/users',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'USR-1001', name: 'Anita Verma', category: 'Entity Manager', status: 'Active' },
  { id: 'USR-1002', name: 'Suresh Iyer', category: 'Candidate Manager', status: 'Active' },
  { id: 'USR-1003', name: 'Fatima Khan', category: 'Exam Manager', status: 'Active' },
  { id: 'USR-1004', name: 'Deepak Rao', category: 'Viewer', status: 'Pending' },
  { id: 'USR-1005', name: 'Meera Joshi', category: 'Candidate Manager', status: 'Inactive' },
];

export default function EntityUsersPage() {
  return (
    <PortalListPage
      title="Entity Users"
      subtitle="Create entity users and assign operational roles."
      categoryLabel="Role"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
