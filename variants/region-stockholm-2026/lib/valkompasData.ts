import questionsSource from '@/data/questions.json';
import type {AnswerValue, Explanation, Position, Question, QuestionCategory} from '@/types';

type SourceQuestion = {
  id: string;
  category: QuestionCategory;
  statement: {sv: string; es: string};
  context: {sv: string; es: string};
  explanation: {
    title: {sv: string; es: string};
    sections: {title: {sv: string; es: string}; content: {sv: string; es: string}}[];
  };
  positions: Record<string, number | null>;
};

const sourceQuestions = questionsSource.questions as SourceQuestion[];

export const questions: Question[] = sourceQuestions.map((item) => ({
  id: item.id,
  category: item.category,
  statement: item.statement,
  context: item.context,
  explanationId: `EXP-${item.id}`,
  importanceAllowed: true
}));

export const explanations: Explanation[] = sourceQuestions.map((item) => ({
  id: `EXP-${item.id}`,
  title: item.explanation.title,
  sections: item.explanation.sections
}));

export const positions: Position[] = sourceQuestions.flatMap((question) =>
  Object.entries(question.positions).flatMap(([partyId, value]) =>
    value === null ? [] : [{partyId, questionId: question.id, value: value as AnswerValue}]
  )
);
