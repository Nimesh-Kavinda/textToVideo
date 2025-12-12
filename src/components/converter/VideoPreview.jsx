import React, { useEffect, useState } from 'react';
import { Play, FileText, Brain, Wand2 } from 'lucide-react';
import { Card } from '../ui/card';

export const VideoPreview = ({ isGenerating, progress, colors }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      // Step 1: Reading (0-33%)
      if (progress <= 33) {
        setCurrentStep(1);
      }
      // Step 2: Analyzing (34-66%)
      else if (progress <= 66) {
        setCurrentStep(2);
        // Calculate analyzing percentage with decimals
        const analyzePercent = ((progress - 33) / 33) * 100;
        setAnalyzingProgress(analyzePercent);
      }
      // Step 3: Generating (67-100%)
      else {
        setCurrentStep(3);
      }
    } else {
      setCurrentStep(1);
      setAnalyzingProgress(0);
    }
  }, [progress, isGenerating]);

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Reading with wave color fade effect
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <FileText
              className="w-12 h-12"
              style={{ color: `${colors.text.white}70` }}
            />
            <div className="text-center">
              <p
                className="text-sm font-medium mb-3"
                style={{ color: `${colors.text.white}80` }}
              >
                Reading
              </p>
              {/* Wave color fade effect */}
              <div
                className="relative w-64 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: `${colors.text.white}15` }}
              >
                <div
                  className="absolute inset-0 animate-wave-fade"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${colors.text.white}60 50%, transparent 100%)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        );

      case 2:
        // Step 2: Analyzing with percentage
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Brain
              className="w-12 h-12 animate-pulse"
              style={{ color: `${colors.text.white}70` }}
            />
            <div className="text-center">
              <p
                className="text-sm font-medium mb-2"
                style={{ color: `${colors.text.white}80` }}
              >
                Analyzing
              </p>
              <div
                className="text-3xl font-bold"
                style={{ color: `${colors.text.white}90` }}
              >
                {analyzingProgress.toFixed(2)}%
              </div>
            </div>
          </div>
        );

      case 3:
        // Step 3: Generating with circular progress
        const circleProgress = ((progress - 66) / 34) * 100;
        const circumference = 2 * Math.PI * 45;
        const strokeDashoffset =
          circumference - (circleProgress / 100) * circumference;

        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Circular Progress */}
            <div className="relative w-28 h-28">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  stroke={`${colors.text.white}20`}
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  stroke={`${colors.text.white}70`}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              </svg>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Wand2
                  className="w-8 h-8 animate-spin-slow"
                  style={{ color: `${colors.text.white}70` }}
                />
              </div>
            </div>

            <div className="text-center">
              <p
                className="text-sm font-medium mb-3"
                style={{ color: `${colors.text.white}80` }}
              >
                Generating
              </p>

              {/* Progress bar */}
              <div
                className="w-64 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: `${colors.text.white}15` }}
              >
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: `${colors.text.white}70`,
                  }}
                ></div>
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: `${colors.text.white}60` }}
              >
                {progress}%
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              className="absolute inset-0"
              style={{ background: colors.primary.gradient }}
            >
              {getStepContent()}
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

      {/* Custom animations */}
      <style jsx>{`
        @keyframes wave-fade {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-wave-fade {
          animation: wave-fade 2s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </Card>
  );
};
