import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {calculateResultsCore} from '../lib/calculateResultsCore.mjs';
const fixture = () => ({
  parties: [{id:'A'}, {id:'B'}], importantQuestions: [],
  questions: Array.from({length:6}, (_,i) => ({id:`Q${i}`, category:'regionalTax', statement:{sv:`Q${i}`,es:`Q${i}`}, scoringApproved:true})),
  answers: Array.from({length:6}, (_,i) => ({questionId:`Q${i}`,value:2})),
  positions: Array.from({length:6}, (_,i) => ['A','B'].map(partyId=>({partyId,questionId:`Q${i}`,value:2}))).flat()
});
test('same questions and denominator for every party', () => {
  const input = fixture();
  input.questions.push({...input.questions[0],id:'extra'});
  input.answers.push({questionId:'extra',value:-2});
  input.positions.push({partyId:'B',questionId:'extra',value:2});
  const result = calculateResultsCore(input);
  assert.deepEqual(result.map(r=>r.score),[100,100]);
  assert.deepEqual(result.map(r=>r.matchedQuestions),[6,6]);
  assert.deepEqual(result[0].comparisons.map(r=>r.questionId),result[1].comparisons.map(r=>r.questionId));
});
test('missing or null position fails minimum even when important', () => {
  const input = fixture(); input.positions[0].value=null;
  input.importantQuestions=input.questions.map(q=>q.id);
  assert.deepEqual(calculateResultsCore(input),[]);
  input.positions.shift(); assert.deepEqual(calculateResultsCore(input),[]);
});
test('editorial approval is required', () => {
  for (const approval of [undefined,false,'true']) {
    const input=fixture(); input.questions[0].scoringApproved=approval;
    assert.deepEqual(calculateResultsCore(input),[]);
  }
});
test('skip is not neutral; zero is a real answer', () => {
  const input=fixture(); input.answers[0].value='skip';
  assert.deepEqual(calculateResultsCore(input),[]);
  input.answers[0].value=0; assert.equal(calculateResultsCore(input)[0].score,92);
});
test('importance doubles numerator and denominator only once', () => {
  const input=fixture(); input.answers[0].value=-2;
  assert.equal(calculateResultsCore(input)[0].score,83);
  input.importantQuestions=['Q0','Q0']; assert.equal(calculateResultsCore(input)[0].score,71);
});
test('categorical questions have equal weight and normalized distance', () => {
  const input=fixture(); input.questions[0].answerScale='categorical'; input.answers[0].value=-1;
  input.positions.filter(p=>p.questionId==='Q0').forEach(p=>{p.value=1;});
  const result=calculateResultsCore(input)[0];
  assert.equal(result.score,83); assert.equal(result.strongestDisagreements[0].distance,1);
});

test('editorial weight restrictions also apply to saved importance selections', () => {
  for (const restriction of [{comparisonNote:'Shared topic'}, {importanceAllowed:false}]) {
    const input=fixture(); Object.assign(input.questions[0],restriction);
    input.answers[0].value=-2;
    const baseline=calculateResultsCore(input);
    input.importantQuestions=['Q0'];
    assert.deepEqual(calculateResultsCore(input),baseline);
  }
});

test('current content has a dynamic question count and correct overlap references', () => {
  const data=JSON.parse(fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8'));
  const home=fs.readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
  assert.ok(home.includes('{questions.length}'));
  assert.ok(!home.includes('quizInfo.questionsValue'));
  const start=fs.readFileSync(new URL('../components/StartQuizLink.tsx',import.meta.url),'utf8');
  assert.ok(start.includes('question_count: questions.length'));
  assert.ok(!start.includes('question_count: 5'));
  for(const id of ['RS26-N01','RS26-N03']) assert.ok(data.questions.find(q=>q.id===id).comparisonNote);
  assert.doesNotMatch(JSON.stringify(data.questions.find(q=>q.id==='RS26-N01')),/ätstörningsfrågan|trastornos alimentarios/);
});
test('reordered identical inputs preserve results and ties without mutation', () => {
  const input=fixture(); const before=JSON.stringify(input); const result=calculateResultsCore(input);
  assert.equal(JSON.stringify(input),before);
  const reversed=Object.fromEntries(Object.entries(input).map(([k,v])=>[k,[...v].reverse()]));
  assert.deepEqual(calculateResultsCore(reversed),result);
  assert.deepEqual(result.map(r=>[r.rank,r.tied]),[[1,true],[1,true]]);
});
test('invalid and duplicate inputs fail closed', () => {
  const input=fixture(); input.answers[0].value=NaN; assert.throws(()=>calculateResultsCore(input));
  input.answers[0].value=3; assert.throws(()=>calculateResultsCore(input));
  input.answers[0].value=2; input.answers.push(input.answers[0]); assert.throws(()=>calculateResultsCore(input));
  const duplicate=fixture(); duplicate.positions.push(duplicate.positions[0]); assert.throws(()=>calculateResultsCore(duplicate));
  assert.throws(()=>calculateResultsCore({...fixture(),minimumCommonAnswers:0}));
});
test('tax uses documented levels, not an ideological expected winner', () => {
  const data=JSON.parse(fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8'));
  const tax=data.questions.find(q=>q.id==='RS26-Q01');
  assert.equal(tax.answerScale,'tax-level');
  assert.deepEqual(tax.positions,{S:0,M:2,SD:2,V:-1,C:1,KD:1,L:1,MP:0});
});
test('empty or single-party input never produces a ranking', () => {
  assert.deepEqual(calculateResultsCore({answers:[],importantQuestions:[],parties:[],positions:[],questions:[]}),[]);
  const input=fixture(); input.parties.pop(); input.positions=input.positions.filter(p=>p.partyId==='A');
  assert.deepEqual(calculateResultsCore(input),[]);
});

test('actual ten-question draft uses ten shared questions for all eight parties', () => {
  const data=JSON.parse(fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8'));
  const questions=data.questions;
  const parties=Object.keys(questions[0].positions).map(id=>({id}));
  const positions=questions.flatMap(q=>Object.entries(q.positions).map(([partyId,value])=>({partyId,questionId:q.id,value})));
  const answers=questions.map(q=>({questionId:q.id,value:0}));
  const result=calculateResultsCore({questions,parties,positions,answers,importantQuestions:[]});
  assert.equal(questions.length,10);
  assert.equal(result.length,8);
  for (const party of result) {
    assert.equal(party.matchedQuestions,10);
    for (const id of ['RS26-Q03b','RS26-K01','RS26-K02']) assert.ok(!party.comparisons.some(q=>q.questionId===id));
  }
  assert.ok(!questions.some(q=>['RS26-Q02','RS26-Q03','RS26-Q04'].includes(q.id)));
});

test('replacement questions preserve source directions, including qualified support', () => {
  const {questions}=JSON.parse(fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8'));
  const expected={
    'RS26-N03':{S:1,M:2,SD:1,V:-2,C:2,KD:2,L:2,MP:1},
    'RS26-N04':{S:1,M:1,SD:-1,V:1,C:1,KD:1,L:-1,MP:1},
    'RS26-N05':{S:2,M:2,SD:1,V:2,C:2,KD:2,L:2,MP:2}
  };
  for(const [id,positions] of Object.entries(expected)) {
    const question=questions.find(q=>q.id===id);
    assert.equal(question.scoringApproved,true);
    assert.deepEqual(question.positions,positions);
  }
  assert.equal(questions.find(q=>q.id==='RS26-N04').answerScale,'categorical');
});

test('consensus question cannot create more than a quarter-question score difference', () => {
  for(const answer of [-2,-1,0,1,2]) {
    const input=fixture();
    input.answers[0].value=answer;
    input.positions.find(p=>p.partyId==='B'&&p.questionId==='Q0').value=1;
    const result=calculateResultsCore(input);
    // One-point source difference / four-point range / six fixture questions.
    // Allow one percentage point for independently rounded display scores.
    assert.ok(Math.abs(result[0].score-result[1].score)<=100*0.25/6+1);
  }
});
