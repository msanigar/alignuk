#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

// Fix econ_2 - make it more ideologically neutral
content = content.replace(
  /text: 'Contracting public services to private providers can improve value for money, even if profit is involved\.'/,
  "text: 'Public services should be delivered by private companies rather than government departments.'"
);

content = content.replace(
  /rationale: 'Assesses openness to private provision in public services versus public-only delivery\.'/,
  "rationale: 'Tests preference for private sector delivery versus public sector provision of services.'"
);

// Fix econ_4 - make it more ideologically neutral
content = content.replace(
  /text: 'Reducing tax rates generally encourages growth and investment, even if it means less revenue for public services\.'/,
  "text: 'Lower taxes are more important than funding public services.'"
);

content = content.replace(
  /rationale: 'Tests preference for lower taxes versus funding capacity for public services\.'/,
  "rationale: 'Tests preference for lower taxation versus higher public spending.'"
);

// Fix econ_5 - make it more ideologically neutral
content = content.replace(
  /text: 'Private businesses are generally more efficient than government-run services\.'/,
  "text: 'The private sector should handle most services currently provided by government.'"
);

content = content.replace(
  /rationale: 'Tests preference for private sector efficiency versus public sector provision\.'/,
  "rationale: 'Tests preference for private sector provision versus government provision of services.'"
);

// Write the updated content back
fs.writeFileSync(questionsPath, content, 'utf8');

console.log('✅ Economic questions reframed for better ideological balance!');
console.log('📊 Questions now focus on preferences rather than factual statements');
