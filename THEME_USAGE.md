# Theme System Documentation

## Overview
**IMPORTANT:** All colors in this application are centralized in `/src/theme/theme.jsx`. 
**NO Tailwind color classes should be used in components!** Everything uses theme variables.

This allows you to customize ALL colors from a single file - just edit `theme.jsx` and all components update automatically.

## File Structure
```
src/
  theme/
    theme.jsx    - Main theme configuration with ALL color variables
    index.js     - Exports for easy importing
```

## Quick Start

### 1. Import the theme
```javascript
import { theme as appTheme } from '@/theme/theme';
import { useTheme } from '@/context/ThemeContext';
```

### 2. Get current theme colors
```javascript
const { theme } = useTheme(); // 'light' or 'dark'
const colors = appTheme[theme]; // Get the complete color palette
```

### 3. Use colors with style prop
```javascript
// Always use style prop with colors object - NO Tailwind color classes!
<div style={{ backgroundColor: colors.background.page }}>
  <h1 style={{ color: colors.text.primary }}>Title</h1>
  <button style={{ background: colors.primary.gradient }}>Click</button>
</div>
```

## Complete Color Reference

### Primary Colors
```javascript
colors.primary.main         // #8b5cf6 - Main violet
colors.primary.light        // #a78bfa - Lighter violet
colors.primary.dark         // #7c3aed - Darker violet
colors.primary.gradient     // Violet to Indigo gradient
```

### Secondary Colors
```javascript
colors.secondary.main       // #6366f1 - Main indigo
colors.secondary.light      // #818cf8 - Lighter indigo
colors.secondary.dark       // #4f46e5 - Darker indigo
colors.secondary.gradient   // Pink to Red gradient
```

### Accent Colors
```javascript
colors.accent.main          // #a855f7 - Main purple
colors.accent.light         // #c084fc - Lighter purple
colors.accent.dark          // #9333ea - Darker purple
```

### Background Colors
```javascript
colors.background.main      // Main background
colors.background.page      // Page background
colors.background.secondary // Secondary background
colors.background.tertiary  // Tertiary background
colors.background.card      // Card backgrounds
colors.background.cardHover // Card hover state
colors.background.input     // Input field backgrounds
colors.background.hover     // General hover state
colors.background.canvas    // Canvas/video preview (dark mode only)
```

### Text Colors
```javascript
colors.text.primary         // Primary text
colors.text.secondary       // Secondary text
colors.text.tertiary        // Tertiary/muted text
colors.text.disabled        // Disabled text
colors.text.white           // White text
colors.text.inverse         // Inverse text (for colored backgrounds)
```

### Border Colors
```javascript
colors.border.main          // Main borders
colors.border.light         // Light borders
colors.border.dark          // Dark borders
colors.border.input         // Input field borders
colors.border.hover         // Border hover state
```

### Button Colors
```javascript
colors.button.primary       // Primary button background
colors.button.primaryHover  // Primary button hover
colors.button.secondary     // Secondary button
colors.button.ghost         // Ghost button (transparent)
colors.button.ghostHover    // Ghost button hover
colors.button.outline       // Outline button
colors.button.outlineHover  // Outline button hover
```

### Status Colors
```javascript
colors.status.success       // Success green
colors.status.successLight  // Light success background
colors.status.error         // Error red
colors.status.errorLight    // Light error background
colors.status.warning       // Warning amber
colors.status.warningLight  // Light warning background
colors.status.info          // Info blue
colors.status.infoLight     // Light info background
```

### Icon Colors
```javascript
colors.icon.primary         // Primary icon color
colors.icon.secondary       // Secondary icon color
colors.icon.tertiary        // Tertiary/muted icon
colors.icon.white           // White icon
colors.icon.success         // Success icon
colors.icon.error           // Error icon
colors.icon.warning         // Warning icon
```

### Shadow Values
```javascript
colors.shadow.sm            // Small shadow
colors.shadow.md            // Medium shadow
colors.shadow.lg            // Large shadow
colors.shadow.xl            // Extra large shadow
```

## Usage Examples

### Basic Component
```javascript
import { theme as appTheme } from '@/theme/theme';
import { useTheme } from '@/context/ThemeContext';

export default function MyComponent() {
  const { theme } = useTheme();
  const colors = appTheme[theme];
  
  return (
    <div style={{ backgroundColor: colors.background.page }}>
      <h1 style={{ color: colors.text.primary }}>Hello</h1>
    </div>
  );
}
```

### Button with Gradient
```javascript
<button 
  style={{ 
    background: colors.primary.gradient,
    color: colors.text.white,
    borderColor: colors.border.main
  }}
>
  Click Me
</button>
```

### Card with Hover
```javascript
<div 
  style={{ 
    backgroundColor: colors.background.card,
    borderColor: colors.border.main,
    color: colors.text.primary
  }}
>
  Card Content
</div>
```

### Icon with Theme Color
```javascript
<Sparkles 
  className="w-5 h-5"
  style={{ color: colors.primary.main }}
/>
```

### Conditional Styling
```javascript
<div
  style={{
    backgroundColor: isActive 
      ? colors.primary.main 
      : colors.background.hover,
    color: isActive 
      ? colors.text.white 
      : colors.text.primary
  }}
>
  Content
</div>
```

## Customization Guide

### To Change ALL Colors at Once

1. Open `/src/theme/theme.jsx`
2. Modify the colors in both `light` and `dark` objects
3. Save the file
4. **All components update automatically!**

Example - Change primary color from Violet to Blue:
```javascript
// In theme.jsx
light: {
  primary: {
    main: '#3b82f6',      // Change from #8b5cf6 to #3b82f6
    light: '#60a5fa',     // Adjust accordingly
    dark: '#2563eb',      // Adjust accordingly
    gradient: 'linear-gradient(to right, #3b82f6, #1d4ed8)',
  },
  // ... rest stays the same
}
```

### Theme Structure
- **light**: All light mode colors
- **dark**: All dark mode colors
- Each section (primary, background, text, etc.) groups related colors
- Use descriptive names (.main, .hover, .disabled, etc.)

## Rules

✅ **DO:**
- Use `style={{ color: colors.text.primary }}`
- Use `style={{ background: colors.primary.gradient }}`
- Define all colors in theme.jsx
- Use theme variables for consistency

❌ **DON'T:**
- Use `className="text-slate-900"` or any Tailwind color classes
- Use `className="bg-blue-500"` or hardcoded colors
- Add colors directly in components
- Use hex codes or rgb() directly in components

## Benefits

✅ **Centralized** - One file controls all colors
✅ **Consistent** - Same colors everywhere  
✅ **Customizable** - Change once, apply everywhere
✅ **Theme-aware** - Auto switches light/dark
✅ **Type-safe** - Easy autocomplete
✅ **Professional** - Based on Leonardo.ai/PixVerse design

## Current Color Scheme

### Light Theme
- Primary: Violet (#8b5cf6)
- Secondary: Indigo (#6366f1)  
- Background: White/Light gray
- Text: Dark slate

### Dark Theme
- Primary: Violet (#8b5cf6)
- Secondary: Indigo (#6366f1)
- Background: Dark slate/Black
- Text: Light slate/White
