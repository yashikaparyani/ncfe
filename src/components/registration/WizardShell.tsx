'use client';

import { type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Presentational chrome for the registration wizards: navy header, the step
 * progress indicator, a body slot, and Back/Next footer navigation. All state
 * (current step, validation, submission) lives in the parent wizard component;
 * this shell is intentionally stateless so both flows share identical chrome.
 */
interface WizardShellProps {
  title: string;
  steps: readonly string[];
  current: number;
  /** Optional form-level error summary shown above the step body. */
  formError?: string | null;
  children: ReactNode;
  showFooter: boolean;
  backDisabled?: boolean;
  nextLabel: string;
  nextDisabled?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function WizardShell({
  title,
  steps,
  current,
  formError,
  children,
  showFooter,
  backDisabled,
  nextLabel,
  nextDisabled,
  onBack,
  onNext,
}: WizardShellProps) {
  return (
    <div className="wzd-page">
      <div className="wzd__container">
        <div className="wzd__header">
          <h1 className="wzd__title">{title}</h1>
          <ol className="wzd__stepper" aria-label={`${title} progress`}>
            {steps.map((label, idx) => {
              const status =
                idx === current ? 'wzd__step--active' : idx < current ? 'wzd__step--done' : '';
              return (
                <li
                  className={`wzd__step ${status}`}
                  key={label}
                  aria-current={idx === current ? 'step' : undefined}
                >
                  <span className="wzd__step-circle">
                    {idx < current ? <CheckCircle2 size={16} aria-hidden="true" /> : idx + 1}
                  </span>
                  <span className="wzd__step-label">{label}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="wzd__body">
          {formError && (
            <div className="wzd__form-error" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              <span>{formError}</span>
            </div>
          )}
          {children}
        </div>

        {showFooter && (
          <div className="wzd__footer">
            {backDisabled ? (
              <span />
            ) : (
              <button type="button" className="wzd__btn wzd__btn--back" onClick={onBack}>
                <ChevronLeft size={18} aria-hidden="true" /> Previous
              </button>
            )}
            <button
              type="button"
              className="wzd__btn wzd__btn--next"
              onClick={onNext}
              disabled={nextDisabled}
            >
              {nextLabel} <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
