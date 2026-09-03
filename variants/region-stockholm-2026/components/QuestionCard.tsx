'use client';

import {AnswerButtons} from '@/components/AnswerButtons';
import type {AnswerSelection, Explanation, Language, Question} from '@/types';
import uiText from '@/uiText.json';

const categoryLabels: Record<Question['category'], string> = {
  regionalEmployment: 'Empleo en los servicios regionales',
  regionalTax: uiText.categories.regionalTax,
  psychiatryProcurement: uiText.categories.psychiatryProcurement,
  childYouthPsychiatry: uiText.categories.childYouthPsychiatry,
  healthcareOperations: uiText.categories.healthcareOperations,
  publicTransport: uiText.categories.publicTransport,
  healthcareAccess: uiText.categories.healthcareAccess,
  cultureInvestment: uiText.categories.cultureInvestment
};

function ExplanationSections({explanation, language}: {explanation: Explanation; language: Language}) {
  return (
    <div className="mt-4 grid gap-3">
      {explanation.sections.map((section) => (
        <section key={section.title[language]} className="rounded-xl border border-line bg-white p-4">
          <h3 className="text-sm font-semibold text-ink">{section.title[language]}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">{section.content[language]}</p>
        </section>
      ))}
    </div>
  );
}

function ExplanationControl({
  explanation,
  language,
  onOpened,
  desktopCard = false
}: {
  explanation?: Explanation;
  language: Language;
  onOpened: () => void;
  desktopCard?: boolean;
}) {
  if (!explanation) return null;

  return (
    <details
      onToggle={(event) => {
        if (event.currentTarget.open) onOpened();
      }}
      className={`group ${desktopCard ? 'rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4' : ''}`}
    >
      <summary className={`cursor-pointer list-none ${desktopCard ? '' : 'py-1'}`}>
        <span className={`block leading-5 ${desktopCard ? 'text-base font-semibold text-ink' : 'text-sm font-normal text-[#64748B]'}`}>
          {desktopCard ? uiText.buttons.explanationCardTitle : uiText.buttons.explanationPrompt}
        </span>
        <span className="mt-1 block text-base font-semibold leading-5 text-ink group-open:hidden">{uiText.buttons.showExplanation}</span>
        <span className="mt-1 hidden text-base font-semibold leading-5 text-ink group-open:block">{uiText.buttons.hideExplanation}</span>
      </summary>
      <div className="mt-3 rounded-2xl border border-[#BFDBFE] bg-paper p-4">
        <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
        <ExplanationSections explanation={explanation} language={language} />
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
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
        important ? 'border-amber-500 bg-amber-50' : 'border-amber-200 bg-amber-50/60 hover:border-amber-400'
      }`}
    >
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-5 text-ink">{uiText.progress.important}</span>
        <span className="mt-1 block text-sm leading-5 text-slate-700">{uiText.progress.importantSubtext}</span>
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

function MobileExplanationControl({
  explanation,
  language,
  onOpened
}: {
  explanation?: Explanation;
  language: Language;
  onOpened: () => void;
}) {
  if (!explanation) return null;

  return (
    <details
      onToggle={(event) => {
        if (event.currentTarget.open) onOpened();
      }}
      className="group"
    >
      <summary className="cursor-pointer list-none rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-[14px] text-base font-semibold leading-5 text-ink">
        <span className="block group-open:hidden">{uiText.buttons.mobileShowExplanation}</span>
        <span className="hidden group-open:block">{uiText.buttons.mobileHideExplanation}</span>
      </summary>
      <div className="mt-3 rounded-2xl border border-[#BFDBFE] bg-paper p-4">
        <h2 className="text-sm font-semibold text-ink">{explanation.title[language]}</h2>
        <ExplanationSections explanation={explanation} language={language} />
      </div>
    </details>
  );
}

export function QuestionCard({
  question,
  explanation,
  language,
  selectedValue,
  important,
  onAnswer,
  onToggleImportant,
  onExplanationOpened
}: {
  question: Question;
  explanation?: Explanation;
  language: Language;
  selectedValue?: AnswerSelection;
  important: boolean;
  onAnswer: (value: AnswerSelection) => void;
  onToggleImportant: () => void;
  onExplanationOpened: () => void;
}) {
  return (
    <>
      <article className="mx-auto w-full max-w-2xl rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6 min-[1200px]:hidden">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{categoryLabels[question.category]}</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:mt-5 sm:text-3xl">{question.statement[language]}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{question.context[language]}</p>
        {question.comparisonNote && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-950">{question.comparisonNote}</p>}
        {question.importanceAllowed ? (
          <div className="mt-4">
            <ImportantSetting important={important} onToggleImportant={onToggleImportant} />
          </div>
        ) : null}
        <div className="mt-4">
          <MobileExplanationControl explanation={explanation} language={language} onOpened={onExplanationOpened} />
        </div>
        <div className="mt-3 sm:mt-6">
          <AnswerButtons answerScale={question.answerScale} selectedValue={selectedValue} onSelect={onAnswer} />
        </div>
      </article>

      <article className="hidden w-full grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)] gap-8 rounded-2xl border border-line bg-white p-8 shadow-sm min-[1200px]:grid">
        <section className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{categoryLabels[question.category]}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">{question.statement[language]}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{question.context[language]}</p>
          {question.comparisonNote && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-950">{question.comparisonNote}</p>}
          {question.importanceAllowed ? (
            <div className="mt-6">
              <ImportantSetting important={important} onToggleImportant={onToggleImportant} />
            </div>
          ) : null}
          <div className="mt-7">
            <AnswerButtons answerScale={question.answerScale} selectedValue={selectedValue} onSelect={onAnswer} />
          </div>
        </section>
        <aside className="min-w-0 border-l border-line pl-8">
          <ExplanationControl explanation={explanation} language={language} onOpened={onExplanationOpened} desktopCard />
        </aside>
      </article>
    </>
  );
}
