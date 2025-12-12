import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Sliders, Moon, Sun } from 'lucide-react';
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
                className="w-4 h-4 mr-2"
                style={{ color: colors.icon.secondary }}
              />
              Back
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
