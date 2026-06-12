import type { Metadata } from 'next';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About NCFE',
  description:
    'NCFE (National Centre for Financial Education) is a Section 8 not-for-profit company ' +
    'promoting financial literacy across India through education campaigns, content and ' +
    'assessments. Learn about our vision, mission and what we do.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <PublicPage
      eyebrow="About NCFE"
      title="About the National Centre for Financial Education"
      lead="NCFE is committed to promoting financial literacy and education across India."
    >
      <div className="public-prose">
        <p>
          The National Centre for Financial Education (NCFE) is a Section 8 (Not for Profit) Company
          promoting financial education across India as a massive financial literacy campaign. NCFE
          aims to undertake massive Financial Education campaigns to help people manage money more
          effectively to achieve financial well-being by accessing appropriate financial products
          and services through regulated entities with fair and transparent machinery for consumer
          protection and grievance redressal.
        </p>
        <h2>Our Vision</h2>
        <p>A financially aware and empowered India.</p>
        <h2>Our Mission</h2>
        <p>
          To undertake massive financial education campaigns to help people manage money more
          effectively to achieve financial well-being by accessing appropriate financial products
          and services through regulated entities with fair and transparent machinery for consumer
          protection and grievance redressal.
        </p>
        <h2>What We Do</h2>
        <p>
          NCFE conducts Financial Education programmes and campaigns across the country through
          seminars, workshops, conferences, trainings, programmes, campaigns for various target
          groups; develops financial education content/curriculum for schools, colleges; conducts
          Training Programs and produces financial education material.
        </p>
      </div>
    </PublicPage>
  );
}
