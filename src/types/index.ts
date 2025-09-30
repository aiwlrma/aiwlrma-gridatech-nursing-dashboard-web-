// Core data types for the nursing student evaluation system

export interface Student {
  id: string;
  studentId: string;
  name: string;
  rotation: string;
  clinicalFacility: string;
  email: string;
  phone: string;
}

export interface EvaluationItem {
  id: string;
  name: string;
  type: 'competency' | 'osce' | 'simulation' | 'portfolio' | 'attendance' | 'patient-safety';
  weight?: number;
  passCriteria?: string;
  maxScore?: number;
  isCritical: boolean;
  deadline?: string;
  sessions?: number;
}

export interface Submission {
  id: string;
  studentId: string;
  itemId: string;
  submittedAt?: string;
  status: 'not-submitted' | 'submitted' | 'pending-approval' | 'approved' | 'late';
  score?: number;
  videoUrl?: string;
  feedback?: string;
  rubricScores?: Record<string, number>;
}

export interface CompetencyScore {
  studentId: string;
  competencyRate: number;
  osceAverage?: number;
  simulationScore?: number;
  portfolioScore?: number;
  totalScore: number;
  passStatus: 'pass' | 'pending' | 'fail';
  criticalFailures: number;
  clinicalHours: number;
}

export interface Appeal {
  id: string;
  studentId: string;
  itemId: string;
  reason: string;
  currentScore: number;
  status: 'pending' | 'approved' | 'rejected';
  resolution?: string;
  createdAt: string;
  processedAt?: string;
}

export interface KPIData {
  totalStudents: number;
  totalCompetencies: number;
  totalOSCEStations: number;
  averageCompetencyRate: number;
  trends: {
    students: number;
    competencies: number;
    stations: number;
    competencyRate: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface RecentActivity {
  id: string;
  type: 'submission' | 'appeal' | 'approval' | 'grade';
  studentName: string;
  itemName: string;
  timestamp: string;
  status?: string;
}

export interface CourseInfo {
  id: string;
  name: string;
  semester: string;
  year: number;
  clinicalFacility: string;
  ward: string;
  startDate: string;
  endDate: string;
  preceptor: string;
  ta: string;
}

export interface User {
  id: string;
  name: string;
  role: 'professor' | 'preceptor' | 'ta' | 'student';
  email: string;
  permissions: string[];
}

export interface Notification {
  id: string;
  type: 'submission' | 'appeal' | 'deadline' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}
