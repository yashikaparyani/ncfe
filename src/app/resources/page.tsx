import type { Metadata } from 'next';
import PublicPage from '@/components/common/PublicPage';
import ResourcesExplorer from '@/components/public/ResourcesExplorer';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Financial Literacy Resources',
  description:
    'Browse the NCFE library of financial literacy guides, videos and worksheets — budgeting, ' +
    'mutual funds, insurance, tax planning, retirement and more. Search and filter by type.',
  path: '/resources',
  // Registered-users-only library (gated in middleware) — keep it out of search.
  noindex: true,
});

export default function ResourcesPage() {
  return (
    <PublicPage
      eyebrow="Resources"
      title="Financial Literacy Resources"
      lead="Explore our library of guides, videos, and worksheets to boost your financial knowledge."
    >
      <ResourcesExplorer />
    </PublicPage>
  );
}
