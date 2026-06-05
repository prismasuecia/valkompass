'use client';

import Link from 'next/link';
import {trackEvent} from '@/lib/analytics';
import {useQuizStore} from '@/store/quizStore';
import uiText from '@/uiText.json';

export function StartQuizLink() {
  const reset = useQuizStore((state) => state.reset);

  function handleStart() {
    reset();
    trackEvent('quiz_started', {question_count: 20});
  }

  return (
    <Link href="/quiz" onClick={handleStart} className="mt-8 rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white">
      {uiText.buttons.start}
    </Link>
  );
}
