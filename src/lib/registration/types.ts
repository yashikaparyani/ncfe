/**
 * Shared types for the candidate and entity registration wizards.
 *
 * These describe the *client-side* form state held while a user fills the
 * multi-step wizard, plus the result shape returned by the server actions.
 * The data model intentionally mirrors the demo flow in `frontend/`, but every
 * field is typed (no `any`, per web/CLAUDE.md §9) so it can be validated
 * identically on the client and authoritatively on the server.
 */

/** A map of field name → human-readable error message for one step/form. */
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/* ─────────────────────────── Candidate ─────────────────────────── */

export type RegistrationType = 'direct' | 'entity';
export type Gender = '' | 'male' | 'female' | 'other';
export type Category = 'general' | 'obc' | 'sc-st';
export type Occupation = 'student' | 'employed' | 'self-employed' | 'other';

/**
 * All candidate registration fields. Files are kept as `File | null` in client
 * state only — bytes are never put through the (no-backend) demo server action;
 * the action receives validated text fields plus document *metadata*.
 */
export interface CandidateForm {
  regType: RegistrationType;

  // Basic details
  fullName: string;
  dob: string; // yyyy-mm-dd
  mobile: string;
  email: string;
  gender: Gender;
  language: string;

  // Address
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  city: string;
  state: string;

  // Profile
  occupation: Occupation;
  category: Category;
  subCategory: string;
  institution: string;

  // Documents (client-only File handles; metadata is what gets submitted)
  photograph: File | null;
  idProof: File | null;

  // Entity association (required only when regType === 'entity')
  entityCode: string;

  // Consent
  declarationAccepted: boolean;
  dataConsentAccepted: boolean;
  commsOptIn: boolean;

  // OTP verification
  otp: string;
}

/** Serialisable payload sent to the candidate submit action (no File bytes). */
export interface CandidateSubmission
  extends Omit<CandidateForm, 'photograph' | 'idProof'> {
  photographName: string;
  idProofName: string;
}

/* ──────────────────────────── Entity ───────────────────────────── */

export type EntityType = 'school' | 'college' | 'corporate' | 'government';
export type YesNo = 'yes' | 'no';
export type PowerBackup = 'ups-generator' | 'ups-only' | 'none';

export interface EntityForm {
  // Legal
  orgName: string;
  entityType: EntityType;
  affiliation: string;
  pan: string;
  gstin: string;
  registrationNumber: string;

  // Contact & address
  nodalName: string;
  officialEmail: string;
  contactNumber: string;
  centerContact: string;
  officeAddress: string;
  centerAddress: string;
  pincode: string;
  cityState: string;

  // Infrastructure
  numLabs: string;
  numComputers: string;
  bandwidth: string;
  powerBackup: PowerBackup;
  techSupport: YesNo;
  geoCoordinates: string;

  // Exam modes
  modeInCenter: boolean;
  modeRemote: boolean;

  // Documents
  registrationCert: File | null;
  authorizationLetter: File | null;
  signatoryId: File | null;
  declarationAccepted: boolean;
}

export interface EntitySubmission
  extends Omit<
    EntityForm,
    'registrationCert' | 'authorizationLetter' | 'signatoryId'
  > {
  registrationCertName: string;
  authorizationLetterName: string;
  signatoryIdName: string;
}

/* ──────────────────────────── Results ──────────────────────────── */

/**
 * Discriminated union returned by both submit actions. On success the caller
 * shows the reference id; on failure it surfaces the (server-authoritative)
 * field errors and `formError` summary.
 */
export type SubmitResult =
  | { status: 'success'; referenceId: string }
  | { status: 'error'; formError: string; fieldErrors: Record<string, string> }
  | { status: 'idle' };
