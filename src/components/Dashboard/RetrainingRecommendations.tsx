import React from 'react';

interface RetrainingRecommendationsProps {
  data: Array<{
    skill: string;
    errorRate: number;
    affectedStudents: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

// Priority configuration - Clean border system
const priorityConfig = {
  high: {
    label: '긴급',
    bgColor: 'bg-white',
    accentColor: 'bg-gray-800',
    badgeBg: 'bg-gray-800',
    badgeText: 'text-white',
    icon: '⚠️'
  },
  medium: {
    label: '중요',
    bgColor: 'bg-white',
    accentColor: 'bg-gray-600',
    badgeBg: 'bg-gray-600',
    badgeText: 'text-white',
    icon: '⚡'
  },
  low: {
    label: '주의',
    bgColor: 'bg-white',
    accentColor: 'bg-gray-500',
    badgeBg: 'bg-gray-500',
    badgeText: 'text-white',
    icon: 'ℹ️'
  }
};


// Category icons
const categoryIcons: Record<string, string> = {
  '무균술': '🩺',
  'IV 삽입': '💉',
  '손위생': '🧼',
  '약물 투여': '💊',
  '환자 사정': '📋',
  '응급처치': '🚑'
};

const RetrainingRecommendations: React.FC<RetrainingRecommendationsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">재교육 권장 항목</h3>
        <span className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm">
          {data.length}개 항목
        </span>
      </div>
      
      <div className="space-y-5">
        {data.map((item, index) => {
          const config = priorityConfig[item.priority];
          const categoryIcon = categoryIcons[item.skill] || '📚';
          
          // 아이콘 배경 색상 설정
          const getIconBgColor = (skill: string) => {
            switch (skill) {
              case '무균술': return 'bg-cyan-100';
              case 'IV 삽입': return 'bg-gray-100';
              case '손위생': return 'bg-orange-100';
              default: return 'bg-gray-100';
            }
          };
          
          return (
            <div 
              key={index}
              className="
                bg-white 
                rounded-2xl 
                p-6 
                shadow-sm 
                hover:shadow-lg 
                hover:-translate-y-1 
                transition-all 
                duration-200 
                ease-in-out
                border 
                border-gray-100
              "
            >
              {/* Main Content Layout */}
              <div className="flex items-center justify-between">
                {/* Left: Icon and Content */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Icon Circle */}
                  <div className={`
                    w-16 h-16 
                    ${getIconBgColor(item.skill)}
                    rounded-full 
                    flex items-center justify-center
                    flex-shrink-0
                  `}>
                    <div className="text-2xl">{categoryIcon}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Priority */}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 leading-tight">
                        {item.skill}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm opacity-70">{config.icon}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Usage Info */}
                    <div className="text-sm text-gray-600 mb-3">
                      영향 학생 {item.affectedStudents}명
                    </div>
                    
                    {/* Error Rate with Progress Bar */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">오류율</span>
                        <span className="text-sm font-bold text-gray-800">{item.errorRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${item.errorRate}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Activity Indicators */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>활동도 높음</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>개선 필요</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Score */}
                <div className="text-right ml-6 flex-shrink-0">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {100 - item.errorRate}점
                  </div>
                  <div className="text-xs text-gray-500">평균 점수</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-200">
                  상세 분석
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 rounded-lg hover:bg-gray-900 hover:border-gray-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300">
                  모듈 배정
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RetrainingRecommendations;
