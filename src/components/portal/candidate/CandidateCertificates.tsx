import Link from 'next/link';
import {
  Award, Download, ShieldCheck, Share2, Calendar, BadgeCheck, Medal,
  FileBadge, ScrollText, Info, type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import '@/styles/portal/pages.css';

interface Certificate {
  certificateId: string;
  resultId: string;
  programme: string;
  type: string;
  /** Award descriptor shown under the title, e.g. "Achievement Certificate". */
  award: string;
  issuedOn: string;
  score: number;
  grade: string;
  validity: string;
  icon: LucideIcon;
}

// Issued only for cleared assessments — mirrors the passed results in
// resultsData.ts. There is no public/guessable download path: the live build
// will serve certificates through authenticated, access-controlled endpoints
// with signed, expiring URLs (web/CLAUDE.md §2.5).
const certificates: readonly Certificate[] = [
  {
    certificateId: 'CRT-NFLAT-2024-0125',
    resultId: 'RES-1001',
    programme: 'NFLAT – May 2024',
    type: 'NFLAT',
    award: 'Achievement Certificate',
    issuedOn: '20 May 2024',
    score: 78,
    grade: 'B+',
    validity: 'Lifetime',
    icon: Medal,
  },
  {
    certificateId: 'CRT-FLQ-2024-0098',
    resultId: 'RES-1002',
    programme: 'FLQ Quiz – January 2024',
    type: 'FLQ',
    award: 'Participation Certificate',
    issuedOn: '22 Jan 2024',
    score: 71,
    grade: 'B',
    validity: 'Lifetime',
    icon: ScrollText,
  },
];

const stats: ReadonlyArray<{ label: string; value: string; color: string; icon: LucideIcon }> = [
  { label: 'Total Certificates', value: String(certificates.length), color: '#D97706', icon: Award },
  { label: 'Verified', value: String(certificates.length), color: '#16A34A', icon: BadgeCheck },
  { label: 'Latest Award', value: 'May 2024', color: '#1D4ED8', icon: FileBadge },
];

export default function CandidateCertificates() {
  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">My Certificates</h1>
            <p className="pg-head__sub">
              Download and share verifiable certificates earned across NCFE assessments.
            </p>
          </div>
          <div className="pg-head__actions">
            <Link href="/candidate/results" className="btn btn--secondary">
              <Award size={16} aria-hidden="true" /> View Results
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
          <ShieldCheck size={16} aria-hidden="true" />
          Every certificate carries a unique verification ID. Downloads and public verification
          activate once the document service is connected — certificates will then be served over
          signed, expiring links, never a public path.
        </p>

        {certificates.length === 0 ? (
          <div className="dash__section" style={{ padding: 48, textAlign: 'center' }}>
            <Award size={40} aria-hidden="true" style={{ color: 'var(--gray-400)' }} />
            <h2 style={{ color: 'var(--navy)', margin: '12px 0 4px' }}>No certificates yet</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', margin: 0 }}>
              Clear an assessment to earn your first verifiable certificate.
            </p>
          </div>
        ) : (
          <div className="pg-cert-grid">
            {certificates.map((c) => (
              <article className="pg-cert" key={c.certificateId}>
                <header className="pg-cert__ribbon">
                  <span className="pg-cert__seal" aria-hidden="true">
                    <c.icon size={22} />
                  </span>
                  <div>
                    <div className="pg-cert__type">{c.type}</div>
                    <h2 className="pg-cert__name">{c.award}</h2>
                  </div>
                </header>

                <div className="pg-cert__body">
                  <div className="pg-cert__programme">{c.programme}</div>

                  <div className="pg-cert__meta">
                    <div>
                      <div className="pg-cert__meta-label">Score</div>
                      <div className="pg-cert__meta-value">
                        {c.score}% · Grade {c.grade}
                      </div>
                    </div>
                    <div>
                      <div className="pg-cert__meta-label">Issued</div>
                      <div className="pg-cert__meta-value">
                        <Calendar size={13} aria-hidden="true" /> {c.issuedOn}
                      </div>
                    </div>
                    <div>
                      <div className="pg-cert__meta-label">Validity</div>
                      <div className="pg-cert__meta-value">{c.validity}</div>
                    </div>
                    <div>
                      <div className="pg-cert__meta-label">Status</div>
                      <div className="pg-cert__meta-value">
                        <span className="pg-chip pg-chip--success">
                          <BadgeCheck size={13} aria-hidden="true" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pg-cert__id">
                    <span className="pg-cert__meta-label">Verification ID</span>
                    <code>{c.certificateId}</code>
                  </div>
                </div>

                <footer className="pg-cert__actions">
                  <button type="button" className="btn btn--primary btn--sm" disabled>
                    <Download size={15} aria-hidden="true" /> Download
                  </button>
                  <button type="button" className="btn btn--secondary btn--sm" disabled>
                    <ShieldCheck size={15} aria-hidden="true" /> Verify
                  </button>
                  <button type="button" className="btn btn--outline btn--sm" disabled>
                    <Share2 size={15} aria-hidden="true" /> Share
                  </button>
                </footer>
              </article>
            ))}
          </div>
        )}

        <p className="pg-list__note" style={{ borderRadius: 'var(--radius-md)', marginTop: 16 }}>
          <Info size={14} aria-hidden="true" />
          Certificates are issued automatically for cleared assessments. Not cleared an assessment
          yet? Re-enrol from{' '}
          <Link href="/candidate/assessments" style={{ color: 'inherit', fontWeight: 700 }}>
            My Assessments
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
