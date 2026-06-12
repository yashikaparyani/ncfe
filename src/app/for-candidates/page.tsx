import type { Metadata } from 'next';
import Link from 'next/link';
import { UserPlus, BookOpen, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'For Candidates',
  description:
    'Students and professionals: build and validate essential money-management skills with NCFE. ' +
    'Learn practical skills, earn recognised certificates, and track your progress. Register free.',
  path: '/for-candidates',
});

const benefits = [
  { icon: BookOpen, title: 'Learn Practical Skills', text: 'Gain real-world financial knowledge you can apply to everyday decisions.' },
  { icon: Award, title: 'Earn Certificates', text: 'Receive recognised certificates that validate your financial literacy.' },
  { icon: TrendingUp, title: 'Track Progress', text: 'Monitor your improvement with detailed performance reports.' },
  { icon: CheckCircle2, title: 'Free to Start', text: 'Begin your financial literacy journey at no cost.' },
];

const steps = [
  { num: '1', title: 'Register', text: 'Create your free candidate account.' },
  { num: '2', title: 'Choose Assessment', text: 'Select from NFLAT, FLQ, or other programs.' },
  { num: '3', title: 'Take the Test', text: 'Complete the assessment online or at a centre.' },
  { num: '4', title: 'Get Certified', text: 'Download your certificate and share your achievement.' },
];

export default function ForCandidatesPage() {
  return (
    <PublicPage
      eyebrow="For Candidates"
      title="Empower Yourself with Financial Knowledge"
      lead="Whether you're a student or a working professional, NCFE assessments help you build and validate essential money-management skills."
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
        <h2>Ready to begin?</h2>
        <p>Join lakhs of learners building a financially secure future.</p>
        <Link href="/candidate/register" className="btn btn--primary btn--lg">
          <UserPlus size={18} aria-hidden="true" /> Register as Candidate
        </Link>
      </div>
    </PublicPage>
  );
}
