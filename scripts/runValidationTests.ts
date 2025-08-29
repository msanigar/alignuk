#!/usr/bin/env tsx

import { runAllPersonaTests, generateTestReport } from '../lib/testPersonas';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running AlignUK Quiz Validation Tests...\n');

try {
  // Run all persona tests
  const results = runAllPersonaTests();
  
  // Generate detailed report
  const report = generateTestReport();
  
  // Save report to file
  const reportPath = path.join(process.cwd(), 'validation-report.md');
  fs.writeFileSync(reportPath, report);
  
  // Print summary to console
  console.log('📊 Test Results Summary:');
  console.log('========================\n');
  
  const totalTests = results.length;
  const totalMatches = results.reduce((sum, result) => 
    sum + Object.values(result.analysis.expectedVsActual).filter(v => v.match).length, 0
  );
  const totalExpected = totalTests * 5; // 5 axes per test
  const accuracy = (totalMatches / totalExpected) * 100;
  
  console.log(`✅ Total personas tested: ${totalTests}`);
  console.log(`📈 Total axis matches: ${totalMatches}/${totalExpected}`);
  console.log(`🎯 Overall accuracy: ${accuracy.toFixed(1)}%\n`);
  
  // Bias analysis
  const rightBias = results.filter(r => r.analysis.biasAnalysis.overallBias === 'right').length;
  const leftBias = results.filter(r => r.analysis.biasAnalysis.overallBias === 'left').length;
  const authBias = results.filter(r => r.analysis.biasAnalysis.authorityBias === 'authoritarian').length;
  const libBias = results.filter(r => r.analysis.biasAnalysis.authorityBias === 'libertarian').length;
  
  console.log('🔍 Bias Analysis:');
  console.log(`   Right-leaning bias: ${rightBias} personas`);
  console.log(`   Left-leaning bias: ${leftBias} personas`);
  console.log(`   Authoritarian bias: ${authBias} personas`);
  console.log(`   Libertarian bias: ${libBias} personas\n`);
  
  // Individual results summary
  console.log('👥 Individual Results:');
  console.log('=====================\n');
  
  results.forEach((result, index) => {
    const matches = Object.values(result.analysis.expectedVsActual).filter(v => v.match).length;
    const accuracy = (matches / 5) * 100;
    const status = accuracy >= 80 ? '✅' : accuracy >= 60 ? '⚠️' : '❌';
    
    console.log(`${status} ${result.persona.name}: ${accuracy.toFixed(1)}% accuracy`);
    console.log(`   Expected: ${result.persona.expectedPosition.economic}/${result.persona.expectedPosition.authority}`);
    console.log(`   Actual: ${result.scores.economic.toFixed(3)}/${result.scores.authority.toFixed(3)}`);
    console.log(`   Top party: ${result.partyRankings[0]?.party || 'None'} (${result.partyRankings[0]?.percentage.toFixed(1)}%)`);
    console.log('');
  });
  
  // Detailed analysis
  console.log('📋 Detailed Analysis:');
  console.log('====================\n');
  
  // Check for systematic biases
  const economicScores = results.map(r => ({ 
    name: r.persona.name, 
    expected: r.persona.expectedPosition.economic, 
    actual: r.scores.economic 
  }));
  
  const authorityScores = results.map(r => ({ 
    name: r.persona.name, 
    expected: r.persona.expectedPosition.authority, 
    actual: r.scores.authority 
  }));
  
  console.log('Economic Axis Analysis:');
  economicScores.forEach(score => {
    const bias = score.expected.includes('left') && score.actual > 0 ? 'RIGHT BIAS' :
                 score.expected.includes('right') && score.actual < 0 ? 'LEFT BIAS' : 'OK';
    console.log(`   ${score.name}: ${score.expected} → ${score.actual.toFixed(3)} (${bias})`);
  });
  
  console.log('\nAuthority Axis Analysis:');
  authorityScores.forEach(score => {
    const bias = score.expected.includes('libertarian') && score.actual > 0 ? 'AUTH BIAS' :
                 score.expected.includes('authoritarian') && score.actual < 0 ? 'LIB BIAS' : 'OK';
    console.log(`   ${score.name}: ${score.expected} → ${score.actual.toFixed(3)} (${bias})`);
  });
  
  console.log(`\n📄 Full report saved to: ${reportPath}`);
  console.log('\n🎉 Validation tests completed!');
  
  // Exit with error code if accuracy is too low
  if (accuracy < 70) {
    console.log('\n⚠️  WARNING: Low accuracy detected. Review quiz scoring algorithm.');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error running validation tests:', error);
  process.exit(1);
}
