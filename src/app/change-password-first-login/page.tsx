import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';
import '@/styles/auth.css';

export const metadata: Metadata = buildMetadata({
  title: 'Update Password',
  description: 'Change your system-generated password before continuing.',
  path: '/change-password-first-login',
  noindex: true,
});

export default function ChangePasswordFirstLoginPage() {
  return <ChangePasswordForm />;
}
