import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateProfile from '@/components/portal/candidate/CandidateProfile';

export const metadata: Metadata = buildMetadata({
  title: 'My Profile',
  path: '/candidate/profile',
  noindex: true,
});

export default function CandidateProfilePage() {
  return <CandidateProfile />;
}
