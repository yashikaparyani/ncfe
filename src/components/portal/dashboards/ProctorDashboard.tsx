import { Mic, ChevronRight } from 'lucide-react';

type CandidateStatus = 'live' | 'warning' | 'alert';

const candidates: { id: string; name: string; status: CandidateStatus }[] = [
  { id: 'CND125678', name: 'Rohan Sharma', status: 'live' },
  { id: 'CND125679', name: 'Priya Singh', status: 'live' },
  { id: 'CND125680', name: 'Ankit Verma', status: 'live' },
  { id: 'CND125681', name: 'Neha Gupta', status: 'live' },
  { id: 'CND125682', name: 'Karan Mehta', status: 'live' },
  { id: 'CND125683', name: 'Simran Kaur', status: 'warning' },
  { id: 'CND125684', name: 'Vikas Yadav', status: 'alert' },
  { id: 'CND125685', name: 'Pooja Desai', status: 'live' },
];

const legend: { status: CandidateStatus | 'offline'; title: string; desc: string }[] = [
  { status: 'live', title: 'Live', desc: 'Active & Monitored' },
  { status: 'warning', title: 'Warning', desc: 'Behavior Detected' },
  { status: 'alert', title: 'Alert', desc: 'High Risk Detected' },
  { status: 'offline', title: 'Offline', desc: 'Connection Lost' },
];

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ProctorDashboard() {
  return (
    <div className="dash__main">
      {/* Top Bar */}
      <div className="pdash__topbar">
        <span style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700 }}>Proctoring Console</span>
        <div className="pdash__live-badge">
          <span className="pdash__live-label">Live Sessions</span>
          <div className="pdash__live-value">
            <span className="pdash__live-dot" /> 128
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dash__content">
        <div className="pdash__header">
          <h1 className="pdash__title">Proctoring Dashboard</h1>

          <div className="pdash__filter">
            <label className="pdash__filter-label" htmlFor="proctor-exam">Exam:</label>
            <select id="proctor-exam" className="pdash__filter-select" defaultValue="NFLAT – May 2024">
              <option>NFLAT – May 2024</option>
            </select>
          </div>

          <div className="pdash__filter">
            <label className="pdash__filter-label" htmlFor="proctor-status">Status:</label>
            <select id="proctor-status" className="pdash__filter-select" defaultValue="All">
              <option>All</option>
            </select>
          </div>

          <div className="pdash__filter">
            <label className="pdash__filter-label" htmlFor="proctor-room">Room:</label>
            <select id="proctor-room" className="pdash__filter-select" defaultValue="All">
              <option>All</option>
            </select>
          </div>
        </div>

        {/* Grid — live video tiles. Feeds would come from an authenticated,
            same-origin media stream in production; placeholders shown here. */}
        <div className="pdash__grid">
          {candidates.map((c) => (
            <div className="pdash__card" key={c.id}>
              <div className="pdash__video-wrap">
                <span className={`pdash__status-badge pdash__status-badge--${c.status}`}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <div className="pdash__mic-icon">
                  <Mic aria-hidden="true" />
                </div>
                <div className="pdash__video pdash__video--placeholder" role="img" aria-label={`${c.name} — live proctoring feed`}>
                  <span className="pdash__video-initials">{initials(c.name)}</span>
                </div>
              </div>
              <div className="pdash__info">
                <div className="pdash__name">{c.name}</div>
                <div className="pdash__id">{c.id}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Legend */}
        <div className="pdash__legend">
          {legend.map((item) => (
            <div className="pdash__legend-item" key={item.status}>
              <span className={`pdash__legend-dot pdash__legend-dot--${item.status}`} />
              <div className="pdash__legend-text">
                <span className="pdash__legend-title">{item.title}</span>
                <span className="pdash__legend-desc">{item.desc}</span>
              </div>
            </div>
          ))}

          <button type="button" className="pdash__view-all-btn">
            View All Sessions <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
