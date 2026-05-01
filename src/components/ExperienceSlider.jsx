import React, { useState, useEffect, useContext } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

// Helper function to get indicator button styles
const getIndicatorStyles = (index, currentIndex, isDark) => {
  if (index === currentIndex) {
    return isDark ? 'bg-[#F58840] w-6 sm:w-8' : 'bg-[#64748b] w-6 sm:w-8';
  }
  return isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-[#64748b]/40 hover:bg-[#64748b]/60';
};

export default function ExperienceSlider() {
  const { isDark } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const experiences = [
    {
      id: 1,
      company: 'H2O.ai',
      position: 'DevOps Intern',
      years: '2026 - Present',
      description: 'Contributed to H2O.ai\'s DevOps team supporting infrastructure automation, CI/CD pipeline optimization, and cloud deployment workflows. ',
      logo: '/h2o-logo.svg',
      tools: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Infrastructure as Code'],
    },
    {
      id: 2,
      company: 'Ceyentra Technologies',
      position: 'Software Engineer Intern',
      years: '2024 - 2025',
      description: 'Built responsive web applications using React and Tailwind CSS. Collaborated with design teams to implement pixel-perfect UI components and optimized performance contributed to the Visitor Tag Management System .',
      logo: '/ceyentra.jpeg',
      tools: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'],
    },
    {
      id: 3,
      company: 'IEEE Student Branch University of Kelaniya',
      position: 'Vice Chairperson',
      years: '2024 - 2025',
      description: 'At that time I help lead and organize various technical events, workshops, and seminars for students. My role involves coordinating with team members, managing event logistics, and fostering a collaborative environment to enhance the learning experience for all members.',
      logo: '/ieee.png',
      tools: [],
    },
    {
      id: 4,
      company: 'Rotaract Club of University of Kelaniya',
      position: 'Team Leader - Digital media ',
      years: '2023 - 2024',
      description: 'I lead the team managing the club’s online presence, overseeing content creation, digital campaigns, and promotional designs. I strategize to boost engagement and enhance visibility for the club’s key initiatives.',
      logo: '/RACUOK.png',
      tools: ['Adobe Photoshop', 'Canva', 'Adobe Premiere Pro' , 'After Effects'],
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, experiences.length]);

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
    setAutoPlay(true);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    setAutoPlay(true);
  };

  const currentExperience = experiences[currentIndex];

  return (
    <div className={`relative w-full h-auto min-h-48 sm:min-h-56 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 group ${
      isDark
        ? 'bg-[#B85252]/10 border border-[#B85252]/30'
        : 'bg-[#64748b]/10 border border-[#64748b]/30'
    }`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${
        isDark
          ? 'bg-linear-to-br from-black/40 to-transparent'
          : 'bg-linear-to-br from-white/40 to-transparent'
      }`} />

      {/* Content wrapper with animation */}
      <div className="relative h-full flex flex-col justify-between z-10 gap-3 sm:gap-3.5">
        {/* Header with logo and company info */}
        <div className="flex items-start gap-2.5 sm:gap-4">
          {/* Company Logo */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-lg bg-white">
            <img
              src={currentExperience.logo}
              alt={currentExperience.company}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md sm:rounded-lg"
            />
          </div>

          {/* Company and Position */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm sm:text-lg font-mono font-bold truncate ${isDark ? 'text-white' : 'text-[#64748b]'}`}>
              {currentExperience.position}
            </h3>
            <p className={`text-[11px] sm:text-xs font-medium truncate ${isDark ? 'text-[#F58840]' : 'text-[#64748b]'}`}>{currentExperience.company}</p>
            <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isDark ? 'text-[#EADEDE]' : 'text-[#64748b]/70'}`}>{currentExperience.years}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1">
          <p className={`text-[11px] sm:text-xs leading-relaxed font-light line-clamp-2 sm:line-clamp-3 ${isDark ? 'text-gray-300' : 'text-[#64748b]'}`}>
            {currentExperience.description}
          </p>
        </div>

        {/* Tools/Skills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {currentExperience.tools.slice(0, 4).map((tool) => (
            <span
              key={`tool-${tool}`}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-light ${
                isDark
                  ? 'bg-[#F58840]/10 border border-[#F58840]/20 text-[#F58840]'
                  : 'bg-[#64748b]/20 border border-[#64748b]/40 text-[#64748b]'
              }`}
            >
              {tool}
            </span>
          ))}
          {currentExperience.tools.length > 4 && (
            <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-light ${
              isDark
                ? 'bg-[#F58840]/10 border border-[#F58840]/20 text-[#F58840]'
                : 'bg-[#64748b]/20 border border-[#64748b]/40 text-[#64748b]'
            }`}>
              +{currentExperience.tools.length - 4}
            </span>
          )}
        </div>

        {/* Navigation and indicators */}
        <div className="flex items-center justify-between mt-2 sm:mt-0">
          {/* Indicators */}
          <div className="flex gap-1.5 sm:gap-2">
            {experiences.map((exp, index) => (
              <button
                key={`exp-indicator-${exp.id}`}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                  setAutoPlay(true);
                }}
                className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getIndicatorStyles(index, currentIndex, isDark)}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              className={`p-1.5 sm:p-2 rounded-full transition transform hover:scale-110 ${
                isDark
                  ? 'border border-[#F58840]/50 hover:border-[#F58840] hover:bg-[#F58840]/20 text-[#F58840] hover:text-[#F58840]'
                  : 'border border-[#64748b]/50 hover:border-[#64748b] hover:bg-[#64748b]/20 text-[#64748b] hover:text-[#64748b]'
              }`}
              aria-label="Previous experience"
            >
              <ChevronUp size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className={`p-1.5 sm:p-2 rounded-full transition transform hover:scale-110 ${
                isDark
                  ? 'border border-[#F58840]/50 hover:border-[#F58840] hover:bg-[#F58840]/20 text-[#F58840] hover:text-[#F58840]'
                  : 'border border-[#64748b]/50 hover:border-[#64748b] hover:bg-[#64748b]/20 text-[#64748b] hover:text-[#64748b]'
              }`}
              aria-label="Next experience"
            >
              <ChevronDown size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className={`absolute top-4 sm:top-5 right-4 sm:right-6 text-[9px] sm:text-[10px] font-light ${isDark ? 'text-gray-500' : 'text-[#64748b]/60'}`}>
        {currentIndex + 1} / {experiences.length}
      </div>
    </div>
  );
}
