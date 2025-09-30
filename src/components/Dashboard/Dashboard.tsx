import React, { useState } from 'react';
import { Users, Target, Activity, TrendingUp, Filter, Calendar, MapPin, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { sampleKPIData, sampleRecentActivities } from '../../data/sampleData';
import PageHeader from '../Common/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../design-system/components/Card';
import Button from '../../design-system/components/Button';
import Input from '../../design-system/components/Input';

const Dashboard: React.FC = () => {
  // Filter state
  const [filters, setFilters] = useState({
    term: '2025-1',
    rotation: '성인간호학',
    ward: '전체',
    startDate: '2025-03-01',
    endDate: '2025-06-30'
  });

  const applyFilters = () => {
    // Filter logic would be implemented here
    console.log('Applying filters:', filters);
  };

  // KPI Cards Data
  const kpiCards = [
    {
      title: '실습학생 수',
      value: sampleKPIData.totalStudents,
      unit: '명',
      icon: Users,
      trend: `+${sampleKPIData.trends.students}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: '컴피턴시 수',
      value: sampleKPIData.totalCompetencies,
      unit: '개',
      icon: Target,
      trend: `+${sampleKPIData.trends.competencies}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'OSCE 스테이션',
      value: sampleKPIData.totalOSCEStations,
      unit: '개',
      icon: Activity,
      trend: `+${sampleKPIData.trends.stations}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: '평균 컴피턴시율',
      value: sampleKPIData.averageCompetencyRate,
      unit: '%',
      icon: TrendingUp,
      trend: `+${sampleKPIData.trends.competencyRate}%`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Competency Distribution Data
  const competencyData = [
    { name: '통과', value: 36, color: '#10B981' },
    { name: '재시', value: 7, color: '#F59E0B' },
    { name: '미달', value: 2, color: '#EF4444' }
  ];

  // Skills Performance Data
  const skillsData = [
    { name: '혈압측정', score: 85, fullScore: 100 },
    { name: '근육주사', score: 78, fullScore: 100 },
    { name: 'IV 삽입', score: 82, fullScore: 100 },
    { name: 'CPR', score: 88, fullScore: 100 },
    { name: '무균술', score: 92, fullScore: 100 },
    { name: '투약 5-Rights', score: 90, fullScore: 100 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <PageHeader 
        title="대시보드" 
        subtitle="전체 실습생 현황과 평가 진행 상태를 한눈에 확인하세요" 
      />

      {/* Enhanced Filter Bar */}
      <Card variant="elevated" className="sticky top-0 z-10 animate-slide-in-down">
        <CardContent padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-primary-500" />
                학기
              </label>
              <select 
                value={filters.term}
                onChange={(e) => setFilters({...filters, term: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="2025-1">2025-1</option>
                <option value="2024-2">2024-2</option>
                <option value="2024-1">2024-1</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">로테이션</label>
              <select 
                value={filters.rotation}
                onChange={(e) => setFilters({...filters, rotation: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="성인간호학">성인간호학</option>
                <option value="아동간호학">아동간호학</option>
                <option value="모성간호학">모성간호학</option>
                <option value="정신간호학">정신간호학</option>
                <option value="지역사회간호학">지역사회간호학</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                병동
              </label>
              <select 
                value={filters.ward}
                onChange={(e) => setFilters({...filters, ward: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="전체">전체</option>
                <option value="내과병동">내과병동</option>
                <option value="외과병동">외과병동</option>
                <option value="중환자실">중환자실</option>
                <option value="응급실">응급실</option>
                <option value="수술실">수술실</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                기간
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>
            
            <Button 
              onClick={applyFilters}
              variant="primary"
              size="lg"
              fullWidth
              className="hover-lift"
            >
              <Filter className="w-4 h-4 mr-2" />
              적용
            </Button>
          </div>
          
          {/* Enhanced Filter Summary */}
          <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">현재 선택:</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                    {filters.term}학기
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                    {filters.rotation}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                    {filters.ward === '전체' ? '전체 병동' : filters.ward}
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                45명
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.trend.startsWith('+');
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card 
              key={index} 
              variant="elevated" 
              className="card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${card.bgColor} animate-float`}>
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {card.value}
                        <span className="text-lg font-normal text-gray-500 ml-1">{card.unit}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isPositive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendIcon className="w-3 h-3 mr-1" />
                      {card.trend}
                    </div>
                    <span className="text-sm text-gray-500">전월 대비</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isPositive ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${Math.min(Math.abs(parseInt(card.trend)), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Distribution */}
        <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-500" />
              컴피턴시 달성 분포
            </CardTitle>
            <CardDescription>
              전체 실습생의 컴피턴시 달성 현황을 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={competencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {competencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}명`, '학생 수']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {competencyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3 animate-pulse" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{item.value}명</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((item.value / 45) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Performance */}
        <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary-500" />
              술기 항목별 평균 점수
            </CardTitle>
            <CardDescription>
              핵심 술기 항목들의 평균 성과를 비교하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                    stroke="#6b7280"
                  />
                  <YAxis domain={[0, 100]} stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value: number) => [`${value}점`, '평균 점수']}
                    labelFormatter={(label) => `술기: ${label}`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="url(#gradient)" 
                    radius={[4, 4, 0, 0]}
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Activities */}
      <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary-500" />
            최근 활동
          </CardTitle>
          <CardDescription>
            실시간으로 업데이트되는 학생 활동 현황을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleRecentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-purple-50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse mt-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 leading-relaxed">
                    <span className="font-semibold text-gray-900">{activity.studentName}</span> 학생이{' '}
                    <span className="font-medium text-primary-600">{activity.itemName}</span>을(를) {' '}
                    <span className="font-medium text-green-600">{activity.status}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              모든 활동 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
