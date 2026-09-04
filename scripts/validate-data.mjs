import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
const questions = (await readJson('questions.json')).questions;
const positions = await readJson('partyPositions.json');
const parties = await readJson('data/parties.json');
const sources = await readJson('QUESTION_SOURCE_MAP.json');
const validValues = new Set([-2, -1, 0, 1, 2]);
const partyIds = parties.map((party) => party.id);

assert.equal(questions.length, 20, 'Valkompassen ska innehålla exakt 20 frågor.');
assert.equal(new Set(questions.map((question) => question.id)).size, questions.length, 'Fråge-id:n måste vara unika.');

for (const question of questions) {
  assert.ok(question.question?.trim(), `${question.id} saknar frågetext.`);
  assert.ok(question.explanationTitle?.trim(), `${question.id} saknar förklaringsrubrik.`);
  assert.ok(question.explanation?.trim(), `${question.id} saknar förklaring.`);
  assert.deepEqual(Object.keys(positions[question.id] ?? {}).sort(), [...partyIds].sort(), `${question.id} saknar partipositioner.`);
  assert.ok((sources[question.id] ?? []).length > 0, `${question.id} saknar källor.`);

  for (const partyId of partyIds) {
    assert.ok(validValues.has(positions[question.id][partyId]), `${question.id}/${partyId} har ogiltigt värde.`);
  }
}

assert.deepEqual(Object.keys(positions).sort(), questions.map((question) => question.id).sort(), 'Positionsfilen innehåller fel fråge-id:n.');
assert.deepEqual(Object.keys(sources).sort(), questions.map((question) => question.id).sort(), 'Källkartan innehåller fel fråge-id:n.');

console.log(`Datakontroll godkänd: ${questions.length} frågor, ${partyIds.length} partier och ${questions.length * partyIds.length} positioner.`);
