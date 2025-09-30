import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Clock, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { Student } from '../../types/student';

interface StudentDetailDrawerProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({
  student,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!student) return null;

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-700 border-red-200',
      'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'low': 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[priority as keyof typeof colors];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-medium text-indigo-600">
                  {student.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.studentId} · {student.grade} {student.class}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm">
                    <span className="text-gray-500">출석:</span>
                    <span className="font-medium text-gray-900 ml-1">{Math.round(student.attendance.rate)}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">VR세션:</span>
                    <span className="font-medium text-gray-900 ml-1">{student.vrStats.sessionCount}회</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">학습시간:</span>
                    <span className="font-medium text-gray-900 ml-1">{student.vrStats.totalHours}h</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Achievement Ring */}
          <div className="mt-4 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#6366F1"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(student.overallAchievement / 100) * 251.2} 251.2`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{student.overallAchievement}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: '개요' },
              { id: 'performance', label: '성과 분석' },
              { id: 'skills', label: '술기 체크리스트' },
              { id: 'ai', label: 'AI 추천' },
              { id: 'vr', label: 'VR 세션' },
              { id: 'feedback', label: '피드백' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Weekly Progress */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">주간 성과 추이</h3>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  주간 추이 차트 (구현 예정)
                </div>
              </div>

              {/* Knowledge Assessment */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">지식 평가</h3>
                <div className="space-y-3">
                  {student.knowledgeScores.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{test.testName}</p>
                        <p className="text-sm text-gray-500">{test.date.toLocaleDateString('ko-KR')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(test.score)}`}>
                          {test.score}점
                        </span>
                        {test.passed ? (
                          <CheckCircle size={20} className="text-green-500" />
                        ) : (
                          <AlertCircle size={20} className="text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attitude Evaluation */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">태도 평가 요약</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(student.attitudeScores).filter(([key]) => key !== 'average').map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}점</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-indigo-900">평균 점수</span>
                    <span className="text-lg font-bold text-indigo-900">{student.attitudeScores.average}점</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">술기 수행 정확도</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">술기명</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">점수</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">합격</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">시도횟수</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {student.skillChecklist.map((skill, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{skill.skillName}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(skill.score)}`}>
                              {skill.score}점
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {skill.passed ? (
                              <CheckCircle size={20} className="text-green-500" />
                            ) : (
                              <AlertCircle size={20} className="text-red-500" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{skill.date.toLocaleDateString('ko-KR')}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{skill.attempts}회</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-900">AI 추천 모듈</h3>
                <div className="space-y-4">
                  {student.aiRecommendations.map((rec, index) => (
                    <div key={index} className="bg-white rounded-lg border border-purple-200 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{rec.moduleName}</h4>
                            <p className="text-sm text-gray-600">{rec.reason}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          우선순위 {rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '보통' : '낮음'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">예상 향상도</p>
                          <p className="font-semibold text-green-600">+{rec.expectedImprovement}점</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">예상 소요시간</p>
                          <p className="font-semibold text-blue-600">{rec.estimatedDuration}분</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>매칭도</span>
                          <span>{rec.matchScore}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 transition-all"
                            style={{ width: `${rec.matchScore}%` }}
                          />
                        </div>
                      </div>
                      
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        모듈 배정하기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vr' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">VR 세션 기록</h3>
                <div className="space-y-3">
                  {student.vrSessions.map((session, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{session.moduleName}</h4>
                          <p className="text-sm text-gray-500">{session.date.toLocaleDateString('ko-KR')}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(session.score)}`}>
                          {session.score}점
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">학습 시간</p>
                          <p className="font-medium">{session.duration}분</p>
                        </div>
                        <div>
                          <p className="text-gray-500">정확도</p>
                          <p className="font-medium">{session.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">오류 횟수</p>
                          <p className="font-medium">{session.errors}회</p>
                        </div>
                        <div>
                          <p className="text-gray-500">크리티컬 오류</p>
                          <p className="font-medium">{session.criticalErrors}회</p>
                        </div>
                      </div>
                      
                      {session.criticalErrors > 0 && (
                        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                          <AlertCircle size={16} className="text-red-600" />
                          <span className="text-sm text-red-700">
                            크리티컬 오류 {session.criticalErrors}건 발생
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Comparison */}
              {student.progressComparison && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">학습 성장 분석</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">점수</p>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">첫 시도</p>
                          <p className="text-2xl font-bold text-gray-400">{student.progressComparison.firstAttempt.score}</p>
                        </div>
                        <TrendingUp size={20} className="text-gray-400" />
                        <div className="text-center">
                          <p className="text-xs text-gray-500">최근</p>
                          <p className="text-2xl font-bold text-green-600">{student.progressComparison.latestAttempt.score}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <TrendingUp size={16} className="text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                          +{student.progressComparison.improvement.scoreChange}점
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">오류율</p>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">첫 시도</p>
                          <p className="text-2xl font-bold text-gray-400">{student.progressComparison.firstAttempt.errorRate}%</p>
                        </div>
                        <TrendingDown size={20} className="text-gray-400" />
                        <div className="text-center">
                          <p className="text-xs text-gray-500">최근</p>
                          <p className="text-2xl font-bold text-blue-600">{student.progressComparison.latestAttempt.errorRate}%</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <TrendingDown size={16} className="text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">
                          {student.progressComparison.improvement.errorRateChange}%p 감소
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">소요 시간</p>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">첫 시도</p>
                          <p className="text-2xl font-bold text-gray-400">{student.progressComparison.firstAttempt.duration}분</p>
                        </div>
                        <Clock size={20} className="text-gray-400" />
                        <div className="text-center">
                          <p className="text-xs text-gray-500">최근</p>
                          <p className="text-2xl font-bold text-purple-600">{student.progressComparison.latestAttempt.duration}분</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Clock size={16} className="text-purple-500" />
                        <span className="text-sm text-purple-600 font-medium">
                          {Math.abs(student.progressComparison.improvement.durationChange)}분 단축
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-green-600" />
                      <p className="text-sm font-semibold text-green-800">
                        전체 {student.progressComparison.improvement.percentImprovement}% 향상
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">교수자 피드백</h3>
              <div className="space-y-4">
                {student.instructorFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{feedback.instructorName}</p>
                        <p className="text-sm text-gray-500">{feedback.timestamp.toLocaleDateString('ko-KR')}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.category === 'strength' ? 'bg-green-100 text-green-700' :
                        feedback.category === 'weakness' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {feedback.category === 'strength' ? '강점' :
                         feedback.category === 'weakness' ? '약점' : '권장사항'}
                      </span>
                    </div>
                    <p className="text-gray-700">{feedback.note}</p>
                  </div>
                ))}
              </div>
              
              {/* New Feedback Form */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">새 피드백 작성</h4>
                <textarea
                  placeholder="학생에 대한 피드백을 작성하세요..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="flex items-center gap-2 mt-3">
                  <select className="rounded-md border-gray-300 text-sm">
                    <option value="strength">강점</option>
                    <option value="weakness">약점</option>
                    <option value="recommendation">권장사항</option>
                  </select>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                    저장
                  </button>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">
                    재교육 모듈 배정
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDetailDrawer;
