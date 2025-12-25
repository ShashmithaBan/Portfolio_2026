import React, { useContext } from 'react';
import { Home, User, Code, Briefcase, Mail, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
    const location = useLocation();
    const currentPath = location.pathname === '/' ? 'home' : location.pathname.substring(1);
    const { isDark, toggleTheme, dark, light } = useContext(ThemeContext);
    const currentTheme = isDark ? dark : light;

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: User },
        { name: 'Skills', path: '/skills', icon: Code },
        { name: 'Experience', path: '/experience', icon: Briefcase },
        { name: 'Connect', path: '/connect', icon: Mail },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isDark ? 'bg-black/30' : 'bg-white/80'}`}>
                <div className="mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className={`text-xl md:text-2xl font-bold min-w-fit z-10 hover:opacity-80 transition-opacity`}>
                        <span className={`font-sans font-semibold ${currentTheme.text}`}>Shashmitha</span>
                        <span className={isDark ? 'text-yellow-600' : 'text-[#64748b]'}> .</span>
                    </Link>

                    {/* Desktop Navigation - Centered Pill Container */}
                    <nav className="flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {/* Main Navigation Wrapper - The pill background */}
                        <div className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2 rounded-full backdrop-blur-sm ${currentTheme.bgCard} ${currentTheme.cardBorder}`}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-mono font-medium transition-all duration-300 tracking-wide whitespace-nowrap transform hover:scale-110
                  ${(item.path === '/' ? currentPath === 'home' : currentPath === item.path.substring(1))
                                        ? `bg-gradient-to-r ${currentTheme.gradient} ${isDark ? 'text-black' : 'text-white'} shadow-lg ${currentTheme.shadow} ${currentTheme.borderLight}`
                                        : `${currentTheme.textGray} ${currentTheme.accentHover} ${currentTheme.bgCardHover} border border-transparent`
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Download Resume Button & Theme Toggle - Desktop Only */}
                    <div className="flex items-center gap-4 z-10">
                        {/* Theme Toggle Button */}
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${currentTheme.border} ${currentTheme.accent} ${currentTheme.bgCardHover} ${currentTheme.cardBorderHover} ${currentTheme.shadowLight}`}
                            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a 
                            href="/Shashmitha_Resume.pdf" 
                            download="Shashmitha_Resume.pdf"
                            className={`flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm transition-all duration-300 text-sm tracking-wide whitespace-nowrap transform font-sans ${currentTheme.border} ${currentTheme.text} ${currentTheme.buttonHover} ${isDark ? 'hover:text-black' : 'hover:text-white'} hover:scale-110 shadow-lg ${currentTheme.shadowLighter} ${currentTheme.shadow} hover:font-bold`}
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                            </svg>
                            <span>Download Resume</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Mobile App-Style Navigation - Bottom Bar */}
            <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 px-4`}>
                {/* Mobile App Navigation Bar - Compact Rounded Pill */}
                <div className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full backdrop-blur-lg shadow-2xl ${currentTheme.bgSecondary} ${currentTheme.borderLight}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.path === '/' ? currentPath === 'home' : currentPath === item.path.substring(1);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center justify-center transition-all duration-300 rounded-full ${
                                    isActive
                                        ? `px-4 py-2 bg-gradient-to-r ${currentTheme.gradient} ${isDark ? 'text-black' : 'text-white'} font-light shadow-lg ${currentTheme.shadow}`
                                        : `w-9 h-9 ${currentTheme.textGray} ${currentTheme.accentHover}`
                                }`}
                                title={item.name}
                            >
                                <Icon size={isActive ? 18 : 20} />
                                {isActive && <span className="ml-1.5 text-xs font-mono font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                    
                    {/* Mobile Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className={`ml-2 p-2 rounded-full border transition-all duration-300 ${currentTheme.borderLight} ${currentTheme.accent} ${currentTheme.bgCardHover}`}
                        title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </>
    );
}