'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette, Sparkles, ChevronUp } from 'lucide-react';

export default function FloatingThemeSwitcher() {
  const { currentTheme, themes, themeId, setThemeId, openThemeModal } = useTheme();
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
        {/* Quick Swatch Popup */}
        {quickMenuOpen && (
          <div
            className="p-3 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--chrome-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-2 animate-fadeIn mb-1 min-w-[210px]"
            style={{ boxShadow: `0 10px 30px ${currentTheme.glowColor}` }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="text-[11px] font-heading font-black tracking-wider text-white flex items-center gap-1.5">
                <Palette size={13} style={{ color: currentTheme.primaryColor }} />
                THEME GRADIENTS
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                6 PRESETS
              </span>
            </div>

            {/* 6 Gradient Color Pills */}
            <div className="grid grid-cols-6 gap-1.5 py-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeId(t.id);
                  }}
                  title={t.name}
                  className={`relative w-7 h-7 rounded-lg transition-transform overflow-hidden ${
                    t.id === themeId
                      ? 'scale-110 ring-2 ring-white shadow-md'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ background: t.gradient }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setQuickMenuOpen(false);
                openThemeModal();
              }}
              className="mt-1 w-full py-1.5 px-3 rounded-xl font-heading font-bold text-[10px] text-black tracking-wider uppercase transition-transform active:scale-95 text-center flex items-center justify-center gap-1.5 shadow"
              style={{ background: currentTheme.gradient }}
            >
              <Sparkles size={12} />
              Open Full Styler
            </button>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setQuickMenuOpen(!quickMenuOpen)}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full border-2 border-[var(--chrome-border)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            boxShadow: `0 0 20px ${currentTheme.glowColor}`,
          }}
          title="Change Theme Linear Gradient"
        >
          {/* Animated Gradient Dot */}
          <span
            className="w-4 h-4 rounded-full shadow-inner animate-pulse"
            style={{ background: currentTheme.gradient }}
          />

          <span className="hidden sm:inline font-heading font-black text-xs text-white tracking-wider">
            THEME
          </span>

          <Palette
            size={16}
            className="transition-transform group-hover:rotate-45"
            style={{ color: currentTheme.primaryColor }}
          />
        </button>
      </div>
    </>
  );
}
