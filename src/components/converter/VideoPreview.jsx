import React from 'react';
import { Play } from 'lucide-react';
import { Card } from '../ui/card';

export const VideoPreview = ({ isGenerating, progress, colors }) => {
  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6">
        <div
          className="relative aspect-video rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.background.canvas }}
        >
          {isGenerating ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{ background: colors.primary.gradient }}
            >
              <div className="relative">
                <div
                  className="w-20 h-20 border-4 rounded-full"
                  style={{ borderColor: colors.border.dark }}
                ></div>
                <div
                  className="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-r-transparent rounded-full animate-spin"
                  style={{
                    borderBottomColor: colors.primary.light,
                    borderLeftColor: colors.primary.light,
                  }}
                ></div>
              </div>
              <p className="font-medium" style={{ color: colors.text.white }}>
                Generating your video...
              </p>
              <div
                className="w-64 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.border.dark }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: colors.secondary.gradient,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="p-5 rounded-full"
                style={{ backgroundColor: colors.background.secondary }}
              >
                <Play
                  className="w-10 h-10"
                  style={{ color: colors.primary.main }}
                />
              </div>
              <p
                className="font-medium"
                style={{ color: colors.text.tertiary }}
              >
                Video Not Found
              </p>
              <p className="text-sm" style={{ color: colors.text.disabled }}>
                Start creating your first video
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
