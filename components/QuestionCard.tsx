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

function ExplanationSections({content}: {content: string}) {
  const currentSituationLabel = uiText.explanationSections.currentSituation;
  const discussionLabel = uiText.explanationSections.discussion;
  const exampleLabel = uiText.explanationSections.example;
  const discussionMarker = ` ${discussionLabel}: `;
  const exampleMarker = ` ${exampleLabel}: `;
  const [currentSituation, rest] = content.split(discussionMarker);
  const [discussion, example] = rest?.split(exampleMarker) ?? [];

  if (!currentSituation || !discussion || !example) {
    return <p className="mt-2 text-sm leading-6 text-slate-700">{content}</p>;
  }

  return (
    <div className="mt-4 grid gap-3">
      {[
        [currentSituationLabel, currentSituation.replace(`${currentSituationLabel}: `, '')],
        [discussionLabel, discussion],
        [exampleLabel, example]
      ].map(([title, text]) => (
        <section key={title} className="rounded-xl border border-line bg-white p-4">
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
        </section>
      ))}
    </div>
  );
}

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
    <article className="mx-auto w-full max-w-2xl rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{categoryLabels[question.category]}</p>
      <h1 className="mt-5 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{question.statement[language]}</h1>
      <div className="mt-6">
        <AnswerButtons selectedValue={selectedValue} onSelect={onAnswer} />
      </div>
      {question.importanceAllowed ? (
        <button
          type="button"
          aria-pressed={important}
          onClick={onToggleImportant}
          className={`mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
            important
              ? 'border-amber-600 bg-amber-100 text-ink shadow-sm ring-2 ring-amber-300'
              : 'border-slate-300 bg-paper text-slate-700 hover:border-amber-500 hover:bg-amber-50'
          }`}
        >
          <span>
            <span className={`block text-base ${important ? 'font-semibold' : 'font-medium'}`}>{uiText.progress.importantCard}</span>
            <span className="mt-1 block text-sm leading-5 text-slate-600">{uiText.progress.importantSubtext}</span>
          </span>
          <span
            aria-hidden="true"
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold ${
              important ? 'bg-amber-700 text-white' : 'border border-line text-transparent'
            }`}
          >
            ✓
          </span>
        </button>
      ) : null}
      {explanation ? (
        <details className="mt-5 rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.buttons.showExplanation}
          </summary>
          <div className="border-t border-line bg-paper p-4">
            <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
            <ExplanationSections content={explanation.content[language]} />
          </div>
        </details>
      ) : null}
    </article>
  );
}
