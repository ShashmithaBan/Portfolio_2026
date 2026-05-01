import { useRef, useState, useContext, useCallback } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function SpotlightCard({ children, className = '', tilt = true }) {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useContext(ThemeContext);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const spotlightColor = isDark
    ? 'rgba(245, 136, 64, 0.12)'
    : 'rgba(100, 116, 139, 0.08)';

  const glareColor = isDark
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.15)';

  const tiltX = tilt && isHovered && ref.current
    ? ((mousePos.y / ref.current.offsetHeight) - 0.5) * -8
    : 0;
  const tiltY = tilt && isHovered && ref.current
    ? ((mousePos.x / ref.current.offsetWidth) - 0.5) * 8
    : 0;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: tilt
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.02 : 1})`
          : undefined,
        transition: 'transform 0.2s ease-out',
        willChange: isHovered ? 'transform' : undefined,
        background: isHovered
          ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`
          : undefined,
      }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
          style={{
            background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, ${glareColor}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
