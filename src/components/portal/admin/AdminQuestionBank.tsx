import { Search, Filter, Plus } from 'lucide-react';
import '@/styles/portal/admin.css';

type Status = 'Published' | 'Needs Review' | 'Draft';
const STATUS_STYLE: Record<Status, { bg: string; color: string }> = {
  Published: { bg: '#DCFCE7', color: '#166534' },
  'Needs Review': { bg: '#FEF9C3', color: '#854D0E' },
  Draft: { bg: '#F1F5F9', color: '#475569' },
};

interface QRow { qid: string; text: string; topic: string; difficulty: string; status: Status; action: 'Edit' | 'Review' }
const rows: readonly QRow[] = [
  { qid: 'Q-8821', text: 'What is the primary purpose of a credit score?', topic: 'Banking & Credit', difficulty: 'Medium', status: 'Published', action: 'Edit' },
  { qid: 'Q-8822', text: 'Which asset class typically carries the highest risk and return?', topic: 'Investment', difficulty: 'Hard', status: 'Needs Review', action: 'Review' },
  { qid: 'Q-8823', text: 'What does a "deductible" mean in an insurance policy?', topic: 'Insurance', difficulty: 'Easy', status: 'Published', action: 'Edit' },
  { qid: 'Q-8824', text: 'Which of the following is a secure UPI payment practice?', topic: 'Digital Payments', difficulty: 'Medium', status: 'Draft', action: 'Edit' },
];

export default function AdminQuestionBank() {
  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">
          <h1 className="dashboard-title">Question Bank</h1>
          <p className="dashboard-subtitle">Manage, review, and approve assessment questions.</p>
        </div>
        <div className="dashboard-header__actions">
          <button type="button" className="btn btn--primary">
            <Plus size={18} aria-hidden="true" /> Add New Question
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="dashboard-card__header" style={{ display: 'flex', gap: '16px', background: '#F8FAFF' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--gray-400)' }} aria-hidden="true" />
              <input type="text" placeholder="Search by QID or keyword..." style={{ width: '100%', padding: '10px 16px 10px 42px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select className="form__select" style={{ minWidth: '150px' }} defaultValue="All Topics">
                <option>All Topics</option>
                <option>Banking &amp; Credit</option>
                <option>Investment</option>
                <option>Insurance</option>
              </select>
              <select className="form__select" style={{ minWidth: '150px' }} defaultValue="All Difficulties">
                <option>All Difficulties</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <button type="button" className="btn btn--secondary" style={{ background: 'var(--white)' }}>
                <Filter size={18} aria-hidden="true" /> More
              </button>
            </div>
          </div>

          <div className="dashboard-card__body" style={{ padding: 0 }}>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>QID / Question</th>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const sc = STATUS_STYLE[r.status];
                  return (
                    <tr key={r.qid}>
                      <td style={{ maxWidth: 360 }}>
                        <strong style={{ color: 'var(--navy)' }}>{r.qid}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginTop: 4 }}>{r.text}</div>
                      </td>
                      <td>{r.topic}</td>
                      <td>{r.difficulty}</td>
                      <td><span style={{ background: sc.bg, color: sc.color, padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{r.status}</span></td>
                      <td>
                        <button type="button" className={r.action === 'Review' ? 'btn btn--sm btn--primary' : 'btn btn--sm btn--secondary'}>
                          {r.action}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid var(--gray-200)', background: 'var(--white)' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                Showing <strong>1</strong> to <strong>4</strong> of <strong>12,842</strong> questions
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" className="btn btn--sm btn--secondary" disabled>Previous</button>
                <button type="button" className="btn btn--sm" style={{ background: 'var(--navy)', color: 'var(--white)' }}>1</button>
                <button type="button" className="btn btn--sm btn--secondary">2</button>
                <button type="button" className="btn btn--sm btn--secondary">3</button>
                <span style={{ padding: '4px 8px', color: 'var(--gray-400)' }}>...</span>
                <button type="button" className="btn btn--sm btn--secondary">1285</button>
                <button type="button" className="btn btn--sm btn--secondary">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
