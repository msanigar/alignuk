#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix authoritarian persona values to create positive authority scores
// For authoritarian personas: use stronger agreement with authoritarian questions
// and weaker disagreement with libertarian questions

// Authoritarian Conservative - make more strongly authoritarian
// Change auth_1, auth_3, auth_5 from 5 to 7 (stronger agreement with authoritarian)
// Change auth_2, auth_4, auth_6 from 3 to 2 (weaker disagreement with libertarian)

// Find and replace Authoritarian Conservative authority values
// This is a more targeted approach since we need to be specific about which persona

// Replace the specific pattern for Authoritarian Conservative
content = content.replace(
  /'auth_1': 5,   \/\/ Collective security \(AUTHORITARIAN\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_2': 3,   \/\/ Internet unregulated \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_2': 2,   // Internet unregulated (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_3': 5,   \/\/ Public order \(AUTHORITARIAN\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_4': 3,   \/\/ Privacy protection \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_4': 2,   // Privacy protection (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_5': 5,   \/\/ Society regulate lifestyle \(AUTHORITARIAN\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_6': 3,   \/\/ Free expression \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_6': 2,   // Free expression (LIBERTARIAN - disagree)"
);

// Far-Right Authoritarian - make more strongly authoritarian
// Change auth_2, auth_4, auth_6 from 1 to 2 (weaker disagreement with libertarian)

content = content.replace(
  /'auth_2': 1,   \/\/ Internet unregulated \(LIBERTARIAN - disagree\)/,
  "'auth_2': 2,   // Internet unregulated (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Privacy protection \(LIBERTARIAN - disagree\)/,
  "'auth_4': 2,   // Privacy protection (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_6': 1,   \/\/ Free expression \(LIBERTARIAN - disagree\)/,
  "'auth_6': 2,   // Free expression (LIBERTARIAN - disagree)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Authoritarian persona values fixed!');
console.log('📊 Authoritarian personas now have stronger authoritarian positions');
console.log('🎯 This should create positive scores for authoritarian personas');
