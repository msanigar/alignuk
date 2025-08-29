#!/usr/bin/env tsx

import { QUESTIONS_FULL } from '../lib/questions';
import { AXIS_IDS } from '../lib/axes';

console.log('🔍 Analyzing Weight Distributions for All Axes\n');
console.log('='.repeat(60));

AXIS_IDS.forEach(axisId => {
  console.log(`\n📊 ${axisId.toUpperCase()} AXIS:`);
  console.log('-'.repeat(40));

  // Get questions for this axis
  const axisQuestions = QUESTIONS_FULL.filter(q => 
    q.axisTargets.some(target => target.axis === axisId)
  );

  console.log(`Total questions: ${axisQuestions.length}`);

  // Analyze weights
  let totalWeight = 0;
  let positiveWeights = 0;
  let negativeWeights = 0;
  let zeroWeights = 0;
  const weightBreakdown: { [key: string]: number } = {};

  axisQuestions.forEach(question => {
    const axisTarget = question.axisTargets.find(target => target.axis === axisId);
    const weight = axisTarget?.weight || 0;
    
    totalWeight += weight;
    weightBreakdown[question.id] = weight;

    if (weight > 0) {
      positiveWeights++;
    } else if (weight < 0) {
      negativeWeights++;
    } else {
      zeroWeights++;
    }
  });

  console.log(`Total weight: ${totalWeight}`);
  console.log(`Positive weights: ${positiveWeights}`);
  console.log(`Negative weights: ${negativeWeights}`);
  console.log(`Zero weights: ${zeroWeights}`);

  // Check for potential issues
  const hasBalancedWeights = totalWeight === 0 && positiveWeights > 0 && negativeWeights > 0;
  const hasAllPositive = negativeWeights === 0 && positiveWeights > 0;
  const hasAllNegative = positiveWeights === 0 && negativeWeights > 0;
  const hasMixedWeights = positiveWeights > 0 && negativeWeights > 0;

  console.log(`\n🔍 Analysis:`);
  if (hasBalancedWeights) {
    console.log(`❌ POTENTIAL ISSUE: Balanced weights (sum = 0)`);
    console.log(`   This axis could have the same coverage calculation problem as sovereignty.`);
  } else if (hasAllPositive) {
    console.log(`✅ All positive weights - no coverage issues expected`);
  } else if (hasAllNegative) {
    console.log(`✅ All negative weights - no coverage issues expected`);
  } else if (hasMixedWeights) {
    console.log(`⚠️  Mixed positive/negative weights but not balanced`);
    console.log(`   Total weight: ${totalWeight} (should be fine)`);
  } else {
    console.log(`❓ No weights found or all zero weights`);
  }

  // Show weight distribution
  console.log(`\n📋 Weight Distribution:`);
  Object.entries(weightBreakdown).forEach(([questionId, weight]) => {
    const sign = weight > 0 ? '+' : '';
    console.log(`  ${questionId}: ${sign}${weight}`);
  });
});

console.log('\n' + '='.repeat(60));
console.log('🎯 SUMMARY:');
console.log('The coverage calculation fix will benefit any axis with balanced weights.');
console.log('This includes axes where positive and negative weights perfectly sum to 0.');
console.log('The fix is backward compatible and won\'t affect axes with normal weight distributions.');
