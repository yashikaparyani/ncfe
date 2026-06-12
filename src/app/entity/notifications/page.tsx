import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Notifications',
  path: '/entity/notifications',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'NTF-2001', name: 'Candidate registration pending approval', category: 'Approval', status: 'Pending' },
  { id: 'NTF-2002', name: 'Exam slot reminder sent', category: 'Exam', status: 'Active' },
  { id: 'NTF-2003', name: 'Bulk upload completed', category: 'Upload', status: 'Active' },
  { id: 'NTF-2004', name: 'Entity verification approved', category: 'Account', status: 'Active' },
  { id: 'NTF-2005', name: 'Result summary available', category: 'Result', status: 'Active' },
];

export default function EntityNotificationsPage() {
  return (
    <PortalListPage
      title="Notifications"
      subtitle="Lifecycle notifications for registrations, exams, uploads and results."
      categoryLabel="Type"
      rows={rows}
      topbar={TOPBAR}
      filterByCategory
      hideDemoNote
    />
  );
}
