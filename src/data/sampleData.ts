import { Student, EvaluationItem, Submission, CompetencyScore, Appeal, KPIData, RecentActivity, CourseInfo, User, Notification } from '../types';

// Sample Korean student names
const koreanNames = [
  '김민지', '이서연', '박지훈', '최수진', '정현우', '한소영', '윤태준', '강예린',
  '임동현', '오지은', '송민수', '조하늘', '배수정', '신재호', '문지영', '권태민',
  '홍서현', '안지호', '서민경', '노승우', '유다은', '전현수', '김하늘', '이준호',
  '박서영', '최민수', '정지은', '한태준', '윤서진', '강동현', '임예린', '오지훈',
  '송수정', '조재호', '배지영', '신태민', '문서현', '권지호', '홍민경', '안승우',
  '서다은', '노현수', '유하늘', '전준호', '김서영'
];

// Generate sample students
export const sampleStudents: Student[] = koreanNames.map((name, index) => ({
  id: `student_${index + 1}`,
  studentId: `2024${String(index + 1).padStart(3, '0')}`,
  name,
  rotation: index < 15 ? '성인간호학 실습' : index < 30 ? '아동간호학 실습' : '모성간호학 실습',
  clinicalFacility: index < 15 ? '세브란스 내과병동' : index < 30 ? '삼성서울병원 소아과' : '서울대병원 산부인과',
  email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
  phone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
}));

// Sample evaluation items (nursing-specific)
export const sampleEvaluationItems: EvaluationItem[] = [
  {
    id: 'comp_1',
    name: '임상컴피턴시',
    type: 'competency',
    weight: 30,
    passCriteria: '통과기준 80%',
    maxScore: 100,
    isCritical: false,
    deadline: '상시'
  },
  {
    id: 'osce_1',
    name: 'OSCE(6 스테이션)',
    type: 'osce',
    weight: 25,
    passCriteria: '각 스테이션 P',
    maxScore: 100,
    isCritical: false,
    deadline: '5/10',
    sessions: 6
  },
  {
    id: 'sim_1',
    name: '시뮬레이션 평가',
    type: 'simulation',
    weight: 20,
    passCriteria: '가중 20%',
    maxScore: 100,
    isCritical: false,
    deadline: '4회'
  },
  {
    id: 'port_1',
    name: '임상로그/리플렉션',
    type: 'portfolio',
    weight: 10,
    passCriteria: '가중 10%',
    maxScore: 100,
    isCritical: false,
    deadline: '주 1회'
  },
  {
    id: 'att_1',
    name: '출석/임상시간',
    type: 'attendance',
    weight: 10,
    passCriteria: '최소 160h',
    maxScore: 0,
    isCritical: false,
    deadline: '상시'
  },
  {
    id: 'safety_1',
    name: '환자안전/무균술',
    type: 'patient-safety',
    weight: 5,
    passCriteria: '불합격조건',
    maxScore: 0,
    isCritical: true,
    deadline: '상시'
  }
];

// Generate sample submissions
export const sampleSubmissions: Submission[] = sampleStudents.flatMap(student => 
  sampleEvaluationItems.map(item => {
    const isSubmitted = Math.random() > 0.1; // 90% submission rate
    const isLate = Math.random() > 0.8; // 20% late rate
    const score = isSubmitted ? Math.floor(Math.random() * 40) + 60 : undefined;
    
    return {
      id: `sub_${student.id}_${item.id}`,
      studentId: student.id,
      itemId: item.id,
      submittedAt: isSubmitted ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      status: isSubmitted ? (isLate ? 'late' : 'submitted') : 'not-submitted',
      score,
      videoUrl: item.type === 'competency' && isSubmitted ? `https://example.com/video_${student.id}_${item.id}.mp4` : undefined,
      feedback: score && score < 80 ? '개선이 필요한 부분이 있습니다.' : score && score >= 90 ? '우수한 수행입니다.' : undefined,
      rubricScores: item.type === 'competency' && isSubmitted ? {
        '무균술': Math.floor(Math.random() * 2) + 4,
        '5-Rights': Math.floor(Math.random() * 2) + 4,
        'V/S': Math.floor(Math.random() * 2) + 4,
        'IM': Math.floor(Math.random() * 2) + 4,
        'IV': Math.floor(Math.random() * 2) + 4,
        'CPR': Math.floor(Math.random() * 2) + 4
      } : undefined
    };
  })
);

// Generate sample competency scores
export const sampleCompetencyScores: CompetencyScore[] = sampleStudents.map(student => {
  const competencyRate = Math.floor(Math.random() * 30) + 70; // 70-100%
  const osceAverage = Math.floor(Math.random() * 30) + 70;
  const simulationScore = Math.floor(Math.random() * 30) + 70;
  const portfolioScore = Math.floor(Math.random() * 30) + 70;
  const criticalFailures = Math.random() > 0.9 ? Math.floor(Math.random() * 3) + 1 : 0;
  const clinicalHours = Math.floor(Math.random() * 40) + 160; // 160-200 hours
  
  const totalScore = (competencyRate * 0.3) + (osceAverage * 0.25) + (simulationScore * 0.2) + (portfolioScore * 0.1) + (clinicalHours / 200 * 100 * 0.1);
  
  let passStatus: 'pass' | 'pending' | 'fail' = 'pass';
  if (competencyRate < 80 || criticalFailures > 0) {
    passStatus = 'fail';
  } else if (osceAverage < 70 || simulationScore < 70) {
    passStatus = 'pending';
  }
  
  return {
    studentId: student.id,
    competencyRate,
    osceAverage,
    simulationScore,
    portfolioScore,
    totalScore: Math.round(totalScore * 10) / 10,
    passStatus,
    criticalFailures,
    clinicalHours
  };
});

// Sample appeals
export const sampleAppeals: Appeal[] = [
  {
    id: 'appeal_1',
    studentId: sampleStudents[0].id,
    itemId: 'osce_1',
    reason: '무균술 항목에서 부분점수가 누락되었습니다.',
    currentScore: 78,
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'appeal_2',
    studentId: sampleStudents[5].id,
    itemId: 'comp_1',
    reason: '근육주사 술기 평가에서 채점 기준이 불명확합니다.',
    currentScore: 82,
    status: 'approved',
    resolution: '재평가 후 85점으로 조정',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'appeal_3',
    studentId: sampleStudents[12].id,
    itemId: 'sim_1',
    reason: '시뮬레이션 평가에서 팀원의 실수로 인한 감점이 부당합니다.',
    currentScore: 75,
    status: 'rejected',
    resolution: '팀 평가이므로 개별 조정 불가',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// KPI data
export const sampleKPIData: KPIData = {
  totalStudents: 45,
  totalCompetencies: 18,
  totalOSCEStations: 6,
  averageCompetencyRate: 78.5,
  trends: {
    students: 12,
    competencies: 2,
    stations: 1,
    competencyRate: 3.2
  }
};

// Recent activities
export const sampleRecentActivities: RecentActivity[] = [
  {
    id: 'act_1',
    type: 'submission',
    studentName: '박지훈',
    itemName: '근육주사 술기영상',
    timestamp: '2시간 전',
    status: '제출완료'
  },
  {
    id: 'act_2',
    type: 'appeal',
    studentName: '이서연',
    itemName: 'OSCE 스테이션 3',
    timestamp: '1일 전',
    status: '재평가 요청'
  },
  {
    id: 'act_3',
    type: 'approval',
    studentName: '김민지',
    itemName: '임상로그 3건',
    timestamp: '2일 전',
    status: '승인 완료'
  }
];

// Course information
export const sampleCourseInfo: CourseInfo = {
  id: 'course_1',
  name: '성인간호학 실습(내과병동)',
  semester: '2024-1학기',
  year: 2024,
  clinicalFacility: '세브란스 내과병동',
  ward: '내과병동 6층',
  startDate: '2024-03-01',
  endDate: '2024-06-30',
  preceptor: '김프리셉터',
  ta: '이조교'
};

// Current user
export const currentUser: User = {
  id: 'user_1',
  name: '김교수',
  role: 'professor',
  email: 'prof.kim@university.ac.kr',
  permissions: ['all']
};

// Sample notifications
export const sampleNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'submission',
    title: '새로운 제출물',
    message: '박지훈 학생이 근육주사 술기영상을 제출했습니다.',
    timestamp: '2시간 전',
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif_2',
    type: 'appeal',
    title: '이의제기 접수',
    message: '이서연 학생이 OSCE 스테이션 3에 대해 이의를 제기했습니다.',
    timestamp: '1일 전',
    read: false,
    priority: 'high'
  },
  {
    id: 'notif_3',
    type: 'critical',
    title: '크리티컬 실패',
    message: '환자안전 규칙 위반이 감지되었습니다.',
    timestamp: '3일 전',
    read: true,
    priority: 'critical'
  }
];
