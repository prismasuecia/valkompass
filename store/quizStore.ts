'use client';

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {Language, QuizAnswer, Result} from '@/types';

type QuizState = {
  hasHydrated: boolean;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  skippedQuestions: string[];
  importantQuestions: string[];
  language: Language;
  results: Result[];
  setLanguage: (language: Language) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  skipQuestion: (questionId: string) => void;
  toggleImportantQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setResults: (results: Result[]) => void;
  reset: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      currentQuestionIndex: 0,
      answers: [],
      skippedQuestions: [],
      importantQuestions: [],
      language: 'es',
      results: [],
      setLanguage: (language) => set({language}),
      setHasHydrated: (hasHydrated) => set({hasHydrated}),
      answerQuestion: (answer) =>
        set((state) => ({
          answers: [...state.answers.filter((item) => item.questionId !== answer.questionId), answer],
          skippedQuestions: state.skippedQuestions.filter((item) => item !== answer.questionId)
        })),
      skipQuestion: (questionId) =>
        set((state) => ({
          answers: state.answers.filter((item) => item.questionId !== questionId),
          skippedQuestions: state.skippedQuestions.includes(questionId)
            ? state.skippedQuestions
            : [...state.skippedQuestions, questionId],
          importantQuestions: state.importantQuestions.filter((item) => item !== questionId)
        })),
      toggleImportantQuestion: (questionId) =>
        set((state) => ({
          importantQuestions: state.importantQuestions.includes(questionId)
            ? state.importantQuestions.filter((item) => item !== questionId)
            : [...state.importantQuestions, questionId]
        })),
      nextQuestion: () => set((state) => ({currentQuestionIndex: state.currentQuestionIndex + 1})),
      previousQuestion: () => set((state) => ({currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)})),
      setResults: (results) => set({results}),
      reset: () =>
        set({
          currentQuestionIndex: 0,
          answers: [],
          skippedQuestions: [],
          importantQuestions: [],
          language: 'es',
          results: []
        })
    }),
    {
      name: 'brujula-electoral-quiz-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        skippedQuestions: state.skippedQuestions,
        importantQuestions: state.importantQuestions,
        results: state.results
      }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true)
    }
  )
);
