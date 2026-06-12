'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FileText, AlertTriangle, CheckCircle2, Shield,
  ChevronRight, List, Pencil, Ban, Timer, Camera, Eye, type LucideIcon,
} from 'lucide-react';

const NCFE_LOGO = '/assets/ncfe_logo.png';

const steps = ['System Check', 'Identity Verification', 'Instructions', 'Start Exam'];
const meta: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: List, label: '50 Questions' },
  { icon: Pencil, label: '50 Marks' },
  { icon: Timer, label: '90 Minutes' },
  { icon: Ban, label: 'No Negative Marking' },
];

const examRules = [
  'Each question carries 1 mark. Total marks: 50.',
  'There is no negative marking for wrong answers.',
  'You may navigate between questions using the question palette on the left panel.',
  'You can mark questions for review and return to them before final submission.',
  'Once the timer reaches zero, the exam will be auto-submitted with your current responses.',
  'Do not press the Back button or close the browser window during the exam.',
  'Ensure your responses are saved before proceeding. Each selection auto-saves.',
];

const proctoringRules = [
  'Your exam session is being monitored by a live proctor and AI proctoring system.',
  'Ensure your webcam and microphone remain active throughout the exam.',
  'Do not leave your seat, look away from the screen repeatedly, or speak during the exam.',
  'Any suspicious activity may result in an automatic exam flag or termination.',
  'The proctor may send a message or request a camera check at any time.',
];

const technicalRules = [
  'Ensure stable internet connectivity. A minimum of 5 Mbps is required.',
  'Do not switch tabs, open new windows, or use keyboard shortcuts during the exam.',
  'In case of disconnection, reconnect within 5 minutes — your progress is auto-saved.',
  'Contact the invigilator or proctor immediately if you face a technical issue.',
];

export default function ExamInstructions({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{ background: 'var(--navy)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image src={NCFE_LOGO} alt="NCFE" width={154} height={40} style={{ height: 40, width: 'auto' }} />
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>NCFE</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>Financial Literacy Assessment Portal</div>
          </div>
        </div>
        <div style={{ color: 'white', textAlign: 'right' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>NFLAT – May 2024</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Rohan Sharma · CND125678</div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--gray-200)', padding: '20px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', maxWidth: '600px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i < 2 ? 'var(--green)' : i === 2 ? 'var(--navy)' : 'var(--gray-200)', color: i <= 2 ? 'white' : 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                  {i < 2 ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: i <= 2 ? 'var(--navy)' : 'var(--gray-400)', whiteSpace: 'nowrap' }}>{step}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: '2px', background: i < 2 ? 'var(--green)' : 'var(--gray-200)', margin: '0 8px', marginBottom: '18px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 20px' }}>
        <div style={{ width: '100%', maxWidth: '760px' }}>
          {/* Header */}
          <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', padding: '28px 36px', color: 'white' }}>
            <h1 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '8px' }}>Exam Instructions</h1>
            <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>Please read all instructions carefully before starting the exam.</p>
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
              {meta.map((m) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', opacity: 0.9 }}>
                  <m.icon size={16} aria-hidden="true" /> {m.label}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Body */}
          <div style={{ background: 'white', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <RuleGroup icon={FileText} iconBg="#EFF6FF" iconColor="#3B82F6" title="General Exam Rules" rules={examRules} bulletIcon={CheckCircle2} bulletColor="#16A34A" />
              <div style={{ height: '1px', background: 'var(--gray-100)' }} />
              <RuleGroup icon={Camera} iconBg="#FEF3C7" iconColor="#D97706" title="Proctoring & Monitoring" rules={proctoringRules} bulletIcon={Eye} bulletColor="#D97706" />
              <div style={{ height: '1px', background: 'var(--gray-100)' }} />
              <RuleGroup icon={AlertTriangle} iconBg="#FEE2E2" iconColor="#DC2626" title="Technical Guidelines" rules={technicalRules} bulletIcon={Shield} bulletColor="#DC2626" />

              <div style={{ height: '1px', background: 'var(--gray-100)' }} />

              {/* Consent */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', padding: '16px', background: agreed ? '#F0FDF4' : 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: `2px solid ${agreed ? '#86EFAC' : 'var(--gray-200)'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '1px', cursor: 'pointer' }} />
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                  I have read and understood all the exam instructions listed above. I agree to abide by the rules of the NCFE Assessment Portal and consent to live monitoring during the exam.
                </div>
              </label>

              {/* CTA */}
              <button
                type="button"
                onClick={() => router.push(`/candidate/exam/${attemptId}/start`)}
                disabled={!agreed}
                className="btn btn--primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: agreed ? 1 : 0.5 }}>
                Accept &amp; Start Exam <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
            Exam: NFLAT – May 2024 · Duration: 90 minutes · Attempt 1 of 2
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleGroup({
  icon: Icon, iconBg, iconColor, title, rules, bulletIcon: Bullet, bulletColor,
}: {
  icon: LucideIcon; iconBg: string; iconColor: string; title: string;
  rules: readonly string[]; bulletIcon: LucideIcon; bulletColor: string;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={iconColor} aria-hidden="true" />
        </div>
        <h3 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>{title}</h3>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0', listStyle: 'none' }}>
        {rules.map((rule) => (
          <li key={rule} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--gray-700)', alignItems: 'flex-start' }}>
            <Bullet size={15} color={bulletColor} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" /> {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}
