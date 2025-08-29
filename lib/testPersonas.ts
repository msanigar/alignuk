// Test persona interface
export interface TestPersona {
  name: string;
  description: string;
  expectedPosition: {
    economic: string;
    authority: string;
    social: string;
    environmental: string;
    welfare: string;
  };
  answers: Record<string, number>;
}

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
      'econ_5': 7,   // Political oversight of Bank of England (LEFT)
      'econ_6': 1,   // Reduce business regulation (LEFT - disagree)
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
      'econ_5': 5,   // Political oversight of Bank of England (LEFT - moderate agreement)
      'econ_6': 3,   // Reduce business regulation (LEFT - moderate disagreement)
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
      'auth_1': 7,   // Collective security (AUTHORITARIAN)
      'auth_2': 2,   // Internet unregulated (LIBERTARIAN - moderate disagreement)
      'auth_3': 7,   // Public order (AUTHORITARIAN)
      'auth_4': 2,   // Privacy protection (LIBERTARIAN - moderate disagreement)
      'auth_5': 7,   // Society regulate lifestyle (AUTHORITARIAN)
      'auth_6': 2,   // Free expression (LIBERTARIAN - moderate disagreement)
      'auth_7': 7,   // Government surveillance (AUTHORITARIAN)
      'auth_8': 2,   // Civil liberties (LIBERTARIAN - moderate disagreement)
      'auth_9': 7,   // Law enforcement powers (AUTHORITARIAN)
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
      'auth_1': 1,   // Collective security (AUTHORITARIAN - disagree)
      'auth_2': 6,   // Internet unregulated (LIBERTARIAN)
      'auth_3': 1,   // Public order (AUTHORITARIAN - disagree)
      'auth_4': 6,   // Privacy protection (LIBERTARIAN)
      'auth_5': 1,   // Society regulate lifestyle (AUTHORITARIAN - disagree)
      'auth_6': 6,   // Free expression (LIBERTARIAN)
      'auth_7': 1,   // Government surveillance (LIBERTARIAN - disagree)
      'auth_8': 6,   // Civil liberties (LIBERTARIAN)
      'auth_9': 1,   // Law enforcement powers (LIBERTARIAN - disagree)
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

];
