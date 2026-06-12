import PortalShell from '@/components/portal/PortalShell';
import '@/styles/portal/admin.css';

// The assessment builder (`/admin/assessments/create/*`) renders full-screen
// without the admin sidebar.
const FULLSCREEN_PREFIXES = ['/admin/assessments/create'];

// Authenticated admin portal shell (sidebar chrome). Access enforced by
// middleware. The sidebar toggle is client-side (PortalShell) so it stays
// correct across soft navigations into and out of the builder.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="admin" fullscreenPrefixes={FULLSCREEN_PREFIXES} wrapperClassName="dashboard-layout">
      {children}
    </PortalShell>
  );
}
