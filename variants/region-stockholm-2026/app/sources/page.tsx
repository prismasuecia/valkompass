import Link from 'next/link';
import {ReviewNotice} from '@/components/ReviewNotice';
import partyCardsData from '@/partyCards.json';
import sourceInventory from '@/sourceInventory.json';
import uiText from '@/uiText.json';
import questionData from '@/data/questions.json';

const sourceBasis = [
  uiText.sourcesPage.partyPrograms,
  uiText.sourcesPage.officialPolicyProposals,
  uiText.sourcesPage.officialPartyWebsites,
  uiText.sourcesPage.parliamentaryProposals,
  uiText.sourcesPage.leadershipStatements
];
const sourceTypeLabels = {
  officialPartyProgram: uiText.sourcesPage.officialPartyProgram,
  officialPolicyPages: uiText.sourcesPage.officialPolicyPages,
  officialElectionPlatform: uiText.sourcesPage.officialElectionPlatform
};
type SourceType = keyof typeof sourceTypeLabels;
const parties = Object.entries(partyCardsData).map(([id, party]) => ({
  id,
  name: party.name,
  inventory: sourceInventory[id as keyof typeof sourceInventory]
}));

export default function SourcesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10">
      <ReviewNotice />
      <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{uiText.app.name}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink">{uiText.sourcesPage.title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-700">{uiText.sourcesPage.intro}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{uiText.sourcesPage.notAffiliated}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{uiText.sourcesPage.globalLastReviewed}</p>

      <section className="mt-8 grid gap-4">
        <h2 className="text-xl font-semibold text-ink">Fuentes de las diez preguntas actuales</h2>
        <p className="text-sm leading-6 text-slate-600">Las diez preguntas tienen respuestas de los ocho partidos. No todas marcan grandes diferencias: la del centro de salud de las mujeres refleja principalmente acuerdo. El resultado compara únicamente estas propuestas documentadas y no resume toda la política regional.</p>
        {questionData.questions.map(question => (
          <details key={question.id} className="rounded-2xl border border-line bg-white p-5">
            <summary className="cursor-pointer font-semibold">{question.statement.es}</summary>
            {question.comparisonNote && <p className="mt-3 text-sm text-amber-900">{question.comparisonNote}</p>}
            <ul className="mt-4 grid gap-3 text-sm">
              {question.sourceUrls.map((url, index) => <li key={url}><a className="break-words underline" href={url}>Fuente {index + 1}: {new URL(url).hostname}{new URL(url).pathname.includes('/parti/') ? ` — ${new URL(url).pathname.split('/').filter(Boolean).pop()}` : ''}</a></li>)}
            </ul>
          </details>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-ink">{uiText.sourcesPage.basedOnTitle}</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
          {sourceBasis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-6 text-slate-600">{uiText.sourcesPage.disclaimer}</p>
      </section>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-xl font-semibold text-ink">{uiText.sourcesPage.partySourcesTitle}</h2>
        <div className="mt-5 grid gap-4">
          {parties.map((party) => (
            <article key={party.id} className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">{party.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {uiText.sourcesPage.lastReviewed}: {party.inventory.lastReviewed}
              </p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                {party.inventory.sources.map((source) => (
                  <li key={source.url}>
                    <span className="font-medium text-ink">{sourceTypeLabels[source.type as SourceType]}:</span>{' '}
                    <a href={source.url} className="inline-block min-h-6 underline underline-offset-4">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-600">
        <p className="mx-auto mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          {uiText.footer.betaBadge}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="inline-block min-h-6 font-medium text-ink">
            {uiText.sourcesPage.back}
          </Link>
        </div>
      </footer>
    </main>
  );
}
