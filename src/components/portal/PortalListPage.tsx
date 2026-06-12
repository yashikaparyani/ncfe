'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Search, Info, Plus } from 'lucide-react';
import PortalTopbar from './PortalTopbar';
import {
  ConfirmModal,
  CrudModal,
  RowActions,
  type CrudField,
  type CrudValues,
} from './admin/Crud';
import '@/styles/portal/pages.css';

export type ListStatus = 'Active' | 'Pending' | 'Inactive';

export interface ListRow {
  id: string;
  name: string;
  category: string;
  status: ListStatus;
}

export interface ListStat {
  label: string;
  value: string;
  /** Accent colour for the value + icon bubble (status hue, no token). */
  color: string;
  bg: string;
  /**
   * A rendered icon element, e.g. `<Users size={22} aria-hidden />`. Passed as
   * a ReactNode (not a component reference) so it crosses the Server → Client
   * Component boundary; the bubble's `color` cascades to the SVG via
   * currentColor.
   */
  icon: ReactNode;
}

const BADGE_CLASS: Record<ListStatus, string> = {
  Active: 'pg-badge pg-badge--active',
  Pending: 'pg-badge pg-badge--pending',
  Inactive: 'pg-badge pg-badge--inactive',
};

interface TopbarConfig {
  name: string;
  meta: string;
  initials: string;
  avatarColor?: 'orange' | 'navy';
}

/**
 * List page used by placeholder sidebar routes. Renders a header, optional KPI
 * cards, a searchable/filterable table and pagination. Admin shell pages (or
 * `enableCrud`) get client-side create/view/edit/delete via CrudModal; changes
 * are session-only until the backend API is wired. Filtering is client-side.
 */
export default function PortalListPage({
  title,
  subtitle,
  categoryLabel,
  rows,
  stats,
  shell = 'dash',
  topbar,
  searchLabel,
  filterByCategory = false,
  enableCrud,
  moreInfoOnly = false,
  editWithoutDelete = false,
  hideDemoNote = false,
}: {
  title: string;
  subtitle: string;
  categoryLabel: string;
  rows: readonly ListRow[];
  stats?: readonly ListStat[];
  shell?: 'dash' | 'admin';
  topbar?: TopbarConfig;
  searchLabel?: string;
  /**
   * When true, render an additional dropdown that filters by the `category`
   * column (e.g. entity type). Options are derived from the rows' distinct
   * categories. Defaults to false to keep existing list pages unchanged.
   */
  filterByCategory?: boolean;
  enableCrud?: boolean;
  /** Read-only "More Info" action per row (no edit/delete). */
  moreInfoOnly?: boolean;
  /** Create + edit without delete (entity invigilators, etc.). */
  editWithoutDelete?: boolean;
  hideDemoNote?: boolean;
}) {
  const crudEnabled = enableCrud ?? shell === 'admin';
  const showActions = crudEnabled || moreInfoOnly || editWithoutDelete;
  const [items, setItems] = useState<ListRow[]>(() => [...rows]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All Status' | ListStatus>('All Status');
  const [category, setCategory] = useState('All');
  const [modal, setModal] = useState<{ mode: 'create' | 'view' | 'edit'; row: ListRow | null } | null>(
    null,
  );
  const [confirm, setConfirm] = useState<ListRow | null>(null);

  useEffect(() => {
    setItems([...rows]);
  }, [rows]);

  const categories = useMemo(
    () => Array.from(new Set(items.map((r) => r.category))).sort((a, b) => a.localeCompare(b)),
    [items],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((r) => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      const matchS = status === 'All Status' || r.status === status;
      const matchC = !filterByCategory || category === 'All' || r.category === category;
      return matchQ && matchS && matchC;
    });
  }, [items, query, status, category, filterByCategory]);

  const crudFields: readonly CrudField[] = [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'category', label: categoryLabel },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Inactive'] },
  ];

  const nextId = () => {
    const prefix = items[0]?.id.match(/^[A-Z]+/)?.[0] ?? 'ADM';
    return `${prefix}-${String(1000 + items.length + 1)}`;
  };

  const normalizeStatus = (value: unknown): ListStatus => {
    if (value === 'Pending' || value === 'Inactive') return value;
    return 'Active';
  };

  const valuesToRow = (values: CrudValues, fallbackId: string): ListRow => ({
    id: String(values.id || fallbackId),
    name: String(values.name || 'Untitled record'),
    category: String(values.category || 'General'),
    status: normalizeStatus(values.status),
  });

  const rowToCrudValues = (row: ListRow): CrudValues => ({
    id: row.id,
    name: row.name,
    category: row.category,
    status: row.status,
  });

  const handleSave = (values: CrudValues) => {
    if (modal?.mode === 'edit' && modal.row) {
      const updated = valuesToRow(values, modal.row.id);
      setItems((prev) => prev.map((r) => (r.id === modal.row?.id ? updated : r)));
    } else {
      const created = valuesToRow(values, nextId());
      setItems((prev) => [created, ...prev]);
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (confirm) setItems((prev) => prev.filter((r) => r.id !== confirm.id));
    setConfirm(null);
  };

  const body = (
    <>
      <header className="pg-head">
        <div>
          <h1 className="pg-head__title">{title}</h1>
          <p className="pg-head__sub">{subtitle}</p>
        </div>
        {(crudEnabled || editWithoutDelete) && (
          <div className="pg-head__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setModal({ mode: 'create', row: null })}
            >
              <Plus size={16} aria-hidden="true" /> Add Record
            </button>
          </div>
        )}
      </header>

      {stats && stats.length > 0 && (
        <div className="pg-stats">
          {stats.map((s) => (
            <div className="pg-stat" key={s.label}>
              <div>
                <div className="pg-stat__value" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="pg-stat__label">{s.label}</div>
              </div>
              <div className="pg-stat__icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pg-list">
        <div className="pg-list__toolbar">
          <div className="pg-list__search">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="pg-search">
              {searchLabel ?? `Search ${title}`}
            </label>
            <input
              id="pg-search"
              type="search"
              className="form__input"
              placeholder={`Search ${title}…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {filterByCategory && (
            <div>
              <label className="sr-only" htmlFor="pg-category">
                Filter by {categoryLabel.toLowerCase()}
              </label>
              <select
                id="pg-category"
                className="form__select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ minWidth: 150 }}
              >
                <option value="All">All {categoryLabel}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="sr-only" htmlFor="pg-status">
              Filter by status
            </label>
            <select
              id="pg-status"
              className="form__select"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'All Status' | ListStatus)}
              style={{ minWidth: 150 }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {!hideDemoNote && (
          <p className="pg-list__note">
            <Info size={14} aria-hidden="true" />
            Demo data — changes are saved in this browser session only.
          </p>
        )}

        <table className="pg-list__table">
          <thead>
            <tr>
              <th scope="col">ID / Name</th>
              <th scope="col">{categoryLabel}</th>
              <th scope="col">Status</th>
              {showActions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="pg-list__empty" colSpan={showActions ? 4 : 3}>
                  No records match your search.
                </td>
              </tr>
            ) : (
              visible.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="pg-list__name">{r.name}</div>
                    <div className="pg-list__id">ID: {r.id}</div>
                  </td>
                  <td>{r.category}</td>
                  <td>
                    <span className={BADGE_CLASS[r.status]}>{r.status}</span>
                  </td>
                  {showActions && (
                    <td>
                      {moreInfoOnly ? (
                        <button
                          type="button"
                          className="btn btn--sm btn--secondary"
                          onClick={() => setModal({ mode: 'view', row: r })}
                        >
                          More Info
                        </button>
                      ) : (
                        <RowActions
                          onView={crudEnabled ? () => setModal({ mode: 'view', row: r }) : undefined}
                          onEdit={() => setModal({ mode: 'edit', row: r })}
                          onDelete={crudEnabled ? () => setConfirm(r) : undefined}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pg-list__footer">
          <div>
            Showing <strong>{visible.length}</strong> of <strong>{items.length}</strong> records
          </div>
          <div className="pg-list__pages">
            <button type="button" className="btn btn--sm btn--secondary" disabled>
              Previous
            </button>
            <button type="button" className="btn btn--sm btn--secondary" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {(crudEnabled || moreInfoOnly || editWithoutDelete) && (
        <>
          <CrudModal
            open={modal !== null}
            title={
              modal?.mode === 'view'
                ? moreInfoOnly
                  ? `${title} — More Info`
                  : `${title} Details`
                : modal?.mode === 'edit'
                  ? `Edit ${title}`
                  : `Add ${title}`
            }
            fields={crudFields}
            initial={modal?.row ? rowToCrudValues(modal.row) : { id: nextId(), status: 'Active' }}
            readOnly={modal?.mode === 'view'}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
          {crudEnabled && (
            <ConfirmModal
              open={confirm !== null}
              title="Delete Record"
              message={confirm ? `Delete ${confirm.name} (${confirm.id})? This cannot be undone.` : ''}
              confirmLabel="Delete"
              onConfirm={handleDelete}
              onClose={() => setConfirm(null)}
            />
          )}
        </>
      )}
    </>
  );

  if (shell === 'admin') {
    return (
      <main className="dashboard-main">
        <div className="dashboard-content">{body}</div>
      </main>
    );
  }

  return (
    <div className="dash__main">
      {topbar && (
        <PortalTopbar
          name={topbar.name}
          meta={topbar.meta}
          initials={topbar.initials}
          avatarColor={topbar.avatarColor}
        />
      )}
      <div className="dash__content">{body}</div>
    </div>
  );
}
