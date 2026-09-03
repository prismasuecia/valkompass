'use client';

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {Language, QuizAnswer} from '@/types';

type QuizState = {
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  importantQuestions: string[];
  language: Language;
  setLanguage: (language: Language) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  toggleImportantQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      answers: [],
      importantQuestions: [],
      language: 'es',
      setLanguage: (language) => set({language}),
      answerQuestion: (answer) =>
        set((state) => ({
          answers: [...state.answers.filter((item) => item.questionId !== answer.questionId), answer]
        })),
      toggleImportantQuestion: (questionId) =>
        set((state) => ({
          importantQuestions: state.importantQuestions.includes(questionId)
            ? state.importantQuestions.filter((item) => item !== questionId)
            : [...state.importantQuestions, questionId]
        })),
      nextQuestion: () => set((state) => ({currentQuestionIndex: state.currentQuestionIndex + 1})),
      previousQuestion: () => set((state) => ({currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)})),
      reset: () =>
        set({
          currentQuestionIndex: 0,
          answers: [],
          importantQuestions: [],
          language: 'es',
        })
    }),
    {
      // Old answers used a different tax proposition: keep them in their old key,
      // but never silently reinterpret them as answers on the new level scale.
      name: 'brujula-region-stockholm-2026-session-v6',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        importantQuestions: state.importantQuestions
      }),
      skipHydration: true
    }
  )
);
