import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import ContactForm from '@/components/public/ContactForm';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with NCFE. Reach our team by email, phone (toll-free) or post, or send us a ' +
    'message — we are here to help with assessments, registration and support.',
  path: '/contact',
});

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'info@ncfe.org.in' },
  { icon: Phone, label: 'Phone', value: '1800-XXX-XXXX (Toll Free)' },
  { icon: MapPin, label: 'Address', value: 'NCFE, Plot No. 82, Sector 17, Vashi, Navi Mumbai - 400703' },
];

export default function ContactPage() {
  return (
    <PublicPage
      eyebrow="Contact Us"
      title="Get in Touch"
      lead="Have questions? We're here to help. Reach out to us through any of the channels below."
    >
      <div className="contact-layout">
        <div className="contact-info">
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <div className="contact-info__item" key={label}>
              <div className="contact-info__icon">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h2>{label}</h2>
                <p>{value}</p>
              </div>
            </div>
          ))}
        </div>

        <ContactForm />
      </div>
    </PublicPage>
  );
}
