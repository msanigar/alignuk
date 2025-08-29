#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Debugging Economic Scoring (V2)...\n');

// Test Far-Left Socialist
const persona = TEST_PERSONAS[0];
console.log(`📋 Testing: ${persona.name}`);
console.log(`Expected: ${persona.expectedPosition.economic}\n`);

// Get economic questions
const economicQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'economic')
);

// Correct Likert to score mapping
const LIKERT_TO_SCORE = {
  1: -3, // Strongly Disagree
  2: -2, // Disagree
  3: -1, // Somewhat Disagree
  4: 0,  // Neither Agree nor Disagree
  5: 1,  // Somewhat Agree
  6: 2,  // Agree
  7: 3,  // Strongly Agree
};

console.log('📊 Economic Questions Analysis:');
console.log('================================');

economicQuestions.forEach((question, index) => {
  const answer = persona.answers[question.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  
  console.log(`${index + 1}. ${question.id}: ${answer} (Likert) → ${mappedScore} (mapped)`);
  console.log(`   Question: ${question.text.substring(0, 80)}...`);
  console.log(`   Weight: ${question.axisTargets[0].weight}`);
  console.log('');
});

// Calculate raw score manually
let totalScore = 0;
let totalWeight = 0;

economicQuestions.forEach(question => {
  const answer = persona.answers[question.id];
  const weight = question.axisTargets[0].weight;
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  
  totalScore += mappedScore * weight;
  totalWeight += weight;
});

console.log('📈 Manual Calculation:');
console.log(`Total Score: ${totalScore}`);
console.log(`Total Weight: ${totalWeight}`);
console.log(`Average Score: ${totalScore / totalWeight}`);
console.log(`Max Possible Score: ${totalWeight * 3}`);
console.log(`Normalized Score: ${(totalScore / (totalWeight * 3)) * 100}`);

// Check if there's a balance issue
const leftQuestions = economicQuestions.filter((q, i) => {
  const answer = persona.answers[q.id];
  return (q.id === 'econ_1' || q.id === 'econ_3' || q.id === 'econ_5' || q.id === 'econ_7' || q.id === 'econ_8' || q.id === 'econ_9') && answer >= 5;
});

const rightQuestions = economicQuestions.filter((q, i) => {
  const answer = persona.answers[q.id];
  return (q.id === 'econ_2' || q.id === 'econ_4' || q.id === 'econ_6' || q.id === 'econ_10') && answer <= 3;
});

console.log('\n🎯 Balance Analysis:');
console.log(`Left-leaning answers (agree with left questions): ${leftQuestions.length}`);
console.log(`Right-leaning answers (disagree with right questions): ${rightQuestions.length}`);
console.log(`Total: ${leftQuestions.length + rightQuestions.length}/10 questions`);
