'use client';

import Link from 'next/link';
import partiesData from '@/data/parties.json';
import {useQuizStore} from '@/store/quizStore';
import type {Party} from '@/types';

const parties = partiesData as Party[];

export default function ResultPage() {
  const {language, results, reset} = useQuizStore();

  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Prisma Suecia</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">Estás más cerca de:</h1>
      <div className="mt-8 grid gap-4">
        {results.map((result) => {
          const party = parties.find((item) => item.id === result.partyId);
          if (!party) return null;

          return (
            <article key={result.partyId} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full" style={{backgroundColor: party.color}} />
                  <h2 className="font-semibold text-ink">{party.name[language]}</h2>
                </div>
                <p className="text-lg font-semibold text-ink">{result.score}%</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Preguntas comparadas: {result.matchedQuestions}
              </p>
            </article>
          );
        })}
      </div>
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
