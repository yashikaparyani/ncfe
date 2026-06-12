import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Notification Templates',
  path: '/admin/notifications/templates',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'TPL-1001', name: 'OTP Verification', category: 'SMS / Email', status: 'Active' },
  { id: 'TPL-1002', name: 'Registration Approved', category: 'Email', status: 'Active' },
  { id: 'TPL-1003', name: 'Slot Reminder', category: 'SMS', status: 'Active' },
  { id: 'TPL-1004', name: 'Result Published', category: 'Email', status: 'Active' },
  { id: 'TPL-1005', name: 'Incident Escalation', category: 'Email', status: 'Pending' },
];

export default function AdminNotificationTemplatesPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Notification Templates"
      subtitle="Manage OTP, approval, reminder, result and incident message templates."
      categoryLabel="Channel"
      rows={rows}
    />
  );
}
