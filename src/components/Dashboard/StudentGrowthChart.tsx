import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StudentGrowthChartProps {
  data: Array<{
    week: string;
    achievementRate: number;
    attendanceRate: number;
    vrUsage: number;
  }>;
}

const StudentGrowthChart: React.FC<StudentGrowthChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">학생 성장 그래프</h3>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>최근 4주</option>
            <option>최근 8주</option>
            <option>학기 전체</option>
          </select>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            더보기
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="week" 
            tick={{fontSize: 12}}
            label={{ value: '주차', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            domain={[0, 100]}
            tick={{fontSize: 12}}
            label={{ value: '점수 (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="achievementRate" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="성취율"
          />
          <Line 
            type="monotone" 
            dataKey="attendanceRate" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="출석률"
          />
          <Line 
            type="monotone" 
            dataKey="vrUsage" 
            stroke="#F59E0B" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="VR 활용도"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentGrowthChart;
