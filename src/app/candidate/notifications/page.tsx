import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Notifications',
  path: '/candidate/notifications',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'NTF-1001', name: 'Exam admit card released', category: 'Exam', status: 'Active' },
  { id: 'NTF-1002', name: 'Result published', category: 'Result', status: 'Active' },
  { id: 'NTF-1003', name: 'Profile update reminder', category: 'Account', status: 'Pending' },
  { id: 'NTF-1004', name: 'New assessment available', category: 'Exam', status: 'Active' },
  { id: 'NTF-1005', name: 'Certificate ready to download', category: 'Result', status: 'Active' },
];

export default function CandidateNotificationsPage() {
  return (
    <PortalListPage
      title="Notifications"
      subtitle="Exam, result and account alerts sent to your registered contacts."
      categoryLabel="Type"
      rows={rows}
      topbar={{ name: 'Rohan Sharma', meta: 'Candidate ID: CND125678', initials: 'RS' }}
    />
  );
}
