import React, { useContext } from 'react';
import { Mail, Github, Linkedin, Instagram, ChevronDown, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ExperienceSlider from './ExperienceSlider';
import AnimatedTitle from './AnimatedTitle';
import { quickLinks, whatsappConfig } from '../config/socialLinks';

export default function Hero() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  // Handle Hire Me button - opens WhatsApp with pre-filled message
  const handleHireMe = () => {
    window.open(whatsappConfig.getLink(), '_blank');
  };

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <section className={`min-h-screen pt-20 sm:pt-32 lg:pt-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden pb-24 sm:pb-32 lg:pb-0 bg-gradient-to-br ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Star Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${currentTheme.orbBg}`}></div>
        <div className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${currentTheme.accentBgLighter}`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1 items-center relative z-10 w-full">
        {/* Left Content - Order 1 on mobile, Order 1 on desktop */}
        <div className="space-y-6 sm:space-y-8 order-1">
          {/* Internship Seeking Badge - Minimal */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg animate-float-subtle ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-emerald-500/20' : 'bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100 hover:shadow-emerald-300/30'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Open to Hire
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <p className={`text-sm sm:text-base lg:text-lg font-sans font-medium tracking-wide ${currentTheme.accent}`}>Hey, I'm <span className={`font-semibold ${currentTheme.text}`}>Shashmitha Bandara</span></p>
            <AnimatedTitle />
            <p className={`text-xs sm:text-sm lg:text-base max-w-lg leading-relaxed font-mono font-light ${currentTheme.textSecondary}`}>
             Passionate Software Engineering Undergraduate specializing in DevOps and Cloud (Kubernetes, Docker, AWS), recognized for outstanding leadership and scalable software solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-6 items-center pt-2">
            <button 
              onClick={handleHireMe}
              className={`px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full font-mono font-semibold transition transform hover:scale-105 tracking-wide shadow-lg ${currentTheme.accentBg} ${currentTheme.bgButtonHover} ${isDark ? 'text-black' : 'text-white'} ${currentTheme.shadow}`}
            >
              Hire me
            </button>
            <a href={quickLinks.instagram} target="_blank" rel="noopener noreferrer">
              <button className={`p-2 sm:p-3 border rounded-full transition transform hover:scale-105 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}>
                <Instagram size={18} className={`sm:w-5 sm:h-5 ${currentTheme.accentHover}`} />
              </button>
            </a>
            <a href={quickLinks.github} target="_blank" rel="noopener noreferrer">
              <button className={`p-2 sm:p-3 border rounded-full transition transform hover:scale-105 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}>
                <Github size={18} className={`sm:w-5 sm:h-5 ${currentTheme.accentHover}`} />
              </button>
            </a>
            <a href={quickLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <button className={`p-2 sm:p-3 border rounded-full transition transform hover:scale-105 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}>
                <Linkedin size={18} className={`sm:w-5 sm:h-5 ${currentTheme.accentHover}`} />
              </button>
            </a>
            <a href={quickLinks.medium} target="_blank" rel="noopener noreferrer">
              <button className={`p-2 sm:p-3 border rounded-full transition transform hover:scale-105 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}>
                <BookOpen size={18} className={`sm:w-5 sm:h-5 ${currentTheme.accentHover}`} />
              </button>
            </a>
            <a href={quickLinks.email}>
              <button className={`p-2 sm:p-3 border rounded-full transition transform hover:scale-105 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}>
                <Mail size={18} className={`sm:w-5 sm:h-5 ${currentTheme.accentHover}`} />
              </button>
            </a>
          </div>

          {/* Experience Slider */}
          <ExperienceSlider />

        
        </div>

        {/* Right Side - 3D Character and Icons - Order 2 on mobile (appears after content), Order 2 on desktop */}
        <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-96 flex items-end sm:items-center justify-center lg:justify-end order-2 mt-6 lg:mt-0 pb-4 sm:pb-0">
          
          {/* Orbit Path Visualization - Desktop Only */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ maxWidth: '800px', maxHeight: '600px', left: '58%', top: '40%', transform: 'translate(-50%, -50%)' }}>
            {/* Orbit 1 - 280px radius */}
            <circle cx="50%" cy="50%" r="280" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 2 - 320px radius */}
            <circle cx="50%" cy="50%" r="320" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 3 - 360px radius */}
            <circle cx="50%" cy="50%" r="360" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 4 - 300px radius */}
            <circle cx="50%" cy="50%" r="300" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 5 - 340px radius */}
            <circle cx="50%" cy="50%" r="340" fill="none" stroke="rgba(156, 163, 175, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 6 - 310px radius */}
            <circle cx="50%" cy="50%" r="310" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 7 - 370px radius */}
            <circle cx="50%" cy="50%" r="370" fill="none" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 8 - 330px radius */}
            <circle cx="50%" cy="50%" r="330" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
          </svg>

          {/* Orbiting Icons Container - Synced with SVG center */}
          <div className="absolute flex items-center justify-center pointer-events-none" style={{ left: '58%', top: '40%', transform: 'translate(-50%, -50%)' }}>
            {/* Icon 1 - Terraform */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}>
              <img src="/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png" alt="Terraform" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 2 - Docker */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-blue-400/20 border border-blue-400/40 shadow-blue-400/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/images-Photoroom.png" alt="Docker" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 3 - Kubernetes */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-green-400/20 border border-green-400/40 shadow-green-400/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/Kubernetes-Logo.wine.png" alt="Kubernetes" className="w-52 h-52 object-contain" />
            </div>

            {/* Icon 4 - AWS */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}>
              <img src="/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png" alt="AWS" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 5 - GitHub */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-gray-200/20 border border-gray-400/40 shadow-gray-400/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/25231.png" alt="GitHub" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 6 - Linux */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-orange-400/20 border border-orange-400/40 shadow-orange-400/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png" alt="Linux" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 7 - React */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-cyan-400/20 border border-cyan-400/40 shadow-cyan-400/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/react-1.svg" alt="React" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 8 - Spring Boot */}
            <div className={`orbit-icon absolute w-24 h-24 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden ${isDark ? 'bg-green-500/20 border border-green-500/40 shadow-green-500/20' : `${currentTheme.bgSecondary} ${currentTheme.cardBorder} ${currentTheme.shadowLighter}`}`}>
              <img src="/logo/spring-boot-logo-icon.webp" alt="Spring Boot" className="w-16 h-16 object-contain" />
            </div>
          </div>

          {/* Character Image */}
          <div className="w-80 h-80 mt-20 md:mt-6 sm:w-80 sm:h-80 lg:w-auto lg:h-auto flex items-center justify-center relative z-10">
            <img 
              src="/character.png" 
              alt="Noah - Web Developer" 
              className={`w-full h-full lg:w-lg lg:h-lg object-contain cursor-pointer ${isDark ? 'animate-character-float' : 'animate-character-float-light'}`}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
     
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
         <Link to="/skills" className="inline-block mt-8"></Link>
        <p className="text-xs text-gray-400 mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        </Link>
      </div> */}
      
    </section>
  );
}
