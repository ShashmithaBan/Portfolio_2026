import React from 'react';
import { Menu, X } from 'lucide-react';
// Note: You must install lucide-react (npm install lucide-react)

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  // NOTE: You would typically pass 'activeSection' as a prop here 
  // to dynamically apply the active state. For this example, 
  // we'll simulate the 'Home' link as active.
  const activeSection = 'home'; 

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A0C00]/40 backdrop-blur-md border-b border-white/10 ">
      <div className=" mx-auto px-6 py-4 flex justify-around items-center">
        {/* Logo */}
        <div className="text-2xl font-bold min-w-fit z-10">
          <span className="text-white font-poppins">Shashmitha</span>
          <span className="text-orange-500">.</span>
        </div>
        <div>
        {/* Desktop Navigation - Centered Pill Container */}
        <nav className="hidden lg:flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Main Navigation Wrapper - The pill background */}
          <div className="flex items-center space-x-2 p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            {['home', 'skills', 'experience', 'connect'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className={`px-4 py-2 rounded-full text-sm font-poppins font-medium transition-colors duration-200 tracking-wide
                  ${activeSection === item
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' // Active pill style
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/30' // Inactive style
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)} {/* Capitalize for display */}
              </a>
            ))}
          </div>
        </nav>
</div>
        {/* Download Resume Button - Aligned Right */}
        <div className="hidden lg:flex items-center gap-2 z-10">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-400 text-white rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors duration-200 text-sm font-poppins font-medium tracking-wide">
            <span className="sr-only">Download Resume</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>Download Resume</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white z-10"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Simplified for mobile) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <nav className="flex flex-col gap-4 px-6 py-6">
            <a href="#home" className="text-white hover:text-orange-400 transition text-lg font-poppins font-medium">Home</a>
            <a href="#skills" className="text-white hover:text-orange-400 transition text-lg font-poppins font-medium">Skills</a>
            <a href="#experience" className="text-white hover:text-orange-400 transition text-lg font-poppins font-medium">Experience</a>
            <a href="#contact" className="text-white hover:text-orange-400 transition text-lg font-poppins font-medium">Connect</a>
            <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-full transition font-poppins font-semibold text-sm text-white tracking-wide">
              Download Resume
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}