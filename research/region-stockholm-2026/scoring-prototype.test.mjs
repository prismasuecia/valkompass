// Research-only specification. Not imported by either application.
import test from 'node:test';
import assert from 'node:assert/strict';

const directions = {active_support: 1, support: 1, alternative: -1, oppose: -1, no_opinion: null};
function similarity(kind, answer, position) {
  const p = kind === 'categorical' ? directions[position] : position;
  if (kind !== 'categorical' && kind !== 'ordered') throw new Error('Unknown kind');
  if (p === undefined) throw new Error('Unknown category');
  const radius = kind === 'categorical' ? 1 : 2;
  if (answer !== null && (!Number.isInteger(answer) || Math.abs(answer) > radius)) throw new Error('Invalid answer');
  if (p !== null && (!Number.isInteger(p) || Math.abs(p) > radius)) throw new Error('Invalid position');
  if (answer === null || p === null) return null;
  return 1 - Math.abs(answer - p) / (2 * radius);
}
function aggregate(rows) {
  let earned = 0, possible = 0, count = 0;
  for (const row of rows) {
    const score = similarity(row.kind, row.answer, row.position);
    if (score === null) continue;
    const weight = row.important ? 2 : 1;
    earned += score * weight;
    possible += weight;
    count++;
  }
  return {score: possible ? 100 * earned / possible : null, count};
}
test('priority never changes agreement, for every categorical answer', () => {
  for (const answer of [-1, 0, 1, null]) {
    assert.equal(similarity('categorical', answer, 'active_support'), similarity('categorical', answer, 'support'));
  }
});
test('all valid comparisons are bounded and sign-symmetric', () => {
  for (const kind of ['ordered', 'categorical']) {
    const radius = kind === 'ordered' ? 2 : 1;
    for (let a = -radius; a <= radius; a++) for (let p = -radius; p <= radius; p++) {
      if (kind === 'categorical' && p === 0) continue;
      const category = p > 0 ? 'support' : 'oppose';
      const opposite = p > 0 ? 'oppose' : 'support';
      const score = similarity(kind, a, kind === 'ordered' ? p : category);
      assert.ok(score >= 0 && score <= 1);
      assert.equal(score, similarity(kind, -a, kind === 'ordered' ? -p : opposite));
      if (a === p) assert.equal(score, 1);
    }
  }
});
test('no opinion and information skip never become neutral', () => {
  assert.equal(similarity('categorical', 1, 'no_opinion'), null);
  assert.equal(similarity('categorical', null, 'support'), null);
  assert.equal(similarity('categorical', 0, 'support'), .5);
  assert.deepEqual(aggregate([{kind: 'categorical', answer: 1, position: 'no_opinion'}]), {score: null, count: 0});
});
test('ordered and categorical items have equal weight; importance doubles both terms', () => {
  const rows = [{kind: 'ordered', answer: 2, position: 2}, {kind: 'categorical', answer: 1, position: 'oppose'}];
  assert.equal(aggregate(rows).score, 50);
  assert.equal(aggregate([{...rows[0], important: true}, rows[1]]).score, 200 / 3);
});
test('coverage differences remain visible rather than counted as disagreement', () => {
  const match = {kind: 'categorical', answer: 1, position: 'support'};
  assert.deepEqual(aggregate([match, {...match, position: 'no_opinion'}]), {score: 100, count: 1});
  assert.deepEqual(aggregate([match, {...match, position: 'oppose'}]), {score: 50, count: 2});
});
test('determinism, row order and priority invariance over all 81 four-answer profiles', () => {
  for (const a of [-1, 0, 1]) for (const b of [-1, 0, 1]) for (const c of [-1, 0, 1]) for (const d of [-1, 0, 1]) {
    const rows = [a,b,c,d].map((answer, i) => ({kind:'categorical', answer, position: i % 2 ? 'alternative' : 'support', important: i === 0}));
    assert.deepEqual(aggregate(rows), aggregate([...rows].reverse()));
    assert.deepEqual(aggregate(rows), aggregate(rows.map(r => ({...r, position: r.position === 'support' ? 'active_support' : r.position}))));
  }
});
test('invalid values fail instead of silently inventing positions', () => {
  assert.throws(() => similarity('categorical', 1, 'unknown'));
  assert.throws(() => similarity('categorical', 2, 'support'));
  assert.throws(() => similarity('ordered', 1, 3));
});
