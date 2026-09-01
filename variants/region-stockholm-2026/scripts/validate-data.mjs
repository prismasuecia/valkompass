import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url), 'utf8'));
const partyIds = ['S', 'M', 'SD', 'V', 'C', 'KD', 'L', 'MP'];
const validCategories = new Set(['regionalTax', 'psychiatryProcurement', 'healthcareOperations', 'publicTransport']);
const ids = new Set();

if (data.jurisdiction !== 'region-stockholm' || data.questions.length !== 4) throw new Error('Expected four verified Region Stockholm questions');
if (data.reviewedAt !== '2026-09-01') throw new Error('Expected a September 2026 review date');
for (const question of data.questions) {
  if (ids.has(question.id)) throw new Error(`Duplicate question id: ${question.id}`);
  ids.add(question.id);
  if (!validCategories.has(question.category)) throw new Error(`Invalid category: ${question.category}`);
  if (!question.statement.sv || !question.statement.es) throw new Error(`Missing statement: ${question.id}`);
  if (!question.context.sv || !question.context.es) throw new Error(`Missing context: ${question.id}`);
  if (question.explanation.sections.length !== 4) throw new Error(`Expected four explanation sections: ${question.id}`);
  for (const section of question.explanation.sections) {
    if (!section.title.sv || !section.title.es || !section.content.sv || !section.content.es) {
      throw new Error(`Incomplete explanation section: ${question.id}`);
    }
  }
  for (const partyId of partyIds) {
    if (!(partyId in question.positions)) throw new Error(`${question.id} is missing ${partyId}`);
    const value = question.positions[partyId];
    if (value !== null && ![-2, -1, 0, 1, 2].includes(value)) throw new Error(`${question.id}/${partyId} has invalid value`);
  }
}
console.log(`Validated ${data.questions.length} isolated Region Stockholm questions.`);
