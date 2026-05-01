import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Home, User, Code, Briefcase, Mail, Moon, Sun, Download, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import PropTypes from 'prop-types';

const isNavItemActive = (itemPath, currentPath) => {
    return itemPath === '/' ? currentPath === 'home' : currentPath === itemPath.substring(1);
};

function ThemeToggle({ isDark, toggleTheme, size = 'md' }) {
    const sizes = {
        sm: { track: 'w-14 h-7', thumb: 'w-5 h-5', icon: 12, translate: 30, padding: 'p-1' },
        md: { track: 'w-16 h-8', thumb: 'w-6 h-6', icon: 14, translate: 32, padding: 'p-1' },
    };
    const s = sizes[size] || sizes.md;

    return (
        <button
            onClick={toggleTheme}
            className="relative group cursor-pointer"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
            {/* Animated flowing gradient glow */}
            <div
                className={`absolute -inset-[2px] rounded-full overflow-hidden transition-opacity duration-500 ${
                    isDark ? 'opacity-70 group-hover:opacity-100' : 'opacity-0'
                }`}
                style={{ filter: 'blur(3px)' }}
            >
                <div
                    className="absolute inset-y-0 w-[200%]"
                    style={{
                        background: isDark
                            ? 'linear-gradient(90deg, #F58840, #B85252, #ff6b35, #F58840, #B85252, #ff6b35)'
                            : 'linear-gradient(90deg, #64748b, #94a3b8, #475569, #64748b, #94a3b8, #475569)',
                        animation: 'gradient-slide 3s linear infinite',
                        willChange: 'transform',
                    }}
                />
            </div>

            {/* Track */}
            <div className={`relative ${s.track} ${s.padding} rounded-full overflow-hidden border ${
                isDark
                    ? 'bg-gradient-to-r from-[#1a0a00] via-[#0d0808] to-[#0a0505] border-[#F58840]/20'
                    : 'bg-gradient-to-r from-[#e2e8f0] via-[#f1f5f9] to-[#e8ecf0] border-[#64748b]/15'
            }`}>
                {/* Animated color wave inside track */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div
                        className="absolute inset-y-0 w-[200%] transition-opacity duration-500"
                        style={{
                            opacity: isDark ? 1 : 0,
                            background: 'linear-gradient(90deg, transparent, rgba(245,136,64,0.2), rgba(184,82,82,0.1), transparent, rgba(245,136,64,0.2), rgba(184,82,82,0.1))',
                            animation: 'gradient-slide 4s linear infinite',
                            willChange: 'transform',
                        }}
                    />
                    <div
                        className="absolute inset-y-0 w-[200%] transition-opacity duration-500"
                        style={{
                            opacity: isDark ? 0 : 1,
                            background: 'linear-gradient(90deg, transparent, rgba(100,116,139,0.15), rgba(148,163,184,0.1), transparent, rgba(100,116,139,0.15), rgba(148,163,184,0.1))',
                            animation: 'gradient-slide-reverse 4s linear infinite',
                            willChange: 'transform',
                        }}
                    />
                </div>

                {/* Twinkling stars (dark mode) */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.div
                        animate={{ opacity: isDark ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute w-1 h-1 bg-[#F58840] rounded-full top-[5px] left-[10px]" style={{ animation: 'toggle-twinkle 2s ease-in-out infinite' }} />
                        <div className="absolute w-[5px] h-[5px] bg-[#F58840]/50 rounded-full top-[3px] left-[22px]" style={{ animation: 'toggle-twinkle 2.5s ease-in-out infinite 0.5s' }} />
                        <div className="absolute w-1 h-1 bg-[#B85252] rounded-full bottom-[4px] left-[16px]" style={{ animation: 'toggle-twinkle 2s ease-in-out infinite 1s' }} />
                        <div className="absolute w-[5px] h-[5px] bg-[#ff6b35]/40 rounded-full top-[14px] left-[7px]" style={{ animation: 'toggle-twinkle 2.5s ease-in-out infinite 1.5s' }} />
                    </motion.div>
                </div>

                {/* Cloud wisps (light mode) */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.div
                        animate={{ opacity: isDark ? 0 : 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute w-4 h-1.5 bg-[#64748b]/15 rounded-full top-[5px] right-[8px] blur-[1px]" style={{ animation: 'float-wisp 3s ease-in-out infinite' }} />
                        <div className="absolute w-5 h-2 bg-[#94a3b8]/10 rounded-full bottom-[5px] right-[14px] blur-[1px]" style={{ animation: 'float-wisp 3s ease-in-out infinite 1s' }} />
                    </motion.div>
                </div>

                {/* Sliding thumb */}
                <motion.div
                    className={`relative ${s.thumb} rounded-full flex items-center justify-center z-10`}
                    animate={{ x: isDark ? s.translate : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                >
                    {/* Spinning accent ring */}
                    <div
                        className="absolute -inset-[3px] rounded-full"
                        style={{
                            background: isDark
                                ? 'conic-gradient(from 0deg, transparent 55%, rgba(245,136,64,0.9) 70%, rgba(255,107,53,0.6) 85%, transparent 100%)'
                                : 'conic-gradient(from 0deg, transparent 55%, rgba(148,163,184,0.7) 70%, rgba(100,116,139,0.5) 85%, transparent 100%)',
                            animation: 'spin-slow 2.5s linear infinite',
                            willChange: 'transform',
                        }}
                    />

                    {/* Thumb body */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: isDark
                                ? 'linear-gradient(135deg, #F58840, #ff8c42, #B85252)'
                                : 'linear-gradient(135deg, #94a3b8, #64748b, #475569)',
                            boxShadow: isDark
                                ? '0 0 14px rgba(245,136,64,0.6), 0 0 28px rgba(245,136,64,0.15), inset 0 1px 1px rgba(255,255,255,0.15)'
                                : '0 0 10px rgba(100,116,139,0.4), 0 0 20px rgba(100,116,139,0.1), inset 0 1px 1px rgba(255,255,255,0.35)',
                        }}
                    />

                    {/* Icon */}
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -120, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 120, scale: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                                className="relative z-10"
                            >
                                <Moon size={s.icon} className="text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]" strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: 120, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: -120, scale: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                                className="relative z-10"
                            >
                                <Sun size={s.icon} className="text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]" strokeWidth={2.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </button>
    );
}

ThemeToggle.propTypes = {
    isDark: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    size: PropTypes.string,
};

function ConfettiParticle({ index, color }) {
    const angle = (index / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distance = 30 + Math.random() * 40;
    const size = 3 + Math.random() * 4;

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                background: color,
                top: '50%',
                left: '50%',
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        />
    );
}

ConfettiParticle.propTypes = {
    index: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

function CircularProgress({ progress, size, strokeWidth, isDark }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
            style={{ margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                strokeWidth={strokeWidth}
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: offset }}
            />
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>
            </defs>
        </svg>
    );
}

CircularProgress.propTypes = {
    progress: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    isDark: PropTypes.bool.isRequired,
};

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
    const location = useLocation();
    const currentPath = location.pathname === '/' ? 'home' : location.pathname.substring(1);
    const { isDark, toggleTheme, dark, light } = useContext(ThemeContext);
    const currentTheme = isDark ? dark : light;
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const confettiColors = isDark
        ? ['#10b981', '#34d399', '#F58840', '#fbbf24', '#60a5fa']
        : ['#10b981', '#34d399', '#64748b', '#6366f1', '#f59e0b'];

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const handleDownload = useCallback(() => {
        if (isDownloading) return;
        setIsDownloading(true);
        setDownloadProgress(0);
        setDownloadComplete(false);
        setShowConfetti(false);

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const linearProgress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(linearProgress) * 100;
            setDownloadProgress(easedProgress);

            if (linearProgress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDownloadComplete(true);
                setShowConfetti(true);
                const link = document.createElement('a');
                link.href = '/Shashmitha_Resume.pdf';
                link.download = 'Shashmitha_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => {
                    setIsDownloading(false);
                    setDownloadProgress(0);
                    setDownloadComplete(false);
                    setShowConfetti(false);
                }, 1500);
            }
        };
        requestAnimationFrame(animate);
    }, [isDownloading]);

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: User },
        { name: 'Skills', path: '/skills', icon: Code },
        { name: 'Experience', path: '/experience', icon: Briefcase },
        { name: 'Connect', path: '/connect', icon: Mail },
    ];

    const pillTransition = { type: 'spring', stiffness: 400, damping: 30 };

    const iconVariants = {
        idle: { rotate: 0, y: 0, scale: 1 },
        downloading: {
            y: [0, -2, 0],
            transition: { y: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' } },
        },
        complete: {
            scale: [0, 1.3, 1],
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
    };

    const getDesktopIconState = () => {
        if (downloadComplete) return 'complete';
        if (isDownloading) return 'downloading';
        return 'idle';
    };

    return (
        <>
            {/* Desktop Navigation (1280px+) */}
            <header className={`hidden xl:block fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/20' : 'bg-white/20'}`}>
                <div className={`mx-auto px-4 md:px-6 py-4 flex justify-between items-center border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <Link to="/" className="min-w-fit z-10 group flex items-center gap-0.5">
                        <span
                          className={`text-lg font-bold tracking-tight transition-all duration-300 group-hover:tracking-normal ${isDark ? 'text-white' : 'text-gray-900'}`}
                          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}
                        >
                          Shashmitha
                        </span>
                        <span
                          className={`text-2xl font-black transition-all duration-300 group-hover:scale-125 ${isDark ? 'text-[#F58840]' : 'text-[#F58840]'}`}
                          style={{ lineHeight: 0.8 }}
                        >
                          .
                        </span>
                    </Link>

                    <nav className="flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-md border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                            {navItems.map((item) => {
                                const isActive = isNavItemActive(item.path, currentPath);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="relative px-4 py-1.5 text-xs font-mono font-medium tracking-wide whitespace-nowrap"
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="desktop-nav-pill"
                                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTheme.gradient} shadow-lg`}
                                                style={{ boxShadow: isDark ? '0 0 20px rgba(245, 136, 64, 0.3)' : '0 0 20px rgba(100, 116, 139, 0.2)' }}
                                                transition={pillTransition}
                                            />
                                        )}
                                        <span className={`relative z-10 transition-colors duration-200 ${isActive ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800')}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="flex items-center gap-3 z-10">
                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="md" />

                        {/* Desktop Download Button */}
                        <motion.button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            whileHover={!isDownloading ? { scale: 1.05 } : {}}
                            whileTap={!isDownloading ? { scale: 0.97 } : {}}
                            className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-sm text-xs tracking-wide whitespace-nowrap overflow-hidden transition-all duration-500 ${
                                downloadComplete
                                    ? 'border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                                    : isDownloading
                                        ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                        : isDark
                                            ? 'border-[#F58840]/40 hover:border-[#F58840]/70 hover:shadow-[0_0_25px_rgba(245,136,64,0.25)]'
                                            : 'border-[#64748b]/30 hover:border-[#64748b]/60 hover:shadow-[0_0_25px_rgba(100,116,139,0.2)]'
                            }`}
                        >
                            {/* Animated gradient fill */}
                            <motion.div
                                className="absolute inset-0 origin-left"
                                style={{
                                    background: 'linear-gradient(90deg, #059669, #10b981, #34d399, #10b981)',
                                    backgroundSize: '200% 100%',
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: downloadProgress / 100,
                                    backgroundPosition: isDownloading ? ['0% 0%', '100% 0%'] : '0% 0%',
                                }}
                                transition={{
                                    scaleX: { duration: 0.1 },
                                    backgroundPosition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                                }}
                            />

                            {/* Glow leading edge */}
                            {isDownloading && !downloadComplete && (
                                <motion.div
                                    className="absolute top-0 bottom-0 w-8"
                                    style={{
                                        left: `${downloadProgress}%`,
                                        transform: 'translateX(-50%)',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                        filter: 'blur(4px)',
                                    }}
                                />
                            )}

                            {/* Success glow pulse */}
                            <AnimatePresence>
                                {downloadComplete && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ background: 'rgba(16,185,129,0.15)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Icon */}
                            <motion.span
                                className="relative z-10"
                                variants={iconVariants}
                                animate={getDesktopIconState()}
                            >
                                <AnimatePresence mode="wait">
                                    {downloadComplete ? (
                                        <motion.span
                                            key="check"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                        >
                                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                        </motion.span>
                                    ) : isDownloading ? (
                                        <motion.span
                                            key="progress"
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                                        >
                                            <Download className={`w-4 h-4 ${isDark ? 'text-white' : 'text-white'}`} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="idle"
                                            className={`${currentTheme.text} group-hover:text-white transition-colors duration-300`}
                                            whileHover={{ rotate: 12 }}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                            </svg>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.span>

                            {/* Text */}
                            <span className="relative z-10 font-medium overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {downloadComplete ? (
                                        <motion.span
                                            key="done"
                                            className="text-white flex items-center gap-1"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Downloaded!
                                        </motion.span>
                                    ) : isDownloading ? (
                                        <motion.span
                                            key="downloading"
                                            className="text-white tabular-nums"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {Math.round(downloadProgress)}%
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="idle"
                                            className={`${currentTheme.text} group-hover:text-white transition-colors duration-300`}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Download Resume
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </span>

                            {/* Confetti burst */}
                            <AnimatePresence>
                                {showConfetti && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <ConfettiParticle
                                                key={`desktop-confetti-${i}`}
                                                index={i}
                                                color={confettiColors[i % confettiColors.length]}
                                            />
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Tablet Navigation (768px - 1279px) */}
            <header className={`hidden md:flex xl:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/20' : 'bg-white/20'}`}>
                <div className={`w-full px-6 py-4 flex justify-between items-center border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <Link to="/" className="group flex items-center gap-0.5">
                        <span
                          className={`text-lg font-bold tracking-tight transition-all duration-300 group-hover:tracking-normal ${isDark ? 'text-white' : 'text-gray-900'}`}
                          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}
                        >
                          Shashmitha
                        </span>
                        <span
                          className={`text-2xl font-black transition-all duration-300 group-hover:scale-125 ${isDark ? 'text-[#F58840]' : 'text-[#F58840]'}`}
                          style={{ lineHeight: 0.8 }}
                        >
                          .
                        </span>
                    </Link>

                    <nav className="flex items-center">
                        <div className={`flex items-center gap-0.5 px-2 py-1.5 rounded-full backdrop-blur-md border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = isNavItemActive(item.path, currentPath);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium whitespace-nowrap"
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="tablet-nav-pill"
                                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTheme.gradient} shadow-lg`}
                                                style={{ boxShadow: isDark ? '0 0 15px rgba(245, 136, 64, 0.25)' : '0 0 15px rgba(100, 116, 139, 0.15)' }}
                                                transition={pillTransition}
                                            />
                                        )}
                                        <Icon size={14} className={`relative z-10 ${isActive ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
                                        <span className={`relative z-10 transition-colors duration-200 ${isActive ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="flex items-center gap-3">
                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="md" />

                        {/* Tablet Download Button */}
                        <motion.button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            whileHover={!isDownloading ? { scale: 1.1 } : {}}
                            whileTap={!isDownloading ? { scale: 0.92 } : {}}
                            className={`relative p-2.5 rounded-full border transition-all duration-500 overflow-visible ${
                                downloadComplete
                                    ? 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-emerald-500/10'
                                    : isDark
                                        ? 'border-white/10 hover:border-white/20'
                                        : 'border-black/10 hover:border-black/20'
                            }`}
                            title="Download Resume"
                        >
                            {/* Circular progress ring */}
                            {isDownloading && (
                                <CircularProgress
                                    progress={downloadProgress}
                                    size={44}
                                    strokeWidth={2.5}
                                    isDark={isDark}
                                />
                            )}

                            {/* Icon with transitions */}
                            <AnimatePresence mode="wait">
                                {downloadComplete ? (
                                    <motion.span
                                        key="check"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                        className="relative z-10 block text-emerald-500"
                                    >
                                        <Check size={20} strokeWidth={3} />
                                    </motion.span>
                                ) : isDownloading ? (
                                    <motion.span
                                        key="downloading"
                                        className={`relative z-10 block ${currentTheme.accent}`}
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                                    >
                                        <Download size={20} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="idle"
                                        className={`relative z-10 block ${currentTheme.accent}`}
                                    >
                                        <Download size={20} />
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Confetti */}
                            <AnimatePresence>
                                {showConfetti && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <ConfettiParticle
                                                key={`tablet-confetti-${i}`}
                                                index={i}
                                                color={confettiColors[i % confettiColors.length]}
                                            />
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Mobile Top Bar (below 768px) */}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center backdrop-blur-xl ${isDark ? 'bg-black/20' : 'bg-white/20'} border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <Link to="/" className="group flex items-center gap-0.5">
                    <span
                      className={`text-base font-bold tracking-tight transition-all duration-300 group-hover:tracking-normal ${isDark ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}
                    >
                      Shashmitha
                    </span>
                    <span
                      className={`text-xl font-black transition-all duration-300 group-hover:scale-125 text-[#F58840]`}
                      style={{ lineHeight: 0.8 }}
                    >
                      .
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />

                    {/* Mobile Download Button */}
                    <motion.button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        whileTap={!isDownloading ? { scale: 0.9 } : {}}
                        className={`relative p-2 rounded-full border transition-all duration-500 overflow-visible ${
                            downloadComplete
                                ? 'border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.4)] bg-emerald-500/10'
                                : isDark
                                    ? 'border-white/10'
                                    : 'border-black/10'
                        }`}
                        title="Download Resume"
                    >
                        {/* Circular progress ring */}
                        {isDownloading && (
                            <CircularProgress
                                progress={downloadProgress}
                                size={38}
                                strokeWidth={2}
                                isDark={isDark}
                            />
                        )}

                        {/* Icon */}
                        <AnimatePresence mode="wait">
                            {downloadComplete ? (
                                <motion.span
                                    key="check"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    className="relative z-10 block text-emerald-500"
                                >
                                    <Check size={18} strokeWidth={3} />
                                </motion.span>
                            ) : isDownloading ? (
                                <motion.span
                                    key="downloading"
                                    className={`relative z-10 block ${currentTheme.accent}`}
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                                >
                                    <Download size={18} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="idle"
                                    className={`relative z-10 block ${currentTheme.accent}`}
                                >
                                    <Download size={18} />
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Confetti */}
                        <AnimatePresence>
                            {showConfetti && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <ConfettiParticle
                                            key={`mobile-confetti-${i}`}
                                            index={i}
                                            color={confettiColors[i % confettiColors.length]}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Bottom Bar (below 768px) */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-center">
                <div className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full backdrop-blur-xl shadow-2xl border ${isDark ? 'bg-black/60 border-white/10' : 'bg-white/80 border-black/10'}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isNavItemActive(item.path, currentPath);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="relative flex items-center justify-center"
                                title={item.name}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-pill"
                                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTheme.gradient}`}
                                        style={{ boxShadow: isDark ? '0 0 12px rgba(245, 136, 64, 0.3)' : '0 0 12px rgba(100, 116, 139, 0.2)' }}
                                        transition={pillTransition}
                                    />
                                )}
                                <span className={`relative z-10 flex items-center justify-center transition-all duration-200 rounded-full ${
                                    isActive
                                        ? `px-4 py-2 ${isDark ? 'text-black' : 'text-white'}`
                                        : `w-9 h-9 ${isDark ? 'text-gray-400' : 'text-gray-500'}`
                                }`}>
                                    <Icon size={isActive ? 16 : 20} />
                                    {isActive && <span className="ml-1.5 text-xs font-mono font-medium">{item.name}</span>}
                                </span>
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
