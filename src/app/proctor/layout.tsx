import PortalSidebar from '@/components/portal/PortalSidebar';
import '@/styles/portal/dash-shell.css';
import '@/styles/portal/proctor.css';

// Authenticated proctor portal shell (sidebar chrome). Access enforced by middleware.
export default function ProctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash">
      <PortalSidebar role="proctor" />
      {children}
    </div>
  );
}
