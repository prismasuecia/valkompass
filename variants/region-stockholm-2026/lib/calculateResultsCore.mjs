// Six is an editorial minimum, not a statistical guarantee of reliability.
export const MIN_COMMON_ANSWERS = 6;

export function calculateResultsCore({answers, importantQuestions, parties, positions, questions, minimumCommonAnswers = MIN_COMMON_ANSWERS}) {
  if (!Number.isInteger(minimumCommonAnswers) || minimumCommonAnswers < 1) throw new Error('Invalid minimum');
  const unique = (rows, key) => {
    const keys = rows.map(key);
    if (new Set(keys).size !== keys.length) throw new Error('Duplicate input');
  };
  unique(questions, q => q.id);
  unique(parties, p => p.id);
  unique(answers, a => a.questionId);
  unique(positions, p => JSON.stringify([p.partyId, p.questionId]));
  const importantSet = new Set(importantQuestions);
  const questionsById = new Map(questions.map((question) => [question.id, question]));
  const validValue = (value, question) => Number.isInteger(value) && Math.abs(value) <= (question.answerScale === 'categorical' ? 1 : 2);
  for (const answer of answers) {
    const question = questionsById.get(answer.questionId);
    if (!question || (answer.value !== 'skip' && !validValue(answer.value, question))) throw new Error('Invalid answer');
  }
  const partyIds = new Set(parties.map(p => p.id));
  for (const position of positions) {
    const question = questionsById.get(position.questionId);
    if (!question || !partyIds.has(position.partyId) || (position.value !== null && !validValue(position.value, question))) throw new Error('Invalid position');
  }
  const answersByQuestion = new Map(
    answers.filter((answer) => typeof answer.value === 'number').map((answer) => [answer.questionId, answer.value])
  );
  const commonIds = new Set(questions.filter(q => q.scoringApproved === true && answersByQuestion.has(q.id) &&
    parties.every(p => positions.some(position => position.partyId === p.id && position.questionId === q.id && position.value !== null))
  ).map(q => q.id));
  // No score is preferable to presenting absent evidence as zero agreement.
  if (parties.length < 2 || commonIds.size < minimumCommonAnswers) return [];

  const results = [...parties].sort((a, b) => a.id.localeCompare(b.id)).map((party) => {
    const partyPositions = positions.filter((position) => position.partyId === party.id && commonIds.has(position.questionId))
      .sort((a, b) => a.questionId.localeCompare(b.questionId));
    let earned = 0;
    let possible = 0;
    const comparisons = [];
    const categoryTotals = new Map();

    for (const position of partyPositions) {
      const answer = answersByQuestion.get(position.questionId);
      const question = questionsById.get(position.questionId);
      if (answer === undefined || !question) continue;
      // Enforce editorial limits even for previously saved importance selections.
      const weight = importantSet.has(position.questionId) && !question.comparisonNote && question.importanceAllowed !== false ? 2 : 1;
      const maxDistance = question.answerScale === 'categorical' ? 2 : 4;
      const distance = Math.abs(answer - position.value) / maxDistance;
      const points = (1 - distance) * weight;
      const category = categoryTotals.get(question.category) ?? {earned: 0, possible: 0};
      earned += points;
      possible += weight;
      category.earned += points;
      category.possible += weight;
      categoryTotals.set(question.category, category);
      comparisons.push({questionId: question.id, category: question.category, statement: question.statement,
        userValue: answer, partyValue: position.value, distance});
    }

    return {
      partyId: party.id,
      score: possible === 0 ? 0 : Math.round((earned / possible) * 100),
      matchedQuestions: comparisons.length,
      matchingCategories: [...categoryTotals.entries()]
        .sort((a, b) => b[1].earned / b[1].possible - a[1].earned / a[1].possible || a[0].localeCompare(b[0]))
        .slice(0, 3).map(([category]) => category),
      strongestAgreements: [...comparisons].sort((a, b) => a.distance - b.distance || a.questionId.localeCompare(b.questionId)).slice(0, 3),
      strongestDisagreements: [...comparisons].sort((a, b) => b.distance - a.distance || a.questionId.localeCompare(b.questionId)).slice(0, 3),
      comparisons: [...comparisons].sort((a, b) => a.questionId.localeCompare(b.questionId))
    };
  }).sort((a, b) => b.score - a.score || a.partyId.localeCompare(b.partyId));
  return results.map((result, index) => ({...result,
    rank: results.findIndex(other => other.score === result.score) + 1,
    tied: results.some((other, otherIndex) => otherIndex !== index && other.score === result.score)
  }));
}
