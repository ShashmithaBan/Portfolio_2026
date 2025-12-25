import React, { useState, useEffect, useRef } from 'react';

// Spiral Rocket Component
function SpiralRocket() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(0.8);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    let animationFrame;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      const spiralSpeed = 0.08;
      const radiusOscillation = 0.02;
      
      const minRadius = 15;
      const maxRadius = 40;
      const radiusCycle = (Math.sin(elapsed * radiusOscillation) + 1) / 2;
      const radius = minRadius + radiusCycle * (maxRadius - minRadius);
      
      const angle = elapsed * spiralSpeed;
      
      const centerX = 50;
      const centerY = 50;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const tangentAngle = (angle + Math.PI / 2) * (180 / Math.PI);
      const newScale = 0.6 + radiusCycle * 0.5;
      
      setPosition({ x, y });
      setScale(newScale);
      setRotation(tangentAngle);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const opacity = 0.4 + (scale - 0.6) * 0.35;
  
  return { position, scale, rotation, opacity };
}

// Wandering Rocket Component
function WanderingRocket() {
  const [position, setPosition] = useState({ x: 80, y: 20 });
  const [scale, setScale] = useState(0.7);
  const [rotation, setRotation] = useState(0);
  
  const targetPos = useRef({ x: 20, y: 70 });
  const targetScale = useRef(0.7);
  const currentPos = useRef({ x: 80, y: 20 });
  
  useEffect(() => {
    let animationFrame;
    let lastTargetChange = Date.now();
    
    const generateNewTarget = () => {
      targetPos.current = {
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80
      };
      targetScale.current = 0.5 + Math.random() * 0.5;
    };
    
    generateNewTarget();
    
    const animate = () => {
      const now = Date.now();
      
      // Change target every 10-18 seconds
      if (now - lastTargetChange > 10000 + Math.random() * 8000) {
        generateNewTarget();
        lastTargetChange = now;
      }
      
      // Smooth interpolation
      const easing = 0.003;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * easing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * easing;
      
      // Calculate direction for rotation
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      // Smooth scale
      const currentScale = scale;
      const newScale = currentScale + (targetScale.current - currentScale) * 0.005;
      
      setPosition({ x: currentPos.current.x, y: currentPos.current.y });
      setScale(newScale);
      setRotation(angle);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const opacity = 0.35 + (scale - 0.5) * 0.3;
  
  return { position, scale, rotation, opacity };
}

// Rocket SVG Component
function RocketSVG({ id }) {
  return (
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M32 4C32 4 20 16 20 36C20 44 24 52 32 56C40 52 44 44 44 36C44 16 32 4 32 4Z" 
        fill={`url(#rocketGradient${id})`}
        stroke="#f97316"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="28" r="6" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1"/>
      <circle cx="32" cy="28" r="3" fill="#7dd3fc" opacity="0.6"/>
      <path d="M20 40L12 52L20 48V40Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1"/>
      <path d="M44 40L52 52L44 48V40Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1"/>
      <path d="M32 4L28 12H36L32 4Z" fill="#f97316"/>
      <ellipse cx="32" cy="60" rx="5" ry="7" fill={`url(#flameGradient${id})`}/>
      <ellipse cx="32" cy="58" rx="2.5" ry="4" fill="#fef08a"/>
      <defs>
        <linearGradient id={`rocketGradient${id}`} x1="32" y1="4" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc"/>
          <stop offset="50%" stopColor="#e2e8f0"/>
          <stop offset="100%" stopColor="#cbd5e1"/>
        </linearGradient>
        <linearGradient id={`flameGradient${id}`} x1="32" y1="52" x2="32" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="40%" stopColor="#ef4444"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FloatingRocket() {
  const spiral = SpiralRocket();
  const wandering = WanderingRocket();
  
  return (
    <>
      {/* Spiral Rocket */}
      <div 
        className="fixed pointer-events-none z-10"
        style={{
          left: `${spiral.position.x}%`,
          top: `${spiral.position.y}%`,
          transform: `translate(-50%, -50%) scale(${spiral.scale}) rotate(${spiral.rotation}deg)`,
          opacity: spiral.opacity,
          filter: `drop-shadow(0 0 8px rgba(251, 146, 60, 0.2))`,
        }}
      >
        <RocketSVG id="1" />
      </div>
      
      {/* Wandering Rocket */}
      <div 
        className="fixed pointer-events-none z-10"
        style={{
          left: `${wandering.position.x}%`,
          top: `${wandering.position.y}%`,
          transform: `translate(-50%, -50%) scale(${wandering.scale}) rotate(${wandering.rotation}deg)`,
          opacity: wandering.opacity,
          filter: `drop-shadow(0 0 8px rgba(251, 146, 60, 0.2))`,
        }}
      >
        <RocketSVG id="2" />
      </div>
    </>
  );
}
