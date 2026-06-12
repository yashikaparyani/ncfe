import BuilderWizardShell, { type WizardStep } from '@/components/wizard/BuilderWizardShell';

const base = '/admin/assessments/create';
const steps: readonly WizardStep[] = [
  { label: 'Basic', path: `${base}/basic` },
  { label: 'Timing', path: `${base}/timing` },
  { label: 'Mode', path: `${base}/mode` },
  { label: 'SEB', path: `${base}/seb` },
  { label: 'Questions', path: `${base}/questions` },
  { label: 'Scoring', path: `${base}/scoring` },
  { label: 'Randomize', path: `${base}/randomization` },
  { label: 'Duration', path: `${base}/duration` },
  { label: 'Retake', path: `${base}/retake` },
  { label: 'Result', path: `${base}/result-policy` },
  { label: 'Eligibility', path: `${base}/eligibility` },
  { label: 'Review', path: `${base}/review` },
];

export default function AssessmentCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <BuilderWizardShell
      title="Assessment Builder"
      backLink="/admin/assessments"
      backLabel="Back to Assessments"
      steps={steps}
      submitLabel="Publish Assessment"
      submitTo="/admin/assessments"
    >
      {children}
    </BuilderWizardShell>
  );
}
