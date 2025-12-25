import React, { useState, useContext } from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Experience() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  
  const [expandedProject, setExpandedProject] = useState(null);

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const projects = [
    {
      title: 'Kubernetics_Voting_App',
      company: 'Personal Project',
      year: '2025',
      image: '/kubernetics.png',
      description: 'Deployed a multi-container voting application on Kubernetes',
      fullDescription: 'Deployed a multi-container voting application on Kubernetes using Minikube.onfigured multiple deployments and services (Vote, Redis, Worker, DB, Result) within a dedicated namespace, demonstrating microservice communication, container orchestration, and NodePort exposure for frontend access.',
      tools: ['K8s', 'Minikube', 'Docker'],
      color: ' to-yellow-600',
      liveDemo: false,
    },
    {
      title: 'AWS-Infra-Automation',
      company: 'Personal Project',
      year: '2025',
      image: '/AWS_Infra.png',
      description: 'CI/CD pipeline with Terraform to provisioning the infrastructure',
      fullDescription: 'Designed and implemented a complete CI/CD pipeline using GitHub Actions, Docker for containerization, and Kubernetes for orchestration. Reduced deployment time by 80%.',
      tools: ['Terraform', 'Github Action', 'GitHub'],
      color: ' to-green-900',
      liveDemo: true,
    },
    {
      title: 'Microservices Architecture',
      company: 'Personal Project',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      description: 'Spring Boot microservices with Docker containers',
      fullDescription: 'Developed a microservices-based architecture using Spring Boot framework with Docker containerization. Implemented service mesh for inter-service communication.',
      tools: ['Spring Boot', 'Docker', 'Kubernetes', 'AWS'],
      color: 'to-blue-900'
    },
    {
      title: 'DevOps Monitoring Solution',
      company: 'Personal Project',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1551859300-e2f5e0361ec5?w=800&h=600&fit=crop',
      description: 'Real-time monitoring dashboard for infrastructure',
      fullDescription: 'Created a comprehensive monitoring solution for tracking infrastructure health and performance metrics. Integrated with various DevOps tools for centralized visibility.',
      tools: ['Linux', 'AWS', 'Docker', 'Terraform'],
      color: 'to-orange-900'
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
        <div className="max-w-7xl mx-auto px-6  pt-32 pb-16 animate-fadeInUp">
          <h1 className={`text-6xl lg:text-7xl font-mono font-bold leading-tight mb-4 ${currentTheme.textWhite}`}>
            My <span className={currentTheme.gradientText}>Projects</span>
          </h1>
          <p className={`text-lg max-w-2xl ${currentTheme.textSecondary}`}>
            A showcase of impactful projects and experiences that demonstrate my expertise in DevOps and cloud technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group animate-slideInLeft"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-full flex flex-col cursor-pointer ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover}`}
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`text-2xl font-mono font-bold mb-2 ${currentTheme.textWhite}`}>{project.title}</h3>
                        <div className={`flex items-center gap-2 text-sm ${currentTheme.textGrayMuted}`}>
                          <Calendar size={14} />
                          <span>{project.year} • {project.company}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 flex-1 ${currentTheme.textGrayMuted}`}>{project.description}</p>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs transition-colors ${currentTheme.badgeBg} ${currentTheme.badgeBorder} ${currentTheme.badgeText} ${currentTheme.bgCardHover}`}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {expandedProject === index && (
                      <div className={`mt-4 pt-4 border-t animate-fadeInUp ${currentTheme.borderLighter}`}>
                        <p className={`text-sm mb-4 ${currentTheme.textGray}`}>{project.fullDescription}</p>
                        <div className="flex gap-4">
                          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${currentTheme.badgeBg} ${currentTheme.bgCardHover} ${currentTheme.textWhite}`}>
                            <Github size={16} />
                            View Code
                          </button>
                          {project.liveDemo && (
                          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${currentTheme.badgeBg} ${currentTheme.bgCardHover} ${currentTheme.textWhite}`}>
                            <ExternalLink size={16} />
                            Live Demo
                          </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t ${currentTheme.borderLighter}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className={`text-sm ${currentTheme.textGrayMuted}`}>© 2026 Shashmitha Banadara. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>About</a>
                <a href="#" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
