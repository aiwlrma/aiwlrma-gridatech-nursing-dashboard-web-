import React from 'react';

interface CriteriaBadgeProps {
  type: 'pass' | 'critical' | 'weight' | 'hours';
  value: string | number;
}

const CriteriaBadge: React.FC<CriteriaBadgeProps> = ({ type, value }) => {
  const configs = {
    pass: { 
      color: 'bg-blue-100 text-blue-700 border-blue-200', 
      icon: '✓', 
      label: '통과' 
    },
    critical: { 
      color: 'bg-red-100 text-red-700 border-red-200', 
      icon: '🚨', 
      label: '크리티컬' 
    },
    weight: { 
      color: 'bg-purple-100 text-purple-700 border-purple-200', 
      icon: '⚖️', 
      label: '가중' 
    },
    hours: { 
      color: 'bg-green-100 text-green-700 border-green-200', 
      icon: '🕐', 
      label: '최소' 
    }
  };

  const config = configs[type];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}>
      <span className="mr-1">{config.icon}</span>
      {config.label} {value}
    </span>
  );
};

export default CriteriaBadge;
