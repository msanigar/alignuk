#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Rebalancing Sovereignty Questions...\n');

// Current classification analysis
const currentClassification = {
  'sovereign_1': { weight: -1, type: 'globalist', question: 'International cooperation over sovereignty' },
  'sovereign_2': { weight: -1, type: 'globalist', question: 'Accept international laws' },
  'sovereign_3': { weight: -1, type: 'globalist', question: 'Independent foreign policy' }, // This should be nationalist!
  'sovereign_4': { weight: -1, type: 'globalist', question: 'Accept international trade agreements' },
  'sovereign_5': { weight: 1, type: 'nationalist', question: 'National interests over global concerns' },
  'sovereign_6': { weight: -1, type: 'globalist', question: 'More involved in international organizations' },
  'sovereign_7': { weight: -1, type: 'globalist', question: 'Closer EU cooperation' },
  'sovereign_8': { weight: 1, type: 'nationalist', question: 'National interests over international cooperation' },
  'sovereign_9': { weight: -1, type: 'globalist', question: 'Secure international trade agreements' },
  'sovereign_10': { weight: 1, type: 'nationalist', question: 'Tighter immigration control' }
};

console.log('📊 Current Sovereignty Question Classification:');
console.log('==============================================');
Object.entries(currentClassification).forEach(([id, info]) => {
  console.log(`${id}: ${info.weight > 0 ? '✅' : '❌'} ${info.type} - ${info.question}`);
});

console.log('\n🎯 PROBLEM IDENTIFIED:');
console.log('=====================');
console.log('sovereign_3 "Independent foreign policy" is currently classified as GLOBALIST');
console.log('But it should be NATIONALIST (supporting UK independence)');
console.log('This creates 7 globalist vs 3 nationalist questions');

console.log('\n🔧 FIXING sovereign_3:');
console.log('=====================');
console.log('Changing sovereign_3 from weight -1 (globalist) to weight 1 (nationalist)');

// Fix sovereign_3 weight
const pattern = /id: 'sovereign_3',[\s\S]*?axisTargets: \[{ axis: 'sovereignty', weight: -1\.0 }\]/g;
const replacement = (match: string) => {
  return match.replace(/weight: -1\.0/, 'weight: 1.0');
};

const newContent = content.replace(pattern, replacement);
if (newContent !== content) {
  content = newContent;
  fs.writeFileSync(questionsPath, content, 'utf8');
  console.log('✅ Successfully fixed sovereign_3 weight: -1.0 → 1.0');
} else {
  console.log('⚠️ Could not find sovereign_3 to fix');
}

console.log('\n📊 EXPECTED RESULT AFTER FIX:');
console.log('=============================');
console.log('Nationalist questions (weight +1): 4');
console.log('Globalist questions (weight -1): 6');
console.log('Total weight: -2 (slight globalist bias)');
console.log('This is better than -4, but still not perfectly balanced');

console.log('\n🎯 RECOMMENDATION:');
console.log('=================');
console.log('For perfect balance, we should have 5 nationalist vs 5 globalist questions');
console.log('Consider changing one more globalist question to nationalist');
console.log('Possible candidates: sovereign_9 (international trade agreements)');
