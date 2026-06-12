'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarRange, UserCheck, Bell, TrendingUp, Users as UsersIcon, CheckSquare,
  Calendar, BadgeCheck, ChevronDown, ChevronRight, UserPlus as AddUser, Download,
  type LucideIcon,
} from 'lucide-react';

interface StatCard {
  value: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  trend: string;
}

const statCards: StatCard[] = [
  { value: '1,245', label: 'Total Candidates', icon: UsersIcon, colorClass: 'edash__stat-icon--green', trend: '+ 12%' },
  { value: '856', label: 'Approved Candidates', icon: CheckSquare, colorClass: 'edash__stat-icon--amber', trend: '+ 8%' },
  { value: '32', label: 'Upcoming Exams', icon: Calendar, colorClass: 'edash__stat-icon--blue', trend: '+ 15%' },
  { value: '18', label: 'Active Invigilators', icon: BadgeCheck, colorClass: 'edash__stat-icon--purple', trend: '+ 5%' },
];

const registrations = [
  { initials: 'RK', name: 'Rohan Kumar', email: 'rohan.kumar@email.com', date: '12 May 2024', status: 'Pending', colorClass: 'edash__reg-avatar--blue' },
  { initials: 'PS', name: 'Priya Singh', email: 'priya.singh@email.com', date: '12 May 2024', status: 'Approved', colorClass: 'edash__reg-avatar--purple' },
  { initials: 'AV', name: 'Ankit Verma', email: 'ankit.verma@email.com', date: '11 May 2024', status: 'Pending', colorClass: 'edash__reg-avatar--teal' },
  { initials: 'NG', name: 'Neha Gupta', email: 'neha.gupta@email.com', date: '11 May 2024', status: 'Approved', colorClass: 'edash__reg-avatar--amber' },
];

const upcomingExams = [
  { name: 'NFLAT – May 2024', date: '15 May 2024', time: '10:00 AM', candidates: 300 },
  { name: 'FLQ Quiz – April 2024', date: '20 Apr 2024', time: '11:00 AM', candidates: 180 },
  { name: 'NFLAT – June 2024', date: '05 Jun 2024', time: '10:00 AM', candidates: 410 },
];

export default function EntityDashboard() {
  const router = useRouter();

  return (
    <div className="dash__main">
      {/* Top Bar */}
      <div className="dash__topbar">
        <div className="dash__topbar-right">
          <button className="dash__topbar-notif" aria-label="Notifications">
            <Bell aria-hidden="true" />
            <span className="dash__topbar-notif-dot" />
          </button>

          <div className="dash__topbar-user">
            <span
              className="dash__topbar-avatar dash__topbar-avatar--initials dash__topbar-avatar--navy"
              aria-hidden="true"
            >
              AV
            </span>
            <div className="dash__topbar-user-info">
              <span className="dash__topbar-user-name">Anita Verma</span>
              <span className="dash__topbar-user-id">Entity Super Admin</span>
            </div>
            <span className="dash__topbar-user-chevron">
              <ChevronDown aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dash__content">
        <div className="edash__header">
          <h1 className="dash__welcome-title" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
            Entity Dashboard
          </h1>
          <p className="dash__welcome-subtitle" style={{ fontSize: '0.875rem' }}>
            Overview of entity activities and key metrics
          </p>
        </div>

        {/* Stats */}
        <div className="edash__stats">
          {statCards.map((stat) => (
            <div className="edash__stat-card" key={stat.label}>
              <div className="edash__stat-top">
                <div className={`edash__stat-icon ${stat.colorClass}`}>
                  <stat.icon aria-hidden="true" />
                </div>
                <div className="edash__stat-value">{stat.value}</div>
              </div>
              <div className="edash__stat-label">{stat.label}</div>
              <div className="edash__stat-trend">
                <TrendingUp aria-hidden="true" />
                <span>{stat.trend}</span>
                <span>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions — placed directly below the dashboard figures */}
        <div className="edash__quick">
          <h2 className="edash__quick-title">Quick Actions</h2>
          <div className="edash__quick-grid">
            <button className="edash__quick-btn" onClick={() => router.push('/entity/candidates/create')}>
              <AddUser style={{ color: 'var(--green)' }} aria-hidden="true" /> Add Candidate
            </button>
            <button className="edash__quick-btn" onClick={() => router.push('/entity/exams/EX-1001/slots')}>
              <CalendarRange style={{ color: '#3B82F6' }} aria-hidden="true" /> Create Exam Slot
            </button>
            <button className="edash__quick-btn" onClick={() => router.push('/entity/invigilators')}>
              <UserCheck style={{ color: '#7C3AED' }} aria-hidden="true" /> Assign Invigilator
            </button>
            <button className="edash__quick-btn" onClick={() => router.push('/entity/reports')}>
              <Download style={{ color: 'var(--green)' }} aria-hidden="true" /> Download Reports
            </button>
          </div>
        </div>

        {/* Two Column: Registrations + Upcoming Exams */}
        <div className="dash__two-col">
          <div className="dash__section">
            <div className="dash__section-header">
              <h2 className="dash__section-title">Recent Candidate Registrations</h2>
              <Link href="/entity/candidates" className="dash__section-link">View All</Link>
            </div>
            {registrations.map((reg) => (
              <div className="edash__reg-row" key={reg.name}>
                <div className={`edash__reg-avatar ${reg.colorClass}`}>{reg.initials}</div>
                <div className="edash__reg-info">
                  <div className="edash__reg-name">{reg.name}</div>
                  <div className="edash__reg-email">{reg.email}</div>
                </div>
                <div className="edash__reg-date">{reg.date}</div>
                <span className={`edash__reg-badge edash__reg-badge--${reg.status.toLowerCase()}`}>
                  {reg.status}
                </span>
              </div>
            ))}
          </div>

          <div className="dash__section">
            <div className="dash__section-header">
              <h2 className="dash__section-title">Upcoming Exams</h2>
              <Link href="/entity/assessments" className="dash__section-link">View All</Link>
            </div>
            {upcomingExams.map((exam) => (
              <div className="dash__item-row" key={exam.name}>
                <div className="dash__item-info">
                  <div className="dash__item-name">{exam.name}</div>
                  <div className="dash__item-meta">
                    <span>{exam.date}</span>
                    <span className="dash__item-meta-dot" />
                    <span>{exam.time}</span>
                    <span className="dash__item-meta-dot" />
                    <span>{exam.candidates} Candidates</span>
                  </div>
                </div>
                <span className="dash__item-chevron">
                  <ChevronRight aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="edash__footer">
        <span>© 2024 NCFE. All rights reserved.</span>
        <span className="edash__footer-sep">|</span>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <span className="edash__footer-sep">|</span>
        <Link href="/terms">Terms of Use</Link>
        <span className="edash__footer-sep">|</span>
        <Link href="/support">Help &amp; Support</Link>
      </div>
    </div>
  );
}
