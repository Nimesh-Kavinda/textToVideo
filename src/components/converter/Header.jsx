import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Sliders,
  Moon,
  Sun,
  Coins,
  User,
  LogOut,
  Mail,
  Settings,
} from 'lucide-react';
import { Button } from '../ui/button';

export const Header = ({
  theme,
  toggleTheme,
  colors,
  onOpenSettings,
  showLogo = false,
}) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="border-b transition-all duration-300"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Left Section - Hidden on mobile */}
          <div className="flex items-center gap-4">
            {/* <Button
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
            </Button> */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
                showLogo
                  ? 'w-48 opacity-100 translate-x-0'
                  : 'w-48 md:w-0 opacity-100 md:opacity-0 translate-x-0 md:-translate-x-4'
              }`}
            >
              <Sparkles
                className="w-5 h-5 flex-shrink-0"
                style={{ color: colors.primary.main }}
              />
              <span
                className="font-semibold whitespace-nowrap"
                style={{ color: colors.text.primary }}
              >
                AI Video Generator
              </span>
            </div>
          </div>

          {/* Credits Section - Center */}
          <div
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border relative overflow-hidden group"
            style={{
              backgroundColor: colors.background.hover,
              borderColor: colors.border.main,
            }}
          >
            {/* Animated gradient background effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                animation: 'waveGradient 3s ease infinite',
              }}
            />
            {/* Animated border effect */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.5), rgba(79, 70, 229, 0.3), rgba(99, 102, 241, 0.3))',
                backgroundSize: '200% 100%',
                animation: 'waveGradient 3s ease infinite',
                padding: '2px',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.7), rgba(79, 70, 229, 0.5), rgba(99, 102, 241, 0.5))',
                backgroundSize: '200% 100%',
                animation: 'waveGradient 2s ease infinite',
                padding: '2px',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className="flex items-center gap-2 relative z-10">
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
                className="font-semibold text-sm relative z-10"
                style={{ color: colors.text.primary }}
              >
                150 Credits
              </span>
            </div>
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-4 h-8 font-medium text-xs border-0 relative z-10"
              style={{
                background: colors.primary.gradient,
                color: colors.text.white,
              }}
            >
              Upgrade
            </Button>
          </div>

          <style jsx>{`
            @keyframes waveGradient {
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
          `}</style>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Advanced Settings - Hidden on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="hidden md:flex"
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

            {/* Theme Toggle */}
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

            {/* User Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setIsUserMenuOpen(true)
                }
                style={{
                  backgroundColor: isUserMenuOpen
                    ? colors.background.hover
                    : 'transparent',
                }}
              >
                <User
                  className="w-4 h-4"
                  style={{ color: colors.icon.secondary }}
                />
              </Button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg border z-50 overflow-hidden"
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.main,
                    boxShadow: colors.shadow.lg,
                  }}
                  onMouseLeave={() =>
                    window.innerWidth >= 768 && setIsUserMenuOpen(false)
                  }
                >
                  {/* User Info Section */}
                  <div
                    className="p-4 border-b"
                    style={{
                      background: colors.primary.gradient,
                      borderColor: colors.border.main,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <User
                          className="w-6 h-6"
                          style={{ color: colors.text.white }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: colors.text.white }}
                        >
                          John Doe
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          Premium Member
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{
                        color: colors.text.primary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.background.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Mail
                        className="w-4 h-4"
                        style={{ color: colors.icon.secondary }}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium">Email</p>
                        <p
                          className="text-xs"
                          style={{ color: colors.text.tertiary }}
                        >
                          john.doe@example.com
                        </p>
                      </div>
                    </button>

                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{
                        color: colors.text.primary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.background.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={onOpenSettings}
                    >
                      <Settings
                        className="w-4 h-4"
                        style={{ color: colors.icon.secondary }}
                      />
                      <span className="text-sm font-medium">
                        Account Settings
                      </span>
                    </button>
                  </div>

                  {/* Sign Out Button */}
                  <div
                    className="border-t p-2"
                    style={{
                      borderColor: colors.border.main,
                    }}
                  >
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all"
                      style={{
                        color: colors.status.error,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.status.error}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-semibold">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
