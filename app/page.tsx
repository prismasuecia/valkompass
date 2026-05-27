import Link from 'next/link';

const includedTopics = ['migración', 'economía', 'escuela', 'crimen', 'energía', 'bienestar social'];
const differentiators = ['Explicaciones simples', 'Información actualizada', 'Diseñado para hispanohablantes en Suecia'];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-10 md:py-12">
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/brand/prisma-suecia-logo.jpg`}
        alt="Prisma Suecia Noticias"
        className="mx-auto mb-7 h-16 w-auto object-contain opacity-90"
      />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Brújula electoral 2026</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        Una guía sencilla para comparar tus opiniones con las posiciones de los partidos suecos antes de las elecciones de 2026.
      </p>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Muchos hispanohablantes en Suecia sienten que la política sueca puede ser difícil de entender. Valkompas fue creado para explicar
        las diferencias entre los partidos de forma sencilla y neutral.
      </p>
      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <dl className="grid gap-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">Número de preguntas</dt>
            <dd className="font-semibold text-ink">20</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-medium text-slate-600">Tiempo estimado</dt>
            <dd className="font-semibold text-ink">3–5 minutos</dd>
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
      <Link href="/quiz" className="mt-8 rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white">
        Comenzar ahora
      </Link>
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
    </main>
  );
}
