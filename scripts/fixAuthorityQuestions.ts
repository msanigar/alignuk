#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const questionsPath = path.join(__dirname, '../lib/questions.ts');

// Read the questions file
let content = fs.readFileSync(questionsPath, 'utf8');

// Fix auth_2 - make it libertarian (currently authoritarian)
content = content.replace(
  /text: 'The government should have more power to monitor and regulate online content\.'/,
  "text: 'The internet should remain largely unregulated, even if some harmful content exists.'"
);

content = content.replace(
  /rationale: 'This asks whether you prefer government regulation of online content \(to prevent harm\) versus keeping the internet largely unregulated\. Currently the UK is introducing the Online Safety Bill\.'/,
  "rationale: 'This asks whether you prefer keeping the internet unregulated versus government regulation of online content. Currently the UK is introducing the Online Safety Bill.'"
);

content = content.replace(
  /stat: 'The Online Safety Bill aims to regulate social media and search engines\.'/,
  "stat: 'The Online Safety Bill aims to regulate social media and search engines, but many oppose this regulation.'"
);

// Fix auth_4 - make it libertarian (currently authoritarian)
content = content.replace(
  /text: 'The police should have more powers to prevent crime, even if it means less privacy\.'/,
  "text: 'Individual privacy should be protected, even if it limits police powers to prevent crime.'"
);

content = content.replace(
  /rationale: 'This asks whether you prefer giving police more powers \(to prevent crime\) versus protecting individual privacy\. Currently the UK police have significant powers but with some privacy protections\.'/,
  "rationale: 'This asks whether you prefer protecting individual privacy versus giving police more powers to prevent crime. Currently the UK police have significant powers but with some privacy protections.'"
);

content = content.replace(
  /stat: 'UK police have powers to stop and search, with 577,000 searches in 2021\/22\.'/,
  "stat: 'UK police have powers to stop and search, with 577,000 searches in 2021/22, but privacy advocates oppose these powers.'"
);

// Write the updated content back
fs.writeFileSync(questionsPath, content, 'utf8');

console.log('✅ Authority questions rebalanced to 3 libertarian vs 3 authoritarian!');
console.log('📊 Questions now have equal ideological representation');
console.log('🎯 This should fix the authority axis scoring issues');
