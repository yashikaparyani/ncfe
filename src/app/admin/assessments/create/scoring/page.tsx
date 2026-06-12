import { Calculator } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function ScoringPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={Calculator} color="#0D9488" bg="#F0FDFA" title="Scoring" desc="Define marks, penalties, pass criteria and grading bands." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Marks Per Question</label>
          <input type="number" className="form__input" defaultValue="1" />
        </div>
        <div className="form__group">
          <label className="form__label">Negative Marking Penalty</label>
          <input type="number" step="0.25" className="form__input" defaultValue="0" placeholder="e.g. 0.25" />
        </div>
        <div className="form__group">
          <label className="form__label">Passing Percentage (%)</label>
          <input type="number" className="form__input" defaultValue="40" />
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Grading Bands</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input type="text" className="form__input" defaultValue="Distinction" style={{ flex: 2 }} />
            <input type="number" className="form__input" defaultValue="75" style={{ flex: 1 }} />
            <span style={{ color: 'var(--gray-500)' }}>% and above</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input type="text" className="form__input" defaultValue="Pass" style={{ flex: 2 }} />
            <input type="number" className="form__input" defaultValue="40" style={{ flex: 1 }} />
            <span style={{ color: 'var(--gray-500)' }}>% and above</span>
          </div>
        </div>
      </div>
    </div>
  );
}
