import React from 'react';
import { Wand2, List } from 'lucide-react';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const PromptSection = ({
  prompt,
  onPromptChange,
  onGenerate,
  onLoadPrompts,
  isGenerating,
  uploadedFilesCount,
  colors,
  isMobile = false,
}) => {
  return (
    <div className="relative group">
      {/* Animated Border Wrapper */}
      <div className="absolute inset-0 rounded-xl p-[2px] animate-border-move pointer-events-none">
        <div
          className="w-full h-full rounded-xl border border-transparent bg-[length:300%_300%]
          bg-gradient-to-r from-[#667eea40] via-[#764ba260] to-[#30cfd060] 
          dark:from-[#667eea80] dark:via-[#764ba2a0] dark:to-[#30cfd0a0]
          animate-border-flow"
        ></div>
      </div>

      {/* Main Card */}
      <Card
        className="relative rounded-xl border bg-clip-padding"
        style={{
          backgroundColor: colors.background.card,
          borderColor: 'transparent',
        }}
      >
        <div className="p-6">
          <div className="flex flex-col gap-3">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Enter prompts for batch generation (one prompt per line)&#10;Example:&#10;A dragon flying over mountains&#10;A sunset at the beach&#10;City lights at night"
              className="flex-1 resize-none text-sm"
              rows={isMobile ? 4 : 6}
              style={{
                backgroundColor: colors.background.input,
                borderColor: colors.border.main,
                color: colors.text.primary,
                minHeight: isMobile ? '120px' : '160px',
                maxHeight: '300px',
                padding: '12px 14px',
              }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Button
                onClick={onLoadPrompts}
                disabled={!prompt.trim()}
                className="h-auto px-6 py-3 font-medium text-sm shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0 flex-shrink-0 whitespace-nowrap w-full"
                style={{
                  background: prompt.trim()
                    ? colors.secondary.gradient
                    : colors.background.hover,
                  color: prompt.trim()
                    ? colors.text.white
                    : colors.text.tertiary,
                  boxShadow: colors.shadow.md,
                  borderRadius: '20px',
                }}
              >
                <List className="w-4 h-4 mr-2" />
                Load Prompts to Queue
              </Button>
              <Button
                onClick={onGenerate}
                disabled={!prompt && uploadedFilesCount === 0}
                className="h-auto px-6 py-3 font-medium text-sm shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0 flex-shrink-0 whitespace-nowrap w-full"
                style={{
                  background: colors.primary.gradient,
                  color: colors.text.white,
                  boxShadow: colors.shadow.md,
                  borderRadius: '20px',
                }}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Single'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Border Animation Styles */}
      <style jsx>{`
        .animate-border-flow {
          animation: borderFlow 6s ease infinite;
        }

        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-border-move {
          animation: borderPulse 4s ease-in-out infinite;
        }

        @keyframes borderPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.01);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
