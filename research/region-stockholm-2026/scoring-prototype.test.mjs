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

// Proposed editorial gate; six is a conservative policy choice, not a validated
// statistical threshold. Apply to all displayed parties, not a preferred subset.
function commonBasis(questions, partyIds, minimum = 6) {
  if (partyIds.length < 2 || new Set(partyIds).size !== partyIds.length) throw new Error('Invalid parties');
  if (!Number.isInteger(minimum) || minimum < 1) throw new Error('Invalid minimum');
  if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error('Duplicate question');
  const scored = questions.map(q => {
    const scores = Object.fromEntries(partyIds.map(id => {
      const raw = Object.hasOwn(q.positions, id) ? q.positions[id] : null;
      return [id, raw === null ? null : similarity(q.kind, q.answer, raw)];
    }));
    return {...q, scores};
  });
  const common = scored.filter(q => q.answer !== null && partyIds.every(id => q.scores[id] !== null));
  const ready = common.length >= minimum;
  const totalWeight = common.reduce((n,q) => n + (q.important ? 2 : 1), 0);
  return {
    status: ready ? 'comparable' : 'insufficient_common_basis',
    questionIds: common.map(q => q.id).sort(),
    parties: partyIds.map(id => ({
      partyId: id,
      commonCount: common.length,
      documentedAnsweredCount: scored.filter(q => q.scores[id] !== null).length,
      score: ready ? 100 * common.reduce((n,q) => n + q.scores[id] * (q.important ? 2 : 1), 0) / totalWeight : null
    })).sort((a,b) => a.partyId.localeCompare(b.partyId))
  };
}
const complete = () => Array.from({length: 6}, (_,i) => ({
  id: `T${i}`, kind: 'categorical', answer: 1, important: false,
  positions: {A: 'support', B: 'support', C: 'alternative'}
}));
test('no ranking score below six common answers; importance cannot bypass gate', () => {
  const rows = complete();
  rows[0].positions.B = 'no_opinion';
  rows.forEach(q => { q.important = true; });
  const result = commonBasis(rows, ['A','B','C']);
  assert.equal(result.status, 'insufficient_common_basis');
  assert.equal(result.questionIds.length, 5);
  assert.ok(result.parties.every(p => p.score === null));
  assert.equal(result.parties.find(p => p.partyId === 'A').documentedAnsweredCount, 6);
});
test('missing position excludes the same question for every party', () => {
  const rows = complete();
  rows.push({id:'extra', kind:'categorical', answer:1, important:true, positions:{A:'oppose', C:'support'}});
  assert.deepEqual(commonBasis(rows, ['A','B','C']).questionIds, complete().map(q=>q.id));
  assert.deepEqual(commonBasis(rows, ['A','B','C']).parties.map(p=>p.score), [100,100,0]);
});
test('skip, neutral and unanswered positions remain distinct on common basis', () => {
  const rows = complete();
  rows[0].answer = null;
  assert.equal(commonBasis(rows, ['A','B']).status, 'insufficient_common_basis');
  rows[0].answer = 0;
  const result = commonBasis(rows, ['A','B']);
  assert.equal(result.status, 'comparable');
  assert.ok(result.parties.every(p => p.score === 100 * 5.5 / 6));
});
test('party order cannot change shared basis or break ties', () => {
  const a = commonBasis(complete(), ['A','B','C']);
  const b = commonBasis(complete(), ['C','B','A']);
  assert.deepEqual(a,b);
  assert.equal(a.parties[0].score, a.parties[1].score);
});
test('duplicate data and unknown categories fail closed', () => {
  assert.throws(() => commonBasis(complete(), ['A','A']));
  const rows = complete();
  rows[0].positions.A = 'unverified';
  assert.throws(() => commonBasis(rows, ['A','B']));
  assert.throws(() => commonBasis([...complete(), complete()[0]], ['A','B']));
});
