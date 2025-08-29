#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Analyzing Sovereignty Axis Balance...\n');

// Get sovereignty questions
const sovereigntyQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'sovereignty')
);

console.log('📊 Sovereignty Questions Analysis:');
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

console.log(`Total sovereignty questions: ${sovereigntyQuestions.length}\n`);

// Analyze each question
sovereigntyQuestions.forEach((question, index) => {
  const axisTarget = question.axisTargets.find(target => target.axis === 'sovereignty');
  const weight = axisTarget?.weight || 1;
  
  console.log(`${index + 1}. ${question.id}:`);
  console.log(`   Question: ${question.text}`);
  console.log(`   Weight: ${weight}`);
  console.log(`   Expected direction: ${weight > 0 ? 'NATIONALIST (positive)' : 'GLOBALIST (negative)'}`);
  console.log('');
});

// Test with our personas to see sovereignty scoring
console.log('🧪 Testing Sovereignty Scoring with Personas:');
console.log('=============================================');

// Import test personas
import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

TEST_PERSONAS.forEach(persona => {
  console.log(`\n📋 ${persona.name}:`);
  console.log(`Expected sovereignty position: ${(persona.expectedPosition as any).sovereignty || 'unknown'}`);
  
  // Get sovereignty answers for this persona
  const sovereigntyAnswers = sovereigntyQuestions.map(q => ({
    questionId: q.id,
    value: persona.answers[q.id as keyof typeof persona.answers] || 4
  }));
  
  console.log('Sovereignty answers:');
  sovereigntyAnswers.forEach(answer => {
    const question = sovereigntyQuestions.find(q => q.id === answer.questionId);
    const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    console.log(`  ${answer.questionId}: ${answer.value} (Likert) → ${mappedScore} (mapped)`);
  });
  
  // Calculate sovereignty score manually with proper weight handling
  let totalScore = 0;
  let totalWeight = 0;
  
  sovereigntyAnswers.forEach(answer => {
    const question = sovereigntyQuestions.find(q => q.id === answer.questionId);
    const axisTarget = question?.axisTargets.find(target => target.axis === 'sovereignty');
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
  const sovereigntyScore = scoringResult.scores.find(s => s.axis === 'sovereignty')?.score || 0;
  
  console.log(`Algorithm result: ${sovereigntyScore.toFixed(1)}`);
  console.log(`Match: ${Math.abs(normalizedScore - sovereigntyScore) < 1 ? '✅' : '❌'}`);
});

console.log('\n🎯 Sovereignty Axis Classification:');
console.log('===================================');
console.log('Based on our test personas:');
console.log('- Far-Left Socialist: Expected "globalist" → Should score negative');
console.log('- Center-Left Social Democrat: Expected "center" → Should score near zero');
console.log('- Political Centrist: Expected "center" → Should score near zero');
console.log('- Far-Right Libertarian: Expected "nationalist" → Should score positive');
console.log('- Authoritarian Conservative: Expected "nationalist" → Should score positive');
console.log('- Left-Libertarian: Expected "globalist" → Should score negative');
