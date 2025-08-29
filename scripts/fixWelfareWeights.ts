#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing Welfare Question Weights...\n');

// Fix welfare question weights
// Questions that support welfare state (positive weights)
const welfarePositiveQuestions = [
  'welfare_1', // Universal benefits
  'welfare_2', // NHS expansion
  'welfare_3', // Unemployment benefits
  'welfare_4', // Free university education
  'welfare_5', // Childcare support
  'welfare_6', // Social housing
  'welfare_7', // Universal Basic Income
  'welfare_9', // Free healthcare
];

// Questions that support market solutions (negative weights)
const welfareNegativeQuestions = [
  'welfare_8', // Conditional benefits (work requirements)
  'welfare_10', // Individual healthcare costs
];

console.log('📊 Welfare Question Classification:');
console.log('===================================');
console.log('WELFARE-SUPPORTING (positive weights):');
welfarePositiveQuestions.forEach(q => console.log(`  ✅ ${q}`));
console.log('\nMARKET-SUPPORTING (negative weights):');
welfareNegativeQuestions.forEach(q => console.log(`  ❌ ${q}`));

// Update the weights in the questions file
// This is a simplified approach - in practice, you'd need to carefully update the specific weight values
console.log('\n⚠️  MANUAL UPDATE REQUIRED:');
console.log('==========================');
console.log('Please manually update the following weights in lib/questions.ts:');
console.log('');
console.log('For welfare_8 (conditional benefits):');
console.log('  Change weight from 1 to -1');
console.log('');
console.log('For welfare_10 (individual healthcare costs):');
console.log('  Change weight from 1 to -1');
console.log('');
console.log('This will create proper balance:');
console.log('- 8 questions supporting welfare (positive weights)');
console.log('- 2 questions supporting market (negative weights)');
console.log('- Net effect: 6 welfare-supporting questions');

console.log('\n🎯 Expected Results After Fix:');
console.log('==============================');
console.log('- Far-Left Socialist: Should score positive (welfare)');
console.log('- Far-Right Libertarian: Should score negative (market)');
console.log('- Political Centrist: Should score near zero (balanced)');
console.log('- Other personas: Should show appropriate welfare/market positions');
