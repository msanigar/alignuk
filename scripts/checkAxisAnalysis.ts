#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';

console.log('🔍 Checking Analysis Status of All 6 Axes...\n');

// Get all axes from questions
const allAxes = new Set<string>();
QUESTIONS_FULL.forEach(question => {
  question.axisTargets.forEach(target => {
    allAxes.add(target.axis);
  });
});

const axes = Array.from(allAxes).sort();
console.log('📊 All 6 Axes in the Quiz:');
console.log('==========================');
axes.forEach((axis, index) => {
  console.log(`${index + 1}. ${axis}`);
});

console.log('\n📋 Analysis Status:');
console.log('==================');

// Check what we've analyzed
const analysisStatus = {
  'economic': {
    status: '✅ ANALYZED & FIXED',
    issues: ['Axis inversion fixed', 'Thresholds adjusted', '83.3% accuracy achieved'],
    description: 'Fixed economic axis inversion and improved classification thresholds'
  },
  'authority': {
    status: '✅ ANALYZED & FIXED', 
    issues: ['Question rebalancing', 'Persona answer patterns', 'Thresholds adjusted'],
    description: 'Rebalanced authority questions and fixed persona answer patterns'
  },
  'social': {
    status: '✅ ANALYZED & FIXED',
    issues: ['Thresholds adjusted', 'Working well'],
    description: 'Social axis working correctly with adjusted thresholds'
  },
  'welfare': {
    status: '✅ ANALYZED & FIXED',
    issues: ['Question weights corrected', 'welfare_8 and welfare_10 fixed'],
    description: 'Fixed welfare question weights to properly distinguish welfare vs market'
  },
  'sovereignty': {
    status: '❌ NOT ANALYZED',
    issues: ['No systematic analysis done'],
    description: 'Sovereignty axis has not been systematically checked for balance'
  },
  'environment': {
    status: '❌ NOT ANALYZED', 
    issues: ['No systematic analysis done'],
    description: 'Environment axis has not been systematically checked for balance'
  }
};

axes.forEach(axis => {
  const status = analysisStatus[axis as keyof typeof analysisStatus];
  console.log(`\n${axis.toUpperCase()}:`);
  console.log(`  Status: ${status.status}`);
  console.log(`  Description: ${status.description}`);
  if (status.issues.length > 0) {
    console.log(`  Issues: ${status.issues.join(', ')}`);
  }
});

console.log('\n🎯 SUMMARY:');
console.log('===========');
console.log('✅ ANALYZED & FIXED (4/6):');
console.log('  - Economic axis');
console.log('  - Authority axis'); 
console.log('  - Social axis');
console.log('  - Welfare axis');

console.log('\n❌ NOT ANALYZED (2/6):');
console.log('  - Sovereignty axis');
console.log('  - Environment axis');

console.log('\n📈 RECOMMENDATION:');
console.log('=================');
console.log('We should analyze the sovereignty and environment axes to ensure:');
console.log('1. Question balance (left vs right, green vs growth)');
console.log('2. Proper question weights');
console.log('3. Persona answer patterns');
console.log('4. Classification thresholds');
console.log('5. Overall accuracy across all 6 axes');
