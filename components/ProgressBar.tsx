import uiText from '@/uiText.json';

export function ProgressBar({current, total}: {current: number; total: number}) {
  const value = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div
      role="progressbar"
      aria-label={`${uiText.progress.question} ${current} ${uiText.progress.of} ${total}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="h-1.5 w-full rounded-full bg-line"
    >
      <div className="h-1.5 rounded-full bg-ink transition-[width] duration-300 ease-out" style={{width: `${value}%`}} />
    </div>
  );
}
