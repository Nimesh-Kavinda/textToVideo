import React from 'react';
import { Upload, FileText, Trash2, Sparkles } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const FileUploadSection = ({
  uploadedFiles,
  isDragging,
  onDragOver,
  onDrop,
  onDragLeave,
  onFileUpload,
  onRemoveFile,
  colors,
  theme,
}) => {
  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6 space-y-4">
        {/* File Upload and Instructions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          {/* File Upload - Left Side */}
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className="group relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-opacity-100"
            style={{
              borderColor: isDragging
                ? colors.primary.main
                : theme === 'dark'
                ? '#555555'
                : colors.primary.light,
              backgroundColor: isDragging
                ? `${colors.primary.main}15`
                : colors.background.hover,
              borderWidth: '3px',
              borderStyle: 'dashed',
            }}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.txt"
              onChange={onFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isDragging
                  ? `${colors.primary.main}20`
                  : theme === 'dark'
                  ? '#444444'
                  : colors.background.card,
                border: `2px solid ${
                  isDragging ? colors.primary.main : colors.border.main
                }`,
              }}
            >
              <Upload
                className="w-6 h-6 transition-all duration-300"
                style={{
                  color: isDragging
                    ? colors.primary.main
                    : colors.icon.secondary,
                }}
              />
            </div>
            <p
              className="text-base font-semibold mb-2 transition-colors duration-300"
              style={{
                color: isDragging ? colors.primary.main : colors.text.primary,
              }}
            >
              Drop files here or click to upload
            </p>
            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              PDF or TXT files supported
            </p>
          </div>

          {/* Instructions Panel - Right Side */}
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: colors.background.hover,
              borderColor: colors.border.main,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: colors.icon.error,
                }}
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: colors.text.white }}
                />
              </div>
              <h3
                className="font-semibold text-sm"
                style={{ color: colors.text.primary }}
              >
                How to Use
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: `${colors.primary.main}20`,
                    color: colors.primary.main,
                  }}
                >
                  1
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Enter your video description in the text field above
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: `${colors.primary.main}20`,
                    color: colors.primary.main,
                  }}
                >
                  2
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Upload PDF or TXT files for additional context (optional)
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: `${colors.primary.main}20`,
                    color: colors.primary.main,
                  }}
                >
                  3
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Adjust video settings from the left sidebar
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: `${colors.primary.main}20`,
                    color: colors.primary.main,
                  }}
                >
                  4
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Click Generate to create your AI-powered video
                </p>
              </div>
            </div>
          </div>
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
                  onClick={() => onRemoveFile(index)}
                  className="flex-shrink-0 h-8 w-8"
                  style={{ color: colors.status.error }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
