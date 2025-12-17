import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import { theme as appTheme } from '../theme/theme';
import { Button } from '../components/ui/button';

import {
  Header,
  Sidebar,
  Settings,
  PromptSection,
  FileUploadSection,
  AdvancedSettingsModal,
  AnnouncementBanner,
  PromptQueue,
  BatchControls,
  GeneratedVideosGallery,
  HistoryPanel,
  VideoPreview,
} from '../components/converter';

export default function TextToVideoConverter() {
  const { theme, toggleTheme } = useTheme();
  const colors = appTheme[theme];
  const [prompt, setPrompt] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileContents, setFileContents] = useState({}); // Store file contents for preview
  const [previewFile, setPreviewFile] = useState(null); // Currently previewed file
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('motion');
  const [sidebarTab, setSidebarTab] = useState('prompts');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Batch processing state
  const [promptQueue, setPromptQueue] = useState([]);
  const [batchSettings, setBatchSettings] = useState({
    autoDownload: false,
    createCSV: false,
    delay: '1min',
  });
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentProgress, setCurrentProgress] = useState({
    completed: 0,
    currentPrompt: null,
    estimatedTime: null,
  });
  const [generationHistory, setGenerationHistory] = useState([]);

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

    // Process each dropped file
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;

        // Check file type and parse accordingly
        if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
          parseAndLoadPrompts(content);
          setUploadedFiles((prev) => [...prev, file.name]);
          setFileContents((prev) => ({ ...prev, [file.name]: content }));

          // Scroll to queue after loading
          setTimeout(() => {
            const queueElement = document.getElementById('prompt-queue');
            if (queueElement) {
              queueElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            }
          }, 400);
        } else if (file.name.endsWith('.json')) {
          try {
            const jsonData = JSON.parse(content);
            if (Array.isArray(jsonData)) {
              const prompts = jsonData
                .map((item) =>
                  typeof item === 'string' ? item : item.prompt || ''
                )
                .filter((p) => p.trim());
              createPromptQueue(prompts);
              setUploadedFiles((prev) => [...prev, file.name]);
              setFileContents((prev) => ({ ...prev, [file.name]: content }));

              // Scroll to queue after loading
              setTimeout(() => {
                const queueElement = document.getElementById('prompt-queue');
                if (queueElement) {
                  queueElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  });
                }
              }, 400);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          // For PDF or other files, just add to uploaded files list
          setUploadedFiles((prev) => [...prev, file.name]);
          setFileContents((prev) => ({ ...prev, [file.name]: content }));
        }
      };

      reader.readAsText(file);
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;

        // Check file type and parse accordingly
        if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
          parseAndLoadPrompts(content);
          setUploadedFiles((prev) => [...prev, file.name]);
          setFileContents((prev) => ({ ...prev, [file.name]: content }));

          // Scroll to queue after loading
          setTimeout(() => {
            const queueElement = document.getElementById('prompt-queue');
            if (queueElement) {
              queueElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            }
          }, 400);
        } else if (file.name.endsWith('.json')) {
          try {
            const jsonData = JSON.parse(content);
            if (Array.isArray(jsonData)) {
              const prompts = jsonData
                .map((item) =>
                  typeof item === 'string' ? item : item.prompt || ''
                )
                .filter((p) => p.trim());
              createPromptQueue(prompts);
              setUploadedFiles((prev) => [...prev, file.name]);
              setFileContents((prev) => ({ ...prev, [file.name]: content }));

              // Scroll to queue after loading
              setTimeout(() => {
                const queueElement = document.getElementById('prompt-queue');
                if (queueElement) {
                  queueElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  });
                }
              }, 400);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          // For PDF or other files, just add to uploaded files list
          setUploadedFiles((prev) => [...prev, file.name]);
          setFileContents((prev) => ({ ...prev, [file.name]: content }));
        }
      };

      reader.readAsText(file);
    });
  };

  const parseAndLoadPrompts = (text) => {
    const prompts = text
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    createPromptQueue(prompts);
  };

  const createPromptQueue = (prompts) => {
    const queue = prompts.map((promptText, index) => ({
      id: Date.now() + index,
      text: promptText,
      settings: {
        duration: settings.duration,
        fps: 30,
        resolution: settings.resolution,
        aspectRatio: settings.aspectRatio,
        motionIntensity: 'Medium',
        cameraMovement: 'static',
        style: settings.style,
      },
    }));

    setPromptQueue([...promptQueue, ...queue]);
    setPrompt(''); // Clear the input after loading
  };

  const handleLoadPromptsFromText = () => {
    if (!prompt.trim()) return;
    parseAndLoadPrompts(prompt);

    // Scroll to prompt queue section
    setTimeout(() => {
      const queueElement = document.getElementById('prompt-queue');
      if (queueElement) {
        queueElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const updatePromptInQueue = (id, settingKey, value) => {
    setPromptQueue(
      promptQueue.map((item) =>
        item.id === id
          ? { ...item, settings: { ...item.settings, [settingKey]: value } }
          : item
      )
    );
  };

  const removePromptFromQueue = (id) => {
    setPromptQueue(promptQueue.filter((item) => item.id !== id));
  };

  const handleBatchSettingChange = (key, value) => {
    setBatchSettings({ ...batchSettings, [key]: value });
  };

  const handleStartBatch = async () => {
    if (promptQueue.length === 0) return;

    setIsBatchProcessing(true);
    setIsPaused(false);

    // Add all videos as processing to gallery immediately
    const processingVideos = promptQueue.map((item, index) => ({
      id: Date.now() + index,
      prompt: item.text,
      date: new Date().toISOString(),
      status: 'processing',
      duration: item.settings.duration,
      resolution: item.settings.resolution,
      fps: item.settings.fps.toString(),
      fileSize: 'Generating...',
      queueIndex: index,
    }));

    setGenerationHistory((prev) => [...processingVideos, ...prev]);

    // Scroll to gallery section when batch generation starts
    setTimeout(() => {
      const galleryElement = document.getElementById('videos-gallery');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);

    const delayMs = {
      '30s': 30000,
      '1min': 60000,
      '2min': 120000,
      '5min': 300000,
    }[batchSettings.delay];

    for (let i = 0; i < promptQueue.length; i++) {
      if (isPaused) {
        // Wait until unpaused
        await new Promise((resolve) => {
          const checkPause = setInterval(() => {
            if (!isPaused) {
              clearInterval(checkPause);
              resolve();
            }
          }, 500);
        });
      }

      const currentItem = promptQueue[i];
      const currentVideoId = processingVideos[i].id;

      setCurrentProgress({
        completed: i,
        currentPrompt: currentItem.text,
        estimatedTime: `${Math.ceil(
          (promptQueue.length - i) * (delayMs / 60000)
        )} minutes`,
      });

      // Simulate video generation (replace with actual API call)
      await generateVideo(currentItem);

      // Update video status to completed
      setGenerationHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.id === currentVideoId
            ? { ...item, status: 'completed', fileSize: '12.5 MB' }
            : item
        )
      );

      setCurrentProgress((prev) => ({ ...prev, completed: i + 1 }));

      // Delay before next prompt (except for the last one)
      if (i < promptQueue.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    setIsBatchProcessing(false);
    setCurrentProgress({
      completed: promptQueue.length,
      currentPrompt: null,
      estimatedTime: null,
    });

    if (batchSettings.createCSV) {
      exportToCSV();
    }
  };

  const generateVideo = async (promptItem) => {
    // Simulate video generation with progress
    setIsGenerating(true);
    setProgress(0);

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            resolve();
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    });
  };

  const handlePauseBatch = () => {
    setIsPaused(!isPaused);
  };

  const handleStopBatch = () => {
    setIsBatchProcessing(false);
    setIsPaused(false);
    setCurrentProgress({
      completed: 0,
      currentPrompt: null,
      estimatedTime: null,
    });
  };

  const addToHistory = (promptItem, status) => {
    const historyItem = {
      id: Date.now(),
      prompt: promptItem.text,
      date: new Date().toISOString(),
      status: status,
      duration: promptItem.settings.duration,
      resolution: promptItem.settings.resolution,
      fps: promptItem.settings.fps,
      fileSize: '12.5 MB', // Simulated
    };

    setGenerationHistory((prev) => [historyItem, ...prev]);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Prompt', 'Duration', 'Resolution', 'FPS', 'Status', 'Date'].join(','),
      ...generationHistory.map((item) =>
        [
          item.prompt,
          item.duration,
          item.resolution,
          item.fps,
          item.status,
          new Date(item.date).toLocaleString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-generation-${Date.now()}.csv`;
    a.click();
  };

  const handleCopyPrompt = (promptText) => {
    navigator.clipboard.writeText(promptText);
    // You can add a toast notification here
  };

  const handleDownloadVideo = (historyItem) => {
    // Implement download logic
    console.log('Download video:', historyItem);
  };

  const handleDeleteHistory = (id) => {
    setGenerationHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePreviewVideo = (historyItem) => {
    // Implement preview logic
    console.log('Preview video:', historyItem);
  };

  const removeFile = (index) => {
    const fileName = uploadedFiles[index];
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setFileContents((prev) => {
      const newContents = { ...prev };
      delete newContents[fileName];
      return newContents;
    });
  };

  const handleFileClick = (fileName) => {
    setPreviewFile(fileName);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const videoId = Date.now();

    // Add processing video to gallery immediately
    const processingItem = {
      id: videoId,
      prompt: prompt,
      date: new Date().toISOString(),
      status: 'processing',
      duration: settings.duration,
      resolution: settings.resolution,
      fps: '30',
      fileSize: 'Generating...',
    };

    setGenerationHistory((prev) => [processingItem, ...prev]);
    setIsGenerating(true);
    setProgress(0);

    // Scroll to gallery section when generation starts
    setTimeout(() => {
      const galleryElement = document.getElementById('videos-gallery');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);

    const currentPrompt = prompt;
    setPrompt(''); // Clear prompt immediately

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);

          // Update video status to completed
          setGenerationHistory((prevHistory) =>
            prevHistory.map((item) =>
              item.id === videoId
                ? { ...item, status: 'completed', fileSize: '12.5 MB' }
                : item
            )
          );

          return 100;
        }

        return prev + 10;
      });
    }, 500);
  };

  const handleOpenAdvancedSettings = (tab) => {
    setActiveTab(tab);
    setIsSettingsOpen(true);
  };

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{
        background: colors.background.page,
      }}
    >
      {/* Left Sidebar - Fixed Height */}
      <Sidebar
        colors={colors}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        sidebarTab={sidebarTab}
        setSidebarTab={setSidebarTab}
        generationHistoryCount={generationHistory.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          colors={colors}
          onOpenSettings={() => setIsSettingsOpen(true)}
          showLogo={isSidebarCollapsed}
        />

        <div className="flex-1 grid grid-cols-10 gap-0 overflow-hidden">
          {/* Middle Content - 6 cols */}
          <div
            className="col-span-6 overflow-hidden relative border-r"
            style={{
              backgroundColor: colors.background.main,
              borderColor: colors.border.main,
            }}
          >
            {sidebarTab === 'prompts' && (
              <div className="flex flex-col h-full overflow-hidden">
                <div
                  className="p-6 border-b"
                  style={{
                    borderColor: colors.border.main,
                    backgroundColor: colors.background.card,
                  }}
                >
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Prompt Manager
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    Upload or paste multiple prompts for batch generation
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="space-y-4">
                    <PromptSection
                      prompt={prompt}
                      onPromptChange={setPrompt}
                      onGenerate={handleGenerate}
                      onLoadPrompts={handleLoadPromptsFromText}
                      isGenerating={isGenerating}
                      uploadedFilesCount={uploadedFiles.length}
                      colors={colors}
                    />

                    <FileUploadSection
                      uploadedFiles={uploadedFiles}
                      isDragging={isDragging}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onDragLeave={() => setIsDragging(false)}
                      onFileUpload={handleFileUpload}
                      onRemoveFile={removeFile}
                      onFileClick={handleFileClick}
                      onLoadPrompts={handleLoadPromptsFromText}
                      colors={colors}
                      theme={theme}
                    />

                    <BatchControls
                      promptQueue={promptQueue}
                      batchSettings={batchSettings}
                      onBatchSettingChange={handleBatchSettingChange}
                      onStartBatch={handleStartBatch}
                      onPauseBatch={handlePauseBatch}
                      onStopBatch={handleStopBatch}
                      isProcessing={isBatchProcessing}
                      isPaused={isPaused}
                      currentProgress={currentProgress}
                      colors={colors}
                    />

                    {promptQueue.length > 0 && (
                      <PromptQueue
                        promptQueue={promptQueue}
                        onUpdatePrompt={updatePromptInQueue}
                        onRemovePrompt={removePromptFromQueue}
                        colors={colors}
                        theme={theme}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {sidebarTab === 'history' && (
              <div className="h-full p-6 overflow-y-auto">
                <HistoryPanel
                  history={generationHistory}
                  onCopyPrompt={handleCopyPrompt}
                  onDownload={handleDownloadVideo}
                  onDelete={handleDeleteHistory}
                  onPreview={(video) => {
                    setSelectedVideo(video);
                  }}
                  colors={colors}
                />
              </div>
            )}

            {sidebarTab === 'settings' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                  <SettingsSidebar
                    settings={settings}
                    onSettingChange={handleSettingChange}
                    colors={colors}
                    onOpenAdvancedSettings={handleOpenAdvancedSettings}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Generated Images - 4 cols */}
          <div
            className="col-span-4 flex flex-col h-full overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div
              className="p-6 border-b flex justify-between items-end"
              style={{
                borderColor: colors.border.main,
                backgroundColor: colors.background.card,
              }}
            >
              <div>
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: colors.text.primary }}
                >
                  Generated Images
                </h2>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  AI-generated results appear here
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-xs font-medium"
                  style={{ color: colors.text.tertiary }}
                >
                  {new Date().toLocaleDateString()}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: colors.text.primary }}
                >
                  {generationHistory.length} images
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <GeneratedVideosGallery
                videos={generationHistory}
                onCopyPrompt={handleCopyPrompt}
                onDownload={handleDownloadVideo}
                onDelete={handleDeleteHistory}
                colors={colors}
                isGenerating={isGenerating}
                currentGenerating={currentProgress.currentPrompt}
              />
            </div>
          </div>
        </div>
      </div>

      <AdvancedSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        settings={settings}
        onSettingChange={handleSettingChange}
        motionPresets={motionPresets}
        colors={colors}
      />

      {/* File Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-3xl max-h-[80vh] rounded-xl border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: colors.background.card,
              borderColor: colors.border.main,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: colors.border.main }}
            >
              <h3
                className="font-semibold text-lg"
                style={{ color: colors.text.primary }}
              >
                {previewFile}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={closePreview}
                style={{ color: colors.text.secondary }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: 'calc(80vh - 80px)' }}
            >
              <pre
                className="text-sm font-mono whitespace-pre-wrap break-words"
                style={{ color: colors.text.primary }}
              >
                {fileContents[previewFile] || 'File content not available'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
