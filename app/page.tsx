import Link from 'next/link';

const includedTopics = ['migración', 'economía', 'escuela', 'crimen', 'energía', 'bienestar social'];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Prisma Suecia</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Brújula electoral 2026</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        Una guía sencilla para comparar tus opiniones con las posiciones de los partidos suecos antes de las elecciones de 2026.
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
      <Link href="/quiz" className="mt-8 rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white">
        Comenzar Valkompas
      </Link>
      <p className="mt-4 text-center text-sm leading-6 text-slate-600">
        Valkompas compara tus respuestas con posiciones políticas públicas de los partidos suecos.
      </p>
    </main>
  );
}
