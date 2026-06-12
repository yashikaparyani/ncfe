/**
 * Pure validation + sanitisation for the registration wizards.
 *
 * This module has NO runtime dependencies on the browser, Node, or `next/*`, so
 * the *identical* rules run twice: client-side to gate each wizard step and give
 * inline feedback, and server-side (in `actions.ts`) as the authoritative check.
 * Per web/CLAUDE.md §2.3 all user input is untrusted — the server re-runs these
 * regardless of what the client allowed.
 */
import type {
  CandidateForm,
  CandidateSubmission,
  EntityForm,
  EntitySubmission,
  FieldErrors,
} from './types';

/* ───────────────────────── primitives ───────────────────────── */

// Anchored, bounded patterns (India-specific where relevant).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/; // 10-digit Indian mobile
const PINCODE_RE = /^[1-9]\d{5}$/;
const PAN_RE = /^[A-Z]{5}\d{4}[A-Z]$/;
const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
const OTP_RE = /^\d{6}$/;
const NAME_RE = /^[\p{L}][\p{L}\s.'-]{1,119}$/u;

/** Trim and collapse internal whitespace; the canonical text sanitiser. */
export function clean(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Strip a leading +91 / 0 and any spaces or dashes from a phone number. */
export function normaliseMobile(value: string): string {
  return value.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
}

/** Age in whole years for a yyyy-mm-dd date, or null if unparseable. */
function ageInYears(iso: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match;
  const dob = new Date(Number(y), Number(m) - 1, Number(d));
  if (
    dob.getFullYear() !== Number(y) ||
    dob.getMonth() !== Number(m) - 1 ||
    dob.getDate() !== Number(d)
  ) {
    return null; // e.g. 2023-02-31
  }
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

/* ───────────────────── select option catalogues ───────────────────── */
// Single source of truth for the UI <select>s and the server allow-lists.

export const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Tamil'] as const;
export const STATES = ['Maharashtra', 'Delhi', 'Karnataka'] as const;

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
] as const;

export const OCCUPATIONS = [
  { value: 'student', label: 'Student' },
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'other', label: 'Other' },
] as const;

export const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc-st', label: 'SC/ST' },
] as const;

export const ENTITY_TYPES = [
  { value: 'school', label: 'School (CBSE/ICSE/State)' },
  { value: 'college', label: 'College / University' },
  { value: 'corporate', label: 'Corporate Employer' },
  { value: 'government', label: 'Government Body' },
] as const;

export const POWER_BACKUPS = [
  { value: 'ups-generator', label: 'Yes (UPS + Generator)' },
  { value: 'ups-only', label: 'Yes (UPS Only)' },
  { value: 'none', label: 'No' },
] as const;

function isOneOf(value: string, options: readonly string[]): boolean {
  return options.includes(value);
}

/* ───────────────── candidate: per-step validators ───────────────── */

export function validateCandidateBasic(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (!NAME_RE.test(clean(f.fullName))) e.fullName = 'Enter your full name as per official ID.';
  const age = ageInYears(f.dob);
  if (age === null) e.dob = 'Enter a valid date of birth.';
  else if (age < 5) e.dob = 'Candidate must be at least 5 years old.';
  else if (age > 120) e.dob = 'Enter a valid date of birth.';
  if (!MOBILE_RE.test(normaliseMobile(f.mobile))) e.mobile = 'Enter a valid 10-digit mobile number.';
  if (!EMAIL_RE.test(clean(f.email))) e.email = 'Enter a valid email address.';
  if (!isOneOf(f.gender, ['male', 'female', 'other'])) e.gender = 'Select a gender.';
  if (!isOneOf(f.language, LANGUAGES)) e.language = 'Select a preferred language.';
  return e;
}

export function validateCandidateAddress(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (clean(f.addressLine1).length < 3) e.addressLine1 = 'Enter your address.';
  if (!PINCODE_RE.test(f.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode.';
  if (clean(f.city).length < 2) e.city = 'Enter your city.';
  if (!isOneOf(f.state, STATES)) e.state = 'Select your state.';
  return e;
}

export function validateCandidateProfile(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (!isOneOf(f.occupation, ['student', 'employed', 'self-employed', 'other'])) {
    e.occupation = 'Select your occupation status.';
  }
  if (!isOneOf(f.category, ['general', 'obc', 'sc-st'])) e.category = 'Select a category.';
  return e;
}

export function validateCandidateDocuments(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (!f.photograph) e.photograph = 'A photograph is required.';
  return e;
}

export function validateCandidateEntity(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (f.regType === 'entity' && clean(f.entityCode).length < 3) {
    e.entityCode = 'Search and select your associated entity.';
  }
  return e;
}

export function validateCandidateConsent(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (!f.declarationAccepted) e.declarationAccepted = 'You must confirm the declaration.';
  if (!f.dataConsentAccepted) e.dataConsentAccepted = 'Data-processing consent is required.';
  return e;
}

export function validateCandidateOtp(f: CandidateForm): FieldErrors<CandidateForm> {
  const e: FieldErrors<CandidateForm> = {};
  if (!OTP_RE.test(f.otp.trim())) e.otp = 'Enter the 6-digit OTP.';
  return e;
}

/** Full candidate validation (server-authoritative). Empty map ⇒ valid. */
export function validateCandidateSubmission(
  s: CandidateSubmission,
): Record<string, string> {
  const form: CandidateForm = { ...s, photograph: null, idProof: null };
  const merged: FieldErrors<CandidateForm> = {
    ...validateCandidateBasic(form),
    ...validateCandidateAddress(form),
    ...validateCandidateProfile(form),
    ...validateCandidateEntity(form),
    ...validateCandidateConsent(form),
    ...validateCandidateOtp(form),
  };
  if (!isOneOf(s.regType, ['direct', 'entity'])) merged.regType = 'Choose a registration type.';
  if (!s.photographName) merged.photograph = 'A photograph is required.';
  return merged as Record<string, string>;
}

/* ─────────────────── entity: per-step validators ─────────────────── */

export function validateEntityLegal(f: EntityForm): FieldErrors<EntityForm> {
  const e: FieldErrors<EntityForm> = {};
  if (clean(f.orgName).length < 3) e.orgName = 'Enter the registered organization name.';
  if (!isOneOf(f.entityType, ['school', 'college', 'corporate', 'government'])) {
    e.entityType = 'Select an entity type.';
  }
  if (clean(f.affiliation).length < 2) e.affiliation = 'Enter the affiliation or board.';
  if (!PAN_RE.test(f.pan.trim().toUpperCase())) e.pan = 'Enter a valid PAN (e.g. ABCDE1234F).';
  if (f.gstin.trim() && !GSTIN_RE.test(f.gstin.trim().toUpperCase())) {
    e.gstin = 'Enter a valid 15-character GSTIN or leave blank.';
  }
  if (clean(f.registrationNumber).length < 2) {
    e.registrationNumber = 'Enter the registration / affiliation number.';
  }
  return e;
}

export function validateEntityContact(f: EntityForm): FieldErrors<EntityForm> {
  const e: FieldErrors<EntityForm> = {};
  if (!NAME_RE.test(clean(f.nodalName))) e.nodalName = 'Enter the nodal officer name.';
  if (!EMAIL_RE.test(clean(f.officialEmail))) e.officialEmail = 'Enter a valid official email.';
  if (!MOBILE_RE.test(normaliseMobile(f.contactNumber))) {
    e.contactNumber = 'Enter a valid 10-digit contact number.';
  }
  if (f.centerContact.trim() && !MOBILE_RE.test(normaliseMobile(f.centerContact))) {
    e.centerContact = 'Enter a valid 10-digit number or leave blank.';
  }
  if (clean(f.officeAddress).length < 5) e.officeAddress = 'Enter the registered office address.';
  if (!PINCODE_RE.test(f.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode.';
  return e;
}

export function validateEntityInfrastructure(f: EntityForm): FieldErrors<EntityForm> {
  const e: FieldErrors<EntityForm> = {};
  const intIn = (v: string, min: number, max: number): boolean => {
    const n = Number(v);
    return Number.isInteger(n) && n >= min && n <= max;
  };
  if (!intIn(f.numLabs, 0, 1000)) e.numLabs = 'Enter the number of labs (0 or more).';
  if (!intIn(f.numComputers, 0, 100000)) e.numComputers = 'Enter the number of computers.';
  if (!intIn(f.bandwidth, 0, 100000)) e.bandwidth = 'Enter the bandwidth in Mbps.';
  if (!isOneOf(f.powerBackup, ['ups-generator', 'ups-only', 'none'])) {
    e.powerBackup = 'Select a power-backup option.';
  }
  if (!isOneOf(f.techSupport, ['yes', 'no'])) e.techSupport = 'Select an option.';
  return e;
}

export function validateEntityModes(f: EntityForm): FieldErrors<EntityForm> {
  const e: FieldErrors<EntityForm> = {};
  if (!f.modeInCenter && !f.modeRemote) {
    e.modeInCenter = 'Select at least one examination mode.';
  }
  return e;
}

export function validateEntityDocuments(f: EntityForm): FieldErrors<EntityForm> {
  const e: FieldErrors<EntityForm> = {};
  if (!f.registrationCert) e.registrationCert = 'Registration / affiliation certificate is required.';
  if (!f.authorizationLetter) e.authorizationLetter = 'Authorization letter is required.';
  if (!f.signatoryId) e.signatoryId = 'Signatory ID proof is required.';
  if (!f.declarationAccepted) e.declarationAccepted = 'You must confirm the declaration.';
  return e;
}

/** Full entity validation (server-authoritative). Empty map ⇒ valid. */
export function validateEntitySubmission(s: EntitySubmission): Record<string, string> {
  const form: EntityForm = {
    ...s,
    registrationCert: null,
    authorizationLetter: null,
    signatoryId: null,
  };
  const merged: FieldErrors<EntityForm> = {
    ...validateEntityLegal(form),
    ...validateEntityContact(form),
    ...validateEntityInfrastructure(form),
    ...validateEntityModes(form),
  };
  if (!s.registrationCertName) merged.registrationCert = 'Registration certificate is required.';
  if (!s.authorizationLetterName) merged.authorizationLetter = 'Authorization letter is required.';
  if (!s.signatoryIdName) merged.signatoryId = 'Signatory ID proof is required.';
  if (!s.declarationAccepted) merged.declarationAccepted = 'You must confirm the declaration.';
  return merged as Record<string, string>;
}

/* ───────────────────── client-side file checks ───────────────────── */

export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'] as const;
export const DOC_TYPES = ['application/pdf', 'image/jpeg', 'image/png'] as const;

/** Validate a chosen file's MIME type and size; returns an error or null. */
export function validateFile(
  file: File,
  accept: readonly string[],
  maxBytes: number,
): string | null {
  if (!accept.includes(file.type)) {
    return 'Unsupported file type.';
  }
  if (file.size > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return `File must be ${mb}MB or smaller.`;
  }
  return null;
}

export const MB = 1024 * 1024;
