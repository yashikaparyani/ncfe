'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, FileText, PlayCircle, BookMarked, Library, Download,
  ArrowRight, Search, Info, Clock, type LucideIcon,
} from 'lucide-react';
import PortalTopbar from '@/components/portal/PortalTopbar';
import '@/styles/portal/pages.css';

type Category = 'Study Guide' | 'Practice Paper' | 'Video Lesson' | 'Glossary';

interface Material {
  id: string;
  title: string;
  category: Category;
  subject: string;
  description: string;
  meta: string;
  icon: LucideIcon;
}

const CATEGORY_META: Record<Category, { color: string; bg: string }> = {
  'Study Guide': { color: '#2563EB', bg: '#EFF6FF' },
  'Practice Paper': { color: '#16A34A', bg: '#F0FDF4' },
  'Video Lesson': { color: '#D97706', bg: '#FFFBEB' },
  Glossary: { color: '#7C3AED', bg: '#EDE9FE' },
};

const materials: readonly Material[] = [
  { id: 'REF-1001', title: 'Money Management Handbook', category: 'Study Guide', subject: 'Money & Transactions', description: 'Budgeting, saving and everyday money decisions explained in plain language with worked examples.', meta: 'PDF · 2.4 MB', icon: BookOpen },
  { id: 'REF-1002', title: 'Banking & Credit Essentials', category: 'Study Guide', subject: 'Banking', description: 'Accounts, interest, loans, credit scores and safe digital banking practices.', meta: 'PDF · 3.1 MB', icon: BookOpen },
  { id: 'REF-1003', title: 'Investments & Insurance Primer', category: 'Study Guide', subject: 'Savings & Investments', description: 'Risk, returns, mutual funds, fixed deposits and the basics of insurance cover.', meta: 'PDF · 2.8 MB', icon: BookOpen },
  { id: 'REF-1004', title: 'NFLAT Mock Paper – Set A', category: 'Practice Paper', subject: 'NFLAT', description: 'Full-length 50-question mock matching the live NFLAT format and difficulty.', meta: 'PDF · 50 Qs', icon: FileText },
  { id: 'REF-1005', title: 'FLQ Practice Quiz – Foundation', category: 'Practice Paper', subject: 'FLQ', description: '25 quick questions to warm up before the Financial Literacy Quiz.', meta: 'PDF · 25 Qs', icon: FileText },
  { id: 'REF-1006', title: 'Digital Payments Safety', category: 'Video Lesson', subject: 'Digital Finance', description: 'A short walkthrough of UPI, secure transactions and avoiding fraud.', meta: '12 min', icon: PlayCircle },
  { id: 'REF-1007', title: 'Understanding Compound Interest', category: 'Video Lesson', subject: 'Savings & Investments', description: 'Visual explainer on how compounding grows savings over time.', meta: '9 min', icon: PlayCircle },
  { id: 'REF-1008', title: 'Financial Terms Glossary', category: 'Glossary', subject: 'All Subjects', description: 'A–Z of key financial literacy terms used across NCFE assessments.', meta: 'Web · A–Z', icon: BookMarked },
  { id: 'REF-1009', title: 'Insurance Terms Quick Reference', category: 'Glossary', subject: 'Insurance', description: 'Premiums, claims, riders and the common insurance vocabulary.', meta: 'Web · A–Z', icon: BookMarked },
];

const FILTERS: ReadonlyArray<'All' | Category> = [
  'All', 'Study Guide', 'Practice Paper', 'Video Lesson', 'Glossary',
];

const stats: ReadonlyArray<{ label: string; value: string; color: string; icon: LucideIcon }> = [
  { label: 'Total Resources', value: String(materials.length), color: '#2563EB', icon: Library },
  { label: 'Study Guides', value: String(materials.filter((m) => m.category === 'Study Guide').length), color: '#16A34A', icon: BookOpen },
  { label: 'Practice Papers', value: String(materials.filter((m) => m.category === 'Practice Paper').length), color: '#D97706', icon: FileText },
  { label: 'Video Lessons', value: String(materials.filter((m) => m.category === 'Video Lesson').length), color: '#7C3AED', icon: PlayCircle },
];

export default function ReferenceMaterial() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return materials.filter((m) => {
      const matchC = filter === 'All' || m.category === filter;
      const matchQ = !q || m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
      return matchC && matchQ;
    });
  }, [filter, query]);

  return (
    <div className="dash__main">
      <PortalTopbar name="Rohan Sharma" meta="Candidate ID: CND125678" initials="RS" />

      <div className="dash__content">
        <div className="pg-head">
          <div>
            <h1 className="pg-head__title">Reference Material</h1>
            <p className="pg-head__sub">
              Curated study guides, practice papers and video lessons to help you prepare for your
              NCFE assessments.
            </p>
          </div>
          <div className="pg-head__actions">
            <Link href="/resources" className="btn btn--secondary">
              <Library size={16} aria-hidden="true" /> Resources Library
            </Link>
          </div>
        </div>

        <div className="pg-stats">
          {stats.map((k) => (
            <div className="pg-stat" key={k.label}>
              <div>
                <div className="pg-stat__value" style={{ color: k.color }}>{k.value}</div>
                <div className="pg-stat__label">{k.label}</div>
              </div>
              <div className="pg-stat__icon" style={{ background: `${k.color}15`, color: k.color }}>
                <k.icon size={22} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <p className="pg-banner pg-banner--info">
          <Info size={16} aria-hidden="true" />
          Material is curated by NCFE. File downloads and video playback activate once the content
          service is connected; meanwhile, browse the full resources library.
        </p>

        {/* Toolbar: search + category chips */}
        <div className="pg-list__toolbar" style={{ marginBottom: 8 }}>
          <div className="pg-list__search">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="ref-search">Search reference material</label>
            <input
              id="ref-search"
              type="search"
              className="form__input"
              placeholder="Search by title or subject…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={filter === f ? 'btn btn--sm btn--primary' : 'btn btn--sm btn--secondary'}
              >
                {f === 'All' ? 'All' : `${f}s`}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="dash__section" style={{ padding: 48, textAlign: 'center' }}>
            <Library size={40} aria-hidden="true" style={{ color: 'var(--gray-400)' }} />
            <h2 style={{ color: 'var(--navy)', margin: '12px 0 4px' }}>No material found</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', margin: 0 }}>
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="pg-cert-grid">
            {visible.map((m) => {
              const cm = CATEGORY_META[m.category];
              return (
                <article className="pg-cert" key={m.id}>
                  <header className="pg-cert__ribbon" style={{ background: cm.bg }}>
                    <span className="pg-cert__seal" aria-hidden="true" style={{ background: cm.color }}>
                      <m.icon size={22} />
                    </span>
                    <div>
                      <div className="pg-cert__type" style={{ color: cm.color }}>{m.category}</div>
                      <h2 className="pg-cert__name" style={{ color: 'var(--navy)' }}>{m.title}</h2>
                    </div>
                  </header>

                  <div className="pg-cert__body">
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: '0 0 12px' }}>
                      {m.description}
                    </p>
                    <div className="pg-exam__meta" style={{ marginBottom: 4 }}>
                      <span className="pg-exam__meta-item"><BookMarked size={13} aria-hidden="true" /> {m.subject}</span>
                      <span className="pg-exam__meta-item"><Clock size={13} aria-hidden="true" /> {m.meta}</span>
                    </div>
                  </div>

                  <footer className="pg-cert__actions">
                    <Link href="/resources" className="btn btn--primary btn--sm">
                      Open in Library <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <button type="button" className="btn btn--secondary btn--sm" disabled>
                      <Download size={15} aria-hidden="true" /> Download
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
