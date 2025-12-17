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
        <div className="p-3 space-y-3">
          {/* Model Selection */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-medium flex items-center justify-between"
              style={{ color: colors.text.primary }}
            >
              Model
              <Badge variant="outline" className="text-[10px] h-4 px-1">
                V5.5
              </Badge>
            </label>
            <Select
              value={settings.model}
              onValueChange={(value) => onSettingChange('model', value)}
            >
              <SelectTrigger
                className="h-8 text-xs"
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
                <SelectItem value="standard" className="text-xs">
                  Motion 2.0 Fast
                </SelectItem>
                <SelectItem value="premium" className="text-xs">
                  Motion 2.0 Quality
                </SelectItem>
                <SelectItem value="ultra" className="text-xs">
                  Motion 2.0 Ultra
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: colors.text.primary }}
            >
              Duration
            </label>
            <div className="flex gap-2">
              {['5s', '8s', '10s'].map((duration) => (
                <Button
                  key={duration}
                  variant={
                    settings.duration === duration ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => onSettingChange('duration', duration)}
                  className="h-7 text-xs font-medium border-0 flex-1 max-w-[80px]"
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
          <div className="space-y-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: colors.text.primary }}
            >
              Ratio
            </label>
            <div className="grid grid-cols-5 gap-1 max-w-[320px]">
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
                  className="h-9 flex items-center justify-center gap-1 rounded-md border text-[10px] font-medium transition-all"
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
                  <span className="text-sm">{ratio.icon}</span>
                  <span className="hidden sm:inline">{ratio.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: colors.text.primary }}
            >
              Resolution
            </label>
            <div className="flex gap-2 flex-wrap">
              {['360P', '540P', '720P', '1080P'].map((res) => (
                <button
                  key={res}
                  onClick={() => onSettingChange('resolution', res)}
                  className="h-7 px-3 rounded-md text-[10px] font-medium transition-all border min-w-[60px]"
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
          <div className="space-y-2 pt-1">
            <div
              className="flex items-center justify-between p-2 rounded-lg"
              style={{ backgroundColor: colors.background.hover }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <span className="text-xs">🔊</span>
                </div>
                <label
                  className="text-xs font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Audio
                  <Badge
                    variant="outline"
                    className="ml-1.5 text-[10px] h-4 px-1"
                  >
                    New
                  </Badge>
                </label>
              </div>
              <Switch
                className="scale-75 origin-right"
                checked={settings.enableAudio}
                onCheckedChange={(checked) =>
                  onSettingChange('enableAudio', checked)
                }
              />
            </div>

            <div
              className="flex items-center justify-between p-2 rounded-lg"
              style={{ backgroundColor: colors.background.hover }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <span className="text-xs">🎬</span>
                </div>
                <label
                  className="text-xs font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Multi-Shot
                  <Badge
                    variant="outline"
                    className="ml-1.5 text-[10px] h-4 px-1"
                  >
                    New
                  </Badge>
                </label>
              </div>
              <Switch
                className="scale-75 origin-right"
                checked={settings.multiShot}
                onCheckedChange={(checked) =>
                  onSettingChange('multiShot', checked)
                }
              />
            </div>

            <div
              className="flex items-center justify-between p-2 rounded-lg"
              style={{ backgroundColor: colors.background.hover }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <span className="text-xs">⚡</span>
                </div>
                <label
                  className="text-xs font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Preview Mode
                </label>
              </div>
              <Switch
                className="scale-75 origin-right"
                checked={settings.previewMode}
                onCheckedChange={(checked) =>
                  onSettingChange('previewMode', checked)
                }
              />
            </div>
          </div>

          {/* Advanced Settings Quick Access */}
          <div
            className="pt-2 mt-2 border-t"
            style={{ borderColor: colors.border.main }}
          >
            <label
              className="text-xs font-medium mb-2 block"
              style={{ color: colors.text.primary }}
            >
              Advanced Settings
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenAdvancedSettings('motion')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.background.hover,
                  color: colors.text.secondary,
                }}
              >
                <span className="text-sm">🎬</span>
                <span className="text-[10px] font-medium">Motion</span>
              </button>
              <button
                onClick={() => onOpenAdvancedSettings('video')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.background.hover,
                  color: colors.text.secondary,
                }}
              >
                <span className="text-sm">🎥</span>
                <span className="text-[10px] font-medium">Video</span>
              </button>
            </div>
            <button
              onClick={() => onOpenAdvancedSettings('advanced')}
              className="w-full mt-2 flex items-center justify-center gap-1.5 p-2 rounded-lg transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: colors.background.hover,
                color: colors.text.secondary,
              }}
            >
              <span className="text-sm">⚙️</span>
              <span className="text-[10px] font-medium">More Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
