'use client';

import {useEffect, useState} from 'react';
import {useQuizStore} from '@/store/quizStore';

export function useQuizHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useQuizStore.persist.hasHydrated()) setHydrated(true);
    return useQuizStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
