export type Language = 'sv' | 'es';

export type LocalizedText = Record<Language, string>;

export type QuestionCategory = 'migration' | 'crime' | 'school' | 'economy' | 'energy';

export type AnswerValue = -2 | -1 | 0 | 1 | 2;

export type Question = {
  id: string;
  category: QuestionCategory;
  statement: LocalizedText;
  explanationId: string;
  importanceAllowed: boolean;
};

export type Party = {
  id: string;
  name: LocalizedText;
  color: string;
};

export type Position = {
  partyId: string;
  questionId: string;
  value: AnswerValue;
};

export type Explanation = {
  id: string;
  title: LocalizedText;
  content: LocalizedText;
};

export type QuizAnswer = {
  questionId: string;
  value: AnswerValue;
};

export type Result = {
  partyId: string;
  score: number;
  matchedQuestions: number;
};
