// Enterprise SaaS Dashboard Design Tokens
// Inspired by payment/finance platforms (Toss Payments, Stripe, etc.)

export const enterpriseTokens = {
  colors: {
    // Backgrounds
    app: '#E8EBF0',           // Main app background
    sidebar: '#F5F7FA',       // Sidebar background
    surface: '#FFFFFF',       // White cards/tables
    header: '#FAFBFC',        // Very light header
    selected: '#E6F0FF',      // Light blue selection
    
    // Borders
    light: '#E1E4E8',        // Default borders
    medium: '#D1D5DB',        // Emphasis borders
    dark: '#9CA3AF',          // Strong borders
    
    // Text
    primary: '#24292E',       // Near black
    secondary: '#586069',     // Medium gray
    tertiary: '#959DA5',      // Light gray
    link: '#0969DA',          // Blue links
    
    // Accent
    accent: '#0969DA',        // Blue - primary actions
    accentHover: '#0550AE',  // Darker blue on hover
    success: '#1A7F37',       // Green success
    warning: '#BF8700',       // Amber warning
    danger: '#CF222E',        // Red danger
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif',
    sizes: {
      pageTitle: '24px',      // 700 weight
      sectionTitle: '18px',   // 600 weight
      cardTitle: '16px',      // 600 weight
      body: '14px',           // 400 weight
      tableText: '13px',      // 400 weight
      caption: '12px',        // 400 weight
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  spacing: {
    sidebar: '220px',         // Fixed sidebar width
    header: '48px',           // Header height
    cardPadding: '24px',      // Card internal padding
    tablePadding: '12px',     // Table cell padding
    sectionGap: '24px',       // Gap between sections
  },
  
  borderRadius: {
    small: '6px',             // rounded
    medium: '8px',            // rounded-lg
    large: '12px',            // rounded-xl
  },
  
  shadows: {
    none: 'none',
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  }
};

export default enterpriseTokens;
