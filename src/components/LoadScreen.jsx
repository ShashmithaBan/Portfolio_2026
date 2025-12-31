import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';

// Helper function to get stage styles based on state and theme
const getStageStyles = (index, stageIndex, isDark) => {
  if (index < stageIndex) {
    return isDark 
      ? 'bg-[#F58840]/40 border border-[#B85252] text-white shadow-lg shadow-[#B85252]/30'
      : 'bg-[#64748b]/20 border border-[#64748b]/40 text-[#64748b] shadow-lg shadow-[#64748b]/20';
  }
  if (index === stageIndex) {
    return isDark
      ? 'bg-gradient-to-r from-[#F58840] to-[#B85252] border border-[#B85252] text-white shadow-lg shadow-[#B85252]/50 scale-105'
      : 'bg-gradient-to-r from-[#64748b] to-[#64748b] border border-[#64748b]/60 text-white shadow-lg shadow-[#64748b]/40 scale-105';
  }
  return isDark
    ? 'bg-slate-800/30 border border-slate-700/30 text-gray-500'
    : 'bg-white/80 border border-[#64748b]/20 text-[#64748b]';
};

// Helper function to get connector styles
const getConnectorStyles = (index, stageIndex, isDark) => {
  if (index < stageIndex) {
    return isDark ? 'bg-[#B85252]' : 'bg-[#64748b]';
  }
  return isDark ? 'bg-slate-700/30' : 'bg-[#64748b]/40';
};

export default function LoadScreen({ onVisibilityChange }) {
  const { isDark } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    { title: 'Initializing', icon: '⚡', description: 'Spinning up containers...' },
    { title: 'Building', icon: '🔨', description: 'Compiling Docker images...' },
    { title: 'Testing', icon: '🧪', description: 'Running automated tests...' },
    { title: 'Deploying', icon: '🚀', description: 'Pushing to Kubernetes cluster...' },
    { title: 'Live', icon: '✨', description: 'Production deployment complete!' },
  ];

  useEffect(() => {
    setIsVisible(true);
    if (onVisibilityChange) {
      onVisibilityChange(true);
    }

    // Update stage every 600ms
    const stageInterval = setInterval(() => {
      setStageIndex(prev => (prev + 1) % stages.length);
    }, 600);

    // Animate progress from 0 to 100 over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 25;
        return Math.min(next, 100);
      });
    }, 250);

    // Hide the loading screen after 3 seconds
    const hideTimer = setTimeout(() => {
      setProgress(100);
      setStageIndex(stages.length - 1);
      setTimeout(() => {
        setIsVisible(false);
        if (onVisibilityChange) {
          onVisibilityChange(false);
        }
      }, 200);
    }, 3000);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, [onVisibilityChange]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
      isVisible 
        ? 'opacity-100' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* Light gradient background with grid */}
      <div className={`absolute inset-0 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-black via-slate-900 to-black'
          : 'bg-white'
      }`}>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: isDark
            ? 'linear-gradient(0deg, transparent 24%, rgba(251, 191, 36, 0.1) 25%, rgba(251, 191, 36, 0.1) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.1) 75%, rgba(251, 191, 36, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(251, 191, 36, 0.1) 25%, rgba(251, 191, 36, 0.1) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.1) 75%, rgba(251, 191, 36, 0.1) 76%, transparent 77%, transparent)'
            : 'linear-gradient(0deg, transparent 24%, rgba(100, 116, 139, 0.15) 25%, rgba(100, 116, 139, 0.15) 26%, transparent 27%, transparent 74%, rgba(100, 116, 139, 0.15) 75%, rgba(100, 116, 139, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(100, 116, 139, 0.15) 25%, rgba(100, 116, 139, 0.15) 26%, transparent 27%, transparent 74%, rgba(100, 116, 139, 0.15) 75%, rgba(100, 116, 139, 0.15) 76%, transparent 77%, transparent)',
          backgroundSize: '100px 100px',
        }} />
        
        {/* Floating orbs */}
        <div className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-[#B85252]/15' : 'bg-[#64748b]/10'}`}></div>
        <div className={`absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-[#F58840]/15' : 'bg-[#64748b]/10'}`} style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          {/* Main circular progress */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-32 h-32">
              {/* Outer rotating ring */}
              <div className={`absolute inset-0 rounded-full border-4 border-transparent animate-spin ${isDark ? 'border-t-[#F58840] border-r-[#B85252]' : 'border-t-[#64748b] border-r-[#64748b]'}`} style={{ animationDuration: '2s' }}></div>
              
              {/* Inner pulsing ring */}
              <div className={`absolute inset-4 rounded-full border-2 animate-pulse ${isDark ? 'border-[#F58840]/40' : 'border-[#64748b]/30'}`}></div>
              
              {/* Center progress text with emoji */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl mb-2 animate-bounce">{stages[stageIndex].icon}</div>
                <div className={`text-2xl font-mono font-bold ${isDark ? 'text-[#F58840]' : 'text-[#64748b]'}`}>{Math.round(progress)}%</div>
              </div>
            </div>
          </div>

          {/* DevOps Pipeline Stages */}
          <div className="mb-12 flex justify-between items-center gap-1 px-2">
            {stages.map((s, index) => (
              <React.Fragment key={`stage-${s.title.replaceAll(/\s+/g, '-').toLowerCase()}`}>
                <div className={`flex-1 py-2 px-2 rounded-lg flex flex-col items-center justify-center text-xs font-mono transition-all duration-300 ${getStageStyles(index, stageIndex, isDark)}`}>
                  <span className="text-lg mb-1">{s.icon}</span>
                  <span className="font-semibold text-center leading-tight">{s.title}</span>
                </div>
                {index < stages.length - 1 && (
                  <div className={`h-1 flex-1 transition-all duration-300 ${getConnectorStyles(index, stageIndex, isDark)}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* DevOps Stage Description */}
          <div className="mb-8">
            <h2 className={`text-2xl font-mono font-bold mb-2 transition-all duration-300 ${isDark ? 'text-white' : 'text-[#64748b]'}`}>{stages[stageIndex].title}</h2>
            <p className={`font-mono text-sm h-6 transition-all duration-300 ${isDark ? 'text-[#F58840]' : 'text-[#64748b]'}`}>
              {stages[stageIndex].description}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className={`h-2 rounded-full overflow-hidden border ${isDark ? 'bg-slate-800/50 border-yellow-600/40' : 'bg-white border-[#64748b]/30'}`}>
              <div 
                className={`h-full transition-all duration-300 rounded-full shadow-lg ${isDark ? 'bg-gradient-to-r from-[#F58840] via-[#B85252] to-[#B85252] shadow-[#B85252]/50' : 'bg-gradient-to-r from-[#64748b] to-[#64748b] shadow-[#64748b]/40'}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={`dot-${i}`}
                className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#F58840]' : 'bg-[#64748b]'}`}
                style={{
                  animation: 'pulse 1.4s infinite',
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

LoadScreen.propTypes = {
  onVisibilityChange: PropTypes.func
};
