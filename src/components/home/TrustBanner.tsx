import { ShieldCheck, FlaskConical, Globe, BarChart3 } from 'lucide-react';
import './TrustBanner.css';

const trustItems = [
  {
    id: 'trusted',
    icon: ShieldCheck,
    title: 'Trusted by NCFE',
    description: 'Government of India recognized organization',
  },
  {
    id: 'science',
    icon: FlaskConical,
    title: 'Secure & Fair',
    description: 'AI-powered proctoring & secure assessments',
  },
  {
    id: 'accessible',
    icon: Globe,
    title: 'Accessible',
    description: 'Multiple languages & assessment modes',
  },
  {
    id: 'impact',
    icon: BarChart3,
    title: 'Impact Driven',
    description: 'Building a financially aware and empowered India',
  },
] as const;

export default function TrustBanner() {
  return (
    <section className="trust-banner" id="trust-banner" aria-label="Trust indicators">
      <div className="trust-banner__inner">
        {trustItems.map((item) => (
          <div className="trust-banner__item" key={item.id} id={`trust-${item.id}`}>
            <div className="trust-banner__icon">
              <item.icon aria-hidden="true" />
            </div>
            <div className="trust-banner__text">
              <h2 className="trust-banner__title">{item.title}</h2>
              <p className="trust-banner__desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
