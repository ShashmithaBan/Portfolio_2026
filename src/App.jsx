import React, { useState, useRef, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import LoadScreen from './components/LoadScreen';
import PageTransitionLoader from './components/PageTransitionLoader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import MeshGradient from './components/MeshGradient';
import ParticleField from './components/ParticleField';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Connect from './pages/Connect';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.4, 0.25, 1],
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const { isDark, dark, light, isTransitioning, transitionDirection } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(null);
  const location = useLocation();
  const lenisRef = useRef(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      setDisplayLocation(location);
      return;
    }

    if (location.pathname === displayLocation?.pathname) return;

    setIsPageTransitioning(true);

    const timer = setTimeout(() => {
      setDisplayLocation(location);
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      setTimeout(() => setIsPageTransitioning(false), 300);
    }, 900);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`bg-gradient-to-br ${currentTheme.bg} min-h-screen ${currentTheme.text}`}>
      {/* Loading Screen */}
      <LoadScreen onVisibilityChange={(visible) => setIsLoading(visible)} />

      {/* Page Transition Loader */}
      <PageTransitionLoader isVisible={isPageTransitioning} />

      {/* Day/Night Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Base gradient wash */}
          <div
            className={`absolute inset-0 ${
              transitionDirection === 'toNight'
                ? 'animate-nightfall bg-gradient-to-b from-[#0a0520] via-[#050510] to-black'
                : 'animate-daybreak bg-gradient-to-b from-[#f0f4ff] via-[#f8fafc] to-[#e2e8f0]'
            }`}
          />

          {/* Radial color burst from center */}
          <div
            className="absolute inset-0"
            style={{
              background: transitionDirection === 'toNight'
                ? 'radial-gradient(circle at 50% 50%, rgba(245,136,64,0.3) 0%, rgba(184,82,82,0.15) 25%, transparent 55%)'
                : 'radial-gradient(circle at 50% 50%, rgba(148,163,184,0.25) 0%, rgba(100,116,139,0.1) 25%, transparent 55%)',
              animation: 'radial-burst 2s ease-out forwards',
            }}
          />

          {/* Expanding ripple rings */}
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={`ripple-${i}`}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderColor: transitionDirection === 'toNight'
                  ? `rgba(245,136,64,${0.5 - i * 0.15})`
                  : `rgba(100,116,139,${0.35 - i * 0.1})`,
                animation: `ripple-expand 2s ease-out ${i * 0.15}s forwards`,
              }}
            />
          ))}

          {/* Central celestial body */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{ animation: 'celestial-pulse 2s ease-in-out forwards' }}
          >
            {transitionDirection === 'toNight' ? (
              <div className="relative">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#F58840] via-[#ff8c42] to-[#B85252]"
                  style={{ boxShadow: '0 0 60px rgba(245,136,64,0.8), 0 0 120px rgba(245,136,64,0.3), 0 0 200px rgba(245,136,64,0.1)' }}
                >
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F58840]/60 to-transparent" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#B85252]/40 top-3 right-4" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#B85252]/30 bottom-5 left-3" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#e2e8f0] via-[#94a3b8] to-[#64748b]"
                  style={{ boxShadow: '0 0 80px rgba(100,116,139,0.5), 0 0 160px rgba(100,116,139,0.2), 0 0 240px rgba(100,116,139,0.08)' }}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse bg-white/20" />
                </div>
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={`ray-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: '2px',
                      height: '45px',
                      background: 'linear-gradient(to top, rgba(148,163,184,0.5), transparent)',
                      transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                      transformOrigin: '50% 100%',
                      animation: `ray-pulse 2s ease-in-out ${i * 0.08}s forwards`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stars (dark mode) */}
          {transitionDirection === 'toNight' && (
            <div className="animate-starsAppear">
              {Array.from({ length: 25 }, (_, i) => {
                const starSize = 1 + ((i * 7 + 3) % 4);
                const colors = ['#F58840', '#B85252', '#ff6b35', '#ffbe7d'];
                return (
                  <div
                    key={`transition-star-${i}`}
                    className="absolute rounded-full animate-twinkle"
                    style={{
                      width: `${starSize}px`,
                      height: `${starSize}px`,
                      background: colors[i % colors.length],
                      top: `${(i * 31 + 7) % 70}%`,
                      left: `${(i * 43 + 11) % 100}%`,
                      animationDelay: `${((i * 0.08) % 0.6).toFixed(2)}s`,
                      boxShadow: `0 0 ${starSize * 3}px ${colors[i % colors.length]}50`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Clouds (light mode) */}
          {transitionDirection === 'toDay' && (
            <div className="animate-cloudsAppear">
              <div className="absolute top-[15%] left-[5%] w-24 h-6 bg-[#64748b]/25 rounded-full blur-md animate-floatCloud" />
              <div className="absolute top-[25%] right-[10%] w-32 h-8 bg-[#94a3b8]/20 rounded-full blur-md animate-floatCloud" style={{ animationDelay: '0.2s' }} />
              <div className="absolute top-[12%] left-[55%] w-20 h-5 bg-[#64748b]/20 rounded-full blur-md animate-floatCloud" style={{ animationDelay: '0.4s' }} />
              <div className="absolute top-[35%] left-[25%] w-28 h-7 bg-[#94a3b8]/15 rounded-full blur-md animate-floatCloud" style={{ animationDelay: '0.6s' }} />
            </div>
          )}

          {/* Flash bloom at peak */}
          <div
            className="absolute inset-0"
            style={{
              background: transitionDirection === 'toNight'
                ? 'radial-gradient(circle at 50% 50%, rgba(245,136,64,0.2) 0%, transparent 50%)'
                : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 50%)',
              animation: 'flash-bloom 2s ease-in-out forwards',
            }}
          />

          {/* Color sweep bands */}
          <div className="absolute inset-0 overflow-hidden" style={{ animation: 'fade-in-out 2s ease-in-out forwards' }}>
            <div
              className="absolute w-full h-[2px]"
              style={{
                top: '30%',
                background: transitionDirection === 'toNight'
                  ? 'linear-gradient(90deg, transparent, rgba(245,136,64,0.4), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(100,116,139,0.3), transparent)',
                animation: 'color-sweep 2s ease-in-out forwards',
              }}
            />
            <div
              className="absolute w-full h-[2px]"
              style={{
                top: '65%',
                background: transitionDirection === 'toNight'
                  ? 'linear-gradient(90deg, transparent, rgba(184,82,82,0.3), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(148,163,184,0.2), transparent)',
                animation: 'color-sweep-reverse 2s ease-in-out 0.15s forwards',
              }}
            />
          </div>
        </div>
      )}

      {/* Mesh Gradient Background */}
      <MeshGradient isDark={isDark} />

      {/* Ambient Particles */}
      <ParticleField isDark={isDark} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Page Routes with Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={displayLocation || location} key={(displayLocation || location).pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
          <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
          <Route path="/connect" element={<PageTransition><Connect /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}
