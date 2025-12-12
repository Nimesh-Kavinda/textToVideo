import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Sliders, Moon, Sun, Coins } from 'lucide-react';
import { Button } from '../ui/button';

export const Header = ({ theme, toggleTheme, colors, onOpenSettings }) => {
  const navigate = useNavigate();

  return (
    <header
      className="border-b"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              style={{
                color: colors.text.secondary,
              }}
            >
              <ArrowLeft
                className="w-4 h-4 mr-1"
                style={{ color: colors.icon.secondary }}
              />
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles
                className="w-5 h-5"
                style={{ color: colors.primary.main }}
              />
              <span
                className="font-semibold"
                style={{ color: colors.text.primary }}
              >
                AI Video Generator
              </span>
            </div>
          </div>

          {/* Credits Section - Center */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full border"
            style={{
              backgroundColor: colors.background.hover,
              borderColor: colors.border.main,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: colors.primary.gradient,
                }}
              >
                <Coins
                  className="w-4 h-4"
                  style={{ color: colors.text.white }}
                />
              </div>
              <span
                className="font-semibold text-sm"
                style={{ color: colors.text.primary }}
              >
                150 Credits
              </span>
            </div>
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-4 h-8 font-medium text-xs border-0"
              style={{
                background: colors.primary.gradient,
                color: colors.text.white,
              }}
            >
              Upgrade
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              style={{
                color: colors.text.secondary,
              }}
            >
              <Sliders
                className="w-4 h-4 mr-2"
                style={{ color: colors.icon.secondary }}
              />
              Advanced Settings
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun
                  className="w-4 h-4"
                  style={{ color: colors.status.warning }}
                />
              ) : (
                <Moon
                  className="w-4 h-4"
                  style={{ color: colors.icon.secondary }}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
