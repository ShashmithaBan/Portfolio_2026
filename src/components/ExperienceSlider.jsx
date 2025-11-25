import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ExperienceSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('up');
  const [autoPlay, setAutoPlay] = useState(true);

  const experiences = [
    {
      id: 1,
      company: 'Tech Startup Inc',
      position: 'Frontend Developer',
      years: '2022 - 2023',
      description: 'Built responsive web applications using React and Tailwind CSS. Collaborated with design teams to implement pixel-perfect UI components and optimized performance.',
      logo: 'https://via.placeholder.com/80/7c3aed/ffffff?text=TSI',
      tools: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'],
    },
    {
      id: 2,
      company: 'Cloud Systems Ltd',
      position: 'Full Stack Developer',
      years: '2023 - 2024',
      description: 'Developed end-to-end web applications with Node.js backend and React frontend. Implemented CI/CD pipelines and containerized applications using Docker.',
      logo: 'https://via.placeholder.com/80/2563eb/ffffff?text=CSL',
      tools: ['Node.js', 'React', 'MongoDB', 'Docker', 'AWS'],
    },
    {
      id: 3,
      company: 'DevOps Solutions',
      position: 'DevOps Engineer',
      years: '2024 - Present',
      description: 'Orchestrated Kubernetes deployments and managed infrastructure on AWS. Implemented monitoring solutions and automated deployment pipelines for microservices.',
      logo: 'https://via.placeholder.com/80/10b981/ffffff?text=DOS',
      tools: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection('up');
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, experiences.length]);

  const handleNext = () => {
    setAutoPlay(false);
    setDirection('up');
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
    setAutoPlay(true);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setDirection('down');
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    setAutoPlay(true);
  };

  const currentExperience = experiences[currentIndex];

  return (
    <div className="relative w-11/12 h-72 bg-purple-900/10 backdrop-blur-md border border-purple-700/30 rounded-3xl p-6 overflow-hidden group">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-950/40 to-transparent rounded-3xl" />

      {/* Content wrapper with animation */}
      <div className="relative h-full flex flex-col justify-between z-10">
        {/* Header with logo and company info */}
        <div className="flex items-start gap-6 mb-4">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-purple-900 flex items-center justify-center shrink-0 shadow-lg">
            <img 
              src={currentExperience.logo} 
              alt={currentExperience.company}
              className="w-16 h-16 object-cover rounded-xl"
            />
          </div>

          {/* Company and Position */}
          <div className="flex-1">
            <h3 className="text-2xl font-poppins font-bold text-white">
              {currentExperience.position}
            </h3>
            <p className="text-purple-300 text-sm font-medium">{currentExperience.company}</p>
            <p className="text-gray-400 text-xs mt-1">{currentExperience.years}</p>
          </div>
        </div>

        {/* Description */}
        <div className="">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            {currentExperience.description}
          </p>
        </div>

        {/* Tools/Skills */}
        <div className="flex flex-wrap gap-2 ">
          {currentExperience.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-700/30 border border-purple-600/50 rounded-full text-xs text-purple-200 font-light"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Navigation and indicators */}
        <div className="flex items-center justify-between">
          {/* Indicators */}
          <div className="flex gap-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                  setAutoPlay(true);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-purple-600/50 hover:border-purple-500 hover:bg-purple-700/20 transition transform hover:scale-110 text-purple-300 hover:text-purple-200"
              aria-label="Previous experience"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-purple-600/50 hover:border-purple-500 hover:bg-purple-700/20 transition transform hover:scale-110 text-purple-300 hover:text-purple-200"
              aria-label="Next experience"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 text-xs text-gray-500 font-light">
        {currentIndex + 1} / {experiences.length}
      </div>
    </div>
  );
}
