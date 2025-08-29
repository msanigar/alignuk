#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Update Far-Right Authoritarian econ_2, econ_4, econ_5 answers
content = content.replace(
  /'econ_2': 7,   \/\/ Private providers \(RIGHT\)/,
  "'econ_2': 7,   // Private companies deliver services (RIGHT)"
);

content = content.replace(
  /'econ_4': 7,   \/\/ Lower taxes \(RIGHT\)/,
  "'econ_4': 7,   // Lower taxes more important (RIGHT)"
);

content = content.replace(
  /'econ_5': 7,   \/\/ Private businesses \(RIGHT\)/,
  "'econ_5': 7,   // Private sector should handle services (RIGHT)"
);

// Update Center-Right Conservative econ_2, econ_4, econ_5 answers
content = content.replace(
  /'econ_2': 4,   \/\/ Government services/,
  "'econ_2': 5,   // Private companies deliver services (RIGHT)"
);

content = content.replace(
  /'econ_4': 4,   \/\/ Government taxes/,
  "'econ_4': 5,   // Lower taxes more important (RIGHT)"
);

content = content.replace(
  /'econ_5': 4,   \/\/ Private businesses \(balanced\)/,
  "'econ_5': 5,   // Private sector should handle services (RIGHT)"
);

// Update Far-Right Libertarian econ_2, econ_4, econ_5 answers
content = content.replace(
  /'econ_2': 7,   \/\/ Private providers only \(RIGHT\)/,
  "'econ_2': 7,   // Private companies deliver services (RIGHT)"
);

content = content.replace(
  /'econ_4': 7,   \/\/ Minimal taxes \(RIGHT\)/,
  "'econ_4': 7,   // Lower taxes more important (RIGHT)"
);

content = content.replace(
  /'econ_5': 7,   \/\/ Private businesses \(RIGHT\)/,
  "'econ_5': 7,   // Private sector should handle services (RIGHT)"
);

// Update Authoritarian Conservative econ_2, econ_4, econ_5 answers
content = content.replace(
  /'econ_2': 4,   \/\/ Government services/,
  "'econ_2': 5,   // Private companies deliver services (RIGHT)"
);

content = content.replace(
  /'econ_4': 4,   \/\/ Government taxes/,
  "'econ_4': 5,   // Lower taxes more important (RIGHT)"
);

content = content.replace(
  /'econ_5': 4,   \/\/ Private businesses \(balanced\)/,
  "'econ_5': 5,   // Private sector should handle services (RIGHT)"
);

// Update Center-Right Moderate econ_2, econ_4, econ_5 answers
content = content.replace(
  /'econ_2': 5,   \/\/ Private providers \(RIGHT\)/,
  "'econ_2': 5,   // Private companies deliver services (RIGHT)"
);

content = content.replace(
  /'econ_4': 5,   \/\/ Lower taxes \(RIGHT\)/,
  "'econ_4': 5,   // Lower taxes more important (RIGHT)"
);

content = content.replace(
  /'econ_5': 5,   \/\/ Private businesses \(RIGHT\)/,
  "'econ_5': 5,   // Private sector should handle services (RIGHT)"
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Test persona answers updated for reframed economic questions!');
console.log('📊 Right-wing personas now have more consistent economic answers');
