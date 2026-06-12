import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import PublicPage from '@/components/common/PublicPage';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about NCFE financial literacy assessments — eligibility, fees, ' +
    'certificates, available languages, and entity enrolment.',
  path: '/faqs',
});

const faqs = [
  {
    q: 'What is NCFE?',
    a: 'The National Centre for Financial Education (NCFE) is a Section 8 Not-for-Profit company promoting financial literacy across India under the aegis of financial sector regulators.',
  },
  {
    q: 'Who can take NCFE assessments?',
    a: 'Anyone can! We have assessments for school students (NFLAT), college students and professionals (FLQ), and custom assessments for organisations.',
  },
  {
    q: 'Are the assessments free?',
    a: 'Many of our assessments are free to take. Some specialised or certified assessments may have a nominal fee.',
  },
  {
    q: 'How do I get my certificate?',
    a: 'After successfully completing an assessment, your certificate is generated automatically and can be downloaded from your candidate dashboard.',
  },
  {
    q: 'What languages are assessments available in?',
    a: 'NCFE assessments are available in 15+ languages including Hindi, English, and major regional languages.',
  },
  {
    q: 'Can organisations enrol multiple candidates?',
    a: 'Yes. Entities can register and enrol candidates in bulk, schedule exams, and track performance from their dashboard.',
  },
] as const;

export default function FAQsPage() {
  return (
    <PublicPage
      eyebrow="FAQs"
      title="Frequently Asked Questions"
      lead="Find answers to common questions about NCFE assessments and the registration process."
    >
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="faq-list">
        {faqs.map((faq) => (
          <details className="faq-item" key={faq.q}>
            <summary className="faq-item__question">
              {faq.q}
              <ChevronDown className="faq-item__icon" size={20} aria-hidden="true" />
            </summary>
            <div className="faq-item__answer">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </PublicPage>
  );
}
