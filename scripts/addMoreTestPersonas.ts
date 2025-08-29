#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Add new test personas before the closing bracket
const newPersonas = `
  // ADDITIONAL EDGE CASE PERSONAS
  {
    name: "Far-Right Authoritarian",
    description: "Strongly supports nationalism, traditional values, and strong government control",
    expectedPosition: {
      economic: 'right',
      authority: 'authoritarian',
      social: 'conservative',
      environmental: 'growth',
      welfare: 'market'
    },
    answers: {
      // Economic
      'econ_1': 1,   // Minimal government (RIGHT - strong disagreement)
      'econ_2': 7,   // Private providers (RIGHT)
      'econ_3': 1,   // Market wages (RIGHT - strong disagreement)
      'econ_4': 7,   // Lower taxes (RIGHT)
      'econ_5': 7,   // Private businesses (RIGHT)
      'econ_6': 1,   // Universal services (RIGHT - strong disagreement)
      // Social
      'social_1': 7, // Traditional gender roles (CONSERVATIVE)
      'social_2': 1, // Diversity in schools (CONSERVATIVE - strong disagreement)
      'social_3': 7, // Religious values (CONSERVATIVE)
      'social_4': 1, // Immigration benefits (CONSERVATIVE - strong disagreement)
      'social_5': 7, // Traditional family (CONSERVATIVE)
      'social_6': 1, // Progressive policies (CONSERVATIVE - strong disagreement)
      // Authority
      'auth_1': 1,   // Individual freedoms (AUTHORITARIAN - strong disagreement)
      'auth_2': 7,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 1,   // Protest rights (AUTHORITARIAN - strong disagreement)
      'auth_4': 7,   // Police powers (AUTHORITARIAN)
      'auth_5': 1,   // Lifestyle choice (AUTHORITARIAN - strong disagreement)
      'auth_6': 1,   // Free expression (AUTHORITARIAN - strong disagreement)
      // Sovereignty
      'sovereign_1': 1, // EU integration (NATIONALIST - strong disagreement)
      'sovereign_2': 7, // National sovereignty (NATIONALIST)
      'sovereign_3': 1, // Global cooperation (NATIONALIST - strong disagreement)
      'sovereign_4': 7, // Border controls (NATIONALIST)
      'sovereign_5': 1, // International institutions (NATIONALIST - strong disagreement)
      'sovereign_6': 7, // National independence (NATIONALIST)
      // Environment
      'env_1': 1,    // Climate action (GROWTH - strong disagreement)
      'env_2': 7,    // Economic growth (GROWTH)
      'env_3': 1,    // Renewable energy (GROWTH - strong disagreement)
      'env_4': 7,    // Fossil fuels (GROWTH)
      'env_5': 1,    // Environmental protection (GROWTH - strong disagreement)
      'env_6': 7,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 1,  // Universal services (MARKET - strong disagreement)
      'welfare_2': 7,  // Market solutions (MARKET)
      'welfare_3': 1,  // Unemployment benefits (MARKET - strong disagreement)
      'welfare_4': 7,  // Work requirements (MARKET)
      'welfare_5': 1,  // Social safety net (MARKET - strong disagreement)
      'welfare_6': 7   // Personal responsibility (MARKET)
    }
  },

  {
    name: "Center-Left Progressive",
    description: "Supports social democracy, progressive values, and moderate government intervention",
    expectedPosition: {
      economic: 'center-left',
      authority: 'center-libertarian',
      social: 'progressive',
      environmental: 'center-green',
      welfare: 'center-welfare'
    },
    answers: {
      // Economic
      'econ_1': 5,   // Moderate government role (LEFT)
      'econ_2': 4,   // Mixed public/private (LEFT - moderate disagreement)
      'econ_3': 5,   // Higher minimum wage (LEFT)
      'econ_4': 4,   // Balanced taxes (LEFT - moderate disagreement)
      'econ_5': 4,   // Private businesses (LEFT - moderate disagreement)
      'econ_6': 5,   // Universal services (LEFT)
      // Social
      'social_1': 3, // Traditional roles (PROGRESSIVE - moderate disagreement)
      'social_2': 5, // Diversity in schools (PROGRESSIVE)
      'social_3': 3, // Religious role (PROGRESSIVE - moderate disagreement)
      'social_4': 5, // Immigration benefits (PROGRESSIVE)
      'social_5': 3, // Traditional family (PROGRESSIVE - moderate disagreement)
      'social_6': 5, // Progressive policies (PROGRESSIVE)
      // Authority
      'auth_1': 5,   // Individual freedoms (LIBERTARIAN)
      'auth_2': 3,   // Government monitoring (LIBERTARIAN - moderate disagreement)
      'auth_3': 5,   // Protest rights (LIBERTARIAN)
      'auth_4': 3,   // Police powers (LIBERTARIAN - moderate disagreement)
      'auth_5': 5,   // Lifestyle choice (LIBERTARIAN)
      'auth_6': 5,   // Free expression (LIBERTARIAN)
      // Sovereignty
      'sovereign_1': 5, // EU integration (GLOBALIST)
      'sovereign_2': 3, // National sovereignty (GLOBALIST - moderate disagreement)
      'sovereign_3': 5, // Global cooperation (GLOBALIST)
      'sovereign_4': 3, // Border controls (GLOBALIST - moderate disagreement)
      'sovereign_5': 5, // International institutions (GLOBALIST)
      'sovereign_6': 3, // National independence (GLOBALIST - moderate disagreement)
      // Environment
      'env_1': 5,    // Climate action (GREEN)
      'env_2': 3,    // Economic growth (GREEN - moderate disagreement)
      'env_3': 5,    // Renewable energy (GREEN)
      'env_4': 3,    // Fossil fuels (GREEN - moderate disagreement)
      'env_5': 5,    // Environmental protection (GREEN)
      'env_6': 3,    // Economic development (GREEN - moderate disagreement)
      // Welfare
      'welfare_1': 5,  // Universal services (WELFARE)
      'welfare_2': 3,  // Market solutions (WELFARE - moderate disagreement)
      'welfare_3': 5,  // Unemployment benefits (WELFARE)
      'welfare_4': 3,  // Work requirements (WELFARE - moderate disagreement)
      'welfare_5': 5,  // Social safety net (WELFARE)
      'welfare_6': 3   // Personal responsibility (WELFARE - moderate disagreement)
    }
  },

  {
    name: "Center-Right Moderate",
    description: "Supports free markets, traditional values, and moderate government",
    expectedPosition: {
      economic: 'center-right',
      authority: 'center-authoritarian',
      social: 'center-conservative',
      environmental: 'center-growth',
      welfare: 'center-market'
    },
    answers: {
      // Economic
      'econ_1': 3,   // Limited government role (RIGHT - moderate disagreement)
      'econ_2': 5,   // Private providers (RIGHT)
      'econ_3': 3,   // Market wages (RIGHT - moderate disagreement)
      'econ_4': 5,   // Lower taxes (RIGHT)
      'econ_5': 5,   // Private businesses (RIGHT)
      'econ_6': 3,   // Universal services (RIGHT - moderate disagreement)
      // Social
      'social_1': 5, // Traditional gender roles (CONSERVATIVE)
      'social_2': 3, // Diversity in schools (CONSERVATIVE - moderate disagreement)
      'social_3': 5, // Religious values (CONSERVATIVE)
      'social_4': 3, // Immigration benefits (CONSERVATIVE - moderate disagreement)
      'social_5': 5, // Traditional family (CONSERVATIVE)
      'social_6': 3, // Progressive policies (CONSERVATIVE - moderate disagreement)
      // Authority
      'auth_1': 3,   // Individual freedoms (AUTHORITARIAN - moderate disagreement)
      'auth_2': 5,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 3,   // Protest rights (AUTHORITARIAN - moderate disagreement)
      'auth_4': 5,   // Police powers (AUTHORITARIAN)
      'auth_5': 3,   // Lifestyle choice (AUTHORITARIAN - moderate disagreement)
      'auth_6': 3,   // Free expression (AUTHORITARIAN - moderate disagreement)
      // Sovereignty
      'sovereign_1': 3, // EU integration (NATIONALIST - moderate disagreement)
      'sovereign_2': 5, // National sovereignty (NATIONALIST)
      'sovereign_3': 3, // Global cooperation (NATIONALIST - moderate disagreement)
      'sovereign_4': 5, // Border controls (NATIONALIST)
      'sovereign_5': 3, // International institutions (NATIONALIST - moderate disagreement)
      'sovereign_6': 5, // National independence (NATIONALIST)
      // Environment
      'env_1': 3,    // Climate action (GROWTH - moderate disagreement)
      'env_2': 5,    // Economic growth (GROWTH)
      'env_3': 3,    // Renewable energy (GROWTH - moderate disagreement)
      'env_4': 5,    // Fossil fuels (GROWTH)
      'env_5': 3,    // Environmental protection (GROWTH - moderate disagreement)
      'env_6': 5,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 3,  // Universal services (MARKET - moderate disagreement)
      'welfare_2': 5,  // Market solutions (MARKET)
      'welfare_3': 3,  // Unemployment benefits (MARKET - moderate disagreement)
      'welfare_4': 5,  // Work requirements (MARKET)
      'welfare_5': 3,  // Social safety net (MARKET - moderate disagreement)
      'welfare_6': 5   // Personal responsibility (MARKET)
    }
  }
`;

// Insert new personas before the closing bracket
content = content.replace(
  /];\s*$/,
  `${newPersonas}];`
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Added 3 new test personas:');
console.log('  - Far-Right Authoritarian');
console.log('  - Center-Left Progressive');
console.log('  - Center-Right Moderate');
console.log('📊 Total personas: 10');
