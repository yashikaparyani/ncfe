import { Timer } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function DurationPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={Timer} color="#F59E0B" bg="#FFFBEB" title="Duration & Timer" desc="Set the overall duration, per-question limits and auto-submit behaviour." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Total Duration (Minutes) *</label>
          <input type="number" className="form__input" defaultValue="60" />
        </div>
        <div className="form__group">
          <label className="form__label">Per-Question Timer Mode</label>
          <select className="form__select">
            <option>Disabled (Overall Timer Only)</option>
            <option>Enabled (Strict per-question limits)</option>
          </select>
        </div>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Time Warning At (minutes left)</label>
          <input type="number" className="form__input" defaultValue="5" />
        </div>
        <div className="form__group">
          <label className="form__label">On Time Expiry</label>
          <select className="form__select">
            <option>Auto-submit attempt</option>
            <option>Lock and flag for review</option>
          </select>
        </div>
      </div>
    </div>
  );
}
