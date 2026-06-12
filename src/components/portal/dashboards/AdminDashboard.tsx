import Link from 'next/link';
import {
  Users, Building2, FileText, AlertTriangle, BookOpen, CalendarRange, BarChart2,
  Settings, TrendingUp, CheckCircle2, Globe, type LucideIcon,
} from 'lucide-react';

const pendingEntities = [
  { name: 'Delhi Public School', type: 'School', state: 'Delhi', date: '24 May 2024', id: 'ENT-1008' },
  { name: 'Tech Mahindra Ltd.', type: 'Corporate', state: 'Maharashtra', date: '23 May 2024', id: 'ENT-1009' },
  { name: 'Rajasthan Gramin Bank', type: 'NBFC/Bank', state: 'Rajasthan', date: '22 May 2024', id: 'ENT-1010' },
];

const recentActivity = [
  { action: 'Assessment "NFLAT – Q2 2024" published', time: '2h ago', color: '#16A34A' },
  { action: 'Entity "Amity University" suspended by reviewer', time: '4h ago', color: '#DC2626' },
  { action: '248 new candidates registered today', time: '6h ago', color: '#3B82F6' },
  { action: 'Question Bank: 120 new questions added', time: '1d ago', color: '#D97706' },
  { action: 'Exam cycle Q2 2024 auto-lock scheduled', time: '2d ago', color: '#8B5CF6' },
];

const quickActions: { icon: LucideIcon; label: string; to: string; color: string }[] = [
  { icon: FileText, label: 'Create Assessment', to: '/admin/assessments/create', color: '#3B82F6' },
  { icon: BookOpen, label: 'Question Bank', to: '/admin/question-bank', color: '#F59E0B' },
  { icon: AlertTriangle, label: 'Audit Logs', to: '/admin/audit-logs', color: '#10B981' },
  { icon: Building2, label: 'Entity Review', to: '/admin/entities', color: '#8B5CF6' },
  { icon: Users, label: 'User Management', to: '/admin/users', color: '#EC4899' },
  { icon: CalendarRange, label: 'Exam Cycles', to: '/admin/exam-cycles', color: '#EF4444' },
  { icon: BarChart2, label: 'Reports', to: '/admin/reports', color: '#06B6D4' },
  { icon: Settings, label: 'System Ops', to: '/admin/system/feature-flags', color: '#64748B' },
];

const systemStatus = [
  { label: 'API Uptime', value: '99.98%', color: '#16A34A' },
  { label: 'Active Sessions', value: '128 Live', color: '#3B82F6' },
  { label: 'Pending Notifs', value: '14,823', color: '#D97706' },
  { label: 'Security Events', value: '8 Today', color: '#EF4444' },
];

export default function AdminDashboard() {
  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">Overview</h1>
          <p className="dashboard-subtitle">System-wide performance — Q2 2024 Exam Cycle · Active</p>
        </div>
        <div className="dashboard-header__actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#DCFCE7', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
            <CheckCircle2 size={15} aria-hidden="true" /> All Systems Operational
          </div>
          <div className="dashboard-user">
            <div className="dashboard-user__avatar">SA</div>
            <div className="dashboard-user__info">
              <span className="dashboard-user__name">Super Admin</span>
              <span className="dashboard-user__role">System Operations</span>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* KPI Cards */}
        <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F0FDF4', color: 'var(--green)' }}>
              <Building2 size={22} aria-hidden="true" />
            </div>
            <div className="stat-card__info">
              <div className="stat-card__label">Active Entities</div>
              <div className="stat-card__value">1,492</div>
              <div style={{ fontSize: '0.75rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={11} aria-hidden="true" /> +38 this cycle
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#FFF7ED', color: 'var(--orange)' }}>
              <Users size={22} aria-hidden="true" />
            </div>
            <div className="stat-card__info">
              <div className="stat-card__label">Total Candidates</div>
              <div className="stat-card__value">84.2K</div>
              <div style={{ fontSize: '0.75rem', color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={11} aria-hidden="true" /> +14,800 enrolled
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#EFF6FF', color: 'var(--navy)' }}>
              <FileText size={22} aria-hidden="true" />
            </div>
            <div className="stat-card__info">
              <div className="stat-card__label">Active Assessments</div>
              <div className="stat-card__value">14</div>
              <div style={{ fontSize: '0.75rem', color: '#3B82F6', marginTop: '4px' }}>NFLAT + FLQ + 12 Custom</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
              <Globe size={22} aria-hidden="true" />
            </div>
            <div className="stat-card__info">
              <div className="stat-card__label">Languages Active</div>
              <div className="stat-card__value">13</div>
              <div style={{ fontSize: '0.75rem', color: '#7C3AED', marginTop: '4px' }}>All regional languages</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '28px' }}>
          {/* Pending Entity Verifications */}
          <div className="dashboard-card">
            <div className="dashboard-card__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="dashboard-card__title">Pending Entity Verifications</h2>
              <Link href="/admin/entities" className="btn btn--sm btn--secondary" style={{ fontSize: '0.75rem' }}>
                View All ({pendingEntities.length} pending)
              </Link>
            </div>
            <div className="dashboard-card__body" style={{ padding: 0 }}>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Entity Name</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>Date Applied</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingEntities.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{e.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{e.id}</div>
                      </td>
                      <td>{e.type}</td>
                      <td>{e.state}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{e.date}</td>
                      <td>
                        <Link href="/admin/entities" className="btn btn--sm btn--primary" style={{ fontSize: '0.75rem' }}>
                          Verify
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Quick Actions</h2>
            </div>
            <div className="dashboard-card__body" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {quickActions.map((item) => (
                <Link key={item.label} href={item.to} style={{ flex: '1 1 calc(50% - 6px)', minWidth: '120px' }}>
                  <div style={{ padding: '12px 14px', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={15} color={item.color} aria-hidden="true" />
                    <span style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.8rem' }}>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card" style={{ marginTop: '24px' }}>
          <div className="dashboard-card__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className="dashboard-card__title">Recent Activity</h2>
            <Link href="/admin/audit-logs" className="btn btn--sm btn--secondary" style={{ fontSize: '0.75rem' }}>
              Full Audit Log
            </Link>
          </div>
          <div className="dashboard-card__body">
            {recentActivity.map((a, i) => (
              <div key={a.action} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '0.875rem', color: 'var(--gray-700)' }}>{a.action}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
          {systemStatus.map((s) => (
            <div key={s.label} style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '16px 20px', border: '1px solid var(--gray-200)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
