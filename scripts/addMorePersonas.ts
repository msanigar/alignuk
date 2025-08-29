#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the current personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Add more diverse personas before the closing bracket
const additionalPersonas = `
  },

  {
    name: "Far-Right Libertarian",
    description: "Strongly supports free markets, individual liberty, and minimal government",
    expectedPosition: {
      economic: 'right',
      authority: 'libertarian',
      social: 'conservative',
      environmental: 'growth',
      welfare: 'market'
    },
    answers: {
      // Economic (10/10 questions = 100% coverage) - RIGHT
      'econ_1': 1,   // Expand government role (RIGHT - disagree)
      'econ_2': 7,   // Private providers (RIGHT - agree)
      'econ_3': 1,   // Higher minimum wage (RIGHT - disagree)
      'econ_4': 7,   // Lower taxes (RIGHT - agree)
      'econ_5': 1,   // Political oversight of Bank (RIGHT - disagree)
      'econ_6': 7,   // Reduce business regulation (RIGHT - agree)
      'econ_7': 1,   // Higher taxes on high earners (RIGHT - disagree)
      'econ_8': 1,   // Windfall taxes (RIGHT - disagree)
      'econ_9': 1,   // Public infrastructure (RIGHT - disagree)
      'econ_10': 7,  // Cut red tape (RIGHT - agree)
      // Social (10/10 questions = 100% coverage) - CONSERVATIVE
      'social_1': 7, // Traditional gender roles (CONSERVATIVE)
      'social_2': 1, // Diversity in schools (CONSERVATIVE - disagree)
      'social_3': 7, // Religious influence (CONSERVATIVE)
      'social_4': 1, // Immigration benefits (CONSERVATIVE - disagree)
      'social_5': 7, // Traditional family structures (CONSERVATIVE)
      'social_6': 7, // Traditional values (CONSERVATIVE)
      'social_7': 7, // Traditional education (CONSERVATIVE)
      'social_8': 1, // LGBTQ+ rights (CONSERVATIVE - disagree)
      'social_9': 7, // Traditional media (CONSERVATIVE)
      'social_10': 1, // Cultural diversity (CONSERVATIVE - disagree)
      // Authority (10/10 questions = 100% coverage) - LIBERTARIAN
      'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)
      'auth_2': 7,   // Internet unregulated (LIBERTARIAN)
      'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)
      'auth_4': 7,   // Privacy protection (LIBERTARIAN)
      'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)
      'auth_6': 7,   // Free expression (LIBERTARIAN)
      'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)
      'auth_8': 7,   // Civil liberties (LIBERTARIAN)
      'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)
      'auth_10': 7,  // Individual rights (LIBERTARIAN)
      // Sovereignty (10/10 questions = 100% coverage) - NATIONALIST
      'sovereign_1': 1, // EU integration (NATIONALIST - disagree)
      'sovereign_2': 7, // National sovereignty (NATIONALIST)
      'sovereign_3': 1, // Global cooperation (NATIONALIST - disagree)
      'sovereign_4': 7, // Border controls (NATIONALIST)
      'sovereign_5': 1, // International institutions (NATIONALIST - disagree)
      'sovereign_6': 7, // National independence (NATIONALIST)
      'sovereign_7': 1, // International cooperation (NATIONALIST - disagree)
      'sovereign_8': 7, // National borders (NATIONALIST)
      'sovereign_9': 1, // Global governance (NATIONALIST - disagree)
      'sovereign_10': 7, // National independence (NATIONALIST)
      // Environment (10/10 questions = 100% coverage) - GROWTH
      'env_1': 1,    // Climate action priority (GROWTH - disagree)
      'env_2': 7,    // Economic growth priority (GROWTH)
      'env_3': 1,    // Renewable energy (GROWTH - disagree)
      'env_4': 7,    // Fossil fuels (GROWTH)
      'env_5': 1,    // Environmental protection (GROWTH - disagree)
      'env_6': 7,    // Economic development (GROWTH)
      'env_7': 1,    // Climate regulations (GROWTH - disagree)
      'env_8': 7,    // Economic growth priority (GROWTH)
      'env_9': 1,    // Environmental protection (GROWTH - disagree)
      'env_10': 7,   // Industrial development (GROWTH)
      // Welfare (10/10 questions = 100% coverage) - MARKET
      'welfare_1': 1,  // Universal basic services (MARKET - disagree)
      'welfare_2': 7,  // Market solutions (MARKET)
      'welfare_3': 1,  // Unemployment benefits (MARKET - disagree)
      'welfare_4': 7,  // Work requirements (MARKET)
      'welfare_5': 1,  // Social safety net (MARKET - disagree)
      'welfare_6': 7,  // Personal responsibility (MARKET)
      'welfare_7': 1,  // Universal Basic Income (MARKET - disagree)
      'welfare_8': 7,  // Work requirements (MARKET)
      'welfare_9': 1,  // Free healthcare (MARKET - disagree)
      'welfare_10': 7  // Private healthcare costs (MARKET)
    }
  },

  {
    name: "Authoritarian Conservative",
    description: "Supports strong government control, traditional values, and social order",
    expectedPosition: {
      economic: 'center-right',
      authority: 'authoritarian',
      social: 'conservative',
      environmental: 'center-growth',
      welfare: 'center-market'
    },
    answers: {
      // Economic (10/10 questions = 100% coverage) - CENTER-RIGHT
      'econ_1': 3,   // Expand government role (CENTER-RIGHT - moderate disagreement)
      'econ_2': 5,   // Private providers (CENTER-RIGHT - moderate agreement)
      'econ_3': 3,   // Higher minimum wage (CENTER-RIGHT - moderate disagreement)
      'econ_4': 5,   // Lower taxes (CENTER-RIGHT - moderate agreement)
      'econ_5': 3,   // Political oversight of Bank (CENTER-RIGHT - moderate disagreement)
      'econ_6': 5,   // Reduce business regulation (CENTER-RIGHT - moderate agreement)
      'econ_7': 3,   // Higher taxes on high earners (CENTER-RIGHT - moderate disagreement)
      'econ_8': 3,   // Windfall taxes (CENTER-RIGHT - moderate disagreement)
      'econ_9': 3,   // Public infrastructure (CENTER-RIGHT - moderate disagreement)
      'econ_10': 5,  // Cut red tape (CENTER-RIGHT - moderate agreement)
      // Social (10/10 questions = 100% coverage) - CONSERVATIVE
      'social_1': 6, // Traditional gender roles (CONSERVATIVE)
      'social_2': 2, // Diversity in schools (CONSERVATIVE - moderate disagreement)
      'social_3': 6, // Religious influence (CONSERVATIVE)
      'social_4': 2, // Immigration benefits (CONSERVATIVE - moderate disagreement)
      'social_5': 6, // Traditional family structures (CONSERVATIVE)
      'social_6': 6, // Traditional values (CONSERVATIVE)
      'social_7': 6, // Traditional education (CONSERVATIVE)
      'social_8': 2, // LGBTQ+ rights (CONSERVATIVE - moderate disagreement)
      'social_9': 6, // Traditional media (CONSERVATIVE)
      'social_10': 2, // Cultural diversity (CONSERVATIVE - moderate disagreement)
      // Authority (10/10 questions = 100% coverage) - AUTHORITARIAN
      'auth_1': 6,   // Collective security (AUTHORITARIAN)
      'auth_2': 2,   // Internet unregulated (LIBERTARIAN - moderate disagreement)
      'auth_3': 6,   // Public order (AUTHORITARIAN)
      'auth_4': 2,   // Privacy protection (LIBERTARIAN - moderate disagreement)
      'auth_5': 6,   // Society regulate lifestyle (AUTHORITARIAN)
      'auth_6': 2,   // Free expression (LIBERTARIAN - moderate disagreement)
      'auth_7': 6,   // Government surveillance (AUTHORITARIAN)
      'auth_8': 2,   // Civil liberties (LIBERTARIAN - moderate disagreement)
      'auth_9': 6,   // Law enforcement powers (AUTHORITARIAN)
      'auth_10': 2,  // Individual rights (LIBERTARIAN - moderate disagreement)
      // Sovereignty (10/10 questions = 100% coverage) - NATIONALIST
      'sovereign_1': 2, // EU integration (NATIONALIST - moderate disagreement)
      'sovereign_2': 6, // National sovereignty (NATIONALIST)
      'sovereign_3': 2, // Global cooperation (NATIONALIST - moderate disagreement)
      'sovereign_4': 6, // Border controls (NATIONALIST)
      'sovereign_5': 2, // International institutions (NATIONALIST - moderate disagreement)
      'sovereign_6': 6, // National independence (NATIONALIST)
      'sovereign_7': 2, // International cooperation (NATIONALIST - moderate disagreement)
      'sovereign_8': 6, // National borders (NATIONALIST)
      'sovereign_9': 2, // Global governance (NATIONALIST - moderate disagreement)
      'sovereign_10': 6, // National independence (NATIONALIST)
      // Environment (10/10 questions = 100% coverage) - CENTER-GROWTH
      'env_1': 3,    // Climate action priority (CENTER-GROWTH - moderate disagreement)
      'env_2': 5,    // Economic growth priority (CENTER-GROWTH)
      'env_3': 3,    // Renewable energy (CENTER-GROWTH - moderate disagreement)
      'env_4': 5,    // Fossil fuels (CENTER-GROWTH)
      'env_5': 3,    // Environmental protection (CENTER-GROWTH - moderate disagreement)
      'env_6': 5,    // Economic development (CENTER-GROWTH)
      'env_7': 3,    // Climate regulations (CENTER-GROWTH - moderate disagreement)
      'env_8': 5,    // Economic growth priority (CENTER-GROWTH)
      'env_9': 3,    // Environmental protection (CENTER-GROWTH - moderate disagreement)
      'env_10': 5,   // Industrial development (CENTER-GROWTH)
      // Welfare (10/10 questions = 100% coverage) - CENTER-MARKET
      'welfare_1': 3,  // Universal basic services (CENTER-MARKET - moderate disagreement)
      'welfare_2': 5,  // Market solutions (CENTER-MARKET)
      'welfare_3': 3,  // Unemployment benefits (CENTER-MARKET - moderate disagreement)
      'welfare_4': 5,  // Work requirements (CENTER-MARKET)
      'welfare_5': 3,  // Social safety net (CENTER-MARKET - moderate disagreement)
      'welfare_6': 5,  // Personal responsibility (CENTER-MARKET)
      'welfare_7': 3,  // Universal Basic Income (CENTER-MARKET - moderate disagreement)
      'welfare_8': 5,  // Work requirements (CENTER-MARKET)
      'welfare_9': 3,  // Free healthcare (CENTER-MARKET - moderate disagreement)
      'welfare_10': 5  // Private healthcare costs (CENTER-MARKET)
    }
  },

  {
    name: "Left-Libertarian",
    description: "Supports social equality, individual freedom, and environmental protection",
    expectedPosition: {
      economic: 'left',
      authority: 'libertarian',
      social: 'progressive',
      environmental: 'green',
      welfare: 'welfare'
    },
    answers: {
      // Economic (10/10 questions = 100% coverage) - LEFT
      'econ_1': 6,   // Expand government role (LEFT)
      'econ_2': 2,   // Private providers (LEFT - moderate disagreement)
      'econ_3': 6,   // Higher minimum wage (LEFT)
      'econ_4': 2,   // Lower taxes (LEFT - moderate disagreement)
      'econ_5': 6,   // Political oversight of Bank (LEFT)
      'econ_6': 2,   // Reduce business regulation (LEFT - moderate disagreement)
      'econ_7': 6,   // Higher taxes on high earners (LEFT)
      'econ_8': 6,   // Windfall taxes (LEFT)
      'econ_9': 6,   // Public infrastructure (LEFT)
      'econ_10': 2,  // Cut red tape (LEFT - moderate disagreement)
      // Social (10/10 questions = 100% coverage) - PROGRESSIVE
      'social_1': 2, // Traditional gender roles (PROGRESSIVE - moderate disagreement)
      'social_2': 6, // Diversity in schools (PROGRESSIVE)
      'social_3': 2, // Religious influence (PROGRESSIVE - moderate disagreement)
      'social_4': 6, // Immigration benefits (PROGRESSIVE)
      'social_5': 2, // Traditional family structures (PROGRESSIVE - moderate disagreement)
      'social_6': 2, // Traditional values (PROGRESSIVE - moderate disagreement)
      'social_7': 2, // Traditional education (PROGRESSIVE - moderate disagreement)
      'social_8': 6, // LGBTQ+ rights (PROGRESSIVE)
      'social_9': 2, // Traditional media (PROGRESSIVE - moderate disagreement)
      'social_10': 6, // Cultural diversity (PROGRESSIVE)
      // Authority (10/10 questions = 100% coverage) - LIBERTARIAN
      'auth_1': 2,   // Collective security (AUTHORITARIAN - moderate disagreement)
      'auth_2': 6,   // Internet unregulated (LIBERTARIAN)
      'auth_3': 2,   // Public order (AUTHORITARIAN - moderate disagreement)
      'auth_4': 6,   // Privacy protection (LIBERTARIAN)
      'auth_5': 2,   // Society regulate lifestyle (AUTHORITARIAN - moderate disagreement)
      'auth_6': 6,   // Free expression (LIBERTARIAN)
      'auth_7': 2,   // Government surveillance (LIBERTARIAN - moderate disagreement)
      'auth_8': 6,   // Civil liberties (LIBERTARIAN)
      'auth_9': 2,   // Law enforcement powers (LIBERTARIAN - moderate disagreement)
      'auth_10': 6,  // Individual rights (LIBERTARIAN)
      // Sovereignty (10/10 questions = 100% coverage) - GLOBALIST
      'sovereign_1': 6, // EU integration (GLOBALIST)
      'sovereign_2': 2, // National sovereignty (GLOBALIST - moderate disagreement)
      'sovereign_3': 6, // Global cooperation (GLOBALIST)
      'sovereign_4': 2, // Border controls (GLOBALIST - moderate disagreement)
      'sovereign_5': 6, // International institutions (GLOBALIST)
      'sovereign_6': 2, // National independence (GLOBALIST - moderate disagreement)
      'sovereign_7': 6, // International cooperation (GLOBALIST)
      'sovereign_8': 2, // National borders (GLOBALIST - moderate disagreement)
      'sovereign_9': 6, // Global governance (GLOBALIST)
      'sovereign_10': 2, // National independence (GLOBALIST - moderate disagreement)
      // Environment (10/10 questions = 100% coverage) - GREEN
      'env_1': 6,    // Climate action priority (GREEN)
      'env_2': 2,    // Economic growth priority (GREEN - moderate disagreement)
      'env_3': 6,    // Renewable energy (GREEN)
      'env_4': 2,    // Fossil fuels (GREEN - moderate disagreement)
      'env_5': 6,    // Environmental protection (GREEN)
      'env_6': 2,    // Economic development (GREEN - moderate disagreement)
      'env_7': 6,    // Climate regulations (GREEN)
      'env_8': 2,    // Economic growth priority (GREEN - moderate disagreement)
      'env_9': 6,    // Environmental protection (GREEN)
      'env_10': 2,   // Industrial development (GREEN - moderate disagreement)
      // Welfare (10/10 questions = 100% coverage) - WELFARE
      'welfare_1': 6,  // Universal basic services (WELFARE)
      'welfare_2': 2,  // Market solutions (WELFARE - moderate disagreement)
      'welfare_3': 6,  // Unemployment benefits (WELFARE)
      'welfare_4': 2,  // Work requirements (WELFARE - moderate disagreement)
      'welfare_5': 6,  // Social safety net (WELFARE)
      'welfare_6': 2,  // Personal responsibility (WELFARE - moderate disagreement)
      'welfare_7': 6,  // Universal Basic Income (WELFARE)
      'welfare_8': 2,  // Work requirements (WELFARE - moderate disagreement)
      'welfare_9': 6,  // Free healthcare (WELFARE)
      'welfare_10': 2  // Private healthcare costs (WELFARE - moderate disagreement)
    }
  }
`;

// Insert the additional personas before the closing bracket
content = content.replace(
  /  }\n];/,
  additionalPersonas + '\n];'
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Added 3 new diverse test personas!');
console.log('📊 New personas:');
console.log('  - Far-Right Libertarian (right/libertarian/conservative)');
console.log('  - Authoritarian Conservative (center-right/authoritarian/conservative)');
console.log('  - Left-Libertarian (left/libertarian/progressive)');
console.log('🎯 Ready to test 100% accuracy across 6 personas (18 axis tests)');
