import React, { useState } from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';

export default function Experience() {
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
      title: 'Cloud Infrastructure Automation',
      company: 'Personal Project',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1667372335032-757eb762b760?w=800&h=600&fit=crop',
      description: 'Automated infrastructure provisioning using Terraform and AWS',
      fullDescription: 'Built a complete infrastructure-as-code solution using Terraform to automate AWS resource provisioning. Implemented modular architecture for scalability and maintainability.',
      tools: ['Terraform', 'AWS', 'Docker', 'Linux'],
      color: 'from-purple-600 to-purple-900'
    },
    {
      title: 'Kubernetes Deployment Pipeline',
      company: 'University Project',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=800&h=600&fit=crop',
      description: 'CI/CD pipeline with Kubernetes orchestration',
      fullDescription: 'Designed and implemented a complete CI/CD pipeline using GitHub Actions, Docker for containerization, and Kubernetes for orchestration. Reduced deployment time by 80%.',
      tools: ['Kubernetes', 'Docker', 'GitHub', 'Linux'],
      color: 'from-green-600 to-green-900'
    },
    {
      title: 'Microservices Architecture',
      company: 'IEEE Student Branch Project',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      description: 'Spring Boot microservices with Docker containers',
      fullDescription: 'Developed a microservices-based architecture using Spring Boot framework with Docker containerization. Implemented service mesh for inter-service communication.',
      tools: ['Spring Boot', 'Docker', 'Kubernetes', 'AWS'],
      color: 'from-blue-600 to-blue-900'
    },
    {
      title: 'DevOps Monitoring Solution',
      company: 'Rotaract Club Digital Media',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1551859300-e2f5e0361ec5?w=800&h=600&fit=crop',
      description: 'Real-time monitoring dashboard for infrastructure',
      fullDescription: 'Created a comprehensive monitoring solution for tracking infrastructure health and performance metrics. Integrated with various DevOps tools for centralized visibility.',
      tools: ['Linux', 'AWS', 'Docker', 'Terraform'],
      color: 'from-yellow-600 to-orange-900'
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
            My <span className="bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            A showcase of impactful projects and experiences that demonstrate my expertise in DevOps and cloud technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group animate-slideInLeft"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-purple-800/10 backdrop-blur-sm border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300 h-full flex flex-col cursor-pointer"
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
                        <h3 className="text-2xl font-poppins font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={14} />
                          <span>{project.year} • {project.company}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-700/30 border border-purple-600/50 rounded-full text-xs text-purple-200 hover:bg-purple-700/50 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {expandedProject === index && (
                      <div className="mt-4 pt-4 border-t border-purple-700/30 animate-fadeInUp">
                        <p className="text-gray-300 text-sm mb-4">{project.fullDescription}</p>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 px-4 py-2 bg-purple-700/30 hover:bg-purple-700/50 rounded-lg transition-colors text-sm">
                            <Github size={16} />
                            View Code
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-purple-700/30 hover:bg-purple-700/50 rounded-lg transition-colors text-sm">
                            <ExternalLink size={16} />
                            Live Demo
                          </button>
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
        <div className="border-t border-purple-700/30">
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
