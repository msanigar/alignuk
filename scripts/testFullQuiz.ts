#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';
import { QUESTIONS_FULL } from '../lib/questions';

console.log('🧪 Testing Full 60-Question Quiz...\n');

// Test each persona
TEST_PERSONAS.forEach(persona => {
  console.log(`📋 Testing: ${persona.name}`);
  console.log(`Expected: ${persona.expectedPosition.economic}/${persona.expectedPosition.authority}`);
  
  // Create mock session
  const mockSession = {
    id: 'test-session',
    userId: 'test-user',
    answers: Object.entries(persona.answers).map(([questionId, value]) => ({
      questionId,
      value
    }))
  };

  try {
    // Calculate scores
    const scoringResult = calculateScores(mockSession);
    
    // Display results
    console.log(`Economic: ${scoringResult.scores.find(s => s.axis === 'economic')?.score.toFixed(3)}`);
    console.log(`Authority: ${scoringResult.scores.find(s => s.axis === 'authority')?.score.toFixed(3)}`);
    console.log(`Social: ${scoringResult.scores.find(s => s.axis === 'social')?.score.toFixed(3)}`);
    console.log(`Sovereignty: ${scoringResult.scores.find(s => s.axis === 'sovereignty')?.score.toFixed(3)}`);
    console.log(`Environment: ${scoringResult.scores.find(s => s.axis === 'environment')?.score.toFixed(3)}`);
    console.log(`Welfare: ${scoringResult.scores.find(s => s.axis === 'welfare')?.score.toFixed(3)}`);
    
    // Check coverage
    const coverage = scoringResult.scores.map(score => score.confidence);
    console.log(`Coverage: ${coverage.map(c => c.toFixed(0)).join('%/')}%`);
    
    console.log('---\n');
  } catch (error) {
    console.error(`❌ Error testing ${persona.name}:`, error);
    console.log('---\n');
  }
});

console.log('✅ Full quiz testing completed!');
