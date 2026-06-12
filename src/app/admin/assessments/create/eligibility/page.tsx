import { Users } from 'lucide-react';
import StepHeader from '@/components/wizard/StepHeader';

export default function EligibilityPage() {
  return (
    <div className="wizard__step-content">
      <StepHeader icon={Users} color="#2563EB" bg="#EFF6FF" title="Eligibility & Auto Assignment" desc="Define the target audience and auto-assignment rules." />

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Target Audience</label>
          <select className="form__select">
            <option>Students (Schools)</option>
            <option>Employees (Corporates)</option>
            <option>General Public</option>
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Category Mapping</label>
          <select className="form__select">
            <option>All Categories</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC/ST</option>
          </select>
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Assigned Entities</label>
        <select className="form__select" multiple style={{ minHeight: '96px' }}>
          <option>Kendriya Vidyalaya, Vashi</option>
          <option>Delhi Public School, Pune</option>
          <option>All approved entities</option>
        </select>
      </div>

      <div className="form__group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" defaultChecked /> Auto-assign to newly approved candidates of mapped entities
        </label>
      </div>
    </div>
  );
}
