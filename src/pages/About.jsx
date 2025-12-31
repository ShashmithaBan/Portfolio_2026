import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { socialLinks } from '../config/socialLinks';

export default function About() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  const achievements = [
    {
      title: 'Vice Chairperson (2023/24)',
      organization: 'IEEE Student Branch – University of Kelaniya',
      description: 'Leading initiatives and fostering technical excellence within the student community.'
    },
    {
      title: 'Editorial Lead (2022/23)',
      organization: 'IEEE Student Branch – University of Kelaniya',
      description: 'Managed content and communications for technical publications and newsletters.'
    },
    {
      title: 'Team Leader of Digital Media Avenue (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Directed digital media strategy and content creation initiatives.'
    },
    {
      title: 'Most Outstanding PR Coordinator (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Recognized for exceptional public relations management and strategic communications.'
    },
    {
      title: 'Most Outstanding PR Campaign (2022/23)',
      organization: 'Rotaract Club of the University of Kelaniya',
      description: 'Led award-winning public relations campaigns with measurable impact.'
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} pt-20 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-20 ${currentTheme.text}`}>
      {/* Star Background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => ({
          id: `about-star-${i}`,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 2,
        })).map((star) => (
          <div
            key={star.id}
            className="star absolute w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-8">
            <div className={`w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 p-2 bg-linear-to-br transition-all duration-500 hover:shadow-2xl ${currentTheme.cardBorder} ${currentTheme.accentBgLight} ${currentTheme.cardBorderHover} ${currentTheme.shadow}`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                <img 
                  src="/Shashmitha.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className={`text-5xl lg:text-6xl font-mono font-bold mb-4 ${currentTheme.textWhite} animate-fadeInUp`} style={{ animationDelay: '0.1s' }}>
            Hi, I'm <span className={`bg-linear-to-r bg-clip-text text-transparent ${currentTheme.gradient}`}>Shashmitha</span>
          </h1>

          <p className={`text-xl font-mono font-semibold mb-6 ${currentTheme.textSecondary} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
            Final Year Undergraduate | DevOps Enthusiast | Full Stack Developer
          </p>

          <div className={`max-w-3xl mx-auto space-y-6 leading-relaxed ${currentTheme.textGray} animate-fadeInUp`} style={{ animationDelay: '0.3s' }}>
            <p className="text-base lg:text-lg">
              Passionate Software Engineering Undergraduate at the <span className={`font-semibold ${currentTheme.accent}`}>University of Kelaniya, Sri Lanka</span>, with a strong enthusiasm for DevOps and modern cloud technologies.
            </p>

            <p className="text-base lg:text-lg">
              Skilled in <span className={`font-semibold ${currentTheme.accent}`}>AWS, Docker, Linux, Terraform and Kubernetes (K8s)</span>, with hands-on experience in building automated and scalable solutions.
            </p>

            <p className="text-base lg:text-lg">
              I'm driven by a desire to leverage technology to create impactful and innovative systems that make a real difference.
            </p>

            <div className={`pt-4 border-t ${currentTheme.borderLight}`}>
              <p className="text-base lg:text-lg mb-4">
                <span className={currentTheme.accent}>Beyond academics,</span> I actively engage in leadership and community initiatives — serving as the <span className={`font-semibold ${currentTheme.accent}`}>Vice Chairperson (2023/24)</span> of the <span className={currentTheme.accent}>IEEE Student Branch – University of Kelaniya</span> and the <span className={`font-semibold ${currentTheme.accent}`}>Editorial Lead (2022/23)</span> of the same branch.
              </p>

              <p className="text-base lg:text-lg">
                In the <span className={currentTheme.accent}>Rotaract Club of the University of Kelaniya</span>, I was the <span className={`font-semibold ${currentTheme.accent}`}>Team Leader of the Digital Media Avenue (2022/23)</span> and was honored with awards for <span className={`font-semibold ${currentTheme.accent}`}>Most Outstanding PR Coordinator</span> and <span className={`font-semibold ${currentTheme.accent}`}>Most Outstanding PR Campaign (2022/23)</span> for my contributions to public relations and digital media efforts.
              </p>
            </div>

            <p className={`text-base lg:text-lg pt-4 italic ${currentTheme.accent}`}>
              ⚙️ Constantly learning, building, and collaborating to push the boundaries of technology and creativity
            </p>
          </div>
        </div>

        {/* Skills Section */}
        {/* <div className="mb-20">
          <h2 className="text-4xl font-mono font-bold text-white mb-12 text-center">
            Technical <span className="bg-linear-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">Skills</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className={`h-32 rounded-2xl bg-linear-to-br ${skill.color} p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-transparent hover:border-white/20`}>
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-16 h-16 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="text-white font-mono font-semibold text-sm mt-3 text-center">
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Achievements Section */}
        <div className="mb-20 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2 className={`text-4xl font-mono font-bold mb-12 text-center ${currentTheme.textWhite}`}>
            Leadership & <span className={currentTheme.gradientText}>Achievements</span>
          </h2>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] animate-slideInLeft ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} ${currentTheme.bgCardHover}`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-3 h-3 mt-2 rounded-full ${currentTheme.dotBg}`} />
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
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t ${currentTheme.borderLighter} mt-12`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className={`text-sm ${currentTheme.textGrayMuted}`}>© 2026 Shashmitha Banadara. All rights reserved.</p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.link}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}
                  >
                    <social.icon size={18} className={currentTheme.accentHover} />
                  </a>
                ))}
              </div>

              <div className="flex gap-6">
                <Link to="/skills" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Skills</Link>
                <Link to="/connect" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
