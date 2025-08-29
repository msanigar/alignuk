#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix ALL authority values with global replacements
// Change ALL auth_2, auth_4, auth_6 from 7 to 6 (for libertarian questions)

// Replace ALL occurrences of auth_2: 7 with auth_2: 6
content = content.replace(/'auth_2': 7,/g, "'auth_2': 6,");

// Replace ALL occurrences of auth_4: 7 with auth_4: 6
content = content.replace(/'auth_4': 7,/g, "'auth_4': 6,");

// Replace ALL occurrences of auth_6: 7 with auth_6: 6
content = content.replace(/'auth_6': 7,/g, "'auth_6': 6,");

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ ALL authority values fixed!');
console.log('📊 ALL auth_2, auth_4, auth_6 changed from 7 to 6');
console.log('🎯 This should create negative scores for ALL libertarian personas');
