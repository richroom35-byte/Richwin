'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'gold',
    name: 'Rich Room Imperial Gold',
    shortName: 'Imperial Gold',
    badge: 'SIGNATURE',
    description: 'Majestic Royal Gold, Amber & Bronzed Glow (Default)',
    primaryColor: '#FFD700',
    secondaryColor: '#F59E0B',
    accentColor: '#FFE57F',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #B8860B 100%)',
    previewGradient: 'from-amber-400 via-yellow-500 to-amber-700',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    textColor: '#FFD700',
    cardBorder: 'rgba(255, 215, 0, 0.35)',
  },
  {
    id: 'cyan',
    name: 'Cyber Neon & Electric Blue',
    shortName: 'Cyber Neon',
    badge: 'CYBERPUNK',
    description: 'Futuristic High-Voltage Cyan, Neon Purple & Laser Blue',
    primaryColor: '#00F0FF',
    secondaryColor: '#C026D3',
    accentColor: '#38F8FF',
    gradient: 'linear-gradient(135deg, #00F0FF 0%, #0099FF 50%, #7928CA 100%)',
    previewGradient: 'from-cyan-400 via-blue-500 to-fuchsia-600',
    glowColor: 'rgba(0, 240, 255, 0.5)',
    textColor: '#00F0FF',
    cardBorder: 'rgba(0, 240, 255, 0.35)',
  },
  {
    id: 'emerald',
    name: 'Dragon Emerald & Jade Mint',
    shortName: 'Dragon Emerald',
    badge: 'LUCKY VIP',
    description: 'High-Roller Neon Emerald, Mint Cash & Forest Glow',
    primaryColor: '#00FF87',
    secondaryColor: '#10B981',
    accentColor: '#6EE7B7',
    gradient: 'linear-gradient(135deg, #00FF87 0%, #60EFFF 50%, #059669 100%)',
    previewGradient: 'from-emerald-400 via-teal-400 to-cyan-500',
    glowColor: 'rgba(0, 255, 135, 0.5)',
    textColor: '#00FF87',
    cardBorder: 'rgba(0, 255, 135, 0.35)',
  },
  {
    id: 'crimson',
    name: 'Blood Ruby & Crimson Inferno',
    shortName: 'Blood Ruby',
    badge: 'INFERNO',
    description: 'Hot Ruby Red, Velvet Scarlet & Hellfire Glow',
    primaryColor: '#FF1744',
    secondaryColor: '#EF4444',
    accentColor: '#FF8A80',
    gradient: 'linear-gradient(135deg, #FF1744 0%, #FF5252 50%, #990000 100%)',
    previewGradient: 'from-rose-500 via-red-600 to-amber-600',
    glowColor: 'rgba(255, 23, 68, 0.5)',
    textColor: '#FF1744',
    cardBorder: 'rgba(255, 23, 68, 0.35)',
  },
  {
    id: 'amethyst',
    name: 'Cosmic Amethyst & Royal Violet',
    shortName: 'Cosmic Violet',
    badge: 'ROYAL',
    description: 'Galactic Deep Amethyst, Electric Violet & Indigo Glow',
    primaryColor: '#C084FC',
    secondaryColor: '#9333EA',
    accentColor: '#E9D5FF',
    gradient: 'linear-gradient(135deg, #C084FC 0%, #9333EA 50%, #4F46E5 100%)',
    previewGradient: 'from-purple-400 via-fuchsia-500 to-indigo-600',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    textColor: '#C084FC',
    cardBorder: 'rgba(192, 132, 252, 0.35)',
  },
  {
    id: 'sunset',
    name: 'Solar Blaze & Phoenix Orange',
    shortName: 'Solar Blaze',
    badge: 'HOTTEST',
    description: 'Radiant Sunrise Blaze, Molten Orange & Neon Pink Glow',
    primaryColor: '#FF6A00',
    secondaryColor: '#EE0979',
    accentColor: '#FFA726',
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #EE0979 50%, #FF8A00 100%)',
    previewGradient: 'from-orange-400 via-rose-500 to-amber-500',
    glowColor: 'rgba(255, 106, 0, 0.5)',
    textColor: '#FF6A00',
    cardBorder: 'rgba(255, 106, 0, 0.35)',
  },
];

const ThemeContext = createContext({
  currentTheme: THEMES[0],
  themeId: 'gold',
  setThemeId: () => {},
  themes: THEMES,
  isThemeModalOpen: false,
  openThemeModal: () => {},
  closeThemeModal: () => {},
});

export function ThemeProvider({ children }) {
  const [themeId, setThemeIdState] = useState('gold');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('rich_room_linear_theme');
      if (saved && THEMES.some((t) => t.id === saved)) {
        setThemeIdState(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'gold');
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'gold');
    }
  }, []);

  const setThemeId = (newThemeId) => {
    if (!THEMES.some((t) => t.id === newThemeId)) return;
    setThemeIdState(newThemeId);
    try {
      localStorage.setItem('rich_room_linear_theme', newThemeId);
      document.documentElement.setAttribute('data-theme', newThemeId);
      // Smooth visual ripple effect on theme change
      document.body.classList.add('theme-transitioning');
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 400);
    } catch (e) {
      console.warn('Could not persist theme:', e);
    }
  };

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setThemeId,
        themes: THEMES,
        isThemeModalOpen,
        openThemeModal: () => setIsThemeModalOpen(true),
        closeThemeModal: () => setIsThemeModalOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
