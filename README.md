# Text to Video - React Project

A modern React application built with Vite, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS

## 📦 What's Included

- ⚡ Lightning-fast development with Vite
- 🎨 Tailwind CSS with custom design system
- 🧩 Pre-configured shadcn/ui components (Button component included)
- 🔧 Path aliases configured (`@/` for src directory)
- 🌗 Dark mode support built-in
- 📱 Responsive design utilities

## 🛠️ Getting Started

### Development Server

The development server is already running at [http://localhost:5173/](http://localhost:5173/)

To start it manually:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
textToVideo/
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   │       └── button.jsx
│   ├── lib/
│   │   └── utils.js     # Utility functions (cn helper)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind directives
├── public/              # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🎨 Adding shadcn/ui Components

To add more shadcn/ui components, you can manually create them in `src/components/ui/` following the shadcn/ui documentation pattern.

Example components you can add:
- Card
- Input
- Dialog
- Dropdown Menu
- Tabs
- And many more...

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- CSS variables for theming
- Dark mode support
- Custom color palette
- Responsive container settings

### Path Aliases

The `@/` alias is configured to point to the `src/` directory, allowing clean imports:

```javascript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## 📚 Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🎯 Next Steps

1. Start building your text-to-video features
2. Add more shadcn/ui components as needed
3. Customize the theme in `tailwind.config.js`
4. Build amazing user interfaces!

Happy coding! 🚀
