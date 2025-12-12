import React from 'react';
import { Wand2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const PromptSection = ({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  uploadedFilesCount,
  colors,
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
          <div className="flex gap-3 items-stretch">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Describe the content you want to create..."
              className="flex-1 resize-none text-sm"
              rows={1}
              style={{
                backgroundColor: colors.background.input,
                borderColor: colors.border.main,
                color: colors.text.primary,
                minHeight: '44px',
                maxHeight: '120px',
                padding: '12px 14px',
              }}
            />
            <Button
              onClick={onGenerate}
              disabled={!prompt && uploadedFilesCount === 0}
              className="h-auto px-6 py-3 font-medium text-sm shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0 flex-shrink-0 whitespace-nowrap"
              style={{
                background: colors.primary.gradient,
                color: colors.text.white,
                boxShadow: colors.shadow.md,
                borderRadius: '20px',
              }}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
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
