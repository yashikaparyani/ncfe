import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import '@/styles/auth.css';

export const metadata: Metadata = buildMetadata({
  title: 'Forgot Password',
  description: 'Request a password reset link for your NCFE account.',
  path: '/forgot-password',
  noindex: true,
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
