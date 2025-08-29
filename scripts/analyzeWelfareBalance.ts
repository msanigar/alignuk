#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Analyzing Welfare Axis Balance...\n');

// Get welfare questions
const welfareQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'welfare')
);

console.log('📊 Welfare Questions Analysis:');
console.log('==============================');

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

console.log(`Total welfare questions: ${welfareQuestions.length}\n`);

// Analyze each question
welfareQuestions.forEach((question, index) => {
  const axisTarget = question.axisTargets.find(target => target.axis === 'welfare');
  const weight = axisTarget?.weight || 1;
  
  console.log(`${index + 1}. ${question.id}:`);
  console.log(`   Question: ${question.text}`);
  console.log(`   Weight: ${weight}`);
  console.log(`   Expected direction: ${weight > 0 ? 'WELFARE (positive)' : 'MARKET (negative)'}`);
  console.log('');
});

// Test with our personas to see welfare scoring
console.log('🧪 Testing Welfare Scoring with Personas:');
console.log('==========================================');

// Import test personas
import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

TEST_PERSONAS.forEach(persona => {
  console.log(`\n📋 ${persona.name}:`);
  console.log(`Expected welfare position: ${persona.expectedPosition.welfare}`);
  
  // Get welfare answers for this persona
  const welfareAnswers = welfareQuestions.map(q => ({
    questionId: q.id,
    value: persona.answers[q.id as keyof typeof persona.answers] || 4
  }));
  
  console.log('Welfare answers:');
  welfareAnswers.forEach(answer => {
    const question = welfareQuestions.find(q => q.id === answer.questionId);
    const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    console.log(`  ${answer.questionId}: ${answer.value} (Likert) → ${mappedScore} (mapped)`);
  });
  
  // Calculate welfare score manually
  let totalScore = 0;
  let totalWeight = 0;
  
  welfareAnswers.forEach(answer => {
    const question = welfareQuestions.find(q => q.id === answer.questionId);
    const axisTarget = question?.axisTargets.find(target => target.axis === 'welfare');
    const weight = axisTarget?.weight || 1;
    const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    
    totalScore += mappedScore * weight;
    totalWeight += weight;
  });
  
  const normalizedScore = totalWeight > 0 ? (totalScore / (totalWeight * 3)) * 100 : 0;
  
  console.log(`Manual calculation: ${totalScore} / (${totalWeight} * 3) = ${normalizedScore.toFixed(1)}`);
  
  // Test with actual algorithm
  const mockSession = {
    id: 'test-session',
    userId: 'test-user',
    answers: Object.entries(persona.answers).map(([questionId, value]) => ({
      questionId,
      value
    })),
    createdAt: new Date().toISOString()
  };
  
  const scoringResult = calculateScores(mockSession);
  const welfareScore = scoringResult.scores.find(s => s.axis === 'welfare')?.score || 0;
  
  console.log(`Algorithm result: ${welfareScore.toFixed(1)}`);
  console.log(`Match: ${Math.abs(normalizedScore - welfareScore) < 1 ? '✅' : '❌'}`);
});

console.log('\n🎯 Welfare Axis Classification:');
console.log('===============================');
console.log('Based on our test personas:');
console.log('- Far-Left Socialist: Expected "welfare" → Should score positive');
console.log('- Center-Left Social Democrat: Expected "welfare" → Should score positive');
console.log('- Political Centrist: Expected "center" → Should score near zero');
console.log('- Far-Right Libertarian: Expected "market" → Should score negative');
console.log('- Authoritarian Conservative: Expected "center-market" → Should score slightly negative');
console.log('- Left-Libertarian: Expected "welfare" → Should score positive');
