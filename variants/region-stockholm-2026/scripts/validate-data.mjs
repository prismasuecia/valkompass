import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url), 'utf8'));
const partyIds = ['S', 'M', 'SD', 'V', 'C', 'KD', 'L', 'MP'];
const validCategories = new Set(['regionalTax', 'childYouthPsychiatry', 'healthcareOperations', 'publicTransport', 'healthcareAccess', 'cultureInvestment']);
const ids = new Set();

if (data.jurisdiction !== 'region-stockholm' || data.questions.length !== 6) throw new Error('Expected six Region Stockholm questions');
for (const question of data.questions) {
  if (ids.has(question.id)) throw new Error(`Duplicate question id: ${question.id}`);
  ids.add(question.id);
  if (!validCategories.has(question.category)) throw new Error(`Invalid category: ${question.category}`);
  if (!question.statement.sv || !question.statement.es) throw new Error(`Missing statement: ${question.id}`);
  if (!question.explanation.content.sv || !question.explanation.content.es) throw new Error(`Missing explanation: ${question.id}`);
  for (const partyId of partyIds) {
    if (!(partyId in question.positions)) throw new Error(`${question.id} is missing ${partyId}`);
    const value = question.positions[partyId];
    if (value !== null && ![-2, -1, 0, 1, 2].includes(value)) throw new Error(`${question.id}/${partyId} has invalid value`);
  }
}
console.log(`Validated ${data.questions.length} isolated Region Stockholm questions.`);
