import React from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-6">
            <p className="text-orange-500 text-lg font-poppins font-medium tracking-wide">Hey, I am <span className="text-white font-semibold">Noah</span></p>
            <h1 className="text-6xl lg:text-7xl font-display font-bold leading-tight text-white">
              Web<br />developer
            </h1>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit amet, sed do.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 items-center pt-4">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-poppins font-semibold transition transform hover:scale-105 tracking-wide">
              Hire me
            </button>
            <button className="p-3 border border-white/20 hover:border-orange-400 rounded-full transition transform hover:scale-105">
              <Instagram size={20} className="hover:text-orange-400" />
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-orange-400/30 transition">
            <p className="text-sm text-gray-300 leading-relaxed mb-4 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"></div>
              <div>
                <p className="font-poppins font-semibold text-sm text-white">Guest Ali Brohil</p>
                <p className="text-xs text-gray-400 font-light">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - 3D Character and Icons */}
        <div className="relative h-full min-h-96 flex items-center justify-center lg:justify-end">
          {/* Floating Icons */}
          <div className="absolute top-20 left-10 lg:left-auto lg:right-1/3 w-16 h-16 bg-orange-400/20 backdrop-blur-md border border-orange-400/40 rounded-xl flex items-center justify-center text-2xl animate-bounce">
            🎨
          </div>
          <div className="absolute top-40 right-20 lg:right-32 w-16 h-16 bg-blue-400/20 backdrop-blur-md border border-blue-400/40 rounded-xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
            📱
          </div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-green-400/20 backdrop-blur-md border border-green-400/40 rounded-xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>
            ⚙️
          </div>
          <div className="absolute bottom-20 right-1/4 lg:right-1/3 w-16 h-16 bg-purple-400/20 backdrop-blur-md border border-purple-400/40 rounded-xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>
            💡
          </div>

          {/* Character Placeholder */}
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 blur-2xl"></div>
              <p className="text-6xl mt-4">😊</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <p className="text-xs text-gray-400 mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 mx-auto text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
