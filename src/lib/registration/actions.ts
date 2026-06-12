'use server';

/**
 * Registration submit Server Actions.
 *
 * Server Actions are CSRF-safe by default (Next enforces POST + Origin/Host
 * validation), which is why submission goes through here rather than a custom
 * API route — see web/CLAUDE.md §2.4. The client wizard validates each step for
 * UX, but THIS is the authoritative gate: every field is re-validated and
 * sanitised server-side because all client input is untrusted (§2.3).
 *
 * NOTE: there is no backend/database wired yet, so a successful submission only
 * sanitises, validates, and mints a reference id. When the identity/registration
 * service lands, persist the sanitised payload here (and add rate-limiting +
 * CAPTCHA + audit logging per §2.4/§2.5). No PII is logged (§2.5).
 */
import type {
  CandidateSubmission,
  EntitySubmission,
  SubmitResult,
} from './types';
import {
  clean,
  normaliseMobile,
  validateCandidateSubmission,
  validateEntitySubmission,
} from './validation';

/** Mint a human-readable, unguessable reference id, e.g. CND-2026-AB12CD. */
function referenceId(prefix: string): string {
  const year = new Date().getFullYear();
  const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `${prefix}-${year}-${suffix}`;
}

/** Trim/normalise a candidate payload before it is validated and stored. */
function sanitiseCandidate(input: CandidateSubmission): CandidateSubmission {
  return {
    ...input,
    fullName: clean(input.fullName),
    email: clean(input.email).toLowerCase(),
    mobile: normaliseMobile(input.mobile),
    addressLine1: clean(input.addressLine1),
    addressLine2: clean(input.addressLine2),
    pincode: input.pincode.trim(),
    city: clean(input.city),
    subCategory: clean(input.subCategory),
    institution: clean(input.institution),
    entityCode: clean(input.entityCode),
    otp: input.otp.trim(),
  };
}

/** Trim/normalise an entity payload before it is validated and stored. */
function sanitiseEntity(input: EntitySubmission): EntitySubmission {
  return {
    ...input,
    orgName: clean(input.orgName),
    affiliation: clean(input.affiliation),
    pan: input.pan.trim().toUpperCase(),
    gstin: input.gstin.trim().toUpperCase(),
    registrationNumber: clean(input.registrationNumber),
    nodalName: clean(input.nodalName),
    officialEmail: clean(input.officialEmail).toLowerCase(),
    contactNumber: normaliseMobile(input.contactNumber),
    centerContact: input.centerContact.trim() ? normaliseMobile(input.centerContact) : '',
    officeAddress: clean(input.officeAddress),
    centerAddress: clean(input.centerAddress),
    pincode: input.pincode.trim(),
    cityState: clean(input.cityState),
    geoCoordinates: clean(input.geoCoordinates),
  };
}

export async function submitCandidateRegistration(
  input: CandidateSubmission,
): Promise<SubmitResult> {
  const data = sanitiseCandidate(input);
  const fieldErrors = validateCandidateSubmission(data);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      formError: 'Some details need attention. Please review the highlighted fields.',
      fieldErrors,
    };
  }

  // TODO(backend): persist `data`, enqueue OTP verification, write audit log.
  return { status: 'success', referenceId: referenceId('CND') };
}

export async function submitEntityRegistration(
  input: EntitySubmission,
): Promise<SubmitResult> {
  const data = sanitiseEntity(input);
  const fieldErrors = validateEntitySubmission(data);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      formError: 'Some details need attention. Please review the highlighted fields.',
      fieldErrors,
    };
  }

  // TODO(backend): persist `data`, route to NCFE verification queue, audit log.
  return { status: 'success', referenceId: referenceId('ENT') };
}
