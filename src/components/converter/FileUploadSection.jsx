import React from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
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
  onFileClick,
  onLoadPrompts,
  colors,
  theme,
  isMobile = false,
}) => {
  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6 lg:p-10 space-y-4">
        {/* Desktop: Full Width Drag and Drop */}
        {!isMobile && (
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className="group relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer hover:border-opacity-100 hover:shadow-xl"
            style={{
              borderColor: isDragging
                ? colors.primary.main
                : theme === 'dark'
                ? '#555555'
                : colors.secondary.dark,
              backgroundColor: isDragging
                ? `${colors.primary.main}15`
                : colors.background.hover,
              borderWidth: '3px',
              borderStyle: 'dashed',
              minHeight: '280px',
            }}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.txt,.csv,.json"
              onChange={onFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-6">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: isDragging
                    ? `${colors.primary.main}20`
                    : theme === 'dark'
                    ? '#444444'
                    : colors.background.card,
                  border: `3px solid ${
                    isDragging ? colors.primary.main : colors.border.main
                  }`,
                }}
              >
                <Upload
                  className="w-8 h-8 transition-all duration-300"
                  style={{
                    color: isDragging
                      ? colors.primary.main
                      : colors.icon.secondary,
                  }}
                />
              </div>
              <div>
                <p
                  className="text-xl font-semibold mb-2 transition-colors duration-300"
                  style={{
                    color: isDragging
                      ? colors.primary.main
                      : colors.text.primary,
                  }}
                >
                  Drop your batch files here
                </p>
                <p
                  className="text-base mb-4"
                  style={{ color: colors.text.secondary }}
                >
                  or click to browse and upload
                </p>
                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                  Supports TXT, CSV, JSON files for batch prompts • PDF for
                  context
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: Simple File Upload Button */}
        {isMobile && (
          <div className="space-y-3">
            <label
              className="block w-full py-4 px-6 text-center rounded-xl border-2 cursor-pointer transition-all"
              style={{
                backgroundColor: colors.background.hover,
                borderColor: colors.border.main,
                color: colors.text.primary,
              }}
            >
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.csv,.json"
                onChange={onFileUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-3">
                <Upload
                  className="w-5 h-5"
                  style={{ color: colors.primary.main }}
                />
                <span className="font-medium">Upload Batch Prompts</span>
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: colors.text.tertiary }}
              >
                TXT, CSV, JSON or PDF files supported
              </p>
            </label>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-opacity-80 transition-all"
                style={{ backgroundColor: colors.background.hover }}
                onClick={() => onFileClick && onFileClick(file)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
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
