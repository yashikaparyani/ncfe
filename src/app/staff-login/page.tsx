import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import LoginForm from '@/components/auth/LoginForm';
import '@/styles/auth.css';

export const metadata: Metadata = buildMetadata({
  title: 'NCFE Staff Sign In',
  description: 'Restricted sign-in for NCFE staff accounts.',
  path: '/staff-login',
  noindex: true,
});

export default function StaffLoginPage() {
  return <LoginForm audience="staff" />;
}
