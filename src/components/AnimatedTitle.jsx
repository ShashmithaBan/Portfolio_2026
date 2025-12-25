import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function AnimatedTitle() {
  const { isDark } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    ['Cloud Engineering', 'Enthusiast'],
    ['DevOps', 'Enthusiast'],
    ['Full Stack', 'Developer']
  ];

  const typingSpeed = 50; // Speed of typing
  const deletingSpeed = 30; // Speed of deleting
  const pauseDuration = 2000; // Pause before starting to delete

  useEffect(() => {
    const currentTitlePair = titles[currentIndex];
    const currentTitle = currentTitlePair.join(' ');
    let timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to next title
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, titles]);

  // Split display text into two lines at the space
  const textParts = displayText.split(' ');
  const firstLine = textParts.slice(0, Math.ceil(textParts.length / 2)).join(' ');
  const secondLine = textParts.slice(Math.ceil(textParts.length / 2)).join(' ');

  return (
    <div className="min-h-24 lg:min-h-32">
      <h1 className={`text-5xl lg:text-6xl font-mono font-bold leading-tight ${isDark ? 'text-white' : 'text-[#64748b]'}`}>
       Devops  <br/> Enthusiast
        {/* {firstLine}
        <br />
        {secondLine} */}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
}
