'use client';

import {FormEvent, ReactNode, useEffect, useState} from 'react';
import uiText from '@/uiText.json';

const betaPassword = 'prismasuecia';
const storageKey = 'valkompas-beta-access';

export function BetaGate({children}: {children: ReactNode}) {
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAllowed(window.localStorage.getItem(storageKey) === 'true');
    setReady(true);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim().toLowerCase() !== betaPassword) {
      setError(uiText.betaAccess.error);
      return;
    }

    window.localStorage.setItem(storageKey, 'true');
    setAllowed(true);
    setError('');
  }

  if (!ready) {
    return null;
  }

  if (allowed) {
    return children;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{uiText.footer.betaBadge}</p>
        <h1 className="mt-3 text-2xl font-semibold text-ink">{uiText.betaAccess.title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">{uiText.betaAccess.text}</p>
        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-ink" htmlFor="beta-password">
            {uiText.betaAccess.label}
          </label>
          <input
            id="beta-password"
            autoComplete="off"
            className="min-h-12 rounded-xl border border-line bg-white px-4 text-base text-ink"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
          <button className="min-h-12 rounded-xl bg-ink px-5 py-3 font-semibold text-white" type="submit">
            {uiText.betaAccess.button}
          </button>
        </form>
      </section>
    </main>
  );
}
