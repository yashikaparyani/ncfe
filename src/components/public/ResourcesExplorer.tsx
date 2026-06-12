'use client';

import { useMemo, useState } from 'react';
import { Search, FileText, Video, Download, BookOpen } from 'lucide-react';

type Resource = {
  id: number;
  type: 'Guide' | 'Video' | 'Worksheet';
  icon: typeof BookOpen;
  title: string;
  desc: string;
  tag: string | null;
};

const RESOURCES: Resource[] = [
  { id: 1, type: 'Guide', icon: BookOpen, title: 'Financial Literacy Handbook', desc: 'A comprehensive guide covering budgeting, saving, and investing basics.', tag: 'Popular' },
  { id: 2, type: 'Video', icon: Video, title: 'Understanding Mutual Funds', desc: 'A 15-minute primer on how mutual funds work and how to evaluate them.', tag: 'New' },
  { id: 3, type: 'Worksheet', icon: FileText, title: 'Monthly Budget Planner', desc: 'A downloadable worksheet to plan and track monthly expenses.', tag: null },
  { id: 4, type: 'Guide', icon: BookOpen, title: 'Insurance Essentials', desc: 'Learn the fundamentals of life, health, and general insurance.', tag: null },
  { id: 5, type: 'Video', icon: Video, title: 'Tax Planning Basics', desc: 'An introduction to income tax, deductions, and smart tax planning.', tag: null },
  { id: 6, type: 'Worksheet', icon: FileText, title: 'Retirement Goal Calculator', desc: 'Estimate how much you need to save for a comfortable retirement.', tag: null },
];

const TYPES = ['All', 'Guide', 'Video', 'Worksheet'] as const;

export default function ResourcesExplorer() {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<(typeof TYPES)[number]>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const matchesType = activeType === 'All' || r.type === activeType;
      const matchesQuery =
        q === '' || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, activeType]);

  return (
    <>
      <div className="resources-toolbar">
        <div className="resources-search">
          <Search size={18} aria-hidden="true" />
          <input
            className="form__input"
            type="search"
            placeholder="Search resources..."
            aria-label="Search resources"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="resources-filters" role="group" aria-label="Filter by type">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`resources-filter${activeType === t ? ' resources-filter--active' : ''}`}
              aria-pressed={activeType === t}
              onClick={() => setActiveType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-grid">
        {filtered.map((r) => (
          <article className="resource-card" key={r.id}>
            <div className="resource-card__top">
              <div className="resource-card__icon">
                <r.icon size={22} aria-hidden="true" />
              </div>
              {r.tag && <span className="resource-card__tag">{r.tag}</span>}
            </div>
            <span className="resource-card__type">{r.type}</span>
            <h2 className="resource-card__title">{r.title}</h2>
            <p className="resource-card__desc">{r.desc}</p>
            <button type="button" className="resource-card__action">
              <Download size={16} aria-hidden="true" /> Download
            </button>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="resources-empty">No resources found matching your search.</p>
        )}
      </div>
    </>
  );
}
