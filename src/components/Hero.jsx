import React from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import ExperienceSlider from './ExperienceSlider';
import AnimatedTitle from './AnimatedTitle';

export default function Hero() {
  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <section className="min-h-screen pt-32 px-6 flex items-center justify-center relative overflow-hidden pb-96 lg:pb-0">
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-1 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-2">
            <p className="text-purple-700 text-lg font-sans font-medium tracking-wide">Hey, I am <span className="text-white font-semibold">Shashmitha Bandara</span></p>
            <AnimatedTitle />
            <p className="text-gray-300 text-md max-w-lg leading-relaxed font-poppins font-light">
             Passionate Software Engineering Undergraduate specializing in DevOps and Cloud (Kubernetes, Docker, AWS), recognized for outstanding leadership and scalable software solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 items-center pt-2">
            <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 rounded-full font-poppins font-semibold transition transform hover:scale-105 tracking-wide text-white shadow-lg shadow-purple-700/50">
              Hire me
            </button>
            <a href='https://www.instagram.com/shashmitha_001/'>
            <button className="p-3 border border-white/20 hover:border-purple-600 rounded-full transition transform hover:scale-105"   linked="https://www.instagram.com/shashmitha_001/">
              <Instagram size={20} className="hover:text-purple-600" />
             
            </button></a>
             <a href='https://github.com/ShashmithaBan'>
            <button className="p-3 border border-white/20 hover:border-purple-600 rounded-full transition transform hover:scale-105" linked="https://github.com/ShashmithaBan">
              <Github size={20} className="hover:text-purple-600" />
            </button></a>
             <a href='https://www.linkedin.com/in/shashmitha-bandara-90180225a/'>
            <button className="p-3 border border-white/20 hover:border-purple-600 rounded-full transition transform hover:scale-105" linked="https://www.linkedin.com/in/shashmitha-bandara-90180225a/">
              <Linkedin size={20} className="hover:text-purple-600" />
            </button></a>
             <a href='mailto:gimansabandara2001@gmail.com"'>
            <button className="p-3 border border-white/20 hover:border-purple-600 rounded-full transition transform hover:scale-105" linked="mailto:gimansabandara2001@gmail.com">
              <Mail size={20} className="hover:text-purple-600" />
            </button></a>
          </div>

          {/* Experience Slider */}
          <ExperienceSlider />
        </div>

        {/* Right Side - 3D Character and Icons */}
        <div className="relative h-full min-h-96 flex items-center justify-center lg:justify-end">
          
          {/* Orbit Path Visualization - Desktop Only */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ maxWidth: '800px', maxHeight: '600px', left: '58%', top: '40%', transform: 'translate(-50%, -50%)' }}>
            {/* Orbit 1 - 280px radius */}
            <circle cx="50%" cy="50%" r="280" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 2 - 320px radius */}
            <circle cx="50%" cy="50%" r="320" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 3 - 360px radius */}
            <circle cx="50%" cy="50%" r="360" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 4 - 300px radius */}
            <circle cx="50%" cy="50%" r="300" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 5 - 340px radius */}
            <circle cx="50%" cy="50%" r="340" fill="none" stroke="rgba(156, 163, 175, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 6 - 310px radius */}
            <circle cx="50%" cy="50%" r="310" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 7 - 370px radius */}
            <circle cx="50%" cy="50%" r="370" fill="none" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
            {/* Orbit 8 - 330px radius */}
            <circle cx="50%" cy="50%" r="330" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="2" strokeDasharray="10,10" />
          </svg>

          {/* Orbiting Icons Container - Synced with SVG center */}
          <div className="absolute flex items-center justify-center pointer-events-none" style={{ left: '58%', top: '40%', transform: 'translate(-50%, -50%)' }}>
            {/* Icon 1 - Terraform */}
            <div className="orbit-icon absolute w-24 h-24 bg-purple-700/30 backdrop-blur-md border border-purple-600/50 rounded-xl flex items-center justify-center shadow-lg shadow-purple-700/20 pointer-events-auto overflow-hidden">
              <img src="/logo/terraform-hashicorp-logo-920x920-sue-v0-920x613.png" alt="Terraform" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 2 - Docker */}
            <div className="orbit-icon absolute w-24 h-24 bg-blue-400/20 backdrop-blur-md border border-blue-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-blue-400/20 pointer-events-auto overflow-hidden">
              <img src="/logo/images-Photoroom.png" alt="Docker" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 3 - Kubernetes */}
            <div className="orbit-icon absolute w-24 h-24 bg-green-400/20 backdrop-blur-md border border-green-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-green-400/20 pointer-events-auto overflow-hidden">
              <img src="/logo/Kubernetes-Logo.wine.png" alt="Kubernetes" className="w-52 h-52 object-contain" />
            </div>

            {/* Icon 4 - AWS */}
            <div className="orbit-icon absolute w-24 h-24 bg-purple-700/30 backdrop-blur-md border border-purple-600/50 rounded-xl flex items-center justify-center shadow-lg shadow-purple-700/20 pointer-events-auto overflow-hidden">
              <img src="/logo/f48aadd7-3fa2-4218-bebf-597021659f2b-cover-Photoroom.png" alt="AWS" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 5 - GitHub */}
            <div className="orbit-icon absolute w-24 h-24 bg-gray-200/20 backdrop-blur-md border border-gray-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-gray-400/20 pointer-events-auto overflow-hidden">
              <img src="/logo/25231.png" alt="GitHub" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 6 - Linux */}
            <div className="orbit-icon absolute w-24 h-24 bg-orange-400/20 backdrop-blur-md border border-orange-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-orange-400/20 pointer-events-auto overflow-hidden">
              <img src="/logo/computer-illustration-linux-tux-as-logo-illustration-isolated-white-background-tux-penguin-character-258590115-Photoroom.png" alt="Linux" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 7 - React */}
            <div className="orbit-icon absolute w-24 h-24 bg-cyan-400/20 backdrop-blur-md border border-cyan-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/20 pointer-events-auto overflow-hidden">
              <img src="/logo/react-1.svg" alt="React" className="w-16 h-16 object-contain" />
            </div>

            {/* Icon 8 - Spring Boot */}
            <div className="orbit-icon absolute w-24 h-24 bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 pointer-events-auto overflow-hidden">
              <img src="/logo/spring-boot-logo-icon.webp" alt="Spring Boot" className="w-16 h-16 object-contain" />
            </div>
          </div>

          {/* Character Image */}
          <div className="w-lg h-lg flex items-center justify-center bottom-4 relative z-10">
            <img 
              src="/character.png" 
              alt="Noah - Web Developer" 
              className="w-lg h-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-character-float"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <p className="text-xs text-gray-400 mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
