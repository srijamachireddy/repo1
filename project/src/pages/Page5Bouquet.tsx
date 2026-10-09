import { motion } from 'framer-motion';
import { FallingPetals, FloatingHearts, Sparkles } from '@/components/Decorations';

interface Page5BouquetProps {
  onContinue: () => void;
}

export function Page5Bouquet({ onContinue }: Page5BouquetProps) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <FloatingHearts count={12} />
      <FallingPetals count={14} />
      <Sparkles count={14} />

      {/* Bouquet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 60 }}
        className="relative mb-6 mt-4"
      >
        {/* Wrapper paper (blush pink) */}
        <div className="relative" style={{ width: '220px', height: '240px' }}>
          {/* Outer wrapper */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '180px',
              height: '120px',
              background: 'linear-gradient(135deg, #ffc9dd 0%, #ffa8c5 50%, #ff8fb1 100%)',
              clipPath: 'polygon(15% 100%, 85% 100%, 75% 20%, 25% 20%)',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 8px 20px rgba(255,150,180,0.3)',
            }}
          />
          {/* Inner wrapper (lighter) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '140px',
              height: '100px',
              background: 'linear-gradient(135deg, #fff5f8, #ffe4ec)',
              clipPath: 'polygon(15% 100%, 85% 100%, 70% 25%, 30% 25%)',
              borderRadius: '0 0 8px 8px',
            }}
          />

          {/* Ribbon */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ bottom: '50px', width: '180px', height: '16px' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, #ff5c8a, #ec3d6f)',
                boxShadow: '0 2px 6px rgba(255,92,138,0.3)',
              }}
            />
            {/* Ribbon tails */}
            <div
              className="absolute"
              style={{
                left: '20px',
                top: '14px',
                width: '18px',
                height: '30px',
                background: '#ec3d6f',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                transform: 'rotate(-15deg)',
              }}
            />
            <div
              className="absolute"
              style={{
                right: '20px',
                top: '14px',
                width: '18px',
                height: '30px',
                background: '#ec3d6f',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                transform: 'rotate(15deg)',
              }}
            />
            {/* Ribbon knot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                top: '4px',
                width: '20px',
                height: '16px',
                background: '#c92a55',
              }}
            />
          </div>

          {/* Flowers - arranged in a bouquet shape */}
          <div className="absolute top-0 left-0 right-0" style={{ height: '160px' }}>
            {/* Roses and flowers */}
            {ROSES.map((rose, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.5 + i * 0.12,
                  type: 'spring',
                  stiffness: 80,
                }}
                className="absolute"
                style={{
                  left: `${rose.left}%`,
                  top: `${rose.top}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Rose */}
                <div
                  className="relative rounded-full"
                  style={{
                    width: `${rose.size}px`,
                    height: `${rose.size}px`,
                    background: `radial-gradient(circle at 30% 30%, ${rose.highlight}, ${rose.color} 70%)`,
                    boxShadow: `0 3px 8px ${rose.color}40, inset -4px -4px 8px ${rose.color}80`,
                  }}
                >
                  {/* Rose petals detail */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 4px, ${rose.color}40 4px, ${rose.color}40 5px)`,
                    }}
                  />
                  {/* Center */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: '30%',
                      height: '30%',
                      background: rose.color,
                      opacity: 0.6,
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Baby's breath (small white flowers) */}
            {BABYS_BREATH.map((pos, i) => (
              <motion.div
                key={`bb-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.08, type: 'spring' }}
                className="absolute"
                style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="rounded-full bg-white"
                      style={{
                        width: '5px',
                        height: '5px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #fff5f8',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Green leaves */}
            {LEAVES.map((leaf, i) => (
              <motion.div
                key={`leaf-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                className="absolute"
                style={{ left: `${leaf.left}%`, top: `${leaf.top}%`, transform: `translate(-50%, -50%) rotate(${leaf.rotate}deg)` }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '20px',
                    background: 'linear-gradient(to bottom, #4ade80, #22c55e)',
                    borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Upward floating hearts from bouquet */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`fh-${i}`}
              animate={{
                y: [0, -80],
                opacity: [0, 1, 0],
                x: [0, (i - 2) * 15],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
              }}
              className="absolute left-1/2 top-0 pointer-events-none"
            >
              <div className="css-heart" style={{ fontSize: '12px', background: '#ff5c8a' }} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Messages */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center mb-4"
      >
        <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-blush-500 text-glow-pink mb-3">
          You Are My World 🌎❤️
        </p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="font-script text-3xl sm:text-4xl text-rose-500 text-glow-pink"
        >
          Happy Birthday, My Love 💖🎂
        </motion.p>
      </motion.div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="mt-2 mb-4 px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
      >
        ONE LAST THING, MY LOVE 💌
      </motion.button>
    </div>
  );
}

const ROSES = [
  { left: 50, top: 20, size: 44, color: '#ff3d6e', highlight: '#ff8fb1' },
  { left: 25, top: 30, size: 38, color: '#ff5c8a', highlight: '#ffa8c5' },
  { left: 75, top: 30, size: 38, color: '#ff5c8a', highlight: '#ffa8c5' },
  { left: 15, top: 55, size: 32, color: '#ec3d6f', highlight: '#ff6b8a' },
  { left: 85, top: 55, size: 32, color: '#ec3d6f', highlight: '#ff6b8a' },
  { left: 50, top: 55, size: 36, color: '#ff3d6e', highlight: '#ff8fb1' },
  { left: 35, top: 75, size: 30, color: '#ff5c8a', highlight: '#ffa8c5' },
  { left: 65, top: 75, size: 30, color: '#ff5c8a', highlight: '#ffa8c5' },
];

const BABYS_BREATH = [
  { left: 8, top: 20 },
  { left: 92, top: 20 },
  { left: 5, top: 45 },
  { left: 95, top: 45 },
  { left: 40, top: 10 },
  { left: 60, top: 10 },
  { left: 20, top: 15 },
  { left: 80, top: 15 },
];

const LEAVES = [
  { left: 10, top: 65, rotate: -30 },
  { left: 90, top: 65, rotate: 30 },
  { left: 30, top: 85, rotate: -20 },
  { left: 70, top: 85, rotate: 20 },
  { left: 50, top: 90, rotate: 0 },
];
