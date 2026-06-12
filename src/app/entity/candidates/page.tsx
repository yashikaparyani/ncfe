import type { Metadata } from 'next';
import { Users, CheckSquare, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow, type ListStat } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Candidates',
  path: '/entity/candidates',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const stats: readonly ListStat[] = [
  { label: 'Total Candidates', value: '1,245', color: '#16A34A', bg: '#F0FDF4', icon: <Users size={22} aria-hidden="true" /> },
  { label: 'Approved', value: '856', color: '#2563EB', bg: '#EFF6FF', icon: <CheckSquare size={22} aria-hidden="true" /> },
  { label: 'Pending Approval', value: '24', color: '#D97706', bg: '#FFFBEB', icon: <Clock size={22} aria-hidden="true" /> },
];

const rows: readonly ListRow[] = [
  { id: 'CND-1001', name: 'Rohan Kumar', category: 'NFLAT – Slot 1', status: 'Active' },
  { id: 'CND-1002', name: 'Priya Singh', category: 'NFLAT – Slot 1', status: 'Active' },
  { id: 'CND-1003', name: 'Ankit Verma', category: 'NFLAT – Slot 2', status: 'Pending' },
  { id: 'CND-1004', name: 'Neha Gupta', category: 'NFLAT – Slot 2', status: 'Active' },
  { id: 'CND-1005', name: 'Karan Mehta', category: 'NFLAT – Slot 3', status: 'Active' },
];

export default function EntityCandidatesPage() {
  return (
    <PortalListPage
      title="Candidates"
      subtitle="Manage your candidates, approvals and exam-slot assignments."
      categoryLabel="Exam Slot"
      rows={rows}
      stats={stats}
      topbar={TOPBAR}
    />
  );
}
