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
      <StartQuizLink />

      <section className="mt-8 grid gap-3">
        <details className="rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.importantInfo.title}
          </summary>
          <div className="border-t border-line px-5 pb-5">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-6 text-slate-700">
                {paragraph}
              </p>
            ))}
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <li>{uiText.importantInfo.parliament}</li>
              <li>{uiText.importantInfo.local}</li>
              <li>{uiText.importantInfo.recommendation}</li>
            </ul>
            <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm">
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
            <p className="mt-5 border-t border-line pt-5 text-sm leading-6 text-slate-600">{uiText.editorial.sourcesText}</p>
          </div>
        </details>

        <details className="rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.votingRights.title}
          </summary>
          <p className="border-t border-line px-5 py-4 text-sm leading-6 text-slate-700">{uiText.votingRights.text}</p>
        </details>

        <details className="rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.methodology.title}
          </summary>
          <div className="border-t border-line px-5 pb-5 text-sm leading-6 text-slate-700">
            {methodologyParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4">
                {paragraph}
              </p>
            ))}
          </div>
        </details>

        <details className="rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.editorial.title}
          </summary>
          <div className="grid gap-3 border-t border-line p-5 sm:grid-cols-3">
            {[uiText.editorial.neutralityText, uiText.editorial.transparencyText, uiText.editorial.languageText].map((item) => (
              <p key={item} className="rounded-xl bg-paper px-4 py-3 text-sm font-medium leading-6 text-slate-700">
                {item}
              </p>
            ))}
          </div>
        </details>

        <details className="rounded-2xl border border-line bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 py-4 text-base font-semibold text-ink hover:bg-paper">
            {uiText.home.partiesIncluded}
          </summary>
          <div className="grid grid-cols-2 gap-3 border-t border-line p-5 sm:grid-cols-4">
            {partyLogos.map((logo) => (
              <div key={logo.name} className="flex h-16 items-center justify-center rounded-xl bg-paper p-3">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${logo.src}`}
                  alt={logo.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </details>
      </section>
      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-600">
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
