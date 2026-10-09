import { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Music2 } from 'lucide-react';

interface MusicToggleProps {
  onToggle?: (playing: boolean) => void;
}

export function MusicToggle({ onToggle }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const stopMusic = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorsRef.current.forEach((o) => {
      try {
        o.stop();
      } catch {
        // already stopped
      }
    });
    oscillatorsRef.current = [];
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(0, audioRef.current!.currentTime, 0.3);
    }
    if (audioRef.current) {
      setTimeout(() => {
        try {
          audioRef.current?.close();
        } catch {
          // already closed
        }
        audioRef.current = null;
      }, 500);
    }
  }, []);

  const startMusic = useCallback(() => {
    try {
      const ctx = new AudioContext();
      audioRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      // Gentle, romantic melody notes (frequencies)
      const notes = [
        523.25, 587.33, 659.25, 587.33, 523.25, 659.25, 783.99, 659.25,
        523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88,
      ];

      let noteIndex = 0;
      const playNote = () => {
        if (!audioRef.current || !gainRef.current) return;
        const freq = notes[noteIndex % notes.length];
        const osc = audioRef.current.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const noteGain = audioRef.current.createGain();
        noteGain.gain.value = 0;
        noteGain.gain.setTargetAtTime(0.15, audioRef.current.currentTime, 0.1);
        osc.connect(noteGain);
        noteGain.connect(gainRef.current);
        osc.start();
        noteGain.gain.setTargetAtTime(0, audioRef.current.currentTime + 0.8, 0.3);
        osc.stop(audioRef.current.currentTime + 1.5);
        noteIndex++;
      };

      gainRef.current.gain.setTargetAtTime(0.5, ctx.currentTime, 0.5);
      playNote();
      intervalRef.current = window.setInterval(playNote, 600);
    } catch {
      // Audio not supported
    }
  }, []);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  const toggle = () => {
    if (playing) {
      stopMusic();
      setPlaying(false);
      onToggle?.(false);
    } else {
      startMusic();
      setPlaying(true);
      onToggle?.(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full glass-card glow-soft transition-all hover:scale-110 active:scale-95"
    >
      {playing ? (
        <Music2 className="w-5 h-5 text-blush-500 animate-gentle-pulse" />
      ) : (
        <Music className="w-5 h-5 text-blush-400" />
      )}
    </button>
  );
}
