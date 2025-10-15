import React, { useState } from 'react';

// Types
interface RecommendationItem {
  id: string;
  title: string;
  category: string;
  errorRate: number;
  affectedStudents: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  description?: string;
  lastUpdated: string;
}

interface ReeducationRecommendationsProps {
  items?: RecommendationItem[];
  onAnalyze?: (item: RecommendationItem) => void;
  onAssignModule?: (item: RecommendationItem) => void;
  onFilterChange?: (filter: string) => void;
}

// Sample data
const sampleRecommendations: RecommendationItem[] = [
  {
    id: '1',
    title: '무균술',
    category: 'Aseptic Technique',
    errorRate: 30,
    affectedStudents: 12,
    priority: 'urgent',
    description: '환자 안전을 위한 무균술 기본 원칙과 실무 적용',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'IV 삽입',
    category: 'IV Insertion',
    errorRate: 25,
    affectedStudents: 8,
    priority: 'high',
    description: '정맥주사 삽입 기술과 합병증 예방',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    title: '손위생',
    category: 'Hand Hygiene',
    errorRate: 20,
    affectedStudents: 5,
    priority: 'medium',
    description: '감염 예방을 위한 올바른 손위생 절차',
    lastUpdated: '2024-01-13'
  }
];

// Priority configuration - Grayscale system
const priorityConfig = {
  urgent: {
    label: '긴급',
    color: 'bg-gray-800',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800',
    accentColor: 'bg-gray-800',
    icon: '⚠️',
    badgeBg: 'bg-gray-800',
    badgeText: 'text-white'
  },
  high: {
    label: '중요',
    color: 'bg-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-700',
    accentColor: 'bg-gray-600',
    icon: '⚡',
    badgeBg: 'bg-gray-600',
    badgeText: 'text-white'
  },
  medium: {
    label: '주의',
    color: 'bg-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-600',
    accentColor: 'bg-gray-500',
    icon: 'ℹ️',
    badgeBg: 'bg-gray-500',
    badgeText: 'text-white'
  },
  low: {
    label: '낮음',
    color: 'bg-gray-400',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-500',
    accentColor: 'bg-gray-400',
    icon: '✓',
    badgeBg: 'bg-gray-400',
    badgeText: 'text-white'
  }
};

// Category icons
const categoryIcons: Record<string, string> = {
  'Aseptic Technique': '🩺',
  'IV Insertion': '💉',
  'Hand Hygiene': '🧼',
  'Medication Administration': '💊',
  'Patient Assessment': '📋',
  'Emergency Care': '🚑'
};

// Progress bar component - Grayscale
const ProgressBar: React.FC<{ value: number; max?: number; className?: string }> = ({ 
  value, 
  max = 100, 
  className = '' 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-1.5 ${className}`}>
      <div 
        className="bg-gradient-to-r from-gray-400 to-gray-600 h-1.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Individual recommendation card - Modern grayscale design
const RecommendationCard: React.FC<{
  item: RecommendationItem;
  onAnalyze: (item: RecommendationItem) => void;
  onAssignModule: (item: RecommendationItem) => void;
}> = ({ item, onAnalyze, onAssignModule }) => {
  const config = priorityConfig[item.priority];
  const categoryIcon = categoryIcons[item.category] || '📚';

  return (
    <div 
      className={`
        ${config.bgColor} 
        border border-gray-200 
        border-l-4 
        ${config.accentColor}
        rounded-xl 
        p-6 
        shadow-sm 
        hover:shadow-lg 
        hover:-translate-y-0.5 
        transition-all 
        duration-200 
        ease-in-out
        group
      `}
    >
      {/* Header with priority badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl opacity-80">{categoryIcon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm opacity-70">{config.icon}</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Metrics */}
      <div className="space-y-4 mb-6">
        {/* Error Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">오류율</span>
            <span className="text-sm font-bold text-gray-800">{item.errorRate}%</span>
          </div>
          <ProgressBar value={item.errorRate} />
        </div>
        
        {/* Affected Students */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">영향 학생</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-800">{item.affectedStudents}명</span>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-400">
          마지막 업데이트: {new Date(item.lastUpdated).toLocaleDateString('ko-KR')}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onAnalyze(item)}
            className="
              px-4 py-2 
              text-sm font-medium 
              text-gray-700 
              bg-white 
              border border-gray-300 
              rounded-lg 
              hover:bg-gray-50 
              hover:border-gray-400 
              transition-all 
              duration-200 
              ease-in-out
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-200
            "
          >
            상세 분석
          </button>
          <button
            onClick={() => onAssignModule(item)}
            className="
              px-4 py-2 
              text-sm font-medium 
              text-white 
              bg-gray-800 
              border border-gray-800 
              rounded-lg 
              hover:bg-gray-900 
              hover:border-gray-900 
              transition-all 
              duration-200 
              ease-in-out
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-300
            "
          >
            모듈 배정
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const ReeducationRecommendations: React.FC<ReeducationRecommendationsProps> = ({
  items = sampleRecommendations,
  onAnalyze,
  onAssignModule,
  onFilterChange
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'errorRate' | 'students'>('priority');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  const handleAnalyze = (item: RecommendationItem) => {
    onAnalyze?.(item);
    console.log('Analyzing:', item.title);
  };

  const handleAssignModule = (item: RecommendationItem) => {
    onAssignModule?.(item);
    console.log('Assigning module for:', item.title);
  };

  // Filter and sort items
  const filteredItems = items.filter(item => 
    filter === 'all' || item.priority === filter
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'errorRate':
        return b.errorRate - a.errorRate;
      case 'students':
        return b.affectedStudents - a.affectedStudents;
      default:
        return 0;
    }
  });

  // Group items by priority
  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.priority]) {
      acc[item.priority] = [];
    }
    acc[item.priority].push(item);
    return acc;
  }, {} as Record<string, RecommendationItem[]>);

  const priorityOrder = ['urgent', 'high', 'medium', 'low'];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">재교육 권장 항목</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              학생들의 학습 성과를 개선하기 위한 맞춤형 재교육 모듈을 확인하세요
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 shadow-sm">
              {items.length}개 항목
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">필터:</span>
              {[
                { key: 'all', label: '전체' },
                { key: 'urgent', label: '긴급' },
                { key: 'high', label: '중요' },
                { key: 'medium', label: '주의' },
                { key: 'low', label: '낮음' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === key
                      ? 'bg-gray-800 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
              >
                <option value="priority">우선순위</option>
                <option value="errorRate">오류율</option>
                <option value="students">영향 학생</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-8">
          {priorityOrder.map(priority => {
            const items = groupedItems[priority];
            if (!items || items.length === 0) return null;
            
            const config = priorityConfig[priority as keyof typeof priorityConfig];
            
            return (
              <div key={priority} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lg opacity-70">{config.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {config.label} 우선순위
                  </h3>
                  <div className={`w-2 h-2 rounded-full ${config.accentColor}`}></div>
                  <span className="text-sm text-gray-500">({items.length}개 항목)</span>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {items.map(item => (
                    <RecommendationCard
                      key={item.id}
                      item={item}
                      onAnalyze={handleAnalyze}
                      onAssignModule={handleAssignModule}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-6xl mb-4 opacity-50">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              권장 항목이 없습니다
            </h3>
            <p className="text-gray-600">
              현재 선택된 필터에 해당하는 재교육 권장 항목이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReeducationRecommendations;
