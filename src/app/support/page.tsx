import type { Metadata } from 'next';
import Link from 'next/link';
import { LifeBuoy, BookOpen, Mail, ShieldQuestion, type LucideIcon } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';
import '@/styles/portal/pages.css';

export const metadata: Metadata = buildMetadata({
  title: 'Help & Support',
  description:
    'Get help with NCFE assessments — account and login support, exam-day technical help, ' +
    'certificate downloads and general enquiries.',
  path: '/support',
});

const topics: ReadonlyArray<{ icon: LucideIcon; title: string; desc: string; to: string }> = [
  {
    icon: ShieldQuestion,
    title: 'Account & Login Help',
    desc: 'Password resets, OTP issues and access problems.',
    to: '/forgot-password',
  },
  {
    icon: BookOpen,
    title: 'Browse FAQs',
    desc: 'Answers to common questions about exams, fees and certificates.',
    to: '/faqs',
  },
  {
    icon: Mail,
    title: 'Contact Support',
    desc: 'Raise a query with our support team and attach details.',
    to: '/contact',
  },
];

export default function SupportPage() {
  return (
    <PublicPage
      eyebrow="We're here to help"
      title="Help & Support"
      lead="Find quick answers or reach our support team for assistance with registration, exams, results and certificates."
    >
      <section aria-label="Support topics" style={{ marginTop: 8 }}>
        <div className="pg-help-grid">
          {topics.map((t) => (
            <Link key={t.title} href={t.to} className="pg-help-card">
              <t.icon size={24} aria-hidden="true" style={{ color: 'var(--navy)' }} />
              <div className="pg-help-card__title">{t.title}</div>
              <p className="pg-help-card__desc">{t.desc}</p>
            </Link>
          ))}
        </div>

        <p
          className="pg-banner pg-banner--info"
          style={{ marginTop: 24 }}
        >
          <LifeBuoy size={16} aria-hidden="true" />
          <span>
            For exam-day emergencies, contact your exam centre invigilator or use the in-portal help
            during a live session.
          </span>
        </p>
      </section>
    </PublicPage>
  );
}
