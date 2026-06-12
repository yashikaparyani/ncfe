'use client';

import { useMemo, useState } from 'react';
import { Info, Plus, Search } from 'lucide-react';
import PortalTopbar from '../PortalTopbar';
import { CrudModal, RowActions, type CrudField, type CrudValues } from '../admin/Crud';
import '@/styles/portal/pages.css';

type InvigilatorStatus = 'Active' | 'Pending' | 'Inactive';

interface Invigilator {
  id: string;
  name: string;
  lab: string;
  status: InvigilatorStatus;
}

const TOPBAR = {
  name: 'Entity Manager',
  meta: 'Delhi Public School · ENT-1001',
  initials: 'DP',
  avatarColor: 'navy' as const,
};

const initialRows: readonly Invigilator[] = [
  { id: 'INV-1001', name: 'Ramesh Pillai', lab: 'Lab A', status: 'Active' },
  { id: 'INV-1002', name: 'Sunita Nair', lab: 'Lab A', status: 'Active' },
  { id: 'INV-1003', name: 'Arvind Menon', lab: 'Lab B', status: 'Pending' },
  { id: 'INV-1004', name: 'Kavya Reddy', lab: 'Lab C', status: 'Active' },
  { id: 'INV-1005', name: 'Imran Sheikh', lab: 'Lab C', status: 'Inactive' },
];

const BADGE: Record<InvigilatorStatus, string> = {
  Active: 'pg-badge pg-badge--active',
  Pending: 'pg-badge pg-badge--pending',
  Inactive: 'pg-badge pg-badge--inactive',
};

const invigilatorFields: readonly CrudField[] = [
  { name: 'id', label: 'Invigilator ID' },
  { name: 'name', label: 'Name' },
  { name: 'lab', label: 'Assigned Lab', type: 'select', options: ['Lab A', 'Lab B', 'Lab C', 'Lab D'] },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Inactive'] },
];

export default function EntityInvigilators() {
  const [rows, setRows] = useState<Invigilator[]>([...initialRows]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All Status' | InvigilatorStatus>('All Status');
  const [modal, setModal] = useState<{ mode: 'create' | 'edit'; row: Invigilator | null } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ =
        !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.lab.toLowerCase().includes(q);
      const matchS = statusFilter === 'All Status' || r.status === statusFilter;
      return matchQ && matchS;
    });
  }, [rows, query, statusFilter]);

  const toValues = (row: Invigilator): CrudValues => ({
    id: row.id,
    name: row.name,
    lab: row.lab,
    status: row.status,
  });

  const normalizeStatus = (value: unknown): InvigilatorStatus => {
    if (value === 'Pending' || value === 'Inactive') return value;
    return 'Active';
  };

  const save = (values: CrudValues) => {
    const next: Invigilator = {
      id: String(values.id || `INV-${1000 + rows.length + 1}`),
      name: String(values.name || 'New Invigilator'),
      lab: String(values.lab || 'Lab A'),
      status: normalizeStatus(values.status),
    };

    if (modal?.mode === 'edit' && modal.row) {
      setRows((prev) => prev.map((r) => (r.id === modal.row?.id ? { ...next, id: modal.row.id } : r)));
    } else {
      setRows((prev) => [next, ...prev]);
    }
    setModal(null);
  };

  return (
    <div className="dash__main">
      <PortalTopbar {...TOPBAR} />
      <div className="dash__content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Invigilators</h1>
            <p className="pg-head__sub">
              Register invigilators and assign them to exam labs. Deactivation uses Inactive status.
            </p>
          </div>
          <div className="pg-head__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setModal({ mode: 'create', row: null })}
            >
              <Plus size={16} aria-hidden="true" /> Add Invigilator
            </button>
          </div>
        </header>

        <div className="pg-list">
          <div className="pg-list__toolbar">
            <div className="pg-list__search">
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="inv-search">
                Search invigilators
              </label>
              <input
                id="inv-search"
                type="search"
                className="form__input"
                placeholder="Search invigilators…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="inv-status">
                Filter by status
              </label>
              <select
                id="inv-status"
                className="form__select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All Status' | InvigilatorStatus)}
                style={{ minWidth: 150 }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <p className="pg-list__note">
            <Info size={14} aria-hidden="true" />
            Invigilators cannot be deleted — set status to Inactive instead.
          </p>

          <table className="pg-list__table">
            <thead>
              <tr>
                <th scope="col">ID / Name</th>
                <th scope="col">Lab</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="pg-list__name">{r.name}</div>
                    <div className="pg-list__id">ID: {r.id}</div>
                  </td>
                  <td>{r.lab}</td>
                  <td>
                    <span className={BADGE[r.status]}>{r.status}</span>
                  </td>
                  <td>
                    <RowActions onEdit={() => setModal({ mode: 'edit', row: r })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CrudModal
          open={modal !== null}
          title={modal?.mode === 'edit' ? 'Edit Invigilator' : 'Add Invigilator'}
          fields={invigilatorFields}
          initial={
            modal?.row
              ? toValues(modal.row)
              : { id: `INV-${1000 + rows.length + 1}`, status: 'Active', lab: 'Lab A' }
          }
          onClose={() => setModal(null)}
          onSave={save}
        />
      </div>
    </div>
  );
}
