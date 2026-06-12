import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminEntities from '@/components/portal/admin/AdminEntities';

export const metadata: Metadata = buildMetadata({
  title: 'Entities',
  path: '/admin/entities',
  noindex: true,
});

export default function AdminEntitiesPage() {
  return <AdminEntities />;
}
