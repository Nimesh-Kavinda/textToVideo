# Quick Theme Reference

## How to Use Theme Colors

### Setup (Add to every component)
```javascript
import { theme as appTheme } from '@/theme/theme';
import { useTheme } from '@/context/ThemeContext';

const { theme } = useTheme();
const colors = appTheme[theme];
```

### Common Patterns

#### Page Background
```javascript
style={{ backgroundColor: colors.background.page }}
```

#### Card/Container
```javascript
style={{
  backgroundColor: colors.background.card,
  borderColor: colors.border.main
}}
```

#### Text
```javascript
style={{ color: colors.text.primary }}      // Main text
style={{ color: colors.text.secondary }}    // Secondary text
style={{ color: colors.text.tertiary }}     // Muted text
```

#### Buttons
```javascript
// Primary button
style={{
  background: colors.primary.gradient,
  color: colors.text.white
}}

// Outline button
style={{
  backgroundColor: colors.background.card,
  borderColor: colors.border.main,
  color: colors.text.primary
}}
```

#### Icons
```javascript
style={{ color: colors.icon.primary }}      // Primary icons
style={{ color: colors.icon.secondary }}    // Secondary icons
style={{ color: colors.primary.main }}      // Accent icons
```

#### Input Fields
```javascript
style={{
  backgroundColor: colors.background.input,
  borderColor: colors.border.main,
  color: colors.text.primary
}}
```

#### Gradients
```javascript
style={{ background: colors.primary.gradient }}     // Violet to Indigo
style={{ background: colors.secondary.gradient }}   // Pink to Red
```

#### Hover States
```javascript
style={{ backgroundColor: colors.background.hover }}
style={{ borderColor: colors.border.hover }}
```

## All Available Colors

### Backgrounds
- `colors.background.page` - Page background
- `colors.background.card` - Cards/containers
- `colors.background.input` - Input fields
- `colors.background.hover` - Hover states
- `colors.background.canvas` - Video/canvas (dark only)

### Text
- `colors.text.primary` - Main text
- `colors.text.secondary` - Secondary text
- `colors.text.tertiary` - Muted text
- `colors.text.white` - White text
- `colors.text.disabled` - Disabled text

### Primary/Secondary
- `colors.primary.main` - Primary violet
- `colors.primary.gradient` - Primary gradient
- `colors.secondary.main` - Secondary indigo
- `colors.secondary.gradient` - Secondary gradient

### Borders
- `colors.border.main` - Main borders
- `colors.border.light` - Light borders
- `colors.border.dark` - Dark borders
- `colors.border.hover` - Hover borders

### Icons
- `colors.icon.primary` - Primary icons
- `colors.icon.secondary` - Secondary icons
- `colors.icon.tertiary` - Muted icons

### Status
- `colors.status.success` - Green
- `colors.status.error` - Red
- `colors.status.warning` - Amber
- `colors.status.info` - Blue

### Shadows
- `colors.shadow.sm` - Small
- `colors.shadow.md` - Medium
- `colors.shadow.lg` - Large
- `colors.shadow.xl` - Extra large

## Remember

❌ **NEVER** use Tailwind color classes like:
- `text-slate-900`
- `bg-white`
- `border-gray-300`
- `from-blue-500`

✅ **ALWAYS** use theme variables:
- `style={{ color: colors.text.primary }}`
- `style={{ backgroundColor: colors.background.card }}`
- `style={{ borderColor: colors.border.main }}`
- `style={{ background: colors.primary.gradient }}`

## To Customize

Edit `/src/theme/theme.jsx` - all components update automatically!
