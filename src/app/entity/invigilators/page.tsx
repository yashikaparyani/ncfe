import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Invigilators',
  path: '/entity/invigilators',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'INV-1001', name: 'Ramesh Pillai', category: 'Lab A · Primary', status: 'Active' },
  { id: 'INV-1002', name: 'Sunita Nair', category: 'Lab A · Secondary', status: 'Active' },
  { id: 'INV-1003', name: 'Arvind Menon', category: 'Lab B · Lab Technician', status: 'Pending' },
  { id: 'INV-1004', name: 'Kavya Reddy', category: 'Lab C · Primary', status: 'Active' },
  { id: 'INV-1005', name: 'Imran Sheikh', category: 'Lab C · Secondary', status: 'Inactive' },
];

export default function EntityInvigilatorsPage() {
  return (
    <PortalListPage
      title="Invigilators"
      subtitle="Register invigilators, map lab roles and track training status."
      categoryLabel="Lab / Role"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
