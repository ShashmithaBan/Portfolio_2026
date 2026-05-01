import React, { useContext } from 'react';
import { Mail, Github, Linkedin, Instagram, BookOpen } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import ExperienceSlider from './ExperienceSlider';
import AnimatedTitle from './AnimatedTitle';
import TechMarquee from './TechMarquee';
import ScrollReveal from './ScrollReveal';
import { quickLinks, whatsappConfig } from '../config/socialLinks';

const techItems = [
  { name: 'Terraform', icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png' },
  { name: 'Docker', icon: '/logo/images-Photoroom.png' },
  { name: 'Kubernetes', icon: '/logo/Kubernetes-Logo.wine.png' },
  { name: 'AWS', icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png' },
  { name: 'Linux', icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png' },
  { name: 'GitHub', icon: '/logo/25231.png' },
  { name: 'React', icon: '/logo/react-1.svg' },
  { name: 'Spring Boot', icon: '/logo/spring-boot-logo-icon.webp' },
  { name: 'Jenkins', icon: '/logo/jenkins.svg' },
  { name: 'GitHub Actions', icon: '/logo/action.png' },
  { name: 'Tailwind CSS', icon: '/logo/tail.png' },
  { name: 'Node.js', icon: '/logo/node.png' },
];

const orbitIcons = [
  { name: 'Docker', icon: '/logo/images-Photoroom.png' },
  { name: 'Kubernetes', icon: '/logo/Kubernetes-Logo.wine.png' },
  { name: 'AWS', icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png' },
  { name: 'Terraform', icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png' },
  { name: 'Jenkins', icon: '/logo/jenkins.svg' },
  { name: 'GitHub Actions', icon: '/logo/action.png' },
  { name: 'Linux', icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png' },
  { name: 'React', icon: '/logo/react-1.svg' },
];

const socialButtons = [
  { icon: Instagram, link: quickLinks.instagram },
  { icon: Github, link: quickLinks.github },
  { icon: Linkedin, link: quickLinks.linkedin },
  { icon: BookOpen, link: quickLinks.medium },
  { icon: Mail, link: quickLinks.email },
];

function OrbitRing({ isDark }) {
  const duration = 22;
  const count = orbitIcons.length;
  const accentColor = isDark ? '#F58840' : '#64748b';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden lg:flex">
      {/* SVG orbit trail with gradient depth */}
      <svg
        className="absolute"
        width="460"
        height="240"
        viewBox="0 0 460 240"
        fill="none"
        style={{ filter: `drop-shadow(0 0 6px ${isDark ? 'rgba(245,136,64,0.08)' : 'rgba(100,116,139,0.05)'})` }}
      >
        <defs>
          <linearGradient id="orbit-depth" x1="230" y1="0" x2="230" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.03" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {/* Glow ring */}
        <ellipse cx="230" cy="120" rx="205" ry="95" stroke={accentColor} strokeOpacity="0.04" strokeWidth="6" />
        {/* Sharp ring */}
        <ellipse cx="230" cy="120" rx="205" ry="95" stroke="url(#orbit-depth)" strokeWidth="1" />
      </svg>

      {/* 3D Orbiting icons - each animates individually along elliptical path */}
      {orbitIcons.map((icon, i) => (
        <div
          key={icon.name}
          className="absolute animate-orbit-ellipse"
          style={{ animationDelay: `${-(i / count) * duration}s` }}
        >
          <div
            className={`w-[44px] h-[44px] rounded-2xl backdrop-blur-xl border flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-br from-black/70 to-black/40 border-[#F58840]/20 shadow-[0_4px_20px_rgba(245,136,64,0.12),0_0_0_1px_rgba(245,136,64,0.05)]'
                : 'bg-gradient-to-br from-white/90 to-white/60 border-[#64748b]/15 shadow-[0_4px_20px_rgba(100,116,139,0.1),0_0_0_1px_rgba(100,116,139,0.04)]'
            }`}
          >
            <img src={icon.icon} alt={icon.name} className="w-6 h-6 object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  const handleHireMe = () => {
    window.open(whatsappConfig.getLink(), '_blank');
  };

  return (
    <section className="min-h-screen pt-16 sm:pt-24 lg:pt-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden pb-4 sm:pb-8 lg:pb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="space-y-5 sm:space-y-4 order-2 lg:order-1 text-center sm:text-left">
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center sm:justify-start">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-sm transition-all duration-500 hover:scale-105 animate-float-subtle ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Works @ H2O.ai</span>
            </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-1.5">
              <p className={`text-xs sm:text-xs font-sans font-medium tracking-wide ${currentTheme.accent}`}>
                Hey, I'm{' '}
                <span className={`font-semibold ${isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}`}>
                  Shashmitha Bandara
                </span>
              </p>
              <AnimatedTitle />
              <p className={`text-[10px] sm:text-[11px] lg:text-xs max-w-md leading-relaxed font-mono font-light text-center sm:text-left ${currentTheme.textSecondary}`}>
                Passionate Software Engineering Undergraduate specializing in DevOps and Cloud
                (Kubernetes, Docker, AWS), recognized for outstanding leadership and scalable
                software solutions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center sm:justify-start pt-1">
              <button
                onClick={handleHireMe}
                className={`relative w-full sm:w-auto px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs rounded-full font-mono font-semibold tracking-wide transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#F58840] to-[#B85252] text-black shadow-[0_0_25px_rgba(245,136,64,0.3)] hover:shadow-[0_0_35px_rgba(245,136,64,0.5)]'
                    : 'bg-gradient-to-r from-[#64748b] to-[#475569] text-white shadow-[0_0_25px_rgba(100,116,139,0.2)] hover:shadow-[0_0_35px_rgba(100,116,139,0.35)]'
                }`}
              >
                Contact me
              </button>
              <div className="flex gap-1.5 justify-center sm:justify-start">
                {socialButtons.map(({ icon: Icon, link }) => (
                  <a
                    key={link}
                    href={link}
                    target={link.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`p-2.5 sm:p-2 border rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 backdrop-blur-sm ${
                        isDark
                          ? 'border-white/10 hover:border-[#F58840]/40 hover:bg-[#F58840]/10 hover:shadow-[0_0_15px_rgba(245,136,64,0.15)]'
                          : 'border-black/10 hover:border-[#64748b]/40 hover:bg-[#64748b]/10 hover:shadow-[0_0_15px_rgba(100,116,139,0.1)]'
                      }`}
                    >
                      <Icon size={14} className={currentTheme.accent} />
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <ExperienceSlider />
          </ScrollReveal>
        </div>

        {/* Right Side - Character with 3D orbiting icons */}
        <ScrollReveal direction="right" delay={0.3}>
          <div className="relative flex items-center justify-center order-1 lg:order-2 mt-4 lg:mt-0">
            {/* Background glow */}
            <div
              className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-[100px] ${
                isDark ? 'bg-[#F58840]/10' : 'bg-slate-400/10'
              }`}
            />
            <div
              className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-[80px] ${
                isDark ? 'bg-[#B85252]/8' : 'bg-slate-300/8'
              }`}
              style={{ transform: 'translate(20px, -30px)' }}
            />

            {/* 3D Orbiting DevOps Icons - centered on character */}
            <OrbitRing isDark={isDark} />

            {/* Character image - centered within orbit */}
            <div className={`w-44 h-44 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center relative z-10 rounded-full ${
              isDark
                ? 'ring-2 ring-[#F58840]/30 sm:ring-0 bg-gradient-to-br from-[#F58840]/10 to-[#B85252]/10 sm:from-transparent sm:to-transparent'
                : 'ring-2 ring-[#64748b]/20 sm:ring-0 bg-gradient-to-br from-[#64748b]/10 to-[#475569]/10 sm:from-transparent sm:to-transparent'
            }`}>
              <img
                src="/character.png"
                alt="Shashmitha - DevOps Engineer"
                className={`w-full h-full object-contain cursor-pointer ${
                  isDark ? 'animate-character-float' : 'animate-character-float-light'
                }`}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Tech Stack Marquee */}
      <ScrollReveal delay={0.5} className="mt-4 lg:mt-6 relative z-10">
        <TechMarquee items={techItems} />
      </ScrollReveal>
    </section>
  );
}
