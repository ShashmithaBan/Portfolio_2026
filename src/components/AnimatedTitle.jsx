import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function AnimatedTitle() {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="min-h-24 lg:min-h-32">
      <h1 className={`text-5xl lg:text-6xl font-mono font-bold leading-tight ${isDark ? 'text-white' : 'text-[#64748b]'}`}>
       Devops  <br/> Enthusiast
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
}
