'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell, CalendarCheck, CheckCircle2, Target,
  Trophy, ChevronRight, ChevronDown, type LucideIcon,
} from 'lucide-react';

interface StatCard {
  value: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
}

const statCards: StatCard[] = [
  { value: '2', label: 'Upcoming\nAssessments', icon: CalendarCheck, colorClass: 'dash__stat-icon--upcoming' },
  { value: '3', label: 'Completed\nAssessments', icon: CheckCircle2, colorClass: 'dash__stat-icon--completed' },
  { value: '85%', label: 'Average Score', icon: Target, colorClass: 'dash__stat-icon--score' },
  { value: '1', label: 'Certificates\nEarned', icon: Trophy, colorClass: 'dash__stat-icon--certs' },
];

const upcomingAssessments = [
  { name: 'NFLAT – May 2024', date: '15 May 2024', time: '10:00 AM', mode: 'Online', status: 'Confirmed' },
  { name: 'FLQ Quiz – April 2024', date: '20 Apr 2024', time: '11:00 AM', mode: 'Online', status: 'Confirmed' },
];

const recentResults = [
  { name: 'NFLAT – Feb 2024', score: '78%', status: 'Passed' },
  { name: 'FLQ Quiz – Jan 2024', score: '71%', status: 'Passed' },
];

export default function CandidateDashboard() {
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
              className="dash__topbar-avatar dash__topbar-avatar--initials dash__topbar-avatar--orange"
              aria-hidden="true"
            >
              RS
            </span>
            <div className="dash__topbar-user-info">
              <span className="dash__topbar-user-name">Rohan Sharma</span>
              <span className="dash__topbar-user-id">Candidate ID: CND125678</span>
            </div>
            <span className="dash__topbar-user-chevron">
              <ChevronDown aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dash__content">
        <div className="dash__welcome">
          <h1 className="dash__welcome-title">Welcome back, Rohan!</h1>
          <p className="dash__welcome-subtitle">
            Track your assessments, results and progress all in one place.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="dash__stats">
          {statCards.map((stat) => (
            <div className="dash__stat-card" key={stat.label}>
              <div>
                <div className="dash__stat-value">{stat.value}</div>
                <div className="dash__stat-label" style={{ whiteSpace: 'pre-line' }}>
                  {stat.label}
                </div>
              </div>
              <div className={`dash__stat-icon ${stat.colorClass}`}>
                <stat.icon aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {/* Two Column: Upcoming + Results */}
        <div className="dash__two-col">
          <div className="dash__section">
            <div className="dash__section-header">
              <h2 className="dash__section-title">Upcoming Assessments</h2>
              <Link href="/candidate/assessments" className="dash__section-link">View All</Link>
            </div>
            {upcomingAssessments.map((item) => (
              <div className="dash__item-row" key={item.name}>
                <div className="dash__item-info">
                  <div className="dash__item-name">{item.name}</div>
                  <div className="dash__item-meta">
                    <span>{item.date}</span>
                    <span className="dash__item-meta-dot" />
                    <span>{item.time}</span>
                    <span className="dash__item-meta-dot" />
                    <span>{item.mode}</span>
                  </div>
                </div>
                <span className="dash__item-badge dash__item-badge--confirmed">{item.status}</span>
                <span className="dash__item-chevron">
                  <ChevronRight aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>

          <div className="dash__section">
            <div className="dash__section-header">
              <h2 className="dash__section-title">Recent Results</h2>
              <Link href="/candidate/results" className="dash__section-link">View All</Link>
            </div>
            {recentResults.map((item) => (
              <button
                type="button"
                className="dash__item-row"
                key={item.name}
                onClick={() => router.push('/candidate/results/RES-1001')}
                style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none' }}
              >
                <div className="dash__item-info">
                  <div className="dash__item-name">{item.name}</div>
                  <div className="dash__item-meta">
                    <span className="dash__item-score">Score {item.score}</span>
                    <span className="dash__item-status-dot dash__item-status-dot--green" />
                    <span className="dash__item-badge--passed">{item.status}</span>
                  </div>
                </div>
                <span className="dash__item-chevron">
                  <ChevronRight aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Where You Left Off */}
        <div className="dash__continue">
          <h2 className="dash__continue-title">Continue Where You Left Off</h2>
          <div className="dash__continue-row">
            <div className="dash__continue-info">
              <div className="dash__continue-name">NFLAT Practice Quiz</div>
              <div className="dash__continue-date">Last attempted on 12 May 2024</div>
            </div>
            <div className="dash__continue-progress-wrap">
              <span className="dash__continue-progress-label">60% Complete</span>
              <div className="dash__continue-progress-bar">
                <div className="dash__continue-progress-fill" style={{ width: '60%' }} />
              </div>
            </div>
            <Link href="/candidate/exam/ATT-1001/start" className="dash__continue-btn">
              Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
