import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Zap, Star, Flame, Info } from 'lucide-react';

export const AnnouncementBanner = ({ colors }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const announcements = [
    {
      icon: TrendingUp,
      text: 'Trending: "Cyberpunk City at Night" - Create stunning futuristic videos!',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconColor: '#fff',
    },
    {
      icon: Sparkles,
      text: 'New Feature: Multi-Shot Mode - Generate videos with multiple camera angles!',
      gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // deep purple → blue
      iconColor: '#fff',
    },
    {
      icon: Flame,
      text: 'Hot Tip: Use "Motion Control" for cinematic camera movements in your videos',
      gradient: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)', // steel blue → deep blue/charcoal
      iconColor: '#fff',
    },
    {
      icon: Star,
      text: 'Pro Tip: Combine detailed prompts with Motion 2.0 Ultra for best results!',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // deep teal → neon green
      iconColor: '#fff',
    },
    {
      icon: Zap,
      text: 'Limited Offer: Get 50% more credits with Premium upgrade this week!',
      gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)', // deep grey → royal blue
      iconColor: '#fff',
    },
    {
      icon: Info,
      text: 'Did you know? 16:9 ratio is perfect for YouTube and social media videos',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      iconColor: '#fff',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  const Icon = announcements[currentSlide].icon;

  return (
    <div
      className="relative overflow-hidden transition-all duration-500 hidden md:block"
      style={{
        background: announcements[currentSlide].gradient,
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-center gap-3 relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-32 h-32 rounded-full opacity-20 animate-pulse"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                top: '-20px',
                left: '10%',
                animation: 'float 6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-24 h-24 rounded-full opacity-20 animate-pulse"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                top: '-10px',
                right: '15%',
                animation: 'float 8s ease-in-out infinite',
                animationDelay: '2s',
              }}
            />
          </div>

          {/* Icon */}
          <div
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center animate-bounce"
            style={{
              animation: 'bounce 2s ease-in-out infinite',
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: announcements[currentSlide].iconColor }}
            />
          </div>

          {/* Sliding Text */}
          <div className="flex-1 overflow-hidden">
            <div
              key={currentSlide}
              className="animate-slide-in"
              style={{
                animation: 'slideIn 0.5s ease-out',
              }}
            >
              <p
                className="text-sm font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ color: '#ffffff' }}
              >
                {announcements[currentSlide].text}
              </p>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex-shrink-0 flex items-center gap-1.5">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: currentSlide === index ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor:
                    currentSlide === index
                      ? '#ffffff'
                      : 'rgba(255, 255, 255, 0.4)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
