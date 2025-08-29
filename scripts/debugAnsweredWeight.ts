#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Debugging Answered Weight Calculation\n');
console.log('='.repeat(50));

// Get sovereignty questions
const sovereigntyQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'sovereignty')
);

console.log(`📊 Sovereignty Questions (${sovereigntyQuestions.length}):`);

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

console.log('\n📋 Weight Calculation:');
console.log('='.repeat(30));

sovereigntyQuestions.forEach((question, index) => {
  const axisTarget = question.axisTargets.find(target => target.axis === 'sovereignty');
  const weight = axisTarget?.weight || 0;
  const answer = testAnswers.find(a => a.questionId === question.id);
  
  totalWeight += weight;
  absoluteWeightSum += Math.abs(weight);

  if (answer) {
    answeredWeight += weight;
    console.log(`${index + 1}. ${question.id}: weight=${weight}, answer=${answer.value}/7 → answeredWeight += ${weight}`);
  } else {
    console.log(`${index + 1}. ${question.id}: weight=${weight}, NO ANSWER`);
  }
});

console.log('\n📈 Results:');
console.log(`Total Weight: ${totalWeight}`);
console.log(`Answered Weight: ${answeredWeight}`);
console.log(`Absolute Weight Sum: ${absoluteWeightSum}`);

console.log('\n🔍 Analysis:');
console.log('The issue is that when weights are balanced (+1 and -1),');
console.log('the answeredWeight becomes 0 because we add both positive and negative weights.');
console.log('This causes the coverage calculation to fail.');

console.log('\n💡 Solution:');
console.log('We should use the absolute weight sum for coverage calculation');
console.log('when the total weight is 0 (balanced positive/negative weights).');
