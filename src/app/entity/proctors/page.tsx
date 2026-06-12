import { redirect } from 'next/navigation';

/**
 * The entity-side Proctors section was removed in the UI/UX review (proctor
 * assignment is handled centrally by NCFE, not by entities). This route
 * redirects to the entity dashboard so the old URL does not dead-end.
 */
export default function EntityProctorsPage() {
  redirect('/entity/dashboard');
}
