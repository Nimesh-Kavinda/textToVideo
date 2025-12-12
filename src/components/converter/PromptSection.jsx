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
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
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
            }}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
