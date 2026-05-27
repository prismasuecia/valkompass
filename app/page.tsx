import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Prisma Suecia</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Brújula electoral 2026</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        Una guía sencilla para comparar tus opiniones con las posiciones de los partidos suecos antes de las elecciones de 2026.
      </p>
      <Link href="/quiz" className="mt-10 rounded-xl bg-ink px-6 py-4 text-center text-base font-semibold text-white">
        Comenzar
      </Link>
    </main>
  );
}
