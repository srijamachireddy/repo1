import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MusicToggle } from '@/components/MusicToggle';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { Page1Welcome } from '@/pages/Page1Welcome';
import { Page2Balloons } from '@/pages/Page2Balloons';
import { Page3Cake } from '@/pages/Page3Cake';
import { Page4Wish } from '@/pages/Page4Wish';
import { Page5Bouquet } from '@/pages/Page5Bouquet';
import { Page6Letter } from '@/pages/Page6Letter';

const TOTAL_PAGES = 6;

export default function App() {
  const [page, setPage] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  const goToPage = useCallback((next: number) => {
    setPage(next);
  }, []);

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
    setPage(0);
  }, []);

  const pageVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
      x: 40,
    },
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: -40,
    },
  };

  const renderPage = () => {
    switch (page) {
      case 0:
        return <Page1Welcome key={`p1-${replayKey}`} onContinue={() => goToPage(1)} />;
      case 1:
        return <Page2Balloons key={`p2-${replayKey}`} onContinue={() => goToPage(2)} />;
      case 2:
        return <Page3Cake key={`p3-${replayKey}`} onContinue={() => goToPage(3)} />;
      case 3:
        return <Page4Wish key={`p4-${replayKey}`} onContinue={() => goToPage(4)} />;
      case 4:
        return <Page5Bouquet key={`p5-${replayKey}`} onContinue={() => goToPage(5)} />;
      case 5:
        return <Page6Letter key={`p6-${replayKey}`} onReplay={handleReplay} />;
      default:
        return <Page1Welcome key={`p1-${replayKey}`} onContinue={() => goToPage(1)} />;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <MusicToggle />

      {/* Progress indicator - hidden on page 6 celebration */}
      <ProgressIndicator current={page} total={TOTAL_PAGES} />

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="relative min-h-[100dvh] w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
