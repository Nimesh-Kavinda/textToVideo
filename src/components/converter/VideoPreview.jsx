import React, { useEffect, useState } from 'react';
import {
  Play,
  FileText,
  Brain,
  Wand2,
  Film,
  Sparkles,
  ScanLine,
  Cpu,
  Clapperboard,
} from 'lucide-react';
import { Card } from '../ui/card';
import { motion, AnimatePresence } from 'framer-motion';

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
        // Step 1: Reading - Scanning Effect
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px ${colors.text.white}20`,
                    `0 0 40px ${colors.text.white}40`,
                    `0 0 20px ${colors.text.white}20`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <FileText className="w-12 h-12 text-white/90" />
              </motion.div>

              {/* Scanning Beam */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
              />
            </div>

            <div className="text-center space-y-2">
              <motion.h3
                className="text-xl font-semibold text-white tracking-wide"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Reading Prompt
              </motion.h3>
              <p className="text-white/60 text-sm">
                Analyzing text structure and semantics...
              </p>
            </div>
          </motion.div>
        );

      case 2:
        // Step 2: Analyzing - Neural Network / Brain Effect
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              {/* Orbiting Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-white/20"
                  style={{ scale: 1 + i * 0.4 }}
                  animate={{
                    rotate: 360,
                    scale: [1 + i * 0.4, 1.1 + i * 0.4, 1 + i * 0.4],
                  }}
                  transition={{
                    rotate: {
                      duration: 10 - i * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              ))}

              <motion.div
                className="p-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 relative z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-12 h-12 text-white/90" />
              </motion.div>

              {/* Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  className="absolute w-2 h-2 bg-white/60 rounded-full"
                  style={{ top: '50%', left: '50%' }}
                  animate={{
                    x: Math.cos(i * 60 * (Math.PI / 180)) * 60,
                    y: Math.sin(i * 60 * (Math.PI / 180)) * 60,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4 text-white/70 animate-pulse" />
                <span className="text-xl font-bold text-white tabular-nums">
                  {analyzingProgress.toFixed(0)}%
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Processing neural pathways...
              </p>
            </div>
          </motion.div>
        );

      case 3:
        // Step 3: Generating - Cinematic/Rendering Effect
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          >
            <div className="relative">
              {/* Film Reel Effect */}
              <motion.div
                className="relative w-24 h-24 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute inset-2 rounded-full border-4 border-white/20"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <Clapperboard className="w-10 h-10 text-white/90" />
              </motion.div>

              {/* Glowing Pulse */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/5"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-white/80 font-medium">
                <span>Rendering Video</span>
                <span>{progress}%</span>
              </div>

              {/* Advanced Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/60 via-white to-white/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                >
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              </div>
              <p className="text-center text-xs text-white/50">
                Finalizing frames and audio sync...
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className="border overflow-hidden"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6">
        <div
          className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: colors.background.canvas }}
        >
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                }}
              >
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {getStepContent()}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-full shadow-lg cursor-pointer group"
                  style={{ backgroundColor: colors.background.secondary }}
                >
                  <Play
                    className="w-12 h-12 ml-1 transition-colors duration-300"
                    style={{ color: colors.primary.main }}
                  />
                </motion.div>
                <div className="text-center space-y-1">
                  <p
                    className="font-semibold text-lg"
                    style={{ color: colors.text.tertiary }}
                  >
                    Ready to Create
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: colors.text.disabled }}
                  >
                    Enter your prompt to start generating
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};
