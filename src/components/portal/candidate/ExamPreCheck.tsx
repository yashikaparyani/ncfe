'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Monitor, Wifi, Camera, Mic, Shield, CheckCircle2, XCircle,
  Loader, AlertTriangle, ChevronRight, RefreshCw, type LucideIcon,
} from 'lucide-react';
import '@/styles/portal/exam-player.css';

const NCFE_LOGO = '/assets/ncfe_logo.png';

type CheckStatus = 'checking' | 'pass' | 'warning' | 'fail';
interface Check {
  id: string;
  label: string;
  icon: LucideIcon;
  status: CheckStatus;
  detail: string;
}

const initialChecks: readonly Check[] = [
  { id: 'browser', label: 'Browser Compatibility', icon: Monitor, status: 'checking', detail: 'Checking browser version and capabilities...' },
  { id: 'network', label: 'Network Speed', icon: Wifi, status: 'checking', detail: 'Testing connection speed...' },
  { id: 'camera', label: 'Camera Access', icon: Camera, status: 'checking', detail: 'Verifying webcam availability...' },
  { id: 'mic', label: 'Microphone Access', icon: Mic, status: 'checking', detail: 'Verifying microphone availability...' },
  { id: 'fullscreen', label: 'Full-Screen Mode', icon: Monitor, status: 'checking', detail: 'Checking full-screen capability...' },
  { id: 'security', label: 'Security Check', icon: Shield, status: 'checking', detail: 'Verifying proctoring requirements...' },
];

const resolvedChecks: readonly Check[] = [
  { id: 'browser', label: 'Browser Compatibility', icon: Monitor, status: 'pass', detail: 'Chrome 125 – Compatible ✓' },
  { id: 'network', label: 'Network Speed', icon: Wifi, status: 'pass', detail: '48 Mbps download – Good ✓' },
  { id: 'camera', label: 'Camera Access', icon: Camera, status: 'pass', detail: 'Camera detected and accessible ✓' },
  { id: 'mic', label: 'Microphone Access', icon: Mic, status: 'warning', detail: 'Microphone detected but volume is low – Check mic settings' },
  { id: 'fullscreen', label: 'Full-Screen Mode', icon: Monitor, status: 'pass', detail: 'Full-screen mode supported ✓' },
  { id: 'security', label: 'Security Check', icon: Shield, status: 'pass', detail: 'No restricted software detected ✓' },
];

const steps = ['System Check', 'Identity Verification', 'Instructions', 'Start Exam'];

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === 'checking') return <Loader size={18} color="#3B82F6" style={{ animation: 'exam-spin 1s linear infinite' }} aria-hidden="true" />;
  if (status === 'pass') return <CheckCircle2 size={18} color="#16A34A" aria-hidden="true" />;
  if (status === 'warning') return <AlertTriangle size={18} color="#D97706" aria-hidden="true" />;
  if (status === 'fail') return <XCircle size={18} color="#DC2626" aria-hidden="true" />;
  return null;
}

export default function ExamPreCheck({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<'ready' | 'checking' | 'done'>('ready');
  const [checks, setChecks] = useState<readonly Check[]>(initialChecks);
  const [checkedCount, setCheckedCount] = useState(0);

  const runChecks = () => {
    setPhase('checking');
    setChecks(initialChecks);
    setCheckedCount(0);
    resolvedChecks.forEach((check, i) => {
      setTimeout(() => {
        setChecks((prev) => prev.map((c) => (c.id === check.id ? check : c)));
        setCheckedCount(i + 1);
        if (i === resolvedChecks.length - 1) setPhase('done');
      }, 800 * (i + 1));
    });
  };

  const hasFailure = checks.some((c) => c.status === 'fail');

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
        <div style={{ color: 'white', fontSize: '0.875rem', textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>NFLAT – May 2024</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Rohan Sharma · CND125678</div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--gray-200)', padding: '20px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', maxWidth: '600px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i === 0 ? 'var(--navy)' : 'var(--gray-200)', color: i === 0 ? 'white' : 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                  {i === 0 && phase === 'done' ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: i === 0 ? 'var(--navy)' : 'var(--gray-400)', whiteSpace: 'nowrap' }}>{step}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: '2px', background: 'var(--gray-200)', margin: '0 8px', marginBottom: '18px' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '680px' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Shield size={30} color="#3B82F6" aria-hidden="true" />
              </div>
              <h1 style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '8px' }}>System Readiness Check</h1>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                We&apos;ll verify your browser, internet speed, camera, microphone and security requirements before the exam begins.
              </p>
            </div>

            {/* Checks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '28px' }}>
              {checks.map((check, i) => (
                <div key={check.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: i < checks.length - 1 ? '1px solid var(--gray-100)' : 'none',
                  background: check.status === 'warning' ? '#FFFBEB' : check.status === 'fail' ? '#FFF1F2' : 'white' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <check.icon size={18} color="var(--gray-500)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.875rem' }}>{check.label}</div>
                    <div style={{ fontSize: '0.775rem', color: check.status === 'warning' ? '#D97706' : check.status === 'fail' ? '#DC2626' : 'var(--gray-500)', marginTop: '2px' }}>{check.detail}</div>
                  </div>
                  <StatusIcon status={check.status} />
                </div>
              ))}
            </div>

            {/* Camera Preview */}
            {phase !== 'ready' && (
              <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '75px', background: '#1E293B', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Camera size={24} color="rgba(255,255,255,0.4)" aria-hidden="true" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.875rem', marginBottom: '4px' }}>Camera Preview</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Ensure your face is clearly visible and well-lit. Remove glasses if causing glare.</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {phase === 'ready' && (
              <button type="button" onClick={runChecks} className="btn btn--primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Shield size={20} aria-hidden="true" /> Begin System Check
              </button>
            )}

            {phase === 'checking' && (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                  <Loader size={18} color="#3B82F6" style={{ animation: 'exam-spin 1s linear infinite' }} aria-hidden="true" />
                  Running checks ({checkedCount}/{checks.length})...
                </div>
              </div>
            )}

            {phase === 'done' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '14px 20px', background: hasFailure ? '#FFF1F2' : '#F0FDF4', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                  {hasFailure
                    ? <><XCircle size={18} color="#DC2626" aria-hidden="true" /><span style={{ color: '#991B1B', fontWeight: 600 }}>Some checks failed. Please resolve issues before proceeding.</span></>
                    : <><CheckCircle2 size={18} color="#16A34A" aria-hidden="true" /><span style={{ color: '#166534', fontWeight: 600 }}>All critical checks passed. You&apos;re ready to proceed.</span></>}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={runChecks} className="btn btn--secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <RefreshCw size={16} aria-hidden="true" /> Re-run Checks
                  </button>
                  <button type="button" onClick={() => router.push(`/candidate/exam/${attemptId}/identity-verification`)} className="btn btn--primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem' }} disabled={hasFailure}>
                    Proceed to Identity Verification <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Note */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
            Need help? <a href="/contact" style={{ color: 'var(--navy)', fontWeight: 600 }}>Contact Support</a> · <span>Helpline: 1800-XXX-XXXX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
