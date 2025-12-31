import React, { useState, useContext } from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { socialLinks } from '../config/socialLinks';

export default function Experience() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  const [expandedProject, setExpandedProject] = useState(null);

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: `exp-star-${i}`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const projects = [
  {
    title: 'Kubernetes Voting App',
    company: 'Personal Project',
    year: '2025',
    image: '/kubernetics.png',
    description: 'Deployed a multi-container microservices voting application on Kubernetes using Minikube.',
    fullDescription:
      'Deployed a Docker-based voting application on a local Kubernetes cluster using Minikube. Configured multiple Deployments and Services including Vote, Redis, Worker, Database, and Result components within a dedicated namespace. Exposed frontend services via NodePort and validated inter-service communication, demonstrating hands-on experience with Kubernetes orchestration and microservices networking.',
    tools: ['Kubernetes', 'Minikube', 'Docker'],
    color: 'to-yellow-600',
    liveDemo: false,
    github: 'https://github.com/ShashmithaBan/Kubernetics_Voting_App'
  },

  {
    title: 'AWS Infrastructure Automation',
    company: 'Personal Project',
    year: '2025',
    image: '/AWS_Infra.png',
    description: 'Infrastructure provisioning automation using Terraform and GitHub Actions.',
    fullDescription:
      'Implemented infrastructure automation using Terraform to provision AWS resources. Integrated GitHub Actions to enable CI/CD-style execution of Terraform workflows, improving repeatability and reducing manual configuration errors. Focused on Infrastructure as Code (IaC) best practices and modular provisioning.',
    tools: ['Terraform', 'GitHub Actions', 'AWS'],
    color: 'to-green-900',
    liveDemo: false,
    github: 'https://github.com/ShashmithaBan/AWS-Infra-Automation'
  },

  {
    title: 'Automated Cloud Deploy System',
    company: 'Personal Project / DevOps Lab',
    year: '2025',
    image: '/react-deploy.jpg',
    description: 'Automated CI/CD pipeline for deploying a containerized React application on AWS.',
    fullDescription:
      'Designed and deployed a containerized React application using Docker and GitHub Actions. Built a CI/CD pipeline triggered by main-branch commits that performs build and image creation before deploying to an AWS EC2 instance. Configured Nginx as a reverse proxy to serve the application and ensured reliable production deployment workflows.',
    tools: ['GitHub Actions', 'Docker', 'AWS EC2', 'Nginx', 'React'],
    color: 'from-[#C4D9FF] to-[#C5BAFF]',
    liveDemo: false,
    github: 'https://github.com/ShashmithaBan/React-cloud-deploy.git'
  },

  {
    title: 'AWS Resource Auditor (Bash)',
    company: 'Personal Project / DevOps Automation',
    year: '2025',
    image: '/shell.png',
    description: 'Automated Bash script for AWS resource visibility and inventory auditing.',
    fullDescription:
      'Developed a Bash automation script utilizing AWS CLI commands to list and audit resources across multiple AWS services including EC2, RDS, IAM, and VPC. The script provides quick infrastructure visibility to support cost analysis, security reviews, and operational audits in AWS environments.',
    tools: ['Bash Scripting', 'AWS CLI', 'Linux', 'IAM'],
    color: 'from-[#E8F9FF] to-[#C4D9FF]',
    github: 'https://github.com/ShashmithaBan/shell_scripting.git',
    liveDemo: false
  },

  {
    title: 'Dockerized WordPress Stack',
    company: 'Personal Project',
    year: '2025',
    image: '/wordpres.jpg',
    description: 'Multi-container WordPress and MySQL stack using Docker Compose.',
    fullDescription:
      'Built a containerized WordPress environment using Docker Compose with MySQL 5.7 as the backend database. Configured persistent volumes and environment variables to ensure data durability and portability. Verified compatibility across different host platforms, including Apple Silicon, enabling consistent local development environments.',
    tools: ['Docker', 'Docker Compose', 'MySQL', 'WordPress'],
    color: 'from-[#C5BAFF] to-[#C4D9FF]',
    liveDemo: false,
    github: 'https://github.com/ShashmithaBan/Wordpress-Webapp-Docker-Compose.git'
  },

  {
    title: 'Enterprise Pipeline Governance',
    company: 'Personal Project / DevOps & CI/CD Engineering',
    year: '2025',
    image: '/github.png',
    description:
      'Controlled GitHub Actions workflow demonstrating job dependencies, conditions, and manual approvals.',
    fullDescription:
      'Designed and implemented a GitHub Actions workflow focused on controlling job execution using dependencies (`needs`) and conditional logic. Configured manual triggers with `workflow_dispatch`, scheduled executions, and environment-based approval gates to simulate enterprise CI/CD governance and controlled release flows.',
    tools: [
      'GitHub Actions',
      'YAML',
      'CI/CD Logic',
      'Workflow Conditions',
      'Environment Protection'
    ],
    color: 'from-[#E8F9FF] to-[#C5BAFF]',
    github: 'https://github.com/ShashmithaBan/Controlling_Workflow-_Job_Execution_Githubaction'
  }
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
                key={project.title}
                className="group animate-slideInLeft"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div 
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-full flex flex-col cursor-pointer ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover}`}
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedProject(expandedProject === index ? null : index)}
                  role="button"
                  tabIndex={0}
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
                      {project.tools.map((tool) => (
                        <span key={tool} className={`px-3 py-1 rounded-full text-xs transition-colors ${currentTheme.badgeBg} ${currentTheme.badgeBorder} ${currentTheme.badgeText} ${currentTheme.bgCardHover}`}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {expandedProject === index && (
                      <div className={`mt-4 pt-4 border-t animate-fadeInUp ${currentTheme.borderLighter}`}>
                        <p className={`text-sm mb-4 ${currentTheme.textGray}`}>{project.fullDescription}</p>
                        <div className="flex gap-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${currentTheme.badgeBg} ${currentTheme.bgCardHover} ${currentTheme.textWhite} hover:scale-105`}
                            >
                              <Github size={16} />
                              View Code
                            </a>
                          )}
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${currentTheme.badgeBg} ${currentTheme.bgCardHover} ${currentTheme.textWhite} hover:scale-105`}
                            >
                              <ExternalLink size={16} />
                              Live Demo
                            </a>
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
                <Link to="/about" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>About</Link>
                <Link to="/connect" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
