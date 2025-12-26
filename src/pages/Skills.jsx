import React, { useState, useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { socialLinks } from '../config/socialLinks';

export default function Skills() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Level color configuration for both themes - Modern & Vibrant with animations
  const getLevelStyles = (level) => {
    const levelColors = {
      'Advanced': {
        dark: 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 border border-emerald-400/50 animate-pulse-subtle',
        light: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-400 animate-pulse-subtle'
      },
      'Intermediate': {
        dark: 'bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border border-orange-400/50 animate-pulse-subtle',
        light: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400 animate-pulse-subtle'
      },
      'Beginner': {
        dark: 'bg-gradient-to-r from-violet-500/30 to-purple-500/30 text-violet-300 border border-violet-400/50 animate-pulse-subtle',
        light: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border border-violet-400 animate-pulse-subtle'
      }
    };
    return levelColors[level]?.[isDark ? 'dark' : 'light'] || levelColors['Beginner'][isDark ? 'dark' : 'light'];
  };

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const skills = [
    { 
      name: 'Terraform', 
      icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png', 
      color: ' to-yellow-600',
      description: 'Infrastructure as Code',
      level: 'Advanced'
    },
    { 
      name: 'Docker', 
      icon: '/logo/images-Photoroom.png', 
      color: ' to-blue-900',
      description: 'Containerization',
      level: 'Advanced'
    },
    { 
      name: 'Kubernetes', 
      icon: '/logo/Kubernetes-Logo.wine.png', 
      color: ' to-blue-900',
      description: 'Orchestration',
      level: 'Advanced'
    },
    { 
      name: 'AWS', 
      icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png', 
      color: ' to-orange-900',
      description: 'Cloud Computing',
      level: 'Intermediate'
    },
    { 
      name: 'Linux', 
      icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png', 
      color: ' to-orange-900',
      description: 'Operating System',
      level: 'Advanced'
    },
    { 
      name: 'Jenkins', 
      icon: '/logo/jenkins.svg', 
      color: 'to-white',
      description: 'CI/CD Automation',
      level: 'Advanced'
    },
    { 
      name: 'GitHub', 
      icon: '/logo/25231.png', 
      color: 'to-white',
      description: 'Version Control',
      level: 'Advanced'
    },
    { 
      name: 'Github Actions', 
      icon: '/logo/action.png', 
      color: ' to-blue-900',
      description: 'CI/CD Automation',
      level: 'Advanced'
    },
    { 
      name: 'Bash Scripting', 
      icon: '/logo/bash.png', 
      color: ' to-white',
      description: 'Scripting Language',
      level: 'Intermediate'
    },
    { 
      name: 'React', 
      icon: '/logo/react-1.svg', 
      color: ' to-cyan-900',
      description: 'Frontend Framework',
      level: 'Intermediate'
    },
    { 
      name: 'Spring Boot', 
      icon: '/logo/spring-boot-logo-icon.webp', 
      color: ' to-green-900',
      description: 'Backend Framework',
      level: 'Intermediate'
    },
    { 
      name: 'Node.js', 
      icon: '/logo/node.png', 
      color: ' to-green-900',
      description: 'Backend Development',
      level: 'Beginner'
    },
    { 
      name: 'PHP', 
      icon: '/logo/php.png', 
      color: ' to-blue-900',
      description: 'Web Development',
      level: 'Intermediate'
    },
    
    { 
      name: 'Tailwind CSS', 
      icon: '/logo/tail.png', 
      color: ' to-blue-900',
      description: 'Frontend Styling',
      level: 'Intermediate'
    },
    { 
      name: 'Bootstrap', 
      icon: '/logo/boost.png', 
      color: ' to-yellow-600',
      description: 'CSS Framework',
      level: 'Intermediate'
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} pt-6 sm:pt-8 lg:pt-16 pb-24 sm:pb-32 lg:pb-12 ${currentTheme.text} relative overflow-hidden`}>
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
        <div className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${currentTheme.orbBg}`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 animate-fadeInUp">
          <h1 className={`text-6xl lg:text-7xl font-mono font-bold leading-tight mb-4 ${currentTheme.textWhite}`}>
            My <span className={currentTheme.gradientText}>Skills</span>
          </h1>
          <p className={`text-lg max-w-2xl ${currentTheme.textSecondary}`}>
            A comprehensive collection of technologies and tools I've mastered to build scalable, efficient, and innovative solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group animate-rotateIn h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300 h-full cursor-pointer border shadow-lg hover:shadow-xl ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} ${currentTheme.shadowLighter}`}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow Effect on Hover */}
                  <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${skill.color} blur-2xl -z-10`}></div>

                  {/* Icon Container with cleaner styling */}
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 ${currentTheme.accentBgLighter} ${currentTheme.cardBorder} ${currentTheme.bgCardHover}`}>
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-12 h-12 object-contain drop-shadow-none"
                    />
                  </div>

                  {/* Content with better spacing */}
                  <h3 className={`text-lg font-mono font-bold mb-2 ${currentTheme.textWhite}`}>{skill.name}</h3>
                  <p className={`text-sm mb-4 leading-relaxed ${currentTheme.textGrayMuted}`}>{skill.description}</p>
                  
                  {/* Level Badge with color-coded styling */}
                  <div className={`flex items-center justify-between pt-3 border-t ${currentTheme.borderLighter}`}>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-default ${getLevelStyles(skill.level)}`}>
                      {skill.level}
                    </span>
                    <ArrowRight size={16} className={`${currentTheme.accent} group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t ${currentTheme.borderLighter}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <p className={`text-xs sm:text-sm ${currentTheme.textGrayMuted}`}>© 2026 Shashmitha Banadara. All rights reserved.</p>
              
              {/* Social Links */}
              <div className="flex gap-2 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-1.5 sm:p-2 rounded-full border transition-all duration-300 hover:scale-110 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}
                  >
                    <social.icon className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${currentTheme.accentHover}`} />
                  </a>
                ))}
              </div>

              <div className="flex gap-4 sm:gap-6">
                <Link to="/about" className={`transition-colors text-xs sm:text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>About</Link>
                <Link to="/connect" className={`transition-colors text-xs sm:text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
