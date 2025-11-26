import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

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
      color: 'from-purple-600 to-purple-900',
      description: 'Infrastructure as Code',
      level: 'Advanced'
    },
    { 
      name: 'Docker', 
      icon: '/logo/images-Photoroom.png', 
      color: 'from-blue-500 to-blue-900',
      description: 'Containerization',
      level: 'Advanced'
    },
    { 
      name: 'Kubernetes', 
      icon: '/logo/Kubernetes-Logo.wine.png', 
      color: 'from-green-500 to-green-900',
      description: 'Orchestration',
      level: 'Intermediate'
    },
    { 
      name: 'AWS', 
      icon: '/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png', 
      color: 'from-yellow-500 to-orange-900',
      description: 'Cloud Computing',
      level: 'Intermediate'
    },
    { 
      name: 'Linux', 
      icon: '/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115.webp', 
      color: 'from-orange-500 to-orange-900',
      description: 'Operating System',
      level: 'Advanced'
    },
    { 
      name: 'GitHub', 
      icon: '/logo/25231.png', 
      color: 'from-gray-600 to-gray-900',
      description: 'Version Control',
      level: 'Advanced'
    },
    { 
      name: 'React', 
      icon: '/logo/react-1.svg', 
      color: 'from-cyan-400 to-cyan-900',
      description: 'Frontend Framework',
      level: 'Intermediate'
    },
    { 
      name: 'Spring Boot', 
      icon: '/logo/spring-boot-logo-icon.webp', 
      color: 'from-green-600 to-green-900',
      description: 'Backend Framework',
      level: 'Beginner'
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
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
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 animate-fadeInUp">
          <h1 className="text-6xl lg:text-7xl font-display font-bold leading-tight text-white mb-4">
            My <span className="bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            A comprehensive collection of technologies and tools I've mastered to build scalable, efficient, and innovative solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group animate-rotateIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="relative p-6 rounded-2xl bg-purple-800/10 backdrop-blur-sm border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300 hover:bg-purple-800/20 cursor-pointer h-full"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow Effect on Hover */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${skill.color} blur-xl -z-10`}></div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${skill.color} p-3 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-12 h-12 object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-poppins font-semibold text-white mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{skill.description}</p>
                  
                  {/* Level Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      skill.level === 'Advanced' 
                        ? 'bg-green-500/20 text-green-300' 
                        : skill.level === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {skill.level}
                    </span>
                    <ArrowRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-700/30 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-400 text-sm">© 2026 Noah. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
