'use client';

import { useState } from 'react';
import {
  MonitorCheck, Monitor, BarChart2, AlertTriangle, Search, Eye, Trash2, Info,
} from 'lucide-react';
import { ConfirmModal } from './Crud';
import '@/styles/portal/admin.css';

type ProctorStatus = 'Active' | 'Pending' | 'Inactive';
interface Proctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  enrolled: number; // candidates currently enrolled under this proctor
  status: ProctorStatus;
}

const initialProctors: readonly Proctor[] = [
  { id: 'PRC-1001', name: 'Rajesh Khanna', email: 'rajesh.khanna@ncfe.org.in', specialization: 'Live Proctoring', enrolled: 42, status: 'Active' },
  { id: 'PRC-1002', name: 'Meera Iyer', email: 'meera.iyer@ncfe.org.in', specialization: 'AI Review', enrolled: 0, status: 'Active' },
  { id: 'PRC-1003', name: 'Sandeep Rao', email: 'sandeep.rao@ncfe.org.in', specialization: 'Live Proctoring', enrolled: 18, status: 'Pending' },
  { id: 'PRC-1004', name: 'Pooja Bhatt', email: 'pooja.bhatt@ncfe.org.in', specialization: 'Recorded Review', enrolled: 0, status: 'Active' },
  { id: 'PRC-1005', name: 'Arjun Nair', email: 'arjun.nair@ncfe.org.in', specialization: 'AI Review', enrolled: 7, status: 'Inactive' },
];

const statusColors: Record<ProctorStatus, { bg: string; color: string }> = {
  Active: { bg: '#DCFCE7', color: '#166534' },
  Pending: { bg: '#FEF9C3', color: '#854D0E' },
  Inactive: { bg: '#F1F5F9', color: '#64748B' },
};

export default function AdminProctors() {
  const [rows, setRows] = useState<Proctor[]>([...initialProctors]);
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<Proctor | null>(null);

  const filtered = rows.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()),
  );

  const doDelete = () => {
    if (confirm) setRows((prev) => prev.filter((p) => p.id !== confirm.id));
    setConfirm(null);
  };

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">Proctors</h1>
          <p className="dashboard-subtitle">Assign and monitor proctors for online and live-supervised exams.</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}><MonitorCheck size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Total Proctors</div><div className="stat-card__value">{rows.length}</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F0FDF4', color: 'var(--green)' }}><Monitor size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Active Now</div><div className="stat-card__value">8</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#EDE9FE', color: '#7C3AED' }}><BarChart2 size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Sessions Today</div><div className="stat-card__value">42</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#FEE2E2', color: '#DC2626' }}><AlertTriangle size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Flags Raised</div><div className="stat-card__value">5</div></div>
          </div>
        </div>

        <p style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '10px 14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#92400E' }}>
          <Info size={15} aria-hidden="true" />
          A proctor cannot be deleted while candidates are enrolled under them. Reassign their candidates first.
        </p>

        <div className="dashboard-card" style={{ padding: 0, marginTop: '16px' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '11px', color: 'var(--gray-400)' }} aria-hidden="true" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search proctor name or ID..."
                style={{ width: '100%', padding: '9px 14px 9px 40px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} />
            </div>
          </div>

          <table className="dashboard-table" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr><th>Proctor</th><th>Specialization</th><th>Enrolled Candidates</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sc = statusColors[p.status];
                const hasEnrolled = p.enrolled > 0;
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{p.id} · {p.email}</div>
                    </td>
                    <td style={{ color: 'var(--gray-600)' }}>{p.specialization}</td>
                    <td style={{ fontWeight: 600, color: hasEnrolled ? 'var(--navy)' : 'var(--gray-400)' }}>{p.enrolled}</td>
                    <td><span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{p.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button type="button" className="btn btn--sm btn--secondary" style={{ padding: '5px 8px', fontSize: '0.75rem' }} title="View"><Eye size={13} aria-hidden="true" /></button>
                        <button
                          type="button"
                          className="btn btn--sm"
                          onClick={() => !hasEnrolled && setConfirm(p)}
                          disabled={hasEnrolled}
                          title={hasEnrolled ? `Cannot delete — ${p.enrolled} candidate(s) enrolled` : 'Delete proctor'}
                          aria-label={hasEnrolled ? 'Delete disabled: candidates enrolled' : 'Delete proctor'}
                          style={{
                            padding: '5px 8px', fontSize: '0.75rem', border: 'none',
                            background: hasEnrolled ? 'var(--gray-100)' : '#FEE2E2',
                            color: hasEnrolled ? 'var(--gray-400)' : '#991B1B',
                            cursor: hasEnrolled ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <Trash2 size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={confirm !== null}
        title="Delete Proctor"
        message={confirm ? `Delete ${confirm.name} (${confirm.id})? This cannot be undone.` : ''}
        confirmLabel="Delete"
        onConfirm={doDelete}
        onClose={() => setConfirm(null)}
      />
    </main>
  );
}
