import { useMemo } from 'react';

interface FloatingHeartsProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export function FloatingHearts({
  count = 18,
  colors = ['#ff5c8a', '#ff8fb1', '#ff3d6e', '#ffa8c5', '#ec3d6f'],
  className = '',
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 8 + Math.random() * 22;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 12;
        const color = colors[i % colors.length];
        const opacity = 0.3 + Math.random() * 0.4;
        const usePulse = Math.random() > 0.6;
        return { id: i, size, left, duration, delay, color, opacity, usePulse };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-40px]"
          style={{
            left: `${h.left}%`,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          <div
            className="css-heart"
            style={{
              fontSize: `${h.size}px`,
              background: h.color,
              animation: h.usePulse ? 'gentlePulse 2s ease-in-out infinite' : undefined,
              filter: `drop-shadow(0 0 4px ${h.color}80)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

interface SparklesProps {
  count?: number;
  className?: string;
}

export function Sparkles({ count = 15, className = '' }: SparklesProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: 4 + Math.random() * 10,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 3,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `sparkleTwinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

interface TwinklingStarsProps {
  count?: number;
}

export function TwinklingStars({ count = 30 }: TwinklingStarsProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: 1 + Math.random() * 3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 1 + Math.random() * 3,
        delay: Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `sparkleTwinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
          }}
        />
      ))}
    </div>
  );
}

interface ConfettiBurstProps {
  count?: number;
  colors?: string[];
}

export function ConfettiBurst({
  count = 60,
  colors = ['#ff5c8a', '#ff3d6e', '#ffa8c5', '#c084fc', '#ffd700', '#ff8fb1', '#fff'],
}: ConfettiBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 100 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - Math.random() * 100;
        const rotate = Math.random() * 720 - 360;
        const size = 6 + Math.random() * 10;
        const duration = 1.5 + Math.random() * 2;
        const delay = Math.random() * 0.5;
        const color = colors[i % colors.length];
        const isHeart = Math.random() > 0.6;
        return { id: i, tx, ty, rotate, size, duration, delay, color, isHeart };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            animation: `confettiBurst ${p.duration}s ease-out forwards`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.isHeart ? (
            <div
              className="css-heart"
              style={{
                fontSize: `${p.size}px`,
                background: p.color,
              }}
            />
          ) : (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 0.5}px`,
                background: p.color,
                borderRadius: '2px',
              }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes confettiBurst {
          0% { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

interface FallingPetalsProps {
  count?: number;
}

export function FallingPetals({ count = 12 }: FallingPetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: 8 + Math.random() * 14,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 8,
        color: ['#ff8fb1', '#ff5c8a', '#ffa8c5', '#fff'][i % 4],
        sway: Math.random() > 0.5 ? '40px' : '-40px',
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-30px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `petalFallCustom ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: p.color,
              borderRadius: '50% 0 50% 0',
              opacity: 0.7,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes petalFallCustom {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(${''}var(--sway, 30px)) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
