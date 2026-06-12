import Link from 'next/link';
import {
  GraduationCap,
  Lightbulb,
  Briefcase,
  UserPlus,
  ClipboardList,
  MonitorCheck,
  Award,
  Users,
  Building2,
  Globe,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import './HomeSections.css';

const programs = [
  {
    icon: GraduationCap,
    title: 'NFLAT',
    subtitle: 'National Financial Literacy Assessment Test',
    text: 'A flagship test for school students that builds money sense early — covering saving, spending, banking, and digital payments.',
  },
  {
    icon: Lightbulb,
    title: 'FLQ',
    subtitle: 'Financial Literacy Quiz',
    text: 'Interactive quizzes for college students and the general public to test and sharpen everyday financial knowledge.',
  },
  {
    icon: Briefcase,
    title: 'Custom Assessments',
    subtitle: 'For Corporates & Institutions',
    text: 'Tailored assessments that help organisations measure and improve the financial well-being of their workforce.',
  },
];

const steps = [
  { icon: UserPlus, title: 'Register', text: 'Create your account as a candidate or entity in a few minutes.' },
  { icon: ClipboardList, title: 'Choose an Assessment', text: 'Pick the assessment that fits your goals and enrol.' },
  { icon: MonitorCheck, title: 'Take the Exam', text: 'Appear online with proctoring or at an approved test centre.' },
  { icon: Award, title: 'Get Certified', text: 'View your score and download a verifiable NCFE certificate.' },
];

const stats = [
  { icon: Users, value: '50 Lakh+', label: 'Learners reached' },
  { icon: Building2, value: '10,000+', label: 'Partner institutions' },
  { icon: Globe, value: '15+', label: 'Languages supported' },
  { icon: MapPin, value: 'Pan-India', label: 'Nationwide presence' },
];

export default function HomeSections() {
  return (
    <>
      {/* ─── Assessment Programs ─── */}
      <section className="home-section" id="home-programs" aria-labelledby="home-programs-title">
        <div className="home-section__inner">
          <div className="home-section__head">
            <span className="home-section__eyebrow">What we offer</span>
            <h2 className="home-section__title" id="home-programs-title">
              Our Assessment Programs
            </h2>
            <p className="home-section__subtitle">
              From school students to working professionals, NCFE has an assessment for every stage
              of the financial literacy journey.
            </p>
          </div>

          <div className="home-programs__grid">
            {programs.map((p) => (
              <article className="home-program-card" key={p.title}>
                <div className="home-program-card__icon">
                  <p.icon size={26} aria-hidden="true" />
                </div>
                <h3 className="home-program-card__title">{p.title}</h3>
                <span className="home-program-card__subtitle">{p.subtitle}</span>
                <p className="home-program-card__text">{p.text}</p>
              </article>
            ))}
          </div>

          <div className="home-section__action">
            <Link href="/assessments" className="home-link">
              Explore all assessments <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section
        className="home-section home-section--alt"
        id="home-how"
        aria-labelledby="home-how-title"
      >
        <div className="home-section__inner">
          <div className="home-section__head">
            <span className="home-section__eyebrow">Simple process</span>
            <h2 className="home-section__title" id="home-how-title">
              How It Works
            </h2>
            <p className="home-section__subtitle">Get started in four straightforward steps.</p>
          </div>

          <ol className="home-steps">
            {steps.map((s, i) => (
              <li className="home-step" key={s.title}>
                <div className="home-step__icon">
                  <s.icon size={24} aria-hidden="true" />
                  <span className="home-step__num">{i + 1}</span>
                </div>
                <h3 className="home-step__title">{s.title}</h3>
                <p className="home-step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section className="home-stats" id="home-stats" aria-label="Our impact">
        <div className="home-stats__inner">
          {stats.map((s) => (
            <div className="home-stat" key={s.label}>
              <div className="home-stat__icon">
                <s.icon size={22} aria-hidden="true" />
              </div>
              <span className="home-stat__value">{s.value}</span>
              <span className="home-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Audience cards ─── */}
      <section className="home-section" id="home-audience" aria-labelledby="home-audience-title">
        <div className="home-section__inner">
          <div className="home-section__head">
            <span className="home-section__eyebrow">Who it&apos;s for</span>
            <h2 className="home-section__title" id="home-audience-title">
              Built for Candidates and Entities
            </h2>
          </div>

          <div className="home-audience__grid">
            <article className="home-audience-card">
              <div className="home-audience-card__icon">
                <GraduationCap size={28} aria-hidden="true" />
              </div>
              <h3 className="home-audience-card__title">For Candidates</h3>
              <p className="home-audience-card__text">
                Measure your financial knowledge, learn practical money skills, and earn recognised
                certificates you can showcase.
              </p>
              <Link href="/for-candidates" className="home-audience-card__link">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>

            <article className="home-audience-card">
              <div className="home-audience-card__icon">
                <Building2 size={28} aria-hidden="true" />
              </div>
              <h3 className="home-audience-card__title">For Entities</h3>
              <p className="home-audience-card__text">
                Enrol candidates at scale, conduct trusted proctored assessments, and track
                performance from a single dashboard.
              </p>
              <Link href="/for-entities" className="home-audience-card__link">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="home-cta" id="home-cta" aria-labelledby="home-cta-title">
        <div className="home-cta__inner">
          <h2 className="home-cta__title" id="home-cta-title">
            Start your financial literacy assessment journey
          </h2>
          <p className="home-cta__text">
            Join lakhs of learners and thousands of institutions building a financially aware India.
          </p>
          <div className="home-cta__actions">
            <Link href="/candidate/register" className="home-cta__btn home-cta__btn--primary">
              <UserPlus size={18} aria-hidden="true" /> Register as Candidate
            </Link>
            <Link href="/entity/register" className="home-cta__btn home-cta__btn--outline">
              <Building2 size={18} aria-hidden="true" /> Register as Entity
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
