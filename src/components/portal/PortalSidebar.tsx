'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, UserCircle, Award, Bell, HelpCircle, Settings,
  Library, Users, UserPlus, FileText, CalendarRange, UserCheck, MonitorCheck, BarChart2,
  Shield, Sliders, AlertTriangle, ShieldCheck, Layers, LogOut, type LucideIcon,
} from 'lucide-react';
import { logoutAction } from '@/lib/auth/actions';
import type { Role } from '@/lib/auth/config';

const NCFE_LOGO = '/assets/ncfe_logo.png';

type NavLink = {
  icon: LucideIcon;
  label: string;
  to: string;
  badge?: number;
  match?: string;
  /** When true, the link is active only on an exact path match (no prefix). */
  exact?: boolean;
};
type NavItem = NavLink | { divider: true };

function isDivider(item: NavItem): item is { divider: true } {
  return 'divider' in item;
}

// Role-specific navigation. `match` overrides the active-state prefix when it
// differs from the link target (e.g. a link points at a deep default route).
const NAV: Record<Role, NavItem[]> = {
  candidate: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/candidate/dashboard' },
    { icon: BookOpen, label: 'My Assessments', to: '/candidate/assessments' },
    { icon: UserCircle, label: 'My Profile', to: '/candidate/profile' },
    { icon: Award, label: 'Results & Certificates', to: '/candidate/results' },
    { icon: Library, label: 'Reference Material', to: '/candidate/reference-material' },
    { divider: true },
    { icon: Bell, label: 'Notifications', to: '/candidate/notifications', badge: 3 },
    { icon: HelpCircle, label: 'Support', to: '/candidate/support' },
    { icon: Settings, label: 'Settings', to: '/candidate/settings' },
  ],
  entity: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/entity/dashboard' },
    { icon: Users, label: 'Users', to: '/entity/users' },
    { icon: UserPlus, label: 'Candidates', to: '/entity/candidates' },
    { icon: FileText, label: 'Assessments', to: '/entity/assessments' },
    { icon: CalendarRange, label: 'Exam Slots', to: '/entity/exams/EX-1001/slots', match: '/entity/exams' },
    { icon: UserCheck, label: 'Invigilators', to: '/entity/invigilators' },
    { icon: BarChart2, label: 'Reports', to: '/entity/reports' },
    { icon: Bell, label: 'Notifications', to: '/entity/notifications' },
    { icon: Settings, label: 'Settings', to: '/entity/settings' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: FileText, label: 'Question Bank', to: '/admin/question-bank', exact: true },
    { icon: Layers, label: 'QB Topics', to: '/admin/question-bank/topics' },
    { icon: BookOpen, label: 'Assessments', to: '/admin/assessments' },
    { icon: ShieldCheck, label: 'Entities', to: '/admin/entities' },
    { icon: MonitorCheck, label: 'Proctors', to: '/admin/proctors' },
    { icon: Users, label: 'Users', to: '/admin/users' },
    { icon: Shield, label: 'Roles & Perms', to: '/admin/roles-permissions' },
    { icon: Sliders, label: 'Masters', to: '/admin/masters' },
    { icon: CalendarRange, label: 'Exam Cycles', to: '/admin/exam-cycles' },
    { icon: BarChart2, label: 'Reports', to: '/admin/reports' },
    { icon: AlertTriangle, label: 'Audit Logs', to: '/admin/audit-logs' },
    { icon: ShieldCheck, label: 'Security', to: '/admin/security-events' },
    { icon: Bell, label: 'Notifications', to: '/admin/notifications/templates', match: '/admin/notifications' },
    { icon: Settings, label: 'System', to: '/admin/system/feature-flags', match: '/admin/system' },
  ],
  proctor: [
    { icon: MonitorCheck, label: 'Live Proctoring', to: '/proctor/dashboard' },
    { icon: Users, label: 'Candidates', to: '/proctor/candidates' },
    { icon: FileText, label: 'Reports', to: '/proctor/reports' },
    { icon: Bell, label: 'Alerts', to: '/proctor/alerts' },
  ],
  // Invigilator uses a standalone full-screen layout (no portal sidebar).
  invigilator: [],
};

export default function PortalSidebar({ role }: { role: Role }) {
  const pathname = usePathname() || '';
  const items = NAV[role];

  const isActive = (item: NavLink) => {
    const base = item.match ?? item.to;
    if (item.exact) return pathname === base;
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  // ─── Admin uses a distinct sidebar markup/CSS ───
  if (role === 'admin') {
    return (
      <aside className="dashboard-sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__logo-icon">
            <Image src={NCFE_LOGO} alt="" width={40} height={40} />
          </span>
          NCFE Admin
        </div>
        <nav className="sidebar__nav" aria-label="Admin navigation">
          {items.map((item) =>
            isDivider(item) ? null : (
              <Link
                key={item.label}
                href={item.to}
                aria-current={isActive(item) ? 'page' : undefined}
                className={`sidebar__nav-item${isActive(item) ? ' sidebar__nav-item--active' : ''}`}
              >
                <item.icon size={18} aria-hidden="true" /> {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="sidebar__footer">
          <form action={logoutAction}>
            <button
              type="submit"
              className="sidebar__nav-item"
              style={{ width: '100%', background: 'transparent', border: 'none' }}
            >
              <LogOut size={18} aria-hidden="true" /> Logout
            </button>
          </form>
        </div>
      </aside>
    );
  }

  // ─── Candidate / Entity / Proctor share the .dash__sidebar markup/CSS ───
  return (
    <aside className="dash__sidebar">
      <div className="dash__sidebar-logo">
        <div className="dash__sidebar-logo-emblem">
          <Image src={NCFE_LOGO} alt="" width={56} height={56} />
        </div>
        <div className="dash__sidebar-logo-text">
          <span>NCFE</span>
          <span>
            National Centre for
            <br />
            Financial Education
          </span>
        </div>
      </div>

      <nav className="dash__sidebar-nav" aria-label="Portal navigation">
        {items.map((item, i) =>
          isDivider(item) ? (
            <div className="dash__sidebar-divider" key={`div-${i}`} />
          ) : (
            <Link
              key={item.label}
              href={item.to}
              aria-current={isActive(item) ? 'page' : undefined}
              className={`dash__sidebar-link${isActive(item) ? ' dash__sidebar-link--active' : ''}`}
            >
              <item.icon aria-hidden="true" />
              {item.label}
              {item.badge && <span className="dash__sidebar-badge">{item.badge}</span>}
            </Link>
          ),
        )}
      </nav>

      <div className="dash__sidebar-footer">
        <form action={logoutAction}>
          <button
            type="submit"
            className="dash__sidebar-link"
            style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <LogOut aria-hidden="true" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
