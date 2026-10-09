import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Sparkles } from '@/components/Decorations';

interface Page2BalloonsProps {
  onContinue: () => void;
}

const BALLOON_COLORS = [
  { body: '#ff5c8a', highlight: '#ff8fb1', string: '#c92a55' },
  { body: '#ff3d6e', highlight: '#ff6b8a', string: '#c41141' },
  { body: '#c084fc', highlight: '#d8b4fe', string: '#9333ea' },
  { body: '#ffb07a', highlight: '#ffc9a0', string: '#e08050' },
];

const REVEAL_WORDS = ['YOU', 'ARE', 'SOO', 'SPECIAL'];

interface Particle {
  id: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
  isHeart: boolean;
}

export function Page2Balloons({ onContinue }: Page2BalloonsProps) {
  const [popped, setPopped] = useState<boolean[]>([false, false, false, false]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const poppedCount = popped.filter(Boolean).length;
  const allPopped = poppedCount === 4;

  const popBalloon = (index: number) => {
    if (popped[index]) return;
    setPopped((prev) => prev.map((p, i) => (i === index ? true : p)));

    // Create particles
    const color = BALLOON_COLORS[index];
    const newParticles: Particle[] = Array.from({ length: 16 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 16;
      const dist = 60 + Math.random() * 80;
      return {
        id: index * 100 + i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: [color.body, color.highlight, '#fff', '#ffd700'][i % 4],
        size: 6 + Math.random() * 8,
        isHeart: Math.random() > 0.5,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1200);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <Sparkles count={12} />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-script text-3xl sm:text-4xl md:text-5xl text-blush-500 text-glow-pink text-center mb-2 mt-4"
      >
        Pop these little surprises, my love! 🎈💗
      </motion.h2>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <span className="font-body text-lg text-blush-600 bg-white/60 rounded-full px-5 py-2 glow-soft">
          {poppedCount} of 4 surprises unlocked 💕
        </span>
      </motion.div>

      {/* Balloons row */}
      <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 md:gap-10 mb-4 max-w-full">
        {BALLOON_COLORS.map((color, i) => (
          <div key={i} className="relative flex flex-col items-center" style={{ width: '22%' , maxWidth: '100px' }}>
            {/* Particles overlay */}
            <AnimatePresence>
              {popped[i] &&
                particles
                  .filter((p) => p.id >= i * 100 && p.id < (i + 1) * 100)
                  .map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3, rotate: 360 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute top-8 z-30 pointer-events-none"
                    >
                      {p.isHeart ? (
                        <div
                          className="css-heart"
                          style={{ fontSize: `${p.size}px`, background: p.color }}
                        />
                      ) : (
                        <div
                          style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: p.color,
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
            </AnimatePresence>

            {/* Balloon or revealed word */}
            <AnimatePresence mode="wait">
              {!popped[i] ? (
                <motion.button
                  key="balloon"
                  onClick={() => popBalloon(i)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -12, 0],
                  }}
                  exit={{ scale: [1, 1.3, 0], opacity: [1, 1, 0] }}
                  transition={{
                    scale: { duration: 0.4 },
                    opacity: { duration: 0.3 },
                    y: {
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.2 }}
                  aria-label={`Pop balloon ${i + 1}`}
                  className="relative cursor-pointer outline-none"
                  style={{ paddingTop: '10px' }}
                >
                  {/* Balloon body */}
                  <div
                    className="relative rounded-full"
                    style={{
                      width: '70px',
                      height: '88px',
                      background: `radial-gradient(circle at 30% 25%, ${color.highlight}, ${color.body} 70%)`,
                      boxShadow: `0 4px 20px ${color.body}50, inset -8px -8px 16px ${color.body}80`,
                    }}
                  >
                    {/* Highlight */}
                    <div
                      className="absolute rounded-full bg-white/40"
                      style={{ top: '12px', left: '14px', width: '18px', height: '14px' }}
                    />
                    {/* Knot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ bottom: '-6px', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${color.body}` }}
                    />
                  </div>
                  {/* String */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 origin-top"
                    style={{
                      top: '98px',
                      width: '1.5px',
                      height: '50px',
                      background: color.string,
                      opacity: 0.6,
                    }}
                  />
                </motion.button>
              ) : (
                <motion.div
                  key="word"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
                  className="flex flex-col items-center gap-1 pt-4"
                >
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-blush-500 text-glow-pink">
                    {REVEAL_WORDS[i]}
                  </span>
                  <Heart className="w-4 h-4 text-blush-400 fill-blush-400 animate-gentle-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Final combined message */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="text-center mt-4 mb-4"
          >
            <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold shimmer-text">
              YOU ARE SOO SPECIAL ❤️
            </p>
            {/* Heart explosion */}
            <div className="relative h-12 mt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: (i - 4) * 40,
                    y: [-10, -60],
                    opacity: [1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute left-1/2 top-0"
                >
                  <div
                    className="css-heart"
                    style={{
                      fontSize: '16px',
                      background: ['#ff5c8a', '#ff3d6e', '#ffa8c5'][i % 3],
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <div className="mt-auto pb-4">
        <motion.button
          onClick={onContinue}
          disabled={!allPopped}
          whileHover={allPopped ? { scale: 1.05 } : {}}
          whileTap={allPopped ? { scale: 0.95 } : {}}
          className={`px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-500 ${
            allPopped
              ? 'bg-gradient-to-r from-blush-400 to-rose-500 text-white glow-pink'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          CONTINUE, MY LOVE 💗
        </motion.button>
      </div>
    </div>
  );
}
