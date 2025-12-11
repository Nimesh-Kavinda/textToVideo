# Color Customization Guide

This document explains how to customize the colors of your Text to Video Converter application.

## Quick Color Changes

### Method 1: Edit theme.js (Recommended)

Location: `src/lib/theme.js`

This file contains all color definitions for both light and dark themes. Simply modify the hex color values:

```javascript
export const themeColors = {
  light: {
    primary: '#3b82f6',        // Main blue color - buttons, accents
    primaryHover: '#2563eb',    // Darker blue for hover states
    secondary: '#e0f2fe',       // Light blue backgrounds
    accent: '#0ea5e9',          // Sky blue for highlights
    background: '#ffffff',      // Main background
    text: '#0f172a',           // Main text color
    // ... more colors
  },
  dark: {
    primary: '#3b82f6',        // Same structure for dark mode
    // ... more colors
  }
}
```

**Example: Change to Purple Theme**
```javascript
light: {
  primary: '#9333ea',           // Purple-600
  primaryHover: '#7e22ce',      // Purple-700
  secondary: '#fae8ff',         // Purple-50
  accent: '#a855f7',            // Purple-500
  // Keep other colors or adjust as needed
}
```

**Example: Change to Green Theme**
```javascript
light: {
  primary: '#16a34a',           // Green-600
  primaryHover: '#15803d',      // Green-700
  secondary: '#dcfce7',         // Green-50
  accent: '#22c55e',            // Green-500
  // Keep other colors or adjust as needed
}
```

### Method 2: Edit CSS Variables

Location: `src/index.css`

Modify the HSL values in the `:root` and `.dark` selectors:

```css
:root {
  --primary: 217.2 91.2% 59.8%;     /* Blue */
  --secondary: 199.4 89.1% 48.4%;   /* Sky blue */
  --accent: 199.4 89.1% 48.4%;      /* Sky blue */
  /* ... more variables */
}
```

**HSL Color Format**: `Hue Saturation% Lightness%`
- Hue: 0-360 (0=red, 120=green, 240=blue)
- Saturation: 0-100%
- Lightness: 0-100%

## Color Palette Reference

### Current Light Theme Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Blue | `#3b82f6` | Buttons, CTAs, brand elements |
| Secondary | Light Blue | `#e0f2fe` | Subtle backgrounds, highlights |
| Accent | Sky Blue | `#0ea5e9` | Icons, badges, emphasis |
| Background | White | `#ffffff` | Main page background |
| Text | Slate | `#0f172a` | Primary text content |

### Current Dark Theme Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Blue | `#3b82f6` | Buttons, CTAs, brand elements |
| Secondary | Slate | `#1e293b` | Card backgrounds |
| Accent | Sky Blue | `#0ea5e9` | Icons, badges, emphasis |
| Background | Dark Slate | `#0f172a` | Main page background |
| Text | Light | `#f8fafc` | Primary text content |

## Popular Color Schemes

### 1. Purple Theme
```javascript
primary: '#9333ea'      // Purple
secondary: '#fae8ff'    // Light purple
accent: '#a855f7'       // Mid purple
```

### 2. Green Theme
```javascript
primary: '#16a34a'      // Green
secondary: '#dcfce7'    // Light green
accent: '#22c55e'       // Bright green
```

### 3. Orange Theme
```javascript
primary: '#ea580c'      // Orange
secondary: '#fed7aa'    // Light orange
accent: '#f97316'       // Bright orange
```

### 4. Pink Theme
```javascript
primary: '#db2777'      // Pink
secondary: '#fce7f3'    // Light pink
accent: '#ec4899'       // Hot pink
```

### 5. Teal Theme
```javascript
primary: '#0d9488'      // Teal
secondary: '#ccfbf1'    // Light teal
accent: '#14b8a6'       // Bright teal
```

## Where Colors Are Used

### Primary Color
- Main "Get Started" button
- "Generate Video" button
- Progress bars
- Active states
- Links

### Secondary Color
- Background gradients
- Card hover states
- Subtle highlights
- Badge backgrounds

### Accent Color
- Icons
- Borders on focus
- Highlights
- Badges

### Background Colors
- Page backgrounds
- Card backgrounds
- Input fields
- Dropdowns

### Text Colors
- Headings
- Body text
- Placeholders
- Muted text

## Testing Your Colors

After changing colors:

1. Check both light and dark modes
2. Verify button contrast (text should be readable)
3. Test on different screen sizes
4. Ensure accessibility (use contrast checkers)

## Tools for Color Selection

- **Tailwind CSS Color Palette**: https://tailwindcss.com/docs/customizing-colors
- **Adobe Color**: https://color.adobe.com
- **Coolors**: https://coolors.co
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/

## Need Help?

If you're unsure about color choices:
1. Stick to one primary hue (blue, purple, green, etc.)
2. Use lighter shades for backgrounds
3. Use darker/brighter shades for accents
4. Maintain sufficient contrast for text
5. Test in both light and dark modes

## Pro Tips

1. **Consistency**: Use the same color family throughout
2. **Contrast**: Ensure text is readable on backgrounds
3. **Balance**: Don't use too many bright colors
4. **Accessibility**: Aim for WCAG AA compliance (4.5:1 contrast ratio)
5. **Brand Alignment**: Match your brand colors if applicable
