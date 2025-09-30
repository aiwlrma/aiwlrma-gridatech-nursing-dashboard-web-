export interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  class: string;
  contact: string;
  profilePhoto?: string;
  
  // Attendance
  attendance: {
    present: number;
    absent: number;
    late: number;
    rate: number;
  };
  
  // VR Stats
  vrStats: {
    sessionCount: number;
    avgLearningTime: number;
    lastAccessDate: Date;
    totalHours: number;
  };
  
  // Recent Performance
  recentScore: {
    score: number;
    passed: boolean;
    evaluationDate: Date;
  };
  
  // VR Learning Status
  vrStatus: 'completed' | 'in-progress' | 'not-started';
  
  // Overall Achievement
  overallAchievement: number;
  
  // Weekly Progress
  weeklyProgress: Array<{
    week: number;
    achievementRate: number;
    attendanceRate: number;
    vrHours: number;
  }>;
  
  // Knowledge Assessment
  knowledgeScores: Array<{
    testName: string;
    score: number;
    date: Date;
    passed: boolean;
  }>;
  
  // Attitude Evaluation (5 dimensions)
  attitudeScores: {
    safety: number;
    skill: number;
    communication: number;
    time: number;
    appearance: number;
    average: number;
  };
  
  // Skill Checklist
  skillChecklist: Array<{
    skillName: string;
    score: number;
    passed: boolean;
    date: Date;
    attempts: number;
    evaluatorName: string;
  }>;
  
  // Weakness Analysis (for Radar Chart)
  weaknessAnalysis: {
    knowledge: number;
    safety: number;
    communication: number;
    time: number;
    appearance: number;
  };
  
  // AI Recommendations
  aiRecommendations: Array<{
    moduleId: string;
    moduleName: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    expectedImprovement: number;
    estimatedDuration: number;
    matchScore: number;
  }>;
  
  // VR Session Logs
  vrSessions: Array<{
    sessionId: string;
    moduleName: string;
    date: Date;
    score: number;
    duration: number;
    accuracy: number;
    errors: number;
    criticalErrors: number;
  }>;
  
  // Progress Comparison
  progressComparison?: {
    firstAttempt: {
      score: number;
      errorRate: number;
      duration: number;
    };
    latestAttempt: {
      score: number;
      errorRate: number;
      duration: number;
    };
    improvement: {
      scoreChange: number;
      errorRateChange: number;
      durationChange: number;
      percentImprovement: number;
    };
  };
  
  // Class Comparison
  classComparison: {
    achievementRate: number;
    errorRate: number;
    learningHours: number;
    percentile: number;
  };
  
  // Instructor Feedback
  instructorFeedback: Array<{
    id: string;
    instructorName: string;
    note: string;
    category: 'strength' | 'weakness' | 'recommendation';
    timestamp: Date;
  }>;
}

export interface StudentListFilters {
  search: string;
  vrStatus: 'all' | 'completed' | 'in-progress' | 'not-started';
  attendanceRate: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'name' | 'achievement' | 'attendance' | 'vrSessions' | 'recentScore';
  sortOrder: 'asc' | 'desc';
}
