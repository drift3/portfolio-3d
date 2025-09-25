import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeOverlay.css';

const WelcomeOverlay = () => {
  const [countdown, setCountdown] = useState(6); // Changed from 8 to 6
  const [isVisible, setIsVisible] = useState(true);
  const [countdownStarted, setCountdownStarted] = useState(false);

  // Start countdown after a 2-second delay to let animations settle
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setCountdownStarted(true);
    }, 2000);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!isVisible || countdown === 0 || !countdownStarted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isVisible, countdownStarted]);

  // Cyberpunk neon grid lines (reduced for performance)
  const gridLines = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    isVertical: i % 2 === 0,
    position: 15 + (i * 15),
    delay: i * 0.3,
    duration: 4,
  }));

  // Pulsing neon particles (optimized count)
  const neonParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 20 + (i * 10) + Math.random() * 10,
    y: 20 + Math.random() * 60,
    delay: i * 0.4,
    duration: 6,
    size: 3 + (i % 2),
    color: ['cyan', 'purple', 'pink'][i % 3]
  }));

  // Glitch particles for exit (reduced count)
  const glitchParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.05,
  }));

  const overlayVariants = {
    initial: {
      x: '-100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 1,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
  };

  // Mobile responsive variants
  const mobileOverlayVariants = {
    initial: {
      y: '-100%',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 1,
      },
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
  };

  const countdownVariants = {
    initial: { scale: 0.3, opacity: 0, y: 30 },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
        duration: 0.8,
      },
    },
    exit: { 
      scale: 2, 
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      },
    },
  };

  // Neon glitch exit variants
  const glitchVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0.8, 1, 0],
      scale: [0, 1.2, 0.8, 1.5, 0],
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: Left half cyberpunk overlay */}
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hidden md:flex fixed inset-y-0 left-0 w-1/2 z-50 items-center justify-center pointer-events-none overflow-hidden cyberpunk-overlay"
          >
            {/* Dark cyberpunk glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/80 to-slate-900/95 backdrop-blur-optimized border-r-2 border-cyan-500/30 shadow-2xl glassmorphism-bg" />
            
            {/* Neon gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent" />

            {/* Cyberpunk grid lines */}
            {gridLines.map((line) => (
              <motion.div
                key={line.id}
                className={`absolute ${line.isVertical ? 'w-px h-full' : 'h-px w-full'} bg-gradient-to-${line.isVertical ? 'b' : 'r'} from-transparent via-cyan-400/40 to-transparent`}
                style={{
                  [line.isVertical ? 'left' : 'top']: `${line.position}%`,
                  willChange: 'opacity',
                }}
                animate={{
                  opacity: [0, 0.8, 0.3, 0.8, 0],
                }}
                transition={{
                  duration: line.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: line.delay,
                }}
              />
            ))}

            {/* Pulsing neon particles */}
            {neonParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.color === 'cyan' ? 'bg-cyan-400/80' :
                  particle.color === 'purple' ? 'bg-purple-400/80' : 'bg-pink-400/80'
                }`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  boxShadow: `0 0 ${particle.size * 2}px currentColor`,
                  willChange: 'transform, opacity',
                  transform: 'translate3d(0, 0, 0)',
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: particle.delay,
                }}
              />
            ))}

            {/* Animated neon circuit lines (optimized) */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ willChange: 'auto' }}>
              <defs>
                <linearGradient id="neonLineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                  <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                </linearGradient>
                <linearGradient id="neonLineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                </linearGradient>
              </defs>
              
              {[0, 1].map((i) => (
                <motion.path
                  key={i}
                  d={`M${20 + i * 40},${30 + i * 30} L${60 + i * 20},${70 + i * 20} L${80 - i * 15},${50 + i * 15}`}
                  stroke={i % 2 === 0 ? "url(#neonLineGradient1)" : "url(#neonLineGradient2)"}
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 1.5,
                  }}
                />
              ))}
            </svg>

            {/* Central cyberpunk content */}
            <div className="relative z-10 text-center px-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                className="mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-mono font-light mb-3 tracking-wider"
                    style={{
                      color: '#00ffff',
                      textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
                    }}>
                  WELCOME TO
                </h2>
                <h1 className="text-4xl md:text-5xl font-mono font-bold leading-tight"
                    style={{
                      background: 'linear-gradient(45deg, #ff006e, #00ffff, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 30px rgba(255, 0, 110, 0.5)',
                    }}>
                  MY PORTFOLIO
                </h1>
              </motion.div>

              {/* Amazing cyberpunk countdown circle with number inside */}
              <motion.div
                className="relative mx-auto mb-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, type: 'spring', bounce: 0.3 }}
              >
                {/* Outer rotating neon ring */}
                <motion.div
                  className="relative"
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <svg width="200" height="200" className="mx-auto">
                    <defs>
                      <linearGradient id="neonRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00ffff" />
                        <stop offset="33%" stopColor="#a855f7" />
                        <stop offset="66%" stopColor="#ff006e" />
                        <stop offset="100%" stopColor="#00ffff" />
                      </linearGradient>
                      <filter id="superGlow">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Outer pulsing glow ring */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke="url(#neonRingGradient)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                      filter="url(#superGlow)"
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        r: [88, 95, 88],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    {/* Main countdown progress ring */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="75"
                      stroke="url(#neonRingGradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={471}
                      strokeDashoffset={471 - (471 * (6 - countdown)) / 6}
                      strokeLinecap="round"
                      filter="url(#superGlow)"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    {/* Inner cyberpunk circle */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="rgba(0, 255, 255, 0.1)"
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="1"
                      animate={{
                        fill: [
                          'rgba(0, 255, 255, 0.1)',
                          'rgba(168, 85, 247, 0.1)',
                          'rgba(255, 0, 110, 0.1)',
                          'rgba(0, 255, 255, 0.1)',
                        ],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </svg>
                </motion.div>

                {/* Countdown number INSIDE the circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={countdown}
                      variants={countdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-6xl md:text-7xl font-mono font-black"
                      style={{
                        color: '#00ffff',
                        textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
                      }}
                    >
                      {countdown}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Additional floating neon number above ring (as requested) */}
                <motion.div 
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={countdown}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="text-2xl font-mono font-bold"
                      style={{
                        color: '#a855f7',
                        textShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
                      }}
                    >
                      {countdown}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-lg md:text-xl font-mono font-light tracking-widest"
                style={{
                  color: '#ff006e',
                  textShadow: '0 0 15px rgba(255, 0, 110, 0.4)',
                }}
              >
                By Ahmed Farouk +201020647876
              </motion.p>
            </div>

            {/* Cyberpunk scanlines effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="w-full h-full opacity-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
                }}
              />
            </div>
          </motion.div>

          {/* Mobile: Top half cyberpunk overlay */}
          <motion.div
            variants={mobileOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden fixed inset-x-0 top-0 h-1/2 z-50 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            {/* Mobile cyberpunk background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-purple-900/85 to-slate-900/95 backdrop-blur-3xl border-b-2 border-cyan-500/30 shadow-2xl" />
            
            {/* Mobile neon particles (fewer for performance) */}
            {neonParticles.slice(0, 4).map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.color === 'cyan' ? 'bg-cyan-400/70' :
                  particle.color === 'purple' ? 'bg-purple-400/70' : 'bg-pink-400/70'
                }`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  boxShadow: `0 0 ${particle.size * 2}px currentColor`,
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: particle.delay,
                }}
              />
            ))}

            {/* Mobile content */}
            <div className="relative z-10 text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-6"
              >
                <h2 className="text-lg font-mono font-light mb-2 tracking-wider"
                    style={{
                      color: '#00ffff',
                      textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                    }}>
                  WELCOME TO
                </h2>
                <h1 className="text-xl font-mono font-bold"
                    style={{
                      background: 'linear-gradient(45deg, #ff006e, #00ffff, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 20px rgba(255, 0, 110, 0.4)',
                    }}>
                  MY PORTFOLIO
                </h1>
              </motion.div>

              {/* Mobile countdown */}
              <motion.div
                className="relative mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <svg width="120" height="120" className="mx-auto">
                  <defs>
                    <linearGradient id="mobileNeonRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ffff" />
                      <stop offset="33%" stopColor="#a855f7" />
                      <stop offset="66%" stopColor="#ff006e" />
                      <stop offset="100%" stopColor="#00ffff" />
                    </linearGradient>
                    <filter id="mobileSuperGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Outer pulsing glow ring for mobile */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#mobileNeonRingGradient)"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.4"
                    filter="url(#mobileSuperGlow)"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      r: [48, 52, 48],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Main countdown progress ring */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="url(#mobileNeonRingGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * (6 - countdown)) / 6}
                    strokeLinecap="round"
                    filter="url(#mobileSuperGlow)"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Inner mobile circle */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="35"
                    fill="rgba(0, 255, 255, 0.1)"
                    stroke="rgba(0, 255, 255, 0.3)"
                    strokeWidth="1"
                    animate={{
                      fill: [
                        'rgba(0, 255, 255, 0.1)',
                        'rgba(168, 85, 247, 0.1)',
                        'rgba(255, 0, 110, 0.1)',
                        'rgba(0, 255, 255, 0.1)',
                      ],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={countdown}
                      variants={countdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-4xl font-mono font-black"
                      style={{
                        color: '#00ffff',
                        textShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
                      }}
                    >
                      {countdown}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-sm font-mono tracking-wider"
                style={{
                  color: '#ff006e',
                  textShadow: '0 0 10px rgba(255, 0, 110, 0.4)',
                }}
              >
                By Ahmed Farouk +201020647876
              </motion.p>
            </div>
          </motion.div>

          {/* Glitch exit particles */}
          {!isVisible && (
            <motion.div className="fixed inset-0 z-50 pointer-events-none">
              {glitchParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-cyan-400"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    boxShadow: '0 0 10px currentColor',
                  }}
                  variants={glitchVariants}
                  initial="initial"
                  animate="animate"
                />
              ))}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;