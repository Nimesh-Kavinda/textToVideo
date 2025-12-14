import React, { useState } from 'react';
import { X, ChevronDown, Settings2, Trash2, GripVertical } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { motion, AnimatePresence } from 'framer-motion';

export const PromptQueue = ({
  promptQueue,
  onUpdatePrompt,
  onRemovePrompt,
  colors,
  theme,
}) => {
  const [expandedPrompts, setExpandedPrompts] = useState({});

  const toggleExpanded = (id) => {
    setExpandedPrompts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updatePromptSettings = (id, settingKey, value) => {
    onUpdatePrompt(id, settingKey, value);
  };

  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: colors.primary.gradient,
              }}
            >
              <span className="text-lg">📋</span>
            </div>
            <div>
              <h3
                className="font-semibold text-base"
                style={{ color: colors.text.primary }}
              >
                Prompt Queue
              </h3>
              <p className="text-xs" style={{ color: colors.text.tertiary }}>
                {promptQueue.length} prompts ready to generate
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-xs font-medium"
            style={{
              backgroundColor: `${colors.primary.main}15`,
              color: colors.primary.main,
              borderColor: colors.primary.main,
            }}
          >
            Batch Mode
          </Badge>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {promptQueue.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="rounded-lg border p-4 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.background.hover,
                    borderColor: expandedPrompts[item.id]
                      ? colors.primary.main
                      : colors.border.main,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        background: colors.primary.gradient,
                        color: colors.text.white,
                      }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium mb-2 line-clamp-2"
                        style={{ color: colors.text.primary }}
                      >
                        {item.text}
                      </p>

                      {/* Settings Preview */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.settings.duration}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.settings.resolution}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.settings.aspectRatio}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.settings.fps} FPS
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpanded(item.id)}
                        className="h-8 w-8"
                        style={{ color: colors.text.secondary }}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedPrompts[item.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemovePrompt(item.id)}
                        className="h-8 w-8"
                        style={{ color: colors.status.error }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Settings */}
                  <AnimatePresence>
                    {expandedPrompts[item.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-4 pt-4 space-y-4 border-t"
                          style={{ borderColor: colors.border.main }}
                        >
                          {/* Duration */}
                          <div className="space-y-2">
                            <label
                              className="text-xs font-medium"
                              style={{ color: colors.text.secondary }}
                            >
                              Duration
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {['5s', '10s', '30s'].map((duration) => (
                                <Button
                                  key={duration}
                                  size="sm"
                                  onClick={() =>
                                    updatePromptSettings(
                                      item.id,
                                      'duration',
                                      duration
                                    )
                                  }
                                  className="h-8 text-xs"
                                  style={{
                                    background:
                                      item.settings.duration === duration
                                        ? colors.primary.gradient
                                        : colors.background.card,
                                    color:
                                      item.settings.duration === duration
                                        ? colors.text.white
                                        : colors.text.primary,
                                  }}
                                >
                                  {duration}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* FPS */}
                          <div className="space-y-2">
                            <label
                              className="text-xs font-medium"
                              style={{ color: colors.text.secondary }}
                            >
                              Frame Rate
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[24, 30, 60].map((fps) => (
                                <Button
                                  key={fps}
                                  size="sm"
                                  onClick={() =>
                                    updatePromptSettings(item.id, 'fps', fps)
                                  }
                                  className="h-8 text-xs"
                                  style={{
                                    background:
                                      item.settings.fps === fps
                                        ? colors.primary.gradient
                                        : colors.background.card,
                                    color:
                                      item.settings.fps === fps
                                        ? colors.text.white
                                        : colors.text.primary,
                                  }}
                                >
                                  {fps} FPS
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Resolution */}
                          <div className="space-y-2">
                            <label
                              className="text-xs font-medium"
                              style={{ color: colors.text.secondary }}
                            >
                              Resolution
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {['720p', '1080p', '2K', '4K'].map((res) => (
                                <Button
                                  key={res}
                                  size="sm"
                                  onClick={() =>
                                    updatePromptSettings(
                                      item.id,
                                      'resolution',
                                      res
                                    )
                                  }
                                  className="h-8 text-xs"
                                  style={{
                                    background:
                                      item.settings.resolution === res
                                        ? colors.secondary.gradient
                                        : colors.background.card,
                                    color:
                                      item.settings.resolution === res
                                        ? colors.text.white
                                        : colors.text.primary,
                                  }}
                                >
                                  {res}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Motion Intensity */}
                          <div className="space-y-2">
                            <label
                              className="text-xs font-medium"
                              style={{ color: colors.text.secondary }}
                            >
                              Motion Intensity
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Low', 'Medium', 'High'].map((intensity) => (
                                <Button
                                  key={intensity}
                                  size="sm"
                                  onClick={() =>
                                    updatePromptSettings(
                                      item.id,
                                      'motionIntensity',
                                      intensity
                                    )
                                  }
                                  className="h-8 text-xs"
                                  style={{
                                    background:
                                      item.settings.motionIntensity ===
                                      intensity
                                        ? colors.primary.gradient
                                        : colors.background.card,
                                    color:
                                      item.settings.motionIntensity ===
                                      intensity
                                        ? colors.text.white
                                        : colors.text.primary,
                                  }}
                                >
                                  {intensity}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Camera Movement */}
                          <div className="space-y-2">
                            <label
                              className="text-xs font-medium"
                              style={{ color: colors.text.secondary }}
                            >
                              Camera Movement
                            </label>
                            <Select
                              value={item.settings.cameraMovement}
                              onValueChange={(value) =>
                                updatePromptSettings(
                                  item.id,
                                  'cameraMovement',
                                  value
                                )
                              }
                            >
                              <SelectTrigger
                                className="h-9 text-xs"
                                style={{
                                  backgroundColor: colors.background.card,
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
                                <SelectItem value="static">Static</SelectItem>
                                <SelectItem value="pan">Pan</SelectItem>
                                <SelectItem value="zoom">Zoom</SelectItem>
                                <SelectItem value="tracking">
                                  Tracking
                                </SelectItem>
                                <SelectItem value="orbit">Orbit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {promptQueue.length === 0 && (
          <div className="text-center py-12">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${colors.primary.main}15`,
              }}
            >
              <span className="text-2xl">📝</span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: colors.text.secondary }}
            >
              No prompts in queue
            </p>
            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              Upload a file or paste prompts to get started
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.background.card};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.border.main};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.primary.main};
        }
      `}</style>
    </Card>
  );
};
