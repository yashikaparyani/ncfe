import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntitySettings from '@/components/portal/entity/EntitySettings';

export const metadata: Metadata = buildMetadata({
  title: 'Settings',
  path: '/entity/settings',
  noindex: true,
});

export default function EntitySettingsPage() {
  return <EntitySettings />;
}
