import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwinklingStars, FloatingHearts } from '@/components/Decorations';

interface Page4WishProps {
  onContinue: () => void;
}

export function Page4Wish({ onContinue }: Page4WishProps) {
  const [showSecond, setShowSecond] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSecond(true), 2000);
    const t2 = setTimeout(() => setShowButton(true), 7000);
    timersRef.current = [t1, t2];

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #1a1033 0%, #2d1b4e 30%, #3d2960 60%, #4a2068 100%)',
      }}
    >
      <TwinklingStars count={40} />
      <FloatingHearts count={8} colors={['#ff5c8a', '#ffa8c5', '#c084fc']} />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
        className="absolute top-12 right-8 sm:right-16"
      >
        <div
          className="relative rounded-full"
          style={{
            width: '70px',
            height: '70px',
            background: 'radial-gradient(circle at 35% 35%, #fffde0, #fff8c4 60%, #f5e6a0 100%)',
            boxShadow: '0 0 30px rgba(255,248,196,0.5), 0 0 60px rgba(255,240,160,0.2)',
          }}
        >
          {/* Craters */}
          <div className="absolute rounded-full bg-yellow-200/30" style={{ top: '20%', left: '50%', width: '12px', height: '12px' }} />
          <div className="absolute rounded-full bg-yellow-200/20" style={{ top: '55%', left: '25%', width: '8px', height: '8px' }} />
          <div className="absolute rounded-full bg-yellow-200/25" style={{ top: '40%', left: '70%', width: '10px', height: '10px' }} />
        </div>
      </motion.div>

      {/* Light particles */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            width: '4px',
            height: '4px',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-2xl">
        {/* First message */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl text-white text-glow-soft mb-4"
        >
          CLOSE YOUR EYES... 💗
        </motion.h2>

        {/* Second message */}
        <AnimatePresence>
          {showSecond && (
            <motion.h3
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="font-script text-3xl sm:text-4xl md:text-5xl mb-8"
              style={{
                background: 'linear-gradient(90deg, #ff8fb1, #c084fc, #ff8fb1)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              AND MAKE A WISH, ADI ✨
            </motion.h3>
          )}
        </AnimatePresence>

        {/* Smaller message */}
        <AnimatePresence>
          {showSecond && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-body text-base sm:text-lg md:text-xl text-blush-100 leading-relaxed max-w-lg mx-auto"
            >
              I hope every beautiful dream in your heart comes true. You deserve all the
              happiness in this universe, my love. ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
          >
            MY NEXT SURPRISE 💌
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
