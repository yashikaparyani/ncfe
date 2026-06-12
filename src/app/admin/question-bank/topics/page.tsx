import type { Metadata } from 'next';
import { Layers, CheckCircle2, FileText } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import PortalListPage, { type ListRow, type ListStat } from '@/components/portal/PortalListPage';

export const metadata: Metadata = buildMetadata({
  title: 'Question Bank — Topic Management',
  path: '/admin/question-bank/topics',
  noindex: true,
});

const stats: readonly ListStat[] = [
  { label: 'Total Topics', value: '12', color: '#2563EB', bg: '#EFF6FF', icon: <Layers size={22} aria-hidden="true" /> },
  { label: 'Active Topics', value: '10', color: '#16A34A', bg: '#F0FDF4', icon: <CheckCircle2 size={22} aria-hidden="true" /> },
  { label: 'Mapped Questions', value: '4,820', color: '#7C3AED', bg: '#EDE9FE', icon: <FileText size={22} aria-hidden="true" /> },
];

// Demo data — topic create/edit/merge actions activate once the backend API is
// connected. The `category` column carries the mapped-question count so the
// list reads as a management view of the topic taxonomy.
const rows: readonly ListRow[] = [
  { id: 'TOP-1001', name: 'Savings & Investments', category: '912 questions', status: 'Active' },
  { id: 'TOP-1002', name: 'Banking & Credit', category: '740 questions', status: 'Active' },
  { id: 'TOP-1003', name: 'Digital Finance & Payments', category: '688 questions', status: 'Active' },
  { id: 'TOP-1004', name: 'Insurance', category: '512 questions', status: 'Active' },
  { id: 'TOP-1005', name: 'Money & Transactions', category: '470 questions', status: 'Active' },
  { id: 'TOP-1006', name: 'Taxation Basics', category: '356 questions', status: 'Active' },
  { id: 'TOP-1007', name: 'Retirement & Pension', category: '241 questions', status: 'Active' },
  { id: 'TOP-1008', name: 'Financial Frauds & Safety', category: '198 questions', status: 'Pending' },
  { id: 'TOP-1009', name: 'Capital Markets', category: '0 questions', status: 'Inactive' },
];

export default function AdminQuestionBankTopicsPage() {
  return (
    <PortalListPage
      shell="admin"
      title="Topic Management"
      subtitle="Organise the Question Bank taxonomy: create, activate and map topics to questions."
      categoryLabel="Mapped Questions"
      rows={rows}
      stats={stats}
      searchLabel="Search topics"
    />
  );
}
