import Link from 'next/link';
import {
  Award, BarChart2, Download, ChevronRight, CheckCircle2, XCircle,
  Target, Percent, FileCheck2, Info, type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import { results } from './resultsData';
import '@/styles/portal/pages.css';

const completed = results.length;
const passed = results.filter((r) => r.passed).length;
const certificates = results.filter((r) => r.certificateId).length;
const averageScore = Math.round(
  results.reduce((sum, r) => sum + r.score, 0) / Math.max(results.length, 1),
);
const passRate = Math.round((passed / Math.max(completed, 1)) * 100);

const stats: ReadonlyArray<{ label: string; value: string; color: string; icon: LucideIcon }> = [
  { label: 'Assessments Completed', value: String(completed), color: '#3B82F6', icon: FileCheck2 },
  { label: 'Average Score', value: `${averageScore}%`, color: '#1D4ED8', icon: Target },
  { label: 'Pass Rate', value: `${passRate}%`, color: '#16A34A', icon: Percent },
  { label: 'Certificates Earned', value: String(certificates), color: '#D97706', icon: Award },
];

export default function ResultsList() {
  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">Results &amp; Certificates</h1>
            <p className="pg-head__sub">
              Review your scores, topic-wise analytics and download certificates for cleared
              assessments.
            </p>
          </div>
          <div className="pg-head__actions">
            <Link href="/candidate/certificates" className="btn btn--secondary">
              <Award size={16} aria-hidden="true" /> My Certificates
            </Link>
          </div>
        </div>

        <div className="pg-stats">
          {stats.map((k) => (
            <div className="pg-stat" key={k.label}>
              <div>
                <div className="pg-stat__value" style={{ color: k.color }}>
                  {k.value}
                </div>
                <div className="pg-stat__label">{k.label}</div>
              </div>
              <div className="pg-stat__icon" style={{ background: `${k.color}15`, color: k.color }}>
                <k.icon size={22} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <p className="pg-banner pg-banner--info">
          <Info size={16} aria-hidden="true" />
          Results are generated only from submitted and evaluated attempts. Scorecards and
          certificate downloads activate once the exam engine and result service are connected.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.map((r) => (
            <section className="dash__section" key={r.id} style={{ padding: 24 }}>
              <div className="pg-result-row">
                {/* Score dial */}
                <div
                  className="pg-result-row__score"
                  style={{
                    background: `conic-gradient(${
                      r.passed ? 'var(--green)' : '#DC2626'
                    } 0 ${r.score}%, var(--gray-200) ${r.score}% 100%)`,
                  }}
                  role="img"
                  aria-label={`${r.programme}: ${r.score} percent, ${r.passed ? 'passed' : 'not cleared'}`}
                >
                  <span>{r.score}%</span>
                </div>

                {/* Identity + meta */}
                <div className="pg-result-row__body">
                  <div className="pg-exam__tags">
                    <span className="pg-exam__code">{r.code}</span>
                    <span className="pg-chip pg-chip--muted">{r.type}</span>
                    {r.passed ? (
                      <span className="pg-chip pg-chip--success">
                        <CheckCircle2 size={13} aria-hidden="true" /> Passed
                      </span>
                    ) : (
                      <span className="pg-chip pg-chip--danger">
                        <XCircle size={13} aria-hidden="true" /> Not Cleared
                      </span>
                    )}
                  </div>
                  <h2
                    style={{
                      fontWeight: 800,
                      color: 'var(--navy)',
                      fontSize: '1.05rem',
                      margin: '0 0 6px',
                    }}
                  >
                    {r.programme}
                  </h2>
                  <div className="pg-exam__meta">
                    <span className="pg-exam__meta-item">Completed on {r.date}</span>
                    <span className="pg-exam__meta-item">{r.attempt}</span>
                    <span className="pg-exam__meta-item">Grade {r.grade}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pg-result-row__actions">
                  <Link href={`/candidate/results/${r.id}`} className="btn btn--secondary">
                    <BarChart2 size={16} aria-hidden="true" /> View Scorecard
                  </Link>
                  {r.certificateId ? (
                    <button type="button" className="btn btn--primary" disabled>
                      <Download size={16} aria-hidden="true" /> Certificate
                    </button>
                  ) : (
                    <Link href="/candidate/assessments" className="btn btn--outline">
                      Re-enrol <ChevronRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
