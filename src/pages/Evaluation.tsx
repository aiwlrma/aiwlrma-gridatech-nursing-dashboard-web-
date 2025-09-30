import React, { useState } from 'react';
import { 
  ClipboardList, 
  TrendingUp, 
  Award, 
  AlertCircle,
  Plus,
  Eye,
  Edit2,
  MoreVertical,
  Search,
  X,
  Users
} from 'lucide-react';
import StatCard from '../components/StatCard';

interface EvaluationItem {
  id: string;
  title: string;
  type: 'knowledge' | 'attitude' | 'skill';
  category: string;
  totalStudents: number;
  submittedCount: number;
  gradedCount: number;
  averageScore: number;
  passRate: number;
  deadline: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

const Evaluation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showGradingModal, setShowGradingModal] = useState(false);

  const evaluationItems: EvaluationItem[] = [
    {
      id: '1',
      title: '중간고사 - 간호학 개론',
      type: 'knowledge',
      category: '필기시험',
      totalStudents: 45,
      submittedCount: 45,
      gradedCount: 45,
      averageScore: 82.3,
      passRate: 87,
      deadline: '2025-03-15',
      status: 'completed'
    },
    {
      id: '2',
      title: '손위생 프로토콜 술기 평가',
      type: 'skill',
      category: 'VR 실습',
      totalStudents: 45,
      submittedCount: 38,
      gradedCount: 31,
      averageScore: 91.2,
      passRate: 92,
      deadline: '2025-03-20',
      status: 'in-progress'
    },
    {
      id: '3',
      title: '환자 커뮤니케이션 평가',
      type: 'attitude',
      category: '관찰 평가',
      totalStudents: 45,
      submittedCount: 0,
      gradedCount: 0,
      averageScore: 0,
      passRate: 0,
      deadline: '2025-04-05',
      status: 'not-started'
    }
  ];

  const filteredItems = evaluationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || item.type === selectedTab;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesTab && matchesStatus;
  });

  const getTypeBadge = (type: string) => {
    const badges = {
      knowledge: 'bg-purple-100 text-purple-700',
      skill: 'bg-blue-100 text-blue-700',
      attitude: 'bg-green-100 text-green-700'
    };
    const labels = {
      knowledge: '지식',
      skill: '기술',
      attitude: '태도'
    };
    return { className: badges[type as keyof typeof badges], label: labels[type as keyof typeof labels] };
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      'not-started': 'bg-gray-100 text-gray-700'
    };
    const labels = {
      completed: '완료',
      'in-progress': '진행중',
      'not-started': '미시작'
    };
    return { className: badges[status as keyof typeof badges], label: labels[status as keyof typeof labels] };
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredItems.length 
        ? [] 
        : filteredItems.map(item => item.id)
    );
  };

  return (
    <div>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">평가 관리</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="평가 대기"
          value="23"
          subtitle="채점이 필요한 제출물"
          icon={<ClipboardList size={24} />}
          color="orange"
        />
        <StatCard
          title="평균 점수"
          value="84.5"
          trend="+2.3 (전주 대비)"
          icon={<TrendingUp size={24} />}
          color="green"
        />
        <StatCard
          title="합격률"
          value="87%"
          subtitle="143/165 학생"
          icon={<Award size={24} />}
          color="blue"
        />
        <StatCard
          title="미완료 평가"
          value="12"
          subtitle="5개 술기 항목"
          icon={<AlertCircle size={24} />}
          color="red"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Evaluation Items */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Header with tabs and search */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="search"
                      placeholder="평가 항목 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 상태</option>
                    <option value="in-progress">진행중</option>
                    <option value="completed">완료</option>
                    <option value="not-started">미시작</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  새 평가 항목
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: 'all', label: '전체', count: 25 },
                  { id: 'knowledge', label: '지식 평가', count: 8 },
                  { id: 'attitude', label: '태도 평가', count: 5 },
                  { id: 'skill', label: '기술 평가', count: 12 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      평가 항목
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      유형
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      제출/평가
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      평균 점수
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      합격률
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      마감일
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => {
                    const typeBadge = getTypeBadge(item.type);
                    const statusBadge = getStatusBadge(item.status);
                    const pendingCount = item.submittedCount - item.gradedCount;
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelect(item.id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">
                              {typeBadge.label} · {item.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeBadge.className}`}>
                            {typeBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {pendingCount > 0 ? (
                            <span className="text-orange-600 font-medium">{pendingCount}</span>
                          ) : (
                            <span className="text-gray-600">{item.gradedCount}</span>
                          )} / {item.totalStudents}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {item.averageScore > 0 ? item.averageScore.toFixed(1) : '-'}
                        </td>
                        <td className="px-4 py-3">
                          {item.passRate > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500" 
                                  style={{ width: `${item.passRate}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-700">{item.passRate}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {item.deadline}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.className}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                              <Edit2 size={16} />
                            </button>
                            {item.status === 'in-progress' && pendingCount > 0 && (
                              <button 
                                onClick={() => setShowGradingModal(true)}
                                className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                              >
                                채점하기
                              </button>
                            )}
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                총 {filteredItems.length}개 평가 항목 · {selectedItems.length}개 선택됨
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                  일괄 수정
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                  내보내기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Quick Stats */}
        <div className="space-y-4">
          {/* Pending items */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">평가 대기</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">손위생 술기</span>
                <span className="font-medium text-orange-600">7명</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">IV 삽입</span>
                <span className="font-medium text-orange-600">12명</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">CPR</span>
                <span className="font-medium text-orange-600">4명</span>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">최근 평가 활동</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-900">김철수 - 손위생 술기</p>
                <p className="text-xs text-gray-500">92점 · 5분 전</p>
              </div>
              <div>
                <p className="text-gray-900">이영희 - 근육주사</p>
                <p className="text-xs text-gray-500">87점 · 12분 전</p>
              </div>
              <div>
                <p className="text-gray-900">박민수 - CPR</p>
                <p className="text-xs text-gray-500">95점 · 18분 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grading Modal */}
      {showGradingModal && (
        <div className="fixed inset-0 bg-gray-900 z-50">
          {/* Header */}
          <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowGradingModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">손위생 프로토콜 술기 평가</h2>
                <p className="text-sm text-gray-600">45명 중 38명 제출 · 7명 평가 대기</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">김철수 (1/7)</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  이전
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  다음
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                저장 후 다음
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="h-[calc(100vh-64px)] flex">
            {/* Left: Submission view */}
            <div className="flex-1 bg-black flex items-center justify-center">
              <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Users size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">VR 세션 영상</p>
                    <p className="text-sm text-gray-400">김철수의 손위생 프로토콜 실습</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Grading panel */}
            <div className="w-[480px] bg-white overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Student info */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">김</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">김철수</p>
                    <p className="text-sm text-gray-600">20210001 · 2학년 A반</p>
                  </div>
                </div>

                {/* Rubric scoring */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">평가 루브릭</h3>
                  
                  {/* Criterion 1 */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">손 위생 프로토콜</span>
                      <span className="text-sm text-gray-600">20점</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[5,4,3,2,1].map(level => (
                        <button 
                          key={level}
                          className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 hover:border-blue-500"
                        >
                          {level}점
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      모든 단계 완벽 수행
                    </p>
                  </div>

                  {/* Criterion 2 */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">장갑 착용</span>
                      <span className="text-sm text-gray-600">15점</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[5,4,3,2,1].map(level => (
                        <button 
                          key={level}
                          className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                        >
                          {level}점
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total score */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">총점</span>
                    <span className="text-2xl font-bold text-blue-600">0 / 100</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{width: '0%'}} />
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    피드백
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="학생에게 전달할 피드백을 작성하세요..."
                  />
                  
                  {/* Quick comments */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50">
                      + 손 위생 우수
                    </button>
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50">
                      + 각도 개선 필요
                    </button>
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50">
                      + 시간 단축 가능
                    </button>
                  </div>
                </div>

                {/* Critical errors */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={18} className="text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">크리티컬 오류 체크</p>
                      <label className="flex items-center gap-2 mt-2 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span>환자안전 규정 위반</span>
                      </label>
                      <label className="flex items-center gap-2 mt-1 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span>무균술 중대 위반</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;
