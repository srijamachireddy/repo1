import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FloatingHearts, Sparkles, ConfettiBurst } from '@/components/Decorations';

interface Page6LetterProps {
  onReplay: () => void;
}

const LETTER_TEXT = `My Dearest Adi, ❤️

Happy Birthday to the most special person in my life. 🥹💗

Today is all about celebrating you, the beautiful person you are, and the happiness you bring into my world. If I could give you one thing in life, I would give you the ability to see yourself through my eyes, because then you would understand just how incredibly special you are to me.

You are more than just my boyfriend. You are someone who makes my ordinary days feel special, someone who can make me smile without even trying, and someone who holds such a precious place in my heart.

On your birthday, I wish you endless happiness, good health, success in everything you do, and the courage to chase every dream you've ever had. I hope life gives you a thousand reasons to smile, and I hope I get to be there to celebrate so many of those beautiful moments with you.

No matter how big your dreams are, I will always be cheering for you. Never forget how talented, precious, and loved you are.

If there is one wish I could make today, it would be that you always stay happy and that life is as beautiful to you as you make it feel to me.

Thank you for being YOU. Thank you for existing and for being someone so special to my heart.

Happy Birthday once again, my love. ❤️🎂

You are my world, my favorite person, and a very special part of my happiness.

With all the love in my heart,
Yours forever, 💋❤️`;

export function Page6Letter({ onReplay }: Page6LetterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const startTyping = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    indexRef.current = 0;
    setDisplayedText('');
    setDone(false);

    intervalRef.current = setInterval(() => {
      if (indexRef.current >= LETTER_TEXT.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDone(true);
        return;
      }
      const char = LETTER_TEXT[indexRef.current];
      indexRef.current++;
      setDisplayedText((prev) => prev + char);
    }, 28);
  }, []);

  useEffect(() => {
    startTyping();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTyping]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowFinalMessage(true), 800);
      return () => clearTimeout(t);
    }
  }, [done]);

  const handleReadAll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText(LETTER_TEXT);
    setDone(true);
    setReadAll(true);
  };

  const handleCelebration = () => {
    setCelebrating(true);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center px-4 py-8 overflow-y-auto no-scrollbar"
      style={{ background: 'linear-gradient(160deg, #fff9f0 0%, #ffe4ec 40%, #fff5f8 70%, #f3e8ff 100%)' }}
    >
      <FloatingHearts count={14} />
      <Sparkles count={12} />

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 w-full max-w-2xl mt-4 mb-4"
      >
        <div
          className="relative rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #fffdfa 0%, #fff9f0 100%)',
            border: '2px solid #ffc9dd',
            boxShadow: '0 10px 40px rgba(255,150,180,0.2), inset 0 0 20px rgba(255,240,245,0.5)',
          }}
        >
          {/* Floral corners */}
          <div className="absolute top-3 left-3 text-2xl opacity-60">🌸</div>
          <div className="absolute top-3 right-3 text-2xl opacity-60">🌸</div>
          <div className="absolute bottom-3 left-3 text-2xl opacity-60">🌸</div>
          <div className="absolute bottom-3 right-3 text-2xl opacity-60">🌸</div>

          {/* Tiny hearts in corners */}
          <div className="absolute top-6 left-8">
            <Heart className="w-3 h-3 text-blush-300 fill-blush-300" />
          </div>
          <div className="absolute top-6 right-8">
            <Heart className="w-3 h-3 text-blush-300 fill-blush-300" />
          </div>

          {/* Wax seal */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: '56px',
                height: '56px',
                background: 'radial-gradient(circle at 35% 35%, #ff5c8a, #c92a55)',
                boxShadow: '0 4px 12px rgba(201,42,85,0.4), inset -3px -3px 8px rgba(0,0,0,0.2)',
              }}
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="font-script text-3xl sm:text-4xl text-blush-500 text-center text-glow-pink mb-6">
            A Message From My Heart 💌
          </h2>

          {/* Letter text */}
          <div
            className="font-script text-lg sm:text-xl text-blush-800 leading-relaxed whitespace-pre-wrap min-h-[200px] cursor-pointer"
            onClick={handleReadAll}
            style={{ lineHeight: '1.8' }}
          >
            {displayedText}
            {!done && <span className="inline-block w-0.5 h-5 bg-blush-400 ml-0.5 animate-pulse" />}
          </div>

          {/* Read All button */}
          <AnimatePresence>
            {!done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center mt-4"
              >
                <button
                  onClick={handleReadAll}
                  className="px-6 py-2 rounded-full bg-blush-100 text-blush-500 font-body font-medium text-sm border border-blush-200 hover:bg-blush-200 transition-colors"
                >
                  Read All ✨
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing indicator */}
          {!done && !readAll && (
            <p className="font-body text-xs text-blush-300 text-center mt-2">
              Click the letter to reveal it all at once 💗
            </p>
          )}
        </div>
      </motion.div>

      {/* Final animated message */}
      <AnimatePresence>
        {showFinalMessage && !celebrating && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="relative z-10 text-center mb-6 mt-2"
          >
            <p className="font-script text-2xl sm:text-3xl text-blush-500 text-glow-pink mb-6">
              Forever has a beautiful sound when I imagine it with you. ❤️
            </p>

            {/* Beating heart */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <div
                  className="css-heart"
                  style={{
                    fontSize: '50px',
                    background: 'linear-gradient(135deg, #ff5c8a, #ff3d6e)',
                    filter: 'drop-shadow(0 0 20px rgba(255,92,138,0.6))',
                  }}
                />
              </motion.div>
            </div>

            {/* Hugs & kisses button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCelebration}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-blush-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
            >
              HUGS & KISSES FOR YOU 💋
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final celebration */}
      <AnimatePresence>
        {celebrating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,228,236,0.95) 0%, rgba(243,232,255,0.95) 100%)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <ConfettiBurst count={80} />

            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 60, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 shimmer-text"
            >
              HAPPY BIRTHDAY, MY ADI! ❤️🎉💖
            </motion.h1>

            {/* Beating heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="mb-8"
            >
              <div
                className="css-heart"
                style={{
                  fontSize: '60px',
                  background: 'linear-gradient(135deg, #ff5c8a, #ff3d6e)',
                  filter: 'drop-shadow(0 0 25px rgba(255,92,138,0.6))',
                }}
              />
            </motion.div>

            {/* Replay button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReplay}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
            >
              Replay Our Love Story 💗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
