#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';
import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

console.log('🔍 Debugging Sovereignty Scoring Algorithm...\n');

// Get sovereignty questions
const sovereigntyQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'sovereignty')
);

console.log('📊 Sovereignty Questions and Weights:');
console.log('=====================================');
sovereigntyQuestions.forEach(q => {
  const axisTarget = q.axisTargets.find(target => target.axis === 'sovereignty');
  const weight = axisTarget?.weight || 1;
  console.log(`${q.id}: weight = ${weight}`);
});

// Calculate total weight and absolute weight sum
const totalWeight = sovereigntyQuestions.reduce((sum, q) => {
  const axisTarget = q.axisTargets.find(target => target.axis === 'sovereignty');
  return sum + (axisTarget?.weight || 1);
}, 0);

const absoluteWeightSum = sovereigntyQuestions.reduce((sum, q) => {
  const axisTarget = q.axisTargets.find(target => target.axis === 'sovereignty');
  return sum + Math.abs(axisTarget?.weight || 1);
}, 0);

console.log(`\nTotal sovereignty weight: ${totalWeight}`);
console.log(`Absolute weight sum: ${absoluteWeightSum}`);
console.log(`Max possible score: ${absoluteWeightSum * 3}`);

// Test with Far-Left Socialist
const persona = TEST_PERSONAS[0]; // Far-Left Socialist
console.log(`\n🧪 Testing with ${persona.name}:`);

// Calculate raw score manually
let rawScore = 0;
const LIKERT_TO_SCORE = {
  1: -3, 2: -2, 3: -1, 4: 0, 5: 1, 6: 2, 7: 3
};

sovereigntyQuestions.forEach(q => {
  const axisTarget = q.axisTargets.find(target => target.axis === 'sovereignty');
  const weight = axisTarget?.weight || 1;
  const answer = persona.answers[q.id as keyof typeof persona.answers] || 4;
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  const contribution = mappedScore * weight;
  
  console.log(`${q.id}: answer=${answer} → mapped=${mappedScore}, weight=${weight}, contribution=${contribution}`);
  rawScore += contribution;
});

console.log(`\nRaw score: ${rawScore}`);
console.log(`Normalized score: ${(rawScore / (absoluteWeightSum * 3)) * 100}`);

// Test with actual algorithm
const mockSession = {
  id: 'test-session',
  userId: 'test-user',
  answers: Object.entries(persona.answers).map(([questionId, value]) => ({
    questionId,
    value
  })),
  createdAt: new Date()
};

const scoringResult = calculateScores(mockSession);
const sovereigntyScore = scoringResult.scores.find(s => s.axis === 'sovereignty')?.score || 0;

console.log(`\nAlgorithm result: ${sovereigntyScore}`);
console.log(`Match: ${Math.abs((rawScore / (absoluteWeightSum * 3)) * 100 - sovereigntyScore) < 1 ? '✅' : '❌'}`);
