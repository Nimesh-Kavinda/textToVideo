# Multi-Prompt Batch Generation Process - Image to Video Adaptation Guide

## Core Concept: Multi-Prompt Queue System

This project uses a **batch processing workflow** where multiple prompts are loaded, queued, and generated sequentially. This is fundamentally different from single-prompt systems.

**Key Principle**: Users load multiple prompts → Each prompt gets individual settings → Batch generation processes all prompts with delays

---

## Complete Generation Process Flow

### Phase 1: Input Phase

#### Two Input Methods

**Method A: File Upload**
```
User uploads .txt/.csv/.json file
    ↓
FileReader API reads content
    ↓
Parse text into individual prompts
    ↓
Create prompt queue automatically
```

**Method B: Manual Paste**
```
User pastes text in textarea (one prompt per line)
    ↓
User clicks "Load Prompts" button
    ↓
Parse text by splitting on newlines
    ↓
Filter out empty lines
    ↓
Create prompt queue
```

**Important**: Prompts are split ONLY by line breaks (`\n`), NOT by text wrapping.

#### Prompt Parsing Logic
```javascript
parsePrompts(text) {
  const prompts = text
    .split('\n')                    // Split by newlines
    .map(p => p.trim())             // Remove whitespace
    .filter(p => p.length > 0);     // Remove empty lines
  
  // Create queue with default settings for each
  setPromptQueue(prompts.map((prompt, index) => ({
    id: index + 1,
    text: prompt,
    settings: {
      style: 'digital-art',        // Default values
      size: '1024x1024',
      model: 'SDXL'
    }
  })));
}
```

---

### Phase 2: Queue Display & Configuration

#### Prompt Queue Structure
Each item in the queue contains:
```javascript
{
  id: 1,
  text: "A majestic dragon sleeping on gold coins",
  settings: {
    style: 'digital-art',          // For IMAGE
    size: '1024x1024',
    model: 'SDXL'
  }
}
```

#### Individual Prompt Settings
Each prompt in the queue shows:
- **Queue number** (1, 2, 3...)
- **Prompt text** (full preview)
- **Current settings** (Style, Size, Model)
- **Settings dropdown** (hover to modify):
  - Change style per prompt
  - Change size per prompt
  - Change model per prompt
  - Remove from queue option

**Key Feature**: Each prompt has INDEPENDENT settings - you can mix different styles/sizes/models in one batch.

#### Batch Processing Options
Global settings for the entire queue:
1. **Auto-download**: Download results automatically
2. **Create CSV**: Export metadata to CSV file
3. **Delay**: Time between generations (5s, 10s, 30s)

---

### Phase 3: Generation Phase

#### User Triggers Generation
```
Click "Generate Queue (X prompts)" button
    ↓
Display: "Generating X images..." notification
    ↓
Button shows loading spinner
    ↓
Button becomes disabled
```

#### Batch Processing Loop
```javascript
handleGenerateQueue() {
  for each prompt in promptQueue:
    ↓
    1. Call API with prompt.text + prompt.settings
    ↓
    2. Wait for API response
    ↓
    3. Display result in ImageDisplay
    ↓
    4. Apply delay (5s/10s/30s)
    ↓
    5. Move to next prompt
  
  When all complete:
    ↓
    Show success notification
    ↓
    Auto-download if enabled
    ↓
    Create CSV if enabled
    ↓
    Save all to history
}
```

#### Important Processing Features
- **Sequential processing**: One at a time, not parallel
- **Configurable delays**: Prevents API rate limits
- **Individual settings**: Each prompt uses its own settings
- **Progress feedback**: Show current prompt being processed

---

### Phase 4: Display Phase

#### Show Results
```
Receive generated image/video
    ↓
Display in main preview area (large)
    ↓
Add to variations grid (thumbnails)
    ↓
Show metadata:
    - Model used
    - Generation time
    - Seed number
    - Resolution/size
    ↓
Enable actions:
    - Download
    - Fullscreen
    - Share
    - Regenerate
```

---

### Phase 5: History Phase

#### Save to History
```
After each successful generation:
    ↓
Create history entry:
    {
      id: unique_id,
      prompt: "the prompt text",
      date: "5 mins ago",
      status: "completed" | "failed",
      model: "SDXL",
      size: "1024x1024"
    }
    ↓
Display in history list
    ↓
Enable actions:
    - Copy prompt to reuse
    - Download again
    - Delete from history
```

---

## How This Differs from Single-Prompt Systems

### Single-Prompt System
```
Enter one prompt → Generate → See result → Enter next prompt
(Manual, repetitive process)
```

### This Multi-Prompt Queue System
```
Load 50 prompts at once → Configure each → Generate all → Get all results
(Automated batch processing)
```

### Key Differences

1. **Input Method**
   - Single: One text box, one prompt
   - This: File upload OR multi-line paste, many prompts

2. **Queue Management**
   - Single: No queue
   - This: Visual queue showing all prompts before generation

3. **Settings**
   - Single: One setting applies to one generation
   - This: Each prompt has independent settings

4. **Processing**
   - Single: Generate one, wait, repeat
   - This: Generate all with delays automatically

5. **Downloads**
   - Single: Download one at a time
   - This: Auto-download all results

6. **CSV Export**
   - Single: No batch metadata
   - This: Export all prompts + results + metadata

---

## Adapting This Process for Video Generation

### What Changes for Video

#### 1. Queue Item Structure (Adapt Settings)
```javascript
// IMAGE (Current)
{
  id: 1,
  text: "Dragon flying over mountains",
  settings: {
    style: 'digital-art',
    size: '1024x1024',
    model: 'SDXL'
  }
}

// VIDEO (New)
{
  id: 1,
  text: "Dragon flying over mountains",
  settings: {
    duration: '10s',              // Video length
    fps: 30,                      // Frame rate
    resolution: '1080p',          // Video resolution
    aspectRatio: '16:9',          // Video format
    motionIntensity: 'medium',    // Movement amount
    cameraMovement: 'pan',        // Camera behavior
    style: 'realistic',           // Visual style
    model: 'RunwayML'            // Video AI model
  }
}
```

#### 2. Batch Processing Delays (Longer Times)
```javascript
// IMAGE
delay: '5s' | '10s' | '30s'

// VIDEO (adjust for longer generation)
delay: '30s' | '1min' | '5min'
```

#### 3. Display Component Changes
```javascript
// IMAGE: <img src={url} />
// VIDEO: <video controls><source src={url} type="video/mp4" /></video>

// Add video-specific features:
- Play/pause controls
- Playback timeline
- Volume control
- Fullscreen mode
- Thumbnail previews
```

#### 4. File Formats
```javascript
// IMAGE
output: .png, .jpg, .webp

// VIDEO
output: .mp4, .mov, .webm
```

#### 5. Progress Indicators
```javascript
// IMAGE: Simple "Generating X/Y..."

// VIDEO: More detailed
"Generating video 5/50..."
"Processing prompt: [prompt text]"
"Estimated time: 3 minutes remaining"
"Current: Rendering frames..."
```

---

## Implementation Process for Video Project

### Step 1: Keep Same Input Flow
✅ File upload (.txt, .csv) - Keep as-is
✅ Multi-line paste - Keep as-is  
✅ Parse by newlines - Keep as-is
✅ Create queue - Keep as-is

### Step 2: Update Queue Settings
📝 Change `settings` object to video parameters:
- duration (5s, 10s, 30s)
- fps (24, 30, 60)
- resolution (720p, 1080p, 4K)
- aspectRatio (16:9, 9:16, 1:1)
- motionIntensity (low, medium, high)
- cameraMovement (static, pan, zoom, tracking)

### Step 3: Update Settings Dropdowns
📝 For each prompt in queue, show video settings:
- Duration selector
- FPS selector
- Resolution selector
- Motion intensity slider
- Camera movement options

### Step 4: Update Batch Options
📝 Adjust delays for video generation time:
- Change from (5s, 10s, 30s)
- To (30s, 1min, 5min) or longer

### Step 5: Update Display Component
📝 Replace image viewer with video player:
- HTML5 `<video>` element
- Play/pause controls
- Progress bar
- Volume control
- Fullscreen button

### Step 6: Update History
📝 Store video-specific metadata:
- Video duration
- FPS
- Resolution
- File size
- Thumbnail preview (first frame)

---

## Critical Points to Remember

### 1. Queue System is the Same
The fundamental queue architecture doesn't change:
- Load multiple prompts
- Display all in queue
- Individual settings per item
- Batch process sequentially
- Save to history

### 2. Only Settings Change
Adapt the settings object from image parameters to video parameters, but the structure remains identical.

### 3. Processing Flow is Identical
```
Load → Queue → Configure → Generate Batch → Display → History
```
This flow works for both images and videos.

### 4. State Management Pattern
```javascript
// Same pattern, different values
useState([])                // promptQueue
useState(false)             // isLoading
useState('30s')             // delay (adjust default)
useState(false)             // autoDownload
useState(false)             // createCSV
```

---

## Summary

### The Core Multi-Prompt Process
1. **Input**: Load multiple prompts (file/paste)
2. **Parse**: Split by newlines into queue
3. **Configure**: Set individual settings per prompt
4. **Process**: Batch generate with delays
5. **Display**: Show all results
6. **History**: Track all generations

### For Video Generation
- ✅ Keep: Queue system, input methods, batch processing
- 🔄 Change: Settings parameters (image → video)
- 🔄 Change: Display component (img → video)
- 🔄 Change: Processing delays (shorter → longer)
- 🔄 Change: File formats (.png → .mp4)

The **workflow and architecture remain exactly the same** - only the content type and parameters change from images to videos.
