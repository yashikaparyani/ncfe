import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Candidates',
  path: '/proctor/candidates',
  noindex: true,
});

const TOPBAR = { name: 'NCFE Proctor', meta: 'Proctoring Console', initials: 'NP', avatarColor: 'navy' as const };

const rows: readonly ListRow[] = [
  { id: 'CND-125678', name: 'Rohan Sharma', category: 'NFLAT – Slot 1', status: 'Active' },
  { id: 'CND-125679', name: 'Priya Singh', category: 'NFLAT – Slot 1', status: 'Active' },
  { id: 'CND-125680', name: 'Ankit Verma', category: 'NFLAT – Slot 1', status: 'Active' },
  { id: 'CND-125683', name: 'Simran Kaur', category: 'NFLAT – Slot 1', status: 'Pending' },
  { id: 'CND-125684', name: 'Vikas Yadav', category: 'NFLAT – Slot 1', status: 'Inactive' },
];

export default function ProctorCandidatesPage() {
  return (
    <PortalListPage
      title="Candidates"
      subtitle="Candidates assigned to your live and AI-reviewed proctoring sessions."
      categoryLabel="Exam Slot"
      rows={rows}
      topbar={TOPBAR}
    />
  );
}
