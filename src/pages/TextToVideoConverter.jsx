import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import { theme as appTheme } from '../theme/theme';
import { Button } from '../components/ui/button';

import {
  Header,
  SettingsSidebar,
  PromptSection,
  FileUploadSection,
  VideoPreview,
  AdvancedSettingsModal,
  AnnouncementBanner,
} from '../components/converter';

export default function TextToVideoConverter() {
  const { theme, toggleTheme } = useTheme();
  const colors = appTheme[theme];
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
    {
      id: 'none',
      label: 'None',
      icon: '🧪',
    },

    {
      id: 'bullet-time',
      label: 'Bullet Time',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_bullet_time_1765511706744.png',
    },

    {
      id: 'crane-down',
      label: 'Crane Down',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_crane_down_1765511724575.png',
    },

    {
      id: 'crane-up',
      label: 'Crane Up',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_crane_up_1765511741511.png',
    },

    {
      id: 'zoom-in',
      label: 'Crash Zoom In',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_zoom_in_1765511762378.png',
    },

    {
      id: 'dolly-in',
      label: 'Dolly In',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_dolly_in_1765511777592.png',
    },

    {
      id: 'pan-left',
      label: 'Pan Left',
      image:
        'C:/Users/Nimesh/.gemini/antigravity/brain/5822d0f2-33c1-46ce-b580-8b47073aea7f/motion_pan_left_1765511795074.png',
    },
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
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            return 100;
          }

          return prev + 10;
        });
      },

      500
    );
  };

  const handleOpenAdvancedSettings = (tab) => {
    setActiveTab(tab);
    setIsSettingsOpen(true);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 flex flex-col"
      style={{
        background: colors.background.page,
      }}
    >
      {' '}
      <AnnouncementBanner colors={colors} />{' '}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        colors={colors}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />{' '}
      <div className="flex flex-1 overflow-hidden">
        {' '}
        {/* Fixed Sidebar - Independent Scrolling */}
        <aside
          className="hidden lg:block w-[280px] overflow-y-auto border-r"
          style={{
            borderColor: colors.border.main,
            height: 'calc(100vh - 120px)', // Adjust based on header + banner height
          }}
        >
          {' '}
          <div className="">
            {' '}
            <SettingsSidebar
              settings={settings}
              onSettingChange={handleSettingChange}
              colors={colors}
              onOpenAdvancedSettings={handleOpenAdvancedSettings}
            />{' '}
          </div>{' '}
        </aside>{' '}
        {/* Main Content - Independent Scrolling */}
        <main
          className="flex-1 overflow-y-auto"
          style={{
            height: 'calc(100vh - 120px)',
          }}
        >
          {' '}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
            {' '}
            {/* Desktop Layout */}
            <div className="hidden lg:block space-y-4">
              {' '}
              <PromptSection
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                uploadedFilesCount={uploadedFiles.length}
                colors={colors}
              />{' '}
              <FileUploadSection
                uploadedFiles={uploadedFiles}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={() => setIsDragging(false)}
                onFileUpload={handleFileUpload}
                onRemoveFile={removeFile}
                colors={colors}
                theme={theme}
              />{' '}
              <VideoPreview
                isGenerating={isGenerating}
                progress={progress}
                colors={colors}
              />{' '}
            </div>{' '}
            {/* Mobile Layout - Reordered */}
            <div className="lg:hidden space-y-4">
              {' '}
              {/* 1. Video Preview First */}
              <VideoPreview
                isGenerating={isGenerating}
                progress={progress}
                colors={colors}
              />{' '}
              {/* 2. Settings Button */}
              <Button
                onClick={() => setIsSettingsOpen(true)}
                variant="ghost"
                className="w-full py-6 text-base font-semibold"
                style={{
                  color: colors.text.primary,
                  borderColor: colors.border.main,
                }}
              >
                <Settings className="w-5 h-5 mr-2" />
                Advanced Settings
              </Button>{' '}
              {/* 3. Prompt Section */}
              <PromptSection
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                uploadedFilesCount={uploadedFiles.length}
                colors={colors}
                isMobile={true}
              />{' '}
              {/* 4. File Upload Section */}
              <FileUploadSection
                uploadedFiles={uploadedFiles}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={() => setIsDragging(false)}
                onFileUpload={handleFileUpload}
                onRemoveFile={removeFile}
                colors={colors}
                theme={theme}
                isMobile={true}
              />{' '}
            </div>{' '}
          </div>{' '}
        </main>{' '}
      </div>{' '}
      <AdvancedSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        settings={settings}
        onSettingChange={handleSettingChange}
        motionPresets={motionPresets}
        colors={colors}
      />{' '}
    </div>
  );
}
