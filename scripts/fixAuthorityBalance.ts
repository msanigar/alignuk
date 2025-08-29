#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

// Fix auth_1 - make it authoritarian (currently libertarian)
content = content.replace(
  /text: 'Individual freedoms should be prioritized over collective security measures\.'/,
  "text: 'Collective security measures should be prioritized over individual freedoms.'"
);

content = content.replace(
  /rationale: 'This asks whether you prefer individual liberty \(freedom to act as you choose\) versus collective security \(government measures to protect society\)\. Currently the UK balances both with various security laws\.'/,
  "rationale: 'This asks whether you prefer collective security (government measures to protect society) versus individual liberty (freedom to act as you choose). Currently the UK balances both with various security laws.'"
);

// Fix auth_3 - make it authoritarian (currently libertarian)
content = content.replace(
  /text: 'Citizens should have the right to protest even if it disrupts public order\.'/,
  "text: 'Public order should be maintained, even if it means limiting protest rights.'"
);

content = content.replace(
  /rationale: 'This asks whether you prefer the right to protest \(even if disruptive\) versus maintaining public order\. Currently the UK allows peaceful protest but has laws against disruption\.'/,
  "rationale: 'This asks whether you prefer maintaining public order versus the right to protest (even if disruptive). Currently the UK allows peaceful protest but has laws against disruption.'"
);

// Fix auth_5 - make it authoritarian (currently libertarian)
content = content.replace(
  /text: 'Individuals should have the right to choose their own lifestyle, even if others disapprove\.'/,
  "text: 'Society should regulate lifestyle choices to maintain social order.'"
);

content = content.replace(
  /rationale: 'This asks whether you prefer individual lifestyle choices versus social conformity and regulation\. Currently the UK protects many individual rights but has some social regulations\.'/,
  "rationale: 'This asks whether you prefer social conformity and regulation versus individual lifestyle choices. Currently the UK protects many individual rights but has some social regulations.'"
);

// Write the updated content back
fs.writeFileSync(questionsPath, content, 'utf8');

console.log('✅ Authority questions rebalanced to 3 authoritarian vs 3 libertarian!');
console.log('📊 Questions now have equal ideological representation');
console.log('🎯 This should fix the authority axis scoring issues');
