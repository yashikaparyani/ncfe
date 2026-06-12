'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, Info, Plus, Search, Users } from 'lucide-react';
import PortalTopbar from '../PortalTopbar';
import { CrudModal, type CrudField, type CrudValues } from '../admin/Crud';
import '@/styles/portal/pages.css';

type EnrolStatus = 'Enrolled' | 'Pending' | 'Rejected';

interface EnrolmentRow {
  id: string;
  candidate: string;
  assessment: string;
  slot: string;
  status: EnrolStatus;
}

const TOPBAR = {
  name: 'Entity Manager',
  meta: 'Delhi Public School · ENT-1001',
  initials: 'DP',
  avatarColor: 'navy' as const,
};

const initialRows: readonly EnrolmentRow[] = [
  { id: 'ENR-1001', candidate: 'Rohan Kumar', assessment: 'NFLAT – Class 10', slot: '15 May 2024 · 10:00 AM', status: 'Pending' },
  { id: 'ENR-1002', candidate: 'Priya Singh', assessment: 'FLQ Quiz – Foundation', slot: '20 Apr 2024 · 11:00 AM', status: 'Enrolled' },
  { id: 'ENR-1003', candidate: 'Ankit Verma', assessment: 'Money Smart Assessment', slot: 'Awaiting slot', status: 'Pending' },
  { id: 'ENR-1004', candidate: 'Neha Gupta', assessment: 'Banking Basics Test', slot: '05 Jun 2024 · 10:00 AM', status: 'Enrolled' },
  { id: 'ENR-1005', candidate: 'Vikram Das', assessment: 'NFLAT – Class 10', slot: '—', status: 'Rejected' },
];

const BADGE: Record<EnrolStatus, string> = {
  Enrolled: 'pg-badge pg-badge--active',
  Pending: 'pg-badge pg-badge--pending',
  Rejected: 'pg-badge pg-badge--inactive',
};

const enrolFields: readonly CrudField[] = [
  { name: 'candidate', label: 'Candidate Name' },
  { name: 'assessment', label: 'Assessment', type: 'select', options: ['NFLAT – Class 10', 'FLQ Quiz – Foundation', 'Money Smart Assessment', 'Banking Basics Test'] },
  { name: 'slot', label: 'Exam Slot' },
  { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Enrolled', 'Rejected'] },
];

export default function EntityEnrolment() {
  const [rows, setRows] = useState<EnrolmentRow[]>([...initialRows]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | EnrolStatus>('All');
  const [modal, setModal] = useState<'create' | null>(null);

  const stats = useMemo(
    () => ({
      total: rows.length,
      enrolled: rows.filter((r) => r.status === 'Enrolled').length,
      pending: rows.filter((r) => r.status === 'Pending').length,
    }),
    [rows],
  );

  const visible = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      r.candidate.toLowerCase().includes(q) ||
      r.assessment.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || r.status === statusFilter;
    return matchQ && matchS;
  });

  const saveEnrolment = (values: CrudValues) => {
    const created: EnrolmentRow = {
      id: `ENR-${1000 + rows.length + 1}`,
      candidate: String(values.candidate || 'New Candidate'),
      assessment: String(values.assessment || 'NFLAT – Class 10'),
      slot: String(values.slot || 'Awaiting slot'),
      status: (values.status as EnrolStatus) || 'Pending',
    };
    setRows((prev) => [created, ...prev]);
    setModal(null);
  };

  return (
    <div className="dash__main">
      <PortalTopbar {...TOPBAR} />
      <div className="dash__content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Enrolment</h1>
            <p className="pg-head__sub">
              Enrol candidates in assessments and assign exam slots for approval.
            </p>
          </div>
          <div className="pg-head__actions">
            <button type="button" className="btn btn--primary" onClick={() => setModal('create')}>
              <Plus size={16} aria-hidden="true" /> New Enrolment
            </button>
          </div>
        </header>

        <div className="pg-stats">
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#2563EB' }}>
                {stats.total}
              </div>
              <div className="pg-stat__label">Total Requests</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Users size={22} aria-hidden="true" />
            </div>
          </div>
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#16A34A' }}>
                {stats.enrolled}
              </div>
              <div className="pg-stat__label">Enrolled</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <CheckCircle2 size={22} aria-hidden="true" />
            </div>
          </div>
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#D97706' }}>
                {stats.pending}
              </div>
              <div className="pg-stat__label">Pending</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <Clock size={22} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="pg-list">
          <div className="pg-list__toolbar">
            <div className="pg-list__search">
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="enrol-search">
                Search enrolments
              </label>
              <input
                id="enrol-search"
                type="search"
                className="form__input"
                placeholder="Search candidate or assessment…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="enrol-status">
                Filter by status
              </label>
              <select
                id="enrol-status"
                className="form__select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | EnrolStatus)}
                style={{ minWidth: 150 }}
              >
                <option value="All">All Status</option>
                <option>Enrolled</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <p className="pg-list__note">
            <Info size={14} aria-hidden="true" />
            Demo data — enrolment requests are session-only until the API is wired.
          </p>

          <table className="pg-list__table">
            <thead>
              <tr>
                <th scope="col">ID / Candidate</th>
                <th scope="col">Assessment</th>
                <th scope="col">Slot (IST)</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td className="pg-list__empty" colSpan={4}>
                    No enrolments match your search.
                  </td>
                </tr>
              ) : (
                visible.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="pg-list__name">{r.candidate}</div>
                      <div className="pg-list__id">ID: {r.id}</div>
                    </td>
                    <td>{r.assessment}</td>
                    <td>{r.slot}</td>
                    <td>
                      <span className={BADGE[r.status]}>{r.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <CrudModal
          open={modal === 'create'}
          title="New Enrolment"
          fields={enrolFields}
          initial={{ status: 'Pending', slot: 'Awaiting slot' }}
          onClose={() => setModal(null)}
          onSave={saveEnrolment}
        />
      </div>
    </div>
  );
}
