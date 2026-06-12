import type { Metadata } from 'next';
import { CalendarRange, Users, MapPin } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow, type ListStat } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Exam Slots',
  path: '/entity/exams',
  noindex: true,
});

const TOPBAR = { name: 'Entity Manager', meta: 'Delhi Public School · ENT-1001', initials: 'DP', avatarColor: 'navy' as const };

const stats: readonly ListStat[] = [
  { label: 'Total Slots', value: '8', color: '#2563EB', bg: '#EFF6FF', icon: <CalendarRange size={22} aria-hidden="true" /> },
  { label: 'Seats Allocated', value: '218', color: '#16A34A', bg: '#F0FDF4', icon: <Users size={22} aria-hidden="true" /> },
  { label: 'Active Labs', value: '3', color: '#7C3AED', bg: '#EDE9FE', icon: <MapPin size={22} aria-hidden="true" /> },
];

const rows: readonly ListRow[] = [
  { id: 'SLT-1001', name: 'NFLAT – 15 Jun, 10:00 AM', category: 'Lab A (Seats 1–30)', status: 'Active' },
  { id: 'SLT-1002', name: 'NFLAT – 15 Jun, 02:00 PM', category: 'Lab A (Seats 1–30)', status: 'Pending' },
  { id: 'SLT-1003', name: 'NFLAT – 16 Jun, 10:00 AM', category: 'Lab B (Seats 1–28)', status: 'Active' },
  { id: 'SLT-1004', name: 'FLQ – 18 Jun, 11:00 AM', category: 'Lab C (Seats 1–25)', status: 'Active' },
  { id: 'SLT-1005', name: 'FLQ – 20 Jun, 11:00 AM', category: 'Lab C (Seats 1–25)', status: 'Inactive' },
];

// Slot management for a given exam. examId is available via params when the
// slot CRUD API is wired; this first pass is presentational.
export default function EntityExamSlotsPage() {
  return (
    <PortalListPage
      title="Exam Slots"
      subtitle="Create and manage exam slots, lab capacity and invigilator assignment."
      categoryLabel="Time / Lab"
      rows={rows}
      stats={stats}
      topbar={TOPBAR}
    />
  );
}
