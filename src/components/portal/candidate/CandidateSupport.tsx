import Link from 'next/link';
import {
  Mail, Phone, MessageSquare, LifeBuoy, ChevronRight, Clock,
  HelpCircle, FileText, Award, UserCircle, MonitorCheck, type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import '@/styles/portal/pages.css';

interface Channel {
  icon: LucideIcon;
  title: string;
  detail: string;
  meta: string;
  color: string;
  href: string;
  cta: string;
  external?: boolean;
}

const channels: readonly Channel[] = [
  {
    icon: Mail, title: 'Email Support', detail: 'support@ncfe.org.in',
    meta: 'Replies within 1 business day', color: '#2563EB',
    href: 'mailto:support@ncfe.org.in', cta: 'Send email', external: true,
  },
  {
    icon: Phone, title: 'Helpline', detail: '1800-123-4567',
    meta: 'Mon–Sat, 9:00 AM – 6:00 PM IST', color: '#16A34A',
    href: 'tel:18001234567', cta: 'Call now', external: true,
  },
  {
    icon: MessageSquare, title: 'Live Chat', detail: 'Chat with a support agent',
    meta: 'Available during helpline hours', color: '#7C3AED',
    href: '/contact', cta: 'Start chat',
  },
];

const topics: ReadonlyArray<{ icon: LucideIcon; label: string; desc: string }> = [
  { icon: UserCircle, label: 'Account & Profile', desc: 'Login, password reset and profile updates.' },
  { icon: FileText, label: 'Exams & Enrollment', desc: 'Slots, enrollment status and attempts.' },
  { icon: MonitorCheck, label: 'During the Exam', desc: 'System check, proctoring and technical issues.' },
  { icon: Award, label: 'Results & Certificates', desc: 'Scorecards, grades and certificate downloads.' },
];

export default function CandidateSupport() {
  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">Support</h1>
            <p className="pg-head__sub">
              Get help with your account, exams, results and certificates.
            </p>
          </div>
          <div className="pg-head__actions">
            <Link href="/faqs" className="btn btn--secondary">
              <HelpCircle size={16} aria-hidden="true" /> Browse FAQs
            </Link>
          </div>
        </div>

        {/* Contact channels */}
        <div className="pg-cert-grid">
          {channels.map((c) => {
            const inner = (
              <>
                <span className="pg-cert__seal" aria-hidden="true" style={{ background: c.color }}>
                  <c.icon size={22} />
                </span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                    {c.title}
                  </h2>
                  <div style={{ fontWeight: 700, color: c.color, fontSize: '0.9rem', margin: '4px 0' }}>
                    {c.detail}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                    <Clock size={13} aria-hidden="true" /> {c.meta}
                  </div>
                </div>
                <ChevronRight size={18} aria-hidden="true" style={{ color: 'var(--gray-400)' }} />
              </>
            );
            const style = { display: 'flex', alignItems: 'center', gap: 16, padding: 20 } as const;
            return c.external ? (
              <a key={c.title} href={c.href} className="dash__section pg-support__channel" style={style}>
                {inner}
              </a>
            ) : (
              <Link key={c.title} href={c.href} className="dash__section pg-support__channel" style={style}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Help topics */}
        <section className="dash__section" style={{ padding: 24, marginTop: 20 }}>
          <h2 className="dash__section-title" style={{ marginBottom: 4 }}>
            <LifeBuoy size={18} aria-hidden="true" style={{ verticalAlign: '-3px', marginRight: 8 }} />
            Help Topics
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: '0 0 16px' }}>
            Find quick answers to the most common questions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {topics.map((t) => (
              <Link
                key={t.label}
                href="/faqs"
                className="pg-support__topic"
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px',
                  border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                }}
              >
                <t.icon size={20} aria-hidden="true" style={{ color: 'var(--navy)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>{t.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{t.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
