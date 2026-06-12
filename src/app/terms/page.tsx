import type { Metadata } from 'next';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description:
    'The terms and conditions governing your use of the NCFE financial literacy assessment ' +
    'platform.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PublicPage
      eyebrow="Legal"
      title="Terms of Use"
      lead="The terms and conditions governing your use of the NCFE platform."
    >
      <div className="public-prose">
        <p>Last updated: January 2024</p>
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using the NCFE platform, you agree to be bound by these Terms of Use and
          all applicable laws and regulations.
        </p>
        <h2>Use of the Platform</h2>
        <p>
          You agree to use the platform only for lawful purposes and in a way that does not infringe
          the rights of others or restrict their use of the platform.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content on this platform, including text, graphics, logos, and software, is the
          property of NCFE and protected by intellectual property laws.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          NCFE shall not be liable for any indirect, incidental, or consequential damages arising
          from your use of the platform.
        </p>
      </div>
    </PublicPage>
  );
}
