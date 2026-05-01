import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    if (isTouchDevice) return;
    document.body.classList.add('cursor-hidden');

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onOver = (e) => {
      setIsHovering(!!e.target.closest('a, button, [role="button"], input, textarea, select'));
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.body.classList.remove('cursor-hidden');
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s',
        }}
      />
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${pos.x - 20}px, ${pos.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid white',
          opacity: isVisible ? 0.4 : 0,
          transition: 'transform 0.12s ease-out, opacity 0.15s',
        }}
      />
    </>
  );
}
