#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Update all personas to reflect the new authority question balance (3 libertarian vs 3 authoritarian)
// For libertarian personas: agree with libertarian questions (auth_1, auth_2, auth_3, auth_4, auth_5, auth_6)
// For authoritarian personas: agree with authoritarian questions (auth_1, auth_2, auth_3, auth_4, auth_5, auth_6)

// Far-Left Socialist (libertarian) - auth_2 and auth_4 are now libertarian
content = content.replace(
  /'auth_2': 1,   \/\/ Government monitoring \(LIBERTARIAN - disagree\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Police powers \(LIBERTARIAN - disagree\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN)"
);

// Far-Right Libertarian (libertarian) - auth_2 and auth_4 are now libertarian
content = content.replace(
  /'auth_2': 1,   \/\/ Government monitoring \(LIBERTARIAN - strong disagreement\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Police powers \(LIBERTARIAN - strong disagreement\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN)"
);

// Left-Libertarian (libertarian) - auth_2 and auth_4 are now libertarian
content = content.replace(
  /'auth_2': 1,   \/\/ Government monitoring \(LIBERTARIAN - disagree\)/,
  "'auth_2': 7,   // Internet unregulated (LIBERTARIAN)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Police powers \(LIBERTARIAN - disagree\)/,
  "'auth_4': 7,   // Privacy protection (LIBERTARIAN)"
);

// Center-Left Progressive (center-libertarian) - auth_2 and auth_4 are now libertarian
content = content.replace(
  /'auth_2': 3,   \/\/ Government monitoring \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_2': 5,   // Internet unregulated (LIBERTARIAN)"
);

content = content.replace(
  /'auth_4': 3,   \/\/ Police powers \(LIBERTARIAN - moderate disagreement\)/,
  "'auth_4': 5,   // Privacy protection (LIBERTARIAN)"
);

// Authoritarian Conservative (authoritarian) - auth_2 and auth_4 are now libertarian, so disagree
content = content.replace(
  /'auth_2': 7,   \/\/ Government monitoring \(AUTHORITARIAN\)/,
  "'auth_2': 1,   // Internet unregulated (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Police powers \(AUTHORITARIAN\)/,
  "'auth_4': 1,   // Privacy protection (AUTHORITARIAN - disagree)"
);

// Far-Right Authoritarian (authoritarian) - auth_2 and auth_4 are now libertarian, so disagree
content = content.replace(
  /'auth_2': 7,   \/\/ Government monitoring \(AUTHORITARIAN\)/,
  "'auth_2': 1,   // Internet unregulated (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_4': 7,   \/\/ Police powers \(AUTHORITARIAN\)/,
  "'auth_4': 1,   // Privacy protection (AUTHORITARIAN - disagree)"
);

// Center-Right Conservative (center-authoritarian) - auth_2 and auth_4 are now libertarian, so moderate disagreement
content = content.replace(
  /'auth_2': 5,   \/\/ Government monitoring \(AUTHORITARIAN\)/,
  "'auth_2': 3,   // Internet unregulated (AUTHORITARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_4': 5,   \/\/ Police powers \(AUTHORITARIAN\)/,
  "'auth_4': 3,   // Privacy protection (AUTHORITARIAN - moderate disagreement)"
);

// Center-Right Moderate (center-authoritarian) - auth_2 and auth_4 are now libertarian, so moderate disagreement
content = content.replace(
  /'auth_2': 5,   \/\/ Government monitoring \(AUTHORITARIAN\)/,
  "'auth_2': 3,   // Internet unregulated (AUTHORITARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_4': 5,   \/\/ Police powers \(AUTHORITARIAN\)/,
  "'auth_4': 3,   // Privacy protection (AUTHORITARIAN - moderate disagreement)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Test persona authority answers updated for rebalanced questions!');
console.log('📊 Authority axis now has 3 libertarian vs 3 authoritarian questions');
console.log('🎯 This should fix the authority axis scoring issues');
