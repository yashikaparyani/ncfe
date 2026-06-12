'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import '@/styles/wizard/builder.css';

export interface WizardStep {
  label: string;
  path: string;
}

/**
 * Full-page builder chrome (top progress bar) shared by the admin authoring
 * flows. Each step is its own route; this shell highlights the active step
 * from the pathname and drives Back / Save & Continue / Publish navigation.
 * (Ported from the frontend prototype.)
 */
export default function BuilderWizardShell({
  title,
  backLink = '/admin/dashboard',
  backLabel = 'Back to Dashboard',
  steps,
  submitLabel = 'Publish',
  submitTo = '/admin/assessments',
  children,
}: {
  title: string;
  backLink?: string;
  backLabel?: string;
  steps: readonly WizardStep[];
  submitLabel?: string;
  submitTo?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || '';
  const router = useRouter();

  let current = steps.findIndex((s) => s.path === pathname);
  if (current === -1) current = 0;

  const isLast = current === steps.length - 1;
  const prev = current > 0 ? steps[current - 1] : null;
  const next = !isLast ? steps[current + 1] : null;

  return (
    <div className="bwiz">
      <header className="bwiz__header">
        <Link href={backLink} className="bwiz__back">
          <ArrowLeft size={18} aria-hidden="true" /> {backLabel}
        </Link>
        <div className="bwiz__logo">
          NCFE <span>{title}</span>
        </div>
      </header>

      <div className="bwiz__progress">
        <div className="bwiz__progress-container">
          <div className="bwiz__progress-track">
            <div className="bwiz__progress-fill" style={{ width: `${(current / (steps.length - 1)) * 100}%` }} />
          </div>
          <div className="bwiz__steps">
            {steps.map((s, index) => {
              const isActive = index === current;
              const isCompleted = index < current;
              return (
                <div
                  key={s.path}
                  className={`bwiz__step ${isActive ? 'bwiz__step--active' : ''} ${isCompleted ? 'bwiz__step--completed' : ''}`}
                >
                  <div className="bwiz__step-icon">
                    {isCompleted ? <CheckCircle2 size={16} aria-hidden="true" /> : index + 1}
                  </div>
                  <span className="bwiz__step-label">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <main className="bwiz__main">
        <div className="bwiz__content-box">{children}</div>

        <div className="bwiz__footer">
          <button type="button" className="bwiz__btn-back" onClick={() => prev && router.push(prev.path)} disabled={!prev}>
            <ChevronLeft size={18} aria-hidden="true" /> Back
          </button>

          {!isLast && next ? (
            <button type="button" className="bwiz__btn-next" onClick={() => router.push(next.path)}>
              Save &amp; Continue <ChevronRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" className="bwiz__btn-submit" onClick={() => router.push(submitTo)}>
              {submitLabel} <CheckCircle2 size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
