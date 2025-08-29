#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

console.log('🔍 Debugging Authority Axis for New Personas...\n');

// Test the problematic personas
const problematicPersonas = TEST_PERSONAS.slice(3); // Last 3 personas

problematicPersonas.forEach(persona => {
  console.log(`📋 Testing: ${persona.name}`);
  console.log(`Expected Authority: ${persona.expectedPosition.authority}\n`);
  
  // Create mock session
  const mockSession = {
    id: 'test-session',
    userId: 'test-user',
    answers: Object.entries(persona.answers).map(([questionId, value]) => ({
      questionId,
      value
    })),
    createdAt: new Date()
  };

  try {
    // Calculate scores
    const scoringResult = calculateScores(mockSession);
    const authorityScore = scoringResult.scores.find(s => s.axis === 'authority')?.score || 0;
    
    console.log(`Authority Score: ${authorityScore.toFixed(3)}`);
    
    // Check authority answers
    const authorityAnswers = mockSession.answers.filter(a => a.questionId.startsWith('auth_'));
    console.log('Authority Answers:');
    authorityAnswers.forEach(answer => {
      console.log(`  ${answer.questionId}: ${answer.value}`);
    });
    
    // Calculate expected authority score manually
    const LIKERT_TO_SCORE = { 1: -3, 2: -2, 3: -1, 4: 0, 5: 1, 6: 2, 7: 3 };
    let manualScore = 0;
    authorityAnswers.forEach(answer => {
      const mappedScore = LIKERT_TO_SCORE[answer.value as keyof typeof LIKERT_TO_SCORE] ?? 0;
      manualScore += mappedScore;
    });
    
    console.log(`Manual Authority Score: ${manualScore}`);
    console.log(`Algorithm Authority Score: ${authorityScore}`);
    console.log(`Match: ${Math.abs(manualScore - authorityScore) < 1 ? '✅' : '❌'}`);
    console.log('---\n');
    
  } catch (error) {
    console.error(`❌ Error testing ${persona.name}:`, error);
    console.log('---\n');
  }
});
