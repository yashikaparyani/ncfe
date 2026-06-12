'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Search, Info } from 'lucide-react';
import PortalTopbar from './PortalTopbar';
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
 * Presentational list page used by the placeholder sidebar routes. It renders
 * a header, optional KPI cards, a searchable/filterable table and static
 * pagination. Data is demo-only and held in props — there are NO mutations
 * (no create/edit/delete) until the backend API is wired, per the chosen
 * "presentational + client validation" scope. Filtering is client-side only.
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
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All Status' | ListStatus>('All Status');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category))).sort((a, b) => a.localeCompare(b)),
    [rows],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      const matchS = status === 'All Status' || r.status === status;
      const matchC = !filterByCategory || category === 'All' || r.category === category;
      return matchQ && matchS && matchC;
    });
  }, [rows, query, status, category, filterByCategory]);

  const body = (
    <>
      <header className="pg-head">
        <div>
          <h1 className="pg-head__title">{title}</h1>
          <p className="pg-head__sub">{subtitle}</p>
        </div>
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

        <p className="pg-list__note">
          <Info size={14} aria-hidden="true" />
          Demo data — create, edit and export actions activate once the backend API is connected.
        </p>

        <table className="pg-list__table">
          <thead>
            <tr>
              <th scope="col">ID / Name</th>
              <th scope="col">{categoryLabel}</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="pg-list__empty" colSpan={3}>
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
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pg-list__footer">
          <div>
            Showing <strong>{visible.length}</strong> of <strong>{rows.length}</strong> records
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
