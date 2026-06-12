'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { Building, ScanFace, FileText, CheckCircle2 } from 'lucide-react';
import WizardShell from './WizardShell';
import { TextField, SelectField, CheckboxField, FileField } from './fields';
import { submitCandidateRegistration } from '@/lib/registration/actions';
import type {
  CandidateForm,
  CandidateSubmission,
  FieldErrors,
  Gender,
  Category,
  Occupation,
  RegistrationType,
} from '@/lib/registration/types';
import {
  GENDERS,
  CATEGORIES,
  OCCUPATIONS,
  LANGUAGES,
  STATES,
  IMAGE_TYPES,
  DOC_TYPES,
  MB,
  validateFile,
  validateCandidateBasic,
  validateCandidateAddress,
  validateCandidateProfile,
  validateCandidateDocuments,
  validateCandidateEntity,
  validateCandidateConsent,
  validateCandidateOtp,
} from '@/lib/registration/validation';

type StepKey =
  | 'type'
  | 'basic'
  | 'address'
  | 'profile'
  | 'documents'
  | 'entity'
  | 'consent'
  | 'otp'
  | 'review'
  | 'success';

const STEP_LABEL: Record<StepKey, string> = {
  type: 'Type',
  basic: 'Basic',
  address: 'Address',
  profile: 'Profile',
  documents: 'Documents',
  entity: 'Entity',
  consent: 'Consent',
  otp: 'Verify',
  review: 'Review',
  success: 'Done',
};

// Maps a field name to the step that owns it — used to jump back to the first
// step with a server-reported error after submission.
const FIELD_STEP: Partial<Record<keyof CandidateForm, StepKey>> = {
  fullName: 'basic',
  dob: 'basic',
  mobile: 'basic',
  email: 'basic',
  gender: 'basic',
  language: 'basic',
  addressLine1: 'address',
  pincode: 'address',
  city: 'address',
  state: 'address',
  occupation: 'profile',
  category: 'profile',
  photograph: 'documents',
  entityCode: 'entity',
  declarationAccepted: 'consent',
  dataConsentAccepted: 'consent',
  otp: 'otp',
};

const INITIAL_FORM: CandidateForm = {
  regType: 'direct',
  fullName: '',
  dob: '',
  mobile: '',
  email: '',
  gender: '',
  language: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  city: '',
  state: '',
  occupation: 'student',
  category: 'general',
  subCategory: '',
  institution: '',
  photograph: null,
  idProof: null,
  entityCode: '',
  declarationAccepted: false,
  dataConsentAccepted: false,
  commsOptIn: true,
  otp: '',
};

const STEP_VALIDATORS: Partial<Record<StepKey, (f: CandidateForm) => FieldErrors<CandidateForm>>> = {
  basic: validateCandidateBasic,
  address: validateCandidateAddress,
  profile: validateCandidateProfile,
  documents: validateCandidateDocuments,
  entity: validateCandidateEntity,
  consent: validateCandidateConsent,
  otp: validateCandidateOtp,
};

function languageOptions() {
  return LANGUAGES.map((l) => ({ value: l, label: l }));
}
function stateOptions() {
  return STATES.map((s) => ({ value: s, label: s }));
}

export default function CandidateRegistrationWizard() {
  const [form, setForm] = useState<CandidateForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors<CandidateForm>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [pending, startTransition] = useTransition();

  // The entity-association step only applies to entity-linked registration, and
  // is placed FIRST (right after the type choice) so the candidate's entity is
  // confirmed before they fill in any personal details (NCFE Admin review).
  const steps = useMemo<StepKey[]>(() => {
    const base: StepKey[] = [
      'type',
      'entity',
      'basic',
      'address',
      'profile',
      'documents',
      'consent',
      'otp',
      'review',
      'success',
    ];
    return form.regType === 'entity' ? base : base.filter((s) => s !== 'entity');
  }, [form.regType]);

  const currentKey: StepKey = steps[stepIndex] ?? 'type';

  function update<K extends keyof CandidateForm>(key: K, value: CandidateForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function selectFile(key: 'photograph' | 'idProof', file: File | null, isImage: boolean) {
    if (!file) {
      update(key, null);
      return;
    }
    const error = validateFile(file, isImage ? IMAGE_TYPES : DOC_TYPES, isImage ? 2 * MB : 5 * MB);
    if (error) {
      setErrors((prev) => ({ ...prev, [key]: error }));
      return;
    }
    update(key, file);
  }

  function toSubmission(): CandidateSubmission {
    const { photograph, idProof, ...rest } = form;
    return {
      ...rest,
      photographName: photograph?.name ?? '',
      idProofName: idProof?.name ?? '',
    };
  }

  function goBack() {
    setFormError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function submit() {
    startTransition(async () => {
      const result = await submitCandidateRegistration(toSubmission());
      if (result.status === 'success') {
        setReferenceId(result.referenceId);
        setErrors({});
        setFormError(null);
        setStepIndex(steps.indexOf('success'));
        return;
      }
      if (result.status === 'error') {
        setErrors(result.fieldErrors as FieldErrors<CandidateForm>);
        setFormError(result.formError);
        const firstField = Object.keys(result.fieldErrors)[0] as keyof CandidateForm | undefined;
        const target = firstField ? FIELD_STEP[firstField] : undefined;
        if (target) setStepIndex(steps.indexOf(target));
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
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  }

  const labels = steps.map((s) => STEP_LABEL[s]);
  const nextLabel = currentKey === 'review' ? 'Submit Registration' : 'Save & Continue';

  return (
    <WizardShell
      title="Candidate Registration"
      steps={labels}
      current={stepIndex}
      formError={formError}
      showFooter={currentKey !== 'success'}
      backDisabled={stepIndex === 0 || pending}
      nextLabel={pending ? 'Submitting…' : nextLabel}
      nextDisabled={pending}
      onBack={goBack}
      onNext={goNext}
    >
      {currentKey === 'type' && (
        <>
          <h2 className="wzd__section-title">How would you like to register?</h2>
          <div className="wzd__choice-grid" role="radiogroup" aria-label="Registration type">
            {(
              [
                {
                  value: 'direct',
                  title: 'Direct Registration',
                  desc: 'Register independently as an individual candidate.',
                },
                {
                  value: 'entity',
                  title: 'Entity Associated Registration',
                  desc: 'Register through your school, college, or employer.',
                },
              ] as ReadonlyArray<{ value: RegistrationType; title: string; desc: string }>
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={form.regType === opt.value}
                className={`wzd__choice${form.regType === opt.value ? ' wzd__choice--active' : ''}`}
                onClick={() => update('regType', opt.value)}
              >
                <span className="wzd__choice-title">{opt.title}</span>
                <span className="wzd__choice-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {currentKey === 'basic' && (
        <>
          <h2 className="wzd__section-title">Basic Information</h2>
          <div className="wzd__grid">
            <TextField
              label="Full Name"
              value={form.fullName}
              onChange={(v) => update('fullName', v)}
              error={errors.fullName}
              autoComplete="name"
              maxLength={120}
              placeholder="As per official ID"
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={form.dob}
              onChange={(v) => update('dob', v)}
              error={errors.dob}
              autoComplete="bday"
            />
            <TextField
              label="Mobile Number"
              type="tel"
              inputMode="tel"
              value={form.mobile}
              onChange={(v) => update('mobile', v)}
              error={errors.mobile}
              autoComplete="tel"
              maxLength={15}
              placeholder="10-digit mobile"
            />
            <TextField
              label="Email Address"
              type="email"
              inputMode="email"
              value={form.email}
              onChange={(v) => update('email', v)}
              error={errors.email}
              autoComplete="email"
              maxLength={254}
              placeholder="For communications"
            />
            <SelectField
              label="Gender"
              value={form.gender}
              onChange={(v) => update('gender', v as Gender)}
              options={GENDERS}
              error={errors.gender}
              placeholder="Select Gender"
            />
            <SelectField
              label="Preferred Language"
              value={form.language}
              onChange={(v) => update('language', v)}
              options={languageOptions()}
              error={errors.language}
              placeholder="Select Language"
            />
          </div>
        </>
      )}

      {currentKey === 'address' && (
        <>
          <h2 className="wzd__section-title">Residential Address</h2>
          <div className="wzd__grid wzd__grid--full">
            <TextField
              label="Address Line 1"
              value={form.addressLine1}
              onChange={(v) => update('addressLine1', v)}
              error={errors.addressLine1}
              autoComplete="address-line1"
              maxLength={160}
              placeholder="House/Flat No., Building Name"
            />
            <TextField
              label="Address Line 2"
              optional
              value={form.addressLine2}
              onChange={(v) => update('addressLine2', v)}
              autoComplete="address-line2"
              maxLength={160}
              placeholder="Street, Area, Landmark"
            />
          </div>
          <div className="wzd__grid wzd__grid--3">
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
              label="City"
              value={form.city}
              onChange={(v) => update('city', v)}
              error={errors.city}
              autoComplete="address-level2"
              maxLength={80}
              placeholder="Enter city"
            />
            <SelectField
              label="State"
              value={form.state}
              onChange={(v) => update('state', v)}
              options={stateOptions()}
              error={errors.state}
              placeholder="Select State"
            />
          </div>
        </>
      )}

      {currentKey === 'profile' && (
        <>
          <h2 className="wzd__section-title">Category &amp; Profile Details</h2>
          <div className="wzd__grid">
            <SelectField
              label="Occupation Status"
              value={form.occupation}
              onChange={(v) => update('occupation', v as Occupation)}
              options={OCCUPATIONS}
              error={errors.occupation}
            />
            <SelectField
              label="Category"
              value={form.category}
              onChange={(v) => update('category', v as Category)}
              options={CATEGORIES}
              error={errors.category}
            />
            <TextField
              label="Sub-Category"
              optional
              value={form.subCategory}
              onChange={(v) => update('subCategory', v)}
              maxLength={80}
              placeholder="e.g. Class / Department"
            />
            <TextField
              label="Institution / Employer Name"
              optional
              value={form.institution}
              onChange={(v) => update('institution', v)}
              maxLength={160}
              placeholder="If applicable"
            />
          </div>
        </>
      )}

      {currentKey === 'documents' && (
        <>
          <h2 className="wzd__section-title">Document Upload</h2>
          <div className="wzd__grid">
            <FileField
              label="Photograph"
              accept={IMAGE_TYPES.join(',')}
              hint="PNG, JPG or SVG (max 2MB)"
              fileName={form.photograph?.name ?? ''}
              error={errors.photograph}
              icon={<ScanFace size={28} aria-hidden="true" />}
              onSelect={(file) => selectFile('photograph', file, true)}
            />
            <FileField
              label="ID Proof"
              optional
              accept={DOC_TYPES.join(',')}
              hint="PDF or JPG (max 5MB)"
              fileName={form.idProof?.name ?? ''}
              error={errors.idProof}
              icon={<FileText size={28} aria-hidden="true" />}
              onSelect={(file) => selectFile('idProof', file, false)}
            />
          </div>
        </>
      )}

      {currentKey === 'entity' && (
        <>
          <h2 className="wzd__section-title">Entity Association</h2>
          <p className="wzd__lede">
            Link your account to your school, college, or organization (mandatory).
          </p>
          <TextField
            label="Entity Code or Name"
            value={form.entityCode}
            onChange={(v) => update('entityCode', v)}
            error={errors.entityCode}
            maxLength={120}
            placeholder="Search entity…"
            icon={<Building size={18} aria-hidden="true" />}
          />
        </>
      )}

      {currentKey === 'consent' && (
        <>
          <h2 className="wzd__section-title">Consent &amp; Declaration</h2>
          <p className="wzd__lede">Please review and accept the following before continuing.</p>
          <div className="wzd__consent-list">
            <CheckboxField
              checked={form.declarationAccepted}
              onChange={(c) => update('declarationAccepted', c)}
              error={errors.declarationAccepted}
            >
              <strong>(Mandatory)</strong> I declare that the information provided is true to the
              best of my knowledge.
            </CheckboxField>
            <CheckboxField
              checked={form.dataConsentAccepted}
              onChange={(c) => update('dataConsentAccepted', c)}
              error={errors.dataConsentAccepted}
            >
              <strong>(Mandatory)</strong> I consent to the processing of my data as per the{' '}
              <Link href="/privacy-policy" className="wzd__inline-link">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="wzd__inline-link">
                Terms of Use
              </Link>
              .
            </CheckboxField>
            <CheckboxField
              checked={form.commsOptIn}
              onChange={(c) => update('commsOptIn', c)}
            >
              <strong>(Optional)</strong> I agree to receive updates and reminders via SMS and
              email.
            </CheckboxField>
          </div>
        </>
      )}

      {currentKey === 'otp' && (
        <>
          <h2 className="wzd__section-title">OTP Verification</h2>
          <p className="wzd__lede">
            Enter the one-time password sent to your registered mobile and email.
          </p>
          <TextField
            label="One-Time Password"
            inputMode="numeric"
            value={form.otp}
            onChange={(v) => update('otp', v)}
            error={errors.otp}
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="6-digit OTP"
          />
          <div className="wzd__otp-row">
            <span>Didn&apos;t receive the code?</span>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setOtpSent(true)}
            >
              {otpSent ? 'OTP Resent' : 'Send / Resend OTP'}
            </button>
          </div>
        </>
      )}

      {currentKey === 'review' && (
        <>
          <h2 className="wzd__section-title">Review Your Details</h2>
          <p className="wzd__lede">
            Please verify all information before final submission. Use Previous to edit any section.
          </p>
          <dl className="wzd__review">
            <Row label="Registration Type" value={form.regType === 'entity' ? 'Entity Associated' : 'Direct'} />
            <Row label="Full Name" value={form.fullName} />
            <Row label="Date of Birth" value={form.dob} />
            <Row label="Mobile / Email" value={`${form.mobile} • ${form.email}`} />
            <Row
              label="Address"
              value={`${form.addressLine1}, ${form.city}, ${form.state} - ${form.pincode}`}
            />
            <Row
              label="Category / Occupation"
              value={`${labelOf(CATEGORIES, form.category)} • ${labelOf(OCCUPATIONS, form.occupation)}`}
            />
            {form.regType === 'entity' && <Row label="Associated Entity" value={form.entityCode} />}
            <Row
              label="Documents"
              value={`${form.photograph ? 'Photograph uploaded' : 'No photograph'}${
                form.idProof ? ' • ID proof uploaded' : ''
              }`}
            />
          </dl>
        </>
      )}

      {currentKey === 'success' && (
        <div className="wzd__success">
          <CheckCircle2 className="wzd__success-icon" aria-hidden="true" />
          <h2 className="wzd__success-title">Registration Submitted!</h2>
          <p className="wzd__success-desc">
            Your registration has been received{form.regType === 'entity' ? ' and sent to your associated entity for approval' : ''}.
            You will be notified about the next steps.
          </p>
          <div className="wzd__ref">
            <span className="wzd__ref-label">Application Reference ID</span>
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
