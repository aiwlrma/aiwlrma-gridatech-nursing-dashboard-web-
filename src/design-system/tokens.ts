// 디자인 시스템 토큰
// 실제 디자이너가 만든 것처럼 체계적이고 일관된 디자인 시스템

export const designTokens = {
  // 색상 시스템
  colors: {
    // Primary Colors (의료/교육 친화적)
    primary: {
      50: '#f0f4ff',
      100: '#e0e7ff', 
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1', // 메인 프라이머리
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81'
    },
    
    // Secondary Colors
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#8b5cf6', // 메인 세컨더리
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95'
    },
    
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#10b981', // 메인 성공
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // 메인 경고
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // 메인 에러
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    
    // Neutral Colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  
  // 타이포그래피 시스템
  typography: {
    fontFamily: {
      sans: ['Pretendard', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }]
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },
  
  // 간격 시스템
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem'
  },
  
  // 그림자 시스템
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },
  
  // 둥근 모서리 시스템
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  
  // 애니메이션 시스템
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  // 브레이크포인트 시스템
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// 컴포넌트별 디자인 토큰
export const componentTokens = {
  button: {
    primary: {
      background: designTokens.colors.primary[500],
      backgroundHover: designTokens.colors.primary[600],
      backgroundActive: designTokens.colors.primary[700],
      text: '#ffffff',
      border: 'none',
      borderRadius: designTokens.borderRadius.lg,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.sm[0],
      fontWeight: designTokens.typography.fontWeight.medium,
      boxShadow: designTokens.shadows.sm,
      transition: `all ${designTokens.animations.duration.fast} ${designTokens.animations.easing.easeOut}`
    },
    secondary: {
      background: 'transparent',
      backgroundHover: designTokens.colors.gray[50],
      backgroundActive: designTokens.colors.gray[100],
      text: designTokens.colors.gray[700],
      border: `1px solid ${designTokens.colors.gray[300]}`,
      borderRadius: designTokens.borderRadius.lg,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.sm[0],
      fontWeight: designTokens.typography.fontWeight.medium,
      boxShadow: 'none',
      transition: `all ${designTokens.animations.duration.fast} ${designTokens.animations.easing.easeOut}`
    }
  },
  
  card: {
    background: '#ffffff',
    border: `1px solid ${designTokens.colors.gray[200]}`,
    borderRadius: designTokens.borderRadius.xl,
    boxShadow: designTokens.shadows.sm,
    padding: designTokens.spacing[6],
    transition: `box-shadow ${designTokens.animations.duration.normal} ${designTokens.animations.easing.easeOut}`
  },
  
  input: {
    background: '#ffffff',
    border: `1px solid ${designTokens.colors.gray[300]}`,
    borderFocus: `1px solid ${designTokens.colors.primary[500]}`,
    borderRadius: designTokens.borderRadius.lg,
    padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
    fontSize: designTokens.typography.fontSize.sm[0],
    color: designTokens.colors.gray[900],
    placeholder: designTokens.colors.gray[500],
    boxShadow: 'none',
    boxShadowFocus: `0 0 0 3px ${designTokens.colors.primary[100]}`,
    transition: `all ${designTokens.animations.duration.fast} ${designTokens.animations.easing.easeOut}`
  }
};
