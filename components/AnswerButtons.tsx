'use client';

import type {AnswerValue} from '@/types';

const labels: {value: AnswerValue; label: string}[] = [
  {value: 2, label: 'Totalmente de acuerdo'},
  {value: 1, label: 'Parcialmente de acuerdo'},
  {value: 0, label: 'Neutral / no estoy seguro'},
  {value: -1, label: 'Parcialmente en desacuerdo'},
  {value: -2, label: 'Totalmente en desacuerdo'}
];

export function AnswerButtons({
  selectedValue,
  onSelect
}: {
  selectedValue?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}) {
  return (
    <div className="grid gap-3">
      {labels.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onSelect(item.value)}
          className={`min-h-14 rounded-xl border px-5 py-4 text-left text-base font-medium ${
            selectedValue === item.value ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
