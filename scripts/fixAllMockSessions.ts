#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const scriptsDir = path.join(process.cwd(), 'scripts');

// Files that need fixing
const filesToFix = [
  'createFullQuizPersonas.ts',
  'analyzeEnvironmentBalance.ts',
  'debugSovereigntyScoring.ts',
  'debugScoringAlgorithm.ts',
  'analyzeSovereigntyBalance.ts'
];

filesToFix.forEach(filename => {
  const filePath = path.join(scriptsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern to match mockSession objects missing createdAt
  const pattern = /(const mockSession = \{[^}]*\n\s*answers: Object\.entries\([^}]*\)\.map\([^}]*\)\n\s*\}\);)/g;
  
  if (pattern.test(content)) {
    // Replace the pattern
    content = content.replace(pattern, (match) => {
      // Remove the closing brace and add createdAt
      return match.replace(/}\);$/, '),\n    createdAt: new Date()\n  };');
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filename}`);
  } else {
    console.log(`ℹ️ No changes needed: ${filename}`);
  }
});

console.log('\n🎉 All mockSession objects have been fixed!');
