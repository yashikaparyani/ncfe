'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderTree,
  Layers,
  Plus,
  Search,
} from 'lucide-react';
import '@/styles/portal/pages.css';

type TopicStatus = 'Active' | 'Draft';

interface TopicNode {
  id: string;
  name: string;
  questions: number;
  status: TopicStatus;
  children?: TopicNode[];
}

const initialTopics: readonly TopicNode[] = [
  {
    id: 'TOP-1001',
    name: 'Savings & Investments',
    questions: 912,
    status: 'Active',
    children: [
      { id: 'TOP-1001-01', name: 'Savings Accounts', questions: 180, status: 'Active' },
      { id: 'TOP-1001-02', name: 'Mutual Funds', questions: 214, status: 'Active' },
      { id: 'TOP-1001-03', name: 'Risk and Return', questions: 96, status: 'Active' },
    ],
  },
  {
    id: 'TOP-1002',
    name: 'Banking & Credit',
    questions: 740,
    status: 'Active',
    children: [
      { id: 'TOP-1002-01', name: 'Credit Score', questions: 132, status: 'Active' },
      { id: 'TOP-1002-02', name: 'Loans and Interest', questions: 205, status: 'Active' },
    ],
  },
  {
    id: 'TOP-1003',
    name: 'Digital Finance & Payments',
    questions: 688,
    status: 'Active',
    children: [
      { id: 'TOP-1003-01', name: 'UPI Safety', questions: 118, status: 'Active' },
      { id: 'TOP-1003-02', name: 'Online Fraud Prevention', questions: 154, status: 'Active' },
    ],
  },
  { id: 'TOP-1004', name: 'Insurance', questions: 512, status: 'Active' },
  { id: 'TOP-1005', name: 'Taxation Basics', questions: 356, status: 'Active' },
  { id: 'TOP-1006', name: 'Capital Markets', questions: 0, status: 'Draft' },
];

function countTopics(nodes: readonly TopicNode[]): number {
  return nodes.reduce((total, node) => total + 1 + countTopics(node.children ?? []), 0);
}

function countQuestions(nodes: readonly TopicNode[]): number {
  return nodes.reduce((total, node) => total + node.questions + countQuestions(node.children ?? []), 0);
}

function findTopic(nodes: readonly TopicNode[], id: string): TopicNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = findTopic(node.children ?? [], id);
    if (child) return child;
  }
  return null;
}

function addChild(nodes: readonly TopicNode[], parentId: string, child: TopicNode): TopicNode[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...(node.children ?? []), child] };
    }
    return { ...node, children: addChild(node.children ?? [], parentId, child) };
  });
}

function topicMatches(node: TopicNode, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return (
    node.name.toLowerCase().includes(normalized) ||
    node.id.toLowerCase().includes(normalized) ||
    (node.children ?? []).some((child) => topicMatches(child, query))
  );
}

function TopicTreeItem({
  node,
  depth,
  expanded,
  selectedId,
  onToggle,
  onSelect,
  query,
}: {
  node: TopicNode;
  depth: number;
  expanded: ReadonlySet<string>;
  selectedId: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  query: string;
}) {
  if (!topicMatches(node, query)) return null;

  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <li className="topic-tree__item">
      <div
        className={`topic-tree__row${isSelected ? ' topic-tree__row--selected' : ''}`}
        style={{ paddingLeft: 12 + depth * 24 }}
      >
        <button
          type="button"
          className="topic-tree__toggle"
          onClick={() => hasChildren && onToggle(node.id)}
          aria-label={hasChildren ? `${isExpanded ? 'Collapse' : 'Expand'} ${node.name}` : undefined}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />
          ) : (
            <span className="topic-tree__toggle-dot" aria-hidden="true" />
          )}
        </button>
        <button type="button" className="topic-tree__select" onClick={() => onSelect(node.id)}>
          <span>
            <span className="topic-tree__name">{node.name}</span>
            <span className="topic-tree__meta">
              {node.id} - {node.questions.toLocaleString()} questions
            </span>
          </span>
          <span className={`topic-tree__status topic-tree__status--${node.status.toLowerCase()}`}>
            {node.status}
          </span>
        </button>
      </div>
      {hasChildren && isExpanded && (
        <ul className="topic-tree__children">
          {node.children?.map((child) => (
            <TopicTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
              query={query}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TopicTreeManager() {
  const [topics, setTopics] = useState<TopicNode[]>([...initialTopics]);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(initialTopics.filter((topic) => topic.children?.length).map((topic) => topic.id)),
  );
  const [selectedParent, setSelectedParent] = useState('root');
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<TopicStatus>('Active');

  const selectedTopic = selectedParent === 'root' ? null : findTopic(topics, selectedParent);
  const totalTopics = countTopics(topics);
  const activeTopics = useMemo(() => {
    const walk = (nodes: readonly TopicNode[]): number =>
      nodes.reduce((total, node) => total + (node.status === 'Active' ? 1 : 0) + walk(node.children ?? []), 0);
    return walk(topics);
  }, [topics]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const createTopic = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const nextTopic: TopicNode = {
      id: `TOP-${1000 + totalTopics + 1}`,
      name: trimmed,
      questions: 0,
      status,
    };

    if (selectedParent === 'root') {
      setTopics((prev) => [...prev, nextTopic]);
    } else {
      setTopics((prev) => addChild(prev, selectedParent, nextTopic));
      setExpanded((prev) => new Set(prev).add(selectedParent));
    }

    setName('');
  };

  return (
    <main className="dashboard-main">
      <div className="dashboard-content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Topic Management</h1>
            <p className="pg-head__sub">
              Create Question Bank topics inside a parent-child hierarchy.
            </p>
          </div>
        </header>

        <div className="pg-stats">
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#2563EB' }}>
                {totalTopics}
              </div>
              <div className="pg-stat__label">Total Topics</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Layers size={22} aria-hidden="true" />
            </div>
          </div>
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#16A34A' }}>
                {activeTopics}
              </div>
              <div className="pg-stat__label">Active Topics</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <CheckCircle2 size={22} aria-hidden="true" />
            </div>
          </div>
          <div className="pg-stat">
            <div>
              <div className="pg-stat__value" style={{ color: '#7C3AED' }}>
                {countQuestions(topics).toLocaleString()}
              </div>
              <div className="pg-stat__label">Mapped Questions</div>
            </div>
            <div className="pg-stat__icon" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
              <FileText size={22} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="topic-tree">
          <section className="topic-tree__panel" aria-labelledby="topic-tree-title">
            <div className="topic-tree__toolbar">
              <div>
                <h2 id="topic-tree-title" className="topic-tree__title">
                  Topic Hierarchy
                </h2>
                <p className="topic-tree__subtitle">Select any topic to create a child topic under it.</p>
              </div>
              <div className="topic-tree__search">
                <Search size={17} aria-hidden="true" />
                <input
                  type="search"
                  className="form__input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search topics"
                />
              </div>
            </div>

            <ul className="topic-tree__list">
              {topics.map((topic) => (
                <TopicTreeItem
                  key={topic.id}
                  node={topic}
                  depth={0}
                  expanded={expanded}
                  selectedId={selectedParent}
                  onToggle={toggle}
                  onSelect={setSelectedParent}
                  query={query}
                />
              ))}
            </ul>
          </section>

          <aside className="topic-tree__create" aria-labelledby="topic-create-title">
            <div className="topic-tree__create-icon">
              <FolderTree size={22} aria-hidden="true" />
            </div>
            <h2 id="topic-create-title" className="topic-tree__title">
              Create Topic
            </h2>
            <p className="topic-tree__subtitle">
              Parent: {selectedTopic ? selectedTopic.name : 'Root level'}
            </p>

            <div className="form__group">
              <label className="form__label" htmlFor="topic-name">
                Topic name
              </label>
              <input
                id="topic-name"
                className="form__input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Pension Planning"
              />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="topic-status">
                Status
              </label>
              <select
                id="topic-status"
                className="form__select"
                value={status}
                onChange={(event) => setStatus(event.target.value as TopicStatus)}
              >
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>

            <div className="topic-tree__create-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setSelectedParent('root')}
              >
                Root Topic
              </button>
              <button type="button" className="btn btn--primary" onClick={createTopic}>
                <Plus size={16} aria-hidden="true" /> Create
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
