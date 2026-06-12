import { Clock } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function TimingPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={Clock} color="#F97316" bg="#FFF7ED" title="Exam Cycle & Timing" desc="Link the assessment to an exam cycle and define its availability window." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Exam Cycle *</label>
          <select className="form__select">
            <option>NFLAT Cycle 2024-25</option>
            <option>FLQ Q1 2025</option>
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Timezone</label>
          <select className="form__select">
            <option>IST (Asia/Kolkata)</option>
            <option>UTC</option>
          </select>
        </div>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Availability Start Date *</label>
          <input type="datetime-local" className="form__input" />
        </div>
        <div className="form__group">
          <label className="form__label">Availability End Date *</label>
          <input type="datetime-local" className="form__input" />
        </div>
      </div>

      <div className="form__group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" defaultChecked /> Auto-lock assessment after the end date
        </label>
      </div>
    </div>
  );
}
