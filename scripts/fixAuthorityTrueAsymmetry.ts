#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix authority answer patterns with true asymmetry
// Libertarian personas should get NEGATIVE scores (libertarian position)
// Authoritarian personas should get POSITIVE scores (authoritarian position)

// Far-Left Socialist (libertarian) - should get NEGATIVE score
content = content.replace(
  /'auth_1': 2,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN - strongly agree\)/,
  "'auth_2': 6,   // Internet unregulated (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_3': 2,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN - strongly agree\)/,
  "'auth_4': 6,   // Privacy protection (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_5': 2,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN - strongly agree\)/,
  "'auth_6': 6,   // Free expression (LIBERTARIAN - agree)"
);

// Far-Right Libertarian (libertarian) - should get NEGATIVE score
content = content.replace(
  /'auth_1': 2,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN - strongly agree\)/,
  "'auth_2': 6,   // Internet unregulated (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_3': 2,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN - strongly agree\)/,
  "'auth_4': 6,   // Privacy protection (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_5': 2,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN - strongly agree\)/,
  "'auth_6': 6,   // Free expression (LIBERTARIAN - agree)"
);

// Left-Libertarian (libertarian) - should get NEGATIVE score
content = content.replace(
  /'auth_1': 2,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN - strongly agree\)/,
  "'auth_2': 6,   // Internet unregulated (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_3': 2,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN - strongly agree\)/,
  "'auth_4': 6,   // Privacy protection (LIBERTARIAN - agree)"
);

content = content.replace(
  /'auth_5': 2,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN - strongly agree\)/,
  "'auth_6': 6,   // Free expression (LIBERTARIAN - agree)"
);

// Authoritarian Conservative (authoritarian) - should get POSITIVE score
content = content.replace(
  /'auth_1': 7,   \/\/ Collective security \(AUTHORITARIAN - strongly agree\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_2': 2,   \/\/ Internet unregulated \(LIBERTARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Public order \(AUTHORITARIAN - strongly agree\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_4': 2,   \/\/ Privacy protection \(LIBERTARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - strongly agree\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_6': 2,   \/\/ Free expression \(LIBERTARIAN - disagree\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - strongly disagree)"
);

// Far-Right Authoritarian (authoritarian) - should get POSITIVE score
content = content.replace(
  /'auth_1': 7,   \/\/ Collective security \(AUTHORITARIAN - strongly agree\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_2': 2,   \/\/ Internet unregulated \(LIBERTARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Public order \(AUTHORITARIAN - strongly agree\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_4': 2,   \/\/ Privacy protection \(LIBERTARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - strongly agree\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_6': 2,   \/\/ Free expression \(LIBERTARIAN - disagree\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - strongly disagree)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Authority answer patterns fixed with true asymmetry!');
console.log('📊 Libertarian personas: 3×(-3) + 3×(+2) = -3 (libertarian)');
console.log('🎯 Authoritarian personas: 3×(+3) + 3×(-3) = +3 (authoritarian)');
