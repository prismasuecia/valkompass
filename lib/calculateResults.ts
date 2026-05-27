import type {Party, Position, QuizAnswer, Result} from '@/types';

const MAX_DISTANCE = 4;

export function calculateResults({
  answers,
  importantQuestions,
  parties,
  positions
}: {
  answers: QuizAnswer[];
  importantQuestions: string[];
  parties: Party[];
  positions: Position[];
}): Result[] {
  const importantSet = new Set(importantQuestions);
  const answersByQuestion = new Map(answers.map((answer) => [answer.questionId, answer.value]));

  return parties
    .map((party) => {
      const partyPositions = positions.filter((position) => position.partyId === party.id);
      let earned = 0;
      let possible = 0;
      let matchedQuestions = 0;

      for (const position of partyPositions) {
        const answer = answersByQuestion.get(position.questionId);
        if (answer === undefined) continue;

        const weight = importantSet.has(position.questionId) ? 2 : 1;
        const distance = Math.abs(answer - position.value);
        const similarity = (MAX_DISTANCE - distance) / MAX_DISTANCE;

        earned += similarity * weight;
        possible += weight;
        matchedQuestions += 1;
      }

      return {
        partyId: party.id,
        score: possible === 0 ? 0 : Math.round((earned / possible) * 100),
        matchedQuestions
      };
    })
    .sort((a, b) => b.score - a.score);
}
