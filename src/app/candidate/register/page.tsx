import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateRegistrationWizard from '@/components/registration/CandidateRegistrationWizard';
import '@/styles/registration.css';

export const metadata: Metadata = buildMetadata({
  title: 'Candidate Registration',
  description: 'Register as an NCFE candidate to enroll for financial literacy assessments.',
  path: '/candidate/register',
  noindex: true,
});

export default function CandidateRegisterPage() {
  return <CandidateRegistrationWizard />;
}
