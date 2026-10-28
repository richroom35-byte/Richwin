'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X, Check, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ThemeSelectorModal() {
  const { themes, themeId, setThemeId, isThemeModalOpen, closeThemeModal, currentTheme } = useTheme();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--chrome-border)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${currentTheme.glowColor}`,
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--chrome-border)] bg-[var(--bg-surface)]/80">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-black shadow-lg"
              style={{ background: currentTheme.gradient }}
            >
              <Palette size={22} className="text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white tracking-wide">
                  SELECT COLOR SCHEME
                </h3>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-heading font-black text-black uppercase"
                  style={{ background: currentTheme.gradient }}
                >
                  6 GRADIENTS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch linear gradient theme. All buttons, glows, cards, and pages will update instantly.
              </p>
            </div>
          </div>
          <button
            onClick={closeThemeModal}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-400 hover:text-white hover:border-[var(--neon-cyan)] flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {themes.map((t) => {
              const isSelected = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900/90 border-2 shadow-lg scale-[1.02]'
                      : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800 hover:border-slate-600'
                  }`}
                  style={{
                    borderColor: isSelected ? t.primaryColor : undefined,
                    boxShadow: isSelected ? `0 0 25px ${t.glowColor}` : undefined,
                  }}
                >
                  {/* Top Bar with Badge & Selection Indicator */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <span className="font-heading font-extrabold text-sm text-white group-hover:text-amber-200 transition-colors">
                        {t.shortName}
                      </span>
                    </div>
                    {isSelected ? (
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black font-heading text-black shadow-md"
                        style={{ background: t.gradient }}
                      >
                        <Check size={12} strokeWidth={3} /> ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-heading font-semibold text-slate-500 uppercase tracking-wider">
                        {t.badge}
                      </span>
                    )}
                  </div>

                  {/* Gradient Visual Bar */}
                  <div
                    className="w-full h-8 rounded-xl mb-3 border border-white/20 shadow-inner flex items-center justify-end px-3 transition-transform group-hover:scale-[1.01]"
                    style={{ background: t.gradient }}
                  >
                    <div className="flex items-center gap-1.5 opacity-90">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/70 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-black/40 shadow-sm" />
                    </div>
                  </div>

                  {/* Theme Description */}
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[var(--chrome-border)] bg-[var(--bg-surface)]/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles size={14} style={{ color: currentTheme.primaryColor }} />
            <span>Theme auto-saves to your browser preferences</span>
          </div>
          <button
            onClick={closeThemeModal}
            className="px-6 py-2.5 rounded-xl font-heading font-black text-xs text-black uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background: currentTheme.gradient }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
