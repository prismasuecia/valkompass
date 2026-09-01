'use client';

import type {AnswerValue} from '@/types';
import uiText from '@/uiText.json';

const labels: {value: AnswerValue; label: string}[] = [
  {value: 2, label: uiText.answers.stronglyAgree},
  {value: 1, label: uiText.answers.agree},
  {value: 0, label: uiText.answers.neutral},
  {value: -1, label: uiText.answers.disagree},
  {value: -2, label: uiText.answers.stronglyDisagree}
];

export function AnswerButtons({
  selectedValue,
  onSelect
}: {
  selectedValue?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}) {
  return (
    <div className="grid gap-2 sm:gap-3">
      {labels.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={selectedValue === item.value}
          onClick={() => onSelect(item.value)}
          className={`flex min-h-[52px] w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left text-base font-medium transition-colors sm:min-h-14 sm:px-5 sm:py-4 ${
            selectedValue === item.value ? 'border-ink bg-slate-100 text-ink shadow-sm' : 'border-line bg-white text-ink hover:border-slate-300 hover:bg-paper'
          }`}
        >
          <span>{item.label}</span>
          <span
            aria-hidden="true"
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-semibold ${
              selectedValue === item.value ? 'bg-ink text-white' : 'border border-line text-transparent'
            }`}
          >
            ✓
          </span>
        </button>
      ))}
    </div>
  );
}
