'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Building2,
  FileCheck2,
  ClipboardList,
  Monitor,
  Globe,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import WizardShell from './WizardShell';
import { TextField, SelectField, CheckboxField, FileField } from './fields';
import { submitEntityRegistration } from '@/lib/registration/actions';
import type {
  EntityForm,
  EntitySubmission,
  EntityType,
  FieldErrors,
  PowerBackup,
  YesNo,
} from '@/lib/registration/types';
import {
  ENTITY_TYPES,
  POWER_BACKUPS,
  DOC_TYPES,
  MB,
  validateFile,
  validateEntityLegal,
  validateEntityContact,
  validateEntityInfrastructure,
  validateEntityModes,
  validateEntityDocuments,
} from '@/lib/registration/validation';

type StepKey =
  | 'start'
  | 'legal'
  | 'contact'
  | 'infrastructure'
  | 'modes'
  | 'documents'
  | 'review'
  | 'submitted';

const STEPS: StepKey[] = [
  'start',
  'legal',
  'contact',
  'infrastructure',
  'modes',
  'documents',
  'review',
  'submitted',
];

const STEP_LABEL: Record<StepKey, string> = {
  start: 'Start',
  legal: 'Legal',
  contact: 'Contact',
  infrastructure: 'Infrastructure',
  modes: 'Exam Modes',
  documents: 'Documents',
  review: 'Review',
  submitted: 'Done',
};

const FIELD_STEP: Partial<Record<keyof EntityForm, StepKey>> = {
  orgName: 'legal',
  entityType: 'legal',
  affiliation: 'legal',
  pan: 'legal',
  gstin: 'legal',
  registrationNumber: 'legal',
  nodalName: 'contact',
  officialEmail: 'contact',
  contactNumber: 'contact',
  centerContact: 'contact',
  officeAddress: 'contact',
  pincode: 'contact',
  numLabs: 'infrastructure',
  numComputers: 'infrastructure',
  bandwidth: 'infrastructure',
  powerBackup: 'infrastructure',
  techSupport: 'infrastructure',
  modeInCenter: 'modes',
  modeRemote: 'modes',
  registrationCert: 'documents',
  authorizationLetter: 'documents',
  signatoryId: 'documents',
  declarationAccepted: 'documents',
};

const STEP_VALIDATORS: Partial<Record<StepKey, (f: EntityForm) => FieldErrors<EntityForm>>> = {
  legal: validateEntityLegal,
  contact: validateEntityContact,
  infrastructure: validateEntityInfrastructure,
  modes: validateEntityModes,
  documents: validateEntityDocuments,
};

const INITIAL_FORM: EntityForm = {
  orgName: '',
  entityType: 'school',
  affiliation: '',
  pan: '',
  gstin: '',
  registrationNumber: '',
  nodalName: '',
  officialEmail: '',
  contactNumber: '',
  centerContact: '',
  officeAddress: '',
  centerAddress: '',
  pincode: '',
  cityState: '',
  numLabs: '',
  numComputers: '',
  bandwidth: '',
  powerBackup: 'ups-generator',
  techSupport: 'yes',
  geoCoordinates: '',
  modeInCenter: true,
  modeRemote: false,
  registrationCert: null,
  authorizationLetter: null,
  signatoryId: null,
  declarationAccepted: false,
};

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
] as const;

type FileKey = 'registrationCert' | 'authorizationLetter' | 'signatoryId';

export default function EntityRegistrationWizard() {
  const [form, setForm] = useState<EntityForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors<EntityForm>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const currentKey: StepKey = STEPS[stepIndex] ?? 'start';

  function update<K extends keyof EntityForm>(key: K, value: EntityForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function selectFile(key: FileKey, file: File | null) {
    if (!file) {
      update(key, null);
      return;
    }
    const error = validateFile(file, DOC_TYPES, 5 * MB);
    if (error) {
      setErrors((prev) => ({ ...prev, [key]: error }));
      return;
    }
    update(key, file);
  }

  function toSubmission(): EntitySubmission {
    const { registrationCert, authorizationLetter, signatoryId, ...rest } = form;
    return {
      ...rest,
      registrationCertName: registrationCert?.name ?? '',
      authorizationLetterName: authorizationLetter?.name ?? '',
      signatoryIdName: signatoryId?.name ?? '',
    };
  }

  function goBack() {
    setFormError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function submit() {
    startTransition(async () => {
      const result = await submitEntityRegistration(toSubmission());
      if (result.status === 'success') {
        setReferenceId(result.referenceId);
        setErrors({});
        setFormError(null);
        setStepIndex(STEPS.indexOf('submitted'));
        return;
      }
      if (result.status === 'error') {
        setErrors(result.fieldErrors as FieldErrors<EntityForm>);
        setFormError(result.formError);
        const firstField = Object.keys(result.fieldErrors)[0] as keyof EntityForm | undefined;
        const target = firstField ? FIELD_STEP[firstField] : undefined;
        if (target) setStepIndex(STEPS.indexOf(target));
      }
    });
  }

  function goNext() {
    const validate = STEP_VALIDATORS[currentKey];
    if (validate) {
      const stepErrors = validate(form);
      if (Object.keys(stepErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...stepErrors }));
        return;
      }
    }
    if (currentKey === 'review') {
      submit();
      return;
    }
    setFormError(null);
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  }

  const labels = STEPS.map((s) => STEP_LABEL[s]);
  const nextLabel = currentKey === 'review' ? 'Submit Application' : 'Save & Continue';

  return (
    <WizardShell
      title="Entity Registration"
      steps={labels}
      current={stepIndex}
      formError={formError}
      showFooter={currentKey !== 'submitted'}
      backDisabled={stepIndex === 0 || pending}
      nextLabel={pending ? 'Submitting…' : currentKey === 'start' ? 'Begin Registration' : nextLabel}
      nextDisabled={pending}
      onBack={goBack}
      onNext={goNext}
    >
      {currentKey === 'start' && (
        <>
          <h2 className="wzd__section-title">Register Your Organization with NCFE</h2>
          <p className="wzd__lede">
            Schools, colleges, corporates and government bodies can register to enroll and assess
            candidates. Please keep the following ready before you begin.
          </p>
          <ul className="wzd__info-list">
            <InfoItem
              icon={<Building2 size={22} aria-hidden="true" />}
              title="Eligibility"
              desc="A registered educational institution, employer or government body with valid registration."
            />
            <InfoItem
              icon={<FileCheck2 size={22} aria-hidden="true" />}
              title="Documents"
              desc="Registration/affiliation certificate, PAN/GSTIN and an authorization letter for the nodal officer."
            />
            <InfoItem
              icon={<ClipboardList size={22} aria-hidden="true" />}
              title="Process"
              desc="Submit your application, then NCFE will verify your details and approve your account."
            />
          </ul>
        </>
      )}

      {currentKey === 'legal' && (
        <>
          <h2 className="wzd__section-title">Organization Legal Details</h2>
          <div className="wzd__grid wzd__grid--full">
            <TextField
              label="Organization Name"
              value={form.orgName}
              onChange={(v) => update('orgName', v)}
              error={errors.orgName}
              maxLength={160}
              placeholder="Registered Name"
            />
          </div>
          <div className="wzd__grid">
            <SelectField
              label="Entity Type"
              value={form.entityType}
              onChange={(v) => update('entityType', v as EntityType)}
              options={ENTITY_TYPES}
              error={errors.entityType}
            />
            <TextField
              label="Affiliation / Board"
              value={form.affiliation}
              onChange={(v) => update('affiliation', v)}
              error={errors.affiliation}
              maxLength={120}
              placeholder="e.g. CBSE, AICTE"
            />
            <TextField
              label="PAN"
              value={form.pan}
              onChange={(v) => update('pan', v.toUpperCase())}
              error={errors.pan}
              maxLength={10}
              placeholder="ABCDE1234F"
            />
            <TextField
              label="GSTIN"
              optional
              value={form.gstin}
              onChange={(v) => update('gstin', v.toUpperCase())}
              error={errors.gstin}
              maxLength={15}
              placeholder="22ABCDE1234F1Z5"
            />
            <TextField
              label="Registration Number"
              value={form.registrationNumber}
              onChange={(v) => update('registrationNumber', v)}
              error={errors.registrationNumber}
              maxLength={60}
              placeholder="Registration / Affiliation No."
            />
          </div>
        </>
      )}

      {currentKey === 'contact' && (
        <>
          <h2 className="wzd__section-title">Address &amp; Nodal Officer</h2>
          <div className="wzd__grid">
            <TextField
              label="Nodal Officer Name"
              value={form.nodalName}
              onChange={(v) => update('nodalName', v)}
              error={errors.nodalName}
              autoComplete="name"
              maxLength={120}
              placeholder="Primary Contact Person"
            />
            <TextField
              label="Official Email"
              type="email"
              inputMode="email"
              value={form.officialEmail}
              onChange={(v) => update('officialEmail', v)}
              error={errors.officialEmail}
              autoComplete="email"
              maxLength={254}
              placeholder="Will be used for login"
            />
            <TextField
              label="Contact Number"
              type="tel"
              inputMode="tel"
              value={form.contactNumber}
              onChange={(v) => update('contactNumber', v)}
              error={errors.contactNumber}
              autoComplete="tel"
              maxLength={15}
              placeholder="10-digit number"
            />
            <TextField
              label="Exam Center Contact"
              optional
              type="tel"
              inputMode="tel"
              value={form.centerContact}
              onChange={(v) => update('centerContact', v)}
              error={errors.centerContact}
              maxLength={15}
              placeholder="Center coordinator number"
            />
          </div>
          <div className="wzd__grid wzd__grid--full">
            <TextField
              label="Registered Office Address"
              value={form.officeAddress}
              onChange={(v) => update('officeAddress', v)}
              error={errors.officeAddress}
              maxLength={200}
              placeholder="Full Address"
            />
            <TextField
              label="Exam Center Address"
              optional
              value={form.centerAddress}
              onChange={(v) => update('centerAddress', v)}
              maxLength={200}
              placeholder="If different from office"
            />
          </div>
          <div className="wzd__grid">
            <TextField
              label="Pincode"
              inputMode="numeric"
              value={form.pincode}
              onChange={(v) => update('pincode', v)}
              error={errors.pincode}
              autoComplete="postal-code"
              maxLength={6}
              placeholder="6-digit pincode"
            />
            <TextField
              label="City / State"
              optional
              value={form.cityState}
              onChange={(v) => update('cityState', v)}
              maxLength={120}
              placeholder="City, State"
            />
          </div>
        </>
      )}

      {currentKey === 'infrastructure' && (
        <>
          <h2 className="wzd__section-title">IT Infrastructure (For Lab Exams)</h2>
          <p className="wzd__lede">
            Required if you plan to conduct examinations at your own computer labs.
          </p>
          <div className="wzd__grid">
            <TextField
              label="Number of Computer Labs"
              type="number"
              inputMode="numeric"
              value={form.numLabs}
              onChange={(v) => update('numLabs', v)}
              error={errors.numLabs}
              placeholder="e.g. 2"
            />
            <TextField
              label="Total Working Computers"
              type="number"
              inputMode="numeric"
              value={form.numComputers}
              onChange={(v) => update('numComputers', v)}
              error={errors.numComputers}
              placeholder="e.g. 60"
            />
            <TextField
              label="Internet Bandwidth (Mbps)"
              type="number"
              inputMode="numeric"
              value={form.bandwidth}
              onChange={(v) => update('bandwidth', v)}
              error={errors.bandwidth}
              placeholder="e.g. 100"
            />
            <SelectField
              label="Power Backup Available?"
              value={form.powerBackup}
              onChange={(v) => update('powerBackup', v as PowerBackup)}
              options={POWER_BACKUPS}
              error={errors.powerBackup}
            />
            <SelectField
              label="On-site Technical Support?"
              value={form.techSupport}
              onChange={(v) => update('techSupport', v as YesNo)}
              options={YES_NO}
              error={errors.techSupport}
            />
            <TextField
              label="Geo-fence / Center Coordinates"
              optional
              value={form.geoCoordinates}
              onChange={(v) => update('geoCoordinates', v)}
              maxLength={60}
              placeholder="Lat, Long"
            />
          </div>
        </>
      )}

      {currentKey === 'modes' && (
        <>
          <h2 className="wzd__section-title">Preferred Examination Modes</h2>
          <p className="wzd__lede">Selected modes are locked for the current exam cycle.</p>
          {errors.modeInCenter && (
            <p className="wzd__error" role="alert">
              {errors.modeInCenter}
            </p>
          )}
          <div className="wzd__choice-grid">
            <ModeCard
              active={form.modeInCenter}
              icon={<Monitor size={24} aria-hidden="true" />}
              title="In-Center Lab Mode"
              desc="Candidates take the exam at your physical computer lab using SEB."
              onToggle={() => update('modeInCenter', !form.modeInCenter)}
            />
            <ModeCard
              active={form.modeRemote}
              icon={<Globe size={24} aria-hidden="true" />}
              title="Remote Proctored Mode"
              desc="Candidates take the exam from their own devices at home."
              onToggle={() => update('modeRemote', !form.modeRemote)}
            />
          </div>
        </>
      )}

      {currentKey === 'documents' && (
        <>
          <h2 className="wzd__section-title">Document Uploads</h2>
          <div className="wzd__grid">
            <FileField
              label="Registration / Affiliation Certificate"
              accept={DOC_TYPES.join(',')}
              hint="PDF or image (max 5MB)"
              fileName={form.registrationCert?.name ?? ''}
              error={errors.registrationCert}
              icon={<FileText size={28} aria-hidden="true" />}
              onSelect={(file) => selectFile('registrationCert', file)}
            />
            <FileField
              label="Authorization Letter for Nodal Officer"
              accept={DOC_TYPES.join(',')}
              hint="PDF or image (max 5MB)"
              fileName={form.authorizationLetter?.name ?? ''}
              error={errors.authorizationLetter}
              icon={<FileText size={28} aria-hidden="true" />}
              onSelect={(file) => selectFile('authorizationLetter', file)}
            />
            <FileField
              label="Signatory ID Proof"
              accept={DOC_TYPES.join(',')}
              hint="PDF or JPG (max 5MB)"
              fileName={form.signatoryId?.name ?? ''}
              error={errors.signatoryId}
              icon={<FileText size={28} aria-hidden="true" />}
              onSelect={(file) => selectFile('signatoryId', file)}
            />
          </div>
          <div className="wzd__consent-list">
            <CheckboxField
              checked={form.declarationAccepted}
              onChange={(c) => update('declarationAccepted', c)}
              error={errors.declarationAccepted}
            >
              I declare that the information and documents provided are authentic and accurate.
            </CheckboxField>
          </div>
        </>
      )}

      {currentKey === 'review' && (
        <>
          <h2 className="wzd__section-title">Review Application</h2>
          <p className="wzd__lede">
            Verify your organization details before submitting to NCFE for verification.
          </p>
          <dl className="wzd__review">
            <Row label="Organization" value={form.orgName} />
            <Row
              label="Entity Type"
              value={`${labelOf(ENTITY_TYPES, form.entityType)} • Affiliation: ${form.affiliation}`}
            />
            <Row label="PAN / GSTIN" value={`${form.pan}${form.gstin ? ` • ${form.gstin}` : ''}`} />
            <Row label="Nodal Officer" value={`${form.nodalName} • ${form.officialEmail}`} />
            <Row
              label="Infrastructure"
              value={`${form.numLabs} Labs • ${form.numComputers} Computers • ${form.bandwidth} Mbps`}
            />
            <Row label="Exam Modes" value={modesSummary(form)} />
            <Row
              label="Documents"
              value={[
                form.registrationCert && 'Certificate',
                form.authorizationLetter && 'Authorization',
                form.signatoryId && 'Signatory ID',
              ]
                .filter(Boolean)
                .join(' • ')}
            />
          </dl>
        </>
      )}

      {currentKey === 'submitted' && (
        <div className="wzd__success">
          <CheckCircle2 className="wzd__success-icon" aria-hidden="true" />
          <h2 className="wzd__success-title">Application Submitted!</h2>
          <p className="wzd__success-desc">
            Your entity registration application has been submitted to NCFE for verification. You
            will receive an email once it is approved.
          </p>
          <div className="wzd__ref">
            <span className="wzd__ref-label">Entity Application Reference</span>
            <span className="wzd__ref-id">{referenceId}</span>
          </div>
          <Link href="/login" className="wzd__btn wzd__btn--next wzd__btn--inline">
            Go to Login
          </Link>
        </div>
      )}
    </WizardShell>
  );
}

function InfoItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="wzd__info-item">
      <span className="wzd__info-icon">{icon}</span>
      <span>
        <span className="wzd__info-title">{title}</span>
        <span className="wzd__info-desc">{desc}</span>
      </span>
    </li>
  );
}

function ModeCard({
  active,
  icon,
  title,
  desc,
  onToggle,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      className={`wzd__choice wzd__choice--mode${active ? ' wzd__choice--active' : ''}`}
      onClick={onToggle}
    >
      <span className="wzd__mode-icon">{icon}</span>
      <span>
        <span className="wzd__choice-title">{title}</span>
        <span className="wzd__choice-desc">{desc}</span>
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="wzd__review-row">
      <dt className="wzd__review-label">{label}</dt>
      <dd className="wzd__review-value">{value || '—'}</dd>
    </div>
  );
}

function labelOf(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function modesSummary(form: EntityForm): string {
  return (
    [form.modeInCenter && 'In-Center Lab', form.modeRemote && 'Remote Proctored']
      .filter(Boolean)
      .join(' • ') || '—'
  );
}
