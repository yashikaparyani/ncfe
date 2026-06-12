'use server';

/**
 * Authentication Server Actions.
 *
 * Server Actions are CSRF-safe by default (Next validates the Origin/Host and
 * only accepts POST), which is why login/logout are implemented here rather
 * than as custom API routes. Credentials are checked server-side; on success a
 * signed session token is written to an HttpOnly + Secure + SameSite cookie.
 *
 * NOTE: these are hard-coded demo accounts for the scaffold — there is no real
 * backend yet. When the identity provider is wired in, replace
 * `findAccount`/the cookie issuance with the real flow (and add lockout,
 * throttling, MFA and audit logging per web/CLAUDE.md §2.5).
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DASHBOARD_BY_ROLE, SESSION_COOKIE, type Session } from './config';
import { createSessionToken } from './session';

interface DemoAccount extends Session {
  readonly password: string;
}

// Demo only — all accounts share the password "Test@123".
const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  { email: 'candidate@ncfe.com', password: 'Test@123', role: 'candidate', name: 'Demo Candidate' },
  { email: 'entity@ncfe.com', password: 'Test@123', role: 'entity', name: 'Entity Manager' },
  { email: 'admin@ncfe.com', password: 'Test@123', role: 'admin', name: 'NCFE Admin' },
  { email: 'invigilator@ncfe.com', password: 'Test@123', role: 'invigilator', name: 'Demo Invigilator' },
  { email: 'proctor@ncfe.com', password: 'Test@123', role: 'proctor', name: 'NCFE Proctor' },
];

function findAccount(email: string, password: string): DemoAccount | undefined {
  const normalized = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((a) => a.email === normalized && a.password === password);
}

export interface LoginState {
  error: string | null;
}

/**
 * Validate credentials and start a session. Designed for `useActionState`:
 * returns `{ error }` on failure; on success it sets the cookie and redirects
 * to the role's dashboard (redirect throws, so nothing returns on success).
 */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const account = findAccount(email, password);
  if (!account) {
    // Generic message — never reveal whether the account exists (CLAUDE.md §2.5).
    return { error: 'Invalid email or password. Use one of the demo accounts below.' };
  }

  const session: Session = { email: account.email, role: account.role, name: account.name };
  const token = await createSessionToken(session);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect(DASHBOARD_BY_ROLE[account.role]);
}

/** Clear the session cookie and return to the login page. */
export async function logoutAction(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
