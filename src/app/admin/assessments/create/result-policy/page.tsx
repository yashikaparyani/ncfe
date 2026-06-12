import { ClipboardCheck } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function ResultPolicyPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={ClipboardCheck} color="#22C55E" bg="#F0FDF4" title="Result & Feedback Policy" desc="Control when results are shown and what feedback candidates can see." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Result Visibility</label>
          <select className="form__select">
            <option>Instant (on submission)</option>
            <option>After exam window closes</option>
            <option>Manual release by NCFE</option>
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Answer Key Visibility</label>
          <select className="form__select">
            <option>Hidden</option>
            <option>Show correct answers after result</option>
            <option>Show with explanations</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" defaultChecked /> Show topic-wise performance analytics
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" defaultChecked /> Issue certificate on pass
        </label>
      </div>
    </div>
  );
}
