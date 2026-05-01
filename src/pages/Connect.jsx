import React, { useState, useContext, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles, X, PartyPopper } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../config/socialLinks';

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
  const [honeypot, setHoneypot] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const RATE_LIMIT_MS = 60000;

  const sanitizeInput = (input) => {
    return input
      .replaceAll(/[<>]/g, '')
      .replaceAll(/javascript:/gi, '')
      .replaceAll(/on\w+=/gi, '');
  };

  const validateName = (name) => {
    const sanitized = sanitizeInput(name).trim();
    if (!sanitized) return 'Please tell me your name so I know who I\'m talking to!';
    if (sanitized.length < 2) return 'Your name seems a bit short - please enter at least 2 characters';
    if (sanitized.length > 50) return 'Please keep your name under 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(sanitized)) return 'Please use only letters, spaces, hyphens, or apostrophes';
    return '';
  };

  const validateEmail = (email) => {
    const sanitized = sanitizeInput(email).toLowerCase().trim();
    if (!sanitized) return 'I\'ll need your email to get back to you!';
    if (sanitized.length > 100) return 'That email is too long - please use one under 100 characters';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) return 'That doesn\'t look like a valid email (e.g., name@example.com)';
    const [localPart, domain] = sanitized.split('@');
    if (localPart.length > 64) return 'The part before @ is too long';
    if (domain.length > 255) return 'The domain is too long';
    const disposableDomains = ['tempmail.com', 'throwaway.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
    if (disposableDomains.includes(domain)) return 'Please use your permanent email so I can reach you reliably';
    return '';
  };

  const validateMessage = (message) => {
    const sanitized = sanitizeInput(message).trim();
    if (!sanitized) return 'Don\'t be shy! Tell me what\'s on your mind';
    if (sanitized.length < 10) return 'Please write a bit more - at least 10 characters would be great';
    if (sanitized.length > 1000) return 'Please keep it under 1000 characters';
    const spamPatterns = [/\b(viagra|casino|lottery|winner|congratulations)\b/gi];
    if (spamPatterns.some((pattern) => pattern.test(sanitized))) return 'Your message was flagged. Please remove any suspicious content';
    return '';
  };

  const handleInputChange = (field, value) => {
    const cleanValue = value
      .replaceAll(/[<>]/g, '')
      .replaceAll(/javascript:/gi, '')
      .replaceAll(/on\w+=/gi, '');
    setFormData((prev) => ({ ...prev, [field]: cleanValue }));
    if (touched[field]) {
      let error = '';
      if (field === 'name') error = validateName(cleanValue);
      else if (field === 'email') error = validateEmail(cleanValue);
      else if (field === 'message') error = validateMessage(cleanValue);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFocusedField(null);
    let error = '';
    if (field === 'name') error = validateName(formData.name);
    else if (field === 'email') error = validateEmail(formData.email);
    else if (field === 'message') error = validateMessage(formData.message);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);
    setErrors({ name: nameError, email: emailError, message: messageError });
    setTouched({ name: true, email: true, message: true });
    return !nameError && !emailError && !messageError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      setStatus({ type: 'error', message: `Please wait ${remainingSeconds} seconds before sending another message.` });
      return;
    }
    if (honeypot) {
      setStatus({ type: 'success', message: 'Message sent!' });
      setFormData({ name: '', email: '', message: '' });
      return;
    }
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields above before sending.' });
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const templateParams = {
        from_name: formData.name.trim(),
        reply_to: formData.email.trim(),
        message: formData.message.trim(),
        time: new Date().toLocaleString(),
      };
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      if (result.text === 'OK') {
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
        setLastSubmitTime(now);
        setTimeout(() => setShowSuccessModal(false), 5000);
      }
    } catch (error) {
      let errorMessage = 'Oops! Something went wrong. Please try again or email me directly.';
      if (error?.text) errorMessage = `EmailJS Error: ${error.text}`;
      else if (error?.message) errorMessage = `Error: ${error.message}`;
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const isFloating = (field) => formData[field] || focusedField === field;

  const getFloatingLabelClasses = (field) => {
    const floating = isFloating(field);
    const hasError = errors[field] && touched[field];
    const color = hasError ? 'text-red-500' : floating ? currentTheme.accent : currentTheme.textGrayMuted;
    return `absolute left-4 transition-all duration-200 pointer-events-none ${color} ${
      floating ? 'top-2 text-xs font-semibold' : 'top-4 text-sm'
    }`;
  };

  const getInputClasses = (field) => {
    const hasError = errors[field] && touched[field];
    const isFocused = focusedField === field;
    const borderClass = hasError
      ? 'border-red-500 border-2'
      : isFocused
        ? isDark ? 'border-[#F58840]/60' : 'border-[#64748b]/60'
        : isDark ? 'border-white/10' : 'border-black/10';
    const glowClass = isFocused && !hasError
      ? isDark ? 'shadow-[0_0_15px_rgba(245,136,64,0.1)]' : 'shadow-[0_0_15px_rgba(100,116,139,0.08)]'
      : '';
    return `w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none transition-all duration-200 placeholder-transparent ${
      isDark ? 'bg-white/5' : 'bg-black/5'
    } ${currentTheme.text} ${borderClass} ${glowClass}`;
  };

  const getMessageLengthClass = () => {
    if (formData.message.length >= 1000) return 'text-red-500';
    if (formData.message.length > 900) return 'text-yellow-500';
    return currentTheme.textGrayMuted;
  };

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 lg:pt-16 pb-28 sm:pb-32 lg:pb-12 ${currentTheme.text} relative overflow-hidden`}>
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
          <ScrollReveal>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-mono font-bold leading-tight mb-3 ${currentTheme.textWhite}`}>
              Let's{' '}
              <span className={isDark ? 'text-shimmer-dark' : 'text-shimmer-light'}>Connect</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className={`text-sm lg:text-base max-w-2xl ${currentTheme.textSecondary}`}>
              I'm always interested in hearing about new projects, opportunities, and ideas. Let's
              collaborate and create something amazing together!
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <SpotlightCard
                tilt={false}
                className={`relative backdrop-blur-sm rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/10'}`}
              >
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-8 space-y-4 sm:space-y-6"
                >
                  <h2 className={`text-lg sm:text-xl font-mono font-bold mb-5 ${currentTheme.textWhite}`}>
                    Send Me a Message
                  </h2>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      maxLength={50}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      className={getInputClasses('name')}
                      placeholder="name"
                      aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    <label htmlFor="user_name" className={getFloatingLabelClasses('name')}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    {errors.name && touched.name && (
                      <p id="name-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      maxLength={100}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      className={getInputClasses('email')}
                      placeholder="email"
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <label htmlFor="user_email" className={getFloatingLabelClasses('email')}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    {errors.email && touched.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      className={`${getInputClasses('message')} resize-none`}
                      placeholder="message"
                      aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <label htmlFor="message" className={getFloatingLabelClasses('message')}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="flex justify-between mt-2">
                      {errors.message && touched.message ? (
                        <p id="message-error" className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className={`text-xs ${getMessageLengthClass()}`}>
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3.5 sm:py-3 rounded-xl font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      isDark
                        ? 'bg-gradient-to-r from-[#F58840] to-[#B85252] text-black shadow-[0_0_20px_rgba(245,136,64,0.2)] hover:shadow-[0_0_30px_rgba(245,136,64,0.35)]'
                        : 'bg-gradient-to-r from-[#64748b] to-[#475569] text-white shadow-[0_0_20px_rgba(100,116,139,0.15)] hover:shadow-[0_0_30px_rgba(100,116,139,0.25)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
                    <div className="p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-center animate-shake flex items-center justify-center gap-2">
                      <AlertCircle size={20} className="flex-shrink-0 text-red-600" />
                      <span className="text-red-600 font-medium">{status.message}</span>
                    </div>
                  )}
                </form>
              </SpotlightCard>
            </ScrollReveal>

            {/* Success Modal */}
            {showSuccessModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-labelledby="success-modal-title">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setShowSuccessModal(false)} aria-hidden="true" />
                <div className="relative bg-gradient-to-br from-emerald-900/90 via-green-800/90 to-teal-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-emerald-500/30 animate-successPop">
                  <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Close modal">
                    <X size={20} />
                  </button>
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
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center animate-successCheck shadow-lg shadow-emerald-500/50">
                        <CheckCircle size={40} className="text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 id="success-modal-title" className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <PartyPopper className="text-yellow-400" size={24} />
                      Message Sent!
                      <PartyPopper className="text-yellow-400 transform scale-x-[-1]" size={24} />
                    </h3>
                    <p className="text-emerald-100/90 mb-4">
                      Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                    </p>
                    <p className="text-emerald-200/70 text-sm">Usually within 24-48 hours</p>
                  </div>
                  <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 animate-shrinkWidth" />
                  </div>
                  <p className="text-center text-xs text-white/50 mt-2">Auto-closing in 5 seconds...</p>
                </div>
              </div>
            )}

            {/* Social Links & Info */}
            <ScrollReveal direction="right">
              <div>
                <h2 className={`text-lg sm:text-xl font-mono font-bold mb-6 ${currentTheme.textWhite}`}>Get In Touch</h2>

                <div className="space-y-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <ScrollReveal key={social.link} delay={index * 0.08}>
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center gap-4 p-3 sm:p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-pointer border ${
                            isDark
                              ? 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                              : 'bg-black/[0.02] border-black/10 hover:border-black/20 hover:bg-black/[0.04]'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br ${social.color} p-3 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                          >
                            <IconComponent size={20} className="text-white" />
                          </div>
                          <div>
                            <p className={`font-mono font-semibold ${currentTheme.textWhite}`}>
                              {social.label}
                            </p>
                            <p className={`text-sm ${currentTheme.textGrayMuted}`}>{social.value}</p>
                          </div>
                        </a>
                      </ScrollReveal>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8">
                  <div className={`${isDark ? 'gradient-line-dark' : 'gradient-line-light'} mb-8`} />
                  <h3 className={`text-base sm:text-lg font-mono font-semibold mb-4 ${currentTheme.textWhite}`}>
                    Let's Talk About:
                  </h3>
                  <div className="space-y-3">
                    {[
                      'DevOps Projects & Solutions',
                      'Cloud Infrastructure & Automation',
                      'Career Opportunities',
                      'Learning & Growth',
                    ].map((topic) => (
                      <p key={topic} className={`text-sm flex items-center gap-3 ${currentTheme.textGrayMuted}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dotBg} ${isDark ? 'shadow-[0_0_6px_rgba(245,136,64,0.4)]' : ''}`} />
                        {topic}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <Footer links={[{ to: '/about', label: 'About' }, { to: '/skills', label: 'Skills' }]} />
      </div>
    </div>
  );
}
