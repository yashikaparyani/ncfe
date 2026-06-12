'use client';

import { useId, type ReactNode } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

/**
 * Accessible, controlled form-field primitives shared by both registration
 * wizards. Every control is label-associated (`htmlFor`/`id`), exposes
 * `aria-invalid` + `aria-describedby` when in error, and renders the error in a
 * `role="alert"` node — meeting WCAG 2.1 AA / GIGW per web/CLAUDE.md §4.
 */

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="wzd__error" role="alert">
      {message}
    </p>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  maxLength?: number;
  optional?: boolean;
  hint?: string;
  icon?: ReactNode;
}

export function TextField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  optional,
  hint,
  icon,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className="wzd__field">
      <label className="wzd__label" htmlFor={id}>
        {label}
        {optional && <span className="wzd__optional"> (optional)</span>}
      </label>
      <div className={icon ? 'wzd__input-wrap' : undefined}>
        {icon && (
          <span className="wzd__input-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`wzd__input${icon ? ' wzd__input--with-icon' : ''}`}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {hint && !error && (
        <p id={hintId} className="wzd__hint">
          {hint}
        </p>
      )}
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  error?: string;
  placeholder?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
}: SelectFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="wzd__field">
      <label className="wzd__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="wzd__select"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}

export function CheckboxField({ checked, onChange, error, children }: CheckboxFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="wzd__checkbox-block">
      <label className="wzd__checkbox-label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="wzd__checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{children}</span>
      </label>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

interface FileFieldProps {
  label: string;
  accept: string;
  hint: string;
  fileName: string;
  error?: string;
  optional?: boolean;
  icon: ReactNode;
  onSelect: (file: File | null) => void;
}

export function FileField({
  label,
  accept,
  hint,
  fileName,
  error,
  optional,
  icon,
  onSelect,
}: FileFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="wzd__field">
      <label className="wzd__label" htmlFor={id}>
        {label}
        {optional && <span className="wzd__optional"> (optional)</span>}
      </label>
      <label className="wzd__upload-box" htmlFor={id}>
        {fileName ? (
          <CheckCircle2 className="wzd__upload-icon wzd__upload-icon--done" aria-hidden="true" />
        ) : (
          <span className="wzd__upload-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="wzd__upload-text">
          {fileName ? (
            <strong>{fileName}</strong>
          ) : (
            <>
              <strong>Click to upload</strong> — {hint}
            </>
          )}
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
        />
      </label>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export { UploadCloud };
