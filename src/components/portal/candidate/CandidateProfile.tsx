import {
  Edit, Building2, MapPin, Phone, Mail, Shield, CheckCircle2, AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import '@/styles/portal/pages.css';

const basicDetails: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'Full Name', value: 'Rohan Sharma' },
  { label: 'Gender', value: 'Male' },
  { label: 'Date of Birth', value: '14 August 2006' },
  { label: 'Age', value: '17 years' },
  { label: 'Category', value: 'Student – School (Class 11–12)' },
  { label: 'Preferred Language', value: 'Hindi' },
];

const contactRows: ReadonlyArray<{
  icon: LucideIcon;
  label: string;
  value: string;
  verified?: boolean;
}> = [
  { icon: Phone, label: 'Mobile', value: '+91 98100 45678', verified: true },
  { icon: Mail, label: 'Email', value: 'rohan.sharma@example.com', verified: true },
  { icon: MapPin, label: 'Address', value: 'B-204, Ashok Vihar, Phase II, Delhi – 110052' },
  { icon: MapPin, label: 'State', value: 'Delhi' },
  { icon: MapPin, label: 'PIN Code', value: '110052' },
];

const documents: ReadonlyArray<{ name: string; status: string }> = [
  { name: 'Photograph', status: 'Uploaded & Verified' },
  { name: 'Aadhaar Card (ID Proof)', status: 'Uploaded & Verified' },
];

export default function CandidateProfile() {
  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">My Profile</h1>
            <p className="pg-head__sub">View your registration details and entity binding status.</p>
          </div>
          <div className="pg-head__actions">
            {/* Editing activates with the candidate profile API (presentational for now). */}
            <button type="button" className="btn btn--secondary" disabled>
              <Edit size={16} aria-hidden="true" /> Edit Profile
            </button>
          </div>
        </div>

        <div className="pg-banner pg-banner--info">
          <Building2 size={18} aria-hidden="true" />
          <div>
            Linked Entity: <strong>Delhi Public School, Dwarka (ENT-1001)</strong> — Approved &amp;
            Active for the Q2 2024 cycle.
            <span style={{ marginLeft: 8, color: 'var(--gray-600)' }}>
              Entity switch is locked after the first attempt.
            </span>
          </div>
        </div>

        <div className="pg-grid-2">
          {/* Photo & basic details */}
          <section className="dash__section" aria-labelledby="profile-basic">
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '4px 24px' }}>
              <span className="pg-avatar pg-avatar--lg pg-avatar--orange" aria-hidden="true">
                RS
              </span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--navy)' }}>
                  Rohan Sharma
                </div>
                <div className="pg-list__id" style={{ margin: '4px 0 8px' }}>
                  CND125678
                </div>
                <span className="pg-chip pg-chip--success">
                  <CheckCircle2 size={13} aria-hidden="true" /> Registration Approved
                </span>
              </div>
            </div>
            <h2 id="profile-basic" className="sr-only">
              Basic details
            </h2>
            <div style={{ padding: '12px 24px 4px' }}>
              {basicDetails.map((f) => (
                <div className="pg-kv" key={f.label}>
                  <span className="pg-kv__label">{f.label}</span>
                  <span className="pg-kv__value">{f.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact, documents, consent */}
          <section className="dash__section" aria-labelledby="profile-contact">
            <div className="dash__section-header">
              <h2 id="profile-contact" className="dash__section-title">
                Contact &amp; Address
              </h2>
            </div>
            <div style={{ padding: '0 24px' }}>
              {contactRows.map((f) => (
                <div className="pg-contact-row" key={f.label}>
                  <f.icon size={15} aria-hidden="true" />
                  <div className="pg-contact-row__body">
                    <div className="pg-contact-row__label">{f.label}</div>
                    <div className="pg-contact-row__value">{f.value}</div>
                  </div>
                  {f.verified && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600 }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              ))}

              <h3 style={{ color: 'var(--navy)', fontSize: '0.9375rem', margin: '20px 0 10px' }}>
                Identity Documents
              </h3>
              {documents.map((doc) => (
                <div className="pg-kv" key={doc.name}>
                  <span
                    className="pg-kv__label"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--navy)' }}
                  >
                    <Shield size={14} aria-hidden="true" /> {doc.name}
                  </span>
                  <span className="pg-chip pg-chip--success">{doc.status}</span>
                </div>
              ))}

              <div className="pg-banner pg-banner--success" style={{ marginTop: 16 }}>
                <CheckCircle2 size={14} aria-hidden="true" />
                <div>
                  <div>
                    <strong>Data Consent Given</strong> on 10 Apr 2024
                  </div>
                  <div>
                    <strong>Communication Consent</strong> — SMS &amp; Email enabled
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Entity switch (locked) */}
        <section className="dash__section" style={{ marginTop: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              padding: '20px 24px',
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <AlertCircle size={16} aria-hidden="true" /> Entity Switch Request
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                Entity switching is <strong>locked</strong> because you have already attempted an exam
                in the current cycle (Q2 2024). You may request a switch before your first attempt in
                the next cycle.
              </div>
            </div>
            <button type="button" className="btn btn--secondary" disabled>
              Switch Entity (Locked)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
