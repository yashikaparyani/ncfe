/**
 * Client-safe demo hints for the login page.
 *
 * These values are intentionally public — the login screen displays them so
 * evaluators can sign in to the scaffold. No real secrets live here; the
 * actual credential check runs server-side in `actions.ts`.
 */
import type { Role } from './config';

/** Role tabs shown on the login form. Tabs prefill a matching demo email. */
export const LOGIN_ROLE_TABS: ReadonlyArray<{ key: Role; label: string; email: string }> = [
  { key: 'candidate', label: 'Candidate', email: 'candidate@ncfe.com' },
  { key: 'entity', label: 'Entity', email: 'entity@ncfe.com' },
  { key: 'admin', label: 'NCFE Staff', email: 'admin@ncfe.com' },
];

/** Every demo account email, listed under the form. */
export const DEMO_EMAILS: readonly string[] = [
  'candidate@ncfe.com',
  'entity@ncfe.com',
  'admin@ncfe.com',
  'invigilator@ncfe.com',
  'proctor@ncfe.com',
];

/** Shared demo password, shown as a hint (not a real secret). */
export const DEMO_PASSWORD = 'Test@123';
