import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};

export default function AnimatedTitle() {
  const { isDark } = useContext(ThemeContext);

  const line1 = 'DevOps';
  const line2 = 'Enthusiast';

  return (
    <div className="min-h-14 lg:min-h-16" style={{ perspective: 600 }}>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className={`text-2xl sm:text-3xl lg:text-4xl font-mono font-bold leading-tight ${isDark ? 'text-white' : 'text-[#64748b]'}`}
      >
        {line1.split('').map((char, i) => (
          <motion.span key={`l1-${i}`} variants={letterVariant} className="inline-block">
            {char}
          </motion.span>
        ))}
        <br />
        {line2.split('').map((char, i) => (
          <motion.span key={`l2-${i}`} variants={letterVariant} className="inline-block">
            {char}
          </motion.span>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
          className={isDark ? 'text-[#F58840]' : 'text-[#64748b]'}
        >
          |
        </motion.span>
      </motion.h1>
    </div>
  );
}
