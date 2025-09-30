import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Activity, 
  Clock, 
  X, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  BarChart3,
  ArrowRight,
  Download,
  Filter,
  Search
} from 'lucide-react';
// import EnhancedKPICard from '../components/Dashboard/EnhancedKPICard';
import AchievementDistribution from '../components/Dashboard/AchievementDistribution';
import StudentGrowthChart from '../components/Dashboard/StudentGrowthChart';
import RetrainingRecommendations from '../components/Dashboard/RetrainingRecommendations';
import useStore from '../store/useStore';
import { dashboardData } from '../data/dashboardData';

const Dashboard: React.FC = () => {
  const { selectedTerm } = useStore();
  const [kpiDetailOpen, setKpiDetailOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType);
    setKpiDetailOpen(true);
  };

  const kpiCards = [
    {
      title: "총 학습자 수",
      value: `${dashboardData.kpiMetrics.totalStudents.current}명`,
      subtitle: `${selectedTerm} 기준`,
      trend: {
        value: Number(((dashboardData.kpiMetrics.totalStudents.current - dashboardData.kpiMetrics.totalStudents.previous) / dashboardData.kpiMetrics.totalStudents.previous * 100).toFixed(1)),
        direction: 'up' as const,
        label: '전월 대비'
      },
      icon: <Users size={20} />,
      color: 'blue' as const,
      onClick: () => handleKPIClick('students')
    },
    {
      title: "평균 성취율",
      value: `${dashboardData.kpiMetrics.achievementRate.current}%`,
      trend: {
        value: Number(((dashboardData.kpiMetrics.achievementRate.current - dashboardData.kpiMetrics.achievementRate.previous) / dashboardData.kpiMetrics.achievementRate.previous * 100).toFixed(1)),
        direction: 'up' as const,
        label: '전월 대비'
      },
      icon: <Award size={20} />,
      color: 'green' as const,
      onClick: () => handleKPIClick('achievement')
    },
    {
      title: "진행중인 평가",
      value: `${dashboardData.kpiMetrics.progressRate.current}개`,
      subtitle: "마감 임박 2개",
      trend: {
        value: dashboardData.kpiMetrics.progressRate.current - dashboardData.kpiMetrics.progressRate.previous,
        direction: 'up' as const,
        label: '전주 대비'
      },
      icon: <Activity size={20} />,
      color: 'purple' as const,
      onClick: () => handleKPIClick('progress')
    },
    {
      title: "미완료 VR 세션",
      value: `${dashboardData.kpiMetrics.studioUsage.current}건`,
      subtitle: "학생 12명",
      trend: {
        value: dashboardData.kpiMetrics.studioUsage.current - dashboardData.kpiMetrics.studioUsage.previous,
        direction: 'up' as const,
        label: '전주 대비'
      },
      icon: <Clock size={20} />,
      color: 'orange' as const,
      onClick: () => handleKPIClick('studio')
    }
  ];

  const todayAgenda = [
    { time: '09:00', title: '간호학 개론 수업', type: 'class' },
    { time: '14:00', title: 'VR 실습 평가', type: 'evaluation' },
    { time: '16:00', title: '학생 상담', type: 'meeting' }
  ];

  const recentFeedback = [
    { student: '김철수', message: '손위생 프로토콜 개선 필요', time: '2시간 전', priority: 'high' },
    { student: '이영희', message: 'IV 삽입 술기 우수', time: '4시간 전', priority: 'low' },
    { student: '박민수', message: '재교육 모듈 배정 요청', time: '6시간 전', priority: 'medium' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
            <p className="text-sm text-gray-600 mt-1">전체 실습생 현황과 평가 진행 상태를 한눈에 확인하세요</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="search"
                placeholder="학생, 로테이션, 병동 검색..."
                className="w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={card.onClick}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                    {card.subtitle && (
                      <p className="text-xs text-gray-500">{card.subtitle}</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${{
                    blue: 'bg-blue-50 text-blue-600',
                    green: 'bg-green-50 text-green-600',
                    purple: 'bg-purple-50 text-purple-600',
                    orange: 'bg-orange-50 text-orange-600'
                  }[card.color]}`}>
                    {card.icon}
                  </div>
                </div>
                
                {/* Trend indicator */}
                <div className="flex items-center gap-2">
                  {card.trend.direction === 'up' ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    card.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.trend.value > 0 ? '+' : ''}{card.trend.value}% {card.trend.label}
                  </span>
                </div>
                
                {/* Hover effect */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center text-xs text-blue-600 font-medium">
                    상세 보기 <ArrowRight size={12} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Achievement Distribution */}
            <div className="lg:col-span-1">
              <AchievementDistribution data={dashboardData.achievementDistribution} />
            </div>
            
            {/* Studio TOP3 - Expanded */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Studio 모듈 TOP3</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    더보기
                  </button>
                </div>
                
                <div className="space-y-6">
                  {dashboardData.topModules.map((module) => (
                    <div 
                      key={module.rank}
                      className="flex items-center gap-6 p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 cursor-pointer transition-all duration-200"
                    >
                      {/* Rank badge - Larger */}
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                        ${module.rank === 1 ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' : ''}
                        ${module.rank === 2 ? 'bg-gray-100 text-gray-700 border-2 border-gray-300' : ''}
                        ${module.rank === 3 ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' : ''}
                      `}>
                        {module.rank}
                      </div>
                      
                      {/* Module info - Expanded */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{module.name}</h4>
                            <p className="text-sm text-gray-500">사용 {module.usageCount}회</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{module.avgScore}점</p>
                            <p className="text-sm text-gray-500">평균 점수</p>
                          </div>
                        </div>
                        
                        {/* Progress bar - Enhanced */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="font-medium">완료율</span>
                            <span className="font-semibold">{module.completionRate}%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                              style={{ width: `${module.completionRate}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Additional stats */}
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Activity size={14} />
                            <span>활동도 높음</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={14} />
                            <span>성장 추세</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Growth Chart */}
            <StudentGrowthChart data={dashboardData.weeklyGrowth} />
            
            {/* Retraining Recommendations */}
            <RetrainingRecommendations data={dashboardData.retrainingNeeds} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="space-y-6">
            {/* Today's Agenda */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={20} />
                오늘 일정
              </h3>
              <div className="space-y-3">
                {todayAgenda.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600 w-12">{item.time}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Feedback */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                최근 피드백
              </h3>
              <div className="space-y-3">
                {recentFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{feedback.student}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                        feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {feedback.priority === 'high' ? '긴급' : feedback.priority === 'medium' ? '보통' : '낮음'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.message}</p>
                    <p className="text-xs text-gray-500">{feedback.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <BarChart3 size={16} />
                  성과 리포트 생성
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download size={16} />
                  데이터 내보내기
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Filter size={16} />
                  필터 설정
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Detail Modal */}
      {kpiDetailOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedKPI === 'students' && '학습자 수 상세'}
                {selectedKPI === 'achievement' && '성취율 상세'}
                {selectedKPI === 'progress' && '진행중인 평가 상세'}
                {selectedKPI === 'studio' && 'VR 세션 상세'}
              </h3>
              <button 
                onClick={() => setKpiDetailOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {selectedKPI === 'students' && (
                <>
                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">등록 학생</p>
                      <p className="text-2xl font-bold text-blue-600">45명</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">활동 학생</p>
                      <p className="text-2xl font-bold text-green-600">38명</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">비활동</p>
                      <p className="text-2xl font-bold text-gray-600">7명</p>
                    </div>
                  </div>
                  
                  {/* Breakdown by class */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">분반별 현황</h4>
                    <div className="space-y-2">
                      {['2학년 A반', '2학년 B반', '3학년 A반'].map(className => (
                        <div key={className} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="text-sm text-gray-700">{className}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{width: '84%'}} />
                            </div>
                            <span className="text-sm font-medium">15/18</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {selectedKPI === 'achievement' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">평균 성취율</p>
                      <p className="text-2xl font-bold text-green-600">82.5%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">목표 달성률</p>
                      <p className="text-2xl font-bold text-blue-600">78%</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3">항목별 성취율</h4>
                    <div className="space-y-2">
                      {dashboardData.categoryPerformance.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="text-sm text-gray-700">{item.category}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500" 
                                style={{width: `${item.score}%`}}
                              />
                            </div>
                            <span className="text-sm font-medium">{item.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;