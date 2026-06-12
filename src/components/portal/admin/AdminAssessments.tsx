'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle2, FileEdit, Archive, Search, Plus, Eye, Pencil } from 'lucide-react';
import { ASSESSMENTS, type Assessment, type AssessmentStatus } from '@/lib/admin/assessments';
import '@/styles/portal/admin.css';

const statusColors: Record<AssessmentStatus, { bg: string; color: string }> = {
  Published: { bg: '#DCFCE7', color: '#166534' },
  Draft: { bg: '#FEF3C7', color: '#92400E' },
  Archived: { bg: '#F1F5F9', color: '#64748B' },
};

export default function AdminAssessments() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = ASSESSMENTS.filter((a) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const startCreate = () => router.push('/admin/assessments/create/basic');
  const openView = (a: Assessment) => router.push(`/admin/assessments/${a.id}`);
  const openEdit = (a: Assessment) => router.push(`/admin/assessments/${a.id}?edit=1`);

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">Assessments</h1>
          <p className="dashboard-subtitle">Create and manage assessment papers, scoring and delivery policies.</p>
        </div>
        <div className="dashboard-header__actions">
          <button type="button" className="btn btn--primary" onClick={startCreate} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} aria-hidden="true" /> Create Assessment
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}><BookOpen size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Total Assessments</div><div className="stat-card__value">{ASSESSMENTS.length}</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F0FDF4', color: 'var(--green)' }}><CheckCircle2 size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Published</div><div className="stat-card__value">{ASSESSMENTS.filter((a) => a.status === 'Published').length}</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#FEF3C7', color: '#D97706' }}><FileEdit size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Drafts</div><div className="stat-card__value">{ASSESSMENTS.filter((a) => a.status === 'Draft').length}</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F1F5F9', color: '#64748B' }}><Archive size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Archived</div><div className="stat-card__value">{ASSESSMENTS.filter((a) => a.status === 'Archived').length}</div></div>
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: 0, marginTop: '24px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '11px', color: 'var(--gray-400)' }} aria-hidden="true" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search assessment name, code or category..."
                style={{ width: '100%', padding: '9px 14px 9px 40px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '9px 14px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }}>
              <option>All</option><option>Published</option><option>Draft</option><option>Archived</option>
            </select>
          </div>

          <table className="dashboard-table" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr><th>Code</th><th>Assessment</th><th>Category</th><th>Questions</th><th>Mode</th><th>Updated</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--gray-400)' }}>No assessments match your filters.</td></tr>
              )}
              {filtered.map((a) => {
                const sc = statusColors[a.status];
                return (
                  <tr key={a.id}>
                    <td style={{ color: 'var(--gray-500)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{a.id}</td>
                    <td style={{ maxWidth: '320px' }}><div style={{ fontWeight: 600, color: 'var(--navy)' }}>{a.name}</div></td>
                    <td style={{ color: 'var(--gray-600)' }}>{a.category}</td>
                    <td style={{ fontWeight: 600 }}>{a.questions}</td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{a.mode}</span></td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{a.updated}</td>
                    <td><span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{a.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button type="button" className="btn btn--sm btn--secondary" onClick={() => openView(a)} style={{ padding: '5px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={13} aria-hidden="true" /> View
                        </button>
                        <button type="button" className="btn btn--sm btn--primary" onClick={() => openEdit(a)} style={{ padding: '5px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Pencil size={13} aria-hidden="true" /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderTop: '1px solid var(--gray-200)', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            <span>Showing <strong style={{ color: 'var(--gray-800)' }}>{filtered.length}</strong> of <strong style={{ color: 'var(--gray-800)' }}>{ASSESSMENTS.length}</strong> assessments</span>
          </div>
        </div>
      </div>
    </main>
  );
}
