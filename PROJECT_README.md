# Text to Video Converter

A modern, professional text-to-video converter web application built with React, Vite, and shadcn/ui components.

## Features

### Home Page
- **Modern Hero Section** - Eye-catching landing page with gradient effects
- **Feature Showcase** - Highlighting 6 key features with animated cards
- **Call-to-Action** - Prominent "Get Started" button to begin video creation
- **Fully Responsive** - Optimized for all device sizes (mobile, tablet, desktop)
- **Theme Toggle** - Switch between light and dark modes

### Text to Video Converter Page
- **Text Prompt Input** - Large textarea for detailed video descriptions
- **File Upload System** 
  - Drag & drop support for PDF and TXT files
  - Multiple file upload capability
  - File preview with size information
  - Easy file removal
- **Comprehensive Settings Panel**
  - **Duration Control** - 10-120 seconds (slider)
  - **Aspect Ratio** - 16:9, 9:16, 1:1, 4:3
  - **Video Quality** - 4K, 1080p, 720p, 480p
  - **Frame Rate** - 24, 30, 60 FPS
  - **Visual Style** - Cinematic, Modern, Minimal, Vibrant, Professional, Artistic
  - **Transitions** - Smooth, Fade, Slide, Zoom, None
  - **Color Grading** - Auto, Warm, Cool, Vintage, Dramatic, Neutral
  - **Text Animation** - Fade, Slide, Typewriter, Bounce, None
  - **Background Type** - AI Generated, Solid Color, Gradient, Stock Footage
  - **Playback Speed** - 0.5x to 2.0x
  - **Audio Options** - Background Music, AI Voiceover, Subtitles (toggles)
  - **Reset to Default** - Quick settings reset button
- **Video Preview Area**
  - Animated generation progress with percentage
  - Status badges showing current processing step
  - Placeholder for generated video
- **Professional Animations**
  - Smooth transitions throughout
  - Loading animations during video generation
  - Hover effects on interactive elements

## Design Features

### Light Theme
- White and light blue color scheme
- Gradient backgrounds (blue-50 to sky-50)
- Blue accent colors (#3b82f6, #0ea5e9)
- Clean, modern aesthetics

### Dark Theme
- Slate color palette (slate-900, slate-800)
- Proper contrast for readability
- Blue accents maintained
- Smooth theme transitions

### Mobile Responsiveness
- Responsive typography (text scales appropriately)
- Flexible layouts using CSS Grid and Flexbox
- Touch-friendly button sizes
- Optimized spacing for mobile devices
- Collapsible settings panel on smaller screens
- Hamburger-friendly navigation

## Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── textarea.jsx
│   │   ├── slider.jsx
│   │   ├── switch.jsx
│   │   ├── select.jsx
│   │   ├── badge.jsx
│   │   └── progress.jsx
│   └── ThemeToggle.jsx        # Theme switcher component
├── context/
│   └── ThemeContext.jsx       # Theme provider and hook
├── lib/
│   ├── theme.js              # Color configuration
│   └── utils.js              # Utility functions
├── pages/
│   ├── HomePage.jsx          # Landing page
│   └── TextToVideoConverter.jsx  # Converter page
├── App.jsx                   # Main app with routing
├── main.jsx                  # Entry point
└── index.css                 # Global styles and theme variables
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Home Page**: 
   - Click "Get Started" to navigate to the converter
   - Toggle between light/dark mode using the theme button

2. **Converter Page**:
   - Enter a detailed text prompt describing your video
   - (Optional) Upload PDF or TXT files via drag-and-drop or file browser
   - Customize video settings in the right panel
   - Click "Generate Video" to start creation
   - Watch the animated progress as your video is generated

## Customization

### Colors
Edit `src/lib/theme.js` to customize theme colors for both light and dark modes.

### Theme Variables
Modify CSS variables in `src/index.css` for global theme adjustments.

### Settings Defaults
Update the `settings` state in `TextToVideoConverter.jsx` to change default values.

## Notes

- **UI Only**: This is a front-end UI implementation with no backend functionality
- **No Video Generation**: The "Generate Video" button simulates progress but doesn't create actual videos
- **Customizable**: Built with customization in mind - easily extend settings or modify designs
- **Production Ready**: Professional design suitable for real-world applications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built with ❤️ using modern web technologies
