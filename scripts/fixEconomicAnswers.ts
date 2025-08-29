#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Fix economic question answers that don't match the actual questions
// Based on the actual question text, not the comments

// Far-Left Socialist - fix econ_5
// Question: "Greater political oversight of the Bank of England would improve accountability" (LEFT-leaning)
// Should be: 7 (agree) not 1 (disagree)
content = content.replace(
  /'econ_5': 1,   \/\/ Private sector services \(LEFT - disagree\)/,
  "'econ_5': 7,   // Political oversight of Bank of England (LEFT)"
);

// Far-Left Socialist - fix econ_6  
// Question: "Reducing business regulation would benefit consumers and growth" (RIGHT-leaning)
// Should be: 1 (disagree) not 7 (agree)
content = content.replace(
  /'econ_6': 7,   \/\/ Universal services \(LEFT\)/,
  "'econ_6': 1,   // Reduce business regulation (LEFT - disagree)"
);

// Center-Left Social Democrat - fix econ_5
content = content.replace(
  /'econ_5': 3,   \/\/ Private businesses \(LEFT - moderate disagreement\)/,
  "'econ_5': 5,   // Political oversight of Bank of England (LEFT - moderate agreement)"
);

// Center-Left Social Democrat - fix econ_6
content = content.replace(
  /'econ_6': 6,   \/\/ Universal services \(LEFT\)/,
  "'econ_6': 3,   // Reduce business regulation (LEFT - moderate disagreement)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Fixed economic question answers!');
console.log('📊 Corrected econ_5 and econ_6 answers to match actual question text');
console.log('🎯 This should fix the economic axis bias');
