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
  const { isDark, dark, light } = useContext(ThemeContext);
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