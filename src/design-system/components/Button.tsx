import React from 'react';
import { designTokens, componentTokens } from '../tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-primary-500 hover:bg-primary-600 active:bg-primary-700
          text-white border-0
          shadow-sm hover:shadow-md
          focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `;
      case 'secondary':
        return `
          bg-white hover:bg-gray-50 active:bg-gray-100
          text-gray-700 border border-gray-300
          shadow-sm hover:shadow-md
          focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `;
      case 'outline':
        return `
          bg-transparent hover:bg-primary-50 active:bg-primary-100
          text-primary-600 border border-primary-300
          shadow-none hover:shadow-sm
          focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `;
      case 'ghost':
        return `
          bg-transparent hover:bg-gray-100 active:bg-gray-200
          text-gray-600 border-0
          shadow-none
          focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `;
      case 'danger':
        return `
          bg-red-500 hover:bg-red-600 active:bg-red-700
          text-white border-0
          shadow-sm hover:shadow-md
          focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        `;
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-2.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return '';
    }
  };

  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-150 ease-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const combinedStyles = `
    ${baseStyles}
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${className}
  `;

  return (
    <button
      className={combinedStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
