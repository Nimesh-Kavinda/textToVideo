# 📄 Batch Prompt File Format Examples

## Supported File Formats

Your batch video generation system supports three file formats for loading multiple prompts:

1. **TXT** - Plain text files (simplest)
2. **CSV** - Comma-separated values (with metadata)
3. **JSON** - JavaScript Object Notation (most flexible)

---

## 📝 TXT Format (Recommended for Beginners)

### Simple TXT File
**File: `my-prompts.txt`**

```
A dragon flying over snow-capped mountains
A peaceful sunset at the beach with ocean waves
City lights at night with car traffic flowing
A dense forest with morning mist and sunlight rays
Underwater coral reef with colorful fish swimming
Northern lights dancing over a frozen lake
```

### Rules:
- ✅ One prompt per line
- ✅ No special formatting needed
- ✅ Empty lines are automatically removed
- ✅ Leading/trailing spaces are trimmed

### Example Usage:
1. Create a `.txt` file
2. Type one prompt per line
3. Upload to your website
4. Prompts automatically load into queue

---

## 📊 CSV Format (For Organized Data)

### Simple CSV File
**File: `prompts.csv`**

```csv
prompt
A dragon flying over mountains
A sunset at the beach
City lights at night
Forest with morning mist
Underwater coral reef
```

### CSV with Metadata (Advanced)
**File: `prompts-advanced.csv`**

```csv
prompt,duration,resolution,fps
A dragon flying over mountains,10s,1080p,30
A sunset at the beach,5s,720p,24
City lights at night,30s,4K,60
Forest with morning mist,10s,2K,30
```

### Rules:
- ✅ First row can be headers (will be skipped if it says "prompt")
- ✅ Prompts in first column
- ✅ Additional metadata columns are optional
- ✅ Use commas to separate values

### Example:
```csv
prompt,notes
A majestic dragon in flight,High motion intensity
Peaceful beach scene,Low motion
Fast-paced city traffic,High FPS needed
Serene forest landscape,Static camera
```

**Note**: Currently, only the prompt text is parsed. Metadata columns are for your reference. You'll set duration, resolution, etc. in the UI after loading.

---

## 🔧 JSON Format (Most Flexible)

### Simple JSON Array
**File: `prompts.json`**

```json
[
  "A dragon flying over snow-capped mountains",
  "A peaceful sunset at the beach with waves",
  "City lights at night with car traffic",
  "A dense forest with morning mist",
  "Underwater coral reef with fish"
]
```

### JSON with Objects
**File: `prompts-objects.json`**

```json
[
  {
    "prompt": "A dragon flying over snow-capped mountains",
    "category": "fantasy",
    "style": "cinematic"
  },
  {
    "prompt": "A peaceful sunset at the beach with waves",
    "category": "nature",
    "style": "realistic"
  },
  {
    "prompt": "City lights at night with car traffic",
    "category": "urban",
    "style": "timelapse"
  }
]
```

### JSON with Settings (Advanced)
**File: `prompts-full.json`**

```json
[
  {
    "prompt": "A dragon flying over snow-capped mountains",
    "duration": "10s",
    "resolution": "1080p",
    "fps": 30,
    "motionIntensity": "High",
    "cameraMovement": "tracking"
  },
  {
    "prompt": "A peaceful sunset at the beach with waves",
    "duration": "5s",
    "resolution": "720p",
    "fps": 24,
    "motionIntensity": "Low",
    "cameraMovement": "static"
  }
]
```

### Rules:
- ✅ Must be valid JSON format
- ✅ Can be an array of strings OR objects
- ✅ If objects, must have a `prompt` property
- ✅ Additional properties are for reference (set in UI currently)

---

## 📋 Complete Examples by Use Case

### Use Case 1: Quick Batch (50 Prompts)

**File: `quick-batch.txt`**
```
Mountain landscape with fog
Ocean waves on rocks
Forest with sunlight
Waterfall in jungle
Desert at sunset
Northern lights
Cherry blossoms
Autumn leaves
Starry night sky
Clouds time-lapse
Snow falling
Rain on window
Fire crackling
River flowing
Birds flying
... (add 35 more)
```

**How to use**:
1. Upload `quick-batch.txt`
2. 50 prompts load instantly
3. All get default settings
4. Generate batch!

---

### Use Case 2: Organized Project

**File: `nature-documentary.csv`**
```csv
prompt,scene_type,duration_note
Wide shot of mountain range at dawn,establishing,long
Close-up of dewdrops on leaves,detail,short
Pan across forest canopy,movement,medium
Time-lapse of clouds over peaks,atmosphere,long
Slow-mo waterfall cascade,detail,medium
Birds taking flight from trees,action,short
Sunset through tree branches,atmosphere,medium
```

**How to use**:
1. Upload CSV
2. Prompts load with reference notes
3. Configure durations based on notes
4. Generate organized content

---

### Use Case 3: Complex Production

**File: `commercial-shots.json`**
```json
[
  {
    "prompt": "Product floating in space with particles",
    "shot_number": 1,
    "duration": "5s",
    "notes": "Hero shot - high quality"
  },
  {
    "prompt": "Close-up of product features",
    "shot_number": 2,
    "duration": "3s",
    "notes": "Detail focus"
  },
  {
    "prompt": "Product in lifestyle setting",
    "shot_number": 3,
    "duration": "4s",
    "notes": "Context shot"
  },
  {
    "prompt": "Product with happy customer",
    "shot_number": 4,
    "duration": "3s",
    "notes": "Emotional connection"
  }
]
```

**How to use**:
1. Upload JSON with detailed notes
2. Prompts load in order
3. Use notes to guide settings
4. Professional workflow!

---

## 💡 Best Practices

### TXT Files
✅ **Best for**: Quick batches, simple lists  
✅ **Pros**: Easy to create, no formatting needed  
✅ **Cons**: No metadata, no organization  

**When to use**: Testing, quick projects, simple prompts

---

### CSV Files
✅ **Best for**: Organized projects with reference data  
✅ **Pros**: Structured, easy to edit in Excel/Sheets  
✅ **Cons**: Requires CSV formatting knowledge  

**When to use**: Client projects, documented workflows, team collaboration

---

### JSON Files
✅ **Best for**: Complex projects with detailed metadata  
✅ **Pros**: Most flexible, can include any data  
✅ **Cons**: Requires JSON syntax knowledge  

**When to use**: Large productions, automated workflows, programmatic generation

---

## 🎯 Template Files

### Starter Template (TXT)
```
[Copy and paste your prompts here, one per line]
```

### Project Template (CSV)
```csv
prompt,category,priority,notes
[Your prompt here],landscape,high,[Any notes]
[Your prompt here],action,medium,[Any notes]
[Your prompt here],detail,low,[Any notes]
```

### Production Template (JSON)
```json
[
  {
    "prompt": "[Your prompt here]",
    "category": "landscape",
    "priority": "high",
    "notes": "Any notes here"
  }
]
```

---

## 📦 Example Files Included

Create these files to test:

### `test-batch.txt`
```
A dragon flying
A sunset scene
City at night
Forest landscape
Ocean waves
```

### `test-batch.csv`
```csv
prompt,type
A dragon flying,fantasy
A sunset scene,nature
City at night,urban
Forest landscape,nature
Ocean waves,nature
```

### `test-batch.json`
```json
[
  "A dragon flying",
  "A sunset scene",
  "City at night",
  "Forest landscape",
  "Ocean waves"
]
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Wrong: Empty lines in TXT
```
A dragon flying

A sunset scene

City at night
```
**Why**: Wastes queue slots (though they'll be filtered out)

### ✅ Correct: No empty lines
```
A dragon flying
A sunset scene
City at night
```

---

### ❌ Wrong: Invalid JSON
```json
[
  "A dragon flying",
  "A sunset scene"
  "City at night"
]
```
**Why**: Missing comma between elements

### ✅ Correct: Valid JSON
```json
[
  "A dragon flying",
  "A sunset scene",
  "City at night"
]
```

---

### ❌ Wrong: Malformed CSV
```csv
prompt
A dragon, flying over mountains
A sunset, at the beach
```
**Why**: Commas in prompt text confuse CSV parser

### ✅ Correct: Quoted CSV
```csv
prompt
"A dragon, flying over mountains"
"A sunset, at the beach"
```

---

## 🎨 Advanced: Programmatic Generation

### Python Script to Generate JSON

```python
prompts = [
    "A dragon flying",
    "A sunset scene",
    "City at night"
]

import json

output = [
    {
        "prompt": p,
        "duration": "10s",
        "resolution": "1080p",
        "fps": 30
    }
    for p in prompts
]

with open('prompts.json', 'w') as f:
    json.dump(output, f, indent=2)
```

### Excel to CSV

1. Create prompts in Excel
2. Save As → CSV
3. Upload to website

---

## 📝 Summary

| Format | Ease of Use | Flexibility | Best For |
|--------|-------------|-------------|----------|
| TXT    | ⭐⭐⭐⭐⭐ | ⭐⭐ | Quick batches |
| CSV    | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Organized projects |
| JSON   | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Complex workflows |

**Recommendation**: Start with TXT, move to CSV for organization, use JSON for automation.

---

**🎉 Now you know all the file formats! Choose the one that fits your workflow best.**

For more help, see [QUICK_BATCH_GUIDE.md](QUICK_BATCH_GUIDE.md)
