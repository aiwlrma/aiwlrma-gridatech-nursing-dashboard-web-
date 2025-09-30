import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string | {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend, icon, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {typeof trend === 'string' ? (
                <span className="text-sm text-gray-600">{trend}</span>
              ) : (
                <>
                  {trend.direction === 'up' ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
