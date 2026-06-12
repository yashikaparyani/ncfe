import type { Metadata } from 'next';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility Statement',
  description:
    'NCFE is committed to making its digital services accessible to everyone, conforming to WCAG ' +
    '2.1 AA standards.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  return (
    <PublicPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      lead="NCFE is committed to making its digital services accessible to everyone."
    >
      <div className="public-prose">
        <p>
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. This
          includes keyboard navigability, sufficient colour contrast, descriptive text
          alternatives, adjustable text sizing, and support for assistive technologies.
        </p>
        <h2>Ongoing Commitment</h2>
        <p>
          Accessibility is an ongoing effort. We regularly review the platform and address issues as
          they are identified.
        </p>
        <h2>Feedback</h2>
        <p>
          If you encounter any accessibility barriers, please contact us so we can help and improve.
          We welcome your feedback.
        </p>
      </div>
    </PublicPage>
  );
}
