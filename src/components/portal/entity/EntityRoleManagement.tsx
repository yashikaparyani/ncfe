'use client';

import { useState } from 'react';
import { Info, Pencil, Plus, Search, Shield } from 'lucide-react';
import PortalTopbar from '../PortalTopbar';
import { CrudModal, type CrudField, type CrudValues } from '../admin/Crud';
import '@/styles/portal/pages.css';
import '@/styles/portal/entity.css';

type RoleStatus = 'Active' | 'Inactive';

interface EntityRole {
  id: string;
  name: string;
  description: string;
  users: number;
  status: RoleStatus;
}

const TOPBAR = {
  name: 'Entity Manager',
  meta: 'Delhi Public School · ENT-1001',
  initials: 'DP',
  avatarColor: 'navy' as const,
};

const PERMISSIONS = [
  'Manage candidates',
  'Manage enrolment',
  'View assessments',
  'Manage exam slots',
  'Manage invigilators',
  'View reports',
  'Manage users',
] as const;

const initialRoles: readonly EntityRole[] = [
  {
    id: 'ROL-E001',
    name: 'Entity Manager',
    description: 'Full operational access except role configuration.',
    users: 1,
    status: 'Active',
  },
  {
    id: 'ROL-E002',
    name: 'Candidate Manager',
    description: 'Register candidates, manage enrolment and approvals.',
    users: 2,
    status: 'Active',
  },
  {
    id: 'ROL-E003',
    name: 'Exam Manager',
    description: 'Create slots, assign invigilators and monitor exams.',
    users: 1,
    status: 'Active',
  },
  {
    id: 'ROL-E004',
    name: 'Viewer',
    description: 'Read-only access to dashboards and reports.',
    users: 1,
    status: 'Active',
  },
];

const roleFields: readonly CrudField[] = [
  { name: 'id', label: 'Role ID' },
  { name: 'name', label: 'Role Name' },
  { name: 'description', label: 'Description' },
  { name: 'users', label: 'Assigned Users' },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
];

export default function EntityRoleManagement() {
  const [roles, setRoles] = useState<EntityRole[]>([...initialRoles]);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<{ mode: 'create' | 'edit' | 'view'; role: EntityRole | null } | null>(
    null,
  );

  const visible = roles.filter((role) => {
    const q = query.trim().toLowerCase();
    return (
      !q ||
      role.name.toLowerCase().includes(q) ||
      role.id.toLowerCase().includes(q) ||
      role.description.toLowerCase().includes(q)
    );
  });

  const roleToValues = (role: EntityRole): CrudValues => ({
    id: role.id,
    name: role.name,
    description: role.description,
    users: role.users,
    status: role.status,
  });

  const saveRole = (values: CrudValues) => {
    const next: EntityRole = {
      id: String(values.id || `ROL-E${String(100 + roles.length + 1)}`),
      name: String(values.name || 'New Role'),
      description: String(values.description || ''),
      users: Number(values.users) || 0,
      status: values.status === 'Inactive' ? 'Inactive' : 'Active',
    };

    if (modal?.mode === 'edit' && modal.role) {
      setRoles((prev) => prev.map((r) => (r.id === modal.role?.id ? { ...next, id: modal.role.id } : r)));
    } else {
      setRoles((prev) => [...prev, next]);
    }
    setModal(null);
  };

  return (
    <div className="dash__main">
      <PortalTopbar {...TOPBAR} />
      <div className="dash__content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Role Management</h1>
            <p className="pg-head__sub">
              Define entity roles and control who can manage candidates, exams and reports.
            </p>
          </div>
          <div className="pg-head__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setModal({ mode: 'create', role: null })}
            >
              <Plus size={16} aria-hidden="true" /> Add Role
            </button>
          </div>
        </header>

        <p className="pg-banner pg-banner--info">
          <Info size={16} aria-hidden="true" />
          Assign roles from the Users page. NCFE retains governance over entity-level super-admin access.
        </p>

        <div className="pg-list">
          <div className="pg-list__toolbar">
            <div className="pg-list__search">
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="role-search">
                Search roles
              </label>
              <input
                id="role-search"
                type="search"
                className="form__input"
                placeholder="Search roles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="entity-roles">
            {visible.map((role) => (
              <article className="entity-role-card" key={role.id}>
                <div className="entity-role-card__icon">
                  <Shield size={20} aria-hidden="true" />
                </div>
                <div className="entity-role-card__body">
                  <div className="entity-role-card__head">
                    <h2 className="entity-role-card__title">{role.name}</h2>
                    <span
                      className={`pg-badge${role.status === 'Active' ? ' pg-badge--active' : ' pg-badge--inactive'}`}
                    >
                      {role.status}
                    </span>
                  </div>
                  <p className="entity-role-card__desc">{role.description}</p>
                  <p className="entity-role-card__meta">
                    {role.id} · {role.users} user{role.users === 1 ? '' : 's'} assigned
                  </p>
                  <ul className="entity-role-card__perms">
                    {PERMISSIONS.slice(0, role.name === 'Viewer' ? 3 : role.name === 'Exam Manager' ? 5 : 7).map(
                      (perm) => (
                        <li key={perm}>{perm}</li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="entity-role-card__actions">
                  <button
                    type="button"
                    className="btn btn--sm btn--secondary"
                    onClick={() => setModal({ mode: 'view', role })}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn--sm btn--secondary"
                    onClick={() => setModal({ mode: 'edit', role })}
                  >
                    <Pencil size={13} aria-hidden="true" /> Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <CrudModal
          open={modal !== null}
          title={
            modal?.mode === 'view'
              ? 'Role Details'
              : modal?.mode === 'edit'
                ? 'Edit Role'
                : 'Add Role'
          }
          fields={roleFields}
          initial={
            modal?.role
              ? roleToValues(modal.role)
              : { id: `ROL-E${String(100 + roles.length + 1)}`, status: 'Active', users: 0 }
          }
          readOnly={modal?.mode === 'view'}
          onClose={() => setModal(null)}
          onSave={saveRole}
        />
      </div>
    </div>
  );
}
