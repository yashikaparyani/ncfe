'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users, Search, Shield, PlusCircle, Lock, Unlock, RefreshCw, Eye,
  CheckCircle2, XCircle, ShieldCheck, type LucideIcon,
} from 'lucide-react';
import '@/styles/portal/admin.css';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  dept: string;
  status: 'Active' | 'Locked' | 'Inactive';
  lastLogin: string;
  mfa: boolean;
}

const ncfeUsers: readonly AdminUser[] = [
  { id: 'USR-001', name: 'Suresh Patel', email: 'suresh.patel@ncfe.org.in', role: 'NCFE Super Admin', dept: 'Administration', status: 'Active', lastLogin: '23 May 2024, 09:15 AM', mfa: true },
  { id: 'USR-002', name: 'Kavitha Rajan', email: 'kavitha.rajan@ncfe.org.in', role: 'NCFE Admin', dept: 'Assessment Cell', status: 'Active', lastLogin: '23 May 2024, 08:45 AM', mfa: true },
  { id: 'USR-003', name: 'Arun Mishra', email: 'arun.mishra@ncfe.org.in', role: 'Content Reviewer', dept: 'Question Bank', status: 'Active', lastLogin: '22 May 2024, 06:30 PM', mfa: true },
  { id: 'USR-004', name: 'Deepa Nair', email: 'deepa.nair@ncfe.org.in', role: 'Entity Reviewer', dept: 'Entity Governance', status: 'Active', lastLogin: '22 May 2024, 03:10 PM', mfa: false },
  { id: 'USR-005', name: 'Rakesh Sharma', email: 'rakesh.sharma@ncfe.org.in', role: 'System Admin', dept: 'IT Operations', status: 'Active', lastLogin: '21 May 2024, 11:55 AM', mfa: true },
  { id: 'USR-006', name: 'Priya Venkat', email: 'priya.venkat@ncfe.org.in', role: 'Report Analyst', dept: 'Analytics', status: 'Locked', lastLogin: '18 May 2024, 04:20 PM', mfa: false },
  { id: 'USR-007', name: 'Mahesh Kumar', email: 'mahesh.kumar@ncfe.org.in', role: 'Content Reviewer', dept: 'Question Bank', status: 'Active', lastLogin: '23 May 2024, 07:00 AM', mfa: true },
  { id: 'USR-008', name: 'Asha Pillai', email: 'asha.pillai@ncfe.org.in', role: 'NCFE Admin', dept: 'Candidate Support', status: 'Inactive', lastLogin: '10 Apr 2024, 01:30 PM', mfa: false },
];

const roleColors: Record<string, { bg: string; color: string }> = {
  'NCFE Super Admin': { bg: '#EDE9FE', color: '#5B21B6' },
  'NCFE Admin': { bg: '#EFF6FF', color: '#1D4ED8' },
  'Content Reviewer': { bg: '#F0FDF4', color: '#166534' },
  'Entity Reviewer': { bg: '#FFF7ED', color: '#9A3412' },
  'System Admin': { bg: '#FEF3C7', color: '#92400E' },
  'Report Analyst': { bg: '#F1F5F9', color: '#475569' },
};
const statusColors: Record<AdminUser['status'], { bg: string; color: string }> = {
  Active: { bg: '#DCFCE7', color: '#166534' },
  Locked: { bg: '#FEE2E2', color: '#991B1B' },
  Inactive: { bg: '#F1F5F9', color: '#64748B' },
};

const kpis: ReadonlyArray<{ label: string; value: string; icon: LucideIcon; bg: string; color: string }> = [
  { label: 'Total Users', value: '8', icon: Users, bg: '#F0FDF4', color: 'var(--green)' },
  { label: 'Active', value: '6', icon: CheckCircle2, bg: '#EFF6FF', color: '#3B82F6' },
  { label: 'Locked', value: '1', icon: Lock, bg: '#FEE2E2', color: '#DC2626' },
  { label: 'MFA Enabled', value: '5', icon: ShieldCheck, bg: '#EDE9FE', color: '#7C3AED' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');

  const filtered = ncfeUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">NCFE User Management</h1>
          <p className="dashboard-subtitle">Create and manage NCFE portal admin accounts and role assignments.</p>
        </div>
        <div className="dashboard-header__actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <Link href="/admin/roles-permissions" className="btn btn--secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Shield size={16} aria-hidden="true" /> Manage Roles
          </Link>
          <button type="button" className="btn btn--primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <PlusCircle size={16} aria-hidden="true" /> Add User
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {kpis.map((k) => (
            <div className="stat-card" key={k.label}>
              <div className="stat-card__icon" style={{ background: k.bg, color: k.color }}><k.icon size={22} aria-hidden="true" /></div>
              <div className="stat-card__info">
                <div className="stat-card__label">{k.label}</div>
                <div className="stat-card__value">{k.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card" style={{ padding: 0, marginTop: '24px' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '11px', color: 'var(--gray-400)' }} aria-hidden="true" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search by name, email or role..."
                style={{ width: '100%', padding: '9px 14px 9px 40px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} />
            </div>
            <select style={{ padding: '9px 14px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} defaultValue="All Roles">
              <option>All Roles</option><option>NCFE Super Admin</option><option>NCFE Admin</option><option>Content Reviewer</option><option>Entity Reviewer</option><option>System Admin</option>
            </select>
            <select style={{ padding: '9px 14px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} defaultValue="All Status">
              <option>All Status</option><option>Active</option><option>Locked</option><option>Inactive</option>
            </select>
          </div>

          <table className="dashboard-table" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr><th>User</th><th>Role</th><th>Department</th><th>Last Login</th><th>MFA</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const rc = roleColors[u.role] ?? { bg: '#F1F5F9', color: '#475569' };
                const sc = statusColors[u.status];
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                          {u.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{u.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ background: rc.bg, color: rc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{u.role}</span></td>
                    <td style={{ color: 'var(--gray-600)' }}>{u.dept}</td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{u.lastLogin}</td>
                    <td>{u.mfa ? <CheckCircle2 size={16} color="#16A34A" aria-hidden="true" /> : <XCircle size={16} color="#DC2626" aria-hidden="true" />}</td>
                    <td><span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{u.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button type="button" className="btn btn--sm btn--secondary" style={{ padding: '5px 8px', fontSize: '0.75rem' }} title="View"><Eye size={13} aria-hidden="true" /></button>
                        {u.status === 'Locked'
                          ? <button type="button" className="btn btn--sm" style={{ padding: '5px 8px', fontSize: '0.75rem', background: '#D1FAE5', color: '#065F46', border: 'none' }} title="Unlock"><Unlock size={13} aria-hidden="true" /></button>
                          : <button type="button" className="btn btn--sm" style={{ padding: '5px 8px', fontSize: '0.75rem', background: '#FEE2E2', color: '#991B1B', border: 'none' }} title="Lock"><Lock size={13} aria-hidden="true" /></button>}
                        <button type="button" className="btn btn--sm btn--secondary" style={{ padding: '5px 8px', fontSize: '0.75rem' }} title="Reset Password"><RefreshCw size={13} aria-hidden="true" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
