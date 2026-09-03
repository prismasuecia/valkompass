'use client';

import Link from 'next/link';
import partiesData from '@/data/parties.json';
import questionsData from '@/data/questions.json';
import {canShowResults} from '@/lib/publicationGate.mjs';
import {calculateResults} from '@/lib/calculateResults';
import {positions, questions} from '@/lib/valkompasData';
import {useQuizStore} from '@/store/quizStore';
import type {AnswerValue, Party, QuestionCategory, ResultQuestion} from '@/types';
import uiText from '@/uiText.json';

const parties = partiesData as Party[];
const displayedQuestionCount = questions.length;

const categoryLabels: Record<QuestionCategory, string> = {
  regionalEmployment: 'Empleo en los servicios regionales',
  regionalTax: uiText.categories.regionalTax,
  psychiatryProcurement: uiText.categories.psychiatryProcurement,
  childYouthPsychiatry: uiText.categories.childYouthPsychiatry,
  healthcareOperations: uiText.categories.healthcareOperations,
  publicTransport: uiText.categories.publicTransport,
  healthcareAccess: uiText.categories.healthcareAccess,
  cultureInvestment: uiText.categories.cultureInvestment
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

function comparisonLabel(questionId: string, value: AnswerValue) {
  const scale = questions.find(q => q.id === questionId)?.answerScale;
  if (scale === 'tax-level') return ({2:'Bajar mucho',1:'Bajar algo',0:'Mantenerse',[-1]:'Subir algo',[-2]:'Subir mucho'})[value];
  if (scale === 'private-share') return ({2:'Mucho mayor',1:'Algo mayor',0:'La misma',[-1]:'Algo menor',[-2]:'Mucho menor'})[value];
  if (scale === 'categorical') return value === 1 ? 'A favor' : value === -1 ? 'En contra' : 'Ni a favor ni en contra';
  return answerLabels[value];
}

export default function ResultPage() {
  const {language, answers, importantQuestions, reset} = useQuizStore();
  if (!canShowResults(questionsData.status)) {
    return (
      <main className="mx-auto min-h-screen max-w-2xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Versión de prueba</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink">El resultado aún no está disponible</h1>
        <p className="mt-4 leading-7 text-slate-700">Estamos revisando las preguntas, las posiciones de los partidos y la forma de compararlas. Por eso esta versión no muestra porcentajes ni una clasificación de partidos.</p>
        <p className="mt-3 leading-7 text-slate-700">Puedes probar el cuestionario, pero todavía no debe utilizarse como orientación de voto.</p>
        <Link href="/quiz" className="mt-6 block rounded-xl border border-line bg-white p-4 font-semibold">Volver al cuestionario</Link>
        <Link href="/sources" className="mt-4 inline-block underline">Consultar las fuentes y el estado de la revisión</Link>
      </main>
    );
  }
  const results = calculateResults({answers, importantQuestions, parties, positions, questions});
  const comparableResults = results.filter((result) => result.matchedQuestions > 0);
  const topResults = comparableResults.filter(result => result.rank <= 3);
  const remainingResults = comparableResults.filter(result => result.rank > 3);

  return (
    <main className="mx-auto min-h-screen max-w-4xl overflow-x-hidden px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{uiText.app.name}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">{uiText.results.title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-700">{uiText.results.description}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{uiText.results.sameAnswers}</p>
      {comparableResults.length > 0 && <p className="mt-3 text-sm leading-6 text-slate-600">Comparamos a todos los partidos en las mismas {comparableResults[0].matchedQuestions} preguntas. El porcentaje no resume toda su política ni te dice a quién votar.</p>}
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
        {uiText.results.importantQuestionsUsed}: {importantQuestions.length}
      </p>
      {topResults.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">{uiText.results.noResults}</h2>
          <p className="mt-3 leading-7 text-slate-700">Necesitamos al menos seis preguntas respondidas por ti, revisadas y con posiciones verificadas de todos los partidos. Marcar una pregunta como importante no aumenta ese número.</p>
        </section>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {topResults.map((result) => {
          const party = parties.find((item) => item.id === result.partyId);
          if (!party) return null;
          const categories = result.matchingCategories.map((category) => categoryLabels[category]);
          const classification = getMatchClassification(result.score);
          const isUniqueFirst = result.rank === 1 && !result.tied;

          return (
            <article
              key={result.partyId}
              className={`min-w-0 rounded-2xl bg-white shadow-sm ${
                isUniqueFirst ? 'border-2 border-slate-300 p-6 sm:p-8 md:col-span-2' : 'border border-line p-5 sm:p-6'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className={`${isUniqueFirst ? 'h-5 w-5' : 'h-4 w-4'} shrink-0 rounded-full`} style={{backgroundColor: party.color}} />
                  <h2 className={`min-w-0 break-words font-semibold text-ink ${isUniqueFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    {party.name[language]}
                  </h2>
                </div>
                <p
                  aria-label={`${uiText.results.scoreLabel}: ${result.score}%`}
                  className={`shrink-0 font-semibold text-slate-700 ${isUniqueFirst ? 'text-xl sm:text-2xl' : 'text-base'}`}
                >
                  {result.score}%
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{uiText.results.scoreExplanation}</p>
              <p className="mt-5 text-sm font-semibold text-slate-600">{classification.title}</p>
              <p className="mt-2 leading-7 text-slate-700">{classification.text}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {uiText.results.comparedQuestions}: {result.matchedQuestions} {uiText.progress.of} {displayedQuestionCount}
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
                        <p>{comparisonLabel(item.questionId, item.userValue)}</p>
                        <p className="mt-3 font-semibold text-ink">{party.name[language]}:</p>
                        <p>{comparisonLabel(item.questionId, item.partyValue)}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </article>
          );
        })}
      </div>

      <details className="mt-6 rounded-2xl border border-line bg-white p-5">
        <summary className="block min-h-6 cursor-pointer text-base font-semibold text-ink">{uiText.whyResult.title}</summary>
        <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.whyResult.intro}</p>
      </details>

      {remainingResults.length > 0 ? (
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {remainingResults.map((result) => {
            const party = parties.find((item) => item.id === result.partyId);
            if (!party) return null;

            return (
              <article key={result.partyId} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{backgroundColor: party.color}} />
                  <h2 className="min-w-0 break-words text-sm font-semibold text-ink">{party.name[language]}</h2>
                </div>
                <p aria-label={`${uiText.results.scoreLabel}: ${result.score}%`} className="shrink-0 text-sm font-semibold text-slate-700">
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
      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-600">
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
