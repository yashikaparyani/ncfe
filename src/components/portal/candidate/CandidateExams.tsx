'use client';

import { useRouter } from 'next/navigation';
import {
  Clock, MapPin, Monitor, ChevronRight, CheckCircle2, AlertCircle,
  FileText, Calendar, Award, type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import '@/styles/portal/pages.css';

type ExamStatus = 'Enrolled' | 'Available' | 'Completed';

interface Exam {
  id: string;
  name: string;
  code: string;
  type: string;
  duration: string;
  questions: number;
  marks: number;
  mode: string;
  attempts: string;
  attemptsLeft: number;
  date: string;
  slot: string;
  status: ExamStatus;
  description: string;
}

const exams: readonly Exam[] = [
  {
    id: 'EXAM-NFLAT-Q2',
    name: 'NFLAT – National Financial Literacy Assessment Test',
    code: 'NFLAT-2024-Q2', type: 'NFLAT', duration: '90 minutes', questions: 50, marks: 50,
    mode: 'Lab Mode', attempts: '1 / 2 used', attemptsLeft: 1, date: '15 Jun 2024, 10:00 AM',
    slot: 'Slot 1 – Lab A', status: 'Enrolled',
    description: 'Comprehensive test of financial literacy covering money management, savings, investments, banking, insurance and digital finance.',
  },
  {
    id: 'EXAM-FLQ-Q2',
    name: 'FLQ – Financial Literacy Quiz',
    code: 'FLQ-2024-Q2', type: 'FLQ Quiz', duration: '30 minutes', questions: 25, marks: 25,
    mode: 'Online Mode', attempts: '0 / 3 used', attemptsLeft: 3, date: 'Open – Ends 30 Jun 2024',
    slot: 'On-demand', status: 'Available',
    description: 'Short quiz covering basic financial concepts. Can be taken online anytime within the cycle window.',
  },
  {
    id: 'EXAM-CUSTOM-Q2',
    name: 'School Financial Awareness Quiz',
    code: 'SFAQ-2024-DPS', type: 'Custom Quiz', duration: '20 minutes', questions: 20, marks: 20,
    mode: 'Online Mode', attempts: '2 / 2 used', attemptsLeft: 0, date: 'Completed',
    slot: 'On-demand', status: 'Completed',
    description: 'Custom quiz assigned by Delhi Public School for internal financial awareness assessment.',
  },
];

const statusConfig: Record<ExamStatus, { chip: string; action: string; actionTo: string }> = {
  Enrolled: { chip: 'pg-chip pg-chip--info', action: 'Take Exam', actionTo: '/candidate/exam/ATT-1001/precheck' },
  Available: { chip: 'pg-chip pg-chip--success', action: 'Enroll Now', actionTo: '/candidate/exam/ATT-1001/precheck' },
  Completed: { chip: 'pg-chip pg-chip--muted', action: 'View Result', actionTo: '/candidate/results/RES-1001' },
};

const stats: ReadonlyArray<{ label: string; value: string; color: string; icon: LucideIcon }> = [
  { label: 'Total Assigned', value: '3', color: '#3B82F6', icon: FileText },
  { label: 'Enrolled', value: '1', color: '#7C3AED', icon: CheckCircle2 },
  { label: 'Available to Take', value: '1', color: '#16A34A', icon: Calendar },
  { label: 'Completed', value: '1', color: '#64748B', icon: Award },
];

export default function CandidateExams() {
  const router = useRouter();

  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">My Assessments</h1>
            <p className="pg-head__sub">
              View all assigned exams, enrollment status and take available assessments.
            </p>
          </div>
        </div>

        <div className="dash__stats">
          {stats.map((k) => (
            <div className="dash__stat-card" key={k.label}>
              <div>
                <div className="dash__stat-value" style={{ color: k.color }}>{k.value}</div>
                <div className="dash__stat-label">{k.label}</div>
              </div>
              <div className="dash__stat-icon" style={{ background: `${k.color}15`, color: k.color }}>
                <k.icon size={22} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {exams.map((exam) => {
            const sc = statusConfig[exam.status];
            return (
              <section className="dash__section" key={exam.id} style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <div className="pg-exam__tags">
                      <span className="pg-exam__code">{exam.code}</span>
                      <span className={sc.chip}>{exam.status}</span>
                      <span className="pg-chip pg-chip--muted">{exam.type}</span>
                    </div>
                    <h2 style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.05rem', margin: '0 0 6px' }}>
                      {exam.name}
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: '0 0 12px' }}>
                      {exam.description}
                    </p>
                    <div className="pg-exam__meta">
                      <span className="pg-exam__meta-item"><Clock size={14} aria-hidden="true" /> {exam.duration}</span>
                      <span className="pg-exam__meta-item"><FileText size={14} aria-hidden="true" /> {exam.questions} Questions · {exam.marks} Marks</span>
                      <span className="pg-exam__meta-item"><Monitor size={14} aria-hidden="true" /> {exam.mode}</span>
                      <span className="pg-exam__meta-item"><Calendar size={14} aria-hidden="true" /> {exam.date}</span>
                      <span className="pg-exam__meta-item"><MapPin size={14} aria-hidden="true" /> {exam.slot}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Attempts</div>
                      <div style={{ fontWeight: 700, color: exam.attemptsLeft === 0 ? '#DC2626' : 'var(--navy)' }}>
                        {exam.attempts}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={exam.attemptsLeft > 0 ? 'btn btn--primary' : 'btn btn--secondary'}
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => router.push(exam.attemptsLeft > 0 ? sc.actionTo : '/candidate/results/RES-1001')}
                    >
                      {exam.attemptsLeft > 0 ? sc.action : 'View Result'}
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {exam.status === 'Enrolled' && (
                  <div className="pg-banner pg-banner--info" style={{ marginTop: 16, marginBottom: 0 }}>
                    <AlertCircle size={14} aria-hidden="true" />
                    <div>
                      You are enrolled in <strong>{exam.slot}</strong>. Please arrive 15 minutes before
                      your slot and carry a valid government-issued photo ID.
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
