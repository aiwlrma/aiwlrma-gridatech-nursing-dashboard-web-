import { Student } from '../types/student';

const koreanNames = [
  '김철수', '이영희', '박민준', '정수진', '최동욱', 
  '강서연', '조민서', '윤지호', '임하은', '한준혁',
  '송지은', '오현우', '장미래', '윤서준', '김다은',
  '이준호', '박서연', '정민수', '최지현', '강현우'
];

const skills = [
  '손위생', 'IV 삽입', '근육주사', 'CPR', '무균술', 
  '혈압측정', '체온측정', '호흡측정', '맥박측정', '산소포화도'
];

const vrModules = [
  '손위생 프로토콜', 'IV 라인 삽입', '근육주사 술기', 
  'CPR 시뮬레이션', '무균술 실습', '환자 커뮤니케이션'
];

const generateRandomDate = (daysAgo: number) => {
  return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
};

const generateWeeklyProgress = (weeks: number = 4) => {
  return Array.from({ length: weeks }, (_, i) => ({
    week: i + 1,
    achievementRate: Math.random() * 20 + 70 + (i * 2),
    attendanceRate: Math.random() * 10 + 85,
    vrHours: Math.random() * 5 + 2 + (i * 0.5)
  }));
};

const generateKnowledgeScores = () => {
  const tests = ['기초간호학', '성인간호학', '아동간호학', '모성간호학', '정신간호학'];
  return tests.map(test => ({
    testName: test,
    score: Math.floor(Math.random() * 30 + 70),
    date: generateRandomDate(Math.random() * 30),
    passed: Math.random() > 0.2
  }));
};

const generateSkillChecklist = () => {
  return skills.slice(0, 6).map(skill => ({
    skillName: skill,
    score: Math.floor(Math.random() * 30 + 70),
    passed: Math.random() > 0.3,
    date: generateRandomDate(Math.random() * 20),
    attempts: Math.floor(Math.random() * 3 + 1),
    evaluatorName: '김교수'
  }));
};

const generateVRSessions = (count: number = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    sessionId: `session-${i + 1}`,
    moduleName: vrModules[Math.floor(Math.random() * vrModules.length)],
    date: generateRandomDate(i * 3),
    score: Math.floor(Math.random() * 30 + 70),
    duration: Math.floor(Math.random() * 20 + 15),
    accuracy: Math.floor(Math.random() * 20 + 80),
    errors: Math.floor(Math.random() * 5),
    criticalErrors: Math.random() > 0.8 ? Math.floor(Math.random() * 2) : 0
  }));
};

const generateAIRecommendations = () => {
  const modules = ['손위생 반복학습', 'IV 재삽입 훈련', '환자 설명 시뮬레이션'];
  const reasons = [
    '오류율이 높은 영역입니다',
    '기본 술기 숙련도 향상이 필요합니다',
    '환자 소통 능력 개선이 필요합니다'
  ];
  
  return modules.map((module, index) => ({
    moduleId: `module-${index + 1}`,
    moduleName: module,
    priority: ['high', 'medium', 'low'][index] as 'high' | 'medium' | 'low',
    reason: reasons[index],
    expectedImprovement: Math.floor(Math.random() * 15 + 10),
    estimatedDuration: Math.floor(Math.random() * 15 + 20),
    matchScore: Math.floor(Math.random() * 20 + 70)
  }));
};

export const generateSampleStudents = (count: number = 20): Student[] => {
  return Array.from({ length: count }, (_, i) => {
    const overallAchievement = Math.random() * 30 + 70;
    const vrStatuses: ('completed' | 'in-progress' | 'not-started')[] = ['completed', 'in-progress', 'not-started'];
    
    return {
      id: `student-${i + 1}`,
      name: koreanNames[i % koreanNames.length],
      studentId: `2021${String(i + 1).padStart(4, '0')}`,
      grade: ['1학년', '2학년', '3학년'][Math.floor(i / 7)],
      class: ['A반', 'B반', 'C반'][i % 3],
      contact: `010-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      
      attendance: {
        present: Math.floor(Math.random() * 20 + 80),
        absent: Math.floor(Math.random() * 5),
        late: Math.floor(Math.random() * 3),
        rate: Math.random() * 20 + 80
      },
      
      vrStats: {
        sessionCount: Math.floor(Math.random() * 20 + 5),
        avgLearningTime: Math.floor(Math.random() * 20 + 20),
        lastAccessDate: generateRandomDate(Math.random() * 7),
        totalHours: Math.floor(Math.random() * 30 + 10)
      },
      
      recentScore: {
        score: Math.floor(Math.random() * 30 + 70),
        passed: Math.random() > 0.3,
        evaluationDate: generateRandomDate(Math.random() * 14)
      },
      
      vrStatus: vrStatuses[Math.floor(Math.random() * vrStatuses.length)],
      overallAchievement: Math.floor(overallAchievement),
      
      weeklyProgress: generateWeeklyProgress(),
      knowledgeScores: generateKnowledgeScores(),
      
      attitudeScores: {
        safety: Math.floor(Math.random() * 20 + 80),
        skill: Math.floor(Math.random() * 20 + 80),
        communication: Math.floor(Math.random() * 20 + 80),
        time: Math.floor(Math.random() * 20 + 80),
        appearance: Math.floor(Math.random() * 20 + 80),
        average: Math.floor(Math.random() * 20 + 80)
      },
      
      skillChecklist: generateSkillChecklist(),
      
      weaknessAnalysis: {
        knowledge: Math.floor(Math.random() * 30 + 70),
        safety: Math.floor(Math.random() * 30 + 70),
        communication: Math.floor(Math.random() * 30 + 70),
        time: Math.floor(Math.random() * 30 + 70),
        appearance: Math.floor(Math.random() * 30 + 70)
      },
      
      aiRecommendations: generateAIRecommendations(),
      vrSessions: generateVRSessions(),
      
      progressComparison: Math.random() > 0.5 ? {
        firstAttempt: {
          score: Math.floor(Math.random() * 20 + 60),
          errorRate: Math.floor(Math.random() * 20 + 20),
          duration: Math.floor(Math.random() * 10 + 30)
        },
        latestAttempt: {
          score: Math.floor(Math.random() * 20 + 80),
          errorRate: Math.floor(Math.random() * 10 + 5),
          duration: Math.floor(Math.random() * 10 + 20)
        },
        improvement: {
          scoreChange: Math.floor(Math.random() * 15 + 10),
          errorRateChange: -Math.floor(Math.random() * 10 + 5),
          durationChange: -Math.floor(Math.random() * 5 + 5),
          percentImprovement: Math.floor(Math.random() * 20 + 15)
        }
      } : undefined,
      
      classComparison: {
        achievementRate: Math.floor(Math.random() * 20 + 80),
        errorRate: Math.floor(Math.random() * 10 + 5),
        learningHours: Math.floor(Math.random() * 20 + 15),
        percentile: Math.floor(Math.random() * 100)
      },
      
      instructorFeedback: [
        {
          id: `feedback-${i}-1`,
          instructorName: '김교수',
          note: '전반적으로 성실하며 안전 수칙 준수 우수함',
          category: 'strength' as const,
          timestamp: generateRandomDate(3)
        }
      ]
    };
  });
};
