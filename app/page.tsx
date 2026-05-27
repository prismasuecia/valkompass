import {StartQuizLink} from '@/components/StartQuizLink';
import questionsData from '@/data/questions.json';

const includedTopics = ['migración', 'economía', 'escuela', 'crimen', 'energía', 'bienestar social'];
const differentiators = ['Explicaciones simples', 'Información actualizada', 'Diseñado para hispanohablantes en Suecia'];
const questionCount = questionsData.length;
const partyLogos = [
  {name: 'Socialdemokraterna', src: '/party-logos/s.png'},
  {name: 'Moderaterna', src: '/party-logos/m.svg'},
  {name: 'Sverigedemokraterna', src: '/party-logos/sd.png'},
  {name: 'Liberalerna', src: '/party-logos/l.png'},
  {name: 'Kristdemokraterna', src: '/party-logos/kd.jpg'},
  {name: 'Vänsterpartiet', src: '/party-logos/v.png'},
  {name: 'Centerpartiet', src: '/party-logos/c.png'},
  {name: 'Miljöpartiet', src: '/party-logos/mp.png'}
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-10 md:py-12">
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/brand/prisma-suecia-logo.jpg`}
        alt="Prisma Suecia Noticias"
        className="mx-auto mb-7 h-16 w-auto object-contain opacity-90"
      />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Brújula electoral 2026</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Una guía sencilla para comparar tus opiniones con los partidos políticos suecos.
      </p>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        Valkompas fue creado para ayudar a entender mejor cómo piensan los partidos políticos suecos.
      </p>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Entender la política sueca puede ser difícil, especialmente si el español es tu idioma principal.
      </p>
      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-base font-semibold text-ink">Antes de comenzar</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
          <li>Esta brújula electoral se basa únicamente en las elecciones al parlamento nacional sueco (Riksdagen).</li>
          <li>No incluye elecciones municipales o regionales.</li>
          <li>El resultado no es una recomendación de voto.</li>
        </ul>
      </section>
      <details className="mt-4 rounded-2xl border border-line bg-white p-5">
        <summary className="cursor-pointer text-base font-semibold text-ink">¿Quién puede votar en las elecciones parlamentarias suecas?</summary>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Para votar en las elecciones al parlamento sueco normalmente se requiere ciudadanía sueca.
        </p>
      </details>
      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <dl className="grid gap-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">Número de preguntas</dt>
            <dd className="font-semibold text-ink">{questionCount}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">Tiempo estimado</dt>
            <dd className="font-semibold text-ink">2–3 minutos</dd>
          </div>
        </dl>
        <div className="mt-5 border-t border-line pt-5">
          <p className="text-sm font-medium text-slate-600">Temas incluidos:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {includedTopics.map((topic) => (
              <span key={topic} className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-slate-700">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Basado en posiciones políticas públicas y actuales de los partidos del parlamento sueco.
      </p>
      <details className="mt-4 rounded-2xl border border-line bg-white p-5 text-sm leading-6 text-slate-700">
        <summary className="cursor-pointer text-base font-semibold text-ink">¿Cómo funciona Valkompas?</summary>
        <p className="mt-3">Las posiciones de los partidos se basan en programas políticos, propuestas y declaraciones públicas recientes.</p>
        <p className="mt-3">Las posiciones políticas pueden cambiar y Valkompas se actualiza continuamente.</p>
        <p className="mt-3">La política es compleja y esta herramienta simplifica algunas posiciones para facilitar la comparación.</p>
      </details>
      <StartQuizLink />
      <p className="mt-4 text-center text-sm leading-6 text-slate-600">
        Valkompas compara tus respuestas con posiciones políticas públicas de los partidos suecos.
      </p>
      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-base font-semibold text-ink">¿Qué hace diferente a Valkompas?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {differentiators.map((item) => (
            <p key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="mt-8 border-t border-line pt-6">
        <p className="text-sm font-medium text-slate-600">Partidos incluidos en el análisis</p>
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
      <footer className="mt-8 border-t border-line pt-6 text-center text-sm text-slate-500">
        Creado por Prisma Suecia
      </footer>
    </main>
  );
}
