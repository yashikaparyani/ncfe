'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderTree,
  Info,
  Layers,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { ConfirmModal } from './Crud';
import '@/styles/portal/pages.css';

type TopicStatus = 'Active' | 'Draft';

interface TopicNode {
  id: string;
  name: string;
  questions: number;
  status: TopicStatus;
  children?: TopicNode[];
}

type FormMode = 'idle' | 'create' | 'edit';

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

function updateTopic(
  nodes: readonly TopicNode[],
  id: string,
  patch: Pick<TopicNode, 'name' | 'status'>,
): TopicNode[] {
  return nodes.map((node) => {
    if (node.id === id) return { ...node, ...patch };
    return { ...node, children: updateTopic(node.children ?? [], id, patch) };
  });
}

function deleteTopic(nodes: readonly TopicNode[], id: string): TopicNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: deleteTopic(node.children ?? [], id) }));
}

function countDescendants(node: TopicNode): number {
  return (node.children ?? []).reduce((n, child) => n + 1 + countDescendants(child), 0);
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
  activeId,
  onToggle,
  onAddChild,
  onEdit,
  onDelete,
  query,
}: {
  node: TopicNode;
  depth: number;
  expanded: ReadonlySet<string>;
  activeId: string | null;
  onToggle: (id: string) => void;
  onAddChild: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (node: TopicNode) => void;
  query: string;
}) {
  if (!topicMatches(node, query)) return null;

  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = expanded.has(node.id);
  const isActive = activeId === node.id;

  return (
    <li className="topic-tree__item">
      <div
        className={`topic-tree__row${isActive ? ' topic-tree__row--selected' : ''}`}
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

        <div className="topic-tree__content">
          <span className="topic-tree__name">{node.name}</span>
          <span className="topic-tree__meta">
            {node.id} · {node.questions.toLocaleString()} questions
          </span>
        </div>

        <span className={`topic-tree__status topic-tree__status--${node.status.toLowerCase()}`}>
          {node.status}
        </span>

        <div className="topic-tree__actions" role="group" aria-label={`Actions for ${node.name}`}>
          <button
            type="button"
            className="topic-tree__action-btn topic-tree__action-btn--add"
            title={`Add child under ${node.name}`}
            aria-label={`Add child under ${node.name}`}
            onClick={() => onAddChild(node.id)}
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="topic-tree__action-btn topic-tree__action-btn--edit"
            title={`Edit ${node.name}`}
            aria-label={`Edit ${node.name}`}
            onClick={() => onEdit(node.id)}
          >
            <Pencil size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="topic-tree__action-btn topic-tree__action-btn--delete"
            title={`Delete ${node.name}`}
            aria-label={`Delete ${node.name}`}
            onClick={() => onDelete(node)}
          >
            <Trash2 size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <ul className="topic-tree__children">
          {node.children?.map((child) => (
            <TopicTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              activeId={activeId}
              onToggle={onToggle}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDelete={onDelete}
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
  const [query, setQuery] = useState('');
  const [formMode, setFormMode] = useState<FormMode>('idle');
  const [formParentId, setFormParentId] = useState('root');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<TopicStatus>('Active');
  const [deleteTarget, setDeleteTarget] = useState<TopicNode | null>(null);

  const totalTopics = countTopics(topics);
  const activeTopics = useMemo(() => {
    const walk = (nodes: readonly TopicNode[]): number =>
      nodes.reduce((total, node) => total + (node.status === 'Active' ? 1 : 0) + walk(node.children ?? []), 0);
    return walk(topics);
  }, [topics]);

  const parentTopic = formParentId === 'root' ? null : findTopic(topics, formParentId);
  const editingTopic = editingId ? findTopic(topics, editingId) : null;
  const activeId = formMode === 'edit' ? editingId : formMode === 'create' ? formParentId : null;

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openCreateRoot = () => {
    setFormMode('create');
    setFormParentId('root');
    setEditingId(null);
    setFormName('');
    setFormStatus('Active');
  };

  const openCreateChild = (parentId: string) => {
    setFormMode('create');
    setFormParentId(parentId);
    setEditingId(null);
    setFormName('');
    setFormStatus('Active');
    setExpanded((prev) => new Set(prev).add(parentId));
  };

  const openEdit = (id: string) => {
    const topic = findTopic(topics, id);
    if (!topic) return;
    setFormMode('edit');
    setEditingId(id);
    setFormName(topic.name);
    setFormStatus(topic.status);
  };

  const closeForm = () => {
    setFormMode('idle');
    setEditingId(null);
    setFormName('');
    setFormStatus('Active');
    setFormParentId('root');
  };

  const saveTopic = () => {
    const trimmed = formName.trim();
    if (!trimmed) return;

    if (formMode === 'edit' && editingId) {
      setTopics((prev) => updateTopic(prev, editingId, { name: trimmed, status: formStatus }));
    } else if (formMode === 'create') {
      const nextTopic: TopicNode = {
        id: `TOP-${1000 + totalTopics + 1}`,
        name: trimmed,
        questions: 0,
        status: formStatus,
      };

      if (formParentId === 'root') {
        setTopics((prev) => [...prev, nextTopic]);
      } else {
        setTopics((prev) => addChild(prev, formParentId, nextTopic));
        setExpanded((prev) => new Set(prev).add(formParentId));
      }
    }

    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setTopics((prev) => deleteTopic(prev, deleteTarget.id));
    if (editingId === deleteTarget.id || formParentId === deleteTarget.id) closeForm();
    setDeleteTarget(null);
  };

  const deleteDescendants = deleteTarget ? countDescendants(deleteTarget) : 0;

  return (
    <main className="dashboard-main">
      <div className="dashboard-content">
        <header className="pg-head">
          <div>
            <h1 className="pg-head__title">Topic Management</h1>
            <p className="pg-head__sub">
              Manage Question Bank topics in a parent-child hierarchy.
            </p>
          </div>
          <div className="pg-head__actions">
            <button type="button" className="btn btn--primary" onClick={openCreateRoot}>
              <Plus size={16} aria-hidden="true" /> Create Topic
            </button>
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
                <p className="topic-tree__subtitle">
                  Each row has Add child, Edit, and Delete buttons on the right.
                </p>
              </div>
              <div className="topic-tree__search">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="topic-search">
                  Search topics
                </label>
                <input
                  id="topic-search"
                  type="search"
                  className="form__input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search topics…"
                />
              </div>
            </div>

            <p className="topic-tree__note">
              <Info size={14} aria-hidden="true" />
              Demo data — changes are saved in this browser session only.
            </p>

            <ul className="topic-tree__list">
              {topics.length === 0 ? (
                <li className="topic-tree__empty">No topics yet. Click &ldquo;Create Topic&rdquo; to get started.</li>
              ) : (
                topics.map((topic) => (
                  <TopicTreeItem
                    key={topic.id}
                    node={topic}
                    depth={0}
                    expanded={expanded}
                    activeId={activeId}
                    onToggle={toggle}
                    onAddChild={openCreateChild}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                    query={query}
                  />
                ))
              )}
            </ul>
          </section>

          <aside className="topic-tree__form" aria-labelledby="topic-form-title">
            {formMode === 'idle' ? (
              <div className="topic-tree__form-idle">
                <div className="topic-tree__create-icon">
                  <FolderTree size={22} aria-hidden="true" />
                </div>
                <h2 id="topic-form-title" className="topic-tree__title">
                  Topic Actions
                </h2>
                <p className="topic-tree__subtitle">
                  Pick an action from the tree on the left, or add a new root-level topic.
                </p>
                <ul className="topic-tree__help-list">
                  <li>
                    <Plus size={14} aria-hidden="true" /> Add child under a topic
                  </li>
                  <li>
                    <Pencil size={14} aria-hidden="true" /> Edit name or status
                  </li>
                  <li>
                    <Trash2 size={14} aria-hidden="true" /> Delete topic (and its children)
                  </li>
                </ul>
                <button type="button" className="btn btn--primary" onClick={openCreateRoot}>
                  <Plus size={16} aria-hidden="true" /> Create Topic
                </button>
              </div>
            ) : (
              <>
                <div className="topic-tree__create-icon">
                  <FolderTree size={22} aria-hidden="true" />
                </div>
                <h2 id="topic-form-title" className="topic-tree__title">
                  {formMode === 'edit' ? 'Edit Topic' : 'Create Topic'}
                </h2>

                {formMode === 'create' && (
                  <p className="topic-tree__subtitle">
                    Parent: <strong>{parentTopic ? parentTopic.name : 'Root level'}</strong>
                  </p>
                )}

                {formMode === 'edit' && editingTopic && (
                  <p className="topic-tree__subtitle">
                    ID: <strong>{editingTopic.id}</strong> · {editingTopic.questions.toLocaleString()} mapped
                    questions
                  </p>
                )}

                <div className="form__group">
                  <label className="form__label" htmlFor="topic-name">
                    Topic name
                  </label>
                  <input
                    id="topic-name"
                    className="form__input"
                    value={formName}
                    onChange={(event) => setFormName(event.target.value)}
                    placeholder="e.g. Pension Planning"
                    autoFocus
                  />
                </div>

                <div className="form__group">
                  <label className="form__label" htmlFor="topic-status">
                    Status
                  </label>
                  <select
                    id="topic-status"
                    className="form__select"
                    value={formStatus}
                    onChange={(event) => setFormStatus(event.target.value as TopicStatus)}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>

                <div className="topic-tree__create-actions">
                  <button type="button" className="btn btn--secondary" onClick={closeForm}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn--primary" onClick={saveTopic} disabled={!formName.trim()}>
                    {formMode === 'edit' ? 'Save Changes' : 'Create Topic'}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>

        <ConfirmModal
          open={deleteTarget !== null}
          title="Delete Topic"
          message={
            deleteTarget ? (
              <>
                Delete <strong>{deleteTarget.name}</strong> ({deleteTarget.id})?
                {deleteDescendants > 0 && (
                  <>
                    {' '}
                    This will also remove <strong>{deleteDescendants}</strong> child topic
                    {deleteDescendants === 1 ? '' : 's'}.
                  </>
                )}{' '}
                This cannot be undone.
              </>
            ) : (
              ''
            )
          }
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onClose={() => setDeleteTarget(null)}
        />
      </div>
    </main>
  );
}
