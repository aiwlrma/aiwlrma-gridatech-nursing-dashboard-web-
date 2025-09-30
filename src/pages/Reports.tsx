import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  Target, 
  Award, 
  Bell, 
  Calendar,
  Settings,
  Share2,
  Printer,
  Mail,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  formats: string[];
  lastGenerated: string;
  downloadCount: number;
}

interface InsightCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface AlertItem {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  action?: string;
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data
  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      title: '학생별 성적표',
      description: '개별 학생의 상세 성적 및 성취율 리포트',
      icon: <Users size={24} />,
      formats: ['PDF', 'Excel'],
      lastGenerated: '2025-03-15',
      downloadCount: 45
    },
    {
      id: '2',
      title: '반/학년 전체 성과',
      description: '학급 및 학년별 종합 성과 분석 리포트',
      icon: <BarChart3 size={24} />,
      formats: ['PDF', 'Excel'],
      lastGenerated: '2025-03-14',
      downloadCount: 12
    },
    {
      id: '3',
      title: '교수자 피드백 로그',
      description: '교수자의 평가 및 피드백 기록 리포트',
      icon: <FileText size={24} />,
      formats: ['PDF'],
      lastGenerated: '2025-03-13',
      downloadCount: 8
    }
  ];

  const insightCards: InsightCard[] = [
    {
      id: '1',
      title: 'Top Performer',
      value: '김철수',
      change: 15,
      trend: 'up',
      icon: <Award size={20} />,
      color: 'text-green-600'
    },
    {
      id: '2',
      title: '개선 필요',
      value: '3명',
      change: -2,
      trend: 'down',
      icon: <AlertTriangle size={20} />,
      color: 'text-red-600'
    },
    {
      id: '3',
      title: '평균 성취율',
      value: '82.5%',
      change: 5.2,
      trend: 'up',
      icon: <Target size={20} />,
      color: 'text-blue-600'
    },
    {
      id: '4',
      title: 'VR 학습 시간',
      value: '156시간',
      change: 12,
      trend: 'up',
      icon: <Activity size={20} />,
      color: 'text-purple-600'
    }
  ];

  const weaknessData = [
    { skill: '무균술', errorRate: 30, students: 12 },
    { skill: 'IV 삽입', errorRate: 25, students: 8 },
    { skill: '손위생', errorRate: 20, students: 5 },
    { skill: '근육주사', errorRate: 18, students: 3 },
    { skill: 'CPR', errorRate: 15, students: 2 }
  ];

  const instructorActivity = [
    { activity: '평가 횟수', current: 156, target: 200, progress: 78 },
    { activity: '피드백 작성', current: 89, target: 120, progress: 74 },
    { activity: 'VR 콘텐츠', current: 12, target: 15, progress: 80 },
    { activity: '학생 상담', current: 23, target: 30, progress: 77 }
  ];

  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'error',
      title: '출석 미달 알림',
      message: '3명의 학생이 출석률 80% 미만',
      timestamp: '2시간 전',
      action: '자세히 보기'
    },
    {
      id: '2',
      type: 'warning',
      title: '평가 기준 미달',
      message: '5명의 학생이 중간고사 기준 미달',
      timestamp: '4시간 전',
      action: '자세히 보기'
    },
    {
      id: '3',
      type: 'info',
      title: '실습실 공지',
      message: '다음 주 VR 실습 일정 안내',
      timestamp: '1일 전',
      action: '자세히 보기'
    },
    {
      id: '4',
      type: 'success',
      title: '성과 개선',
      message: '2학년 A반 평균 성취율 5% 상승',
      timestamp: '2일 전',
      action: '자세히 보기'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle size={16} className="text-red-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'info': return <Bell size={16} className="text-blue-600" />;
      case 'success': return <CheckCircle size={16} className="text-green-600" />;
      default: return <Bell size={16} className="text-gray-600" />;
    }
  };

  const handleGenerateReport = (reportId: string) => {
    setSelectedReport(reportId);
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedReport(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              리포트
            </h1>
            <p className="text-sm text-gray-600 mt-1">학습 성과 및 분석 리포트를 생성하고 다운로드하세요</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">최근 1주</option>
              <option value="month">최근 1개월</option>
              <option value="semester">학기 전체</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText size={16} />
              리포트 생성
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Report Templates */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">리포트 다운로드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{template.title}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">지원 형식:</span>
                    <div className="flex gap-1">
                      {template.formats.map((format) => (
                        <span key={format} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>마지막 생성: {template.lastGenerated}</span>
                    <span>다운로드: {template.downloadCount}회</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleGenerateReport(template.id)}
                    disabled={isGenerating && selectedReport === template.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating && selectedReport === template.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        다운로드
                      </>
                    )}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    <Settings size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analysis Insights */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">분석 인사이트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {insightCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color.replace('text-', 'bg-').replace('-600', '-50')}`}>
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {card.trend === 'up' ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change > 0 ? '+' : ''}{card.change}%
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Analysis Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weakness Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">취약점 분석</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weaknessData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 35]} />
                  <YAxis type="category" dataKey="skill" width={80} />
                  <Tooltip />
                  <Bar dataKey="errorRate" fill="#EF4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Instructor Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">교수자 활동 분석</h3>
              <div className="space-y-4">
                {instructorActivity.map((activity, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{activity.activity}</span>
                      <span className="text-sm text-gray-600">{activity.current}/{activity.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activity.progress}% 완료</span>
                      <span className="text-xs text-gray-500">{activity.target - activity.current}개 남음</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">알림 & 공지</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold mb-1">{alert.title}</h4>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-75">{alert.timestamp}</span>
                      {alert.action && (
                        <button className="text-xs font-medium hover:underline">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer size={20} className="text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">인쇄</p>
                <p className="text-xs text-gray-500">리포트 인쇄</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 size={20} className="text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">공유</p>
                <p className="text-xs text-gray-500">리포트 공유</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail size={20} className="text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">이메일</p>
                <p className="text-xs text-gray-500">이메일 발송</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar size={20} className="text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">스케줄</p>
                <p className="text-xs text-gray-500">자동 생성</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;