import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Switch Entity',
  path: '/candidate/entity-switch',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'ENT-1001', name: 'Delhi Public School, Dwarka', category: 'School', status: 'Active' },
  { id: 'ENT-1002', name: "St. Xavier's College", category: 'College', status: 'Active' },
  { id: 'ENT-1003', name: 'Tata Institute of Finance', category: 'Institute', status: 'Inactive' },
];

export default function CandidateEntitySwitchPage() {
  return (
    <PortalListPage
      title="Switch Entity"
      subtitle="Review entities you are associated with and request a switch for upcoming cycles."
      categoryLabel="Entity Type"
      rows={rows}
      filterByCategory
      topbar={{ name: 'Rohan Sharma', meta: 'Candidate ID: CND125678', initials: 'RS' }}
    />
  );
}
