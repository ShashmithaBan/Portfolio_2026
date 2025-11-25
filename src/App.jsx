import React, { useState } from 'react';
import { Menu, X, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-linear-to-br from-slate-900 via-orange-900 to-slate-900 min-h-screen text-white">
      {/* Navigation */}
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Hero Section */}
      <Hero />
    </div>
  );
}