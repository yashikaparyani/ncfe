import PortalShell from '@/components/portal/PortalShell';
import '@/styles/portal/dash-shell.css';
import '@/styles/portal/extras.css';

// Routes that render full-screen without the candidate sidebar.
const FULLSCREEN_PREFIXES = ['/candidate/register', '/candidate/exam/', '/candidate/exams/'];

// Authenticated candidate portal shell. Access is enforced by middleware
// (a valid `candidate` session cookie). The sidebar-vs-full-screen decision is
// made client-side in PortalShell so it stays correct across soft navigations
// (e.g. returning from the full-screen exam flow to the dashboard).
export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="candidate" fullscreenPrefixes={FULLSCREEN_PREFIXES}>
      {children}
    </PortalShell>
  );
}
