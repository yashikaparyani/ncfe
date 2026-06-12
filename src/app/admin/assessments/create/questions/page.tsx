import { ListChecks } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function QuestionsPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={ListChecks} color="#8B5CF6" bg="#F5F3FF" title="Question Assignment" desc="Choose how questions are pulled into this assessment." />

      <div className="form__group">
        <label className="form__label">Selection Method *</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '8px' }}>
          <div className="wizard__card-option wizard__card-option--selected">
            <div className="wizard__card-option-title">Rule-Based</div>
            <div className="wizard__card-option-desc">Auto-pull from the Question Bank by topic, difficulty and count.</div>
          </div>
          <div className="wizard__card-option">
            <div className="wizard__card-option-title">Manual</div>
            <div className="wizard__card-option-desc">Hand-pick specific questions into a static paper.</div>
          </div>
          <div className="wizard__card-option">
            <div className="wizard__card-option-title">Hybrid</div>
            <div className="wizard__card-option-desc">Mix fixed questions with rule-based dynamic selection.</div>
          </div>
        </div>
      </div>

      <div className="form__group" style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px dashed #D1D5DB' }}>
        <label className="form__label" style={{ marginBottom: '12px' }}>Configure Topic Rules</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '12px' }}>
          <div style={{ flex: 2 }}>
            <select className="form__select"><option>Basic Financial Concepts</option><option>Banking</option></select>
          </div>
          <div style={{ flex: 1 }}>
            <select className="form__select"><option>Easy</option><option>Medium</option><option>Hard</option></select>
          </div>
          <div style={{ flex: 1 }}>
            <input type="number" className="form__input" placeholder="Count" defaultValue="15" />
          </div>
          <button type="button" className="btn btn--secondary" style={{ padding: '10px 16px' }}>Add</button>
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Current Configuration: 1 Rule • 15 Questions Total</div>
      </div>
    </div>
  );
}
