#!/usr/bin/env tsx

import { TEST_PERSONAS } from '../lib/testPersonas';
import { calculateScores } from '../lib/scoring';

console.log('🎯 Calculating Current Quiz Accuracy...\n');

// Function to convert score to position
function scoreToPosition(score: number, axis: string): string {
  if (score <= -15) {
    if (axis === 'economic') return 'right'; // INVERTED: negative = right
    if (axis === 'authority') return 'libertarian';
    if (axis === 'social') return 'progressive';
    if (axis === 'environment') return 'green';
    if (axis === 'welfare') return 'welfare';
  } else if (score <= -5) {
    if (axis === 'economic') return 'center-right'; // INVERTED: negative = center-right
    if (axis === 'authority') return 'libertarian'; // -5 to -15 = libertarian
    if (axis === 'social') return 'progressive'; // -5 to -15 = progressive
    if (axis === 'environment') return 'center-green';
    if (axis === 'welfare') return 'center-welfare';
  } else if (score <= 5) {
    return 'center';
  } else if (score <= 15) {
    if (axis === 'economic') return 'center-left'; // INVERTED: positive = center-left
    if (axis === 'authority') return 'center-authoritarian';
    if (axis === 'social') return 'center-conservative';
    if (axis === 'environment') return 'center-growth';
    if (axis === 'welfare') return 'center-market';
  } else {
    if (axis === 'economic') return 'left'; // INVERTED: positive = left
    if (axis === 'authority') return 'authoritarian';
    if (axis === 'social') return 'conservative';
    if (axis === 'environment') return 'growth';
    if (axis === 'welfare') return 'market';
  }
  return 'center';
}

// Test each persona
let totalTests = 0;
let totalMatches = 0;
const results: any[] = [];

TEST_PERSONAS.forEach(persona => {
  console.log(`📋 Testing: ${persona.name}`);
  console.log(`Expected: ${persona.expectedPosition.economic}/${persona.expectedPosition.authority}/${persona.expectedPosition.social}`);
  
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
    
    // Get actual positions
    const actualEconomic = scoreToPosition(scoringResult.scores.find(s => s.axis === 'economic')?.score || 0, 'economic');
    const actualAuthority = scoreToPosition(scoringResult.scores.find(s => s.axis === 'authority')?.score || 0, 'authority');
    const actualSocial = scoreToPosition(scoringResult.scores.find(s => s.axis === 'social')?.score || 0, 'social');
    
    // Check matches
    const economicMatch = persona.expectedPosition.economic === actualEconomic;
    const authorityMatch = persona.expectedPosition.authority === actualAuthority;
    const socialMatch = persona.expectedPosition.social === actualSocial;
    
    const matches = [economicMatch, authorityMatch, socialMatch].filter(Boolean).length;
    const accuracy = (matches / 3) * 100;
    
    totalTests += 3;
    totalMatches += matches;
    
    console.log(`Economic: ${scoringResult.scores.find(s => s.axis === 'economic')?.score.toFixed(3)} → ${actualEconomic} ${economicMatch ? '✅' : '❌'}`);
    console.log(`Authority: ${scoringResult.scores.find(s => s.axis === 'authority')?.score.toFixed(3)} → ${actualAuthority} ${authorityMatch ? '✅' : '❌'}`);
    console.log(`Social: ${scoringResult.scores.find(s => s.axis === 'social')?.score.toFixed(3)} → ${actualSocial} ${socialMatch ? '✅' : '❌'}`);
    console.log(`Accuracy: ${accuracy.toFixed(1)}%`);
    console.log('---\n');
    
    results.push({
      persona: persona.name,
      expected: { economic: persona.expectedPosition.economic, authority: persona.expectedPosition.authority, social: persona.expectedPosition.social },
      actual: { economic: actualEconomic, authority: actualAuthority, social: actualSocial },
      scores: {
        economic: scoringResult.scores.find(s => s.axis === 'economic')?.score || 0,
        authority: scoringResult.scores.find(s => s.axis === 'authority')?.score || 0,
        social: scoringResult.scores.find(s => s.axis === 'social')?.score || 0
      },
      matches: [economicMatch, authorityMatch, socialMatch],
      accuracy
    });
    
  } catch (error) {
    console.error(`❌ Error testing ${persona.name}:`, error);
    console.log('---\n');
  }
});

// Calculate overall accuracy
const overallAccuracy = (totalMatches / totalTests) * 100;

console.log('📊 ACCURACY SUMMARY:');
console.log('===================');
console.log(`Total axis tests: ${totalTests}`);
console.log(`Total matches: ${totalMatches}`);
console.log(`Overall accuracy: ${overallAccuracy.toFixed(1)}%`);

// Analyze biases
const economicBias = results.filter(r => !r.matches[0]).length;
const authorityBias = results.filter(r => !r.matches[1]).length;
const socialBias = results.filter(r => !r.matches[2]).length;

console.log('\n🔍 BIAS ANALYSIS:');
console.log(`Economic axis errors: ${economicBias}/${results.length}`);
console.log(`Authority axis errors: ${authorityBias}/${results.length}`);
console.log(`Social axis errors: ${socialBias}/${results.length}`);

// Detailed analysis
console.log('\n📋 DETAILED ANALYSIS:');
results.forEach(result => {
  console.log(`${result.persona}:`);
  console.log(`  Economic: ${result.expected.economic} → ${result.actual.economic} (${result.scores.economic.toFixed(1)}) ${result.matches[0] ? '✅' : '❌'}`);
  console.log(`  Authority: ${result.expected.authority} → ${result.actual.authority} (${result.scores.authority.toFixed(1)}) ${result.matches[1] ? '✅' : '❌'}`);
  console.log(`  Social: ${result.expected.social} → ${result.actual.social} (${result.scores.social.toFixed(1)}) ${result.matches[2] ? '✅' : '❌'}`);
});

console.log('\n🎉 Accuracy calculation completed!');
