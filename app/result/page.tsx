'use client';

import Link from 'next/link';
import partiesData from '@/data/parties.json';
import {useQuizStore} from '@/store/quizStore';
import type {AnswerValue, Party, QuestionCategory, ResultQuestion} from '@/types';

const parties = partiesData as Party[];

const categoryLabels: Record<QuestionCategory, string> = {
  migration: 'migración',
  crime: 'crimen',
  school: 'escuela',
  economy: 'economía',
  energy: 'energía'
};

const answerLabels: Record<AnswerValue, string> = {
  2: 'Totalmente de acuerdo',
  1: 'Parcialmente de acuerdo',
  0: 'Neutral / no estoy seguro',
  [-1]: 'Parcialmente en desacuerdo',
  [-2]: 'Totalmente en desacuerdo'
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

export default function ResultPage() {
  const {language, results, reset} = useQuizStore();
  const topResults = results.slice(0, 3);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Prisma Suecia</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">Partidos más cercanos a tus respuestas</h1>
      <p className="mt-4 text-base leading-7 text-slate-700">
        El resultado compara tus respuestas con posiciones políticas públicas de los partidos suecos.
      </p>

      <div className="mt-8 grid gap-5">
        {topResults.map((result) => {
          const party = parties.find((item) => item.id === result.partyId);
          if (!party) return null;
          const categories = result.matchingCategories.map((category) => categoryLabels[category]);

          return (
            <article key={result.partyId} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full" style={{backgroundColor: party.color}} />
                  <h2 className="text-2xl font-semibold text-ink">{party.name[language]}</h2>
                </div>
                <p className="text-sm font-semibold text-slate-500">{result.score}%</p>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                Coincides principalmente en temas de {categories.join(', ')}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-slate-700">
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <details className="rounded-xl border border-line p-4">
                  <summary className="cursor-pointer font-semibold text-ink">Ver coincidencias</summary>
                  <ResultQuestionList items={result.strongestAgreements} marker="✓" />
                </details>
                <details className="rounded-xl border border-line p-4">
                  <summary className="cursor-pointer font-semibold text-ink">Ver diferencias</summary>
                  <ResultQuestionList items={result.strongestDisagreements} marker="×" />
                </details>
                <details className="rounded-xl border border-line p-4">
                  <summary className="cursor-pointer font-semibold text-ink">Cómo respondió el partido</summary>
                  <div className="mt-4 grid gap-4">
                    {result.comparisons.map((item) => (
                      <div key={item.questionId} className="rounded-xl bg-paper p-4 text-sm leading-6 text-slate-700">
                        <p className="font-semibold text-ink">Pregunta:</p>
                        <p className="mt-1">{item.statement.es}</p>
                        <p className="mt-3 font-semibold text-ink">Tu respuesta:</p>
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

      <section className="mt-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-ink">¿Qué significan estos resultados?</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Los resultados muestran qué partidos están más cerca de tus respuestas en diferentes temas políticos. No es una recomendación de voto.
        </p>
      </section>

      <Link
        href="/quiz"
        onClick={reset}
        className="mt-8 block rounded-xl border border-line bg-white px-6 py-4 text-center font-semibold text-ink"
      >
        Empezar de nuevo
      </Link>
    </main>
  );
}
