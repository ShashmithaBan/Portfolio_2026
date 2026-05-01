import React, { useState, useContext } from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import Footer from '../components/Footer';

export default function Experience() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  const [expandedProject, setExpandedProject] = useState(null);

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
      github: 'https://github.com/ShashmithaBan/Kubernetics_Voting_App',
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
      github: 'https://github.com/ShashmithaBan/AWS-Infra-Automation',
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
      github: 'https://github.com/ShashmithaBan/React-cloud-deploy.git',
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
      liveDemo: false,
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
      github: 'https://github.com/ShashmithaBan/Wordpress-Webapp-Docker-Compose.git',
    },
    {
      title: 'Enterprise Pipeline Governance',
      company: 'Personal Project / DevOps & CI/CD Engineering',
      year: '2025',
      image: '/github.png',
      description: 'Controlled GitHub Actions workflow demonstrating job dependencies, conditions, and manual approvals.',
      fullDescription:
        'Designed and implemented a GitHub Actions workflow focused on controlling job execution using dependencies (`needs`) and conditional logic. Configured manual triggers with `workflow_dispatch`, scheduled executions, and environment-based approval gates to simulate enterprise CI/CD governance and controlled release flows.',
      tools: ['GitHub Actions', 'YAML', 'CI/CD Logic', 'Workflow Conditions', 'Environment Protection'],
      color: 'from-[#E8F9FF] to-[#C5BAFF]',
      github: 'https://github.com/ShashmithaBan/Controlling_Workflow-_Job_Execution_Githubaction',
    },
  ];

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 lg:pt-16 pb-28 sm:pb-32 lg:pb-12 ${currentTheme.text} relative overflow-hidden`}>
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
          <ScrollReveal>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-mono font-bold leading-tight mb-3 ${currentTheme.textWhite}`}>
              My{' '}
              <span className={isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}>Projects</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className={`text-sm lg:text-base max-w-2xl ${currentTheme.textSecondary}`}>
              A showcase of impactful projects and experiences that demonstrate my expertise in DevOps
              and cloud technologies.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <SpotlightCard
                  className={`group rounded-2xl overflow-hidden backdrop-blur-sm border h-full transition-all duration-300 ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover}`}
                >
                  <button
                    type="button"
                    className="flex flex-col cursor-pointer text-left w-full h-full"
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  >
                    {/* Project Image */}
                    <div className="relative h-44 sm:h-36 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-base sm:text-lg font-mono font-bold mb-1.5 ${currentTheme.textWhite}`}>
                            {project.title}
                          </h3>
                          <div className={`flex items-center gap-2 text-xs ${currentTheme.textGrayMuted}`}>
                            <Calendar size={14} />
                            <span>
                              {project.year} &middot; {project.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 flex-1 ${currentTheme.textGrayMuted}`}>
                        {project.description}
                      </p>

                      {/* Tools Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs transition-colors backdrop-blur-sm ${
                              isDark
                                ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                : 'bg-black/5 border border-black/10 text-gray-600 hover:bg-black/10'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Expanded Content */}
                      {expandedProject === index && (
                        <div className={`mt-4 pt-4 animate-fadeInUp`}>
                          <div className={`${isDark ? 'gradient-line-dark' : 'gradient-line-light'} mb-4`} />
                          <p className={`text-sm mb-4 ${currentTheme.textGray}`}>
                            {project.fullDescription}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center ${
                                  isDark
                                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                                    : 'bg-black/5 border border-black/10 hover:bg-black/10 text-gray-800'
                                }`}
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center ${
                                  isDark
                                    ? 'bg-[#F58840]/20 border border-[#F58840]/30 text-[#F58840]'
                                    : 'bg-[#64748b]/20 border border-[#64748b]/30 text-[#64748b]'
                                }`}
                              >
                                <ExternalLink size={16} />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
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
