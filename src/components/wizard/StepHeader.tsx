import type { LucideIcon } from 'lucide-react';

export default function StepHeader({
  icon: Icon,
  color = '#3B82F6',
  bg = '#EFF6FF',
  title,
  desc,
}: {
  icon?: LucideIcon;
  color?: string;
  bg?: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="wizard__step-header">
      <div className="wizard__step-icon-large" style={{ background: bg, color }}>
        {Icon ? <Icon size={32} aria-hidden="true" /> : null}
      </div>
      <div>
        <h2 className="wizard__step-title">{title}</h2>
        <p className="wizard__step-desc">{desc}</p>
      </div>
    </div>
  );
}
