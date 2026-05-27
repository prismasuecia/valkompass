import type {Party, Position, Question, QuestionCategory, QuizAnswer, Result, ResultQuestion} from '@/types';

const MAX_DISTANCE = 4;

export function calculateResults({
  answers,
  importantQuestions,
  parties,
  positions,
  questions
}: {
  answers: QuizAnswer[];
  importantQuestions: string[];
  parties: Party[];
  positions: Position[];
  questions: Question[];
}): Result[] {
  const importantSet = new Set(importantQuestions);
  const answersByQuestion = new Map(answers.map((answer) => [answer.questionId, answer.value]));
  const questionsById = new Map(questions.map((question) => [question.id, question]));

  return parties
    .map((party) => {
      const partyPositions = positions.filter((position) => position.partyId === party.id);
      let earned = 0;
      let possible = 0;
      let matchedQuestions = 0;
      const comparisons: ResultQuestion[] = [];
      const categoryTotals = new Map<QuestionCategory, {earned: number; possible: number}>();

      for (const position of partyPositions) {
        const answer = answersByQuestion.get(position.questionId);
        const question = questionsById.get(position.questionId);
        if (answer === undefined || !question) continue;

        const weight = importantSet.has(position.questionId) ? 2 : 1;
        const distance = Math.abs(answer - position.value);
        const similarity = (MAX_DISTANCE - distance) / MAX_DISTANCE;
        const category = categoryTotals.get(question.category) ?? {earned: 0, possible: 0};

        earned += similarity * weight;
        possible += weight;
        matchedQuestions += 1;
        category.earned += similarity * weight;
        category.possible += weight;
        categoryTotals.set(question.category, category);
        comparisons.push({
          questionId: question.id,
          category: question.category,
          statement: question.statement,
          userValue: answer,
          partyValue: position.value,
          distance
        });
      }

      return {
        partyId: party.id,
        score: possible === 0 ? 0 : Math.round((earned / possible) * 100),
        matchedQuestions,
        matchingCategories: [...categoryTotals.entries()]
          .sort((a, b) => b[1].earned / b[1].possible - a[1].earned / a[1].possible)
          .slice(0, 3)
          .map(([category]) => category),
        strongestAgreements: [...comparisons].sort((a, b) => a.distance - b.distance).slice(0, 3),
        strongestDisagreements: [...comparisons].sort((a, b) => b.distance - a.distance).slice(0, 3),
        comparisons
      };
    })
    .sort((a, b) => b.score - a.score);
}
