import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Settings',
  path: '/entity/settings',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'SET-2001', name: 'Notification Preferences', category: 'Preference', status: 'Active' },
  { id: 'SET-2002', name: 'Preferred Exam Modes', category: 'Exam', status: 'Active' },
  { id: 'SET-2003', name: 'Two-Factor Authentication', category: 'Security', status: 'Active' },
  { id: 'SET-2004', name: 'Centre & Lab Details', category: 'Infrastructure', status: 'Active' },
];

export default function EntitySettingsPage() {
  return (
    <PortalListPage
      title="Settings"
      subtitle="Manage entity preferences, exam modes and account security."
      categoryLabel="Category"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
