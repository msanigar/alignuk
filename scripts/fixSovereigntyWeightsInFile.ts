#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing Sovereignty Question Weights in File...\n');

// Questions that should have negative weights (globalist-supporting)
const globalistQuestions = [
  'sovereign_1', // International cooperation over sovereignty
  'sovereign_2', // Accept international laws
  'sovereign_4', // Accept international trade agreements
  'sovereign_6', // More involved in international organizations
  'sovereign_7', // Closer EU cooperation
  'sovereign_9', // Secure international trade agreements
];

// Questions that should keep positive weights (nationalist-supporting)
const nationalistQuestions = [
  'sovereign_3', // Independent foreign policy
  'sovereign_5', // National interests over global concerns
  'sovereign_8', // National interests over international cooperation
  'sovereign_10', // Tighter immigration control
];

console.log('📊 Sovereignty Question Classification:');
console.log('======================================');
console.log('GLOBALIST-SUPPORTING (changing to negative weights):');
globalistQuestions.forEach(q => console.log(`  ❌ ${q}`));
console.log('\nNATIONALIST-SUPPORTING (keeping positive weights):');
nationalistQuestions.forEach(q => console.log(`  ✅ ${q}`));

// Fix the weights
let changesMade = 0;

globalistQuestions.forEach(questionId => {
  // Find and replace the weight for this question
  const pattern = new RegExp(`id: '${questionId}',[\\s\\S]*?axisTargets: \\[{ axis: 'sovereignty', weight: 1\\.0 \\}\\]`, 'g');
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
console.log(`Globalist questions fixed: ${globalistQuestions.length}`);
console.log(`Nationalist questions unchanged: ${nationalistQuestions.length}`);

if (changesMade > 0) {
  console.log(`\n✅ Successfully updated sovereignty question weights!`);
  console.log(`🎯 Expected balance: 4 nationalist vs 6 globalist questions`);
  console.log(`📈 This should create proper nationalist vs globalist differentiation`);
} else {
  console.log(`\n⚠️ No changes were made. Check if the patterns match.`);
}
