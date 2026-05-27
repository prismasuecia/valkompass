export function ProgressBar({current, total}: {current: number; total: number}) {
  const value = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div aria-label="Progress" className="h-2 w-full rounded-full bg-line">
      <div className="h-2 rounded-full bg-ink transition-[width]" style={{width: `${value}%`}} />
    </div>
  );
}
