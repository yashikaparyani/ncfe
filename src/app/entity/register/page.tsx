import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntityRegistrationWizard from '@/components/registration/EntityRegistrationWizard';
import '@/styles/registration.css';

export const metadata: Metadata = buildMetadata({
  title: 'Entity Registration',
  description: 'Register your school, college, corporate or government body with NCFE.',
  path: '/entity/register',
  noindex: true,
});

export default function EntityRegisterPage() {
  return <EntityRegistrationWizard />;
}
