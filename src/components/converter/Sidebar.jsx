import React from 'react';
import {
  LayoutDashboard,
  History,
  Settings as SettingsIcon,
  Sparkles,
  PanelLeft,
} from 'lucide-react';
import { Button } from '../ui/button';

export const Sidebar = ({
  colors,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  sidebarTab,
  setSidebarTab,
  generationHistoryCount,
  className = '',
}) => {
  return (
    <aside
      className={`flex flex-col border-r transition-all duration-300 ease-in-out relative ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } ${className}`}
      style={{
        borderColor: colors.border.main,
        backgroundColor: colors.background.card,
      }}
    >
      {/* Sidebar Header (Logo) */}
      <div
        className={`h-16 flex items-center transition-all duration-300 ${
          isSidebarCollapsed ? 'justify-center' : 'justify-between px-4'
        }`}
      >
        <div
          className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${
            isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
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

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hover:bg-opacity-80"
          style={{ color: colors.text.secondary }}
        >
          <PanelLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        <div
          className={`mb-6 px-2 text-xs font-semibold uppercase tracking-wider transition-opacity duration-300 ${
            isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'
          }`}
          style={{ color: colors.text.tertiary }}
        >
          Navigation
        </div>

        {[
          { id: 'prompts', icon: LayoutDashboard, label: 'Prompts' },
          { id: 'history', icon: History, label: 'History' },
          { id: 'settings', icon: SettingsIcon, label: 'Settings' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSidebarTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
              sidebarTab === item.id ? 'shadow-sm' : 'hover:bg-opacity-50'
            } ${isSidebarCollapsed ? 'justify-center' : ''}`}
            style={{
              backgroundColor:
                sidebarTab === item.id ? colors.primary.main : 'transparent',
              color:
                sidebarTab === item.id
                  ? colors.text.white
                  : colors.text.secondary,
            }}
            title={isSidebarCollapsed ? item.label : ''}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom Stats */}
      {!isSidebarCollapsed && (
        <div className="px-6 pb-6">
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.background.hover }}
          >
            <p
              className="text-xs font-medium mb-1"
              style={{ color: colors.text.secondary }}
            >
              Images Generated
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.text.primary }}
            >
              {generationHistoryCount}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
