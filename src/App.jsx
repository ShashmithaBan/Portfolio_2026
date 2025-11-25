import React, { useState } from 'react';
import { Menu, X, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import LoadScreen from './components/LoadScreen';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoadScreenVisible, setIsLoadScreenVisible] = useState(true);

  return (
    <div className="bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 min-h-screen text-white">
      {/* Load Screen - Shows on scroll */}
      <LoadScreen onVisibilityChange={setIsLoadScreenVisible} />

      {/* Navigation - Hidden while LoadScreen is visible */}
      {!isLoadScreenVisible && (
        <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      )}

      {/* Hero Section */}
      <Hero />
    </div>
  );
}