import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'System — Feature Flags',
  path: '/admin/system/feature-flags',
  noindex: true,
});

// Status is read as: Active = enabled, Inactive = disabled, Pending = staged rollout.
const rows: readonly ListRow[] = [
  { id: 'FLG-1001', name: 'Live Proctoring', category: 'Proctoring', status: 'Active' },
  { id: 'FLG-1002', name: 'AI Proctoring', category: 'Proctoring', status: 'Active' },
  { id: 'FLG-1003', name: 'Safe Exam Browser (SEB)', category: 'Exam Security', status: 'Active' },
  { id: 'FLG-1004', name: 'QR Geo-fence Manual Fallback', category: 'QR Verification', status: 'Pending' },
  { id: 'FLG-1005', name: 'OTP Login', category: 'Authentication', status: 'Inactive' },
];

export default function AdminFeatureFlagsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="System — Feature Flags"
      subtitle="Enable, disable or stage live proctoring, AI proctoring, SEB and QR fallback."
      categoryLabel="Area"
      rows={rows}
    />
  );
}
