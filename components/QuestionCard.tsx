'use client';

import {AnswerButtons} from '@/components/AnswerButtons';
import type {AnswerValue, Explanation, Language, Question} from '@/types';

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
    <article className="mx-auto w-full max-w-xl rounded-2xl border border-line bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{question.category}</p>
      <h1 className="mt-5 text-2xl font-semibold leading-tight text-ink">{question.statement[language]}</h1>
      {explanation ? (
        <div className="mt-5 rounded-xl bg-paper p-4">
          <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{explanation.content[language]}</p>
        </div>
      ) : null}
      <div className="mt-8">
        <AnswerButtons language={language} selectedValue={selectedValue} onSelect={onAnswer} />
      </div>
      {question.importanceAllowed ? (
        <button
          type="button"
          onClick={onToggleImportant}
          className={`mt-5 w-full rounded-xl border px-5 py-4 text-sm font-medium ${
            important ? 'border-ink bg-slate-100 text-ink' : 'border-line bg-white text-slate-700'
          }`}
        >
          {language === 'sv' ? 'Den här frågan är extra viktig för mig' : 'Esta pregunta es muy importante para mí'}
        </button>
      ) : null}
    </article>
  );
}
