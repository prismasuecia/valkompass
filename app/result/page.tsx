'use client';

import Link from 'next/link';
import partiesData from '@/data/parties.json';
import {questions} from '@/lib/valkompasData';
import {useQuizStore} from '@/store/quizStore';
import type {AnswerValue, Party, QuestionCategory, ResultQuestion} from '@/types';
import uiText from '@/uiText.json';

const parties = partiesData as Party[];
const displayedQuestionCount = questions.length;

const categoryLabels: Record<QuestionCategory, string> = {
  migration: uiText.categories.migration,
  crime: uiText.categories.crime,
  school: uiText.categories.school,
  economy: uiText.categories.economy,
  energy: uiText.categories.energy,
  europe: uiText.categories.europe
};

const answerLabels: Record<AnswerValue, string> = {
  2: uiText.answers.stronglyAgree,
  1: uiText.answers.agree,
  0: uiText.answers.neutral,
  [-1]: uiText.answers.disagree,
  [-2]: uiText.answers.stronglyDisagree
};

function ResultQuestionList({items, marker}: {items: ResultQuestion[]; marker: string}) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li key={item.questionId} className="flex gap-3 rounded-xl bg-paper px-4 py-3 text-sm leading-6 text-slate-700">
          <span aria-hidden="true">{marker}</span>
          <span>{item.statement.es}</span>
        </li>
      ))}
    </ul>
  );
}

function getMatchClassification(score: number) {
  if (score >= 75) return uiText.highMatch;
  if (score >= 50) return uiText.mixedMatch;
  return uiText.noClearMatch;
}

export default function ResultPage() {
  const {language, results, reset} = useQuizStore();
  const topResults = results.slice(0, 3);
  const remainingResults = results.slice(3);

  return (
    <main className="mx-auto min-h-screen max-w-2xl overflow-x-hidden px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{uiText.app.name}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">{uiText.results.title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-700">{uiText.results.description}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{uiText.results.sameAnswers}</p>
      <details className="mt-5 rounded-2xl border border-line bg-white p-5">
        <summary className="block min-h-6 cursor-pointer text-base font-semibold text-ink">{uiText.whyResult.title}</summary>
        <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.whyResult.intro}</p>
      </details>

      {topResults.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">{uiText.results.noResults}</h2>
          <p className="mt-3 leading-7 text-slate-700">{uiText.results.answerQuestions}</p>
        </section>
      ) : null}

      <div className="mt-8 grid gap-5">
        {topResults.map((result, index) => {
          const party = parties.find((item) => item.id === result.partyId);
          if (!party) return null;
          const categories = result.matchingCategories.map((category) => categoryLabels[category]);
          const classification = getMatchClassification(result.score);

          return (
            <article
              key={result.partyId}
              className={`min-w-0 rounded-2xl border border-line bg-white shadow-sm ${
                index === 0 ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className={`${index === 0 ? 'h-5 w-5' : 'h-4 w-4'} shrink-0 rounded-full`} style={{backgroundColor: party.color}} />
                  <h2 className={`min-w-0 break-words font-semibold text-ink ${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    {party.name[language]}
                  </h2>
                </div>
                <p aria-label={`${uiText.results.scoreLabel}: ${result.score}%`} className="shrink-0 text-sm font-semibold text-slate-500">
                  {result.score}%
                </p>
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500">{classification.title}</p>
              <p className="mt-2 leading-7 text-slate-700">{classification.text}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {uiText.results.comparedQuestions}: {displayedQuestionCount}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-slate-700">
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <details className="min-w-0 rounded-xl border border-line p-4">
                  <summary className="block min-h-6 cursor-pointer font-semibold text-ink">{uiText.matches.title}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.matches.text}</p>
                  <ResultQuestionList items={result.strongestAgreements} marker="✓" />
                </details>
                <details className="min-w-0 rounded-xl border border-line p-4">
                  <summary className="block min-h-6 cursor-pointer font-semibold text-ink">{uiText.differences.title}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.differences.text}</p>
                  <ResultQuestionList items={result.strongestDisagreements} marker="×" />
                </details>
                <details className="min-w-0 rounded-xl border border-line p-4">
                  <summary className="block min-h-6 cursor-pointer font-semibold text-ink">
                    {uiText.buttons.readMoreAbout} {party.name[language]}
                  </summary>
                  <div className="mt-4 grid gap-4">
                    {result.comparisons.map((item) => (
                      <div key={item.questionId} className="min-w-0 rounded-xl bg-paper p-4 text-sm leading-6 text-slate-700">
                        <p className="font-semibold text-ink">{uiText.progress.question}:</p>
                        <p className="mt-1">{item.statement.es}</p>
                        <p className="mt-3 font-semibold text-ink">{uiText.results.yourAnswer}:</p>
                        <p>{answerLabels[item.userValue]}</p>
                        <p className="mt-3 font-semibold text-ink">{party.name[language]}:</p>
                        <p>{answerLabels[item.partyValue]}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </article>
          );
        })}
      </div>

      {remainingResults.length > 0 ? (
        <div className="mt-5 grid gap-2">
          {remainingResults.map((result) => {
            const party = parties.find((item) => item.id === result.partyId);
            if (!party) return null;

            return (
              <article key={result.partyId} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{backgroundColor: party.color}} />
                  <h2 className="min-w-0 break-words text-sm font-semibold text-ink">{party.name[language]}</h2>
                </div>
                <p aria-label={`${uiText.results.scoreLabel}: ${result.score}%`} className="shrink-0 text-sm font-semibold text-slate-500">
                  {result.score}%
                </p>
              </article>
            );
          })}
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-ink">{uiText.categoryResults.title}</h2>
        <p className="mt-3 leading-7 text-slate-700">{uiText.categoryResults.text}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{uiText.results.recommendation}</p>
      </section>

      <Link
        href="/quiz"
        onClick={reset}
        className="mt-8 block rounded-xl border border-line bg-white px-6 py-4 text-center font-semibold text-ink"
      >
        {uiText.buttons.restart}
      </Link>
      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-500">
        <p className="mx-auto mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          {uiText.footer.betaBadge}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/sources" className="inline-block min-h-6 font-medium text-ink">
            {uiText.footer.sourcesLink}
          </Link>
        </div>
      </footer>
    </main>
  );
}
