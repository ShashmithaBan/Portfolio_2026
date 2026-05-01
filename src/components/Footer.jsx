import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { socialLinks } from '../config/socialLinks';

export default function Footer({ links = [] }) {
  const { isDark, dark, light } = useContext(ThemeContext);
  const currentTheme = isDark ? dark : light;

  return (
    <footer className="relative z-10">
      <div className={`${isDark ? 'gradient-line-dark' : 'gradient-line-light'} mx-6`} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className={`text-sm ${currentTheme.textGrayMuted}`}>
            &copy; 2026 Shashmitha Bandara
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.link}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-white/10 hover:border-[#F58840]/40 hover:bg-[#F58840]/10'
                    : 'border-black/10 hover:border-[#64748b]/40 hover:bg-[#64748b]/10'
                }`}
              >
                <social.icon size={16} className={currentTheme.accent} />
              </a>
            ))}
          </div>
          {links.length > 0 && (
            <div className="flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-colors ${currentTheme.textGrayMuted} ${currentTheme.accentHover}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
