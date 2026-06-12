import PortalShell from '@/components/portal/PortalShell';
import '@/styles/portal/dash-shell.css';
import '@/styles/portal/entity.css';
import '@/styles/portal/extras.css';

// `/entity/register` is a PUBLIC full-screen wizard (reachable without a session
// — see auth/config.ts), so it renders without the authenticated sidebar.
const FULLSCREEN_PREFIXES = ['/entity/register'];

// Authenticated entity portal shell (sidebar chrome). Access enforced by
// middleware. The sidebar toggle is client-side (PortalShell) so it stays
// correct across soft navigations.
export default function EntityLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="entity" fullscreenPrefixes={FULLSCREEN_PREFIXES}>
      {children}
    </PortalShell>
  );
}
