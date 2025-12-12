import React from 'react';
import { Sliders } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from '../ui/dialog';

export const AdvancedSettingsModal = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  settings,
  onSettingChange,
  motionPresets,
  colors,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] max-w-2xl"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.border.main,
        }}
      >
        <DialogHeader
          onClose={onClose}
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
              <Sliders
                className="w-5 h-5"
                style={{ color: colors.text.white }}
              />
            </div>
            <DialogTitle style={{ color: colors.text.primary }}>
              Advanced Settings
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogBody className="p-4" style={{ backgroundColor: colors.background.card }}>
          {/* Tabs */}
          <div
            className="flex gap-2 mb-6 border-b pb-px"
            style={{ borderColor: colors.border.main }}
          >
            {[
              { id: 'motion', label: 'Motion Control', icon: '🎬' },
              { id: 'video', label: 'Video Settings', icon: '🎥' },
              { id: 'advanced', label: 'Advanced', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="px-3 py-2 rounded-t-lg font-medium text-xs transition-all"
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
                <span className="mr-1.5">{tab.icon}</span>
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
              <div className="grid grid-cols-3 gap-3">
                {motionPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSettingChange('motionControl', preset.id)}
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
                      <div className="relative h-20 overflow-hidden">
                        <img
                          src={preset.image}
                          alt={preset.label}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {settings.motionControl === preset.id && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        )}
                      </div>
                    ) : (
                      <div
                        className="h-20 flex items-center justify-center text-3xl"
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
                      onClick={() => onSettingChange('duration', duration)}
                      className="h-9 rounded-lg text-xs font-medium transition-all hover:scale-[1.02]"
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
                <div className="grid grid-cols-5 gap-2">
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
                        onSettingChange('aspectRatio', ratio.value)
                      }
                      className="h-16 flex flex-col items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all hover:scale-[1.02]"
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
                <div className="grid grid-cols-4 gap-2">
                  {['360P', '540P', '720P', '1080P'].map((res) => (
                    <button
                      key={res}
                      onClick={() => onSettingChange('resolution', res)}
                      className="h-9 rounded-lg text-xs font-medium transition-all hover:scale-[1.02]"
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
                className="flex items-center justify-between p-3 rounded-lg"
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
                    onSettingChange('enableAudio', checked)
                  }
                />
              </div>

              {/* Multi-Shot Toggle */}
              <div
                className="flex items-center justify-between p-3 rounded-lg"
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
                    onSettingChange('multiShot', checked)
                  }
                />
              </div>

              {/* Preview Mode Toggle */}
              <div
                className="flex items-center justify-between p-3 rounded-lg"
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
                    onSettingChange('previewMode', checked)
                  }
                />
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div
            className="mt-6 pt-6 border-t"
            style={{ borderColor: colors.border.main }}
          >
            <Button
              onClick={onClose}
              className="w-full h-10 font-semibold text-sm shadow-md transition-all hover:scale-[1.01] border-0"
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
  );
};
