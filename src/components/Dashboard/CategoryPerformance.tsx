import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CategoryPerformanceProps {
  data: Array<{
    category: string;
    score: number;
    target: number;
    classAverage: number;
  }>;
}

const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">평가 항목별 성과</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>전체 학생</option>
          <option>2학년 A반</option>
          <option>2학년 B반</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data}
          layout="horizontal"
          margin={{ left: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#6366F1" name="현재 점수" radius={[0, 4, 4, 0]} />
          <Bar dataKey="classAverage" fill="#10B981" name="반 평균" radius={[0, 4, 4, 0]} />
          <ReferenceLine 
            x={80} 
            stroke="#EF4444" 
            strokeDasharray="3 3"
            label="목표"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPerformance;
