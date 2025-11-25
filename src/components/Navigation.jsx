import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold min-w-fit">
          <span className="text-white">noah</span>
          <span className="text-orange-500">.</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-12 text-sm absolute left-1/2 transform -translate-x-1/2">
          <a href="#home" className="text-white hover:text-orange-400 transition">Home</a>
          <a href="#skills" className="text-white hover:text-orange-400 transition">Skills</a>
          <a href="#experience" className="text-white hover:text-orange-400 transition">Experience</a>
          <a href="#contact" className="text-white hover:text-orange-400 transition">Connect</a>
        </nav>

        {/* Download Resume Button */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full hover:border-orange-400 hover:text-orange-400 transition text-sm text-white">
            <span>Download</span>
            <span className="text-xs">↓</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <nav className="flex flex-col gap-4 px-6 py-6">
            <a href="#home" className="text-white hover:text-orange-400 transition">Home</a>
            <a href="#skills" className="text-white hover:text-orange-400 transition">Skills</a>
            <a href="#experience" className="text-white hover:text-orange-400 transition">Experience</a>
            <a href="#contact" className="text-white hover:text-orange-400 transition">Connect</a>
            <button className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-full transition text-sm text-white">
              Download
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
