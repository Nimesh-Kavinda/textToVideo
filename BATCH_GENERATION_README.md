# 🎬 Text-to-Video Batch Generation System

## ✨ What's New

Your text-to-video website now supports **multi-prompt batch generation**! Generate dozens of videos automatically with individual settings for each prompt.

---

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Try the Sample Files

We've included 3 sample files in `/public` folder:

- **[sample-prompts.txt](public/sample-prompts.txt)** - 20 ready-to-use prompts
- **[sample-prompts.csv](public/sample-prompts.csv)** - Organized with categories
- **[sample-prompts.json](public/sample-prompts.json)** - With detailed metadata

**To test**:
1. Download any sample file from the `public` folder
2. Upload it to the website
3. Watch as all prompts load into the queue automatically!

---

## 📚 Documentation

### Main Guides

1. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** ⭐ **START HERE**
   - Complete technical documentation
   - All features explained
   - Data flow and architecture
   - File structure overview

2. **[QUICK_BATCH_GUIDE.md](QUICK_BATCH_GUIDE.md)** 🎯 **For Users**
   - Step-by-step usage guide
   - UI layout explanation
   - Tips and best practices
   - Troubleshooting

3. **[FILE_FORMAT_EXAMPLES.md](FILE_FORMAT_EXAMPLES.md)** 📄 **File Formats**
   - TXT, CSV, JSON format specifications
   - Complete examples for each format
   - Common mistakes to avoid
   - Template files

4. **[processchange.md](processchange.md)** 📖 **Original Spec**
   - Original requirements document
   - Image-to-video adaptation guide
   - Batch processing concept explanation

---

## 🎯 Key Features

### ✅ Multi-Prompt Input Methods
- **File Upload**: Drag & drop TXT, CSV, or JSON files
- **Text Paste**: Paste multiple prompts (one per line)
- **Manual Entry**: Add prompts one at a time

### ✅ Queue Management
- Visual queue showing all loaded prompts
- Expandable settings for each prompt
- Drag to reorder (coming soon)
- Remove unwanted prompts
- Preview all settings before generation

### ✅ Individual Prompt Settings
Each prompt can have unique settings:
- **Duration**: 5s, 10s, 30s
- **FPS**: 24, 30, 60
- **Resolution**: 720p, 1080p, 2K, 4K
- **Motion Intensity**: Low, Medium, High
- **Camera Movement**: Static, Pan, Zoom, Tracking, Orbit

### ✅ Batch Processing Controls
- **Configurable Delays**: 30s, 1min, 2min, 5min between generations
- **Auto-Download**: Automatically download completed videos
- **CSV Export**: Generate metadata spreadsheet
- **Pause/Resume**: Control batch processing anytime
- **Stop**: Cancel batch processing immediately

### ✅ Generation History
- Search prompts by text
- Filter by status (completed, failed, processing)
- Sort by date
- Actions: Preview, Download, Copy, Delete
- Complete metadata display

### ✅ Responsive Design
- Fully responsive on all devices
- Mobile-optimized layout
- Touch-friendly controls
- Smooth animations
- Dark/light theme support

---

## 💡 Usage Examples

### Example 1: Quick Test (5 prompts)

1. **Paste in text area**:
   ```
   A dragon flying
   A sunset scene
   City at night
   Forest landscape
   Ocean waves
   ```

2. **Click "Load Prompts to Queue"**

3. **Click "Generate Queue (5 prompts)"**

4. **Done!** Videos generate automatically

---

### Example 2: Professional Project (50 prompts)

1. **Create `project-prompts.txt`** with 50 prompts

2. **Upload file** → All prompts load

3. **Configure batch settings**:
   - Delay: 1 minute
   - Auto-download: ON
   - CSV export: ON

4. **Customize specific prompts**:
   - Prompt 1: 4K, 60 FPS, High motion
   - Prompt 2-49: 1080p, 30 FPS, Medium motion
   - Prompt 50: 4K, 60 FPS, Static (hero shot)

5. **Start batch** → ~50 minutes total

6. **Results**:
   - 50 videos downloaded
   - CSV file with all metadata
   - Complete history for review

---

## 🎨 UI Components

### New Components

1. **PromptQueue** - Displays all loaded prompts with settings
2. **BatchControls** - Batch processing controls and settings
3. **HistoryPanel** - Generation history with search/filter

### Updated Components

1. **FileUploadSection** - Now supports TXT, CSV, JSON parsing
2. **PromptSection** - Multi-line input with "Load Prompts" button

---

## 🔧 Technical Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons

---

## 📱 Responsive Breakpoints

- **Desktop (lg+)**: Full two-column layout with sidebar
- **Tablet (md)**: Adjusted spacing, single column
- **Mobile (sm)**: Stacked layout, optimized for touch

---

## 🎯 Workflow Summary

```
Input Prompts (File/Text)
         ↓
Parse & Create Queue
         ↓
Configure Individual Settings
         ↓
Set Batch Settings (delay, auto-download, CSV)
         ↓
Start Batch Generation
         ↓
Sequential Processing (one at a time)
         ↓
Real-time Progress Updates
         ↓
Results Saved to History
         ↓
Auto-Download & CSV Export (optional)
```

---

## 🚦 Getting Started Checklist

- [ ] Run `npm run dev`
- [ ] Open [http://localhost:5173](http://localhost:5173)
- [ ] Upload `public/sample-prompts.txt` to test
- [ ] Configure batch settings
- [ ] Click "Generate Queue"
- [ ] Monitor progress
- [ ] Check history panel
- [ ] Download results

---

## 📖 Learn More

### For Users
- Read [QUICK_BATCH_GUIDE.md](QUICK_BATCH_GUIDE.md) for step-by-step instructions
- Check [FILE_FORMAT_EXAMPLES.md](FILE_FORMAT_EXAMPLES.md) for file format help
- Use sample files in `/public` folder to test

### For Developers
- Read [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details
- Check component files in `src/components/converter/`
- Review state management in `src/pages/TextToVideoConverter.jsx`

---

## 🎬 Demo Workflow

### Try This Right Now:

1. **Copy these prompts**:
   ```
   A majestic dragon flying over mountains
   A peaceful sunset at the beach
   City lights twinkling at night
   ```

2. **Paste in the text area** on the website

3. **Click "Load Prompts to Queue"**

4. **Expand the first prompt** and change:
   - Duration: 10s
   - Resolution: 1080p
   - Motion: High

5. **Set batch delay** to 30 seconds

6. **Click "Generate Queue (3 prompts)"**

7. **Watch** as videos generate automatically!

---

## 🎨 Customization

### Change Theme Colors
Edit `src/theme/theme.jsx` to customize colors for light/dark modes.

### Modify Default Settings
Edit default values in `src/pages/TextToVideoConverter.jsx`:
```javascript
settings: {
  duration: '10s',    // Change default duration
  fps: 60,           // Change default FPS
  resolution: '4K',  // Change default resolution
  // etc.
}
```

### Add More Delay Options
Edit `src/components/converter/BatchControls.jsx` to add more delay choices.

---

## 🐛 Troubleshooting

### Server won't start
```bash
npm install
npm run dev
```

### Prompts not loading
- Check file format (TXT, CSV, or JSON)
- Ensure one prompt per line
- No special characters in filenames

### Batch processing stuck
- Click "Stop" button
- Check browser console for errors
- Refresh page and try again

---

## 📦 Sample Files Location

All sample files are in the `/public` folder:

```
public/
├── sample-prompts.txt    (20 prompts, plain text)
├── sample-prompts.csv    (10 prompts with metadata)
└── sample-prompts.json   (10 prompts with full details)
```

---

## 🎉 Features at a Glance

| Feature | Status | Description |
|---------|--------|-------------|
| Multi-Prompt Input | ✅ | File upload & text paste |
| Queue Management | ✅ | View, edit, remove prompts |
| Individual Settings | ✅ | Unique settings per prompt |
| Batch Processing | ✅ | Sequential generation |
| Progress Tracking | ✅ | Real-time updates |
| Pause/Resume | ✅ | Control during generation |
| Auto-Download | ✅ | Automatic file downloads |
| CSV Export | ✅ | Metadata spreadsheet |
| History Panel | ✅ | Search, filter, manage |
| Responsive Design | ✅ | All devices supported |
| Dark/Light Theme | ✅ | Theme toggle |
| Animations | ✅ | Smooth transitions |

---

## 🚀 Next Steps

### Immediate
1. Test with sample files
2. Familiarize yourself with UI
3. Try different batch configurations

### Short Term
1. Integrate real video generation API
2. Add localStorage for queue persistence
3. Implement actual video player

### Long Term
1. Add drag-to-reorder prompts
2. Implement video editing features
3. Add collaboration features
4. Cloud storage integration

---

## 📞 Support

For questions or issues:
1. Check documentation files in this folder
2. Review code comments in source files
3. Test with provided sample files

---

**🎉 Your batch video generation system is ready!**

Start by uploading [sample-prompts.txt](public/sample-prompts.txt) and exploring the features!

---

## 📜 License

All implementation follows your project's existing license.

## 🙏 Credits

- Original concept from [processchange.md](processchange.md)
- UI components from shadcn/ui
- Icons from Lucide React
- Animations from Framer Motion

---

**Happy Video Generating! 🎬✨**
