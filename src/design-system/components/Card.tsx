import React from 'react';
import { designTokens } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  style,
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-white border border-gray-200 shadow-sm';
      case 'elevated':
        return 'bg-white border-0 shadow-lg';
      case 'outlined':
        return 'bg-white border-2 border-gray-200 shadow-none';
      case 'filled':
        return 'bg-gray-50 border border-gray-200 shadow-sm';
      default:
        return '';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-10';
      default:
        return '';
    }
  };

  const getHoverStyles = () => {
    if (!hover) return '';
    return 'hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-out';
  };

  const baseStyles = `
    rounded-xl
    transition-all duration-200 ease-out
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const combinedStyles = `
    ${baseStyles}
    ${getVariantStyles()}
    ${getPaddingStyles()}
    ${getHoverStyles()}
    ${className}
  `;

  return (
    <div className={combinedStyles} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

// Card 하위 컴포넌트들
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  children,
  className = '',
  padding = 'md'
}) => {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-10';
      default:
        return 'p-6';
    }
  };

  return (
    <div className={`${getPaddingStyles()} ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;
