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
  });

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
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="space-y-4">
            {/* Top Tabs */}
            <div className="flex gap-2">
              <Button
                variant="default"
                className="border-0"
                style={{
                  background: colors.primary.gradient,
                  color: colors.text.white,
                }}
              >
                Video
              </Button>
              <Button
                variant="outline"
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.main,
                  color: colors.text.secondary,
                }}
              >
                Image
              </Button>
            </div>

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

            {/* Prompt Input */}
            <Card
              className="border"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.main,
              }}
            >
              <div className="p-6 space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the content you want to create"
                  className="min-h-[100px] resize-none text-sm"
                  style={{
                    backgroundColor: colors.background.input,
                    borderColor: colors.border.main,
                    color: colors.text.primary,
                  }}
                />

                {/* File Upload */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer"
                  style={{
                    borderColor: isDragging
                      ? colors.primary.main
                      : colors.border.main,
                    backgroundColor: isDragging
                      ? `${colors.primary.main}10`
                      : colors.background.hover,
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    className="w-10 h-10 mx-auto mb-3"
                    style={{ color: colors.icon.tertiary }}
                  />
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: colors.text.primary }}
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

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt && uploadedFiles.length === 0}
                  className="w-full h-12 font-semibold text-base shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0"
                  style={{
                    background: colors.primary.gradient,
                    color: colors.text.white,
                    boxShadow: colors.shadow.lg,
                  }}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                  <Badge
                    variant="secondary"
                    className="ml-2 border-0"
                    style={{
                      backgroundColor: `${colors.text.white}20`,
                      color: colors.text.white,
                    }}
                  >
                    {settings.creativity || 70} ⚡
                  </Badge>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
