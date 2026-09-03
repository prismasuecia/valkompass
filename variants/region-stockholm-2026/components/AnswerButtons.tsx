'use client';

import type {AnswerSelection, Question} from '@/types';
import uiText from '@/uiText.json';

const labels: {value: AnswerSelection; label: string}[] = [
  {value: 2, label: uiText.answers.stronglyAgree},
  {value: 1, label: uiText.answers.agree},
  {value: 0, label: uiText.answers.neutral},
  {value: -1, label: uiText.answers.disagree},
  {value: -2, label: uiText.answers.stronglyDisagree},
  {value: 'skip', label: uiText.answers.insufficientInformation}
];

export function AnswerButtons({
  answerScale = 'agreement',
  selectedValue,
  onSelect
}: {
  answerScale?: Question['answerScale'];
  selectedValue?: AnswerSelection;
  onSelect: (value: AnswerSelection) => void;
}) {
  const taxLabels: Record<number, string> = {2: 'Bajar mucho', 1: 'Bajar algo', 0: 'Mantenerse', [-1]: 'Subir algo', [-2]: 'Subir mucho'};
  const shareLabels: Record<number, string> = {2: 'Mucho mayor', 1: 'Algo mayor', 0: 'La misma', [-1]: 'Algo menor', [-2]: 'Mucho menor'};
  const categoricalLabels: Record<number, string> = {1: 'A favor', 0: 'Ni a favor ni en contra', [-1]: 'En contra'};
  const options = answerScale === 'tax-level'
    ? labels.map(item => ({...item, label: item.value === 'skip' ? item.label : taxLabels[item.value]}))
    : answerScale === 'private-share'
    ? [...labels].reverse().filter(item => item.value !== 'skip').map(item => ({...item, label: shareLabels[item.value as number]})).concat(labels.filter(item => item.value === 'skip'))
    : answerScale === 'categorical'
    ? labels.filter(item => item.value === 'skip' || Math.abs(item.value) <= 1).map(item => ({...item, label: item.value === 'skip' ? item.label : categoricalLabels[item.value]}))
    : labels;
  return (
    <div className="grid gap-2 sm:gap-3">
      {options.map((item) => (
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
