import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminQuestionBank from '@/components/portal/admin/AdminQuestionBank';

export const metadata: Metadata = buildMetadata({
  title: 'Question Bank',
  path: '/admin/question-bank',
  noindex: true,
});

export default function AdminQuestionBankPage() {
  return <AdminQuestionBank />;
}
