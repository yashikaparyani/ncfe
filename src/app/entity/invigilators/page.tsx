import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntityInvigilators from '@/components/portal/entity/EntityInvigilators';

export const metadata: Metadata = buildMetadata({
  title: 'Invigilators',
  path: '/entity/invigilators',
  noindex: true,
});

export default function EntityInvigilatorsPage() {
  return <EntityInvigilators />;
}
