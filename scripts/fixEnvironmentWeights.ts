#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing Environment Question Weights...\n');

// Questions that should have positive weights (sustainability-supporting)
const sustainabilityQuestions = [
  'env_1', // Environmental protection over economic growth
  'env_2', // Invest more in renewable energy
  'env_3', // Reduce carbon emissions more aggressively
  'env_6', // Invest more in nuclear energy
  'env_7', // Climate change as top spending priority
  'env_9', // Public support for renewable energy
];

// Questions that should have negative weights (growth-supporting)
const growthQuestions = [
  'env_4', // Prioritize energy security over environmental concerns
  'env_5', // Expand fossil fuel production
  'env_8', // Economic growth policies even if they delay emissions reductions
  'env_10', // Energy security over faster emissions cuts
];

console.log('📊 Environment Question Classification:');
console.log('======================================');
console.log('SUSTAINABILITY-SUPPORTING (keeping positive weights):');
sustainabilityQuestions.forEach(q => console.log(`  ✅ ${q}`));
console.log('\nGROWTH-SUPPORTING (changing to negative weights):');
growthQuestions.forEach(q => console.log(`  ❌ ${q}`));

console.log('\n⚠️  MANUAL UPDATE REQUIRED:');
console.log('==========================');
console.log('Please manually update the following weights in lib/questions.ts:');
console.log('');

growthQuestions.forEach(q => {
  console.log(`For ${q} (growth-supporting):`);
  console.log(`  Change weight from 1 to -1`);
  console.log('');
});

console.log('This will create proper balance:');
console.log('- 6 questions supporting sustainability (positive weights)');
console.log('- 4 questions supporting growth (negative weights)');
console.log('- Net effect: 2 sustainability-supporting questions');

console.log('\n🎯 Expected Results After Fix:');
console.log('==============================');
console.log('- Far-Left Socialist: Should score positive (sustainability)');
console.log('- Far-Right Libertarian: Should score negative (growth)');
console.log('- Political Centrist: Should score near zero (balanced)');
console.log('- Other personas: Should show appropriate sustainability/growth positions');
