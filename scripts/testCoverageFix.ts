#!/usr/bin/env tsx

import { calculateScores } from '../lib/scoring';

console.log('🧪 Testing Coverage Fix for Sovereignty Axis\n');

// Create a test session with all sovereignty questions answered
const testSession = {
  id: 'test-session',
  userId: 'test-user',
  answers: [
    // Sovereignty questions (all answered)
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
    // Add a few other questions to make it realistic
    { questionId: 'econ_1', value: 4 },
    { questionId: 'econ_2', value: 4 },
    { questionId: 'social_1', value: 4 },
    { questionId: 'social_2', value: 4 },
    { questionId: 'auth_1', value: 4 },
    { questionId: 'auth_2', value: 4 },
    { questionId: 'env_1', value: 4 },
    { questionId: 'env_2', value: 4 },
    { questionId: 'welfare_1', value: 4 },
    { questionId: 'welfare_2', value: 4 },
  ],
  createdAt: new Date()
};

// Calculate scores
const scoringResult = calculateScores(testSession);

console.log('📊 Coverage Results:');
console.log('===================');
console.log(`Overall confidence: ${scoringResult.confidence}%`);
console.log(`Has sufficient data: ${scoringResult.hasSufficientData ? '✅ YES' : '❌ NO'}`);

if (scoringResult.missingAxes.length > 0) {
  console.log(`❌ Missing axes: ${scoringResult.missingAxes.join(', ')}`);
} else {
  console.log('✅ All axes have sufficient data');
}

console.log('\n📈 Axis-by-Axis Coverage:');
scoringResult.scores.forEach(score => {
  const status = score.confidence >= 60 ? '✅' : '❌';
  console.log(`  ${status} ${score.axis}: ${score.confidence}% coverage (score: ${score.score})`);
});

console.log('\n🎉 Coverage fix test completed!');
