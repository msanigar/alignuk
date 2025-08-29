#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Debugging Coverage Calculation Logic\n');
console.log('='.repeat(50));

// Get sovereignty questions
const sovereigntyQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'sovereignty')
);

// Test with the same answers as the problematic quiz
const testAnswers = [
  { questionId: 'sovereign_1', value: 2 },
  { questionId: 'sovereign_2', value: 2 },
  { questionId: 'sovereign_3', value: 6 },
  { questionId: 'sovereign_4', value: 3 },
  { questionId: 'sovereign_5', value: 7 },
  { questionId: 'sovereign_6', value: 3 },
  { questionId: 'sovereign_7', value: 2 },
  { questionId: 'sovereign_8', value: 7 },
  { questionId: 'sovereign_9', value: 2 },
  { questionId: 'sovereign_10', value: 7 },
];

let totalWeight = 0;
let answeredWeight = 0;
let absoluteWeightSum = 0;

console.log('📋 Calculating weights:');
sovereigntyQuestions.forEach((question, index) => {
  const axisTarget = question.axisTargets.find(target => target.axis === 'sovereignty');
  const weight = axisTarget?.weight || 0;
  const answer = testAnswers.find(a => a.questionId === question.id);
  
  totalWeight += weight;
  absoluteWeightSum += Math.abs(weight);

  if (answer) {
    answeredWeight += weight;
  }
});

console.log(`\n📈 Results:`);
console.log(`Total Weight: ${totalWeight}`);
console.log(`Answered Weight: ${answeredWeight}`);
console.log(`Absolute Weight Sum: ${absoluteWeightSum}`);

console.log(`\n🧮 Coverage Calculation:`);
console.log(`totalWeight === 0: ${totalWeight === 0}`);
console.log(`absoluteWeightSum === 0: ${absoluteWeightSum === 0}`);
console.log(`Math.abs(answeredWeight): ${Math.abs(answeredWeight)}`);
console.log(`Math.abs(answeredWeight) / absoluteWeightSum: ${Math.abs(answeredWeight) / absoluteWeightSum}`);
console.log(`Coverage percentage: ${Math.round((Math.abs(answeredWeight) / absoluteWeightSum) * 100)}%`);

console.log(`\n✅ Expected result: 100% coverage (all questions answered)`);
console.log(`❌ Actual result: ${Math.round((Math.abs(answeredWeight) / absoluteWeightSum) * 100)}% coverage`);

console.log(`\n🔍 The issue: answeredWeight is 0 because positive and negative weights cancel out.`);
console.log(`We need to track answered questions differently for balanced weight scenarios.`);
