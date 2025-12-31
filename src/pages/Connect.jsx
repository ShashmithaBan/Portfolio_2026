import React, { useState, useContext, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles, X, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { socialLinks } from '../config/socialLinks';
import emailjs from '@emailjs/browser';

export default function Connect() {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;
  const formRef = useRef();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot field

  // Security: Sanitize input to prevent XSS attacks (only for validation/submission, not live input)
  const sanitizeInput = (input) => {
    return input
      .replaceAll(/[<>]/g, '') // Remove < and > to prevent HTML injection
      .replaceAll(/javascript:/gi, '') // Remove javascript: protocol
      .replaceAll(/on\w+=/gi, ''); // Remove event handlers like onclick=
  };

  // Validation functions with friendly messages
  const validateName = (name) => {
    const sanitized = sanitizeInput(name).trim();
    if (!sanitized) return '👋 Please tell me your name so I know who I\'m talking to!';
    if (sanitized.length < 2) return '📝 Your name seems a bit short - please enter at least 2 characters';
    if (sanitized.length > 50) return '✂️ That\'s quite a long name! Please keep it under 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(sanitized)) return '🔤 Please use only letters, spaces, hyphens, or apostrophes in your name';
    return '';
  };

  const validateEmail = (email) => {
    const sanitized = sanitizeInput(email).toLowerCase().trim();
    if (!sanitized) return '📧 I\'ll need your email to get back to you!';
    if (sanitized.length > 100) return '✂️ That email is too long - please use one under 100 characters';
    
    // Simple and reliable email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) return '🔍 Hmm, that doesn\'t look like a valid email. Please check the format (e.g., name@example.com)';
    
    // Additional checks
    const [localPart, domain] = sanitized.split('@');
    if (localPart.length > 64) return '✂️ The part before @ is too long';
    if (domain.length > 255) return '✂️ The domain is too long';
    
    // Check for common disposable email domains (optional security measure)
    const disposableDomains = ['tempmail.com', 'throwaway.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
    if (disposableDomains.includes(domain)) return '🏠 Please use your permanent email so I can reach you reliably';
    
    return '';
  };

  const validateMessage = (message) => {
    const sanitized = sanitizeInput(message).trim();
    if (!sanitized) return '💬 Don\'t be shy! Tell me what\'s on your mind';
    if (sanitized.length < 10) return '📖 Please write a bit more - at least 10 characters would be great';
    if (sanitized.length > 1000) return '📚 That\'s quite a novel! Please keep it under 1000 characters';
    // Check for spam patterns
    const spamPatterns = [/\b(viagra|casino|lottery|winner|congratulations)\b/gi];
    if (spamPatterns.some(pattern => pattern.test(sanitized))) return '🚫 Your message was flagged. Please remove any suspicious content';
    return '';
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    // Only remove dangerous characters, don't trim spaces while typing
    const cleanValue = value
      .replaceAll(/[<>]/g, '')
      .replaceAll(/javascript:/gi, '')
      .replaceAll(/on\w+=/gi, '');
    
    setFormData(prev => ({ ...prev, [field]: cleanValue }));
    
    // Validate on change if field has been touched
    if (touched[field]) {
      let error = '';
      switch (field) {
        case 'name': error = validateName(cleanValue); break;
        case 'email': error = validateEmail(cleanValue); break;
        case 'message': error = validateMessage(cleanValue); break;
        default: break;
      }
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle blur to mark field as touched
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    let error = '';
    switch (field) {
      case 'name': error = validateName(formData.name); break;
      case 'email': error = validateEmail(formData.email); break;
      case 'message': error = validateMessage(formData.message); break;
      default: break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Validate all fields
  const validateForm = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);
    
    setErrors({ name: nameError, email: emailError, message: messageError });
    setTouched({ name: true, email: true, message: true });
    
    return !nameError && !emailError && !messageError;
  };

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: `connect-star-${i}`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  // Rate limiting: Track last submission time
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const RATE_LIMIT_MS = 60000; // 1 minute between submissions

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      setStatus({ type: 'error', message: `⏳ Please wait ${remainingSeconds} seconds before sending another message. I appreciate your enthusiasm!` });
      return;
    }

    // Honeypot anti-spam check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected via honeypot');
      // Fake success to confuse bots
      setStatus({ type: 'success', message: 'Message sent!' });
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    // Validate all fields before submission
    if (!validateForm()) {
      setStatus({ type: 'error', message: '⚠️ Please fix the highlighted fields above before sending.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Template params must match your EmailJS template variables exactly
      const templateParams = {
        from_name: formData.name.trim(),      // Matches {{from_name}} in template
        reply_to: formData.email.trim(),      // Matches {{reply_to}} in template
        message: formData.message.trim(),     // Matches {{message}} in template
        time: new Date().toLocaleString(),    // Optional: {{time}} in template
      };

      // Use environment variables for security (never expose keys in code)
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
        setLastSubmitTime(now); // Update last submission time on success
        // Auto-close modal after 5 seconds
        setTimeout(() => setShowSuccessModal(false), 5000);
      }
    } catch (error) {
      console.error('Email error:', error);
      // Show more specific error message
      let errorMessage = '😔 Oops! Something went wrong. Please try again or email me directly.';
      if (error?.text) {
        errorMessage = `❌ EmailJS Error: ${error.text}`;
      } else if (error?.message) {
        errorMessage = `❌ Error: ${error.message}`;
      }
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
      // Clear error status after 5 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  // Use centralized social links
  const socials = socialLinks;

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
                
                {/* Honeypot field - hidden from users, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ 
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    width: 0,
                    pointerEvents: 'none'
                  }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    maxLength={50}
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors ${currentTheme.inputBg} ${errors.name && touched.name ? 'border-red-500 border-2' : currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="Your name"
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    maxLength={100}
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors ${currentTheme.inputBg} ${errors.email && touched.email ? 'border-red-500 border-2' : currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="your@email.com"
                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block font-mono font-semibold mb-3 ${currentTheme.textWhite}`}>Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-colors resize-none ${currentTheme.inputBg} ${errors.message && touched.message ? 'border-red-500 border-2' : currentTheme.inputBorder} ${currentTheme.text} ${currentTheme.inputFocus}`}
                    placeholder="Your message here..."
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="flex justify-between mt-2">
                    {errors.message && touched.message ? (
                      <p id="message-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    ) : <span />}
                    <span className={`text-xs ${formData.message.length > 900 ? 'text-yellow-500' : formData.message.length >= 1000 ? 'text-red-500' : currentTheme.textGrayMuted}`}>
                      {formData.message.length}/1000
                    </span>
                  </div>
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

                {status.type === 'error' && (
                  <div className="p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center animate-shake flex items-center justify-center gap-2">
                    <AlertCircle size={20} className="flex-shrink-0 text-red-600" />
                    <span className="text-red-600 font-medium">{status.message}</span>
                  </div>
                )}
              </form>
            </div>

            {/* Success Modal Overlay */}
            {showSuccessModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowSuccessModal(false)}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />
                
                {/* Modal */}
                <div 
                  className="relative bg-gradient-to-br from-emerald-900/90 via-green-800/90 to-teal-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-emerald-500/30 animate-successPop"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Confetti/sparkle decorations */}
                  <div className="absolute -top-2 -left-2 text-yellow-400 animate-bounce" style={{ animationDelay: '0.1s' }}>
                    <Sparkles size={24} />
                  </div>
                  <div className="absolute -top-2 -right-8 text-pink-400 animate-bounce" style={{ animationDelay: '0.3s' }}>
                    <Sparkles size={20} />
                  </div>
                  <div className="absolute -bottom-2 -left-4 text-blue-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <Sparkles size={18} />
                  </div>
                  <div className="absolute -bottom-4 -right-2 text-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <Sparkles size={22} />
                  </div>
                  
                  {/* Success icon with animation */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center animate-successCheck shadow-lg shadow-emerald-500/50">
                        <CheckCircle size={40} className="text-white" />
                      </div>
                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <PartyPopper className="text-yellow-400" size={24} />
                      Message Sent!
                      <PartyPopper className="text-yellow-400 transform scale-x-[-1]" size={24} />
                    </h3>
                    <p className="text-emerald-100/90 mb-4">
                      Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                    </p>
                    <p className="text-emerald-200/70 text-sm">
                      ✨ Usually within 24-48 hours
                    </p>
                  </div>
                  
                  {/* Progress bar for auto-close */}
                  <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 animate-shrinkWidth" />
                  </div>
                  <p className="text-center text-xs text-white/50 mt-2">Auto-closing in 5 seconds...</p>
                </div>
              </div>
            )}

            {/* Social Links & Info */}
            <div className="animate-slideInRight">
              <h2 className={`text-2xl font-mono font-bold mb-8 ${currentTheme.textWhite}`}>Get In Touch</h2>
              
              <div className="space-y-4">
                {socials.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.link}
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
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.link}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${currentTheme.borderLight} ${currentTheme.cardBorderHover}`}
                  >
                    <social.icon size={18} className={currentTheme.accentHover} />
                  </a>
                ))}
              </div>

              <div className="flex gap-6">
                <Link to="/about" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>About</Link>
                <Link to="/skills" className={`transition-colors text-sm ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}>Skills</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
