import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {canShowResults} from '../lib/publicationGate.mjs';

test('unknown and draft statuses cannot expose a result', () => {
  for (const status of [undefined, null, '', 'verified-six-question-preview', 'preview-under-revision-not-publication-ready']) {
    assert.equal(canShowResults(status), false);
  }
  assert.equal(canShowResults('publication-approved'), true);
});
test('current dataset is explicitly held for review', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url)));
  assert.equal(canShowResults(data.status), false);
});
test('result route checks approval before computing results', () => {
  const source = fs.readFileSync(new URL('../app/result/page.tsx', import.meta.url), 'utf8');
  assert.ok(source.indexOf('if (!canShowResults(questionsData.status))') < source.indexOf('const results = calculateResults'));
  assert.ok(source.includes('El resultado aún no está disponible'));
});
