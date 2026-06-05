import {StartQuizLink} from '@/components/StartQuizLink';
import Link from 'next/link';
import partyCardsData from '@/partyCards.json';
import uiText from '@/uiText.json';

const includedTopics = Object.values(uiText.categories);
const partyLogos = [
  {name: partyCardsData.S.name, src: '/party-logos/s.png'},
  {name: partyCardsData.M.name, src: '/party-logos/m.svg'},
  {name: partyCardsData.SD.name, src: '/party-logos/sd.png'},
  {name: partyCardsData.L.name, src: '/party-logos/l.png'},
  {name: partyCardsData.KD.name, src: '/party-logos/kd.jpg'},
  {name: partyCardsData.V.name, src: '/party-logos/v.png'},
  {name: partyCardsData.C.name, src: '/party-logos/c.png'},
  {name: partyCardsData.MP.name, src: '/party-logos/mp.png'}
];

export default function HomePage() {
  const introParagraphs = uiText.intro.text.split('\n\n');
  const methodologyParagraphs = uiText.methodology.text.split('\n\n');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-10 md:py-12">
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/brand/prisma-suecia-logo.jpg`}
        alt={uiText.footer.createdBy}
        className="mx-auto mb-7 h-16 w-auto object-contain opacity-90"
      />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{uiText.app.title}</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">{uiText.app.subtitle}</p>
      <p className="mt-5 text-lg leading-8 text-slate-700">{introParagraphs[0]}</p>
      <StartQuizLink />
      <p className="mt-4 text-center text-sm leading-6 text-slate-600">{uiText.methodology.text.split('\n\n')[0]}</p>
      {introParagraphs.slice(1).map((paragraph) => (
        <p key={paragraph} className="mt-4 text-base leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-base font-semibold text-ink">{uiText.importantInfo.title}</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
          <li>{uiText.importantInfo.parliament}</li>
          <li>{uiText.importantInfo.local}</li>
          <li>{uiText.importantInfo.recommendation}</li>
        </ul>
      </section>
      <details className="mt-4 rounded-2xl border border-line bg-white p-5">
        <summary className="block min-h-6 cursor-pointer text-base font-semibold text-ink">{uiText.votingRights.title}</summary>
        <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.votingRights.text}</p>
      </details>
      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <dl className="grid gap-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">{uiText.quizInfo.questionsLabel}</dt>
            <dd className="font-semibold text-ink">{uiText.quizInfo.questionsValue}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">{uiText.quizInfo.timeLabel}</dt>
            <dd className="font-semibold text-ink">{uiText.quizInfo.timeValue}</dd>
          </div>
        </dl>
        <div className="mt-5 border-t border-line pt-5">
          <p className="text-sm font-medium text-slate-600">{uiText.categoryResults.title}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {includedTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-line bg-paper px-3 py-1 text-sm font-medium text-slate-700">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
      <p className="mt-4 text-sm leading-6 text-slate-600">{uiText.editorial.sourcesText}</p>
      <details className="mt-4 rounded-2xl border border-line bg-white p-5 text-sm leading-6 text-slate-700">
        <summary className="block min-h-6 cursor-pointer text-base font-semibold text-ink">{uiText.methodology.title}</summary>
        {methodologyParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-3">
            {paragraph}
          </p>
        ))}
      </details>
      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-base font-semibold text-ink">{uiText.editorial.title}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[uiText.editorial.neutralityText, uiText.editorial.transparencyText, uiText.editorial.languageText].map((item) => (
            <p key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="mt-8 border-t border-line pt-6">
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {partyLogos.map((logo) => (
            <div key={logo.name} className="flex h-20 items-center justify-center rounded-xl bg-white p-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${logo.src}`}
                alt={logo.name}
                className="max-h-12 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>
      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-600">
        <p className="mx-auto mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          {uiText.footer.betaBadge}
        </p>
        <p>{uiText.footer.createdBy}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <Link href="/sources" className="inline-block min-h-6 font-medium text-ink">
            {uiText.footer.sourcesLink}
          </Link>
        </div>
      </footer>
    </main>
  );
}
