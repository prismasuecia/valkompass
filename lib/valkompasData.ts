import partyPositionsData from '@/partyPositions.json';
import questionsSource from '@/questions.json';
import type {AnswerValue, Explanation, Position, Question, QuestionCategory} from '@/types';

const categoryMap: Record<string, QuestionCategory> = {
  Migración: 'migration',
  'Crimen y seguridad': 'crime',
  Escuela: 'school',
  'Dinero y trabajo': 'economy',
  'Energía y transporte': 'energy',
  'Europa e internacional': 'europe'
};

export const questions: Question[] = questionsSource.questions.map((item) => ({
  id: item.id,
  category: categoryMap[item.category],
  statement: {
    sv: item.question,
    es: item.question
  },
  explanationId: `EXP-${item.id}`,
  importanceAllowed: true
}));

export const explanations: Explanation[] = questionsSource.questions.map((item) => ({
  id: `EXP-${item.id}`,
  title: {
    sv: item.explanationTitle,
    es: item.explanationTitle
  },
  content: {
    sv: item.explanation,
    es: item.explanation
  }
}));

export const positions: Position[] = Object.entries(partyPositionsData).flatMap(([questionId, partyValues]) =>
  Object.entries(partyValues).map(([partyId, value]) => ({
    partyId,
    questionId,
    value: value as AnswerValue
  }))
);
