import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPICardProps } from '../../types/dashboard';

const EnhancedKPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  color, 
  onClick 
}) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div 
      className="bg-white rounded-lg border p-6 cursor-pointer hover:shadow-lg transition-all group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      
      {/* Trend indicator */}
      <div className="flex items-center gap-2">
        {trend.direction === 'up' ? (
          <TrendingUp size={16} className="text-green-500" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}
        <span className={`text-sm font-medium ${
          trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
        </span>
      </div>
      
      {/* Hover effect */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          상세 보기 →
        </button>
      </div>
    </div>
  );
};

export default EnhancedKPICard;
