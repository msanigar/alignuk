#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const personasPath = path.join(__dirname, '../lib/testPersonas.ts');

// Create new content with full 60-question personas
const newContent = `import { TestPersona } from './types';

export const TEST_PERSONAS: TestPersona[] = [
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
      // Economic (10/10 questions = 100% coverage)
      'econ_1': 7,   // Expand government role (LEFT)
      'econ_2': 1,   // Private providers (LEFT - disagree)
      'econ_3': 7,   // Higher minimum wage (LEFT)
      'econ_4': 1,   // Lower taxes (LEFT - disagree)
      'econ_5': 1,   // Private sector services (LEFT - disagree)
      'econ_6': 7,   // Universal services (LEFT)
      'econ_7': 7,   // Higher taxes on high earners (LEFT)
      'econ_8': 7,   // Windfall taxes (LEFT)
      'econ_9': 7,   // Public infrastructure (LEFT)
      'econ_10': 1,  // Cutting red tape (LEFT - disagree)
      // Social (10/10 questions = 100% coverage)
      'social_1': 1, // Traditional gender roles (PROGRESSIVE - disagree)
      'social_2': 7, // Diversity in schools (PROGRESSIVE)
      'social_3': 1, // Religious influence (PROGRESSIVE - disagree)
      'social_4': 7, // Immigration benefits (PROGRESSIVE)
      'social_5': 1, // Traditional family structures (PROGRESSIVE - disagree)
      'social_6': 1, // Traditional values (PROGRESSIVE - disagree)
      'social_7': 1, // Traditional education (PROGRESSIVE - disagree)
      'social_8': 7, // LGBTQ+ rights (PROGRESSIVE)
      'social_9': 1, // Traditional media (PROGRESSIVE - disagree)
      'social_10': 7, // Cultural diversity (PROGRESSIVE)
      // Authority (10/10 questions = 100% coverage)
      'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)
      'auth_2': 6,   // Internet unregulated (LIBERTARIAN)
      'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)
      'auth_4': 6,   // Privacy protection (LIBERTARIAN)
      'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)
      'auth_6': 6,   // Free expression (LIBERTARIAN)
      'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)
      'auth_8': 7,   // Civil liberties (LIBERTARIAN)
      'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)
      'auth_10': 7,  // Individual rights (LIBERTARIAN)
      // Sovereignty (10/10 questions = 100% coverage)
      'sovereign_1': 7, // More EU integration (GLOBALIST)
      'sovereign_2': 1, // National sovereignty (GLOBALIST - disagree)
      'sovereign_3': 7, // Global cooperation (GLOBALIST)
      'sovereign_4': 1, // Border controls (GLOBALIST - disagree)
      'sovereign_5': 7, // International institutions (GLOBALIST)
      'sovereign_6': 1, // National independence (GLOBALIST - disagree)
      'sovereign_7': 7, // International cooperation (GLOBALIST)
      'sovereign_8': 1, // National borders (GLOBALIST - disagree)
      'sovereign_9': 7, // Global governance (GLOBALIST)
      'sovereign_10': 1, // National independence (GLOBALIST - disagree)
      // Environment (10/10 questions = 100% coverage)
      'env_1': 7,    // Climate action priority (GREEN)
      'env_2': 1,    // Economic growth priority (GREEN - disagree)
      'env_3': 7,    // Renewable energy (GREEN)
      'env_4': 1,    // Fossil fuels (GREEN - disagree)
      'env_5': 7,    // Environmental protection (GREEN)
      'env_6': 1,    // Economic development (GREEN - disagree)
      'env_7': 7,    // Climate regulations (GREEN)
      'env_8': 1,    // Economic growth priority (GREEN - disagree)
      'env_9': 7,    // Environmental protection (GREEN)
      'env_10': 1,   // Industrial development (GREEN - disagree)
      // Welfare (10/10 questions = 100% coverage)
      'welfare_1': 7,  // Universal basic services (WELFARE)
      'welfare_2': 1,  // Market solutions (WELFARE - disagree)
      'welfare_3': 7,  // Unemployment benefits (WELFARE)
      'welfare_4': 1,  // Work requirements (WELFARE - disagree)
      'welfare_5': 7,  // Social safety net (WELFARE)
      'welfare_6': 1,  // Personal responsibility (WELFARE - disagree)
      'welfare_7': 7,  // Universal Basic Income (WELFARE)
      'welfare_8': 1,  // Work requirements (WELFARE - disagree)
      'welfare_9': 7,  // Free healthcare (WELFARE)
      'welfare_10': 1  // Private healthcare costs (WELFARE - disagree)
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
      // Economic (10/10 questions = 100% coverage)
      'econ_1': 6,   // Moderate government role (LEFT)
      'econ_2': 3,   // Mixed public/private (LEFT - moderate disagreement)
      'econ_3': 6,   // Higher minimum wage (LEFT)
      'econ_4': 3,   // Balanced taxes (LEFT - moderate disagreement)
      'econ_5': 3,   // Private businesses (LEFT - moderate disagreement)
      'econ_6': 6,   // Universal services (LEFT)
      'econ_7': 5,   // Some higher taxes (LEFT)
      'econ_8': 5,   // Some windfall taxes (LEFT)
      'econ_9': 5,   // Some public infrastructure (LEFT)
      'econ_10': 3,  // Some red tape cutting (LEFT - moderate disagreement)
      // Social (10/10 questions = 100% coverage)
      'social_1': 2, // Some traditional roles (PROGRESSIVE - moderate disagreement)
      'social_2': 6, // Diversity in schools (PROGRESSIVE)
      'social_3': 2, // Secular society (PROGRESSIVE - moderate disagreement)
      'social_4': 6, // Immigration benefits (PROGRESSIVE)
      'social_5': 2, // Diverse family structures (PROGRESSIVE - moderate disagreement)
      'social_6': 2, // Traditional values (PROGRESSIVE - moderate disagreement)
      'social_7': 3, // Some traditional education (PROGRESSIVE - moderate disagreement)
      'social_8': 5, // Some LGBTQ+ rights (PROGRESSIVE)
      'social_9': 3, // Some traditional media (PROGRESSIVE - moderate disagreement)
      'social_10': 5, // Some cultural diversity (PROGRESSIVE)
      // Authority (10/10 questions = 100% coverage) - CENTER (balanced)
      'auth_1': 4,   // Individual freedoms (CENTER)
      'auth_2': 4,   // Government monitoring (CENTER)
      'auth_3': 4,   // Protest rights (CENTER)
      'auth_4': 4,   // Police powers (CENTER)
      'auth_5': 4,   // Lifestyle choice (CENTER)
      'auth_6': 4,   // Free expression (CENTER)
      'auth_7': 4,   // Balanced surveillance (CENTER)
      'auth_8': 4,   // Balanced civil liberties (CENTER)
      'auth_9': 4,   // Balanced law enforcement (CENTER)
      'auth_10': 4,  // Balanced individual rights (CENTER)
      // Sovereignty (10/10 questions = 100% coverage)
      'sovereign_1': 5, // Some EU integration (GLOBALIST)
      'sovereign_2': 3, // Some sovereignty (GLOBALIST - moderate disagreement)
      'sovereign_3': 5, // Some cooperation (GLOBALIST)
      'sovereign_4': 3, // Some controls (GLOBALIST - moderate disagreement)
      'sovereign_5': 5, // Some international institutions (GLOBALIST)
      'sovereign_6': 3, // Some independence (GLOBALIST - moderate disagreement)
      'sovereign_7': 5, // Some international cooperation (GLOBALIST)
      'sovereign_8': 3, // Some national borders (GLOBALIST - moderate disagreement)
      'sovereign_9': 5, // Some global governance (GLOBALIST)
      'sovereign_10': 3, // Some national independence (GLOBALIST - moderate disagreement)
      // Environment (10/10 questions = 100% coverage)
      'env_1': 6,    // Climate action (GREEN)
      'env_2': 3,    // Balanced growth (GREEN - moderate disagreement)
      'env_3': 6,    // Renewable energy (GREEN)
      'env_4': 3,    // Energy transition (GREEN - moderate disagreement)
      'env_5': 6,    // Environmental protection (GREEN)
      'env_6': 3,    // Balanced development (GREEN - moderate disagreement)
      'env_7': 5,    // Some climate regulations (GREEN)
      'env_8': 3,    // Some economic growth priority (GREEN - moderate disagreement)
      'env_9': 5,    // Some environmental protection (GREEN)
      'env_10': 3,   // Some industrial development (GREEN - moderate disagreement)
      // Welfare (10/10 questions = 100% coverage)
      'welfare_1': 6,  // Social support (WELFARE)
      'welfare_2': 3,  // Mixed solutions (WELFARE - moderate disagreement)
      'welfare_3': 6,  // Unemployment benefits (WELFARE)
      'welfare_4': 3,  // Some work requirements (WELFARE - moderate disagreement)
      'welfare_5': 6,  // Social safety net (WELFARE)
      'welfare_6': 3,  // Some personal responsibility (WELFARE - moderate disagreement)
      'welfare_7': 5,  // Some UBI support (WELFARE)
      'welfare_8': 3,  // Some work requirements (WELFARE - moderate disagreement)
      'welfare_9': 6,  // Free healthcare (WELFARE)
      'welfare_10': 3  // Some private costs (WELFARE - moderate disagreement)
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
      // Economic (10/10 questions = 100% coverage) - CENTER (balanced)
      'econ_1': 4,   // Government role (CENTER)
      'econ_2': 4,   // Private providers (CENTER)
      'econ_3': 4,   // Minimum wage (CENTER)
      'econ_4': 4,   // Taxes (CENTER)
      'econ_5': 4,   // Private sector (CENTER)
      'econ_6': 4,   // Universal services (CENTER)
      'econ_7': 4,   // Higher taxes on high earners (CENTER)
      'econ_8': 4,   // Windfall taxes (CENTER)
      'econ_9': 4,   // Public infrastructure (CENTER)
      'econ_10': 4,  // Cutting red tape (CENTER)
      // Social (10/10 questions = 100% coverage) - CENTER (balanced)
      'social_1': 4, // Gender roles (CENTER)
      'social_2': 4, // Diversity in schools (CENTER)
      'social_3': 4, // Religious influence (CENTER)
      'social_4': 4, // Immigration benefits (CENTER)
      'social_5': 4, // Family structures (CENTER)
      'social_6': 4, // Traditional values (CENTER)
      'social_7': 4, // Traditional education (CENTER)
      'social_8': 4, // LGBTQ+ rights (CENTER)
      'social_9': 4, // Traditional media (CENTER)
      'social_10': 4, // Cultural diversity (CENTER)
      // Authority (10/10 questions = 100% coverage) - CENTER (balanced)
      'auth_1': 4,   // Collective security (CENTER)
      'auth_2': 4,   // Internet regulation (CENTER)
      'auth_3': 4,   // Public order (CENTER)
      'auth_4': 4,   // Privacy protection (CENTER)
      'auth_5': 4,   // Lifestyle regulation (CENTER)
      'auth_6': 4,   // Free expression (CENTER)
      'auth_7': 4,   // Government surveillance (CENTER)
      'auth_8': 4,   // Civil liberties (CENTER)
      'auth_9': 4,   // Law enforcement powers (CENTER)
      'auth_10': 4,  // Individual rights (CENTER)
      // Sovereignty (10/10 questions = 100% coverage) - CENTER (balanced)
      'sovereign_1': 4, // EU integration (CENTER)
      'sovereign_2': 4, // National sovereignty (CENTER)
      'sovereign_3': 4, // Global cooperation (CENTER)
      'sovereign_4': 4, // Border controls (CENTER)
      'sovereign_5': 4, // International institutions (CENTER)
      'sovereign_6': 4, // National independence (CENTER)
      'sovereign_7': 4, // International cooperation (CENTER)
      'sovereign_8': 4, // National borders (CENTER)
      'sovereign_9': 4, // Global governance (CENTER)
      'sovereign_10': 4, // National independence (CENTER)
      // Environment (10/10 questions = 100% coverage) - CENTER (balanced)
      'env_1': 4,    // Climate action (CENTER)
      'env_2': 4,    // Economic growth (CENTER)
      'env_3': 4,    // Renewable energy (CENTER)
      'env_4': 4,    // Fossil fuels (CENTER)
      'env_5': 4,    // Environmental protection (CENTER)
      'env_6': 4,    // Economic development (CENTER)
      'env_7': 4,    // Climate regulations (CENTER)
      'env_8': 4,    // Economic growth priority (CENTER)
      'env_9': 4,    // Environmental protection (CENTER)
      'env_10': 4,   // Industrial development (CENTER)
      // Welfare (10/10 questions = 100% coverage) - CENTER (balanced)
      'welfare_1': 4,  // Universal services (CENTER)
      'welfare_2': 4,  // Market solutions (CENTER)
      'welfare_3': 4,  // Unemployment benefits (CENTER)
      'welfare_4': 4,  // Work requirements (CENTER)
      'welfare_5': 4,  // Social safety net (CENTER)
      'welfare_6': 4,  // Personal responsibility (CENTER)
      'welfare_7': 4,  // UBI (CENTER)
      'welfare_8': 4,  // Work requirements (CENTER)
      'welfare_9': 4,  // Free healthcare (CENTER)
      'welfare_10': 4  // Private healthcare costs (CENTER)
    }
  }
];

// Rest of the file content (interfaces, functions, etc.)
export interface TestResult {
  persona: TestPersona;
  scores: any;
  analysis: {
    expectedVsActual: {
      economic: { expected: string; actual: string; match: boolean };
      authority: { expected: string; actual: string; match: boolean };
      social: { expected: string; actual: string; match: boolean };
      environmental: { expected: string; actual: string; match: boolean };
      welfare: { expected: string; actual: string; match: boolean };
    };
    biasAnalysis: {
      overallBias: 'left' | 'right' | 'center' | 'none';
      authorityBias: 'authoritarian' | 'libertarian' | 'center' | 'none';
      confidence: number;
    };
  };
}

export function runPersonaTest(persona: TestPersona): TestResult {
  // Mock quiz session for testing
  const mockSession = {
    id: 'test-session',
    userId: 'test-user',
    answers: Object.entries(persona.answers).map(([questionId, value]) => ({
      questionId,
      value
    })),
    createdAt: new Date()
  };

  // Import scoring functions
  const { calculateScores } = require('./scoring');
  const { generateTags } = require('./scoring');
  const { PARTY_VECTORS } = require('./parties');

  // Calculate scores
  const scoringResult = calculateScores(mockSession);
  
  // Generate tags
  const tags = generateTags(scoringResult.scores);
  
  // Calculate party matches
  const partyMatches = PARTY_VECTORS.map(party => {
    const match = calculatePartyMatch(scoringResult.scores, party.vector);
    return { ...party, match };
  }).sort((a, b) => b.match - a.match);

  // Analyze results
  const analysis = analyzeResults(persona, scoringResult.scores);

  return {
    persona,
    scores: scoringResult.scores,
    analysis
  };
}

export function runAllPersonaTests(): TestResult[] {
  return TEST_PERSONAS.map(runPersonaTest);
}

function calculatePartyMatch(scores: any[], partyVector: any): number {
  // Simple cosine similarity calculation
  const dotProduct = scores.reduce((sum, score, i) => sum + score.score * partyVector[i], 0);
  const magnitudeA = Math.sqrt(scores.reduce((sum, score) => sum + score.score * score.score, 0));
  const magnitudeB = Math.sqrt(partyVector.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

function analyzeResults(persona: TestPersona, scores: any): TestResult['analysis'] {
  const actualPositions = {
    economic: scoreToPosition(scores.find(s => s.axis === 'economic')?.score || 0, 'economic'),
    authority: scoreToPosition(scores.find(s => s.axis === 'authority')?.score || 0, 'authority'),
    social: scoreToPosition(scores.find(s => s.axis === 'social')?.score || 0, 'social'),
    environmental: scoreToPosition(scores.find(s => s.axis === 'environmental')?.score || 0, 'environmental'),
    welfare: scoreToPosition(scores.find(s => s.axis === 'welfare')?.score || 0, 'welfare')
  };

  const expectedVsActual = {
    economic: {
      expected: persona.expectedPosition.economic,
      actual: actualPositions.economic,
      match: persona.expectedPosition.economic === actualPositions.economic
    },
    authority: {
      expected: persona.expectedPosition.authority,
      actual: actualPositions.authority,
      match: persona.expectedPosition.authority === actualPositions.authority
    },
    social: {
      expected: persona.expectedPosition.social,
      actual: actualPositions.social,
      match: persona.expectedPosition.social === actualPositions.social
    },
    environmental: {
      expected: persona.expectedPosition.environmental,
      actual: actualPositions.environmental,
      match: persona.expectedPosition.environmental === actualPositions.environmental
    },
    welfare: {
      expected: persona.expectedPosition.welfare,
      actual: actualPositions.welfare,
      match: persona.expectedPosition.welfare === actualPositions.welfare
    }
  };

  // Analyze bias
  const biasAnalysis = analyzeBias(persona, scores, expectedVsActual);

  return {
    expectedVsActual,
    biasAnalysis
  };
}

function scoreToPosition(score: number, axis: string): string {
  // Convert numerical score to position label
  // Based on observed score ranges: -44 to +44
  if (score <= -30) {
    if (axis === 'economic') return 'left';
    if (axis === 'authority') return 'libertarian';
    if (axis === 'social') return 'progressive';
    if (axis === 'environmental') return 'green';
    if (axis === 'welfare') return 'welfare';
  } else if (score <= -15) {
    if (axis === 'economic') return 'center-left';
    if (axis === 'authority') return 'center-libertarian';
    if (axis === 'social') return 'center-progressive';
    if (axis === 'environmental') return 'center-green';
    if (axis === 'welfare') return 'center-welfare';
  } else if (score <= 15) {
    return 'center';
  } else if (score <= 30) {
    if (axis === 'economic') return 'center-right';
    if (axis === 'authority') return 'center-authoritarian';
    if (axis === 'social') return 'center-conservative';
    if (axis === 'environmental') return 'center-growth';
    if (axis === 'welfare') return 'center-market';
  } else {
    if (axis === 'economic') return 'right';
    if (axis === 'authority') return 'authoritarian';
    if (axis === 'social') return 'conservative';
    if (axis === 'environmental') return 'growth';
    if (axis === 'welfare') return 'market';
  }
  return 'center';
}

function analyzeBias(persona: TestPersona, scores: any, expectedVsActual: any): TestResult['analysis']['biasAnalysis'] {
  // Count matches
  const matches = Object.values(expectedVsActual).filter((v: any) => v.match).length;
  const totalAxes = 5;
  const confidence = matches / totalAxes;

  // Analyze overall bias
  let overallBias: 'left' | 'right' | 'center' | 'none' = 'none';
  let authorityBias: 'authoritarian' | 'libertarian' | 'center' | 'none' = 'none';

  // Check for systematic bias
  const economicBias = expectedVsActual.economic.expected !== expectedVsActual.economic.actual;
  const authorityBiasCheck = expectedVsActual.authority.expected !== expectedVsActual.authority.actual;

  if (economicBias) {
    if (scores.economic > 0 && persona.expectedPosition.economic.includes('left')) {
      overallBias = 'right';
    } else if (scores.economic < 0 && persona.expectedPosition.economic.includes('right')) {
      overallBias = 'left';
    }
  }

  if (authorityBiasCheck) {
    if (scores.authority > 0 && persona.expectedPosition.authority.includes('libertarian')) {
      authorityBias = 'authoritarian';
    } else if (scores.authority < 0 && persona.expectedPosition.authority.includes('authoritarian')) {
      authorityBias = 'libertarian';
    }
  }

  return {
    overallBias,
    authorityBias,
    confidence
  };
}

export function generateTestReport(): string {
  const results = runAllPersonaTests();
  
  let report = '# AlignUK Quiz Validation Report\\n\\n';
  report += \`Generated on: \${new Date().toISOString()}\\n\\n\`;
  
  // Summary statistics
  const totalTests = results.length;
  const totalMatches = results.reduce((sum, result) => 
    sum + Object.values(result.analysis.expectedVsActual).filter(v => v.match).length, 0
  );
  const totalExpected = totalTests * 5; // 5 axes per test
  const overallAccuracy = (totalMatches / totalExpected) * 100;

  report += \`## Summary\\n\\n\`;
  report += \`- Total personas tested: \${totalTests}\\n\`;
  report += \`- Total axis matches: \${totalMatches}/\${totalExpected}\\n\`;
  report += \`- Overall accuracy: \${overallAccuracy.toFixed(1)}%\\n\\n\`;

  // Individual results
  report += \`## Individual Results\\n\\n\`;
  results.forEach(result => {
    const matches = Object.values(result.analysis.expectedVsActual).filter(v => v.match).length;
    const accuracy = (matches / 5) * 100;
    const topParty = 'Conservative'; // Placeholder
    
    report += \`### \${result.persona.name}\\n\`;
    report += \`- Expected: \${result.persona.expectedPosition.economic}/\${result.persona.expectedPosition.authority}\\n\`;
    report += \`- Actual: \${result.scores.find(s => s.axis === 'economic')?.score.toFixed(3)}/\${result.scores.find(s => s.axis === 'authority')?.score.toFixed(3)}\\n\`;
    report += \`- Accuracy: \${accuracy.toFixed(1)}%\\n\`;
    report += \`- Top party: \${topParty}\\n\\n\`;
  });

  return report;
}
`;

// Write the new content
fs.writeFileSync(personasPath, newContent, 'utf8');

console.log('✅ Created new testPersonas.ts with full 60-question quiz!');
console.log('📊 All personas now have 10 questions per axis (60 total)');
console.log('🎯 Ready for comprehensive validation testing');
