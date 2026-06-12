import { FileText } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function BasicPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={FileText} color="#3B82F6" bg="#EFF6FF" title="Basic Information" desc="Define the core identity and type of this assessment." />

      <div className="form__group">
        <label className="form__label">Assessment Name *</label>
        <input type="text" className="form__input" placeholder="e.g. National Financial Literacy Assessment Test (NFLAT) 2024" />
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Assessment Code</label>
          <input type="text" className="form__input" placeholder="e.g. NFLAT-24" />
        </div>
        <div className="form__group">
          <label className="form__label">Assessment Category *</label>
          <select className="form__select" defaultValue="">
            <option value="">Select Category</option>
            <option>NFLAT (Schools)</option>
            <option>FLQ (Corporates)</option>
            <option>Custom Program</option>
          </select>
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Description</label>
        <textarea className="form__input" rows={3} placeholder="Brief description visible to candidates..." />
      </div>

      <div className="form__group">
        <label className="form__label">Supported Languages *</label>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="checkbox" defaultChecked /> English</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="checkbox" defaultChecked /> Hindi</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="checkbox" /> Marathi</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="checkbox" /> Tamil</label>
        </div>
      </div>
    </div>
  );
}
