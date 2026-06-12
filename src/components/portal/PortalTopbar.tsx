import { Bell, ChevronDown } from 'lucide-react';
import '@/styles/portal/pages.css';

/**
 * Shared portal top bar for the candidate / entity / proctor sidebar shell
 * (`.dash__topbar`). The avatar is a CSS initials chip — never an external
 * image — to satisfy the production CSP (`img-src 'self' blob: data:`).
 */
export default function PortalTopbar({
  name,
  meta,
  initials,
  avatarColor = 'orange',
}: {
  name: string;
  /** Secondary line, e.g. "Candidate ID: CND125678". */
  meta: string;
  initials: string;
  avatarColor?: 'orange' | 'navy';
}) {
  return (
    <div className="dash__topbar">
      <div className="dash__topbar-right">
        <button className="dash__topbar-notif" type="button" aria-label="Notifications">
          <Bell aria-hidden="true" />
          <span className="dash__topbar-notif-dot" />
        </button>

        <div className="dash__topbar-user">
          <span
            className={`dash__topbar-avatar dash__topbar-avatar--initials dash__topbar-avatar--${avatarColor}`}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="dash__topbar-user-info">
            <span className="dash__topbar-user-name">{name}</span>
            <span className="dash__topbar-user-id">{meta}</span>
          </div>
          <span className="dash__topbar-user-chevron">
            <ChevronDown aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
