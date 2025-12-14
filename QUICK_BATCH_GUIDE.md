# 🎬 Video Batch Generation - Quick Start Guide

## 🚀 Getting Started

Your video generation website is now running at: **http://localhost:5173/**

---

## 📖 How to Use the New Batch Processing System

### Method 1: Upload a File with Multiple Prompts

1. **Create a text file** (e.g., `prompts.txt`) with one prompt per line:
   ```
   A dragon flying over snow-capped mountains
   A peaceful sunset at the beach with waves
   City lights at night with car traffic
   A forest with morning mist and sunlight
   ```

2. **Upload the file**:
   - Drag and drop the file into the upload area
   - OR click the upload area and select your file
   - Supported formats: `.txt`, `.csv`, `.json`

3. **Prompts automatically load into the queue**
   - You'll see all prompts listed in the "Prompt Queue" section
   - Each prompt shows its settings (duration, resolution, etc.)

---

### Method 2: Paste Multiple Prompts

1. **In the prompt text area**, paste multiple prompts (one per line):
   ```
   A dragon flying over mountains
   A sunset at the beach
   City lights at night
   ```

2. **Click "Load Prompts to Queue"**
   - All prompts are parsed and added to the queue
   - Each gets default settings from the sidebar

---

## ⚙️ Configure Your Batch

### Individual Prompt Settings

1. In the **Prompt Queue** section:
   - Click the dropdown arrow (▼) on any prompt
   - Configure individual settings:
     - **Duration**: 5s, 10s, or 30s
     - **Frame Rate**: 24, 30, or 60 FPS
     - **Resolution**: 720p, 1080p, 2K, or 4K
     - **Motion Intensity**: Low, Medium, or High
     - **Camera Movement**: Static, Pan, Zoom, Tracking, or Orbit

2. Each prompt can have **different settings**!
   - Prompt 1: 5s, 1080p, High motion
   - Prompt 2: 10s, 4K, Low motion
   - Prompt 3: 30s, 720p, Medium motion

### Batch Processing Settings

In the **Batch Generation Controls** section:

1. **Delay Between Generations**:
   - 30 seconds (quick testing)
   - 1 minute (recommended)
   - 2 minutes (quality)
   - 5 minutes (maximum quality)

2. **Auto Download Results**:
   - Toggle ON: Videos download automatically when done
   - Toggle OFF: Manual download from history

3. **Export Metadata to CSV**:
   - Toggle ON: Creates spreadsheet with all generation data
   - Toggle OFF: No CSV file

---

## 🎥 Generate Your Videos

1. **Click "Generate Queue (X prompts)"**
   - Batch processing starts
   - Progress bar shows completion percentage
   - Current prompt being processed is displayed

2. **During Processing**:
   - **Pause**: Click to pause, click again to resume
   - **Stop**: Stops entire batch immediately
   - Estimated time remaining is shown

3. **Watch Progress**:
   - Each video generates sequentially (one at a time)
   - Delay happens between each generation
   - Results appear in real-time

---

## 📊 View Your History

The **Generation History** panel shows all your generated videos:

### Features:
- **Search**: Find prompts by text
- **Filter**: Show only completed, failed, or processing videos
- **Sort**: Newest first or oldest first

### Actions for Each Video:
- **▶ Play**: Preview the generated video
- **⬇ Download**: Download to your computer
- **📋 Copy**: Copy the prompt to reuse it
- **🗑️ Delete**: Remove from history

---

## 🎨 UI Layout

### Desktop View
```
┌─────────────────────────────────────────────────────┐
│                    Header & Banner                   │
├──────────────┬──────────────────────────────────────┤
│   Settings   │                                       │
│   Sidebar    │        Main Content Area             │
│              │                                       │
│   Model      │  1. Prompt Input Section             │
│   Duration   │  2. File Upload Section              │
│   Ratio      │                                       │
│   Resolution │  ┌──────────────┬──────────────┐     │
│   Audio      │  │ Prompt Queue │ Batch Controls│     │
│   Multi-Shot │  │              │ History Panel │     │
│              │  └──────────────┴──────────────┘     │
│              │  3. Video Preview                    │
└──────────────┴──────────────────────────────────────┘
```

### Mobile View (Stacked)
```
┌─────────────────────┐
│   Header & Banner   │
├─────────────────────┤
│   Video Preview     │
├─────────────────────┤
│  Settings Button    │
├─────────────────────┤
│   Prompt Input      │
├─────────────────────┤
│   File Upload       │
├─────────────────────┤
│   Prompt Queue      │
├─────────────────────┤
│   Batch Controls    │
├─────────────────────┤
│   History Panel     │
└─────────────────────┘
```

---

## 💡 Tips & Best Practices

### For Best Results:

1. **Use descriptive prompts**:
   - Good: "A majestic dragon flying over snow-capped mountains at sunset"
   - Bad: "dragon"

2. **Set appropriate delays**:
   - Short videos (5s): 30s - 1min delay
   - Long videos (30s): 2min - 5min delay
   - This prevents API rate limits

3. **Configure settings per prompt**:
   - Action scenes: High motion intensity
   - Landscape: Low motion, static camera
   - Mix and match for variety

4. **Use auto-download for large batches**:
   - Saves time
   - No manual clicking

5. **Export CSV for record keeping**:
   - Track what settings worked best
   - Reference for future projects

---

## 🎯 Example Workflow

### Scenario: Generate 10 Nature Videos

1. **Create `nature-prompts.txt`**:
   ```
   Mountain landscape with morning fog
   Ocean waves crashing on rocky shore
   Forest path with sunlight through trees
   Waterfall in tropical jungle
   Desert dunes at golden hour
   Northern lights over snowy landscape
   Cherry blossoms in spring breeze
   Autumn forest with falling leaves
   Starry night sky over mountains
   Sunset clouds time-lapse
   ```

2. **Upload the file**
   - 10 prompts load into queue

3. **Configure batch settings**:
   - Delay: 1 minute
   - Auto-download: ON
   - CSV export: ON

4. **Adjust individual prompts** (optional):
   - Waterfall: High motion, 30s duration
   - Sunset clouds: Medium motion, 10s
   - Most others: Low motion, 5s

5. **Click "Generate Queue (10 prompts)"**
   - Sit back and relax
   - Total time: ~10 minutes (1 min delay × 10)
   - All videos download automatically
   - CSV file with metadata generated

6. **Review in History**:
   - Preview all videos
   - Re-download favorites
   - Delete any failures
   - Copy prompts that worked well

---

## 🔧 Troubleshooting

### Prompts not loading?
- Check file format (should be `.txt`, `.csv`, or `.json`)
- Ensure one prompt per line
- No empty lines at the beginning

### Batch processing stuck?
- Click "Stop" and try again
- Check your internet connection
- Reduce batch size for testing

### Videos not downloading?
- Check browser download permissions
- Ensure auto-download is enabled
- Try manual download from history

---

## 🎨 Customization

### Change Default Settings

In `TextToVideoConverter.jsx`, modify the default settings:

```javascript
settings: {
  duration: '10s',        // Change from 5s to 10s
  fps: 60,               // Change from 30 to 60
  resolution: '4K',      // Change from 720p to 4K
  // etc.
}
```

### Adjust Delay Options

In `BatchControls.jsx`, modify delay options:

```javascript
<SelectItem value="10s">10 seconds</SelectItem>
<SelectItem value="30s">30 seconds</SelectItem>
<SelectItem value="1min">1 minute</SelectItem>
// Add more as needed
```

---

## 📱 Mobile Usage

On mobile devices:
- Swipe to scroll through sections
- Tap prompts to expand settings
- Use landscape mode for better video preview
- All features work the same as desktop

---

## ✨ Features Summary

✅ **Multi-Prompt Input**: File upload OR text paste  
✅ **Queue Management**: View, edit, remove prompts  
✅ **Individual Settings**: Each prompt configured independently  
✅ **Batch Processing**: Automated sequential generation  
✅ **Progress Tracking**: Real-time updates  
✅ **Pause/Resume**: Control during generation  
✅ **Auto-Download**: Automatic file downloads  
✅ **CSV Export**: Metadata spreadsheet  
✅ **History Panel**: Search, filter, manage all videos  
✅ **Responsive Design**: Works on all devices  
✅ **Theme Support**: Dark/light mode  
✅ **Smooth Animations**: Beautiful transitions  

---

**🎉 You're all set! Start creating amazing videos in batches!**

For questions or issues, refer to [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details.
