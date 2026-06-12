'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock, Bookmark, LogOut as LogOutIcon, CheckCircle, Loader, Lightbulb,
  ChevronLeft, ChevronRight, List, Pencil, Ban, Timer,
  MessageCircleQuestion, FileEdit, CircleAlert, MessageSquare, AlertTriangle,
} from 'lucide-react';
import '@/styles/portal/exam-player.css';

const NCFE_LOGO = '/assets/ncfe_logo.png';

type SectionStatus = 'done' | 'progress' | 'none';
const sections: ReadonlyArray<{ name: string; done: number; total: number; status: SectionStatus }> = [
  { name: 'Money & Transactions', done: 8, total: 10, status: 'done' },
  { name: 'Savings & Investments', done: 2, total: 10, status: 'progress' },
  { name: 'Banking', done: 0, total: 10, status: 'none' },
  { name: 'Insurance', done: 0, total: 5, status: 'none' },
  { name: 'Digital Financial Literacy', done: 0, total: 5, status: 'none' },
];

type PaletteState = 'answered' | 'review' | 'current' | 'unanswered' | '';
const paletteNumbers: ReadonlyArray<{ num: number; state: PaletteState }> = Array.from(
  { length: 25 },
  (_, i) => {
    const num = i + 1;
    if ([1, 2, 3, 6, 7, 11, 16, 17].includes(num)) return { num, state: 'answered' as const };
    if ([8, 18].includes(num)) return { num, state: 'review' as const };
    if ([4, 12].includes(num)) return { num, state: 'current' as const };
    if (num <= 10) return { num, state: 'unanswered' as const };
    return { num, state: '' as const };
  },
);

const options: ReadonlyArray<{ label: string; text: string; selected?: boolean }> = [
  { label: 'A', text: 'Equity Shares' },
  { label: 'B', text: 'Mutual Funds' },
  { label: 'C', text: 'Fixed Deposit', selected: true },
  { label: 'D', text: 'Cryptocurrency' },
];

/**
 * Candidate exam-taking screen (presentational scaffold ported from the
 * prototype). UI/UX review changes applied:
 *  - The redundant top-right "Mark for Review" button was removed; review is
 *    handled by the in-question checkbox and the palette "Review Later" action.
 *  - "End Exam" now opens a confirmation dialog before submitting.
 */
export default function ExamPlayer({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const [confirmEnd, setConfirmEnd] = useState(false);

  const submitExam = () => router.push(`/candidate/exam/${attemptId}/completed`);

  return (
    <div className="exam" id="exam-player">
      {/* ═══ Top Bar ═══ */}
      <div className="exam__topbar">
        <div className="exam__topbar-logo">
          <div className="exam__topbar-logo-emblem">
            <Image src={NCFE_LOGO} alt="NCFE" width={32} height={32} />
          </div>
          <div className="exam__topbar-logo-text">
            <span>NCFE</span>
            <span>National Centre for Financial Education</span>
          </div>
        </div>

        <div className="exam__topbar-exam-info">
          <span className="exam__topbar-exam-name">NFLAT – May 2024</span>
          <span className="exam__topbar-exam-sub">Financial Literacy Assessment Test</span>
        </div>

        <div className="exam__topbar-center">
          <div className="exam__timer">
            <Clock aria-hidden="true" />
            <div>
              <div className="exam__timer-value">01 : 29 : 45</div>
              <div className="exam__timer-label">Time Remaining</div>
            </div>
          </div>
          <span className="exam__topbar-qcount">Question 12 of 50</span>
        </div>

        <div className="exam__topbar-right">
          <button
            type="button"
            className="exam__topbar-end-btn"
            id="end-exam-btn"
            onClick={() => setConfirmEnd(true)}
          >
            <LogOutIcon aria-hidden="true" /> End Exam
          </button>
        </div>
      </div>

      {/* ═══ Body ═══ */}
      <div className="exam__body">
        {/* ─── Left Panel ─── */}
        <div className="exam__left">
          <div className="exam__sections">
            <h2 className="exam__sections-title">Sections</h2>
            {sections.map((s, i) => (
              <div
                className={`exam__section-item${s.status === 'progress' ? ' exam__section-item--active' : ''}`}
                key={s.name}
              >
                <span>{i + 1}. {s.name}</span>
                <span className="exam__section-progress">{s.done} / {s.total}</span>
                <span className="exam__section-icon">
                  {s.status === 'done' && <CheckCircle className="exam__section-icon--done" aria-hidden="true" />}
                  {s.status === 'progress' && <Loader className="exam__section-icon--progress" aria-hidden="true" />}
                </span>
              </div>
            ))}
          </div>

          <div className="exam__palette">
            <h3 className="exam__palette-title">Question Palette</h3>
            <div className="exam__palette-legend">
              <div className="exam__palette-legend-item">
                <span className="exam__palette-legend-dot exam__palette-legend-dot--answered" />
                Answered
              </div>
              <div className="exam__palette-legend-item">
                <span className="exam__palette-legend-dot exam__palette-legend-dot--unanswered" />
                Not Answered
              </div>
              <div className="exam__palette-legend-item">
                <span className="exam__palette-legend-dot exam__palette-legend-dot--review" />
                Marked for Review
              </div>
              <div className="exam__palette-legend-item">
                <span className="exam__palette-legend-dot exam__palette-legend-dot--not-visited" />
                Not Visited
              </div>
            </div>

            <div className="exam__palette-grid">
              {paletteNumbers.map(({ num, state }) => (
                <div
                  className={`exam__palette-num${state ? ` exam__palette-num--${state}` : ''}`}
                  key={num}
                >
                  {num}
                </div>
              ))}
            </div>

            <button type="button" className="exam__review-later-btn">
              <Bookmark aria-hidden="true" /> Review Later
            </button>
          </div>
        </div>

        {/* ─── Center Panel ─── */}
        <div className="exam__center">
          <div className="exam__section-label">2. Savings &amp; Investments</div>

          <div className="exam__question-text">
            <span>12.</span> Which of the following is considered a low-risk investment option?
          </div>

          <div className="exam__options">
            {options.map((opt) => (
              <div
                className={`exam__option${opt.selected ? ' exam__option--selected' : ''}`}
                key={opt.label}
              >
                <div className="exam__option-radio" />
                {opt.label}. {opt.text}
              </div>
            ))}
          </div>

          <label className="exam__mark-review">
            <div className="exam__mark-review-check" />
            Mark for Review
          </label>

          <div className="exam__tip">
            <div className="exam__tip-title">
              <Lightbulb aria-hidden="true" /> Tip
            </div>
            <p className="exam__tip-text">
              Fixed deposits offered by banks are considered low-risk as they provide assured returns
              with minimal risk.
            </p>
          </div>

          <div className="exam__bottom-nav">
            <button type="button" className="exam__nav-btn exam__nav-btn--prev">
              <ChevronLeft aria-hidden="true" /> Previous
            </button>
            <button type="button" className="exam__nav-btn exam__nav-btn--clear">
              Clear Response
            </button>
            <button type="button" className="exam__nav-btn exam__nav-btn--next" id="save-next-btn">
              Save &amp; Next <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ─── Right Panel ─── */}
        <div className="exam__right">
          <h3 className="exam__instructions-title">Instructions</h3>

          <div className="exam__instruction-item">
            <List aria-hidden="true" /> <span>Total Questions <strong>: 50</strong></span>
          </div>
          <div className="exam__instruction-item">
            <Pencil aria-hidden="true" /> <span>Total Marks <strong>: 50</strong></span>
          </div>
          <div className="exam__instruction-item">
            <Ban aria-hidden="true" /> <span>Negative Marking <strong>: No</strong></span>
          </div>
          <div className="exam__instruction-item">
            <Timer aria-hidden="true" /> <span>Time Duration <strong>: 90 Minutes</strong></span>
          </div>

          <div className="exam__instruction-separator" />

          <div className="exam__instruction-note">
            <MessageCircleQuestion aria-hidden="true" /> Each question carries 1 mark.
          </div>
          <div className="exam__instruction-note">
            <FileEdit aria-hidden="true" /> You can navigate between questions using the palette.
          </div>
          <div className="exam__instruction-note">
            <FileEdit aria-hidden="true" /> You can review and change your answers before submitting.
          </div>
          <div className="exam__instruction-note">
            <CircleAlert aria-hidden="true" /> Click on &apos;End Exam&apos; to submit your test.
          </div>

          <div className="exam__proctor-alert">
            <div className="exam__proctor-alert-text">
              Proctor has initiated a live check. Please look directly at the camera.
            </div>
            <Link href="/support" className="exam__proctor-alert-link">
              <MessageSquare size={16} aria-hidden="true" /> Open Chat
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ End-Exam confirmation dialog ═══ */}
      {confirmEnd && (
        <div
          className="exam__confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-exam-title"
        >
          <div className="exam__confirm">
            <div className="exam__confirm-icon">
              <AlertTriangle size={28} aria-hidden="true" />
            </div>
            <h2 className="exam__confirm-title" id="end-exam-title">
              End exam and submit?
            </h2>
            <p className="exam__confirm-text">
              Once you submit, you cannot return to the exam or change your answers. Make sure you have
              reviewed all marked questions.
            </p>
            <div className="exam__confirm-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setConfirmEnd(false)}
              >
                Continue Exam
              </button>
              <button type="button" className="btn btn--primary" onClick={submitExam}>
                <LogOutIcon size={16} aria-hidden="true" /> End &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
