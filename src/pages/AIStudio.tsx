import React, { useState } from 'react';
import { 
  Brain, 
  Play, 
  Maximize2, 
  X, 
  Download, 
  Filter, 
  Settings, 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AIRecommendation {
  id: string;
  moduleName: string;
  studentName: string;
  score: number;
  reason: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedImprovement: number;
  duration: string;
  assigned: boolean;
}

interface VRLog {
  id: string;
  studentName: string;
  moduleName: string;
  thumbnail: string;
  duration: string;
  score: number;
  errors: number;
  lastPlayed: string;
  status: 'completed' | 'in-progress' | 'failed';
}

interface NotificationRule {
  id: string;
  name: string;
  condition: string;
  channel: 'app' | 'email' | 'both';
  enabled: boolean;
  triggerCount: number;
}

const AIStudio: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('recommendations');
  const [selectedVideo, setSelectedVideo] = useState<VRLog | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('week');

  // Sample data
  const aiRecommendations: AIRecommendation[] = [
    {
      id: '1',
      moduleName: '손위생 프로토콜',
      studentName: '김철수',
      score: 92,
      reason: '손위생 오류율 30% 증가',
      priority: 'urgent',
      estimatedImprovement: 15,
      duration: '25분',
      assigned: false
    },
    {
      id: '2',
      moduleName: 'IV 라인 삽입',
      studentName: '이영희',
      score: 88,
      reason: '삽입 정확도 개선 필요',
      priority: 'high',
      estimatedImprovement: 12,
      duration: '30분',
      assigned: true
    },
    {
      id: '3',
      moduleName: '근육주사 술기',
      studentName: '박민수',
      score: 85,
      reason: '주사 각도 정확도 부족',
      priority: 'medium',
      estimatedImprovement: 8,
      duration: '20분',
      assigned: false
    }
  ];

  const vrLogs: VRLog[] = [
    {
      id: '1',
      studentName: '김철수',
      moduleName: '손위생 프로토콜',
      thumbnail: '/api/placeholder/300/200',
      duration: '25:30',
      score: 78,
      errors: 3,
      lastPlayed: '2시간 전',
      status: 'completed'
    },
    {
      id: '2',
      studentName: '이영희',
      moduleName: 'IV 라인 삽입',
      thumbnail: '/api/placeholder/300/200',
      duration: '32:15',
      score: 85,
      errors: 1,
      lastPlayed: '4시간 전',
      status: 'in-progress'
    },
    {
      id: '3',
      studentName: '박민수',
      moduleName: '근육주사 술기',
      thumbnail: '/api/placeholder/300/200',
      duration: '18:45',
      score: 65,
      errors: 5,
      lastPlayed: '6시간 전',
      status: 'failed'
    }
  ];

  const notificationRules: NotificationRule[] = [
    {
      id: '1',
      name: '성취율 저조 알림',
      condition: '성취율 70% 미만',
      channel: 'both',
      enabled: true,
      triggerCount: 12
    },
    {
      id: '2',
      name: 'VR 미사용 알림',
      condition: '3일 이상 VR 미사용',
      channel: 'app',
      enabled: true,
      triggerCount: 5
    },
    {
      id: '3',
      name: '오류율 증가 알림',
      condition: '오류율 20% 이상',
      channel: 'email',
      enabled: false,
      triggerCount: 0
    }
  ];

  const performanceData = [
    { week: '1주차', before: 75, after: 78 },
    { week: '2주차', before: 78, after: 82 },
    { week: '3주차', before: 82, after: 85 },
    { week: '4주차', before: 85, after: 88 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return '긴급';
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'in-progress': return '진행중';
      case 'failed': return '실패';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              AI Studio
            </h1>
            <p className="text-sm text-gray-600 mt-1">AI 기반 학습 추천과 자동 알림을 관리하세요</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">최근 1주</option>
              <option value="month">최근 1개월</option>
              <option value="semester">학기 전체</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              내보내기
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: 'recommendations', label: 'AI 추천', icon: Brain },
              { id: 'vr-logs', label: 'VR 로그', icon: Play },
              { id: 'notifications', label: '알림 관리', icon: Bell },
              { id: 'analytics', label: '분석', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Recommendations */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">AI 학습 추천</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {aiRecommendations.length}개 추천
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {aiRecommendations.map((recommendation) => (
                        <motion.div
                          key={recommendation.id}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-base font-medium text-gray-900">{recommendation.moduleName}</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(recommendation.priority)}`}>
                                  {getPriorityLabel(recommendation.priority)}
                                </span>
                                {recommendation.assigned && (
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                    배정됨
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{recommendation.studentName} • {recommendation.reason}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>추천 점수: <strong className="text-gray-900">{recommendation.score}점</strong></span>
                                <span>예상 개선: <strong className="text-green-600">+{recommendation.estimatedImprovement}점</strong></span>
                                <span>소요 시간: <strong className="text-gray-900">{recommendation.duration}</strong></span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                {recommendation.assigned ? '배정됨' : '배정하기'}
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                                <Settings size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 주 성과</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">추천 모듈 배정</span>
                        <span className="text-lg font-bold text-blue-600">8개</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">성취율 개선</span>
                        <span className="text-lg font-bold text-green-600">+12%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">VR 학습 증가</span>
                        <span className="text-lg font-bold text-purple-600">+2.5시간</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Zap size={16} />
                        일괄 모듈 배정
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <RefreshCw size={16} />
                        AI 추천 새로고침
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <BarChart3 size={16} />
                        성과 리포트 생성
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'vr-logs' && (
            <motion.div
              key="vr-logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* VR Logs Grid */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">VR 로그 & 영상</h3>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <Filter size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vrLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          whileHover={{ scale: 1.02 }}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedVideo(log);
                            setVideoModalOpen(true);
                          }}
                        >
                          <div className="relative">
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <Play size={32} className="text-gray-400" />
                            </div>
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                                {getStatusLabel(log.status)}
                              </span>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                              {log.duration}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-1">{log.moduleName}</h4>
                            <p className="text-sm text-gray-600 mb-2">{log.studentName}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">점수: <strong className="text-gray-900">{log.score}점</strong></span>
                              <span className="text-gray-500">오류: <strong className="text-red-600">{log.errors}개</strong></span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">{log.lastPlayed}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* VR Analytics */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">VR 학습 통계</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">총 학습 시간</span>
                        <span className="text-lg font-bold text-blue-600">156시간</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">완료된 세션</span>
                        <span className="text-lg font-bold text-green-600">89개</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">평균 점수</span>
                        <span className="text-lg font-bold text-purple-600">82점</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
                    <div className="space-y-3">
                      {vrLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Play size={14} className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{log.studentName}</p>
                            <p className="text-xs text-gray-500">{log.moduleName}</p>
                          </div>
                          <span className="text-xs text-gray-500">{log.lastPlayed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Rules */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">알림 규칙 관리</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      새 규칙 추가
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {notificationRules.map((rule) => (
                      <div key={rule.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-base font-medium text-gray-900">{rule.name}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                rule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {rule.enabled ? '활성' : '비활성'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">조건: {rule.condition}</p>
                            <p className="text-sm text-gray-500">채널: {rule.channel === 'both' ? '앱 + 이메일' : rule.channel === 'app' ? '앱' : '이메일'}</p>
                            <p className="text-sm text-gray-500">발송 횟수: {rule.triggerCount}회</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={rule.enabled}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">활성</span>
                            </label>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                              <Settings size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">이메일 알림</p>
                          <p className="text-xs text-gray-500">중요한 알림을 이메일로 받기</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">앱 내 알림</p>
                          <p className="text-xs text-gray-500">실시간 푸시 알림 받기</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">주간 요약</p>
                          <p className="text-xs text-gray-500">매주 월요일 성과 요약 받기</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 알림</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle size={16} className="text-red-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">성취율 저조 알림</p>
                          <p className="text-xs text-gray-600">김철수 학생의 성취율이 70% 미만</p>
                        </div>
                        <span className="text-xs text-gray-500">2시간 전</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Clock size={16} className="text-yellow-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">VR 미사용 알림</p>
                          <p className="text-xs text-gray-600">박민수 학생이 3일간 VR 미사용</p>
                        </div>
                        <span className="text-xs text-gray-500">6시간 전</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">AI 추천 성과</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="before" stroke="#94A3B8" strokeWidth={2} name="추천 전" />
                      <Line type="monotone" dataKey="after" stroke="#3B82F6" strokeWidth={2} name="추천 후" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary Cards */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 주 요약</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-600" />
                          <span className="text-sm font-medium text-gray-900">추천 모듈 배정</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">8개</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TrendingUp size={20} className="text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">성취율 개선</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">+12%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock size={20} className="text-purple-600" />
                          <span className="text-sm font-medium text-gray-900">학습 시간 증가</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">+2.5시간</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">인사이트</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">💡 최고 성과</p>
                        <p className="text-xs text-blue-700">손위생 프로토콜 모듈이 가장 효과적</p>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-900">⚠️ 주의사항</p>
                        <p className="text-xs text-yellow-700">3명의 학생이 VR 학습을 중단</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-900">🎯 권장사항</p>
                        <p className="text-xs text-green-700">더 많은 학생에게 AI 추천 적용</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-white rounded-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.moduleName}</h3>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <Play size={48} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Play size={16} />
                        재생
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        <Download size={16} />
                        다운로드
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        <Maximize2 size={16} />
                        전체화면
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">세션 정보</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">학생</span>
                          <span className="font-medium">{selectedVideo.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">점수</span>
                          <span className="font-medium">{selectedVideo.score}점</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">오류</span>
                          <span className="font-medium text-red-600">{selectedVideo.errors}개</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">소요시간</span>
                          <span className="font-medium">{selectedVideo.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">상태</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedVideo.status)}`}>
                            {getStatusLabel(selectedVideo.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">주요 이벤트</h4>
                      <div className="space-y-2">
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-xs">
                          <span className="font-medium text-red-700">00:15</span> - 손 위생 절차 누락
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                          <span className="font-medium text-yellow-700">00:32</span> - 장갑 착용 지연
                        </div>
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                          <span className="font-medium text-green-700">01:20</span> - 올바른 절차 수행
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIStudio;