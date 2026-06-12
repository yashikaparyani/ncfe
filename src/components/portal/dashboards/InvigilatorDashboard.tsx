'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu, LogOut, QrCode, Calendar, Clock, Check, Play, CheckCircle2,
  AlertTriangle, Users, FileText, ChevronRight, MapPin, Bell, type LucideIcon,
} from 'lucide-react';
import { logoutAction } from '@/lib/auth/actions';

type SlotStatus = 'In Progress' | 'Upcoming' | 'Completed';

const todaySlots: {
  id: string; exam: string; time: string; lab: string;
  registered: number; present: number; status: SlotStatus;
}[] = [
  { id: 'SLT-001', exam: 'NFLAT – May 2024', time: '10:00 AM – 11:30 AM', lab: 'Lab A (Seats 1–30)', registered: 30, present: 28, status: 'In Progress' },
  { id: 'SLT-002', exam: 'NFLAT – May 2024', time: '02:00 PM – 03:30 PM', lab: 'Lab A (Seats 1–30)', registered: 28, present: 0, status: 'Upcoming' },
];

const checklist = [
  { item: 'Signed in to Invigilator App', done: true },
  { item: 'Lab equipment checked', done: true },
  { item: 'QR scanner tested', done: true },
  { item: 'Candidate list printed / loaded', done: true },
  { item: 'Emergency procedures reviewed', done: false },
  { item: 'End-of-exam report template ready', done: false },
];

const statusColors: Record<SlotStatus, { bg: string; color: string }> = {
  'In Progress': { bg: '#DCFCE7', color: '#166534' },
  Upcoming: { bg: '#EFF6FF', color: '#1D4ED8' },
  Completed: { bg: '#F1F5F9', color: '#64748B' },
};

const kpis: { label: string; value: string; color: string; icon: LucideIcon }[] = [
  { label: "Today's Slots", value: '2', color: '#3B82F6', icon: Calendar },
  { label: 'Candidates Registered', value: '58', color: '#16A34A', icon: Users },
  { label: 'Currently Present', value: '28', color: '#D97706', icon: CheckCircle2 },
  { label: 'Incidents Logged', value: '0', color: '#DC2626', icon: AlertTriangle },
];

const quickActions: { icon: LucideIcon; label: string; to: string; color: string }[] = [
  { icon: QrCode, label: 'QR Code Scanner', to: '/invigilator/exams/SLOT-1001/scan', color: 'var(--navy)' },
  { icon: Users, label: 'Candidate Checklist', to: '/invigilator/exams/SLOT-1001/candidates', color: '#3B82F6' },
  { icon: AlertTriangle, label: 'Log Incident', to: '/invigilator/incidents/create', color: '#DC2626' },
  { icon: FileText, label: 'End-of-Exam Report', to: '/invigilator/exams/SLOT-1001/report', color: '#16A34A' },
];

export default function InvigilatorDashboard() {
  const router = useRouter();
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <div className="invig">
      {/* Top Bar */}
      <div className="invig__topbar">
        <button className="invig__menu-btn" aria-label="Open menu">
          <Menu aria-hidden="true" />
        </button>
        <div className="invig__title">Invigilator Portal – Delhi Public School, Dwarka</div>
        <div className="invig__topbar-right">
          <span className="invig__center-id">Center ID: DPS-LAB-A</span>
          <button className="invig__menu-btn" style={{ position: 'relative' }} aria-label="Notifications">
            <Bell size={20} aria-hidden="true" />
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
          </button>
          <form action={logoutAction}>
            <button type="submit" className="invig__logout">
              Logout <LogOut aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="invig__content">
        {/* Welcome */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '4px' }}>
            Good Morning, Mohan Lal
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
            Today: 15 May 2024 · Lab A assigned · 2 exam slots scheduled
          </p>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {kpis.map((k) => (
            <div key={k.label} style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '16px 20px', border: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '4px' }}>{k.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: k.color }}>{k.value}</div>
              </div>
              <k.icon size={28} color={k.color} style={{ opacity: 0.25 }} aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="invig__grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Today's Slots */}
          <div className="invig__card" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="invig__card-title">Today&apos;s Exam Slots</div>
              <Link href="/invigilator/exams/SLOT-1001/scan" className="invig__manual-btn" style={{ fontSize: '0.8rem' }}>
                <QrCode size={15} aria-hidden="true" /> QR Scanner
              </Link>
            </div>
            {todaySlots.map((slot) => {
              const sc = statusColors[slot.status];
              return (
                <div key={slot.id} style={{ padding: '16px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem', marginBottom: '2px' }}>{slot.exam}</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                        <span><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} aria-hidden="true" />{slot.time}</span>
                        <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} aria-hidden="true" />{slot.lab}</span>
                      </div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{slot.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                      Registered: <strong style={{ color: 'var(--navy)' }}>{slot.registered}</strong>
                    </div>
                    {slot.status === 'In Progress' && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                        Present: <strong style={{ color: '#16A34A' }}>{slot.present}</strong>
                      </div>
                    )}
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                      {slot.status === 'In Progress' && (
                        <button onClick={() => router.push('/invigilator/exams/SLOT-1001/candidates')} className="invig__start-btn" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                          <Play size={14} fill="currentColor" aria-hidden="true" /> Manage Slot
                        </button>
                      )}
                      {slot.status === 'Upcoming' && (
                        <button className="invig__manual-btn" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                          <QrCode size={14} aria-hidden="true" /> Start Check-in
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist */}
          <div className="invig__card">
            <div className="invig__card-title" style={{ marginBottom: '12px' }}>Pre-Exam Checklist</div>
            {checklist.map((item) => (
              <div key={item.item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: item.done ? '#DCFCE7' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.done ? <Check size={13} color="#16A34A" aria-hidden="true" /> : <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gray-300)', display: 'block' }} />}
                </div>
                <span style={{ fontSize: '0.85rem', color: item.done ? 'var(--gray-700)' : 'var(--gray-500)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.item}</span>
              </div>
            ))}
            <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
              {doneCount}/{checklist.length} items completed
            </div>
          </div>

          {/* Quick Actions */}
          <div className="invig__card">
            <div className="invig__card-title" style={{ marginBottom: '12px' }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickActions.map((action) => (
                <Link key={action.label} href={action.to}>
                  <span style={{ width: '100%', padding: '12px 16px', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <action.icon size={18} color={action.color} aria-hidden="true" />
                    <span style={{ flex: 1, fontWeight: 600, color: 'var(--navy)', fontSize: '0.875rem', textAlign: 'left' }}>{action.label}</span>
                    <ChevronRight size={16} color="var(--gray-400)" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
