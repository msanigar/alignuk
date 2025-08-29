#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing Sovereignty Question Weights...\n');

// Fix sovereignty question weights
// Questions that support nationalism (positive weights)
const sovereigntyPositiveQuestions = [
  'sovereign_3', // Independent foreign policy
  'sovereign_5', // National interests over global concerns
  'sovereign_8', // National interests over international cooperation
  'sovereign_10', // Tighter immigration control
];

// Questions that support globalism (negative weights)
const sovereigntyNegativeQuestions = [
  'sovereign_1', // International cooperation over sovereignty
  'sovereign_2', // Accept international laws
  'sovereign_4', // Accept international trade agreements
  'sovereign_6', // More involved in international organizations
  'sovereign_7', // Closer EU cooperation
  'sovereign_9', // Secure international trade agreements
];

console.log('📊 Sovereignty Question Classification:');
console.log('======================================');
console.log('NATIONALIST-SUPPORTING (positive weights):');
sovereigntyPositiveQuestions.forEach(q => console.log(`  ✅ ${q}`));
console.log('\nGLOBALIST-SUPPORTING (negative weights):');
sovereigntyNegativeQuestions.forEach(q => console.log(`  ❌ ${q}`));

console.log('\n⚠️  MANUAL UPDATE REQUIRED:');
console.log('==========================');
console.log('Please manually update the following weights in lib/questions.ts:');
console.log('');

sovereigntyNegativeQuestions.forEach(q => {
  console.log(`For ${q} (globalist-supporting):`);
  console.log(`  Change weight from 1 to -1`);
  console.log('');
});

console.log('This will create proper balance:');
console.log('- 4 questions supporting nationalism (positive weights)');
console.log('- 6 questions supporting globalism (negative weights)');
console.log('- Net effect: 2 globalist-supporting questions');

console.log('\n🎯 Expected Results After Fix:');
console.log('==============================');
console.log('- Far-Left Socialist: Should score negative (globalist)');
console.log('- Far-Right Libertarian: Should score positive (nationalist)');
console.log('- Political Centrist: Should score near zero (balanced)');
console.log('- Other personas: Should show appropriate nationalist/globalist positions');
