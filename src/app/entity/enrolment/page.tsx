import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntityEnrolment from '@/components/portal/entity/EntityEnrolment';

export const metadata: Metadata = buildMetadata({
  title: 'Enrolment',
  path: '/entity/enrolment',
  noindex: true,
});

export default function EntityEnrolmentPage() {
  return <EntityEnrolment />;
}
