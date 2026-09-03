import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {calculateResultsCore} from '../lib/calculateResultsCore.mjs';

const parties = [{id: 'A'}, {id: 'B'}];
const questions = [
  {id: 'Q1', category: 'regionalTax', statement: {sv: 'Q1', es: 'Q1'}},
  {id: 'Q2', category: 'publicTransport', statement: {sv: 'Q2', es: 'Q2'}}
];
const answers = [{questionId: 'Q1', value: 2}, {questionId: 'Q2', value: -2}];

test('normalizes each party only across documented positions', () => {
  const results = calculateResultsCore({answers, importantQuestions: [], parties, questions, positions: [
    {partyId: 'A', questionId: 'Q1', value: 2},
    {partyId: 'B', questionId: 'Q1', value: 2},
    {partyId: 'B', questionId: 'Q2', value: 2}
  ]});
  assert.equal(results.find((result) => result.partyId === 'A').score, 100);
  assert.equal(results.find((result) => result.partyId === 'A').matchedQuestions, 1);
  assert.equal(results.find((result) => result.partyId === 'B').score, 50);
  assert.equal(results.find((result) => result.partyId === 'B').matchedQuestions, 2);
});

test('important questions double earned and possible points', () => {
  const [result] = calculateResultsCore({answers, importantQuestions: ['Q1'], parties: [parties[0]], questions, positions: [
    {partyId: 'A', questionId: 'Q1', value: 2},
    {partyId: 'A', questionId: 'Q2', value: 2}
  ]});
  assert.equal(result.score, 67);
  assert.equal(result.matchedQuestions, 2);
});

test('insufficient information is excluded instead of treated as neutral', () => {
  const [result] = calculateResultsCore({
    answers: [{questionId: 'Q1', value: 2}, {questionId: 'Q2', value: 'skip'}],
    importantQuestions: [],
    parties: [parties[0]],
    questions,
    positions: [
      {partyId: 'A', questionId: 'Q1', value: 2},
      {partyId: 'A', questionId: 'Q2', value: 0}
    ]
  });
  assert.equal(result.score, 100);
  assert.equal(result.matchedQuestions, 1);
});

test('identical complete inputs always produce identical results', () => {
  const input = {
    answers,
    importantQuestions: ['Q1'],
    parties,
    questions,
    positions: [
      {partyId: 'A', questionId: 'Q1', value: 1},
      {partyId: 'B', questionId: 'Q1', value: -1},
      {partyId: 'A', questionId: 'Q2', value: -2},
      {partyId: 'B', questionId: 'Q2', value: 2}
    ]
  };
  assert.deepEqual(calculateResultsCore(input), calculateResultsCore(input));
});

test('tax uses documented level answers rather than an ideological expected winner', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url), 'utf8'));
  const tax = data.questions.find(q => q.id === 'RS26-Q01');
  assert.equal(tax.answerScale, 'tax-level');
  assert.deepEqual(tax.positions, {S:0, M:2, SD:2, V:-1, C:1, KD:1, L:1, MP:0});
});
