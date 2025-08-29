#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Add auth_5 and auth_6 to Far-Right Libertarian
content = content.replace(
  /'auth_4': 7,   \/\/ Maximum privacy\n      \/\/ Sovereignty/,
  "'auth_4': 7,   // Maximum privacy\n      'auth_5': 7,   // Lifestyle choice (LIBERTARIAN)\n      'auth_6': 7,   // Free expression (LIBERTARIAN)\n      // Sovereignty"
);

// Add auth_5 and auth_6 to Authoritarian Conservative
content = content.replace(
  /'auth_4': 2,   \/\/ Limited privacy\n      \/\/ Sovereignty/,
  "'auth_4': 2,   // Limited privacy\n      'auth_5': 2,   // Lifestyle choice (AUTHORITARIAN - disagree)\n      'auth_6': 2,   // Free expression (AUTHORITARIAN - disagree)\n      // Sovereignty"
);

// Add auth_5 and auth_6 to Left-Libertarian
content = content.replace(
  /'auth_4': 7,   \/\/ Maximum privacy\n      \/\/ Sovereignty/,
  "'auth_4': 7,   // Maximum privacy\n      'auth_5': 7,   // Lifestyle choice (LIBERTARIAN)\n      'auth_6': 7,   // Free expression (LIBERTARIAN)\n      // Sovereignty"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Test personas updated with auth_5 and auth_6 answers!');
