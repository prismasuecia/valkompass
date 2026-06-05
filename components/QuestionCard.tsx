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

function ExplanationControl({explanation, language, desktopCard = false}: {explanation?: Explanation; language: Language; desktopCard?: boolean}) {
  if (!explanation) return null;

  return (
    <details className={`group ${desktopCard ? 'rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4' : ''}`}>
      <summary className={`cursor-pointer list-none ${desktopCard ? '' : 'py-1'}`}>
        <span className={`block leading-5 ${desktopCard ? 'text-base font-semibold text-ink' : 'text-sm font-normal text-[#64748B]'}`}>
          {desktopCard ? uiText.buttons.explanationCardTitle : uiText.buttons.explanationPrompt}
        </span>
        <span className="mt-1 block text-base font-semibold leading-5 text-ink group-open:hidden">{uiText.buttons.showExplanation}</span>
        <span className="mt-1 hidden text-base font-semibold leading-5 text-ink group-open:block">{uiText.buttons.hideExplanation}</span>
      </summary>
      <div className="mt-3 rounded-2xl border border-[#BFDBFE] bg-paper p-4">
        <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
        <ExplanationSections content={explanation.content[language]} />
      </div>
    </details>
  );
}

function ImportantSetting({important, onToggleImportant}: {important: boolean; onToggleImportant: () => void}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={important}
      onClick={onToggleImportant}
      className="flex max-h-[72px] w-full items-center justify-between gap-4 rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-left"
    >
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-5 text-ink">{uiText.progress.important}</span>
        <span className="mt-1 block text-[13px] leading-4 text-slate-600">{uiText.progress.importantSubtext}</span>
      </span>
      <span
        aria-hidden="true"
        className={`flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 ${
          important ? 'justify-end border-ink bg-ink' : 'justify-start border-slate-400 bg-slate-200'
        }`}
      >
        <span className="block h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
      </span>
    </button>
  );
}

function MobileExplanationControl({explanation, language}: {explanation?: Explanation; language: Language}) {
  if (!explanation) return null;

  return (
    <details className="group">
      <summary className="cursor-pointer list-none rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-[14px] text-base font-semibold leading-5 text-ink">
        <span className="block group-open:hidden">{uiText.buttons.mobileShowExplanation}</span>
        <span className="hidden group-open:block">{uiText.buttons.mobileHideExplanation}</span>
      </summary>
      <div className="mt-3 rounded-2xl border border-[#BFDBFE] bg-paper p-4">
        <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
        <ExplanationSections content={explanation.content[language]} />
      </div>
    </details>
  );
}

function MobileImportantSetting({important, onToggleImportant}: {important: boolean; onToggleImportant: () => void}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={important}
      onClick={onToggleImportant}
      className="flex min-h-11 items-center gap-3 text-left"
    >
      <span
        aria-hidden="true"
        className={`flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 ${
          important ? 'justify-end border-ink bg-ink' : 'justify-start border-slate-400 bg-slate-200'
        }`}
      >
        <span className="block h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
      </span>
      <span className="text-base font-semibold text-ink">{uiText.progress.important}</span>
    </button>
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
    <>
      <article className="mx-auto w-full max-w-2xl rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6 min-[1200px]:hidden">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{categoryLabels[question.category]}</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:mt-5 sm:text-3xl">{question.statement[language]}</h1>
        <div className="mt-4">
          <MobileExplanationControl explanation={explanation} language={language} />
        </div>
        {question.importanceAllowed ? (
          <div className="mt-2">
            <MobileImportantSetting important={important} onToggleImportant={onToggleImportant} />
          </div>
        ) : null}
        <div className="mt-3 sm:mt-6">
          <AnswerButtons selectedValue={selectedValue} onSelect={onAnswer} />
        </div>
      </article>

      <article className="hidden w-full grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)] gap-8 rounded-2xl border border-line bg-white p-8 shadow-sm min-[1200px]:grid">
        <section className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{categoryLabels[question.category]}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">{question.statement[language]}</h1>
          <div className="mt-7">
            <AnswerButtons selectedValue={selectedValue} onSelect={onAnswer} />
          </div>
        </section>
        <aside className="min-w-0 border-l border-line pl-8">
          <ExplanationControl explanation={explanation} language={language} desktopCard />
          {question.importanceAllowed ? (
            <div className="mt-8">
              <ImportantSetting important={important} onToggleImportant={onToggleImportant} />
            </div>
          ) : null}
        </aside>
      </article>
    </>
  );
}
