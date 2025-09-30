export interface DashboardData {
  kpiMetrics: {
    totalStudents: { current: number; previous: number };
    achievementRate: { current: number; previous: number };
    progressRate: { current: number; previous: number };
    studioUsage: { current: number; previous: number };
  };
  
  achievementDistribution: {
    passed: number;
    retrying: number;
    failed: number;
  };
  
  categoryPerformance: Array<{
    category: string;
    score: number;
    target: number;
    classAverage: number;
  }>;
  
  topModules: Array<{
    rank: number;
    name: string;
    usageCount: number;
    avgScore: number;
    completionRate: number;
  }>;
  
  weeklyGrowth: Array<{
    week: string;
    achievementRate: number;
    attendanceRate: number;
    vrUsage: number;
  }>;
  
  retrainingNeeds: Array<{
    skill: string;
    errorRate: number;
    affectedStudents: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  onClick?: () => void;
}
