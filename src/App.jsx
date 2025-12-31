import React, { useState, useRef, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Navigation from './components/Navigation';
import LoadScreen from './components/LoadScreen';
import HackerLoadScreen from './components/HackerLoadScreen';
import FloatingRocket from './components/FloatingRocket';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Connect from './pages/Connect';

function AppContent() {
  const { isDark, dark, light, isTransitioning, transitionDirection } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [loadScreenVisible, setLoadScreenVisible] = useState(false);
  const [showLoadScreenOnNav, setShowLoadScreenOnNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const previousPathRef = useRef(null);

  // Check if desktop on resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only show LoadScreen on actual navigation (not on initial load) and only on desktop
    if (initialLoadComplete && previousPathRef.current !== null && previousPathRef.current !== location.pathname && isDesktop) {
      setShowLoadScreenOnNav(true);
    }
    previousPathRef.current = location.pathname;
  }, [location.pathname, initialLoadComplete, isDesktop]);

  return (
    <div className={`bg-gradient-to-br ${currentTheme.bg} min-h-screen ${currentTheme.text}`}>
      {/* Day/Night Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Main transition overlay */}
          <div 
            className={`absolute inset-0 ${
              transitionDirection === 'toNight' 
                ? 'animate-nightfall bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-black' 
                : 'animate-daybreak bg-gradient-to-b from-[#f8fafc] via-white to-[#e2e8f0]'
            }`}
          />
          
          {/* Celestial body - Moon with orange glow for dark theme, Slate orb for light theme */}
          <div className={`absolute left-1/2 -translate-x-1/2 ${
            transitionDirection === 'toNight' 
              ? 'animate-moonrise' 
              : 'animate-sunrise'
          }`}>
            {transitionDirection === 'toNight' ? (
              // Moon with orange glow (matching dark theme accent #F58840)
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F58840] to-[#B85252] shadow-[0_0_50px_rgba(245,136,64,0.6)]">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F58840]/80 to-transparent"></div>
              </div>
            ) : (
              // Light orb with slate color (matching light theme accent #64748b)
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] shadow-[0_0_60px_rgba(100,116,139,0.5)]">
                <div className="absolute inset-0 rounded-full animate-pulse bg-white/30"></div>
              </div>
            )}
          </div>
          
          {/* Particles for night transition - orange accent */}
          {transitionDirection === 'toNight' && (
            <div className="animate-starsAppear">
              {Array.from({ length: 15 }, (_, i) => (
                <div 
                  key={`transition-star-${i}-${Math.random().toString(36).substring(7)}`}
                  className="absolute w-1.5 h-1.5 bg-[#F58840] rounded-full animate-twinkle"
                  style={{
                    top: `${Math.random() * 60}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Particles for day transition - slate accent */}
          {transitionDirection === 'toDay' && (
            <div className="animate-cloudsAppear">
              <div className="absolute top-[20%] left-[10%] w-20 h-6 bg-[#64748b]/30 rounded-full blur-md animate-floatCloud" />
              <div className="absolute top-[30%] right-[15%] w-28 h-8 bg-[#64748b]/20 rounded-full blur-md animate-floatCloud" style={{ animationDelay: '0.2s' }} />
              <div className="absolute top-[15%] left-[60%] w-16 h-5 bg-[#64748b]/25 rounded-full blur-md animate-floatCloud" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>
      )}

      {/* Hacker Load Screen - Only on initial page load */}
      <HackerLoadScreen 
        isVisible={!initialLoadComplete} 
        onComplete={() => setInitialLoadComplete(true)} 
      />

      {/* Load Screen - Shows only during page navigation (not on initial load) */}
      {showLoadScreenOnNav && <LoadScreen key={location.pathname} onVisibilityChange={(visible) => {
        setLoadScreenVisible(visible);
        if (!visible) setShowLoadScreenOnNav(false);
      }} />}

      {/* Navigation - Hidden when LoadScreen is visible */}
      {initialLoadComplete && !loadScreenVisible && (
        <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      )}

      {/* Floating Rocket with depth effect */}
      {initialLoadComplete && !loadScreenVisible && location.pathname !== '/' && (
        <FloatingRocket />
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
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