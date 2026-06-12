import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntityRoleManagement from '@/components/portal/entity/EntityRoleManagement';

export const metadata: Metadata = buildMetadata({
  title: 'Role Management',
  path: '/entity/roles',
  noindex: true,
});

export default function EntityRolesPage() {
  return <EntityRoleManagement />;
}
