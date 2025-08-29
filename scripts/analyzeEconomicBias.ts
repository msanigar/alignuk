#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Analyzing Economic Axis Bias...\n');

// Test Far-Left Socialist (the one with the most obvious bias)
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

let totalScore = 0;
let leftScore = 0;
let rightScore = 0;

economicQuestions.forEach((question, index) => {
  const answer = persona.answers[question.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  
  // Determine if this is a left or right question based on expected answer
  const isLeftQuestion = ['econ_1', 'econ_3', 'econ_5', 'econ_7', 'econ_8', 'econ_9'].includes(question.id);
  const isRightQuestion = ['econ_2', 'econ_4', 'econ_6', 'econ_10'].includes(question.id);
  
  if (isLeftQuestion) {
    leftScore += mappedScore;
  } else if (isRightQuestion) {
    rightScore += mappedScore;
  }
  
  totalScore += mappedScore;
  
  console.log(`${index + 1}. ${question.id}: ${answer} (Likert) → ${mappedScore} (mapped)`);
  console.log(`   Question: ${question.text.substring(0, 80)}...`);
  console.log(`   Type: ${isLeftQuestion ? 'LEFT' : isRightQuestion ? 'RIGHT' : 'UNKNOWN'}`);
  console.log(`   Expected: ${isLeftQuestion ? 'Agree (positive)' : isRightQuestion ? 'Disagree (negative)' : 'Unknown'}`);
  console.log(`   Actual: ${mappedScore > 0 ? 'Positive' : mappedScore < 0 ? 'Negative' : 'Neutral'}`);
  console.log('');
});

console.log('📈 Score Breakdown:');
console.log(`Left questions total: ${leftScore}`);
console.log(`Right questions total: ${rightScore}`);
console.log(`Total score: ${totalScore}`);
console.log(`Expected: Negative (left-leaning person)`);
console.log(`Actual: ${totalScore > 0 ? 'Positive' : totalScore < 0 ? 'Negative' : 'Zero'}`);

// Analyze each question's contribution
console.log('\n🎯 Question-by-Question Analysis:');
console.log('================================');

const leftQuestions = economicQuestions.filter(q => ['econ_1', 'econ_3', 'econ_5', 'econ_7', 'econ_8', 'econ_9'].includes(q.id));
const rightQuestions = economicQuestions.filter(q => ['econ_2', 'econ_4', 'econ_6', 'econ_10'].includes(q.id));

console.log('\nLEFT QUESTIONS (should contribute positively for left-leaning person):');
leftQuestions.forEach(q => {
  const answer = persona.answers[q.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  console.log(`  ${q.id}: ${answer} → ${mappedScore} ${mappedScore > 0 ? '✅' : mappedScore < 0 ? '❌' : '⚠️'}`);
});

console.log('\nRIGHT QUESTIONS (should contribute negatively for left-leaning person):');
rightQuestions.forEach(q => {
  const answer = persona.answers[q.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  console.log(`  ${q.id}: ${answer} → ${mappedScore} ${mappedScore < 0 ? '✅' : mappedScore > 0 ? '❌' : '⚠️'}`);
});

console.log('\n🔍 Potential Issues:');
console.log('===================');

// Check if any left questions are contributing negatively
const negativeLeftQuestions = leftQuestions.filter(q => {
  const answer = persona.answers[q.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  return mappedScore < 0;
});

// Check if any right questions are contributing positively
const positiveRightQuestions = rightQuestions.filter(q => {
  const answer = persona.answers[q.id];
  const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
  return mappedScore > 0;
});

if (negativeLeftQuestions.length > 0) {
  console.log(`❌ ${negativeLeftQuestions.length} left questions contributing negatively:`);
  negativeLeftQuestions.forEach(q => {
    const answer = persona.answers[q.id];
    const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
    console.log(`  - ${q.id}: ${answer} → ${mappedScore}`);
  });
}

if (positiveRightQuestions.length > 0) {
  console.log(`❌ ${positiveRightQuestions.length} right questions contributing positively:`);
  positiveRightQuestions.forEach(q => {
    const answer = persona.answers[q.id];
    const mappedScore = LIKERT_TO_SCORE[answer as keyof typeof LIKERT_TO_SCORE] ?? 0;
    console.log(`  - ${q.id}: ${answer} → ${mappedScore}`);
  });
}

if (negativeLeftQuestions.length === 0 && positiveRightQuestions.length === 0) {
  console.log('✅ All questions contributing in expected directions');
  console.log('🔍 The issue might be in the scoring algorithm or normalization');
}
