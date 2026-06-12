import { Shuffle } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

function Toggle({ title, desc, checked }: { title: string; desc: string; checked: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{title}</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{desc}</div>
      </div>
      <input type="checkbox" style={{ transform: 'scale(1.5)' }} defaultChecked={checked} />
    </div>
  );
}

export default function RandomizationPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={Shuffle} color="#7C3AED" bg="#F5F3FF" title="Randomization" desc="Shuffle questions and options to create unique attempts per candidate." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle title="Question Randomization" desc="Shuffle the order of questions for every candidate attempt." checked />
        <Toggle title="Option Randomization" desc="Shuffle MCQ options (A, B, C, D) internally." checked />
        <Toggle title="Unique Question Set per Attempt" desc="Generate a different question set for each attempt from the pool." checked={false} />
      </div>
    </div>
  );
}
