'use client';

import {AnswerButtons} from '@/components/AnswerButtons';
import type {AnswerValue, Explanation, Language, Question} from '@/types';
import uiText from '@/uiText.json';

const categoryLabels: Record<Question['category'], string> = {
  migration: uiText.categories.migration,
  crime: uiText.categories.crime,
  school: uiText.categories.school,
  economy: uiText.categories.economy,
  energy: uiText.categories.energy,
  europe: uiText.categories.europe
};

export function QuestionCard({
  question,
  explanation,
  language,
  selectedValue,
  important,
  onAnswer,
  onToggleImportant
}: {
  question: Question;
  explanation?: Explanation;
  language: Language;
  selectedValue?: AnswerValue;
  important: boolean;
  onAnswer: (value: AnswerValue) => void;
  onToggleImportant: () => void;
}) {
  return (
    <article className="mx-auto w-full max-w-xl rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{categoryLabels[question.category]}</p>
      <h1 className="mt-5 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{question.statement[language]}</h1>
      {explanation ? (
        <details className="mt-5">
          <summary className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink hover:border-slate-300 hover:bg-white">
            <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs">
              ?
            </span>
            {uiText.buttons.showExplanation}
          </summary>
          <div className="mt-4 rounded-2xl bg-paper p-4">
            <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{explanation.content[language]}</p>
          </div>
        </details>
      ) : null}
      {question.importanceAllowed ? (
        <button
          type="button"
          aria-pressed={important}
          onClick={onToggleImportant}
          className={`mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
            important ? 'border-amber-300 bg-amber-50 text-ink shadow-sm' : 'border-line bg-white text-slate-700 hover:border-slate-300 hover:bg-paper'
          }`}
        >
          <span>
            <span className={`block text-base ${important ? 'font-semibold' : 'font-medium'}`}>{uiText.progress.importantCard}</span>
            <span className="mt-1 block text-sm leading-5 text-slate-600">{uiText.progress.importantSubtext}</span>
          </span>
          <span
            aria-hidden="true"
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold ${
              important ? 'bg-ink text-white' : 'border border-line text-transparent'
            }`}
          >
            ✓
          </span>
        </button>
      ) : null}
      <div className="mt-5">
        <AnswerButtons selectedValue={selectedValue} onSelect={onAnswer} />
      </div>
    </article>
  );
}
