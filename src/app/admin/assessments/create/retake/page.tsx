import { RotateCcw } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function RetakePage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={RotateCcw} color="#DB2777" bg="#FDF2F8" title="Retake & Reassessment" desc="Configure how many times and how soon a candidate can re-attempt." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Maximum Retakes Allowed</label>
          <input type="number" className="form__input" defaultValue="0" />
        </div>
        <div className="form__group">
          <label className="form__label">Cooldown Between Attempts (hours)</label>
          <input type="number" className="form__input" defaultValue="24" />
        </div>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Retake Window (days)</label>
          <input type="number" className="form__input" defaultValue="7" />
        </div>
        <div className="form__group">
          <label className="form__label">Scoring Method Across Attempts</label>
          <select className="form__select">
            <option>Best Score</option>
            <option>Latest Score</option>
            <option>Average Score</option>
          </select>
        </div>
      </div>
    </div>
  );
}
