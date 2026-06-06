'use client';

import {useEffect} from 'react';
import {useQuizStore} from '@/store/quizStore';

export function QuizStoreHydration() {
  useEffect(() => {
    void useQuizStore.persist.rehydrate();
  }, []);

  return null;
}
