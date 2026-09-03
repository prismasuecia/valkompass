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
const thematicSources = [
  {
    title: 'Socialdemokraterna: presupuesto 2026 y precio ordinario de SL',
    url: 'https://socialdemokraternaistockholm.se/stockholm/nyheter/artiklar/2025-10-13-en-budget-som-bygger-stockholmsregionen-starkare',
    note: 'Documenta la decisión de mantener sin cambios los precios ordinarios de SL durante 2026.'
  },
  {
    title: 'Region Stockholm: presupuesto regional para 2026',
    url: 'https://www.regionstockholm.se/nyheter/2025/10/regionstyrelsens-forslag-till-budget-2026-for-region-stockholm/',
    note: 'Documenta el nivel del impuesto regional y los precios ordinarios de SL para 2026.'
  },
  {
    title: 'Region Stockholm: plan de transformación del sistema de libre elección sanitaria',
    url: 'https://www.regionstockholm.se/nyheter/2023/06/forslag-till-omstallningsplan-vardval-klar/',
    note: 'Describe qué sistemas de libre elección se modifican y cómo funciona el proceso regional.'
  },
  {
    title: 'Läkartidningen: criterios en la contratación de psiquiatría especializada',
    url: 'https://lakartidningen.se/nyheter/psykiatriupphandling-sagas-av-oppositionen-dumpade-priser/',
    note: 'Explica la diferencia entre los requisitos mínimos de calidad y el precio como criterio de selección.'
  },
  {
    title: 'SVT: respuestas de los partidos de la Región de Estocolmo sobre intérpretes',
    url: 'https://valkompass.svt.se/2026/stockholm/start-region/',
    note: 'Da acceso a las respuestas de los ocho partidos a la misma propuesta sobre interpretación gratuita.'
  },
  {
    title: 'Socialstyrelsen: responsabilidad de proporcionar un intérprete',
    url: 'https://www.socialstyrelsen.se/kunskapsstod-och-regler/regler-och-riktlinjer/vem-far-gora-vad/tolk/',
    note: 'Describe la obligación de la región o del proveedor sanitario de disponer de un intérprete cuando sea necesario.'
  },
  {
    title: 'Region Stockholm: billete gratuito para jóvenes durante las vacaciones escolares de 2026',
    url: 'https://www.regionstockholm.se/nyheter/2026/01/sls-lovbiljett-till-unga-har-borjat-skickas-ut/',
    note: 'Documenta quién puede viajar gratis durante las vacaciones escolares y en qué fechas se aplica.'
  },
  {
    title: 'SVT: respuestas de los ocho partidos sobre viajes gratuitos para niños y jóvenes',
    url: 'https://valkompass.svt.se/2026/stockholm/start-region/',
    note: 'Reúne las respuestas directas de los partidos a la misma propuesta regional.'
  }
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
        <p className="text-sm leading-6 text-slate-600">Las diez preguntas tienen respuestas de los ocho partidos. No todas marcan grandes diferencias: la del centro de salud de las mujeres refleja principalmente acuerdo. La publicación del resultado continúa bloqueada mientras terminamos la revisión.</p>
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
        <h2 className="text-xl font-semibold text-ink">Archivo de investigación — no todas estas propuestas siguen en el cuestionario</h2>
        <div className="mt-5 grid gap-4">
          {thematicSources.map((source) => (
            <article key={source.url} className="rounded-2xl border border-line bg-white p-5">
              <a href={source.url} className="font-semibold text-ink underline underline-offset-4">{source.title}</a>
              <p className="mt-2 text-sm leading-6 text-slate-600">{source.note}</p>
            </article>
          ))}
        </div>
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
