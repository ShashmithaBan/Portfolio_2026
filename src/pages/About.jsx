import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import SpotlightCard from '../components/SpotlightCard';
import Footer from '../components/Footer';

export default function About() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  const achievements = [
    {
      title: 'Vice Chairperson (2023/24)',
      organization: 'IEEE Student Branch – University of Kelaniya',
      description: 'Leading initiatives and fostering technical excellence within the student community.',
    },
    {
      title: 'Editorial Lead (2022/23)',
      organization: 'IEEE Student Branch – University of Kelaniya',
      description: 'Managed content and communications for technical publications and newsletters.',
    },
    {
      title: 'Team Leader of Digital Media Avenue (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Directed digital media strategy and content creation initiatives.',
    },
    {
      title: 'Most Outstanding PR Coordinator (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Recognized for exceptional public relations management and strategic communications.',
    },
    {
      title: 'Most Outstanding PR Campaign (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Led award-winning public relations campaigns with measurable impact.',
    },
  ];

  const stats = [
    { label: 'Years Experience', value: 2, suffix: '+' },
    { label: 'Projects Built', value: 6, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
    { label: 'Leadership Roles', value: 5, suffix: '' },
  ];

  return (
    <div className={`min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-28 sm:pb-32 lg:pb-20 ${currentTheme.text}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <div className={`relative w-40 h-40 lg:w-48 lg:h-48 rounded-full p-1 ${isDark ? 'animate-glow-dark' : 'animate-glow-light'}`}>
                <div className={`w-full h-full rounded-full border-2 p-1.5 ${isDark ? 'border-[#F58840]/40' : 'border-[#64748b]/30'}`}>
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src="/Shashmitha.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className={`text-3xl lg:text-5xl font-mono font-bold mb-3 ${currentTheme.textWhite}`}>
              Hi, I'm{' '}
              <span className={isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}>
                Shashmitha
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className={`text-xs sm:text-sm lg:text-base font-mono font-semibold mb-5 ${currentTheme.textSecondary}`}>
              Final Year Undergraduate | DevOps Enthusiast | Full Stack Developer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={`max-w-3xl mx-auto space-y-4 leading-relaxed ${currentTheme.textGray}`}>
              <p className="text-xs sm:text-sm lg:text-base">
                Passionate Software Engineering Undergraduate at the{' '}
                <span className={`font-semibold ${currentTheme.accent}`}>
                  University of Kelaniya, Sri Lanka
                </span>
                , with a strong enthusiasm for DevOps and modern cloud technologies.
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                Currently interning as a{' '}
                <span className={`font-semibold ${currentTheme.accent}`}>DevOps Engineer at H2O.ai</span>,
                where I contribute to infrastructure automation and cloud deployment workflows. Skilled in{' '}
                <span className={`font-semibold ${currentTheme.accent}`}>
                  AWS, Docker, Linux, Terraform and Kubernetes (K8s)
                </span>
                , with hands-on experience in building automated and scalable solutions.
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                I'm driven by a desire to leverage technology to create impactful and innovative systems
                that make a real difference.
              </p>
              <div className={`pt-4`}>
                <div className={`${isDark ? 'gradient-line-dark' : 'gradient-line-light'} mb-6`} />
                <p className="text-xs sm:text-sm lg:text-base mb-4">
                  <span className={currentTheme.accent}>Beyond academics,</span> I actively engage in
                  leadership and community initiatives — serving as the{' '}
                  <span className={`font-semibold ${currentTheme.accent}`}>Vice Chairperson (2023/24)</span>{' '}
                  of the{' '}
                  <span className={currentTheme.accent}>IEEE Student Branch – University of Kelaniya</span>{' '}
                  and the{' '}
                  <span className={`font-semibold ${currentTheme.accent}`}>Editorial Lead (2022/23)</span> of
                  the same branch.
                </p>
                <p className="text-xs sm:text-sm lg:text-base">
                  In the{' '}
                  <span className={currentTheme.accent}>
                    Rotaract Club of the University of Kelaniya
                  </span>
                  , I was the{' '}
                  <span className={`font-semibold ${currentTheme.accent}`}>
                    Team Leader of the Digital Media Avenue (2022/23)
                  </span>{' '}
                  and was honored with awards for{' '}
                  <span className={`font-semibold ${currentTheme.accent}`}>
                    Most Outstanding PR Coordinator
                  </span>{' '}
                  and{' '}
                  <span className={`font-semibold ${currentTheme.accent}`}>
                    Most Outstanding PR Campaign (2022/23)
                  </span>{' '}
                  for my contributions to public relations and digital media efforts.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated Stats */}
        <ScrollReveal delay={0.1}>
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-4 px-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:snap-none lg:mx-0 lg:px-0 lg:pb-0 mb-16"
            style={{ scrollbarWidth: 'none' }}
          >
            {stats.map((stat, index) => (
              <SpotlightCard
                key={stat.label}
                className={`min-w-[140px] snap-center flex-shrink-0 lg:min-w-0 text-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} animate-stagger-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`text-sm ${currentTheme.textGrayMuted}`}>{stat.label}</p>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Achievements Section */}
        <ScrollReveal>
          <h2 className={`text-2xl sm:text-3xl font-mono font-bold mb-10 text-center ${currentTheme.textWhite}`}>
            Leadership &{' '}
            <span className={isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}>Achievements</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-4 mb-20">
          {achievements.map((achievement, index) => (
            <ScrollReveal
              key={`achievement-${achievement.title.replaceAll(/\s+/g, '-').toLowerCase()}`}
              delay={index * 0.08}
              direction="left"
            >
              <SpotlightCard
                className={`p-4 sm:p-6 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} ${currentTheme.bgCardHover}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-3 h-3 mt-2 rounded-full ${currentTheme.dotBg} ${isDark ? 'shadow-[0_0_8px_rgba(245,136,64,0.4)]' : ''}`} />
                  <div className="flex-grow">
                    <h3 className={`text-xl font-mono font-semibold mb-2 ${currentTheme.textWhite}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm font-medium mb-2 ${currentTheme.accent}`}>
                      {achievement.organization}
                    </p>
                    <p className={`leading-relaxed ${currentTheme.textGrayMuted}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <Footer links={[{ to: '/skills', label: 'Skills' }, { to: '/connect', label: 'Contact' }]} />
      </div>
    </div>
  );
}
