import React from 'react';
import { Student, StudentListFilters } from '../../types/student';
import { Eye, MessageSquare, Sparkles } from 'lucide-react';

interface StudentListTableProps {
  students: Student[];
  filters: StudentListFilters;
  onFiltersChange: (filters: Partial<StudentListFilters>) => void;
  onStudentSelect: (student: Student) => void;
}

const StudentListTable: React.FC<StudentListTableProps> = ({
  students,
  filters,
  onFiltersChange,
  onStudentSelect
}) => {
  const getVRStatusBadge = (status: string) => {
    const configs = {
      'completed': { color: 'bg-green-100 text-green-800', label: '완료' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: '진행중' },
      'not-started': { color: 'bg-gray-100 text-gray-800', label: '미수행' }
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header with filters */}
      <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAFBFC' }}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">학습자 목록</h3>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="학생 검색..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ search: e.target.value })}
                className="block w-64 rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* VR Status Filter */}
            <select
              value={filters.vrStatus}
              onChange={(e) => onFiltersChange({ vrStatus: e.target.value as any })}
              className="rounded-lg border border-gray-300 text-sm py-2 px-3"
            >
              <option value="all">VR 상태</option>
              <option value="completed">완료</option>
              <option value="in-progress">진행중</option>
              <option value="not-started">미수행</option>
            </select>
            
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({ sortBy: e.target.value as any })}
              className="rounded-lg border border-gray-300 text-sm py-2 px-3"
            >
              <option value="name">이름순</option>
              <option value="achievement">성취율순</option>
              <option value="attendance">출석률순</option>
              <option value="vrSessions">VR세션순</option>
              <option value="recentScore">최근점수순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200" style={{ backgroundColor: '#F5F7FA' }}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                학생 정보
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                출석률
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                VR 세션
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                학습시간
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                최근 성과
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                VR 상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                조작
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {students.map((student) => (
              <tr 
                key={student.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onStudentSelect(student)}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId} · {student.grade} {student.class}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{Math.round(student.attendance.rate)}%</div>
                  <div className="text-xs text-gray-500">
                    출석 {student.attendance.present} / 결석 {student.attendance.absent}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.vrStats.sessionCount}회</div>
                  <div className="text-xs text-gray-500">
                    평균 {student.vrStats.avgLearningTime}분
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.vrStats.totalHours}h</div>
                  <div className="text-xs text-gray-500">
                    최근: {student.vrStats.lastAccessDate.toLocaleDateString('ko-KR')}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getScoreColor(student.recentScore.score)}`}>
                    {student.recentScore.score}점
                  </div>
                  <div className="text-xs text-gray-500">
                    {student.recentScore.passed ? '✅ 통과' : '⚠️ 미통과'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getVRStatusBadge(student.vrStatus)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStudentSelect(student);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                      title="상세보기"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-600 hover:text-gray-900 p-1 rounded"
                      title="피드백 작성"
                    >
                      <MessageSquare size={16} />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-purple-600 hover:text-purple-900 p-1 rounded"
                      title="모듈 배정"
                    >
                      <Sparkles size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 {students.length}명의 학습자
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              이전
            </button>
            <span className="text-sm text-gray-500">1 / 3</span>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListTable;
