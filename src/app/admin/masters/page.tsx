import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Master Configuration',
  path: '/admin/masters',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'MST-1001', name: 'Languages', category: 'Localization', status: 'Active' },
  { id: 'MST-1002', name: 'Categories & Subcategories', category: 'Taxonomy', status: 'Active' },
  { id: 'MST-1003', name: 'Entity Types', category: 'Governance', status: 'Active' },
  { id: 'MST-1004', name: 'OTP Policy', category: 'Security', status: 'Active' },
  { id: 'MST-1005', name: 'Notification Templates', category: 'Communication', status: 'Active' },
  { id: 'MST-1006', name: 'Legal & Consent Text', category: 'Compliance', status: 'Active' },
];

export default function AdminMastersPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Master Configuration"
      subtitle="Manage languages, categories, entity types, policies and templates."
      categoryLabel="Master"
      rows={rows}
    />
  );
}
