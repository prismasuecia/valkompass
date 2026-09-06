import {calculateResultsCore} from '@/lib/calculateResultsCore.mjs';
import type {Party, Position, Question, QuizAnswer, Result} from '@/types';

export function calculateResults({answers, importantQuestions, parties, positions, questions}: {
  answers: QuizAnswer[];
  importantQuestions: string[];
  parties: Party[];
  positions: Position[];
  questions: Question[];
}): Result[] {
  return calculateResultsCore({answers, importantQuestions, parties, positions, questions}) as Result[];
}
