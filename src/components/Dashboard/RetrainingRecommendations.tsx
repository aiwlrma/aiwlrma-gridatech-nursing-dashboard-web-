import React from 'react';

interface RetrainingRecommendationsProps {
  data: Array<{
    skill: string;
    errorRate: number;
    affectedStudents: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const RetrainingRecommendations: React.FC<RetrainingRecommendationsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">재교육 권장 항목</h3>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
          {data.length}개 항목
        </span>
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div 
            key={index}
            className={`
              p-4 rounded-lg border-l-4
              ${item.priority === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{item.skill}</p>
                  {item.priority === 'high' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      긴급
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  오류율: <span className="font-medium text-red-600">{item.errorRate}%</span>
                  {' · '}
                  영향 학생: {item.affectedStudents}명
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">
                상세 분석
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                모듈 배정
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetrainingRecommendations;
