#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';
import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Debugging Scoring Algorithm...\n');

// Test Far-Left Socialist
const persona = TEST_PERSONAS[0];
console.log(`📋 Testing: ${persona.name}`);
console.log(`Expected: ${persona.expectedPosition.economic}\n`);

// Create mock session
const mockSession = {
  id: 'test-session',
  userId: 'test-user',
  answers: Object.entries(persona.answers).map(([questionId, value]) => ({
    questionId,
    value
  }))
};

// Get economic questions
const economicQuestions = QUESTIONS_FULL.filter(q => 
  q.axisTargets.some(target => target.axis === 'economic')
);

console.log('📊 Economic Questions Processing:');
console.log('================================');

let totalScore = 0;
let totalWeight = 0;
let answeredWeight = 0;

economicQuestions.forEach((question, index) => {
  const answer = mockSession.answers.find(a => a.questionId === question.id);
  const axisTarget = question.axisTargets.find(target => target.axis === 'economic');
  
  if (!axisTarget) {
    console.log(`${index + 1}. ${question.id}: No axis target found`);
    return;
  }

  const weight = axisTarget.weight;
  const importanceMultiplier = 1.0; // No importance weights
  const adjustedWeight = weight * importanceMultiplier;
  
  totalWeight += adjustedWeight;

  if (answer !== undefined) {
    // Use the same mapping as the scoring algorithm
    const LIKERT_TO_SCORE = {
      1: -3, 2: -2, 3: -1, 4: 0, 5: 1, 6: 2, 7: 3
    };
    const questionScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
    const contribution = questionScore * adjustedWeight;
    
    totalScore += contribution;
    answeredWeight += adjustedWeight;
    
    console.log(`${index + 1}. ${question.id}: ${answer.value} (Likert) → ${questionScore} (mapped) × ${adjustedWeight} (weight) = ${contribution}`);
  } else {
    console.log(`${index + 1}. ${question.id}: No answer found`);
  }
});

console.log('\n📈 Manual Calculation Results:');
console.log(`Total Score: ${totalScore}`);
console.log(`Total Weight: ${totalWeight}`);
console.log(`Answered Weight: ${answeredWeight}`);
console.log(`Max Possible Score: ${totalWeight * 3}`);
console.log(`Normalized Score: ${(totalScore / (totalWeight * 3)) * 100}`);

// Now run the actual scoring algorithm
console.log('\n🔧 Actual Scoring Algorithm Results:');
const scoringResult = calculateScores(mockSession);
const economicScore = scoringResult.scores.find(s => s.axis === 'economic');
console.log(`Economic Score: ${economicScore?.score}`);

// Compare
console.log('\n🔍 Comparison:');
console.log(`Manual calculation: ${(totalScore / (totalWeight * 3)) * 100}`);
console.log(`Algorithm result: ${economicScore?.score}`);
console.log(`Match: ${Math.abs((totalScore / (totalWeight * 3)) * 100 - (economicScore?.score || 0)) < 1 ? '✅' : '❌'}`);

if (Math.abs((totalScore / (totalWeight * 3)) * 100 - (economicScore?.score || 0)) > 1) {
  console.log('\n❌ DISCREPANCY FOUND!');
  console.log('The manual calculation and algorithm result do not match.');
  console.log('This suggests there might be an issue with the scoring algorithm.');
}
