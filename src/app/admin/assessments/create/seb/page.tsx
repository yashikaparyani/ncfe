import { ShieldCheck } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function SebPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={ShieldCheck} color="#EF4444" bg="#FEF2F2" title="Safe Exam Browser (SEB)" desc="Configure SEB lockdown rules. Applies only when SEB delivery is selected." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--navy)' }}>Require SEB</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Candidates must launch the exam inside Safe Exam Browser.</div>
          </div>
          <input type="checkbox" style={{ transform: 'scale(1.5)' }} defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--navy)' }}>Disable Copy / Paste &amp; Right-click</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Block clipboard and context menu during the exam.</div>
          </div>
          <input type="checkbox" style={{ transform: 'scale(1.5)' }} defaultChecked />
        </div>
      </div>

      <div className="form__group" style={{ marginTop: '24px' }}>
        <label className="form__label">SEB Config Key</label>
        <input type="text" className="form__input" placeholder="Auto-generated on publish" disabled />
      </div>
    </div>
  );
}
