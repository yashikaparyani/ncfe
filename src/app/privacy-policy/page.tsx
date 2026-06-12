import type { Metadata } from 'next';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How NCFE collects, uses, stores and protects your personal information, and the rights you ' +
    'have over your data.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <PublicPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="How NCFE collects, uses, and protects your personal information."
    >
      <div className="public-prose">
        <p>Last updated: January 2024</p>
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account,
          register for an assessment, or contact us. This may include your name, email address,
          phone number, and educational details.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to
          process your assessments and certificates, and to communicate with you.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your personal
          information against unauthorised access, alteration, disclosure, or destruction.
        </p>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. To exercise
          these rights, please contact us through the channels provided.
        </p>
      </div>
    </PublicPage>
  );
}
