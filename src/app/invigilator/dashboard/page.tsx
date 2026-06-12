import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import InvigilatorDashboard from '@/components/portal/dashboards/InvigilatorDashboard';
import '@/styles/portal/invigilator.css';

// Invigilator uses a standalone full-screen layout (its own top bar, no portal
// sidebar), so the CSS is imported here rather than in a role layout.
export const metadata: Metadata = buildMetadata({
  title: 'Invigilator Dashboard',
  path: '/invigilator/dashboard',
  noindex: true,
});

export default function InvigilatorDashboardPage() {
  return <InvigilatorDashboard />;
}
