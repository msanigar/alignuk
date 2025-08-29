#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Read the personas file
let content = fs.readFileSync(personasPath, 'utf8');

// Replace the entire TEST_PERSONAS array with correctly designed personas
const newPersonas = `// Comprehensive test personas across the political spectrum
export const TEST_PERSONAS: TestPersona[] = [
  // LEFT-WING PERSONAS
  {
    name: "Far-Left Socialist",
    description: "Strongly supports government intervention, wealth redistribution, and social equality",
    expectedPosition: {
      economic: 'left',
      authority: 'libertarian',
      social: 'progressive',
      environmental: 'green',
      welfare: 'welfare'
    },
    answers: {
      // Economic (6/6 questions = 100% coverage)
      'econ_1': 7,   // Expand government role in economy (LEFT)
      'econ_2': 1,   // Private providers (LEFT - disagree with privatization)
      'econ_3': 7,   // Higher minimum wage (LEFT)
      'econ_4': 1,   // Lower taxes (LEFT - disagree with tax cuts)
      'econ_5': 1,   // Private businesses (LEFT - disagree)
      'econ_6': 7,   // Universal services (LEFT)
      // Social (6/6 questions = 100% coverage)
      'social_1': 1, // Traditional gender roles (PROGRESSIVE - disagree)
      'social_2': 7, // Diversity in schools (PROGRESSIVE)
      'social_3': 1, // Religious influence (PROGRESSIVE - disagree)
      'social_4': 7, // Immigration benefits (PROGRESSIVE)
      'social_5': 1, // Traditional family structures (PROGRESSIVE - disagree)
      'social_6': 1, // Traditional values (PROGRESSIVE - disagree)
      // Authority (6/6 questions = 100% coverage) - 4 libertarian, 2 authoritarian
      'auth_1': 7,   // Individual freedoms (LIBERTARIAN)
      'auth_2': 1,   // Government monitoring (LIBERTARIAN - disagree)
      'auth_3': 7,   // Protest rights (LIBERTARIAN)
      'auth_4': 1,   // Police powers (LIBERTARIAN - disagree)
      'auth_5': 7,   // Lifestyle choice (LIBERTARIAN)
      'auth_6': 7,   // Free expression (LIBERTARIAN)
      // Sovereignty (6/6 questions = 100% coverage)
      'sovereign_1': 7, // More EU integration (GLOBALIST)
      'sovereign_2': 1, // National sovereignty (GLOBALIST - disagree)
      'sovereign_3': 7, // Global cooperation (GLOBALIST)
      'sovereign_4': 1, // Border controls (GLOBALIST - disagree)
      'sovereign_5': 7, // International institutions (GLOBALIST)
      'sovereign_6': 1, // National independence (GLOBALIST - disagree)
      // Environment (6/6 questions = 100% coverage)
      'env_1': 7,    // Climate action priority (GREEN)
      'env_2': 1,    // Economic growth priority (GREEN - disagree)
      'env_3': 7,    // Renewable energy (GREEN)
      'env_4': 1,    // Fossil fuels (GREEN - disagree)
      'env_5': 7,    // Environmental protection (GREEN)
      'env_6': 1,    // Economic development (GREEN - disagree)
      // Welfare (6/6 questions = 100% coverage)
      'welfare_1': 7,  // Universal basic services (WELFARE)
      'welfare_2': 1,  // Market solutions (WELFARE - disagree)
      'welfare_3': 7,  // Unemployment benefits (WELFARE)
      'welfare_4': 1,  // Work requirements (WELFARE - disagree)
      'welfare_5': 7,  // Social safety net (WELFARE)
      'welfare_6': 1   // Personal responsibility (WELFARE - disagree)
    }
  },

  {
    name: "Center-Left Social Democrat",
    description: "Supports mixed economy, social welfare, and progressive social policies",
    expectedPosition: {
      economic: 'center-left',
      authority: 'center',
      social: 'progressive',
      environmental: 'center-green',
      welfare: 'center-welfare'
    },
    answers: {
      // Economic
      'econ_1': 6,   // Moderate government role (LEFT)
      'econ_2': 3,   // Mixed public/private (LEFT - moderate disagreement)
      'econ_3': 6,   // Higher minimum wage (LEFT)
      'econ_4': 3,   // Balanced taxes (LEFT - moderate disagreement)
      'econ_5': 3,   // Private businesses (LEFT - moderate disagreement)
      'econ_6': 6,   // Universal services (LEFT)
      // Social
      'social_1': 2, // Some traditional roles (PROGRESSIVE - moderate disagreement)
      'social_2': 6, // Diversity in schools (PROGRESSIVE)
      'social_3': 2, // Secular society (PROGRESSIVE - moderate disagreement)
      'social_4': 6, // Immigration benefits (PROGRESSIVE)
      'social_5': 2, // Diverse family structures (PROGRESSIVE - moderate disagreement)
      'social_6': 2, // Traditional values (PROGRESSIVE - moderate disagreement)
      // Authority - CENTER (balanced)
      'auth_1': 4,   // Individual freedoms (CENTER)
      'auth_2': 4,   // Government monitoring (CENTER)
      'auth_3': 4,   // Protest rights (CENTER)
      'auth_4': 4,   // Police powers (CENTER)
      'auth_5': 4,   // Lifestyle choice (CENTER)
      'auth_6': 4,   // Free expression (CENTER)
      // Sovereignty
      'sovereign_1': 5, // Some EU integration (GLOBALIST)
      'sovereign_2': 3, // Some sovereignty (GLOBALIST - moderate disagreement)
      'sovereign_3': 5, // Some cooperation (GLOBALIST)
      'sovereign_4': 3, // Some controls (GLOBALIST - moderate disagreement)
      'sovereign_5': 5, // Some international institutions (GLOBALIST)
      'sovereign_6': 3, // Some independence (GLOBALIST - moderate disagreement)
      // Environment
      'env_1': 6,    // Climate action (GREEN)
      'env_2': 3,    // Balanced growth (GREEN - moderate disagreement)
      'env_3': 6,    // Renewable energy (GREEN)
      'env_4': 3,    // Energy transition (GREEN - moderate disagreement)
      'env_5': 6,    // Environmental protection (GREEN)
      'env_6': 3,    // Balanced development (GREEN - moderate disagreement)
      // Welfare
      'welfare_1': 6,  // Social support (WELFARE)
      'welfare_2': 3,  // Mixed solutions (WELFARE - moderate disagreement)
      'welfare_3': 6,  // Unemployment benefits (WELFARE)
      'welfare_4': 3,  // Some work requirements (WELFARE - moderate disagreement)
      'welfare_5': 6,  // Social safety net (WELFARE)
      'welfare_6': 3   // Some personal responsibility (WELFARE - moderate disagreement)
    }
  },

  {
    name: "Political Centrist",
    description: "Balanced views across all axes, moderate positions",
    expectedPosition: {
      economic: 'center',
      authority: 'center',
      social: 'center',
      environmental: 'center',
      welfare: 'center'
    },
    answers: {
      // Economic - CENTER (all 4s)
      'econ_1': 4,   // Balanced government role (CENTER)
      'econ_2': 4,   // Balanced public/private (CENTER)
      'econ_3': 4,   // Balanced minimum wage (CENTER)
      'econ_4': 4,   // Balanced taxes (CENTER)
      'econ_5': 4,   // Balanced private businesses (CENTER)
      'econ_6': 4,   // Balanced universal services (CENTER)
      // Social - CENTER (all 4s)
      'social_1': 4, // Balanced gender roles (CENTER)
      'social_2': 4, // Balanced diversity (CENTER)
      'social_3': 4, // Balanced religious role (CENTER)
      'social_4': 4, // Balanced immigration (CENTER)
      'social_5': 4, // Balanced family structures (CENTER)
      'social_6': 4, // Balanced traditional values (CENTER)
      // Authority - CENTER (all 4s)
      'auth_1': 4,   // Balanced individual freedoms (CENTER)
      'auth_2': 4,   // Balanced government monitoring (CENTER)
      'auth_3': 4,   // Balanced protest rights (CENTER)
      'auth_4': 4,   // Balanced police powers (CENTER)
      'auth_5': 4,   // Balanced lifestyle choice (CENTER)
      'auth_6': 4,   // Balanced free expression (CENTER)
      // Sovereignty - CENTER (all 4s)
      'sovereign_1': 4, // Balanced EU integration (CENTER)
      'sovereign_2': 4, // Balanced sovereignty (CENTER)
      'sovereign_3': 4, // Balanced cooperation (CENTER)
      'sovereign_4': 4, // Balanced controls (CENTER)
      'sovereign_5': 4, // Balanced institutions (CENTER)
      'sovereign_6': 4, // Balanced independence (CENTER)
      // Environment - CENTER (all 4s)
      'env_1': 4,    // Balanced climate action (CENTER)
      'env_2': 4,    // Balanced growth (CENTER)
      'env_3': 4,    // Balanced renewable energy (CENTER)
      'env_4': 4,    // Balanced fossil fuels (CENTER)
      'env_5': 4,    // Balanced protection (CENTER)
      'env_6': 4,    // Balanced development (CENTER)
      // Welfare - CENTER (all 4s)
      'welfare_1': 4,  // Balanced universal services (CENTER)
      'welfare_2': 4,  // Balanced market solutions (CENTER)
      'welfare_3': 4,  // Balanced unemployment benefits (CENTER)
      'welfare_4': 4,  // Balanced work requirements (CENTER)
      'welfare_5': 4,  // Balanced safety net (CENTER)
      'welfare_6': 4   // Balanced personal responsibility (CENTER)
    }
  },

  {
    name: "Center-Right Conservative",
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
      'econ_1': 2,   // Limited government role (RIGHT - moderate disagreement)
      'econ_2': 6,   // Private providers (RIGHT)
      'econ_3': 2,   // Market wages (RIGHT - moderate disagreement)
      'econ_4': 6,   // Lower taxes (RIGHT)
      'econ_5': 6,   // Private businesses (RIGHT)
      'econ_6': 2,   // Universal services (RIGHT - moderate disagreement)
      // Social
      'social_1': 6, // Traditional gender roles (CONSERVATIVE)
      'social_2': 2, // Diversity in schools (CONSERVATIVE - moderate disagreement)
      'social_3': 6, // Religious values (CONSERVATIVE)
      'social_4': 2, // Immigration benefits (CONSERVATIVE - moderate disagreement)
      'social_5': 6, // Traditional family (CONSERVATIVE)
      'social_6': 6, // Traditional values (CONSERVATIVE)
      // Authority - CENTER-AUTHORITARIAN (slightly authoritarian)
      'auth_1': 3,   // Individual freedoms (AUTHORITARIAN - moderate disagreement)
      'auth_2': 5,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 3,   // Protest rights (AUTHORITARIAN - moderate disagreement)
      'auth_4': 5,   // Police powers (AUTHORITARIAN)
      'auth_5': 3,   // Lifestyle choice (AUTHORITARIAN - moderate disagreement)
      'auth_6': 3,   // Free expression (AUTHORITARIAN - moderate disagreement)
      // Sovereignty
      'sovereign_1': 2, // Limited EU integration (NATIONALIST - moderate disagreement)
      'sovereign_2': 6, // National sovereignty (NATIONALIST)
      'sovereign_3': 2, // Limited cooperation (NATIONALIST - moderate disagreement)
      'sovereign_4': 6, // Border controls (NATIONALIST)
      'sovereign_5': 2, // Limited institutions (NATIONALIST - moderate disagreement)
      'sovereign_6': 6, // National independence (NATIONALIST)
      // Environment
      'env_1': 2,    // Limited climate action (GROWTH - moderate disagreement)
      'env_2': 6,    // Economic growth (GROWTH)
      'env_3': 2,    // Limited renewable energy (GROWTH - moderate disagreement)
      'env_4': 6,    // Fossil fuels (GROWTH)
      'env_5': 2,    // Limited protection (GROWTH - moderate disagreement)
      'env_6': 6,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 2,  // Limited universal services (MARKET - moderate disagreement)
      'welfare_2': 6,  // Market solutions (MARKET)
      'welfare_3': 2,  // Limited unemployment benefits (MARKET - moderate disagreement)
      'welfare_4': 6,  // Work requirements (MARKET)
      'welfare_5': 2,  // Limited safety net (MARKET - moderate disagreement)
      'welfare_6': 6   // Personal responsibility (MARKET)
    }
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
      // Economic
      'econ_1': 1,   // Minimal government role (RIGHT - strong disagreement)
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
      'social_6': 7, // Traditional values (CONSERVATIVE)
      // Authority - LIBERTARIAN (4 libertarian, 2 authoritarian)
      'auth_1': 7,   // Individual freedoms (LIBERTARIAN)
      'auth_2': 1,   // Government monitoring (LIBERTARIAN - strong disagreement)
      'auth_3': 7,   // Protest rights (LIBERTARIAN)
      'auth_4': 1,   // Police powers (LIBERTARIAN - strong disagreement)
      'auth_5': 7,   // Lifestyle choice (LIBERTARIAN)
      'auth_6': 7,   // Free expression (LIBERTARIAN)
      // Sovereignty
      'sovereign_1': 1, // No EU integration (NATIONALIST - strong disagreement)
      'sovereign_2': 7, // National sovereignty (NATIONALIST)
      'sovereign_3': 1, // No cooperation (NATIONALIST - strong disagreement)
      'sovereign_4': 7, // Border controls (NATIONALIST)
      'sovereign_5': 1, // No institutions (NATIONALIST - strong disagreement)
      'sovereign_6': 7, // National independence (NATIONALIST)
      // Environment
      'env_1': 1,    // No climate action (GROWTH - strong disagreement)
      'env_2': 7,    // Economic growth (GROWTH)
      'env_3': 1,    // No renewable energy (GROWTH - strong disagreement)
      'env_4': 7,    // Fossil fuels (GROWTH)
      'env_5': 1,    // No protection (GROWTH - strong disagreement)
      'env_6': 7,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 1,  // No universal services (MARKET - strong disagreement)
      'welfare_2': 7,  // Market solutions (MARKET)
      'welfare_3': 1,  // No unemployment benefits (MARKET - strong disagreement)
      'welfare_4': 7,  // Work requirements (MARKET)
      'welfare_5': 1,  // No safety net (MARKET - strong disagreement)
      'welfare_6': 7   // Personal responsibility (MARKET)
    }
  },

  {
    name: "Authoritarian Conservative",
    description: "Supports strong government control, traditional values, and social order",
    expectedPosition: {
      economic: 'center-right',
      authority: 'authoritarian',
      social: 'conservative',
      environmental: 'growth',
      welfare: 'market'
    },
    answers: {
      // Economic
      'econ_1': 2,   // Limited government role (RIGHT - moderate disagreement)
      'econ_2': 6,   // Private providers (RIGHT)
      'econ_3': 2,   // Market wages (RIGHT - moderate disagreement)
      'econ_4': 6,   // Lower taxes (RIGHT)
      'econ_5': 6,   // Private businesses (RIGHT)
      'econ_6': 2,   // Universal services (RIGHT - moderate disagreement)
      // Social
      'social_1': 7, // Traditional gender roles (CONSERVATIVE)
      'social_2': 1, // Diversity in schools (CONSERVATIVE - strong disagreement)
      'social_3': 7, // Religious values (CONSERVATIVE)
      'social_4': 1, // Immigration benefits (CONSERVATIVE - strong disagreement)
      'social_5': 7, // Traditional family (CONSERVATIVE)
      'social_6': 7, // Traditional values (CONSERVATIVE)
      // Authority - AUTHORITARIAN (2 libertarian, 4 authoritarian)
      'auth_1': 1,   // Individual freedoms (AUTHORITARIAN - strong disagreement)
      'auth_2': 7,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 1,   // Protest rights (AUTHORITARIAN - strong disagreement)
      'auth_4': 7,   // Police powers (AUTHORITARIAN)
      'auth_5': 1,   // Lifestyle choice (AUTHORITARIAN - strong disagreement)
      'auth_6': 1,   // Free expression (AUTHORITARIAN - strong disagreement)
      // Sovereignty
      'sovereign_1': 1, // No EU integration (NATIONALIST - strong disagreement)
      'sovereign_2': 7, // National sovereignty (NATIONALIST)
      'sovereign_3': 1, // No cooperation (NATIONALIST - strong disagreement)
      'sovereign_4': 7, // Border controls (NATIONALIST)
      'sovereign_5': 1, // No institutions (NATIONALIST - strong disagreement)
      'sovereign_6': 7, // National independence (NATIONALIST)
      // Environment
      'env_1': 1,    // No climate action (GROWTH - strong disagreement)
      'env_2': 7,    // Economic growth (GROWTH)
      'env_3': 1,    // No renewable energy (GROWTH - strong disagreement)
      'env_4': 7,    // Fossil fuels (GROWTH)
      'env_5': 1,    // No protection (GROWTH - strong disagreement)
      'env_6': 7,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 1,  // No universal services (MARKET - strong disagreement)
      'welfare_2': 7,  // Market solutions (MARKET)
      'welfare_3': 1,  // No unemployment benefits (MARKET - strong disagreement)
      'welfare_4': 7,  // Work requirements (MARKET)
      'welfare_5': 1,  // No safety net (MARKET - strong disagreement)
      'welfare_6': 7   // Personal responsibility (MARKET)
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
      // Economic
      'econ_1': 7,   // Expand government role in economy (LEFT)
      'econ_2': 1,   // Private providers (LEFT - disagree with privatization)
      'econ_3': 7,   // Higher minimum wage (LEFT)
      'econ_4': 1,   // Lower taxes (LEFT - disagree with tax cuts)
      'econ_5': 1,   // Private businesses (LEFT - disagree)
      'econ_6': 7,   // Universal services (LEFT)
      // Social
      'social_1': 1, // Traditional gender roles (PROGRESSIVE - disagree)
      'social_2': 7, // Diversity in schools (PROGRESSIVE)
      'social_3': 1, // Religious influence (PROGRESSIVE - disagree)
      'social_4': 7, // Immigration benefits (PROGRESSIVE)
      'social_5': 1, // Traditional family structures (PROGRESSIVE - disagree)
      'social_6': 1, // Traditional values (PROGRESSIVE - disagree)
      // Authority - LIBERTARIAN (4 libertarian, 2 authoritarian)
      'auth_1': 7,   // Individual freedoms (LIBERTARIAN)
      'auth_2': 1,   // Government monitoring (LIBERTARIAN - disagree)
      'auth_3': 7,   // Protest rights (LIBERTARIAN)
      'auth_4': 1,   // Police powers (LIBERTARIAN - disagree)
      'auth_5': 7,   // Lifestyle choice (LIBERTARIAN)
      'auth_6': 7,   // Free expression (LIBERTARIAN)
      // Sovereignty
      'sovereign_1': 7, // More EU integration (GLOBALIST)
      'sovereign_2': 1, // National sovereignty (GLOBALIST - disagree)
      'sovereign_3': 7, // Global cooperation (GLOBALIST)
      'sovereign_4': 1, // Border controls (GLOBALIST - disagree)
      'sovereign_5': 7, // International institutions (GLOBALIST)
      'sovereign_6': 1, // National independence (GLOBALIST - disagree)
      // Environment
      'env_1': 7,    // Climate action priority (GREEN)
      'env_2': 1,    // Economic growth priority (GREEN - disagree)
      'env_3': 7,    // Renewable energy (GREEN)
      'env_4': 1,    // Fossil fuels (GREEN - disagree)
      'env_5': 7,    // Environmental protection (GREEN)
      'env_6': 1,    // Economic development (GREEN - disagree)
      // Welfare
      'welfare_1': 7,  // Universal basic services (WELFARE)
      'welfare_2': 1,  // Market solutions (WELFARE - disagree)
      'welfare_3': 7,  // Unemployment benefits (WELFARE)
      'welfare_4': 1,  // Work requirements (WELFARE - disagree)
      'welfare_5': 7,  // Social safety net (WELFARE)
      'welfare_6': 1   // Personal responsibility (WELFARE - disagree)
    }
  },

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
      'social_6': 7, // Traditional values (CONSERVATIVE)
      // Authority - AUTHORITARIAN (2 libertarian, 4 authoritarian)
      'auth_1': 1,   // Individual freedoms (AUTHORITARIAN - strong disagreement)
      'auth_2': 7,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 1,   // Protest rights (AUTHORITARIAN - strong disagreement)
      'auth_4': 7,   // Police powers (AUTHORITARIAN)
      'auth_5': 1,   // Lifestyle choice (AUTHORITARIAN - strong disagreement)
      'auth_6': 1,   // Free expression (AUTHORITARIAN - strong disagreement)
      // Sovereignty
      'sovereign_1': 1, // No EU integration (NATIONALIST - strong disagreement)
      'sovereign_2': 7, // National sovereignty (NATIONALIST)
      'sovereign_3': 1, // No cooperation (NATIONALIST - strong disagreement)
      'sovereign_4': 7, // Border controls (NATIONALIST)
      'sovereign_5': 1, // No institutions (NATIONALIST - strong disagreement)
      'sovereign_6': 7, // National independence (NATIONALIST)
      // Environment
      'env_1': 1,    // No climate action (GROWTH - strong disagreement)
      'env_2': 7,    // Economic growth (GROWTH)
      'env_3': 1,    // No renewable energy (GROWTH - strong disagreement)
      'env_4': 7,    // Fossil fuels (GROWTH)
      'env_5': 1,    // No protection (GROWTH - strong disagreement)
      'env_6': 7,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 1,  // No universal services (MARKET - strong disagreement)
      'welfare_2': 7,  // Market solutions (MARKET)
      'welfare_3': 1,  // No unemployment benefits (MARKET - strong disagreement)
      'welfare_4': 7,  // Work requirements (MARKET)
      'welfare_5': 1,  // No safety net (MARKET - strong disagreement)
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
      'econ_1': 6,   // Moderate government role (LEFT)
      'econ_2': 3,   // Mixed public/private (LEFT - moderate disagreement)
      'econ_3': 6,   // Higher minimum wage (LEFT)
      'econ_4': 3,   // Balanced taxes (LEFT - moderate disagreement)
      'econ_5': 3,   // Private businesses (LEFT - moderate disagreement)
      'econ_6': 6,   // Universal services (LEFT)
      // Social
      'social_1': 2, // Traditional roles (PROGRESSIVE - moderate disagreement)
      'social_2': 6, // Diversity in schools (PROGRESSIVE)
      'social_3': 2, // Religious role (PROGRESSIVE - moderate disagreement)
      'social_4': 6, // Immigration benefits (PROGRESSIVE)
      'social_5': 2, // Traditional family (PROGRESSIVE - moderate disagreement)
      'social_6': 2, // Traditional values (PROGRESSIVE - moderate disagreement)
      // Authority - CENTER-LIBERTARIAN (slightly libertarian)
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
      'env_1': 6,    // Climate action (GREEN)
      'env_2': 3,    // Economic growth (GREEN - moderate disagreement)
      'env_3': 6,    // Renewable energy (GREEN)
      'env_4': 3,    // Fossil fuels (GREEN - moderate disagreement)
      'env_5': 6,    // Environmental protection (GREEN)
      'env_6': 3,    // Economic development (GREEN - moderate disagreement)
      // Welfare
      'welfare_1': 6,  // Universal services (WELFARE)
      'welfare_2': 3,  // Market solutions (WELFARE - moderate disagreement)
      'welfare_3': 6,  // Unemployment benefits (WELFARE)
      'welfare_4': 3,  // Work requirements (WELFARE - moderate disagreement)
      'welfare_5': 6,  // Social safety net (WELFARE)
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
      'econ_1': 2,   // Limited government role (RIGHT - moderate disagreement)
      'econ_2': 6,   // Private providers (RIGHT)
      'econ_3': 2,   // Market wages (RIGHT - moderate disagreement)
      'econ_4': 6,   // Lower taxes (RIGHT)
      'econ_5': 6,   // Private businesses (RIGHT)
      'econ_6': 2,   // Universal services (RIGHT - moderate disagreement)
      // Social
      'social_1': 6, // Traditional gender roles (CONSERVATIVE)
      'social_2': 2, // Diversity in schools (CONSERVATIVE - moderate disagreement)
      'social_3': 6, // Religious values (CONSERVATIVE)
      'social_4': 2, // Immigration benefits (CONSERVATIVE - moderate disagreement)
      'social_5': 6, // Traditional family (CONSERVATIVE)
      'social_6': 6, // Traditional values (CONSERVATIVE)
      // Authority - CENTER-AUTHORITARIAN (slightly authoritarian)
      'auth_1': 3,   // Individual freedoms (AUTHORITARIAN - moderate disagreement)
      'auth_2': 5,   // Government monitoring (AUTHORITARIAN)
      'auth_3': 3,   // Protest rights (AUTHORITARIAN - moderate disagreement)
      'auth_4': 5,   // Police powers (AUTHORITARIAN)
      'auth_5': 3,   // Lifestyle choice (AUTHORITARIAN - moderate disagreement)
      'auth_6': 3,   // Free expression (AUTHORITARIAN - moderate disagreement)
      // Sovereignty
      'sovereign_1': 2, // Limited EU integration (NATIONALIST - moderate disagreement)
      'sovereign_2': 6, // National sovereignty (NATIONALIST)
      'sovereign_3': 2, // Limited cooperation (NATIONALIST - moderate disagreement)
      'sovereign_4': 6, // Border controls (NATIONALIST)
      'sovereign_5': 2, // Limited institutions (NATIONALIST - moderate disagreement)
      'sovereign_6': 6, // National independence (NATIONALIST)
      // Environment
      'env_1': 2,    // Limited climate action (GROWTH - moderate disagreement)
      'env_2': 6,    // Economic growth (GROWTH)
      'env_3': 2,    // Limited renewable energy (GROWTH - moderate disagreement)
      'env_4': 6,    // Fossil fuels (GROWTH)
      'env_5': 2,    // Limited protection (GROWTH - moderate disagreement)
      'env_6': 6,    // Economic development (GROWTH)
      // Welfare
      'welfare_1': 2,  // Limited universal services (MARKET - moderate disagreement)
      'welfare_2': 6,  // Market solutions (MARKET)
      'welfare_3': 2,  // Limited unemployment benefits (MARKET - moderate disagreement)
      'welfare_4': 6,  // Work requirements (MARKET)
      'welfare_5': 2,  // Limited safety net (MARKET - moderate disagreement)
      'welfare_6': 6   // Personal responsibility (MARKET)
    }
  }
];`;

// Replace the entire TEST_PERSONAS array
content = content.replace(
  /\/\/ Comprehensive test personas across the political spectrum[\s\S]*?];/,
  newPersonas
);

// Write the updated content back
fs.writeFileSync(personasPath, content, 'utf8');

console.log('✅ Test personas completely redesigned with correct answer patterns!');
console.log('📊 All personas now have consistent ideological alignment');
console.log('🎯 Authority axis properly balanced (4 libertarian vs 2 authoritarian questions)');
