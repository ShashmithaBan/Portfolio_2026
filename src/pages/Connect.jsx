import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Send } from 'lucide-react';

export default function Connect() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socials = [
    { icon: Mail, label: 'Email', value: 'noah@example.com', link: 'mailto:noah@example.com', color: 'from-red-600 to-pink-600' },
    { icon: Github, label: 'GitHub', value: '@ShashmithaBan', link: 'https://github.com/ShashmithaBan', color: 'from-gray-700 to-gray-900' },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', link: 'https://linkedin.com', color: 'from-blue-600 to-blue-800' },
    { icon: Instagram, label: 'Instagram', value: '@shashmitha.design', link: 'https://instagram.com', color: 'from-pink-600 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
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
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 animate-fadeInUp">
          <h1 className="text-6xl lg:text-7xl font-display font-bold leading-tight text-white mb-4">
            Let's <span className="bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            I'm always interested in hearing about new projects, opportunities, and ideas. Let's collaborate and create something amazing together!
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slideInLeft">
              <form onSubmit={handleSubmit} className="relative bg-purple-800/10 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-poppins font-bold text-white mb-6">Send Me a Message</h2>
                
                <div>
                  <label className="block text-white font-poppins font-semibold mb-3">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-purple-700/20 border border-purple-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-poppins font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-purple-700/20 border border-purple-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-poppins font-semibold mb-3">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-purple-700/20 border border-purple-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-lg font-poppins font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <Send size={18} />
                  Send Message
                </button>

                {submitted && (
                  <div className="p-4 bg-green-500/20 border border-green-600/50 rounded-lg text-green-200 text-center animate-fadeInUp">
                    Thank you! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Social Links & Info */}
            <div className="animate-slideInRight">
              <h2 className="text-2xl font-poppins font-bold text-white mb-8">Get In Touch</h2>
              
              <div className="space-y-4">
                {socials.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-purple-800/10 backdrop-blur-sm border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300 hover:bg-purple-800/20 cursor-pointer animate-rotateIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${social.color} p-3 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-poppins font-semibold">{social.label}</p>
                        <p className="text-gray-400 text-sm">{social.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 pt-8 border-t border-purple-700/30">
                <h3 className="text-lg font-poppins font-semibold text-white mb-4">Let's Talk About:</h3>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">💼 DevOps Projects & Solutions</p>
                  <p className="text-gray-400 text-sm">☁️ Cloud Infrastructure & Automation</p>
                  <p className="text-gray-400 text-sm">🚀 Career Opportunities</p>
                  <p className="text-gray-400 text-sm">📚 Learning & Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-700/30">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-400 text-sm">© 2026 Noah. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Back to Top</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
