#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix authority values with simple replacements
// Libertarian personas: change auth_2, auth_4, auth_6 from 7 to 6
// Authoritarian personas: change auth_2, auth_4, auth_6 from 1 to 1 (no change needed)

// Far-Left Socialist (libertarian) - change auth_2, auth_4, auth_6 from 7 to 6
content = content.replace(
  /'auth_2': 7,/,
  "'auth_2': 6,"
);

content = content.replace(
  /'auth_4': 7,/,
  "'auth_4': 6,"
);

content = content.replace(
  /'auth_6': 7,/,
  "'auth_6': 6,"
);

// Far-Right Libertarian (libertarian) - change auth_2, auth_4, auth_6 from 7 to 6
// (already handled by above replacements)

// Left-Libertarian (libertarian) - change auth_2, auth_4, auth_6 from 7 to 6
// (already handled by above replacements)

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Authority values fixed!');
console.log('📊 Libertarian personas: auth_2, auth_4, auth_6 changed from 7 to 6');
console.log('🎯 This should create negative scores for libertarian personas');
