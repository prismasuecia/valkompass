'use client';

import type {AnswerValue, Language} from '@/types';

const labels: Record<Language, {value: AnswerValue; label: string}[]> = {
  sv: [
    {value: 2, label: 'Instämmer helt'},
    {value: 1, label: 'Instämmer delvis'},
    {value: 0, label: 'Neutral'},
    {value: -1, label: 'Instämmer inte delvis'},
    {value: -2, label: 'Instämmer inte alls'}
  ],
  es: [
    {value: 2, label: 'Totalmente de acuerdo'},
    {value: 1, label: 'Parcialmente de acuerdo'},
    {value: 0, label: 'Neutral'},
    {value: -1, label: 'Parcialmente en desacuerdo'},
    {value: -2, label: 'Totalmente en desacuerdo'}
  ]
};

export function AnswerButtons({
  language,
  selectedValue,
  onSelect
}: {
  language: Language;
  selectedValue?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}) {
  return (
    <div className="grid gap-3">
      {labels[language].map((item) => (
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
