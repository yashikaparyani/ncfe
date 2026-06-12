import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Exam Cycles',
  path: '/admin/exam-cycles',
  noindex: true,
});

const rows: readonly ListRow[] = [
  { id: 'CYC-2024Q2', name: 'Annual Cycle – Q2 2024', category: 'National', status: 'Active' },
  { id: 'CYC-2024Q1', name: 'Annual Cycle – Q1 2024', category: 'National', status: 'Inactive' },
  { id: 'CYC-2024FLQ', name: 'FLQ Window – 2024', category: 'Quiz', status: 'Active' },
  { id: 'CYC-2024Q3', name: 'Annual Cycle – Q3 2024', category: 'National', status: 'Pending' },
];

export default function AdminExamCyclesPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Exam Cycles"
      subtitle="Create cycles, set dates, rollover and lock/unlock states."
      categoryLabel="Cycle Type"
      rows={rows}
    />
  );
}
