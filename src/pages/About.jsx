import React from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'Terraform', icon: '/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png', color: 'from-purple-600 to-purple-900' },
    { name: 'Docker', icon: '/logo/images-Photoroom.png', color: 'from-blue-500 to-blue-900' },
    { name: 'Kubernetes', icon: '/logo/Kubernetes-Logo.wine.png', color: 'from-green-500 to-green-900' },
    { name: 'AWS', icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png', color: 'from-yellow-500 to-orange-900' },
    { name: 'GitHub', icon: '/logo/25231.png', color: 'from-gray-600 to-gray-900' },
    { name: 'Linux', icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115.webp', color: 'from-orange-500 to-orange-900' },
    { name: 'React', icon: '/logo/react-1.svg', color: 'from-cyan-400 to-cyan-900' },
    { name: 'Spring Boot', icon: '/logo/spring-boot-logo-icon.webp', color: 'from-green-600 to-green-900' },
  ];

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 pt-32 pb-20">
      {/* Star Background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => ({
          id: i,
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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-purple-600/50 p-2 bg-linear-to-br from-purple-600/20 to-purple-900/20 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/50">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                <img 
                  src="/character.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Hi, I'm <span className="bg-linear-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Noah</span>
          </h1>

          <p className="text-xl text-purple-400 font-poppins font-semibold mb-6">
            Final Year Undergraduate | DevOps Enthusiast | Full Stack Developer
          </p>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-300 leading-relaxed">
            <p className="text-base lg:text-lg">
              Passionate Software Engineering Undergraduate at the <span className="text-purple-400 font-semibold">University of Kelaniya, Sri Lanka</span>, with a strong enthusiasm for DevOps and modern cloud technologies.
            </p>

            <p className="text-base lg:text-lg">
              Skilled in <span className="text-purple-400 font-semibold">AWS, Docker, Linux, Terraform and Kubernetes (K8s)</span>, with hands-on experience in building automated and scalable solutions.
            </p>

            <p className="text-base lg:text-lg">
              I'm driven by a desire to leverage technology to create impactful and innovative systems that make a real difference.
            </p>

            <div className="pt-4 border-t border-purple-700/30">
              <p className="text-base lg:text-lg mb-4">
                <span className="text-purple-400">Beyond academics,</span> I actively engage in leadership and community initiatives — serving as the <span className="text-purple-400 font-semibold">Vice Chairperson (2023/24)</span> of the <span className="text-purple-400">IEEE Student Branch – University of Kelaniya</span> and the <span className="text-purple-400 font-semibold">Editorial Lead (2022/23)</span> of the same branch.
              </p>

              <p className="text-base lg:text-lg">
                In the <span className="text-purple-400">Rotaract Club of the University of Kelaniya</span>, I was the <span className="text-purple-400 font-semibold">Team Leader of the Digital Media Avenue (2022/23)</span> and was honored with awards for <span className="text-purple-400 font-semibold">Most Outstanding PR Coordinator</span> and <span className="text-purple-400 font-semibold">Most Outstanding PR Campaign (2022/23)</span> for my contributions to public relations and digital media efforts.
              </p>
            </div>

            <p className="text-base lg:text-lg pt-4 italic text-purple-300">
              ⚙️ Constantly learning, building, and collaborating to push the boundaries of technology and creativity
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            Technical <span className="bg-linear-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Skills</span>
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
                  <p className="text-white font-poppins font-semibold text-sm mt-3 text-center">
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            Leadership & <span className="bg-linear-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Achievements</span>
          </h2>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-6 bg-purple-800/10 backdrop-blur-sm border border-purple-700/30 rounded-2xl hover:border-purple-600/50 hover:bg-purple-800/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 mt-2 bg-purple-500 rounded-full" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-poppins font-semibold text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-purple-400 text-sm font-medium mb-2">
                      {achievement.organization}
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center pt-12 border-t border-purple-700/30">
          <p className="text-gray-400 mb-6">Let's connect and collaborate!</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-4 rounded-full bg-purple-700/20 hover:bg-purple-700/40 transition-all duration-300 hover:-translate-y-2 group">
              <Mail size={24} className="text-purple-400 group-hover:text-purple-300" />
            </a>
            <a href="#" className="p-4 rounded-full bg-purple-700/20 hover:bg-purple-700/40 transition-all duration-300 hover:-translate-y-2 group">
              <Github size={24} className="text-purple-400 group-hover:text-purple-300" />
            </a>
            <a href="#" className="p-4 rounded-full bg-purple-700/20 hover:bg-purple-700/40 transition-all duration-300 hover:-translate-y-2 group">
              <Linkedin size={24} className="text-purple-400 group-hover:text-purple-300" />
            </a>
            <a href="#" className="p-4 rounded-full bg-purple-700/20 hover:bg-purple-700/40 transition-all duration-300 hover:-translate-y-2 group">
              <Instagram size={24} className="text-purple-400 group-hover:text-purple-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
