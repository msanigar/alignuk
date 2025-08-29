#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix authority answers to create asymmetric patterns
// Far-Right Libertarian: make more strongly libertarian
content = content.replace(
  /'auth_1': 1,   \/\/ Collective security \(AUTHORITARIAN - disagree\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_3': 1,   \/\/ Public order \(AUTHORITARIAN - disagree\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_5': 1,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - disagree\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_7': 1,   \/\/ Government surveillance \(LIBERTARIAN - disagree\)/,
  "'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)"
);
content = content.replace(
  /'auth_9': 1,   \/\/ Law enforcement powers \(LIBERTARIAN - disagree\)/,
  "'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)"
);

// Authoritarian Conservative: make more strongly authoritarian
content = content.replace(
  /'auth_1': 6,   \/\/ Collective security \(AUTHORITARIAN\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN)"
);
content = content.replace(
  /'auth_3': 6,   \/\/ Public order \(AUTHORITARIAN\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN)"
);
content = content.replace(
  /'auth_5': 6,   \/\/ Society regulate lifestyle \(AUTHORITARIAN\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN)"
);
content = content.replace(
  /'auth_7': 6,   \/\/ Government surveillance \(AUTHORITARIAN\)/,
  "'auth_7': 7,   // Government surveillance (AUTHORITARIAN)"
);
content = content.replace(
  /'auth_9': 6,   \/\/ Law enforcement powers \(AUTHORITARIAN\)/,
  "'auth_9': 7,   // Law enforcement powers (AUTHORITARIAN)"
);

// Left-Libertarian: make more strongly libertarian
content = content.replace(
  /'auth_1': 2,   \/\/ Collective security \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_3': 2,   \/\/ Public order \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_5': 2,   \/\/ Society regulate lifestyle \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);
content = content.replace(
  /'auth_7': 2,   \/\/ Government surveillance \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)"
);
content = content.replace(
  /'auth_9': 2,   \/\/ Law enforcement powers \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Fixed authority answers for new personas!');
console.log('📊 Made authority patterns asymmetric:');
console.log('  - Far-Right Libertarian: stronger libertarian positions');
console.log('  - Authoritarian Conservative: stronger authoritarian positions');
console.log('  - Left-Libertarian: stronger libertarian positions');
console.log('🎯 This should create distinct authority scores instead of 0.000');
