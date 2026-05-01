import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function TechMarquee({ items }) {
  const { isDark } = useContext(ThemeContext);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3 relative">
      <div
        className={`absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r ${isDark ? 'from-black' : 'from-white'} to-transparent`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l ${isDark ? 'from-black' : 'from-white'} to-transparent`}
      />
      <div className="flex animate-marquee">
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className={`flex-shrink-0 mx-2 flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-sm transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
            <span
              className={`text-xs font-medium whitespace-nowrap ${isDark ? 'text-white/80' : 'text-slate-700'}`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
