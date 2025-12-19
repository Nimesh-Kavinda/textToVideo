import React from 'react';
import {
  Play,
  Download,
  FileSpreadsheet,
  Clock,
  Pause,
  StopCircle,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

export const BatchControls = ({
  promptQueue,
  batchSettings,
  onBatchSettingChange,
  onStartBatch,
  onPauseBatch,
  onStopBatch,
  isProcessing,
  isPaused,
  currentProgress,
  colors,
}) => {
  const { autoDownload, createCSV, delay } = batchSettings;
  const totalPrompts = promptQueue.length;
  const completedPrompts = currentProgress.completed || 0;
  const progressPercentage =
    totalPrompts > 0 ? (completedPrompts / totalPrompts) * 100 : 0;

  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: colors.secondary.gradient,
            }}
          >
            <Play className="w-5 h-5" style={{ color: colors.text.white }} />
          </div>
          <div>
            <h3
              className="font-semibold text-base"
              style={{ color: colors.text.primary }}
            >
              Batch Generation Controls
            </h3>
            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              Configure and manage your batch processing
            </p>
          </div>
        </div>

        {/* Progress Section */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: colors.text.primary }}
              >
                Processing Progress
              </span>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  backgroundColor: isPaused
                    ? `${colors.status.warning}15`
                    : `${colors.status.success}15`,
                  color: isPaused
                    ? colors.status.warning
                    : colors.status.success,
                  borderColor: isPaused
                    ? colors.status.warning
                    : colors.status.success,
                }}
              >
                {isPaused ? 'Paused' : 'Processing'}
              </Badge>
            </div>

            <Progress
              value={progressPercentage}
              className="h-2"
              style={{
                backgroundColor: colors.background.hover,
              }}
            />

            <div className="flex items-center justify-between text-xs">
              <span style={{ color: colors.text.secondary }}>
                {completedPrompts} of {totalPrompts} prompts completed
              </span>
              <span style={{ color: colors.text.tertiary }}>
                {progressPercentage.toFixed(0)}%
              </span>
            </div>

            {currentProgress.currentPrompt && (
              <div
                className="p-3 rounded-lg border"
                style={{
                  backgroundColor: colors.background.hover,
                  borderColor: colors.border.main,
                }}
              >
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: colors.text.secondary }}
                >
                  Current Prompt:
                </p>
                <p
                  className="text-xs line-clamp-2"
                  style={{ color: colors.text.primary }}
                >
                  {currentProgress.currentPrompt}
                </p>
                {currentProgress.estimatedTime && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: colors.text.tertiary }}
                  >
                    Estimated time remaining: {currentProgress.estimatedTime}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Batch Settings */}
        <div className="space-y-4">
          {/* Delay Between Generations */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: colors.text.primary }}
            >
              <Clock
                className="w-4 h-4"
                style={{ color: colors.primary.main }}
              />
              Delay Between Generations
            </label>

            <div className="flex flex-wrap gap-2">
              {['5s', '10s', '20s', '30s', '1min'].map((value) => (
                <button
                  key={value}
                  onClick={() => onBatchSettingChange('delay', value)}
                  disabled={isProcessing}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                    delay === value ? '' : 'hover:bg-opacity-80'
                  }`}
                  style={{
                    backgroundColor:
                      delay === value ? colors.primary.main : 'transparent',
                    color:
                      delay === value
                        ? colors.text.white
                        : colors.text.secondary,
                    borderColor:
                      delay === value ? 'transparent' : colors.border.main,
                    ringColor: colors.primary.main,
                    opacity: isProcessing ? 0.5 : 1,
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                  }}
                >
                  {value}
                </button>
              ))}
            </div>

            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              Prevents API rate limits and ensures quality
            </p>
          </div>

          {/* Auto Download */}
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: colors.background.hover }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.background.card }}
              >
                <Download
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium block"
                  style={{ color: colors.text.primary }}
                >
                  Auto Download Results
                </label>
                <p className="text-xs" style={{ color: colors.text.tertiary }}>
                  Download videos automatically after generation
                </p>
              </div>
            </div>
            <Switch
              checked={autoDownload}
              onCheckedChange={(checked) =>
                onBatchSettingChange('autoDownload', checked)
              }
              disabled={isProcessing}
            />
          </div>

          {/* Create CSV */}
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: colors.background.hover }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.background.card }}
              >
                <FileSpreadsheet
                  className="w-4 h-4"
                  style={{ color: colors.secondary.main }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium block"
                  style={{ color: colors.text.primary }}
                >
                  Export Metadata to CSV
                </label>
                <p className="text-xs" style={{ color: colors.text.tertiary }}>
                  Create spreadsheet with all generation details
                </p>
              </div>
            </div>
            <Switch
              checked={createCSV}
              onCheckedChange={(checked) =>
                onBatchSettingChange('createCSV', checked)
              }
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isProcessing ? (
            <Button
              onClick={onStartBatch}
              disabled={totalPrompts === 0}
              className="w-full h-12 text-base font-semibold"
              style={{
                background:
                  totalPrompts > 0
                    ? colors.primary.gradient
                    : colors.background.hover,
                color:
                  totalPrompts > 0 ? colors.text.white : colors.text.tertiary,
              }}
            >
              <Play className="w-5 h-5 mr-2" />
              Generate Queue ({totalPrompts}{' '}
              {totalPrompts === 1 ? 'prompt' : 'prompts'})
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onPauseBatch}
                className="h-12 text-sm font-semibold"
                style={{
                  background: colors.status.warning,
                  color: colors.text.white,
                }}
              >
                <Pause className="w-4 h-4 mr-2" />
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                onClick={onStopBatch}
                className="h-12 text-sm font-semibold"
                style={{
                  background: colors.status.error,
                  color: colors.text.white,
                }}
              >
                <StopCircle className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: `${colors.primary.main}05`,
            borderColor: `${colors.primary.main}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{
                backgroundColor: `${colors.primary.main}20`,
              }}
            >
              <span className="text-xs">💡</span>
            </div>
            <div
              className="text-xs space-y-1"
              style={{ color: colors.text.secondary }}
            >
              <p className="font-medium">Batch Processing Tips:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Videos are processed sequentially, one at a time</li>
                <li>Each prompt uses its individual settings</li>
                <li>Longer delays ensure better quality and API stability</li>
                <li>You can pause and resume anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
