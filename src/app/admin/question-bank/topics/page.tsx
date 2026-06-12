import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import TopicTreeManager from '@/components/portal/admin/TopicTreeManager';

export const metadata: Metadata = buildMetadata({
  title: 'Question Bank - Topic Management',
  path: '/admin/question-bank/topics',
  noindex: true,
});

export default function AdminQuestionBankTopicsPage() {
  return <TopicTreeManager />;
}
