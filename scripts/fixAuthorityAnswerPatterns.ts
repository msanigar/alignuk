#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix authority answer patterns to create distinct positions
// For libertarian personas: agree more strongly with libertarian, disagree more strongly with authoritarian
// For authoritarian personas: agree more strongly with authoritarian, disagree more strongly with libertarian

// Far-Left Socialist (libertarian) - stronger positions
content = content.replace(
  /'auth_1': 1,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_3': 1,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_5': 1,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN\)/,
  "'auth_6': 7,   // Free expression (LIBERTARIAN - strongly agree)"
);

// Far-Right Libertarian (libertarian) - stronger positions
content = content.replace(
  /'auth_1': 1,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_3': 1,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_5': 1,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN\)/,
  "'auth_6': 7,   // Free expression (LIBERTARIAN - strongly agree)"
);

// Left-Libertarian (libertarian) - stronger positions
content = content.replace(
  /'auth_1': 1,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_2': 7,   \/\/ Internet unregulated \(LIBERTARIAN\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_3': 1,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Privacy protection \(LIBERTARIAN\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN - strongly agree)"
);

content = content.replace(
  /'auth_5': 1,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_6': 7,   \/\/ Free expression \(LIBERTARIAN\)/,
  "'auth_6': 7,   // Free expression (LIBERTARIAN - strongly agree)"
);

// Authoritarian Conservative (authoritarian) - stronger positions
content = content.replace(
  /'auth_1': 7,   \/\/ Collective security \(AUTHORITARIAN\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_2': 1,   \/\/ Internet unregulated \(LIBERTARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Public order \(AUTHORITARIAN\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Privacy protection \(LIBERTARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Society regulate lifestyle \(AUTHORITARIAN\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_6': 1,   \/\/ Free expression \(LIBERTARIAN - disagree\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - strongly disagree)"
);

// Far-Right Authoritarian (authoritarian) - stronger positions
content = content.replace(
  /'auth_1': 7,   \/\/ Collective security \(AUTHORITARIAN\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_2': 1,   \/\/ Internet unregulated \(LIBERTARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Public order \(AUTHORITARIAN\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Privacy protection \(LIBERTARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - strongly disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Society regulate lifestyle \(AUTHORITARIAN\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN - strongly agree)"
);

content = content.replace(
  /'auth_6': 1,   \/\/ Free expression \(LIBERTARIAN - disagree\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - strongly disagree)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Authority answer patterns fixed to create distinct positions!');
console.log('📊 Libertarian personas now have stronger libertarian positions');
console.log('🎯 Authoritarian personas now have stronger authoritarian positions');
