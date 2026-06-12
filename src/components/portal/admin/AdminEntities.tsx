'use client';

import { useState } from 'react';
import {
  Building2, Search, CheckCircle2, XCircle, Clock, Eye, MoreVertical,
  ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import { CrudModal, type CrudField, type CrudValues } from './Crud';
import '@/styles/portal/admin.css';

type EntityStatus = 'Active' | 'Suspended' | 'Pending Verification';
interface Entity {
  id: string;
  name: string;
  type: string;
  state: string;
  candidates: number;
  status: EntityStatus;
  since: string;
  mode: string;
}

const entityFields: readonly CrudField[] = [
  { name: 'id', label: 'Entity ID' },
  { name: 'name', label: 'Entity Name' },
  { name: 'type', label: 'Type' },
  { name: 'state', label: 'State' },
  { name: 'candidates', label: 'Registered Candidates' },
  { name: 'mode', label: 'Exam Mode' },
  { name: 'since', label: 'Registered Since' },
  { name: 'status', label: 'Status' },
];

const initialEntities: readonly Entity[] = [
  { id: 'ENT-1001', name: 'Delhi Public School, Dwarka', type: 'School', state: 'Delhi', candidates: 428, status: 'Active', since: '12 Jan 2024', mode: 'Online + Lab' },
  { id: 'ENT-1002', name: 'Tech Mahindra Ltd.', type: 'Corporate', state: 'Maharashtra', candidates: 1250, status: 'Active', since: '05 Feb 2024', mode: 'Online' },
  { id: 'ENT-1003', name: 'Christ University', type: 'College', state: 'Karnataka', candidates: 892, status: 'Active', since: '18 Jan 2024', mode: 'Lab' },
  { id: 'ENT-1004', name: 'Infosys BPM Limited', type: 'Corporate', state: 'Karnataka', candidates: 2100, status: 'Active', since: '22 Jan 2024', mode: 'Online' },
  { id: 'ENT-1005', name: 'Kendriya Vidyalaya No. 2, Pune', type: 'School', state: 'Maharashtra', candidates: 310, status: 'Active', since: '30 Jan 2024', mode: 'Lab' },
  { id: 'ENT-1006', name: 'Amity University Noida', type: 'College', state: 'Uttar Pradesh', candidates: 750, status: 'Suspended', since: '14 Feb 2024', mode: 'Online + Lab' },
  { id: 'ENT-1007', name: 'HDFC Bank Ltd.', type: 'Corporate', state: 'Maharashtra', candidates: 3200, status: 'Active', since: '08 Feb 2024', mode: 'Online' },
  { id: 'ENT-1008', name: 'Nav Bharat Vidyalaya', type: 'School', state: 'Gujarat', candidates: 185, status: 'Pending Verification', since: '20 May 2024', mode: 'Lab' },
  { id: 'ENT-1009', name: 'Tata Consultancy Services', type: 'Corporate', state: 'Maharashtra', candidates: 4800, status: 'Active', since: '01 Mar 2024', mode: 'Online' },
  { id: 'ENT-1010', name: 'Rajasthan Gramin Bank', type: 'NBFC/Bank', state: 'Rajasthan', candidates: 620, status: 'Pending Verification', since: '21 May 2024', mode: 'Online + Lab' },
];

const statusColors: Record<EntityStatus, { bg: string; color: string }> = {
  Active: { bg: '#DCFCE7', color: '#166534' },
  Suspended: { bg: '#FEE2E2', color: '#991B1B' },
  'Pending Verification': { bg: '#FEF3C7', color: '#92400E' },
};

export default function AdminEntities() {
  const [rows, setRows] = useState<Entity[]>([...initialEntities]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [view, setView] = useState<{ open: boolean; entity: Entity | null }>({ open: false, entity: null });
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const openView = (e: Entity) => { setMenuFor(null); setView({ open: true, entity: e }); };
  const closeView = () => setView({ open: false, entity: null });
  const setStatus = (e: Entity, status: EntityStatus) => {
    setRows((prev) => prev.map((x) => (x.id === e.id ? { ...x, status } : x)));
    setMenuFor(null);
  };

  const pendingCount = rows.filter((e) => e.status === 'Pending Verification').length;

  const filtered = rows.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.id.includes(search);
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchType = typeFilter === 'All' || e.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">Entity Governance</h1>
          <p className="dashboard-subtitle">Manage registered entities, verification status and assessment assignments.</p>
        </div>
        <div className="dashboard-header__actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn--secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} aria-hidden="true" /> Export
          </button>
          <button type="button" className="btn btn--primary" onClick={() => setStatusFilter('Pending Verification')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <Clock size={16} aria-hidden="true" /> Pending Verifications ({pendingCount})
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#F0FDF4', color: 'var(--green)' }}><Building2 size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Total Entities</div><div className="stat-card__value">1,492</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}><CheckCircle2 size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Active</div><div className="stat-card__value">1,486</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#FEF3C7', color: '#D97706' }}><Clock size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Pending Verification</div><div className="stat-card__value">3</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon" style={{ background: '#FEE2E2', color: '#DC2626' }}><XCircle size={22} aria-hidden="true" /></div>
            <div className="stat-card__info"><div className="stat-card__label">Suspended</div><div className="stat-card__value">3</div></div>
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: 0, marginTop: '24px', overflow: 'visible' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '11px', color: 'var(--gray-400)' }} aria-hidden="true" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search entity name or ID..."
                style={{ width: '100%', padding: '9px 14px 9px 40px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '9px 14px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }}>
              <option value="All">All</option><option>Active</option><option>Suspended</option><option>Pending Verification</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: '9px 14px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit' }}>
              <option value="All">All</option><option>School</option><option>College</option><option>Corporate</option><option>NBFC/Bank</option>
            </select>
          </div>

          <table className="dashboard-table" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th>Entity ID</th><th>Entity Name</th><th>Type</th><th>State</th><th>Candidates</th><th>Exam Mode</th><th>Since</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const sc = statusColors[e.status];
                return (
                  <tr key={e.id}>
                    <td style={{ color: 'var(--gray-500)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{e.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{e.name}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-700)', background: 'var(--gray-100)', padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{e.type}</span>
                    </td>
                    <td>{e.state}</td>
                    <td style={{ fontWeight: 600 }}>{e.candidates.toLocaleString()}</td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{e.mode}</span></td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{e.since}</td>
                    <td><span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{e.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', position: 'relative' }}>
                        <button type="button" className="btn btn--sm btn--secondary" onClick={() => openView(e)} style={{ padding: '5px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={13} aria-hidden="true" /> View
                        </button>
                        <button type="button" className="btn btn--sm btn--secondary" aria-label="More actions" onClick={() => setMenuFor((m) => (m === e.id ? null : e.id))} style={{ padding: '5px 8px' }}>
                          <MoreVertical size={14} aria-hidden="true" />
                        </button>
                        {menuFor === e.id && (
                          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', zIndex: 30, minWidth: 150, padding: 6 }}>
                            {e.status === 'Pending Verification' && (
                              <button type="button" className="ent-menu-item" onClick={() => setStatus(e, 'Active')} style={menuItemStyle}>Verify</button>
                            )}
                            {e.status === 'Active' && (
                              <button type="button" className="ent-menu-item" onClick={() => setStatus(e, 'Suspended')} style={menuItemStyle}>Suspend</button>
                            )}
                            {e.status === 'Suspended' && (
                              <button type="button" className="ent-menu-item" onClick={() => setStatus(e, 'Active')} style={menuItemStyle}>Reactivate</button>
                            )}
                            <button type="button" className="ent-menu-item" onClick={() => openView(e)} style={menuItemStyle}>View Details</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderTop: '1px solid var(--gray-200)', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            <span>Showing <strong style={{ color: 'var(--gray-800)' }}>{filtered.length}</strong> of <strong style={{ color: 'var(--gray-800)' }}>1,492</strong> entities</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button type="button" style={pageBtn}><ChevronLeft size={14} aria-hidden="true" /></button>
              <button type="button" style={{ ...pageBtn, border: '1px solid var(--navy)', background: 'var(--navy)', color: 'white' }}>1</button>
              <button type="button" style={pageBtn}>2</button>
              <button type="button" style={pageBtn}>3</button>
              <button type="button" style={pageBtn}><ChevronRight size={14} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>

      <CrudModal open={view.open} title="Entity Details" fields={entityFields} initial={view.entity as unknown as CrudValues | null} readOnly onClose={closeView} onSave={closeView} />
    </main>
  );
}

const menuItemStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'left' as const,
  padding: '8px 12px',
  fontSize: '0.8rem',
  color: 'var(--navy)',
  background: 'transparent',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
};

const pageBtn = {
  padding: '6px 12px',
  border: '1px solid var(--gray-300)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  background: 'white',
  fontSize: '0.8rem',
} as const;
