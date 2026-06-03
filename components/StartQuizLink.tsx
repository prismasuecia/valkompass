'use client';

import Link from 'next/link';
import {useQuizStore} from '@/store/quizStore';
import uiText from '@/uiText.json';

export function StartQuizLink() {
  const reset = useQuizStore((state) => state.reset);

  return (
    <Link href="/quiz" onClick={reset} className="mt-8 rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white">
      {uiText.buttons.start}
    </Link>
  );
}
