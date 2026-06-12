import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import LoginForm from '@/components/auth/LoginForm';
import '@/styles/auth.css';

export const metadata: Metadata = buildMetadata({
  title: 'Sign In',
  description: 'Sign in to your NCFE account to access assessments, results and certificates.',
  path: '/login',
  noindex: true,
});

export default function LoginPage() {
  return <LoginForm />;
}
