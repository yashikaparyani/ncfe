'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Eye, Pencil, Trash2, X, AlertTriangle } from 'lucide-react';

export interface CrudField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'select';
  options?: readonly string[];
}

// A loose record so typed row objects (e.g. an Entity) can be passed as
// `initial` for the view modal; values are coerced to strings on render.
export type CrudValues = Record<string, unknown>;

const actionBase = {
  padding: '5px 8px',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
} as const;

/** Row-level CRUD action buttons. Pass only the handlers you want shown. */
export function RowActions({
  onView,
  onEdit,
  onDelete,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="row-actions" style={{ display: 'flex', gap: '6px' }}>
      {onView && (
        <button type="button" title="View" onClick={onView} style={{ ...actionBase, background: 'var(--gray-100)', color: 'var(--gray-700)' }}>
          <Eye size={14} aria-hidden="true" />
        </button>
      )}
      {onEdit && (
        <button type="button" title="Edit" onClick={onEdit} style={{ ...actionBase, background: '#EFF6FF', color: '#1D4ED8' }}>
          <Pencil size={14} aria-hidden="true" />
        </button>
      )}
      {onDelete && (
        <button type="button" title="Delete" onClick={onDelete} style={{ ...actionBase, background: '#FEE2E2', color: '#991B1B' }}>
          <Trash2 size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** Confirmation modal for destructive actions (replaces window.confirm). */
export function ConfirmModal({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}: {
  open: boolean;
  title?: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(11,37,69,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '24px' }}>
          <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>{title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>{message}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
          <button type="button" className="btn btn--secondary" onClick={onClose}>{cancelLabel}</button>
          <button type="button" className="btn" onClick={onConfirm} style={{ background: '#DC2626', color: 'var(--white)' }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/** Config-driven create/edit/view modal. */
export function CrudModal({
  open,
  title,
  fields = [],
  initial,
  onClose,
  onSave,
  readOnly = false,
}: {
  open: boolean;
  title: string;
  fields?: readonly CrudField[];
  initial?: CrudValues | null;
  onClose: () => void;
  onSave: (values: CrudValues) => void;
  readOnly?: boolean;
}) {
  const [values, setValues] = useState<CrudValues>({});

  useEffect(() => {
    if (open) setValues(initial ?? {});
  }, [open, initial]);

  if (!open) return null;

  const setField = (name: string, v: string) => setValues((prev) => ({ ...prev, [name]: v }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(values);
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(11,37,69,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--gray-200)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)' }}>{title}</h3>
          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
            {fields.map((f) => {
              const raw = values[f.name];
              const value = raw == null ? '' : String(raw);
              return (
                <div key={f.name} className="form__group" style={{ margin: 0 }}>
                  <label className="form__label" htmlFor={`crud-${f.name}`}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select id={`crud-${f.name}`} className="form__select" value={value} onChange={(e) => setField(f.name, e.target.value)} disabled={readOnly}>
                      <option value="">Select…</option>
                      {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input id={`crud-${f.name}`} type={f.type ?? 'text'} className="form__input" value={value} onChange={(e) => setField(f.name, e.target.value)} placeholder={f.label} readOnly={readOnly} />
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
            <button type="button" className="btn btn--secondary" onClick={onClose}>{readOnly ? 'Close' : 'Cancel'}</button>
            {!readOnly && <button type="submit" className="btn btn--primary">Save</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
