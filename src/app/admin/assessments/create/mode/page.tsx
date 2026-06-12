import { MonitorPlay } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function ModePage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={MonitorPlay} color="#0EA5E9" bg="#F0F9FF" title="Exam Type & Delivery Mode" desc="Choose how the exam is delivered to candidates." />

      <div className="form__group">
        <label className="form__label">Exam Type *</label>
        <select className="form__select">
          <option>Automated (Anytime within window)</option>
          <option>Live (Strict concurrent start)</option>
          <option>Simple Exam (Practice / Open)</option>
        </select>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Delivery Channel</label>
          <select className="form__select">
            <option>Web Browser Only</option>
            <option>Safe Exam Browser (SEB) Mandatory</option>
            <option>In-Center Lab (Kiosk)</option>
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Proctoring</label>
          <select className="form__select">
            <option>None</option>
            <option>AI Proctoring</option>
            <option>Live Proctoring</option>
            <option>AI + Live</option>
          </select>
        </div>
      </div>
    </div>
  );
}
