import { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';

const name = 'Shashmitha';
const tagline = 'DevOps Engineer';

const codeSnippets = [
  'docker build -t app .',
  'kubectl apply -f deploy.yaml',
  'git push origin main',
  'terraform plan',
  'ansible-playbook site.yml',
  'helm upgrade --install',
  'aws ecs update-service',
  'pipeline { agent any }',
  'FROM node:20-alpine',
  'npm run build',
  'stages: [build, test, deploy]',
  'replicas: 3',
  'export default function()',
  'const server = express()',
  'prometheus.io/scrape: "true"',
  'grafana dashboard reload',
];

const codeSymbols = [
  '{ }', '< />', '=>', '//', '&&', '||', '/* */', '#!/bin/bash',
  '$ _', '...', '()', '[]', '::', '>>',  '#!', '%%',
];

const terminalLines = [
  { text: '> initializing system...', delay: 0 },
  { text: '> loading modules [========]', delay: 0.4 },
  { text: '> compiling portfolio v2.0', delay: 0.9 },
  { text: '> deploying to production...', delay: 1.4 },
  { text: '> status: ready ✓', delay: 2.0 },
];

const letterVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)', rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.06,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const taglineVariants = {
  hidden: { opacity: 0, y: 20, letterSpacing: '0.5em' },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.3em',
    transition: { delay: 1.1, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const exitVariants = {
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(10px)',
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

function FloatingSnippet({ snippet, index, isDark, accentRgb }) {
  const isSymbol = codeSymbols.includes(snippet);
  const seed = index * 137.5;
  const left = (seed % 90) + 5;
  const top = ((seed * 2.3) % 80) + 10;
  const duration = 15 + (index % 8) * 3;
  const delay = (index % 5) * 0.8;
  const size = isSymbol ? 'text-lg sm:text-xl' : 'text-[9px] sm:text-[10px]';

  return (
    <motion.span
      className={`absolute font-mono ${size} pointer-events-none select-none whitespace-nowrap`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        color: isDark
          ? `rgba(${accentRgb}, ${isSymbol ? 0.12 : 0.07})`
          : `rgba(0, 0, 0, ${isSymbol ? 0.12 : 0.08})`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -15, 0, 10, 0],
        x: [0, 8, -5, 3, 0],
        rotate: [0, 1, -1, 0.5, 0],
      }}
      transition={{
        opacity: { delay: 0.2 + delay, duration: 1 },
        y: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
        x: { delay: delay + 1, duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
        rotate: { delay, duration: duration * 0.8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {snippet}
    </motion.span>
  );
}

FloatingSnippet.propTypes = {
  snippet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDark: PropTypes.bool.isRequired,
  accentRgb: PropTypes.string.isRequired,
};

function TerminalTyper({ lines, isDark, accentRgb }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typingIndex >= lines.length) return;

    const line = lines[typingIndex];
    const startTimeout = setTimeout(() => {
      let charIdx = 0;
      intervalRef.current = setInterval(() => {
        charIdx++;
        setCurrentText(line.text.slice(0, charIdx));
        if (charIdx >= line.text.length) {
          clearInterval(intervalRef.current);
          setVisibleLines((prev) => [...prev, line.text]);
          setCurrentText('');
          setTypingIndex((prev) => prev + 1);
        }
      }, 25);
    }, line.delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [typingIndex, lines]);

  return (
    <div
      className="font-mono text-[9px] sm:text-[10px] text-left w-[240px] sm:w-[280px]"
      style={{ color: isDark ? `rgba(${accentRgb}, 0.4)` : 'rgba(0, 0, 0, 0.45)' }}
    >
      {visibleLines.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="leading-relaxed"
        >
          {text}
        </motion.div>
      ))}
      {currentText && (
        <div className="leading-relaxed">
          {currentText}
          <span className="animate-pulse">▌</span>
        </div>
      )}
    </div>
  );
}

TerminalTyper.propTypes = {
  lines: PropTypes.array.isRequired,
  isDark: PropTypes.bool.isRequired,
  accentRgb: PropTypes.string.isRequired,
};

export default function LoadScreen({ onVisibilityChange }) {
  const { isDark } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const accent = '#F58840';
  const accentRgb = '245, 136, 64';

  const allFloatingItems = [...codeSnippets, ...codeSymbols];

  useEffect(() => {
    if (onVisibilityChange) onVisibilityChange(true);

    const duration = 3000;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onVisibilityChange) onVisibilityChange(false);
        }, 600);
      }
    };

    requestAnimationFrame(tick);
  }, [onVisibilityChange]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          variants={exitVariants}
          exit="exit"
          animate={exiting ? 'exit' : 'visible'}
        >
          {/* Background */}
          <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`}>
            {/* Radial glow behind name */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: isDark
                  ? `radial-gradient(circle, rgba(${accentRgb}, 0.08) 0%, transparent 70%)`
                  : 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
              }}
            />

            {/* Subtle grid */}
            <div
              className="absolute inset-0"
              style={{
                opacity: isDark ? 0.03 : 0.08,
                backgroundImage: isDark
                  ? `linear-gradient(rgba(${accentRgb}, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb}, 0.5) 1px, transparent 1px)`
                  : 'linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />

            {/* Floating code snippets & symbols */}
            {allFloatingItems.map((snippet, i) => (
              <FloatingSnippet
                key={i}
                snippet={snippet}
                index={i}
                isDark={isDark}
                accentRgb={accentRgb}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Code bracket decoration - top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-mono text-sm sm:text-base mb-4"
              style={{ color: isDark ? `rgba(${accentRgb}, 0.3)` : 'rgba(0, 0, 0, 0.25)' }}
            >
              {'<'}
              <span style={{ color: isDark ? `rgba(${accentRgb}, 0.5)` : 'rgba(0, 0, 0, 0.45)' }}>Works @ H2O.ai</span>
              {'>'}
            </motion.div>

            {/* Monogram */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="mb-8"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${isDark ? '#B85252' : '#e87a3a'})`,
                  boxShadow: `0 0 40px rgba(${accentRgb}, 0.3), 0 0 80px rgba(${accentRgb}, 0.1)`,
                }}
              >
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  S
                </span>
                {/* Rotating border */}
                <div
                  className="absolute -inset-1 rounded-2xl border border-dashed animate-spin"
                  style={{
                    borderColor: isDark ? `rgba(${accentRgb}, 0.2)` : 'rgba(0, 0, 0, 0.15)',
                    animationDuration: '8s',
                  }}
                />
              </div>
            </motion.div>

            {/* Name - letter by letter */}
            <div className="flex overflow-hidden mb-3" style={{ perspective: 800 }}>
              {name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: "'Playfair Display', serif", display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4, type: 'spring', stiffness: 300 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ color: accent, fontFamily: "'Playfair Display', serif" }}
              >
                .
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              className={`text-[10px] sm:text-xs font-mono uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
            >
              {tagline}
            </motion.p>

            {/* Code bracket decoration - bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="font-mono text-sm sm:text-base mt-2"
              style={{ color: isDark ? `rgba(${accentRgb}, 0.3)` : 'rgba(0, 0, 0, 0.25)' }}
            >
              {'<---'}
              <span style={{ color: isDark ? `rgba(${accentRgb}, 0.5)` : 'rgba(0, 0, 0, 0.45)' }}>Cloud Enthusiast</span>
              {'--->'}
            </motion.div>

            {/* Terminal typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 rounded-lg px-4 py-3 border"
              style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)',
              }}
            >
              {/* Terminal header dots */}
              <div className="flex gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              <TerminalTyper lines={terminalLines} isDark={isDark} accentRgb={accentRgb} />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6"
            >
              <div
                className={`h-[2px] rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/10'}`}
                style={{ width: 200 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${accent}, ${isDark ? '#B85252' : '#e87a3a'})`,
                    boxShadow: `0 0 10px rgba(${accentRgb}, 0.5)`,
                  }}
                />
              </div>

              {/* Percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`text-center mt-3 text-[10px] font-mono tabular-nums ${isDark ? 'text-gray-600' : 'text-gray-500'}`}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

LoadScreen.propTypes = {
  onVisibilityChange: PropTypes.func,
};
