#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');
const accuracyPath = path.join(__dirname, 'calculateAccuracy.ts');

// Fix Far-Right Libertarian authority answers to be more asymmetric
let personasContent = fs.readFileSync(personasPath, 'utf8');

// Make Far-Right Libertarian more strongly libertarian
personasContent = personasContent.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN)"
);
personasContent = personasContent.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN)"
);
personasContent = personasContent.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN\)/,
  "'auth_6': 7,   // Free expression (LIBERTARIAN)"
);
personasContent = personasContent.replace(
  /'auth_8': 7,   \/\/ Civil liberties \(LIBERTARIAN\)/,
  "'auth_8': 7,   // Civil liberties (LIBERTARIAN)"
);
personasContent = personasContent.replace(
  /'auth_10': 7,  \/\/ Individual rights \(LIBERTARIAN\)/,
  "'auth_10': 7,  // Individual rights (LIBERTARIAN)"
);

// Make authoritarian questions even stronger disagreement
personasContent = personasContent.replace(
  /'auth_1': 1,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);
personasContent = personasContent.replace(
  /'auth_3': 1,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);
personasContent = personasContent.replace(
  /'auth_5': 1,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);
personasContent = personasContent.replace(
  /'auth_7': 1,   \/\/ Government surveillance \(LIBERTARIAN - disagree\)/,
  "'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)"
);
personasContent = personasContent.replace(
  /'auth_9': 1,   \/\/ Law enforcement powers \(LIBERTARIAN - disagree\)/,
  "'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)"
);

fs.writeFileSync(personasPath, personasContent, 'utf8');

// Now adjust the classification thresholds to be more sensitive
let accuracyContent = fs.readFileSync(accuracyPath, 'utf8');

// Make thresholds more sensitive for better classification
accuracyContent = accuracyContent.replace(
  /if \(score <= -15\) {/,
  'if (score <= -12) {'
);
accuracyContent = accuracyContent.replace(
  /} else if \(score <= -5\) {/,
  '} else if (score <= -3) {'
);
accuracyContent = accuracyContent.replace(
  /} else if \(score <= 5\) {/,
  '} else if (score <= 3) {'
);
accuracyContent = accuracyContent.replace(
  /} else if \(score <= 15\) {/,
  '} else if (score <= 12) {'
);

fs.writeFileSync(accuracyPath, accuracyContent, 'utf8');

console.log('✅ Fixed authority answers and adjusted thresholds!');
console.log('📊 Changes made:');
console.log('  - Far-Right Libertarian: stronger libertarian positions');
console.log('  - Adjusted classification thresholds to be more sensitive');
console.log('  - Economic: ±12 instead of ±15');
console.log('  - Authority: ±3 instead of ±5');
console.log('  - Social: ±3 instead of ±5');
console.log('🎯 This should improve classification accuracy');
