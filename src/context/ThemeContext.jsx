import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null); // 'toNight' or 'toDay'

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setTransitionDirection(isDark ? 'toDay' : 'toNight');
    setIsTransitioning(true);
    
    // Change theme at the peak of the animation
    setTimeout(() => {
      setIsDark(!isDark);
    }, 400);
    
    // End transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 800);
  };

  const theme = {
    isDark,
    toggleTheme,
    isTransitioning,
    transitionDirection,
    // Dark Theme Colors (#000000, #F58840, #B85252, #EADEDE)
    dark: {
      bg: 'from-[#000000] via-[#0a0a0a] to-[#000000]',
      bgSolid: 'bg-black',
      bgSecondary: 'bg-[#0f0f0f]/80',
      bgCard: 'bg-[#F58840]/10',
      bgCardHover: 'hover:bg-[#F58840]/20',
      bgButton: 'bg-[#F58840]',
      bgButtonHover: 'hover:bg-[#B85252]',
      text: 'text-[#EADEDE]',
      textWhite: 'text-white',
      textSecondary: 'text-[#EADEDE]',
      textMuted: 'text-[#B85252]',
      textGray: 'text-gray-300',
      textGrayMuted: 'text-gray-400',
      accent: 'text-[#F58840]',
      accentHover: 'hover:text-[#B85252]',
      accentBg: 'bg-[#F58840]',
      accentBgLight: 'bg-[#F58840]/20',
      accentBgLighter: 'bg-[#F58840]/15',
      accentFrom: 'from-[#F58840]',
      accentTo: 'to-[#B85252]',
      border: 'border-[#F58840]/60',
      borderLight: 'border-[#F58840]/40',
      borderLighter: 'border-[#F58840]/30',
      borderAccent: 'border-[#B85252]/50',
      buttonHover: 'hover:bg-gradient-to-r hover:from-[#F58840] hover:to-[#B85252]',
      shadow: 'shadow-[#F58840]/60',
      shadowLight: 'shadow-[#F58840]/40',
      shadowLighter: 'shadow-[#F58840]/20',
      gradient: 'from-[#F58840] to-[#B85252]',
      gradientText: 'bg-gradient-to-r from-[#F58840] to-[#B85252] bg-clip-text text-transparent',
      // Specific component colors
      cardBorder: 'border-[#F58840]/30',
      cardBorderHover: 'hover:border-[#F58840]/50',
      inputBg: 'bg-[#F58840]/20',
      inputBorder: 'border-[#F58840]/50',
      inputFocus: 'focus:border-[#F58840]',
      badgeBg: 'bg-[#F58840]/30',
      badgeBorder: 'border-[#F58840]/50',
      badgeText: 'text-[#EADEDE]',
      dotBg: 'bg-[#F58840]',
      orbBg: 'bg-[#F58840]/15',
      gridColor: 'rgba(245, 136, 64, 0.1)',
    },
    // Light Theme Colors (White & #64748b)
    light: {
      bg: 'from-white via-white to-white',
      bgSolid: 'bg-white',
      bgSecondary: 'bg-white/90',
      bgCard: 'bg-[#64748b]/10',
      bgCardHover: 'hover:bg-[#64748b]/15',
      bgButton: 'bg-[#64748b]',
      bgButtonHover: 'hover:bg-[#64748b]/90',
      text: 'text-[#64748b]',
      textWhite: 'text-[#64748b]',
      textSecondary: 'text-[#64748b]',
      textMuted: 'text-[#64748b]',
      textGray: 'text-[#64748b]',
      textGrayMuted: 'text-[#64748b]/70',
      accent: 'text-[#64748b]',
      accentHover: 'hover:text-[#64748b]',
      accentBg: 'bg-[#64748b]',
      accentBgLight: 'bg-[#64748b]/20',
      accentBgLighter: 'bg-[#64748b]/10',
      accentFrom: 'from-[#64748b]',
      accentTo: 'to-[#64748b]',
      border: 'border-[#64748b]/50',
      borderLight: 'border-[#64748b]/30',
      borderLighter: 'border-[#64748b]/20',
      borderAccent: 'border-[#64748b]/40',
      buttonHover: 'hover:bg-gradient-to-r hover:from-[#64748b] hover:to-[#64748b]',
      shadow: 'shadow-[#64748b]/40',
      shadowLight: 'shadow-[#64748b]/30',
      shadowLighter: 'shadow-[#64748b]/15',
      gradient: 'from-[#64748b] to-[#64748b]',
      gradientText: 'bg-gradient-to-r from-[#64748b] to-[#64748b] bg-clip-text text-transparent',
      // Specific component colors
      cardBorder: 'border-[#64748b]/30',
      cardBorderHover: 'hover:border-[#64748b]/50',
      inputBg: 'bg-[#64748b]/20',
      inputBorder: 'border-[#64748b]/50',
      inputFocus: 'focus:border-[#64748b]',
      badgeBg: 'bg-[#64748b]/20',
      badgeBorder: 'border-[#64748b]/40',
      badgeText: 'text-[#64748b]',
      dotBg: 'bg-[#64748b]',
      orbBg: 'bg-[#64748b]/10',
      gridColor: 'rgba(100, 116, 139, 0.15)',
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isTransitioning, transitionDirection, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
