import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AchievementDistributionProps {
  data: {
    passed: number;
    retrying: number;
    failed: number;
  };
}

const AchievementDistribution: React.FC<AchievementDistributionProps> = ({ data }) => {
  const chartData = [
    { name: '합격', value: data.passed, color: '#10B981' },
    { name: '재시도', value: data.retrying, color: '#F59E0B' },
    { name: '불합격', value: data.failed, color: '#EF4444' }
  ];

  const total = data.passed + data.retrying + data.failed;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">성취율 분포</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          더보기
        </button>
      </div>
      
      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="flex-shrink-0 relative" style={{width: 240, height: 240}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600">전체</p>
            <p className="text-2xl font-bold">{total}명</p>
          </div>
        </div>
        
        {/* Legend with stats */}
        <div className="flex-1 space-y-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{item.value}명</p>
                <p className="text-xs text-gray-500">
                  {((item.value / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementDistribution;
