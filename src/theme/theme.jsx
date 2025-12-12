// Centralized theme configuration for the entire application
// All colors are defined here - NO Tailwind colors in components!
export const theme = {
  light: {
    primary: {
      main: '#8b5cf6', // Violet-500
      light: '#a78bfa', // Violet-400
      dark: '#7c3aed', // Violet-600
      gradient: 'linear-gradient(to right, #8b5cf6, #6366f1)',
    },
    secondary: {
      main: '#6366f1', // Indigo-500
      light: '#818cf8', // Indigo-400
      dark: '#4f46e5', // Indigo-600
      gradient: 'linear-gradient(to right, #ec4899, #ef4444)',
    },
    accent: {
      main: '#a855f7', // Purple-500
      light: '#c084fc', // Purple-400
      dark: '#9333ea', // Purple-600
    },
    background: {
      main: '#ffffff', // White
      page: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #ede9fe 50%, #fae8ff 75%, #ffffff 100%)', // Modern blue-white gradient
      secondary: '#f1f5f9', // Slate-100
      tertiary: '#e2e8f0', // Slate-200
      card: '#ffffff', // White - Card background
      cardHover: '#f8fafc', // Slate-50
      input: '#ffffff', // White - Input background
      hover: '#f1f5f9', // Slate-100 - Hover state
      canvas: '#0f172a', // Slate-900 - Dark canvas
    },
    scrollbar: {
      track: '#f1f5f9', // Light track
      thumb: '#cbd5e1', // Light thumb
      thumbHover: '#94a3b8', // Light thumb hover
    },
    text: {
      primary: '#0f172a', // Slate-900
      secondary: '#64748b', // Slate-500
      tertiary: '#94a3b8', // Slate-400
      disabled: '#cbd5e1', // Slate-300
      white: '#ffffff', // White
      inverse: '#ffffff', // White - for dark backgrounds
    },
    border: {
      main: '#e2e8f0', // Slate-200
      light: '#f1f5f9', // Slate-100
      dark: '#cbd5e1', // Slate-300
      input: '#d1d5db', // Gray-300
      hover: '#94a3b8', // Slate-400
    },
    button: {
      primary: '#8b5cf6', // Violet-500
      primaryHover: '#7c3aed', // Violet-600
      secondary: '#6366f1', // Indigo-500
      ghost: 'transparent',
      ghostHover: '#f1f5f9', // Slate-100
      outline: 'transparent',
      outlineHover: '#f1f5f9', // Slate-100
    },
    status: {
      success: '#10b981', // Green-500
      successLight: '#d1fae5', // Green-100
      error: '#ef4444', // Red-500
      errorLight: '#fee2e2', // Red-100
      warning: '#f59e0b', // Amber-500
      warningLight: '#fef3c7', // Amber-100
      info: '#3b82f6', // Blue-500
      infoLight: '#dbeafe', // Blue-100
    },
    icon: {
      primary: '#8b5cf6', // Violet-500
      secondary: '#64748b', // Slate-500
      tertiary: '#94a3b8', // Slate-400
      white: '#ffffff',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
    shadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    },
  },
  dark: {
    primary: {
      main: '#8b5cf6', // Violet-500
      light: '#a78bfa', // Violet-400
      dark: '#7c3aed', // Violet-600
      gradient: 'linear-gradient(to right, #8b5cf6, #6366f1)',
    },
    secondary: {
      main: '#6366f1', // Indigo-500
      light: '#818cf8', // Indigo-400
      dark: '#4f46e5', // Indigo-600
      gradient: 'linear-gradient(to right, #ec4899, #ef4444)',
    },
    accent: {
      main: '#a855f7', // Purple-500
      light: '#c084fc', // Purple-400
      dark: '#9333ea', // Purple-600
    },
    background: {
      main: '#0a0a0a', // Consistent dark background
      page: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)', // Super dark mode gradient
      secondary: '#0a0a0a', // Same as main
      tertiary: '#0a0a0a', // Same as main
      card: '#0a0a0a', // Same as main - no visual separation
      cardHover: '#0f0f0f', // Subtle hover
      input: '#0a0a0a', // Same as main
      hover: '#0f0f0f', // Subtle hover
      canvas: '#000000', // Pure black - Canvas background
    },
    scrollbar: {
      track: '#0a0a0a', // Dark track
      thumb: '#1a1a1a', // Dark thumb
      thumbHover: '#2a2a2a', // Dark thumb hover
    },
    text: {
      primary: '#f8fafc', // Slate-50
      secondary: '#cbd5e1', // Slate-300
      tertiary: '#94a3b8', // Slate-400
      disabled: '#64748b', // Slate-500
      white: '#ffffff', // White
      inverse: '#0f172a', // Slate-900 - for light backgrounds
    },
    border: {
      main: 'transparent', // No visible borders
      light: 'transparent', // No visible borders
      dark: 'transparent', // No visible borders
      input: '#1a1a1a', // Very subtle input border
      hover: '#2a2a2a', // Very subtle hover border
    },
    button: {
      primary: '#8b5cf6', // Violet-500
      primaryHover: '#a78bfa', // Violet-400
      secondary: '#6366f1', // Indigo-500
      ghost: 'transparent',
      ghostHover: '#334155', // Slate-700
      outline: 'transparent',
      outlineHover: '#334155', // Slate-700
    },
    status: {
      success: '#10b981', // Green-500
      successLight: '#064e3b', // Green-900
      error: '#ef4444', // Red-500
      errorLight: '#7f1d1d', // Red-900
      warning: '#f59e0b', // Amber-500
      warningLight: '#78350f', // Amber-900
      info: '#3b82f6', // Blue-500
      infoLight: '#1e3a8a', // Blue-900
    },
    icon: {
      primary: '#8b5cf6', // Violet-500
      secondary: '#cbd5e1', // Slate-300
      tertiary: '#94a3b8', // Slate-400
      white: '#ffffff',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
    shadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.25)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
    },
  },
};

// Helper function to get theme colors based on current theme mode
export const getTheme = (mode = 'light') => {
  return theme[mode] || theme.light;
};
