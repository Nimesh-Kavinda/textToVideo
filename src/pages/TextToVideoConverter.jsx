import React, { useState } from 'react';
import { X, Coins } from 'lucide-react';
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
  PromptLibrary,
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
  const [promptTab, setPromptTab] = useState('text');

  // Initialize with a responsive width
  const [rightPanelWidth, setRightPanelWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      // Larger default for 15.6" screens (usually 1920px)
      return window.innerWidth >= 1500 ? 600 : 450;
    }
    return 450;
  });

  const [isResizing, setIsResizing] = useState(false);

  // Handle resizing
  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const sidebarWidth = isSidebarCollapsed ? 80 : 256;
      const minMiddleWidth = 350; // Ensure middle panel doesn't get too small
      const maxRightWidth = window.innerWidth - sidebarWidth - minMiddleWidth;
      const newWidth = window.innerWidth - e.clientX;

      if (newWidth > 300 && newWidth < maxRightWidth) {
        setRightPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isSidebarCollapsed]);

  // Handle window resize to maintain responsive layout
  React.useEffect(() => {
    const handleWindowResize = () => {
      const sidebarWidth = isSidebarCollapsed ? 80 : 256;
      const minMiddleWidth = 350;
      const maxRightWidth = window.innerWidth - sidebarWidth - minMiddleWidth;

      setRightPanelWidth((prev) => {
        // If current width is larger than allowed max, shrink it
        // But keep it at least 300px if possible
        if (prev > maxRightWidth) {
          return Math.max(300, maxRightWidth);
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [isSidebarCollapsed]);

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

    const newQueue = [...promptQueue, ...queue];
    setPromptQueue(newQueue);
    setPrompt(''); // Clear the input after loading

    // Auto-select delay based on total prompts
    let recommendedDelay = '5s';
    if (newQueue.length > 20) recommendedDelay = '30s';
    else if (newQueue.length > 10) recommendedDelay = '20s';
    else if (newQueue.length > 5) recommendedDelay = '10s';

    setBatchSettings((prev) => ({ ...prev, delay: recommendedDelay }));
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

  const removePromptsFromQueue = (ids) => {
    setPromptQueue(promptQueue.filter((item) => !ids.includes(item.id)));
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

    const getDelayMs = () => {
      if (batchSettings.delay === 'random') {
        // Random between 30s (30000ms) and 2min (120000ms)
        return Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000;
      }
      return (
        {
          '5s': 5000,
          '10s': 10000,
          '20s': 20000,
          '30s': 30000,
          '1min': 60000,
        }[batchSettings.delay] || 10000
      );
    };

    // Use average delay for estimation if random
    const estimatedDelayMs =
      batchSettings.delay === 'random'
        ? 75000 // Average of 30s and 120s
        : getDelayMs();

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
          (promptQueue.length - i) * (estimatedDelayMs / 60000)
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
        const currentDelay = getDelayMs();
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
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

  const handleDeleteHistoryItems = (ids) => {
    setGenerationHistory((prev) =>
      prev.filter((item) => !ids.includes(item.id))
    );
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

  const handleUsePrompt = (promptText) => {
    setPrompt(promptText);
    setPromptTab('text');
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
        className="hidden md:flex"
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

        <div className="flex-1 flex overflow-hidden">
          {/* Middle Content */}
          <div
            className="flex-1 overflow-hidden relative border-r min-w-0"
            style={{
              backgroundColor: colors.background.main,
              borderColor: colors.border.main,
            }}
          >
            {sidebarTab === 'prompts' && (
              <div className="flex flex-col h-full overflow-y-auto md:overflow-hidden">
                {/* Mobile Settings */}
                <div className="block md:hidden p-6 pb-0">
                  {/* Mobile Credits Section */}
                  <div
                    className="mb-6 flex items-center justify-between p-3 rounded-xl border relative overflow-hidden group"
                    style={{
                      backgroundColor: colors.background.hover,
                      borderColor: colors.border.main,
                    }}
                  >
                    {/* Animated gradient background effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        animation: 'waveGradient 3s ease infinite',
                      }}
                    />
                    {/* Animated border effect */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.5), rgba(79, 70, 229, 0.3), rgba(99, 102, 241, 0.3))',
                        backgroundSize: '200% 100%',
                        animation: 'waveGradient 3s ease infinite',
                        padding: '2px',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: colors.primary.gradient,
                        }}
                      >
                        <Coins
                          className="w-5 h-5"
                          style={{ color: colors.text.white }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: colors.text.primary }}
                        >
                          150 Credits
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: colors.text.secondary }}
                        >
                          Available balance
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full px-4 h-8 font-medium text-xs border-0 relative z-10"
                      style={{
                        background: colors.primary.gradient,
                        color: colors.text.white,
                      }}
                    >
                      Upgrade
                    </Button>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="text-lg font-bold"
                      style={{ color: colors.text.primary }}
                    >
                      Settings
                    </h2>
                  </div>
                  <Settings
                    settings={settings}
                    onSettingChange={handleSettingChange}
                    colors={colors}
                    onOpenAdvancedSettings={handleOpenAdvancedSettings}
                  />
                </div>

                <div
                  className="p-6 border-b"
                  style={{
                    borderColor: colors.border.main,
                    backgroundColor: colors.background.card,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
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
                        Create or upload prompts for generation
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div
                    className="flex p-1 rounded-lg w-fit"
                    style={{ backgroundColor: colors.background.hover }}
                  >
                    <button
                      onClick={() => setPromptTab('text')}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all`}
                      style={{
                        backgroundColor:
                          promptTab === 'text'
                            ? colors.primary.main
                            : 'transparent',
                        color:
                          promptTab === 'text'
                            ? colors.text.white
                            : colors.text.secondary,
                        boxShadow:
                          promptTab === 'text'
                            ? '0 1px 2px rgba(0,0,0,0.1)'
                            : 'none',
                      }}
                    >
                      Text Input
                    </button>
                    <button
                      onClick={() => setPromptTab('upload')}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all`}
                      style={{
                        backgroundColor:
                          promptTab === 'upload'
                            ? colors.primary.main
                            : 'transparent',
                        color:
                          promptTab === 'upload'
                            ? colors.text.white
                            : colors.text.secondary,
                        boxShadow:
                          promptTab === 'upload'
                            ? '0 1px 2px rgba(0,0,0,0.1)'
                            : 'none',
                      }}
                    >
                      File Upload
                    </button>
                    <button
                      onClick={() => setPromptTab('library')}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all`}
                      style={{
                        backgroundColor:
                          promptTab === 'library'
                            ? colors.primary.main
                            : 'transparent',
                        color:
                          promptTab === 'library'
                            ? colors.text.white
                            : colors.text.secondary,
                        boxShadow:
                          promptTab === 'library'
                            ? '0 1px 2px rgba(0,0,0,0.1)'
                            : 'none',
                      }}
                    >
                      Prompt Library
                    </button>
                  </div>
                </div>

                <div className="flex-1 md:overflow-y-auto p-6 space-y-6">
                  <div className="space-y-4">
                    {promptTab === 'text' && (
                      <PromptSection
                        prompt={prompt}
                        onPromptChange={setPrompt}
                        onGenerate={handleGenerate}
                        onLoadPrompts={handleLoadPromptsFromText}
                        isGenerating={isGenerating}
                        uploadedFilesCount={uploadedFiles.length}
                        colors={colors}
                      />
                    )}

                    {promptTab === 'upload' && (
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
                    )}

                    {promptTab === 'library' && (
                      <PromptLibrary
                        onUsePrompt={handleUsePrompt}
                        colors={colors}
                      />
                    )}

                    <div id="prompt-queue" className="space-y-4">
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
                          onRemovePrompts={removePromptsFromQueue}
                          colors={colors}
                          theme={theme}
                        />
                      )}
                    </div>

                    {/* Mobile Generated Images */}
                    <div
                      className="block md:hidden mt-8 pt-8 border-t"
                      style={{ borderColor: colors.border.main }}
                    >
                      <div className="mb-4">
                        <h2
                          className="text-lg font-bold"
                          style={{ color: colors.text.primary }}
                        >
                          Generated Images
                        </h2>
                      </div>
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
            )}

            {sidebarTab === 'history' && (
              <div className="h-full p-6 overflow-y-auto">
                <HistoryPanel
                  history={generationHistory}
                  onCopyPrompt={handleCopyPrompt}
                  onDownload={handleDownloadVideo}
                  onDelete={handleDeleteHistory}
                  onDeleteItems={handleDeleteHistoryItems}
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
                  <Settings
                    settings={settings}
                    onSettingChange={handleSettingChange}
                    colors={colors}
                    onOpenAdvancedSettings={handleOpenAdvancedSettings}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Resizer Handle */}
          <div
            className="hidden md:block w-1 cursor-col-resize hover:bg-blue-500 transition-colors flex-shrink-0 z-10"
            style={{ backgroundColor: colors.border.main }}
            onMouseDown={startResizing}
          />

          {/* Right Sidebar - Generated Images */}
          <div
            className="hidden md:flex flex-col h-full overflow-hidden flex-shrink-0"
            style={{
              width: rightPanelWidth,
              backgroundColor: colors.background.card,
            }}
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
                  Generated Videos
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
