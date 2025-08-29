#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing Environment Question Weights in File...\n');

// Questions that should have negative weights (growth-supporting)
const growthQuestions = [
  'env_4', // Prioritize energy security over environmental concerns
  'env_5', // Expand fossil fuel production
  'env_8', // Economic growth policies even if they delay emissions reductions
  'env_10', // Energy security over faster emissions cuts
];

// Questions that should keep positive weights (sustainability-supporting)
const sustainabilityQuestions = [
  'env_1', // Environmental protection over economic growth
  'env_2', // Invest more in renewable energy
  'env_3', // Reduce carbon emissions more aggressively
  'env_6', // Invest more in nuclear energy
  'env_7', // Climate change as top spending priority
  'env_9', // Public support for renewable energy
];

console.log('📊 Environment Question Classification:');
console.log('======================================');
console.log('SUSTAINABILITY-SUPPORTING (keeping positive weights):');
sustainabilityQuestions.forEach(q => console.log(`  ✅ ${q}`));
console.log('\nGROWTH-SUPPORTING (changing to negative weights):');
growthQuestions.forEach(q => console.log(`  ❌ ${q}`));

// Fix the weights
let changesMade = 0;

growthQuestions.forEach(questionId => {
  // Find and replace the weight for this question
  const pattern = new RegExp(`id: '${questionId}',[\\s\\S]*?axisTargets: \\[{ axis: 'environment', weight: 1\\.0 \\}\\]`, 'g');
  const replacement = (match: string) => {
    return match.replace(/weight: 1\.0/, 'weight: -1.0');
  };
  
  const newContent = content.replace(pattern, replacement);
  if (newContent !== content) {
    content = newContent;
    changesMade++;
    console.log(`✅ Fixed ${questionId}: weight 1.0 → -1.0`);
  } else {
    console.log(`⚠️ Could not find ${questionId} to fix`);
  }
});

// Write the updated content back
fs.writeFileSync(questionsPath, content, 'utf8');

console.log(`\n📊 SUMMARY:`);
console.log(`============`);
console.log(`Changes made: ${changesMade}`);
console.log(`Growth questions fixed: ${growthQuestions.length}`);
console.log(`Sustainability questions unchanged: ${sustainabilityQuestions.length}`);

if (changesMade > 0) {
  console.log(`\n✅ Successfully updated environment question weights!`);
  console.log(`🎯 Expected balance: 6 sustainability vs 4 growth questions`);
  console.log(`📈 This should create proper sustainability vs growth differentiation`);
} else {
  console.log(`\n⚠️ No changes were made. Check if the patterns match.`);
}
