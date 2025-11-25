import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
    const activeSection = 'home';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A0C00]/40 backdrop-blur-md border-b border-white/10">
            <div className="mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold min-w-fit z-10">
                    <span className="text-white font-sans font-medium">Shashmitha</span>
                    <span className="text-orange-500">.</span>
                </div>

                {/* Desktop Navigation - Centered Pill Container */}
                <nav className="hidden lg:flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Main Navigation Wrapper - The pill background */}
                    <div className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2 rounded-full bg-[#1A0C00]/10 backdrop-blur-sm border border-gray-700/50">
                        {['home', 'skills', 'experience', 'connect'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-poppins font-medium transition-all duration-300 tracking-wide whitespace-nowrap transform hover:scale-105
                  ${activeSection === item
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:shadow-md'
                                }`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* Download Resume Button - Desktop Only */}
                <div className="hidden lg:flex items-center gap-2 z-10">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-full backdrop-blur-sm hover:bg-orange-600 hover:font-bold hover:border-orange-600 hover:scale-110 transition-all duration-300 text-sm tracking-wide whitespace-nowrap transform">
                        <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                        </svg>
                        <span className='font-sans'>Download Resume</span>
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm border-t border-white/10 animate-in fade-in duration-300">
                    <nav className="flex flex-col gap-4 px-6 py-6">
                        <a href="#home" className="text-white hover:text-orange-400 hover:translate-x-2 transition-all duration-300 text-base font-poppins font-medium transform">Home</a>
                        <a href="#skills" className="text-white hover:text-orange-400 hover:translate-x-2 transition-all duration-300 text-base font-poppins font-medium transform">Skills</a>
                        <a href="#experience" className="text-white hover:text-orange-400 hover:translate-x-2 transition-all duration-300 text-base font-poppins font-medium transform">Experience</a>
                        <a href="#contact" className="text-white hover:text-orange-400 hover:translate-x-2 transition-all duration-300 text-base font-poppins font-medium transform">Connect</a>
                        <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 hover:scale-105 rounded-full transition-all duration-300 font-poppins font-semibold text-sm text-white tracking-wide w-full transform">
                            Download Resume
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}