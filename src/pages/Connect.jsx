import React, { useState, useContext, useRef } from 'react';
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

export default function Connect() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  const formRef = useRef();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // EmailJS configuration - Replace these with your actual EmailJS credentials
      // Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Email error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const socials = [
    { icon: Mail, label: 'Email', value: 'shashmitha@example.com', link: 'mailto:shashmitha@example.com', color: 'from-red-600 to-pink-600' },
    { icon: Github, label: 'GitHub', value: '@ShashmithaBan', link: 'https://github.com/ShashmithaBan', color: 'from-gray-700 to-gray-900' },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', link: 'https://linkedin.com', color: 'from-blue-600 to-blue-800' },
    { icon: Instagram, label: 'Instagram', value: '@shashmitha.design', link: 'https://instagram.com', color: 'from-pink-600 to-yellow-600' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} pt-6 sm:pt-8 lg:pt-16 pb-24 sm:pb-32 lg:pb-12 ${currentTheme.text} relative overflow-hidden`}>
      {/* Star Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${currentTheme.orbBg}`}></div>
        <div className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${currentTheme.orbBg}`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 animate-fadeInUp">
          <h1 className={`text-6xl lg:text-7xl font-mono font-bold leading-tight mb-4 ${currentTheme.textWhite}`}>
            Let's <span className={currentTheme.gradientText}>Connect</span>
          </h1>
          <p className={`text-lg max-w-2xl ${currentTheme.textSecondary}`}>
            I'm always interested in hearing about new projects, opportunities, and ideas. Let's collaborate and create something amazing together!
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slideInLeft">
              <form ref={formRef} onSubmit={handleSubmit} className={`relative backdrop-blur-sm rounded-2xl p-8 space-y-6 ${currentTheme.bgCard} ${currentTheme.cardBorder}`}>
                <h2 className={`text-2xl font-mono font-bold mb-6 ${currentTheme.textWhite}`}>Send Me a Message</h2>
                
                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors resize-none ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${currentTheme.accentBg} ${currentTheme.bgButtonHover} ${isDark ? 'text-black' : 'text-white'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {status.type === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-600/50 rounded-lg text-green-200 text-center animate-fadeInUp flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    {status.message}
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-600/50 rounded-lg text-red-200 text-center animate-fadeInUp flex items-center justify-center gap-2">
                    <AlertCircle size={20} />
                    {status.message}
                  </div>
                )}
              </form>
            </div>

            {/* Social Links & Info */}
            <div className="animate-slideInRight">
              <h2 className={`text-2xl font-mono font-bold mb-8 ${currentTheme.textWhite}`}>Get In Touch</h2>
              
              <div className="space-y-4">
                {socials.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-start gap-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-pointer animate-rotateIn ${currentTheme.bgCard} ${currentTheme.cardBorder} ${currentTheme.cardBorderHover} ${currentTheme.bgCardHover}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${social.color} p-3 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div>
                        <p className={`font-mono font-semibold ${currentTheme.textWhite}`}>{social.label}</p>
                        <p className={`text-sm ${currentTheme.textGrayMuted}`}>{social.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className={`mt-12 pt-8 border-t ${currentTheme.borderLighter}`}>
                <h3 className={`text-lg font-mono font-semibold mb-4 ${currentTheme.textWhite}`}>Let's Talk About:</h3>
                <div className="space-y-2">
                  <p className={`text-sm ${currentTheme.textGrayMuted}`}>💼 DevOps Projects & Solutions</p>
                  <p className={`text-sm ${currentTheme.textGrayMuted}`}>☁️ Cloud Infrastructure & Automation</p>
                  <p className={`text-sm ${currentTheme.textGrayMuted}`}>🚀 Career Opportunities</p>
                  <p className={`text-sm ${currentTheme.textGrayMuted}`}>📚 Learning & Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t ${currentTheme.borderLighter}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className={`text-sm ${currentTheme.textGrayMuted}`}>© 2026 Shashmitha Banadara. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>About</a>
                <a href="#" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
