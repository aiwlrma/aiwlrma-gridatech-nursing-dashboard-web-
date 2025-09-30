import React, { useState } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClear?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  fullWidth = false,
  onClear,
  className = '',
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return `
          bg-white border border-gray-300
          focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `;
      case 'filled':
        return `
          bg-gray-50 border border-gray-200
          focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `;
      case 'outlined':
        return `
          bg-transparent border-2 border-gray-300
          focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `;
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    switch (inputSize) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-2.5 text-sm';
      case 'lg':
        return 'px-4 py-3 text-base';
      default:
        return '';
    }
  };

  const baseStyles = `
    w-full rounded-lg
    transition-all duration-150 ease-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400
    ${fullWidth ? 'w-full' : ''}
  `;

  const combinedStyles = `
    ${baseStyles}
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${className}
  `;

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          type={inputType}
          className={`
            ${combinedStyles}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || type === 'password' || onClear ? 'pr-10' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(rightIcon || type === 'password' || onClear) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            
            {onClear && props.value && (
              <button
                type="button"
                onClick={onClear}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {rightIcon && type !== 'password' && !onClear && (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
