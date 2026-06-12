import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Settings',
  path: '/candidate/settings',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'SET-1001', name: 'Email Notifications', category: 'Preference', status: 'Active' },
  { id: 'SET-1002', name: 'SMS Alerts', category: 'Preference', status: 'Inactive' },
  { id: 'SET-1003', name: 'Two-Factor Authentication', category: 'Security', status: 'Active' },
  { id: 'SET-1004', name: 'Default Language', category: 'Preference', status: 'Active' },
];

export default function CandidateSettingsPage() {
  return (
    <PortalListPage
      title="Settings"
      subtitle="Manage your communication preferences and account security options."
      categoryLabel="Category"
      rows={rows}
      topbar={{ name: 'Rohan Sharma', meta: 'Candidate ID: CND125678', initials: 'RS' }}
    />
  );
}
