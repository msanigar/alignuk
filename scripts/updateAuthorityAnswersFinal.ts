#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Update all personas to reflect the new authority question balance (3 authoritarian vs 3 libertarian)
// New authority questions:
// auth_1: "Collective security prioritized" → AUTHORITARIAN
// auth_2: "Internet unregulated" → LIBERTARIAN  
// auth_3: "Public order maintained" → AUTHORITARIAN
// auth_4: "Privacy protected" → LIBERTARIAN
// auth_5: "Society regulate lifestyle" → AUTHORITARIAN
// auth_6: "Free expression" → LIBERTARIAN

// Far-Left Socialist (libertarian) - disagree with authoritarian, agree with libertarian
content = content.replace(
  /'auth_1': 7,   \/\/ Individual freedoms \(LIBERTARIAN\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Protest rights \(LIBERTARIAN\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Lifestyle choice \(LIBERTARIAN\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);

// Far-Right Libertarian (libertarian) - disagree with authoritarian, agree with libertarian
content = content.replace(
  /'auth_1': 7,   \/\/ Individual freedoms \(LIBERTARIAN\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Protest rights \(LIBERTARIAN\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Lifestyle choice \(LIBERTARIAN\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);

// Left-Libertarian (libertarian) - disagree with authoritarian, agree with libertarian
content = content.replace(
  /'auth_1': 7,   \/\/ Individual freedoms \(LIBERTARIAN\)/,
  "'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_3': 7,   \/\/ Protest rights \(LIBERTARIAN\)/,
  "'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)"
);

content = content.replace(
  /'auth_5': 7,   \/\/ Lifestyle choice \(LIBERTARIAN\)/,
  "'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)"
);

// Center-Left Progressive (center-libertarian) - moderate disagreement with authoritarian, agree with libertarian
content = content.replace(
  /'auth_1': 5,   \/\/ Individual freedoms \(LIBERTARIAN\)/,
  "'auth_1': 3,   // Collective security (AUTHORITARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_3': 5,   \/\/ Protest rights \(LIBERTARIAN\)/,
  "'auth_3': 3,   // Public order (AUTHORITARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_5': 5,   \/\/ Lifestyle choice \(LIBERTARIAN\)/,
  "'auth_5': 3,   // Society regulate lifestyle (AUTHORITARIAN - moderate disagreement)"
);

// Authoritarian Conservative (authoritarian) - agree with authoritarian, disagree with libertarian
content = content.replace(
  /'auth_1': 1,   \/\/ Individual freedoms \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_3': 1,   \/\/ Protest rights \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_5': 1,   \/\/ Lifestyle choice \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_2': 1,   \/\/ Internet unregulated \(AUTHORITARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Privacy protection \(AUTHORITARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_6': 1,   \/\/ Free expression \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - disagree)"
);

// Far-Right Authoritarian (authoritarian) - agree with authoritarian, disagree with libertarian
content = content.replace(
  /'auth_1': 1,   \/\/ Individual freedoms \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_1': 7,   // Collective security (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_3': 1,   \/\/ Protest rights \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_3': 7,   // Public order (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_5': 1,   \/\/ Lifestyle choice \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_2': 1,   \/\/ Internet unregulated \(AUTHORITARIAN - disagree\)/,
  "'auth_2': 1,   // Internet unregulated (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_4': 1,   \/\/ Privacy protection \(AUTHORITARIAN - disagree\)/,
  "'auth_4': 1,   // Privacy protection (LIBERTARIAN - disagree)"
);

content = content.replace(
  /'auth_6': 1,   \/\/ Free expression \(AUTHORITARIAN - strong disagreement\)/,
  "'auth_6': 1,   // Free expression (LIBERTARIAN - disagree)"
);

// Center-Right Conservative (center-authoritarian) - moderate agreement with authoritarian, moderate disagreement with libertarian
content = content.replace(
  /'auth_1': 3,   \/\/ Individual freedoms \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_1': 5,   // Collective security (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_3': 3,   \/\/ Protest rights \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_3': 5,   // Public order (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_5': 3,   \/\/ Lifestyle choice \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_5': 5,   // Society regulate lifestyle (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_2': 3,   \/\/ Internet unregulated \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_2': 3,   // Internet unregulated (LIBERTARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_4': 3,   \/\/ Privacy protection \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_4': 3,   // Privacy protection (LIBERTARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_6': 3,   \/\/ Free expression \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_6': 3,   // Free expression (LIBERTARIAN - moderate disagreement)"
);

// Center-Right Moderate (center-authoritarian) - moderate agreement with authoritarian, moderate disagreement with libertarian
content = content.replace(
  /'auth_1': 3,   \/\/ Individual freedoms \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_1': 5,   // Collective security (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_3': 3,   \/\/ Protest rights \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_3': 5,   // Public order (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_5': 3,   \/\/ Lifestyle choice \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_5': 5,   // Society regulate lifestyle (AUTHORITARIAN)"
);

content = content.replace(
  /'auth_2': 3,   \/\/ Internet unregulated \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_2': 3,   // Internet unregulated (LIBERTARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_4': 3,   \/\/ Privacy protection \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_4': 3,   // Privacy protection (LIBERTARIAN - moderate disagreement)"
);

content = content.replace(
  /'auth_6': 3,   \/\/ Free expression \(AUTHORITARIAN - moderate disagreement\)/,
  "'auth_6': 3,   // Free expression (LIBERTARIAN - moderate disagreement)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Test persona authority answers updated for final balance!');
console.log('📊 Authority axis now has 3 authoritarian vs 3 libertarian questions');
console.log('🎯 This should fix the authority axis scoring issues');
