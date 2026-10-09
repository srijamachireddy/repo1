import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingHearts, Sparkles } from '@/components/Decorations';

interface Page3CakeProps {
  onContinue: () => void;
}

export function Page3Cake({ onContinue }: Page3CakeProps) {
  const [blown, setBlown] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [micActive, setMicActive] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extinguish = useCallback(() => {
    if (blown) return;
    setBlown(true);
    setShowMessage(true);

    // Countdown
    setCountdown(4);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
          }
          setShowButton(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [blown]);

  // Microphone blow detection
  const startMicDetection = useCallback(async () => {
    if (micActive) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicActive(true);
      setMicDenied(false);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkBlow = () => {
        if (blown) return;
        analyser.getByteFrequencyData(dataArray);
        // Low frequencies indicate blowing
        let sum = 0;
        const lowFreqEnd = Math.min(10, dataArray.length);
        for (let i = 0; i < lowFreqEnd; i++) {
          sum += dataArray[i];
        }
        const avg = sum / lowFreqEnd;
        if (avg > 110) {
          extinguish();
          return;
        }
        rafRef.current = requestAnimationFrame(checkBlow);
      };
      checkBlow();
    } catch {
      setMicDenied(true);
      setMicActive(false);
    }
  }, [micActive, blown, extinguish]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {
          // already closed
        }
      }
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <FloatingHearts count={10} />
      <Sparkles count={10} />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-script text-3xl sm:text-4xl md:text-5xl text-blush-500 text-glow-pink text-center mb-2"
      >
        Make a wish, birthday boy! 🎂
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-body text-lg sm:text-xl text-blush-600 text-center mb-6"
      >
        Blow the candle, Adi 🕯️❤️
      </motion.p>

      {/* Cake */}
      <div className="relative flex flex-col items-center">
        {/* Candle with flame */}
        <div className="relative flex flex-col items-center" style={{ marginBottom: '-2px' }}>
          {/* Flame or smoke */}
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.div
                key="flame"
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
                onClick={extinguish}
                aria-label="Tap to blow the candle"
              >
                {/* Glow */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'radial-gradient(circle, rgba(255,200,50,0.5) 0%, transparent 70%)',
                    animation: 'gentlePulse 1.5s ease-in-out infinite',
                  }}
                />
                {/* Flame */}
                <div
                  className="relative animate-flicker"
                  style={{
                    width: '14px',
                    height: '24px',
                    background: 'linear-gradient(to top, #ff8c00 0%, #ffd700 40%, #fff8dc 80%, #fff 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    boxShadow: '0 0 15px rgba(255,200,50,0.8), 0 0 30px rgba(255,160,50,0.4)',
                    marginBottom: '2px',
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.6, y: 0 }}
                animate={{ opacity: [0.6, 0.3, 0], y: [0, -40, -60] }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="relative"
              >
                <div
                  style={{
                    width: '8px',
                    height: '20px',
                    background: 'radial-gradient(ellipse at center, rgba(180,180,180,0.5), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(3px)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wick */}
          <div style={{ width: '2px', height: '6px', background: '#333', marginBottom: '0px' }} />

          {/* Candle body */}
          <div
            style={{
              width: '12px',
              height: '40px',
              background: 'linear-gradient(to bottom, #fff 0%, #ffe4ec 50%, #ffc9dd 100%)',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            {/* Stripes */}
            <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,92,138,0.2) 6px, rgba(255,92,138,0.2) 8px)', borderRadius: '3px' }} />
          </div>
        </div>

        {/* Cake body - CSS drawn */}
        <div className="relative" style={{ marginTop: '-2px' }}>
          {/* Top tier */}
          <div
            className="relative"
            style={{
              width: '140px',
              height: '50px',
              background: 'linear-gradient(to bottom, #fff5f8, #ffe4ec)',
              borderRadius: '12px 12px 4px 4px',
              boxShadow: '0 4px 12px rgba(255,150,180,0.3)',
              border: '2px solid #ffc9dd',
            }}
          >
            {/* Cream drips */}
            <div className="absolute top-0 left-0 right-0" style={{ height: '12px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '0 0 10px 10px',
                height: '100%',
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 90% 50%, 85% 100%, 80% 50%, 75% 100%, 70% 50%, 65% 100%, 60% 50%, 55% 100%, 50% 50%, 45% 100%, 40% 50%, 35% 100%, 30% 50%, 25% 100%, 20% 50%, 15% 100%, 10% 50%, 5% 100%, 0 50%)',
              }} />
            </div>
            {/* Sprinkles */}
            {[
              { left: '15%', top: '30%', color: '#ff5c8a' },
              { left: '35%', top: '55%', color: '#ff3d6e' },
              { left: '55%', top: '35%', color: '#c084fc' },
              { left: '75%', top: '50%', color: '#ff5c8a' },
              { left: '25%', top: '70%', color: '#ec3d6f' },
              { left: '65%', top: '68%', color: '#c084fc' },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: s.left,
                  top: s.top,
                  width: '5px',
                  height: '5px',
                  background: s.color,
                }}
              />
            ))}
            {/* Strawberries */}
            <div className="absolute" style={{ left: '10%', top: '-8px' }}>
              <div style={{ width: '14px', height: '14px', background: 'radial-gradient(circle at 30% 30%, #ff8fb1, #ff3d6e)', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ position: 'absolute', top: '-4px', left: '3px', width: '8px', height: '6px', background: '#4ade80', borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%' }} />
              </div>
            </div>
            <div className="absolute" style={{ right: '10%', top: '-8px' }}>
              <div style={{ width: '14px', height: '14px', background: 'radial-gradient(circle at 30% 30%, #ff8fb1, #ff3d6e)', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ position: 'absolute', top: '-4px', left: '3px', width: '8px', height: '6px', background: '#4ade80', borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%' }} />
              </div>
            </div>
          </div>

          {/* Bottom tier */}
          <div
            style={{
              width: '200px',
              height: '60px',
              background: 'linear-gradient(to bottom, #ffc9dd, #ffa8c5)',
              borderRadius: '8px 8px 12px 12px',
              boxShadow: '0 6px 16px rgba(255,150,180,0.3)',
              border: '2px solid #ff8fb1',
            }}
          >
            {/* Heart sprinkles on bottom tier */}
            {[
              { left: '12%', top: '25%' },
              { left: '32%', top: '55%' },
              { left: '52%', top: '30%' },
              { left: '72%', top: '50%' },
              { left: '88%', top: '30%' },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute css-heart"
                style={{
                  left: s.left,
                  top: s.top,
                  fontSize: '8px',
                  background: '#fff',
                }}
              />
            ))}
            {/* Cream drips */}
            <div className="absolute top-0 left-0 right-0" style={{ height: '14px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '0 0 12px 12px',
                height: '100%',
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 88% 40%, 82% 100%, 75% 40%, 68% 100%, 60% 40%, 52% 100%, 45% 40%, 38% 100%, 30% 40%, 22% 100%, 15% 40%, 8% 100%, 0 40%)',
              }} />
            </div>
          </div>

          {/* Plate */}
          <div
            style={{
              width: '240px',
              height: '10px',
              background: 'linear-gradient(to bottom, #e0e0e0, #c0c0c0)',
              borderRadius: '50%',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* Floating hearts around cake */}
        {!blown &&
          [0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 0.7, repeat: Infinity }}
              className="absolute pointer-events-none"
              style={{
                left: `${20 + i * 20}%`,
                top: `${40 + (i % 2) * 20}%`,
              }}
            >
              <div
                className="css-heart"
                style={{ fontSize: '10px', background: '#ff5c8a' }}
              />
            </motion.div>
          ))}

        {/* Sparkles after blow */}
        {blown &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={`sp-${i}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: (i - 3) * 30,
                y: [-10, -50],
                opacity: [1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute left-1/2 top-0 pointer-events-none"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="#ffd700">
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </svg>
            </motion.div>
          ))}
      </div>

      {/* Message after blow */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-6 text-center"
          >
            <p className="font-script text-2xl sm:text-3xl text-blush-600 text-glow-pink">
              Yay! Your birthday wish is waiting to come true! ✨💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blow button / mic option */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {!blown && (
          <>
            {!micActive && !micDenied && (
              <motion.button
                onClick={startMicDetection}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full glass-card text-blush-500 font-body font-medium text-sm border-2 border-blush-200"
              >
                🎤 Use microphone to blow
              </motion.button>
            )}
            {micActive && (
              <p className="font-body text-sm text-blush-400 animate-gentle-pulse">
                🎤 Listening... blow into your mic!
              </p>
            )}
            {micDenied && (
              <p className="font-body text-sm text-blush-400">
                No mic? No worries! Tap the flame or the button below 💗
              </p>
            )}
            <motion.button
              onClick={extinguish}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
            >
              BLOW THE CANDLE 💨
            </motion.button>
          </>
        )}

        {/* Countdown + Continue */}
        {blown && !showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="font-body text-blush-500">Getting your surprise ready</span>
            <span className="font-display text-2xl text-blush-500 font-bold">
              {countdown}
            </span>
          </motion.div>
        )}

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 text-white font-body font-semibold text-lg shadow-lg glow-pink"
          >
            CONTINUE 💖
          </motion.button>
        )}
      </div>
    </div>
  );
}
