import React, { useContext, useState } from 'react';
import { Home, User, Code, Briefcase, Mail, Moon, Sun, Download, Loader2, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import PropTypes from 'prop-types';

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
    const location = useLocation();
    const currentPath = location.pathname === '/' ? 'home' : location.pathname.substring(1);
    const { isDark, toggleTheme, dark, light } = useContext(ThemeContext);
    const currentTheme = isDark ? dark : light;
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloadComplete, setDownloadComplete] = useState(false);

    // Smooth easing function - easeInOutCubic
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const handleDownload = () => {
        if (isDownloading) return;
        setIsDownloading(true);
        setDownloadProgress(0);
        setDownloadComplete(false);
        
        // Animate using requestAnimationFrame for smooth 60fps animation
        const duration = 2000; // 2 seconds for smoother feel
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const linearProgress = Math.min(elapsed / duration, 1);
            // Apply easing for smooth acceleration/deceleration
            const easedProgress = easeInOutCubic(linearProgress) * 100;
            
            setDownloadProgress(easedProgress);
            
            if (linearProgress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDownloadComplete(true);
                
                // Trigger actual download
                const link = document.createElement('a');
                link.href = '/Shashmitha_Resume.pdf';
                link.download = 'Shashmitha_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
                
                // Reset after showing completion
                setTimeout(() => {
                    setIsDownloading(false);
                    setDownloadProgress(0);
                    setDownloadComplete(false);
                }, 1000);
            }
        };
        
        requestAnimationFrame(animate);
    };

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: User },
        { name: 'Skills', path: '/skills', icon: Code },
        { name: 'Experience', path: '/experience', icon: Briefcase },
        { name: 'Connect', path: '/connect', icon: Mail },
    ];

    return (
        <>
            {/* Desktop Navigation - Shows on large screens (1280px+) */}
            <header className={`hidden xl:block fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isDark ? 'bg-black/10' : 'bg-white/10'}`}>
                <div className="mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className={`text-xl md:text-2xl font-bold min-w-fit z-10 hover:opacity-80 transition-opacity`}>
                        <span className={`${currentTheme.text}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '-0.5px' }}>Shashmitha</span>
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

                        <button 
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`group relative flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm transition-all duration-300 text-sm tracking-wide whitespace-nowrap transform font-sans overflow-hidden ${currentTheme.border} ${!isDownloading ? currentTheme.buttonHover : ''} ${!isDownloading ? 'hover:scale-110' : ''} shadow-lg ${currentTheme.shadowLighter} ${currentTheme.shadow} ${!isDownloading ? 'hover:font-bold' : ''}`}
                        >
                            {/* Green Liquid Fill Animation */}
                            <div 
                                className="absolute inset-0"
                                style={{ 
                                    width: `${downloadProgress}%`,
                                    background: 'linear-gradient(90deg, #10b981, #22c55e, #10b981)',
                                    boxShadow: downloadProgress > 0 ? '0 0 25px rgba(16, 185, 129, 0.6), inset 0 -3px 8px rgba(0,0,0,0.15)' : 'none',
                                    transition: 'box-shadow 0.3s ease'
                                }}
                            >
                                {/* Liquid wave/shimmer effect */}
                                {isDownloading && (
                                    <div 
                                        className="absolute right-0 top-0 bottom-0 w-4 animate-pulse"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                        }}
                                    />
                                )}
                            </div>
                            
                            {/* Text layer (background) - theme aware, turns white on hover */}
                            <span className={`relative z-10 flex items-center gap-2 font-medium transition-colors duration-300 ${isDownloading ? 'text-black' : `${currentTheme.text} group-hover:text-white`}`}>
                                {downloadComplete ? (
                                    <Check className="w-4 h-4" />
                                ) : isDownloading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                    </svg>
                                )}
                                <span>{downloadComplete ? 'Downloaded!' : isDownloading ? `${Math.round(downloadProgress)}%` : 'Download Resume'}</span>
                            </span>
                            
                            {/* White text layer (revealed by liquid) */}
                            <span 
                                className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-white font-medium px-4 py-2"
                                style={{ 
                                    clipPath: `inset(0 ${100 - downloadProgress}% 0 0)`
                                }}
                            >
                                {downloadComplete ? (
                                    <Check className="w-4 h-4" />
                                ) : isDownloading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                    </svg>
                                )}
                                <span>{downloadComplete ? 'Downloaded!' : isDownloading ? `${Math.round(downloadProgress)}%` : 'Download Resume'}</span>
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Tablet Navigation - Shows on iPad/tablet screens (768px - 1279px) */}
            <header className={`hidden md:flex xl:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isDark ? 'bg-black/30' : 'bg-white/80'}`}>
                <div className="w-full px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                        <span className={`${currentTheme.text}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '-0.5px' }}>Shashmitha</span>
                        <span className={isDark ? 'text-yellow-600' : 'text-[#64748b]'}> .</span>
                    </Link>

                    {/* Tablet Navigation - Centered */}
                    <nav className="flex items-center">
                        <div className={`flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-sm ${currentTheme.bgCard} ${currentTheme.cardBorder}`}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.path === '/' ? currentPath === 'home' : currentPath === item.path.substring(1);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap
                                            ${isActive
                                                ? `bg-gradient-to-r ${currentTheme.gradient} ${isDark ? 'text-black' : 'text-white'} shadow-lg ${currentTheme.shadow}`
                                                : `${currentTheme.textGray} ${currentTheme.accentHover} ${currentTheme.bgCardHover}`
                                            }`}
                                    >
                                        <Icon size={16} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Theme Toggle & Resume - Tablet */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${currentTheme.border} ${currentTheme.accent} ${currentTheme.bgCardHover}`}
                            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        <button 
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`relative p-2 rounded-full border transition-all duration-300 overflow-hidden ${!isDownloading ? 'hover:scale-110' : ''} ${currentTheme.border} ${currentTheme.bgCardHover}`}
                            title={downloadComplete ? 'Downloaded!' : isDownloading ? `${Math.round(downloadProgress)}%` : 'Download Resume'}
                        >
                            {/* Green Liquid Fill Animation - Circular */}
                            <div 
                                className="absolute inset-0"
                                style={{ 
                                    height: `${downloadProgress}%`,
                                    bottom: 0,
                                    top: 'auto',
                                    background: 'linear-gradient(0deg, #10b981, #22c55e, #10b981)',
                                    boxShadow: downloadProgress > 0 ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none',
                                    transition: 'box-shadow 0.3s ease'
                                }}
                            >
                                {/* Liquid wave top effect */}
                                {isDownloading && (
                                    <div 
                                        className="absolute top-0 left-0 right-0 h-1.5 animate-pulse"
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)',
                                        }}
                                    />
                                )}
                            </div>
                            {/* Icon layer - theme aware */}
                            <span className={`relative z-10 ${currentTheme.accent}`}>
                                {downloadComplete ? <Check size={20} /> : isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                            </span>
                            {/* White icon layer (revealed by liquid) */}
                            <span 
                                className="absolute inset-0 z-20 flex items-center justify-center text-white"
                                style={{ 
                                    clipPath: `inset(${100 - downloadProgress}% 0 0 0)`
                                }}
                            >
                                {downloadComplete ? <Check size={20} /> : isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Top Bar - Theme & Resume buttons (below 768px) */}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center backdrop-blur-md ${isDark ? 'bg-black/30' : 'bg-white/80'}`}>
                {/* Logo */}
                <Link to="/" className="text-lg font-bold">
                    <span className={`${currentTheme.text}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '-0.5px' }}>Shashmitha</span>
                    <span className={isDark ? 'text-yellow-600' : 'text-[#64748b]'}> .</span>
                </Link>
                
                {/* Theme Toggle & Resume Download */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={toggleTheme}
                        className={`p-2 rounded-full border transition-all duration-300 ${currentTheme.border} ${currentTheme.accent} ${currentTheme.bgCardHover}`}
                        title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    
                    <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`relative p-2 rounded-full border transition-all duration-300 overflow-hidden ${currentTheme.border} ${currentTheme.bgCardHover}`}
                        title={downloadComplete ? 'Downloaded!' : isDownloading ? `${Math.round(downloadProgress)}%` : 'Download Resume'}
                    >
                        {/* Green Liquid Fill Animation - Circular */}
                        <div 
                            className="absolute inset-0"
                            style={{ 
                                height: `${downloadProgress}%`,
                                bottom: 0,
                                top: 'auto',
                                background: 'linear-gradient(0deg, #10b981, #22c55e, #10b981)',
                                boxShadow: downloadProgress > 0 ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none',
                                transition: 'box-shadow 0.3s ease'
                            }}
                        >
                            {/* Liquid wave top effect */}
                            {isDownloading && (
                                <div 
                                    className="absolute top-0 left-0 right-0 h-1.5 animate-pulse"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)',
                                    }}
                                />
                            )}
                        </div>
                        {/* Icon layer - theme aware */}
                        <span className={`relative z-10 ${currentTheme.accent}`}>
                            {downloadComplete ? <Check size={18} /> : isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        </span>
                        {/* White icon layer (revealed by liquid) */}
                        <span 
                            className="absolute inset-0 z-20 flex items-center justify-center text-white"
                            style={{ 
                                clipPath: `inset(${100 - downloadProgress}% 0 0 0)`
                            }}
                        >
                            {downloadComplete ? <Check size={18} /> : isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile App-Style Navigation - Bottom Bar (below 768px) */}
            <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 px-4`}>
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
                </div>
            </div>
        </>
    );
}

Navigation.propTypes = {
    mobileMenuOpen: PropTypes.bool.isRequired,
    setMobileMenuOpen: PropTypes.func.isRequired
};