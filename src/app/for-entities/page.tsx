import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Users, BarChart3, Shield, CheckCircle2 } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'For Entities',
  description:
    'Schools, colleges, corporates and organisations: enrol candidates at scale, run secure ' +
    'proctored assessments, and track performance with NCFE. Partner with us to measure and ' +
    'improve financial literacy.',
  path: '/for-entities',
});

const benefits = [
  { icon: Users, title: 'Manage Candidates', text: 'Enrol and manage candidates at scale from a single dashboard.' },
  { icon: BarChart3, title: 'Track Performance', text: 'Access detailed analytics and reports on candidate performance.' },
  { icon: Shield, title: 'Secure Proctoring', text: 'Conduct trusted, proctored assessments with AI monitoring.' },
  { icon: CheckCircle2, title: 'Bulk Operations', text: 'Upload and manage hundreds of candidates with bulk tools.' },
];

const steps = [
  { num: '1', title: 'Register Entity', text: 'Create your organisation account and get verified.' },
  { num: '2', title: 'Add Candidates', text: 'Enrol candidates individually or via bulk upload.' },
  { num: '3', title: 'Schedule Exams', text: 'Set up exam slots and assign assessments.' },
  { num: '4', title: 'View Results', text: 'Monitor performance and download reports.' },
];

export default function ForEntitiesPage() {
  return (
    <PublicPage
      eyebrow="For Entities"
      title="Partner with NCFE for Financial Education"
      lead="Educational institutions, corporates, and organisations can leverage NCFE's assessment platform to measure and improve financial literacy."
    >
      <div className="public-feature-grid">
        {benefits.map((b) => (
          <div className="public-feature-card" key={b.title}>
            <div className="public-feature-card__icon">
              <b.icon size={24} aria-hidden="true" />
            </div>
            <h2 className="public-feature-card__title">{b.title}</h2>
            <p className="public-feature-card__text">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="public-steps">
        <h2 className="public-steps__heading">How to Get Started</h2>
        <div className="public-steps__grid">
          {steps.map((s) => (
            <div className="public-step" key={s.num}>
              <div className="public-step__num" aria-hidden="true">
                {s.num}
              </div>
              <h3 className="public-step__title">{s.title}</h3>
              <p className="public-step__text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="public-cta-box">
        <h2>Ready to partner with us?</h2>
        <p>Join thousands of institutions advancing financial literacy.</p>
        <Link href="/entity/register" className="btn btn--primary btn--lg">
          <Building2 size={18} aria-hidden="true" /> Register as Entity
        </Link>
      </div>
    </PublicPage>
  );
}
