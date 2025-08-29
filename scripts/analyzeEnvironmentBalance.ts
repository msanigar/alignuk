#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Analyzing Environment Axis Balance...\n');

// Get environment questions
const environmentQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'environment')
);

console.log('📊 Environment Questions Analysis:');
console.log('==================================');

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

console.log(`Total environment questions: ${environmentQuestions.length}\n`);

// Analyze each question
environmentQuestions.forEach((question, index) => {
  const axisTarget = question.axisTargets.find(target => target.axis === 'environment');
  const weight = axisTarget?.weight || 1;
  
  console.log(`${index + 1}. ${question.id}:`);
  console.log(`   Question: ${question.text}`);
  console.log(`   Weight: ${weight}`);
  console.log(`   Expected direction: ${weight > 0 ? 'SUSTAINABILITY (positive)' : 'GROWTH (negative)'}`);
  console.log('');
});

// Test with our personas to see environment scoring
console.log('🧪 Testing Environment Scoring with Personas:');
console.log('=============================================');

// Import test personas
import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

TEST_PERSONAS.forEach(persona => {
  console.log(`\n📋 ${persona.name}:`);
  console.log(`Expected environment position: ${(persona.expectedPosition as any).environment || 'unknown'}`);
  
  // Get environment answers for this persona
  const environmentAnswers = environmentQuestions.map(q => ({
    questionId: q.id,
    value: persona.answers[q.id as keyof typeof persona.answers] || 4
  }));
  
  console.log('Environment answers:');
  environmentAnswers.forEach(answer => {
    const question = environmentQuestions.find(q => q.id === answer.questionId);
    const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    console.log(`  ${answer.questionId}: ${answer.value} (Likert) → ${mappedScore} (mapped)`);
  });
  
  // Calculate environment score manually with proper weight handling
  let totalScore = 0;
  let totalWeight = 0;
  
  environmentAnswers.forEach(answer => {
    const question = environmentQuestions.find(q => q.id === answer.questionId);
    const axisTarget = question?.axisTargets.find(target => target.axis === 'environment');
    const weight = axisTarget?.weight || 1;
    const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    
    totalScore += mappedScore * weight;
    totalWeight += Math.abs(weight); // Use absolute weight for normalization
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
    createdAt: new Date()
  };
  
  const scoringResult = calculateScores(mockSession);
  const environmentScore = scoringResult.scores.find(s => s.axis === 'environment')?.score || 0;
  
  console.log(`Algorithm result: ${environmentScore.toFixed(1)}`);
  console.log(`Match: ${Math.abs(normalizedScore - environmentScore) < 1 ? '✅' : '❌'}`);
});

console.log('\n🎯 Environment Axis Classification:');
console.log('===================================');
console.log('Based on our test personas:');
console.log('- Far-Left Socialist: Expected "sustainability" → Should score positive');
console.log('- Center-Left Social Democrat: Expected "sustainability" → Should score positive');
console.log('- Political Centrist: Expected "center" → Should score near zero');
console.log('- Far-Right Libertarian: Expected "growth" → Should score negative');
console.log('- Authoritarian Conservative: Expected "growth" → Should score negative');
console.log('- Left-Libertarian: Expected "sustainability" → Should score positive');
