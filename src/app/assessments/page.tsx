import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Lightbulb, Briefcase, ArrowRight, Clock, FileText, CheckCircle2 } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Assessment Programs — NFLAT, FLQ & Custom',
  description:
    'Explore NCFE financial literacy assessments: NFLAT for school students, the Financial ' +
    'Literacy Quiz (FLQ) for college students and professionals, and custom assessments for ' +
    'corporates and institutions. View duration, format and difficulty.',
  path: '/assessments',
});

const assessments = [
  {
    icon: GraduationCap,
    name: 'NFLAT',
    full: 'National Financial Literacy Assessment Test',
    desc: 'For school students (Class VI–XII). Tests fundamental concepts of money management, savings, and banking.',
    duration: '60 minutes',
    questions: '50 questions',
    level: 'Beginner to Intermediate',
  },
  {
    icon: Lightbulb,
    name: 'FLQ',
    full: 'Financial Literacy Quiz',
    desc: 'For college students and working professionals. Covers investments, insurance, taxation, and retirement planning.',
    duration: '45 minutes',
    questions: '40 questions',
    level: 'Intermediate to Advanced',
  },
  {
    icon: Briefcase,
    name: 'Custom Assessments',
    full: 'For Corporates & Institutions',
    desc: 'Tailored financial wellness assessments designed for your organisation’s specific needs.',
    duration: 'Flexible',
    questions: 'Customisable',
    level: 'All levels',
  },
];

export default function AssessmentsPage() {
  return (
    <PublicPage
      eyebrow="Assessments"
      title="Explore Our Assessment Programs"
      lead="Choose from a range of financial literacy assessments designed for different audiences and skill levels."
    >
      <div className="assessments-grid">
        {assessments.map((a) => (
          <article className="assessment-card" key={a.name}>
            <div className="assessment-card__icon">
              <a.icon size={28} aria-hidden="true" />
            </div>
            <h2 className="assessment-card__name">{a.name}</h2>
            <p className="assessment-card__full">{a.full}</p>
            <p className="assessment-card__desc">{a.desc}</p>
            <div className="assessment-card__meta">
              <span>
                <Clock size={14} aria-hidden="true" /> {a.duration}
              </span>
              <span>
                <FileText size={14} aria-hidden="true" /> {a.questions}
              </span>
              <span>
                <CheckCircle2 size={14} aria-hidden="true" /> {a.level}
              </span>
            </div>
            <Link href="/candidate/register" className="assessment-card__cta">
              Register to take this <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </PublicPage>
  );
}
