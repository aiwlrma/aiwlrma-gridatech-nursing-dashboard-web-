import { DashboardData } from '../types/dashboard';

export const dashboardData: DashboardData = {
  kpiMetrics: {
    totalStudents: { current: 45, previous: 42 },
    achievementRate: { current: 82.5, previous: 78.3 },
    progressRate: { current: 6, previous: 4 },
    studioUsage: { current: 18, previous: 12 }
  },
  
  achievementDistribution: {
    passed: 32,
    retrying: 8,
    failed: 5
  },
  
  categoryPerformance: [
    { category: 'Knowledge', score: 85, target: 80, classAverage: 82 },
    { category: 'Safety', score: 92, target: 90, classAverage: 88 },
    { category: 'Communication', score: 78, target: 80, classAverage: 80 },
    { category: 'Time', score: 88, target: 85, classAverage: 85 },
    { category: 'Appearance', score: 90, target: 85, classAverage: 87 }
  ],
  
  topModules: [
    { rank: 1, name: '손위생 프로토콜', usageCount: 156, avgScore: 85, completionRate: 92 },
    { rank: 2, name: 'IV 라인 삽입', usageCount: 134, avgScore: 78, completionRate: 88 },
    { rank: 3, name: '근육주사 술기', usageCount: 98, avgScore: 82, completionRate: 85 }
  ],
  
  weeklyGrowth: [
    { week: '1주차', achievementRate: 75, attendanceRate: 88, vrUsage: 45 },
    { week: '2주차', achievementRate: 78, attendanceRate: 92, vrUsage: 52 },
    { week: '3주차', achievementRate: 82, attendanceRate: 90, vrUsage: 58 },
    { week: '4주차', achievementRate: 85, attendanceRate: 95, vrUsage: 65 }
  ],
  
  retrainingNeeds: [
    { skill: '무균술', errorRate: 30, affectedStudents: 12, priority: 'high' },
    { skill: 'IV 삽입', errorRate: 25, affectedStudents: 8, priority: 'high' },
    { skill: '손위생', errorRate: 20, affectedStudents: 5, priority: 'high' }
  ]
};
