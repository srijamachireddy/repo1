import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles as SparklesIcon } from 'lucide-react';
import { FloatingHearts, Sparkles } from '@/components/Decorations';

interface Page1WelcomeProps {
  onContinue: () => void;
}

export function Page1Welcome({ onContinue }: Page1WelcomeProps) {
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [noClicks, setNoClicks] = useState(0);

  const headingLetters = useMemo(
    () => 'HAPPY BIRTHDAY, ADI'.split(''),
    []
  );

  const handleNo = () => {
    setShowNoMessage(true);
    setNoClicks((c) => c + 1);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <FloatingHearts count={24} />
      <Sparkles count={18} />

      {/* Decorative sparkles around heading */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center gap-2 mb-4"
        >
          <SparklesIcon className="w-6 h-6 text-blush-300 animate-sparkle-twinkle" />
          <span className="font-script text-2xl text-blush-400">A Special Surprise</span>
          <SparklesIcon className="w-6 h-6 text-blush-300 animate-sparkle-twinkle" />
        </motion.div>

        {/* Animated heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
          {headingLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.05,
                type: 'spring',
                stiffness: 100,
              }}
              className="shimmer-text inline-block"
              style={{ marginRight: char === ' ' ? '0.3em' : '0' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Heart emoji */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 120 }}
          className="text-5xl sm:text-6xl mb-6"
        >
          <span className="inline-block animate-heartbeat">❤️</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="font-script text-2xl sm:text-3xl text-blush-500 mb-10 text-glow-pink"
        >
          Are you excited for what's next? 💗
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 animate-heartbeat" />
            <span className="relative flex items-center gap-2">
              <Heart className="w-5 h-5 fill-white" />
              YES!
              <Heart className="w-5 h-5 fill-white" />
            </span>
          </motion.button>

          <motion.button
            onClick={handleNo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              noClicks > 0
                ? { x: [0, -10, 10, -8, 8, 0], rotate: [0, -5, 5, -3, 3, 0] }
                : {}
            }
            transition={{ duration: 0.5 }}
            className="px-10 py-4 rounded-full bg-white/80 text-blush-500 font-body font-semibold text-lg shadow-md border-2 border-blush-200 hover:border-blush-300 transition-colors"
          >
            NO 🙈
          </motion.button>
        </motion.div>

        {/* Funny NO message */}
        <AnimatePresence>
          {showNoMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="mt-8 max-w-md mx-auto"
            >
              <div className="glass-card rounded-2xl px-6 py-4 glow-soft">
                <p className="font-script text-xl sm:text-2xl text-blush-600">
                  Awww, don't be shy, birthday boy! 🥹💕 Try again!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-10 left-4 sm:left-10 opacity-60">
        <div className="text-4xl animate-bounce-soft">🎈</div>
      </div>
      <div className="absolute bottom-20 right-4 sm:right-10 opacity-60">
        <div className="text-4xl animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
          🎁
        </div>
      </div>
    </div>
  );
}
