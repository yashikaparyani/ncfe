// Mock assessment records with the full set of details captured across the
// 11-step Assessment Builder. Shared by the admin list page and detail view.
// (Ported from the frontend prototype.)

export type AssessmentStatus = 'Published' | 'Draft' | 'Archived';

export interface Assessment {
  id: string;
  name: string;
  category: string;
  questions: number;
  mode: string;
  status: AssessmentStatus;
  updated: string;
  description: string;
  languages: string[];
  examCycle: string;
  timezone: string;
  startDate: string;
  endDate: string;
  autoLock: boolean;
  examType: string;
  deliveryChannel: string;
  proctoring: string;
  requireSeb: boolean;
  disableCopyPaste: boolean;
  sebConfigKey: string;
  selectionMethod: string;
  questionRules: string;
  marksPerQuestion: number;
  negativePenalty: number;
  passingPercentage: number;
  gradingBands: ReadonlyArray<{ label: string; min: number }>;
  questionRandomization: boolean;
  optionRandomization: boolean;
  uniqueSetPerAttempt: boolean;
  totalDuration: number;
  perQuestionTimer: string;
  timeWarning: number;
  onExpiry: string;
  maxRetakes: number;
  cooldownHours: number;
  retakeWindowDays: number;
  scoringMethod: string;
  resultVisibility: string;
  answerKeyVisibility: string;
  showAnalytics: boolean;
  issueCertificate: boolean;
  targetAudience: string;
  categoryMapping: string;
  assignedEntities: string[];
  autoAssign: boolean;
}

const baseDetails = {
  description:
    'Official NCFE assessment measuring core financial literacy across saving, budgeting, banking and investment concepts.',
  languages: ['English', 'Hindi'],
  examCycle: 'NFLAT Cycle 2024-25',
  timezone: 'IST (Asia/Kolkata)',
  startDate: '01 May 2024, 09:00',
  endDate: '31 May 2024, 18:00',
  autoLock: true,
  examType: 'Automated (Anytime within window)',
  deliveryChannel: 'Web Browser Only',
  proctoring: 'AI Proctoring',
  requireSeb: false,
  disableCopyPaste: true,
  sebConfigKey: 'Auto-generated on publish',
  selectionMethod: 'Rule-Based',
  questionRules: '1 Rule • Basic Financial Concepts (Easy) • 15 Questions',
  marksPerQuestion: 1,
  negativePenalty: 0,
  passingPercentage: 40,
  gradingBands: [
    { label: 'Distinction', min: 75 },
    { label: 'Pass', min: 40 },
  ],
  questionRandomization: true,
  optionRandomization: true,
  uniqueSetPerAttempt: false,
  totalDuration: 60,
  perQuestionTimer: 'Disabled (Overall Timer Only)',
  timeWarning: 5,
  onExpiry: 'Auto-submit attempt',
  maxRetakes: 0,
  cooldownHours: 24,
  retakeWindowDays: 7,
  scoringMethod: 'Best Score',
  resultVisibility: 'After exam window closes',
  answerKeyVisibility: 'Hidden',
  showAnalytics: true,
  issueCertificate: true,
  targetAudience: 'Students (Schools)',
  categoryMapping: 'All Categories',
  assignedEntities: ['Kendriya Vidyalaya, Vashi', 'Delhi Public School, Pune'],
  autoAssign: true,
} satisfies Omit<Assessment, 'id' | 'name' | 'category' | 'questions' | 'mode' | 'status' | 'updated'>;

export const ASSESSMENTS: readonly Assessment[] = [
  {
    id: 'ASMT-2024-01', name: 'National Financial Literacy Assessment Test (NFLAT) 2024', category: 'NFLAT (Schools)', questions: 50, mode: 'Online + Lab', status: 'Published', updated: '20 May 2024',
    ...baseDetails,
    totalDuration: 90, passingPercentage: 40, targetAudience: 'Students (Schools)',
  },
  {
    id: 'ASMT-2024-02', name: 'Financial Literacy Quotient (FLQ) — Corporate', category: 'FLQ (Corporates)', questions: 40, mode: 'Online', status: 'Published', updated: '18 May 2024',
    ...baseDetails,
    description: 'Workplace financial-wellness assessment for corporate employees covering tax, insurance and retirement planning.',
    examCycle: 'FLQ Q1 2025', examType: 'Live (Strict concurrent start)', proctoring: 'AI + Live',
    deliveryChannel: 'Safe Exam Browser (SEB) Mandatory', requireSeb: true,
    totalDuration: 60, targetAudience: 'Employees (Corporates)',
    assignedEntities: ['Tech Mahindra Ltd.', 'Infosys BPM Limited'],
  },
  {
    id: 'ASMT-2024-03', name: 'Money Smart Foundation Assessment', category: 'Custom Program', questions: 30, mode: 'Online', status: 'Draft', updated: '21 May 2024',
    ...baseDetails,
    description: 'Entry-level foundation module on everyday money management for the general public.',
    examType: 'Simple Exam (Practice / Open)', proctoring: 'None',
    totalDuration: 45, maxRetakes: 3, passingPercentage: 35, targetAudience: 'General Public',
    issueCertificate: false, assignedEntities: ['All approved entities'],
  },
  {
    id: 'ASMT-2024-04', name: 'Banking Basics Certification', category: 'Custom Program', questions: 35, mode: 'Lab', status: 'Published', updated: '10 May 2024',
    ...baseDetails,
    description: 'Certification covering core banking operations, KYC and digital payments.',
    deliveryChannel: 'In-Center Lab (Kiosk)', proctoring: 'Live Proctoring',
    totalDuration: 60, passingPercentage: 50,
  },
  {
    id: 'ASMT-2024-05', name: 'Investor Awareness Exam', category: 'Custom Program', questions: 45, mode: 'Online', status: 'Archived', updated: '02 Apr 2024',
    ...baseDetails,
    description: 'Capital-markets and investor-protection awareness assessment.',
    totalDuration: 75, passingPercentage: 45, resultVisibility: 'Manual release by NCFE',
    answerKeyVisibility: 'Show with explanations',
  },
];

export function getAssessment(id: string): Assessment | null {
  return ASSESSMENTS.find((a) => a.id === id) ?? null;
}
