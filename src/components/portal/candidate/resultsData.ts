/**
 * Demo-only result + certificate dataset shared by the candidate Results
 * listing (`/candidate/results`), the Result Detail view
 * (`/candidate/results/:resultId`) and the Certificates gallery
 * (`/candidate/certificates`).
 *
 * Per the Frontend Application Flow doc (row 34), a result must expose score,
 * percentage, grade, pass/fail, topic analytics and feedback. There is NO
 * persistence yet — results are generated server-side only from
 * submitted/evaluated attempts once the exam engine + PostgreSQL `result`
 * tables are wired (see web/CLAUDE.md). This module is the single source of
 * truth for the demo so the three views never disagree.
 */

export interface TopicScore {
  label: string;
  percent: number;
}

export interface ResultRecord {
  /** Result id used in the detail route `/candidate/results/:resultId`. */
  id: string;
  /** Human programme + cycle label, e.g. "NFLAT – May 2024". */
  programme: string;
  /** Assessment code, e.g. "NFLAT-2024-Q2". */
  code: string;
  /** Programme family used as a chip, e.g. "NFLAT" | "FLQ" | "Custom Quiz". */
  type: string;
  /** Completion date, already formatted for display. */
  date: string;
  /** Attempt label, e.g. "Attempt 1 of 2". */
  attempt: string;
  /** Overall percentage score (0–100). */
  score: number;
  /** Letter grade derived from score by the result policy. */
  grade: string;
  /** Pass/fail outcome from the assessment's result policy. */
  passed: boolean;
  /** Issued certificate id — present only when a certificate was generated. */
  certificateId?: string;
  /** Per-topic / per-section analytics. */
  topics: readonly TopicScore[];
  /** Short evaluator/system feedback line shown on the result detail. */
  feedback: string;
}

export const results: readonly ResultRecord[] = [
  {
    id: 'RES-1001',
    programme: 'NFLAT – May 2024',
    code: 'NFLAT-2024-Q2',
    type: 'NFLAT',
    date: '15 May 2024',
    attempt: 'Attempt 1 of 2',
    score: 78,
    grade: 'B+',
    passed: true,
    certificateId: 'CRT-NFLAT-2024-0125',
    topics: [
      { label: 'Money & Transactions', percent: 80 },
      { label: 'Savings & Investments', percent: 70 },
      { label: 'Banking', percent: 85 },
      { label: 'Insurance', percent: 75 },
      { label: 'Digital Financial Literacy', percent: 80 },
    ],
    feedback:
      'Well done! You have a strong understanding of most concepts. Focus a little more on Savings & Investments to push into the A band.',
  },
  {
    id: 'RES-1002',
    programme: 'FLQ Quiz – January 2024',
    code: 'FLQ-2024-Q1',
    type: 'FLQ',
    date: '18 Jan 2024',
    attempt: 'Attempt 1 of 3',
    score: 71,
    grade: 'B',
    passed: true,
    certificateId: 'CRT-FLQ-2024-0098',
    topics: [
      { label: 'Budgeting Basics', percent: 75 },
      { label: 'Saving Habits', percent: 68 },
      { label: 'Consumer Awareness', percent: 70 },
      { label: 'Digital Payments', percent: 72 },
    ],
    feedback:
      'Good participation and a solid grasp of everyday money concepts. Keep practising to build deeper confidence.',
  },
  {
    id: 'RES-1003',
    programme: 'School Financial Awareness Quiz',
    code: 'SFAQ-2024-DPS',
    type: 'Custom Quiz',
    date: '02 Mar 2024',
    attempt: 'Attempt 2 of 2',
    score: 48,
    grade: 'D',
    passed: false,
    topics: [
      { label: 'Needs vs Wants', percent: 55 },
      { label: 'Pocket-money Planning', percent: 45 },
      { label: 'Safe Online Spending', percent: 40 },
      { label: 'Banking for Students', percent: 52 },
    ],
    feedback:
      'You did not clear the 60% pass mark this cycle. Review Safe Online Spending and Pocket-money Planning, then re-enrol in the next cycle.',
  },
] as const;

export function getResult(id: string): ResultRecord | undefined {
  return results.find((r) => r.id === id);
}

/** Pass mark applied by the demo result policy (NCFE programmes). */
export const PASS_MARK = 60;
