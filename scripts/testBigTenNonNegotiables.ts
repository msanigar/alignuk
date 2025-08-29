#!/usr/bin/env tsx

import { buildNonNegotiables, applyNonNegotiables } from '../lib/nonnegotiables';
import { TEST_PERSONAS } from '../lib/testPersonas';

console.log('🧪 Testing Big 10 Non-Negotiables System...\n');

// Test with each persona
TEST_PERSONAS.forEach(persona => {
  console.log(`📋 Testing: ${persona.name}`);
  console.log('='.repeat(50));

  // Build non-negotiables from persona answers
  const nonNegotiables = buildNonNegotiables(persona.answers);

  if (nonNegotiables.length === 0) {
    console.log('❌ No non-negotiables detected');
  } else {
    console.log(`✅ Found ${nonNegotiables.length} non-negotiables:`);
    nonNegotiables.forEach(nn => {
      console.log(`  - ${nn.policy}: ${nn.direction > 0 ? 'SUPPORT' : 'OPPOSE'} (strength: ${nn.strength.toFixed(2)})`);
      console.log(`    Source questions: ${nn.sourceQuestionIds.join(', ')}`);
    });
  }

  // Create mock party matches
  const mockMatches = [
    { partyId: 'labour', partyName: 'Labour', weight: 0.8, percent: 40 },
    { partyId: 'conservative', partyName: 'Conservative', weight: 0.6, percent: 30 },
    { partyId: 'libdem', partyName: 'Liberal Democrats', weight: 0.4, percent: 20 },
    { partyId: 'greens', partyName: 'Green Party', weight: 0.2, percent: 10 },
  ];

  // Apply non-negotiables
  const { adjusted, notes } = applyNonNegotiables(mockMatches, nonNegotiables, { mode: 'soft' });

  console.log('\n🎯 Party Match Adjustments:');
  console.log('Original matches:');
  mockMatches.forEach(m => console.log(`  ${m.partyName}: ${m.percent}%`));

  console.log('\nAdjusted matches:');
  adjusted.forEach(m => console.log(`  ${m.partyName}: ${m.percent}%`));

  if (notes.length > 0) {
    console.log('\n📝 Notes:');
    notes.forEach(note => console.log(`  - ${note}`));
  }

  console.log('\n' + '='.repeat(50) + '\n');
});

console.log('🎉 Big 10 Non-Negotiables test completed!');
console.log('\n📊 Summary of New Categories:');
console.log('1. Immigration Control (existing)');
console.log('2. ECHR Withdrawal (existing)');
console.log('3. Net Zero Priority (existing)');
console.log('4. NHS Free at Point of Use (existing)');
console.log('5. National Service (existing)');
console.log('6. Private Provision in Public Services (existing)');
console.log('7. Taxation Policy (NEW)');
console.log('8. Crime & Policing (NEW)');
console.log('9. Housing Development (NEW)');
console.log('10. Education Curriculum (NEW)');
