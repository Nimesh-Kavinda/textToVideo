import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Upload,
  FileText,
  Trash2,
  Wand2,
  Play,
  Moon,
  Sun,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  Settings,
  Sliders,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from '../components/ui/dialog';
import { theme as appTheme } from '../theme/theme';

export default function TextToVideoConverter() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const colors = appTheme[theme]; // Get theme colors
  const [prompt, setPrompt] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('motion');
  const [settings, setSettings] = useState({
    model: 'standard',
    duration: '5s',
    aspectRatio: '16:9',
    resolution: '720P',
    style: 'cinematic',
    creativity: 70,
    enableAudio: true,
    multiShot: false,
    previewMode: false,
    motionControl: 'none',
  });

  // Motion control presets
  const motionPresets = [
    { id: 'none', label: 'None', icon: '🧪' },
    { id: 'bullet-time', label: 'Bullet Time', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_bullet_time_1765511706744.png' },
    { id: 'crane-down', label: 'Crane Down', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_crane_down_1765511724575.png' },
    { id: 'crane-up', label: 'Crane Up', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_crane_up_1765511741511.png' },
    { id: 'zoom-in', label: 'Crash Zoom In', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_zoom_in_1765511762378.png' },
    { id: 'dolly-in', label: 'Dolly In', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_dolly_in_1765511777592.png' },
    { id: 'pan-left', label: 'Pan Left', image: 'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_pan_left_1765511795074.png' },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const fileNames = files.map((file) => file.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.background.page }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.border.main,
        }}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                style={{
                  color: colors.text.secondary,
                }}
              >
                <ArrowLeft
                  className="w-4 h-4 mr-2"
                  style={{ color: colors.icon.secondary }}
                />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: colors.primary.main }}
                />
                <span
                  className="font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  AI Video Generator
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                style={{
                  color: colors.text.secondary,
                }}
              >
                <Sliders
                  className="w-4 h-4 mr-2"
                  style={{ color: colors.icon.secondary }}
                />
                Advanced Settings
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <Sun
                    className="w-4 h-4"
                    style={{ color: colors.status.warning }}
                  />
                ) : (
                  <Moon
                    className="w-4 h-4"
                    style={{ color: colors.icon.secondary }}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-6">
          {/* Left Sidebar - Settings */}
          <div className="space-y-3">
            <Card
              className="border"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.main,
              }}
            >
              <div className="p-4 space-y-4">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium flex items-center justify-between"
                    style={{ color: colors.text.primary }}
                  >
                    Model
                    <Badge variant="outline" className="text-xs">
                      V5.5
                    </Badge>
                  </label>
                  <Select
                    value={settings.model}
                    onValueChange={(value) =>
                      handleSettingChange('model', value)
                    }
                  >
                    <SelectTrigger
                      className="h-9 text-sm"
                      style={{
                        backgroundColor: colors.background.input,
                        borderColor: colors.border.main,
                        color: colors.text.primary,
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: colors.background.card,
                        borderColor: colors.border.main,
                      }}
                    >
                      <SelectItem value="standard">Motion 2.0 Fast</SelectItem>
                      <SelectItem value="premium">
                        Motion 2.0 Quality
                      </SelectItem>
                      <SelectItem value="ultra">Motion 2.0 Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: colors.text.primary }}
                  >
                    Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['5s', '8s', '10s'].map((duration) => (
                      <Button
                        key={duration}
                        variant={
                          settings.duration === duration ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() =>
                          handleSettingChange('duration', duration)
                        }
                        className="h-8 text-sm font-medium border-0"
                        style={{
                          background:
                            settings.duration === duration
                              ? colors.primary.gradient
                              : colors.background.hover,
                          color:
                            settings.duration === duration
                              ? colors.text.white
                              : colors.text.primary,
                          borderColor: colors.border.main,
                        }}
                      >
                        {duration}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ratio */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: colors.text.primary }}
                  >
                    Ratio
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { value: '16:9', label: '16:9', icon: '▭' },
                      { value: '4:3', label: '4:3', icon: '▬' },
                      { value: '1:1', label: '1:1', icon: '□' },
                      { value: '3:4', label: '3:4', icon: '▯' },
                      { value: '9:16', label: '9:16', icon: '▮' },
                    ].map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() =>
                          handleSettingChange('aspectRatio', ratio.value)
                        }
                        className="h-14 flex flex-col items-center justify-center gap-1 rounded-md border text-xs font-medium transition-all"
                        style={{
                          background:
                            settings.aspectRatio === ratio.value
                              ? colors.primary.gradient
                              : colors.background.hover,
                          borderColor:
                            settings.aspectRatio === ratio.value
                              ? 'transparent'
                              : colors.border.main,
                          color:
                            settings.aspectRatio === ratio.value
                              ? colors.text.white
                              : colors.text.primary,
                        }}
                      >
                        <span className="text-lg">{ratio.icon}</span>
                        <span>{ratio.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: colors.text.primary }}
                  >
                    Resolution
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['360P', '540P', '720P', '1080P'].map((res) => (
                      <button
                        key={res}
                        onClick={() => handleSettingChange('resolution', res)}
                        className="h-8 rounded-md text-xs font-medium transition-all border"
                        style={{
                          background:
                            settings.resolution === res
                              ? colors.secondary.gradient
                              : colors.background.hover,
                          borderColor: colors.border.main,
                          color:
                            settings.resolution === res
                              ? colors.text.white
                              : colors.text.primary,
                        }}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3 pt-2">
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: colors.background.hover }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors.background.card }}
                      >
                        <span className="text-sm">🔊</span>
                      </div>
                      <label
                        className="text-sm font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        Audio
                        <Badge variant="outline" className="ml-2 text-xs">
                          New
                        </Badge>
                      </label>
                    </div>
                    <Switch
                      checked={settings.enableAudio}
                      onCheckedChange={(checked) =>
                        handleSettingChange('enableAudio', checked)
                      }
                    />
                  </div>

                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: colors.background.hover }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors.background.card }}
                      >
                        <span className="text-sm">🎬</span>
                      </div>
                      <label
                        className="text-sm font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        Multi-Shot
                        <Badge variant="outline" className="ml-2 text-xs">
                          New
                        </Badge>
                      </label>
                    </div>
                    <Switch
                      checked={settings.multiShot}
                      onCheckedChange={(checked) =>
                        handleSettingChange('multiShot', checked)
                      }
                    />
                  </div>

                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: colors.background.hover }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors.background.card }}
                      >
                        <span className="text-sm">⚡</span>
                      </div>
                      <label
                        className="text-sm font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        Preview Mode
                      </label>
                    </div>
                    <Switch
                      checked={settings.previewMode}
                      onCheckedChange={(checked) =>
                        handleSettingChange('previewMode', checked)
                      }
                    />
                  </div>
                </div>

                {/* Advanced Settings Quick Access */}
                <div className="pt-3 mt-3 border-t" style={{ borderColor: colors.border.main }}>
                  <label
                    className="text-sm font-medium mb-3 block"
                    style={{ color: colors.text.primary }}
                  >
                    Advanced Settings
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveTab('motion');
                        setIsSettingsOpen(true);
                      }}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: colors.background.hover,
                        color: colors.text.secondary,
                      }}
                    >
                      <span className="text-base">🎬</span>
                      <span className="text-xs font-medium">Motion Control</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('video');
                        setIsSettingsOpen(true);
                      }}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: colors.background.hover,
                        color: colors.text.secondary,
                      }}
                    >
                      <span className="text-base">🎥</span>
                      <span className="text-xs font-medium">Video Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('advanced');
                        setIsSettingsOpen(true);
                      }}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: colors.background.hover,
                        color: colors.text.secondary,
                      }}
                    >
                      <span className="text-base">⚙️</span>
                      <span className="text-xs font-medium">Advanced Options</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="space-y-4">
            {/* Text Input and Generate Button in Same Row */}
            <Card
              className="border"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.main,
              }}
            >
              <div className="p-6">
                <div className="flex gap-3 items-stretch">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the content you want to create..."
                    className="flex-1 resize-none text-sm"
                    rows={1}
                    style={{
                      backgroundColor: colors.background.input,
                      borderColor: colors.border.main,
                      color: colors.text.primary,
                      minHeight: '44px',
                      maxHeight: '120px',
                      padding: '12px 14px',
                    }}
                  />
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt && uploadedFiles.length === 0}
                    className="h-auto px-6 py-3 font-medium text-sm shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0 flex-shrink-0 whitespace-nowrap"
                    style={{
                      background: colors.primary.gradient,
                      color: colors.text.white,
                      boxShadow: colors.shadow.md,
                    }}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* File Upload Section */}
            <Card
              className="border"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.main,
              }}
            >
              <div className="p-6 space-y-4">
                {/* File Upload and Instructions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
                  {/* File Upload - Left Side */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={() => setIsDragging(false)}
                    className="group relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-opacity-100"
                    style={{
                      borderColor: isDragging
                        ? colors.primary.main
                        : colors.border.main,
                      backgroundColor: isDragging
                        ? `${colors.primary.main}15`
                        : colors.background.hover,
                      borderWidth: '3px',
                      borderStyle: 'dashed',
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isDragging
                          ? `${colors.primary.main}20`
                          : colors.background.card,
                        border: `2px solid ${isDragging ? colors.primary.main : colors.border.main}`,
                      }}
                    >
                      <Upload
                        className="w-6 h-6 transition-all duration-300"
                        style={{
                          color: isDragging ? colors.primary.main : colors.icon.secondary,
                        }}
                      />
                    </div>
                    <p
                      className="text-base font-semibold mb-2 transition-colors duration-300"
                      style={{ color: isDragging ? colors.primary.main : colors.text.primary }}
                    >
                      Drop files here or click to upload
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: colors.text.tertiary }}
                    >
                      PDF or TXT files supported
                    </p>
                  </div>

                  {/* Instructions Panel - Right Side */}
                  <div
                    className="rounded-xl p-6 border"
                    style={{
                      backgroundColor: colors.background.hover,
                      borderColor: colors.border.main,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: colors.icon.error,
                        }}
                      >
                        <Sparkles className="w-4 h-4" style={{ color: colors.text.white }} />
                      </div>
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: colors.text.primary }}
                      >
                        How to Use
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${colors.primary.main}20`,
                            color: colors.primary.main,
                          }}
                        >
                          1
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: colors.text.secondary }}
                        >
                          Enter your video description in the text field above
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${colors.primary.main}20`,
                            color: colors.primary.main,
                          }}
                        >
                          2
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: colors.text.secondary }}
                        >
                          Upload PDF or TXT files for additional context (optional)
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${colors.primary.main}20`,
                            color: colors.primary.main,
                          }}
                        >
                          3
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: colors.text.secondary }}
                        >
                          Adjust video settings from the left sidebar
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${colors.primary.main}20`,
                            color: colors.primary.main,
                          }}
                        >
                          4
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: colors.text.secondary }}
                        >
                          Click Generate to create your AI-powered video
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: colors.background.hover }}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: colors.primary.main }}
                          />
                          <span
                            className="text-sm truncate"
                            style={{ color: colors.text.primary }}
                          >
                            {file}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="flex-shrink-0 h-8 w-8"
                          style={{ color: colors.status.error }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Video Preview */}
            <Card
              className="border"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.main,
              }}
            >
              <div className="p-6">
                <div
                  className="relative aspect-video rounded-lg overflow-hidden"
                  style={{ backgroundColor: colors.background.canvas }}
                >
                  {isGenerating ? (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                      style={{ background: colors.primary.gradient }}
                    >
                      <div className="relative">
                        <div
                          className="w-20 h-20 border-4 rounded-full"
                          style={{ borderColor: colors.border.dark }}
                        ></div>
                        <div
                          className="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-r-transparent rounded-full animate-spin"
                          style={{
                            borderBottomColor: colors.primary.light,
                            borderLeftColor: colors.primary.light,
                          }}
                        ></div>
                      </div>
                      <p
                        className="font-medium"
                        style={{ color: colors.text.white }}
                      >
                        Generating your video...
                      </p>
                      <div
                        className="w-64 h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: colors.border.dark }}
                      >
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                            background: colors.secondary.gradient,
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div
                        className="p-5 rounded-full"
                        style={{ backgroundColor: colors.background.secondary }}
                      >
                        <Play
                          className="w-10 h-10"
                          style={{ color: colors.primary.main }}
                        />
                      </div>
                      <p
                        className="font-medium"
                        style={{ color: colors.text.tertiary }}
                      >
                        Video Not Found
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: colors.text.disabled }}
                      >
                        Start creating your first video
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent
          className="w-full max-w-4xl"
          style={{
            backgroundColor: colors.background.card,
            borderColor: colors.border.main,
          }}
        >
          <DialogHeader
            onClose={() => setIsSettingsOpen(false)}
            style={{
              borderColor: colors.border.main,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: colors.primary.gradient,
                }}
              >
                <Sliders className="w-5 h-5" style={{ color: colors.text.white }} />
              </div>
              <DialogTitle style={{ color: colors.text.primary }}>
                Advanced Settings
              </DialogTitle>
            </div>
          </DialogHeader>

          <DialogBody style={{ backgroundColor: colors.background.card }}>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b pb-px" style={{ borderColor: colors.border.main }}>
              {[
                { id: 'motion', label: 'Motion Control', icon: '🎬' },
                { id: 'video', label: 'Video Settings', icon: '🎥' },
                { id: 'advanced', label: 'Advanced', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2.5 rounded-t-lg font-medium text-sm transition-all"
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? colors.background.hover
                        : 'transparent',
                    color:
                      activeTab === tab.id
                        ? colors.text.primary
                        : colors.text.tertiary,
                    borderBottom:
                      activeTab === tab.id
                        ? `2px solid ${colors.primary.main}`
                        : 'none',
                  }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Motion Control Tab */}
            {activeTab === 'motion' && (
              <div className="space-y-4">
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  Select a motion control preset for your video
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {motionPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSettingChange('motionControl', preset.id)}
                      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        border: `2px solid ${settings.motionControl === preset.id
                          ? colors.primary.main
                          : colors.border.main
                          }`,
                        backgroundColor: colors.background.hover,
                      }}
                    >
                      {/* Image or Icon */}
                      {preset.image ? (
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={preset.image}
                            alt={preset.label}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {settings.motionControl === preset.id && (
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                            />
                          )}
                        </div>
                      ) : (
                        <div
                          className="h-32 flex items-center justify-center text-5xl"
                          style={{
                            backgroundColor: colors.background.canvas,
                          }}
                        >
                          {preset.icon}
                        </div>
                      )}

                      {/* Label */}
                      <div
                        className="p-3 text-center font-medium text-sm"
                        style={{
                          color:
                            settings.motionControl === preset.id
                              ? colors.primary.main
                              : colors.text.primary,
                        }}
                      >
                        {preset.label}
                      </div>

                      {/* Active Indicator */}
                      {settings.motionControl === preset.id && (
                        <div
                          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            background: colors.primary.gradient,
                          }}
                        >
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video Settings Tab */}
            {activeTab === 'video' && (
              <div className="space-y-6">
                {/* Duration */}
                <div className="space-y-3">
                  <label
                    className="text-sm font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['5s', '8s', '10s'].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => handleSettingChange('duration', duration)}
                        className="h-12 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{
                          background:
                            settings.duration === duration
                              ? colors.primary.gradient
                              : colors.background.hover,
                          color:
                            settings.duration === duration
                              ? colors.text.white
                              : colors.text.primary,
                          border: `2px solid ${settings.duration === duration
                            ? 'transparent'
                            : colors.border.main
                            }`,
                        }}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-3">
                  <label
                    className="text-sm font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { value: '16:9', label: '16:9', icon: '▭' },
                      { value: '4:3', label: '4:3', icon: '▬' },
                      { value: '1:1', label: '1:1', icon: '□' },
                      { value: '3:4', label: '3:4', icon: '▯' },
                      { value: '9:16', label: '9:16', icon: '▮' },
                    ].map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => handleSettingChange('aspectRatio', ratio.value)}
                        className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{
                          background:
                            settings.aspectRatio === ratio.value
                              ? colors.primary.gradient
                              : colors.background.hover,
                          color:
                            settings.aspectRatio === ratio.value
                              ? colors.text.white
                              : colors.text.primary,
                          border: `2px solid ${settings.aspectRatio === ratio.value
                            ? 'transparent'
                            : colors.border.main
                            }`,
                        }}
                      >
                        <span className="text-2xl">{ratio.icon}</span>
                        <span>{ratio.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="space-y-3">
                  <label
                    className="text-sm font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    Resolution
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['360P', '540P', '720P', '1080P'].map((res) => (
                      <button
                        key={res}
                        onClick={() => handleSettingChange('resolution', res)}
                        className="h-12 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{
                          background:
                            settings.resolution === res
                              ? colors.secondary.gradient
                              : colors.background.hover,
                          color:
                            settings.resolution === res
                              ? colors.text.white
                              : colors.text.primary,
                          border: `2px solid ${settings.resolution === res
                            ? 'transparent'
                            : colors.border.main
                            }`,
                        }}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-4">
                {/* Audio Toggle */}
                <div
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: colors.background.hover }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: colors.background.card }}
                    >
                      🔊
                    </div>
                    <div>
                      <label
                        className="text-sm font-semibold block"
                        style={{ color: colors.text.primary }}
                      >
                        Enable Audio
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: colors.text.tertiary }}
                      >
                        Add AI-generated audio to your video
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableAudio}
                    onCheckedChange={(checked) =>
                      handleSettingChange('enableAudio', checked)
                    }
                  />
                </div>

                {/* Multi-Shot Toggle */}
                <div
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: colors.background.hover }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: colors.background.card }}
                    >
                      🎬
                    </div>
                    <div>
                      <label
                        className="text-sm font-semibold block"
                        style={{ color: colors.text.primary }}
                      >
                        Multi-Shot Mode
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: colors.text.tertiary }}
                      >
                        Generate video with multiple camera angles
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.multiShot}
                    onCheckedChange={(checked) =>
                      handleSettingChange('multiShot', checked)
                    }
                  />
                </div>

                {/* Preview Mode Toggle */}
                <div
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: colors.background.hover }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: colors.background.card }}
                    >
                      ⚡
                    </div>
                    <div>
                      <label
                        className="text-sm font-semibold block"
                        style={{ color: colors.text.primary }}
                      >
                        Preview Mode
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: colors.text.tertiary }}
                      >
                        Generate faster preview with lower quality
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.previewMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange('previewMode', checked)
                    }
                  />
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border.main }}>
              <Button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full h-12 font-semibold text-base shadow-lg transition-all hover:scale-[1.02] border-0"
                style={{
                  background: colors.primary.gradient,
                  color: colors.text.white,
                  boxShadow: colors.shadow.lg,
                }}
              >
                Apply Settings
              </Button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
