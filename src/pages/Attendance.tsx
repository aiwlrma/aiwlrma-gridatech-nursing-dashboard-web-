import React, { useState } from 'react';
import { 
  CheckCircle, 
  Users, 
  AlertTriangle, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  XCircle,
  MessageSquare,
  Phone,
  Search,
  Calendar
} from 'lucide-react';
import StatCard from '../components/StatCard';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  date: string;
  sessionType: 'practice' | 'vr' | 'seminar' | 'evaluation';
  status: 'present' | 'late' | 'absent' | 'excused';
  checkInTime?: string;
  checkOutTime?: string;
  duration?: string;
  attendanceRate: number;
  note?: string;
}

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-03-15');
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: '20210001',
      studentName: '김철수',
      studentClass: '2학년 A반',
      date: '2025-03-15',
      sessionType: 'practice',
      status: 'present',
      checkInTime: '08:55',
      checkOutTime: '17:10',
      duration: '8시간 15분',
      attendanceRate: 95,
      note: ''
    },
    {
      id: '2',
      studentId: '20210002',
      studentName: '이영희',
      studentClass: '2학년 A반',
      date: '2025-03-15',
      sessionType: 'practice',
      status: 'late',
      checkInTime: '09:25',
      checkOutTime: '17:05',
      duration: '7시간 40분',
      attendanceRate: 88,
      note: '교통 지연'
    },
    {
      id: '3',
      studentId: '20210003',
      studentName: '박민수',
      studentClass: '2학년 A반',
      date: '2025-03-15',
      sessionType: 'practice',
      status: 'absent',
      checkInTime: undefined,
      checkOutTime: undefined,
      duration: '0시간',
      attendanceRate: 72,
      note: '개인 사정'
    }
  ];

  const atRiskStudents = [
    { id: '1', name: '박민수', rate: 72, absences: 5 },
    { id: '2', name: '최영수', rate: 78, absences: 3 },
    { id: '3', name: '정수진', rate: 75, absences: 4 }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      present: 'bg-green-100 text-green-700',
      late: 'bg-orange-100 text-orange-700',
      absent: 'bg-red-100 text-red-700',
      excused: 'bg-blue-100 text-blue-700'
    };
    const labels = {
      present: '출석',
      late: '지각',
      absent: '결석',
      excused: '공결'
    };
    const icons = {
      present: <CheckCircle size={14} className="mr-1" />,
      late: <Clock size={14} className="mr-1" />,
      absent: <XCircle size={14} className="mr-1" />,
      excused: <Calendar size={14} className="mr-1" />
    };
    return { 
      className: badges[status as keyof typeof badges], 
      label: labels[status as keyof typeof labels],
      icon: icons[status as keyof typeof icons]
    };
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">출석 관리</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="전체 출석률"
          value="92.3%"
          trend={{ value: 1.5, direction: 'up', label: '전주 대비' }}
          icon={<CheckCircle size={24} />}
          color="green"
        />
        <StatCard
          title="오늘 출석"
          value="43/45"
          subtitle="실시간 업데이트"
          icon={<Users size={24} />}
          color="blue"
        />
        <StatCard
          title="출석 미달"
          value="5"
          subtitle="80% 미만 학생"
          icon={<AlertTriangle size={24} />}
          color="red"
        />
        <StatCard
          title="이번 주 지각"
          value="12"
          subtitle="전주 대비 -3"
          icon={<Clock size={24} />}
          color="orange"
        />
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">출석 캘린더</h3>
            <div className="flex rounded-lg border border-gray-300 p-1">
              <button 
                onClick={() => setViewMode('monthly')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === 'monthly' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                월별
              </button>
              <button 
                onClick={() => setViewMode('weekly')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === 'weekly' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                주별
              </button>
              <button 
                onClick={() => setViewMode('daily')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === 'daily' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                일별
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 학생</option>
              <option value="2A">2학년 A반</option>
              <option value="2B">2학년 B반</option>
              <option value="3A">3학년 A반</option>
            </select>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                2025년 3월
              </span>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              오늘
            </button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="bg-gray-50 px-3 py-2 text-center text-xs font-semibold text-gray-700">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: 35 }, (_, index) => {
              const day = index - 2; // Start from Sunday of previous week
              const isCurrentMonth = day >= 1 && day <= 31;
              const isToday = day === 15;
              const hasSession = [3, 4, 5, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 24, 25, 26, 27, 28].includes(day);
              
              return (
                <div 
                  key={index}
                  className={`
                    bg-white px-3 py-4 min-h-[100px] cursor-pointer hover:bg-gray-50 transition-colors
                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                    ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
                  `}
                  onClick={() => setSelectedDate(`2025-03-${day.toString().padStart(2, '0')}`)}
                >
                  <div className="text-sm font-medium mb-2">{day > 0 ? day : ''}</div>
                  
                  {/* Attendance stats for this day */}
                  {hasSession && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">출석</span>
                        <span className="font-medium text-green-600">{Math.floor(Math.random() * 5) + 40}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">결석</span>
                        <span className="font-medium text-red-600">{Math.floor(Math.random() * 3)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">지각</span>
                        <span className="font-medium text-orange-600">{Math.floor(Math.random() * 3)}</span>
                      </div>
                      
                      {/* Attendance rate badge */}
                      <div className="mt-2 px-2 py-1 bg-green-50 rounded text-xs text-center font-medium text-green-700">
                        {Math.floor(Math.random() * 20) + 80}%
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Attendance Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-base font-semibold text-gray-900">
              {selectedDate} 출석 현황
            </h3>
            <span className="text-sm text-gray-600">
              실습: 09:00-17:00 · 세브란스 내과병동
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="search"
                placeholder="학생 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="present">출석</option>
              <option value="late">지각</option>
              <option value="absent">결석</option>
              <option value="excused">조퇴</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              출석 체크
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <Download size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  학생
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  출석 상태
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  체크인 시간
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  체크아웃 시간
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  실습 시간
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  누적 출석률
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {record.studentName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.studentName}</p>
                          <p className="text-xs text-gray-500">{record.studentId} · {record.studentClass}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}>
                        {statusBadge.icon}
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {record.checkInTime || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {record.checkOutTime || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {record.duration}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className={`h-full ${
                              record.attendanceRate >= 90 ? 'bg-green-500' :
                              record.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${record.attendanceRate}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          record.attendanceRate >= 90 ? 'text-green-600' :
                          record.attendanceRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {record.attendanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {record.status === 'absent' ? (
                        <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
                          사유 입력
                        </button>
                      ) : (
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Summary footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600">
              총 45명
            </span>
            <span className="text-green-600 font-medium">
              출석: 40명 (88.9%)
            </span>
            <span className="text-orange-600 font-medium">
              지각: 3명 (6.7%)
            </span>
            <span className="text-red-600 font-medium">
              결석: 2명 (4.4%)
            </span>
          </div>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            결석자에게 알림 발송
          </button>
        </div>
      </div>

      {/* Statistics & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly trend chart placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">주간 출석률 추이</h3>
            <select className="px-3 py-1.5 border border-gray-300 rounded text-sm">
              <option>최근 4주</option>
              <option>최근 8주</option>
              <option>학기 전체</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            차트 영역 (Recharts 라인 차트)
          </div>
        </div>
        
        {/* At-risk students */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">출석 미달 학생 (80% 미만)</h3>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              {atRiskStudents.length}명
            </span>
          </div>
          <div className="space-y-3">
            {atRiskStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-600">
                      출석률: <span className="text-red-600 font-medium">{student.rate}%</span>
                      {' · '}
                      결석: {student.absences}회
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-white rounded">
                    <MessageSquare size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-white rounded">
                    <Phone size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
            전체 학생에게 경고 알림
          </button>
        </div>
      </div>

      {/* Attendance Records History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">출석 기록 내역</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>전체 학생</option>
              <option>김철수</option>
              <option>이영희</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>전체 유형</option>
              <option>실습</option>
              <option>VR 세션</option>
              <option>세미나</option>
              <option>평가</option>
            </select>
            <input 
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-sm text-gray-500">~</span>
            <input 
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              조회
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">학생</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">유형</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">시간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">2025-03-15</td>
                  <td className="px-4 py-3">김철수</td>
                  <td className="px-4 py-3">실습</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      출석
                    </span>
                  </td>
                  <td className="px-4 py-3">08:55 - 17:10</td>
                  <td className="px-4 py-3 text-gray-500">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">2025-03-15</td>
                  <td className="px-4 py-3">이영희</td>
                  <td className="px-4 py-3">실습</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      지각
                    </span>
                  </td>
                  <td className="px-4 py-3">09:25 - 17:05</td>
                  <td className="px-4 py-3 text-gray-500">교통 지연</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;