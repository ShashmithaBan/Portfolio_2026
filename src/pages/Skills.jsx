import React, { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import Footer from '../components/Footer';

export default function Skills() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  const getLevelStyles = (level) => {
    const levelColors = {
      Advanced: {
        dark: 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 border border-emerald-400/50',
        light: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-400',
      },
      Intermediate: {
        dark: 'bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border border-orange-400/50',
        light: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400',
      },
      Beginner: {
        dark: 'bg-gradient-to-r from-violet-500/30 to-purple-500/30 text-violet-300 border border-violet-400/50',
        light: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border border-violet-400',
      },
    };
    return levelColors[level]?.[isDark ? 'dark' : 'light'] || levelColors['Beginner'][isDark ? 'dark' : 'light'];
  };

  const skills = [
    { name: 'Terraform', icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png', description: 'Infrastructure as Code', level: 'Advanced', featured: true },
    { name: 'Docker', icon: '/logo/images-Photoroom.png', description: 'Containerization', level: 'Advanced' },
    { name: 'Kubernetes', icon: '/logo/Kubernetes-Logo.wine.png', description: 'Orchestration', level: 'Advanced' },
    { name: 'AWS', icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png', description: 'Cloud Computing', level: 'Intermediate' },
    { name: 'Linux', icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png', description: 'Operating System', level: 'Advanced', featured: true },
    { name: 'Jenkins', icon: '/logo/jenkins.svg', description: 'CI/CD Automation', level: 'Advanced' },
    { name: 'GitHub', icon: '/logo/25231.png', description: 'Version Control', level: 'Advanced' },
    { name: 'Github Actions', icon: '/logo/action.png', description: 'CI/CD Automation', level: 'Advanced', featured: true },
    { name: 'Bash Scripting', icon: '/logo/bash.png', description: 'Scripting Language', level: 'Intermediate' },
    { name: 'React', icon: '/logo/react-1.svg', description: 'Frontend Framework', level: 'Intermediate' },
    { name: 'Spring Boot', icon: '/logo/spring-boot-logo-icon.webp', description: 'Backend Framework', level: 'Intermediate' },
    { name: 'Node.js', icon: '/logo/node.png', description: 'Backend Development', level: 'Beginner' },
    { name: 'PHP', icon: '/logo/php.png', description: 'Web Development', level: 'Intermediate' },
    { name: 'Tailwind CSS', icon: '/logo/tail.png', description: 'Frontend Styling', level: 'Intermediate' },
    { name: 'Bootstrap', icon: '/logo/boost.png', description: 'CSS Framework', level: 'Intermediate' },
  ];

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 lg:pt-16 pb-28 sm:pb-32 lg:pb-12 ${currentTheme.text} relative overflow-hidden`}>
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
          <ScrollReveal>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-mono font-bold leading-tight mb-3 ${currentTheme.textWhite}`}>
              My{' '}
              <span className={isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}>Skills</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className={`text-sm lg:text-base max-w-2xl ${currentTheme.textSecondary}`}>
              A comprehensive collection of technologies and tools I've mastered to build scalable,
              efficient, and innovative solutions.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {skills.map((skill, index) => (
              <ScrollReveal
                key={skill.name}
                delay={index * 0.05}
                className={skill.featured ? 'col-span-2' : ''}
              >
                <SpotlightCard
                  className={`group p-3 sm:p-4 rounded-xl backdrop-blur-md border shadow-lg h-full transition-all duration-300 ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} ${currentTheme.shadowLighter}`}
                >
                  {skill.featured ? (
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${currentTheme.accentBgLighter} ${currentTheme.cardBorder}`}
                      >
                        <img src={skill.icon} alt={skill.name} className="w-6 h-6 sm:w-9 sm:h-9 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xs sm:text-sm font-mono font-bold mb-1 ${currentTheme.textWhite}`}>
                          {skill.name}
                        </h3>
                        <p className={`text-xs mb-2 ${currentTheme.textGrayMuted}`}>{skill.description}</p>
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full inline-block ${getLevelStyles(skill.level)}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <ArrowRight
                        size={18}
                        className={`${currentTheme.accent} group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0`}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 ${currentTheme.accentBgLighter} ${currentTheme.cardBorder} ${currentTheme.bgCardHover}`}
                      >
                        <img src={skill.icon} alt={skill.name} className="w-6 h-6 sm:w-9 sm:h-9 object-contain" />
                      </div>
                      <h3 className={`text-xs sm:text-sm font-mono font-bold mb-1.5 ${currentTheme.textWhite}`}>
                        {skill.name}
                      </h3>
                      <p className={`text-xs mb-3 leading-relaxed hidden sm:block ${currentTheme.textGrayMuted}`}>
                        {skill.description}
                      </p>
                      <div className={`flex items-center justify-between pt-3`}>
                        <div className={`${isDark ? 'gradient-line-dark' : 'gradient-line-light'} absolute left-6 right-6`} style={{ top: 'auto' }} />
                        <span
                          className={`text-[10px] sm:text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full ${getLevelStyles(skill.level)}`}
                        >
                          {skill.level}
                        </span>
                        <ArrowRight
                          size={16}
                          className={`${currentTheme.accent} group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100`}
                        />
                      </div>
                    </>
                  )}
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <Footer links={[{ to: '/about', label: 'About' }, { to: '/connect', label: 'Contact' }]} />
      </div>
    </div>
  );
}
