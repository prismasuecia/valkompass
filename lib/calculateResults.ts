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

  return [...parties]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((party) => {
      const partyPositions = positions
        .filter((position) => position.partyId === party.id)
        .sort((a, b) => a.questionId.localeCompare(b.questionId));
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
        const points = (MAX_DISTANCE - distance) * weight;
        const category = categoryTotals.get(question.category) ?? {earned: 0, possible: 0};

        earned += points;
        possible += MAX_DISTANCE * weight;
        matchedQuestions += 1;
        category.earned += points;
        category.possible += MAX_DISTANCE * weight;
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
          .sort((a, b) => {
            const scoreDiff = b[1].earned / b[1].possible - a[1].earned / a[1].possible;
            return scoreDiff || a[0].localeCompare(b[0]);
          })
          .slice(0, 3)
          .map(([category]) => category),
        strongestAgreements: [...comparisons]
          .sort((a, b) => a.distance - b.distance || a.questionId.localeCompare(b.questionId))
          .slice(0, 3),
        strongestDisagreements: [...comparisons]
          .sort((a, b) => b.distance - a.distance || a.questionId.localeCompare(b.questionId))
          .slice(0, 3),
        comparisons: [...comparisons].sort((a, b) => a.questionId.localeCompare(b.questionId))
      };
    })
    .sort((a, b) => b.score - a.score || a.partyId.localeCompare(b.partyId));
}
