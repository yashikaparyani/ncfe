'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Droplet,
  Contrast,
  Eclipse,
  Sun,
  Underline,
  Type,
  RotateCcw,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './AccessibilityMenu.css';

/** Identifiers for each accessibility action dispatched from the panel. */
export type AccessibilityActionId =
  | 'increase-text'
  | 'decrease-text'
  | 'grayscale'
  | 'high-contrast'
  | 'negative-contrast'
  | 'light-background'
  | 'links-underline'
  | 'readable-font'
  | 'reset';

/** Boolean toggles persisted across visits. Text size is tracked separately. */
type ToggleKey =
  | 'grayscale'
  | 'highContrast'
  | 'negativeContrast'
  | 'lightBackground'
  | 'linksUnderline'
  | 'readableFont';

interface A11yState {
  fontScale: number;
  grayscale: boolean;
  highContrast: boolean;
  negativeContrast: boolean;
  lightBackground: boolean;
  linksUnderline: boolean;
  readableFont: boolean;
}

const STORAGE_KEY = 'ncfe-a11y';

const DEFAULT_SCALE = 1;
const MIN_SCALE = 0.8;
const MAX_SCALE = 1.5;
const SCALE_STEP = 0.1;

const DEFAULT_STATE: A11yState = {
  fontScale: DEFAULT_SCALE,
  grayscale: false,
  highContrast: false,
  negativeContrast: false,
  lightBackground: false,
  linksUnderline: false,
  readableFont: false,
};

/** Maps each toggle to the `<html>` class that activates its CSS in globals.css. */
const TOGGLE_CLASS: Record<ToggleKey, string> = {
  grayscale: 'a11y-grayscale',
  negativeContrast: 'a11y-invert',
  highContrast: 'a11y-high-contrast',
  lightBackground: 'a11y-light-bg',
  linksUnderline: 'a11y-underline',
  readableFont: 'a11y-readable',
};

/** Maps a toggle action id to its state key. One-shot actions are absent. */
const ACTION_TO_TOGGLE: Partial<Record<AccessibilityActionId, ToggleKey>> = {
  grayscale: 'grayscale',
  'high-contrast': 'highContrast',
  'negative-contrast': 'negativeContrast',
  'light-background': 'lightBackground',
  'links-underline': 'linksUnderline',
  'readable-font': 'readableFont',
};

const clampScale = (value: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 10) / 10));

function readStoredState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<A11yState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      fontScale: clampScale(Number(parsed.fontScale) || DEFAULT_SCALE),
    };
  } catch {
    return DEFAULT_STATE;
  }
}

interface AccessibilityOption {
  id: AccessibilityActionId;
  label: string;
  icon: LucideIcon;
  /** Toggle options reflect an on/off state; one-shot actions (text size, reset) do not. */
  toggle: boolean;
}

const OPTIONS: readonly AccessibilityOption[] = [
  { id: 'increase-text', label: 'Increase Text', icon: ZoomIn, toggle: false },
  { id: 'decrease-text', label: 'Decrease Text', icon: ZoomOut, toggle: false },
  { id: 'grayscale', label: 'Grayscale', icon: Droplet, toggle: true },
  { id: 'high-contrast', label: 'High Contrast', icon: Contrast, toggle: true },
  { id: 'negative-contrast', label: 'Negative Contrast', icon: Eclipse, toggle: true },
  { id: 'light-background', label: 'Light Background', icon: Sun, toggle: true },
  { id: 'links-underline', label: 'Links Underline', icon: Underline, toggle: true },
  { id: 'readable-font', label: 'Readable Font', icon: Type, toggle: true },
  { id: 'reset', label: 'Reset', icon: RotateCcw, toggle: false },
] as const;

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Restore saved preferences once, after mount (localStorage is client-only).
  useEffect(() => {
    setState(readStoredState());
    setHydrated(true);
  }, []);

  // Reflect state onto <html> and persist. Gated on `hydrated` so the initial
  // default render never clobbers stored preferences before they load.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.style.setProperty('--font-scale', String(state.fontScale));
    root.classList.toggle(TOGGLE_CLASS.grayscale, state.grayscale);
    root.classList.toggle(TOGGLE_CLASS.negativeContrast, state.negativeContrast);
    root.classList.toggle(TOGGLE_CLASS.highContrast, state.highContrast);
    root.classList.toggle(TOGGLE_CLASS.lightBackground, state.lightBackground);
    root.classList.toggle(TOGGLE_CLASS.linksUnderline, state.linksUnderline);
    root.classList.toggle(TOGGLE_CLASS.readableFont, state.readableFont);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode, quota) — apply visually anyway */
    }
  }, [state, hydrated]);

  // Close on outside click and on Escape; restore focus to the trigger on Escape.
  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleAction = useCallback((id: AccessibilityActionId) => {
    setState((prev) => {
      switch (id) {
        case 'increase-text':
          return { ...prev, fontScale: clampScale(prev.fontScale + SCALE_STEP) };
        case 'decrease-text':
          return { ...prev, fontScale: clampScale(prev.fontScale - SCALE_STEP) };
        case 'reset':
          return { ...DEFAULT_STATE };
        // High contrast and light background are opposite schemes — turning one
        // on turns the other off.
        case 'high-contrast':
          return { ...prev, highContrast: !prev.highContrast, lightBackground: false };
        case 'light-background':
          return { ...prev, lightBackground: !prev.lightBackground, highContrast: false };
        default: {
          const key = ACTION_TO_TOGGLE[id];
          return key ? { ...prev, [key]: !prev[key] } : prev;
        }
      }
    });
  }, []);

  // Does an option currently read as "on"? (one-shot actions never do)
  const isPressed = (id: AccessibilityActionId): boolean => {
    const key = ACTION_TO_TOGGLE[id];
    return key ? state[key] : false;
  };

  const anyActive =
    state.fontScale !== DEFAULT_SCALE ||
    state.grayscale ||
    state.highContrast ||
    state.negativeContrast ||
    state.lightBackground ||
    state.linksUnderline ||
    state.readableFont;

  return (
    <div className="a11y" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`a11y__trigger${open ? ' a11y__trigger--open' : ''}${
          anyActive ? ' a11y__trigger--active' : ''
        }`}
        aria-label="Accessibility tools"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Accessibility size={18} aria-hidden="true" />
      </button>

      {open && (
        <div id={panelId} className="a11y__panel" role="dialog" aria-label="Accessibility tools">
          <div className="a11y__panel-header">
            <h2 className="a11y__panel-title">Accessibility Tools</h2>
            <button
              type="button"
              className="a11y__close"
              aria-label="Close accessibility tools"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="a11y__grid" role="group" aria-label="Accessibility options">
            {OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const pressed = isPressed(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  className="a11y__option"
                  onClick={() => handleAction(opt.id)}
                  {...(opt.toggle ? { 'aria-pressed': pressed } : {})}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="a11y__option-label">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
