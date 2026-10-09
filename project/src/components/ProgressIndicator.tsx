interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const labels = ['Welcome', 'Balloons', 'Wish', 'Dream', 'Bouquet', 'Letter'];

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-2 rounded-full glass-card">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              i <= current
                ? 'bg-blush-400 scale-110'
                : 'bg-blush-100 scale-90'
            }`}
            style={i <= current ? { boxShadow: '0 0 8px rgba(255,92,138,0.6)' } : {}}
            title={labels[i]}
          />
          {i < total - 1 && (
            <div
              className={`w-3 h-0.5 rounded-full transition-all duration-500 ${
                i < current ? 'bg-blush-300' : 'bg-blush-100'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
