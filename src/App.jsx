import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadScreen from './components/LoadScreen';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Connect from './pages/Connect';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadScreenVisible, setLoadScreenVisible] = useState(true);

  return (
    <Router>
      <div className="bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 min-h-screen text-white">
        {/* Load Screen - Shows on scroll */}
        <LoadScreen onVisibilityChange={setLoadScreenVisible} />

        {/* Navigation - Hidden when LoadScreen is visible */}
        {!loadScreenVisible && (
          <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
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
    </Router>
  );
}