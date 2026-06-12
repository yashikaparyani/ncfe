'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import PortalSidebar from '@/components/portal/PortalSidebar';
import type { Role } from '@/lib/auth/config';

/**
 * Client shell that toggles the portal sidebar based on the live pathname.
 *
 * This MUST be a client component: `usePathname()` updates on every soft
 * navigation, so the sidebar appears/disappears correctly when moving between
 * full-screen flows (exam, registration wizards) and the regular dashboard
 * pages. A server layout reading `headers()` does NOT re-render on client
 * navigation between sibling routes, which left the shell "stuck" in the wrong
 * mode (e.g. the dashboard rendering broken after returning from the exam).
 */
export default function PortalShell({
  role,
  fullscreenPrefixes,
  wrapperClassName = 'dash',
  children,
}: {
  role: Role;
  fullscreenPrefixes: readonly string[];
  wrapperClassName?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || '';
  const fullscreen = fullscreenPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (fullscreen) return <>{children}</>;

  return (
    <div className={wrapperClassName}>
      <PortalSidebar role={role} />
      {children}
    </div>
  );
}
