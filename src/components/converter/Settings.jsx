import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const Settings = ({
  settings,
  onSettingChange,
  colors,
  onOpenAdvancedSettings,
}) => {
  return (
    <div className="">
      <div
        className=""
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
              onValueChange={(value) => onSettingChange('model', value)}
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
                <SelectItem value="premium">Motion 2.0 Quality</SelectItem>
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
                  onClick={() => onSettingChange('duration', duration)}
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
                  onClick={() => onSettingChange('aspectRatio', ratio.value)}
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
                  onClick={() => onSettingChange('resolution', res)}
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
                  onSettingChange('enableAudio', checked)
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
                  onSettingChange('multiShot', checked)
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
                  onSettingChange('previewMode', checked)
                }
              />
            </div>
          </div>

          {/* Advanced Settings Quick Access */}
          <div
            className="pt-3 mt-3 border-t"
            style={{ borderColor: colors.border.main }}
          >
            <label
              className="text-sm font-medium mb-3 block"
              style={{ color: colors.text.primary }}
            >
              Advanced Settings
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onOpenAdvancedSettings('motion')}
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
                onClick={() => onOpenAdvancedSettings('video')}
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
                onClick={() => onOpenAdvancedSettings('advanced')}
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
      </div>
    </div>
  );
};
