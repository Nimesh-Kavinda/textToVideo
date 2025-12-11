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
import { themeColors } from '../lib/theme';

export default function TextToVideoConverter() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
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
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
      }`}
    >
      {/* Header */}
      <header
        className={`border-b ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className={`${
                  theme === 'dark'
                    ? 'hover:bg-slate-800 text-slate-400'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: themeColors[theme].primary }}
                />
                <span
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  AI Video Generator
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${
                theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
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
              className={`border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-4 space-y-4">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium flex items-center justify-between ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                    }`}
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
                      className={`h-9 text-sm ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                          : 'bg-white border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      className={
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                      }
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
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                    }`}
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
                        className={`h-8 text-sm font-medium ${
                          settings.duration === duration
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0'
                            : theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600 text-slate-300'
                            : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700'
                        }`}
                      >
                        {duration}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ratio */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                    }`}
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
                        className={`h-14 flex flex-col items-center justify-center gap-1 rounded-md border text-xs font-medium transition-all ${
                          settings.aspectRatio === ratio.value
                            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 border-transparent text-white shadow-sm'
                            : theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600 text-slate-300'
                            : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700'
                        }`}
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
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    Resolution
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['360P', '540P', '720P', '1080P'].map((res) => (
                      <button
                        key={res}
                        onClick={() => handleSettingChange('resolution', res)}
                        className={`h-8 rounded-md text-xs font-medium transition-all ${
                          settings.resolution === res
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                            : theme === 'dark'
                            ? 'bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300'
                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3 pt-2">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                        }`}
                      >
                        <span className="text-sm">🔊</span>
                      </div>
                      <label
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                        }`}
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
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                        }`}
                      >
                        <span className="text-sm">🎬</span>
                      </div>
                      <label
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                        }`}
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
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                        }`}
                      >
                        <span className="text-sm">⚡</span>
                      </div>
                      <label
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                        }`}
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
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
              >
                Video
              </Button>
              <Button
                variant="outline"
                className={
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-400'
                    : 'bg-white border-slate-300 text-slate-600'
                }
              >
                Image
              </Button>
            </div>

            {/* Video Preview */}
            <Card
              className={`border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-6">
                <div
                  className={`relative aspect-video rounded-lg overflow-hidden ${
                    theme === 'dark' ? 'bg-black' : 'bg-slate-900'
                  }`}
                >
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-slate-700 rounded-full"></div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-t-violet-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-white font-medium">
                        Generating your video...
                      </p>
                      <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="p-5 rounded-full bg-slate-800">
                        <Play className="w-10 h-10 text-violet-500" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Video Not Found
                      </p>
                      <p className="text-slate-500 text-sm">
                        Start creating your first video
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Prompt Input */}
            <Card
              className={`border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-6 space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the content you want to create"
                  className={`min-h-[100px] resize-none text-sm ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-violet-400'
                  }`}
                />

                {/* File Upload */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-violet-500 bg-violet-500/10'
                      : theme === 'dark'
                      ? 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    className={`w-10 h-10 mx-auto mb-3 ${
                      theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  />
                  <p
                    className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Drop files here or click to upload
                  </p>
                  <p
                    className={`text-xs ${
                      theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                    }`}
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
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-4 h-4 flex-shrink-0 text-violet-500" />
                          <span
                            className={`text-sm truncate ${
                              theme === 'dark'
                                ? 'text-slate-300'
                                : 'text-slate-700'
                            }`}
                          >
                            {file}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="flex-shrink-0 h-8 w-8 text-red-500 hover:bg-red-500/10"
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
                  className="w-full h-12 font-semibold text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-white border-0"
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
