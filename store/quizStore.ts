'use client';

import {create} from 'zustand';
import type {Language, QuizAnswer, Result} from '@/types';

type QuizState = {
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  importantQuestions: string[];
  language: Language;
  results: Result[];
  setLanguage: (language: Language) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  toggleImportantQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setResults: (results: Result[]) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  importantQuestions: [],
  language: 'sv',
  results: [],
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
  setResults: (results) => set({results}),
  reset: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      importantQuestions: [],
      results: []
    })
}));
