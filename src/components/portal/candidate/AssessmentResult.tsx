import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Download, BarChart2, TrendingUp, ChevronLeft, CheckCircle2, XCircle,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import { getResult } from './resultsData';
import '@/styles/portal/pages.css';

/**
 * Result Detail view — `/candidate/results/:resultId` (Frontend Flow row 34).
 * Displays score, percentage, grade, pass/fail, topic analytics and feedback
 * for a single evaluated attempt. Defaults to the latest result when no id is
 * supplied (legacy `/candidate/results` entry).
 */
export default function AssessmentResult({ resultId = 'RES-1001' }: { resultId?: string }) {
  const result = getResult(resultId);
  if (!result) notFound();

  const passColor = result.passed ? 'var(--green)' : '#DC2626';

  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <Link href="/candidate/results" className="pg-back">
          <ChevronLeft size={16} aria-hidden="true" /> Back to Results &amp; Certificates
        </Link>

        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">Assessment Result</h1>
            <p className="pg-head__sub">
              {result.programme} · {result.code} · Completed on {result.date}
            </p>
          </div>
          <div className="pg-head__actions">
            <button type="button" className="btn btn--secondary" disabled>
              <BarChart2 size={16} aria-hidden="true" /> View Scorecard
            </button>
            {result.certificateId && (
              <button type="button" className="btn btn--primary" disabled>
                <Download size={16} aria-hidden="true" /> Download Certificate
              </button>
            )}
          </div>
        </div>

        <div className="pg-result__grid">
          {/* Summary */}
          <div className="pg-result__summary">
            <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.1rem' }}>
              {result.programme}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{result.attempt}</div>
            <div
              className="pg-result__circle"
              style={{
                background: `conic-gradient(${passColor} 0 ${result.score}%, var(--gray-200) ${result.score}% 100%)`,
              }}
              role="img"
              aria-label={`Overall score ${result.score} percent`}
            >
              <span>{result.score}%</span>
            </div>
            <div className="pg-result__verdict" style={{ color: passColor }}>
              {result.passed ? (
                <>
                  <CheckCircle2 size={18} aria-hidden="true" /> Passed
                </>
              ) : (
                <>
                  <XCircle size={18} aria-hidden="true" /> Not Cleared
                </>
              )}
            </div>
            <div className="pg-result__grade">
              Grade <strong>{result.grade}</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: '8px 0 0' }}>
              {result.passed
                ? 'You have successfully cleared this assessment.'
                : 'You did not reach the pass mark for this assessment.'}
            </p>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <section className="dash__section" style={{ padding: 24 }} aria-labelledby="score-summary">
              <h2 id="score-summary" className="dash__section-title" style={{ marginBottom: 16 }}>
                Topic-wise Analytics
              </h2>
              {result.topics.map((item) => (
                <div className="pg-result__bar-row" key={item.label}>
                  <div className="pg-result__bar-label">{item.label}</div>
                  <div
                    className="pg-result__bar-track"
                    role="img"
                    aria-label={`${item.label}: ${item.percent} percent`}
                  >
                    <div
                      className="pg-result__bar-fill"
                      style={{
                        width: `${item.percent}%`,
                        background: item.percent >= 60 ? 'var(--green)' : '#DC2626',
                      }}
                    />
                  </div>
                  <div className="pg-result__bar-value">{item.percent}%</div>
                </div>
              ))}
            </section>

            <section className="dash__section" style={{ padding: 24 }} aria-labelledby="insights">
              <h2 id="insights" className="dash__section-title" style={{ marginBottom: 12 }}>
                Performance Insights &amp; Feedback
              </h2>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <TrendingUp
                  size={20}
                  aria-hidden="true"
                  style={{ color: passColor, marginTop: 2, flexShrink: 0 }}
                />
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-700)', margin: 0 }}>
                  {result.feedback}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
