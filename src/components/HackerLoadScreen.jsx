import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function HackerLoadScreen({ isVisible, onComplete }) {
  const { isDark } = useContext(ThemeContext);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const codeSnippets = [
    'git clone https://github.com/user/portfolio.git',
    'cd portfolio && npm install',
    '$ npm run dev',
    'Compiling assets...',
    'Building Docker image...',
    'Deploying to AWS...',
    '✓ Frontend compiled',
    '✓ Backend ready',
    '✓ Database connected',
    '✓ Services healthy',
    'Loading portfolio...',
    '> npm start',
    'Server running on https://shashmitha-devops.vercel.app/',
    'Ready to impress 🚀',
  ];

  useEffect(() => {
    if (!isVisible) return;

    let currentLine = 0;
    let currentChar = 0;
    let fullText = '';

    const typeInterval = setInterval(() => {
      if (currentLine < codeSnippets.length) {
        const currentSnippet = codeSnippets[currentLine];
        
        if (currentChar < currentSnippet.length) {
          fullText += currentSnippet[currentChar];
          currentChar++;
          setDisplayedCode(fullText);
        } else {
          // Move to next line
          fullText += '\n';
          currentChar = 0;
          currentLine++;
          setDisplayedCode(fullText);
        }
      } else {
        // Typing complete
        setIsLoading(false);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  // Auto-hide after typing completes + 1 second
  useEffect(() => {
    if (!isLoading && isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isVisible, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
      isVisible 
        ? 'opacity-100' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* Background with grid pattern */}
      <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`}>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: isDark 
            ? 'linear-gradient(0deg, transparent 24%, rgba(251, 191, 36, 0.05) 25%, rgba(251, 191, 36, 0.05) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.05) 75%, rgba(251, 191, 36, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(251, 191, 36, 0.05) 25%, rgba(251, 191, 36, 0.05) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.05) 75%, rgba(251, 191, 36, 0.05) 76%, transparent 77%, transparent)'
            : 'linear-gradient(0deg, transparent 24%, rgba(100, 116, 139, 0.05) 25%, rgba(100, 116, 139, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 116, 139, 0.05) 75%, rgba(100, 116, 139, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(100, 116, 139, 0.05) 25%, rgba(100, 116, 139, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 116, 139, 0.05) 75%, rgba(100, 116, 139, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Terminal window */}
          <div className={`border rounded-lg overflow-hidden shadow-2xl ${
            isDark 
              ? 'border-[#EADEDE]/50 shadow-[#EADEDE]/40 bg-black'
              : 'border-[#64748b]/50 shadow-[#64748b]/40 bg-white'
          }`}>
            {/* Terminal header */}
            <div className={`border-b px-4 py-3 flex items-center gap-2 ${
              isDark 
                ? 'bg-slate-900 border-[#EADEDE]/50'
                : 'bg-white border-[#64748b]/50'
            }`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className={`text-sm font-mono ml-4 ${isDark ? 'text-[#EADEDE]' : 'text-[#64748b]'}`}>portfolio-loader.sh</span>
            </div>

            {/* Terminal content */}
            <div className={`p-6 min-h-96 ${isDark ? 'bg-black' : 'bg-white'}`}>
              <div className={`font-mono text-sm whitespace-pre-wrap break-words font-fira ${isDark ? 'text-[#EADEDE]' : 'text-[#64748b]'}`}>
                <span>{displayedCode}</span>
                {isLoading && <span className="animate-pulse">█</span>}
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="mt-6 text-center">
            <p className= {`${isDark ? 'text-[#EADEDE]' : 'text-[#64748b]'} text-sm font-mono`}>
              {isLoading ? 'Initializing...' : 'Ready'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
