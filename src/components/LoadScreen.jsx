import React, { useEffect, useState } from 'react';

export default function LoadScreen({ onVisibilityChange }) {
  const [isVisible, setIsVisible] = useState(true);
  const [autoIndex, setAutoIndex] = useState(0);

  const tools = [
    { name: 'Terraform', icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png', color: 'from-purple-600 to-purple-900' },
    { name: 'Docker', icon: '/logo/images-Photoroom.png', color: 'from-purple-600 to-purple-900' },
    { name: 'AWS', icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png', color: 'from-purple-600 to-purple-900'},
    { name: 'GitHub', icon: '/logo/25231.png', color: 'from-purple-600 to-purple-900' },
    { name: 'Linux', icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png', color: 'from-purple-600 to-purple-900'},
    { name: 'React', icon: '/logo/react-1.svg', color: 'from-purple-600 to-purple-900' },
    { name: 'Spring Boot', icon: '/logo/spring-boot-logo-icon.webp', color: 'from-purple-600 to-purple-900' },
    { name: 'Kubernetes', icon: '/logo/Kubernetes-Logo.wine.png', color: 'from-purple-600 to-purple-900' },
  ];

  // Auto-play animation on all screens: show immediately, advance 2 tools per second, hide after 4s
  useEffect(() => {
    setIsVisible(true);
    if (onVisibilityChange) {
      onVisibilityChange(true);
    }
    setAutoIndex(0);

    const TOOL_INTERVAL_MS = 500; // 2 tools per second
    const TOTAL_DURATION_MS = 4000; // show for 4 seconds

    const interval = setInterval(() => {
      setAutoIndex((prev) => prev + 1);
    }, TOOL_INTERVAL_MS);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      if (onVisibilityChange) {
        onVisibilityChange(false);
      }
      clearInterval(interval);
    }, TOTAL_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [onVisibilityChange]);

  // Get current tool
  const currentToolIndex = Math.min(autoIndex, tools.length - 1);
  const currentTool = tools[currentToolIndex];
  const toolProgress = autoIndex % 1; // For animation transitions

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
      isVisible 
        ? 'opacity-100' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-purple-950 to-slate-900" />

      {/* Loading Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Tool Icon */}
        <div className={`mb-6 lg:mb-8 transition-all duration-500 transform ${toolProgress < 0.5 ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
          <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-linear-to-br ${currentTool.color} p-6 lg:p-8 flex items-center justify-center shadow-2xl shadow-purple-900/50 animate-pulse`}>
            <img 
              src={currentTool.icon} 
              alt={currentTool.name}
              className="w-24 h-24 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Tool Name */}
        <h2 className="text-3xl lg:text-5xl font-poppins font-bold text-white mb-3 lg:mb-4 text-center transition-all duration-500 px-4">
          {currentTool.name}
        </h2>

        {/* Progress Bar */}
        <div className="w-56 lg:w-64 h-1 bg-gray-700/30 rounded-full overflow-hidden mb-6 lg:mb-8">
          <div 
            className="h-full bg-linear-to-r from-purple-600 to-purple-400 transition-all duration-300"
            style={{ width: `${(currentToolIndex / tools.length) * 100}%` }}
          />
        </div>

        {/* Tool Counter */}
        <p className="text-gray-400 text-xs lg:text-sm font-light">
          Showcasing DevOps Tools • {currentToolIndex + 1} / {tools.length}
        </p>

        {/* Progress Percentage */}
        <div className="absolute top-8 right-8 text-gray-400">
          <p className="text-sm font-light">{Math.round((currentToolIndex / tools.length) * 100)}%</p>
        </div>
      </div>
    </div>
  );
}
