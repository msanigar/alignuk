#!/usr/bin/env tsx

import { QUESTIONS_LITE, QUESTIONS_FULL } from '../lib/questions';

interface QuestionAnalysis {
  id: string;
  text: string;
  axis: string;
  ideologicalDirection: 'left' | 'right' | 'progressive' | 'conservative' | 'libertarian' | 'authoritarian' | 'globalist' | 'nationalist' | 'green' | 'growth' | 'welfare' | 'market';
  framing: 'positive' | 'negative' | 'neutral';
}

function analyzeQuestionBalance() {
  console.log('🔍 Analyzing Question Balance Across All Axes\n');
  
  const questions = QUESTIONS_LITE; // Focus on lite version for analysis
  const analysis: QuestionAnalysis[] = [];
  
  // Analyze each question
  questions.forEach(question => {
    const axis = question.axisTargets[0]?.axis || 'unknown';
    let ideologicalDirection: QuestionAnalysis['ideologicalDirection'] = 'left';
    let framing: QuestionAnalysis['framing'] = 'neutral';
    
    // Analyze economic questions
    if (axis === 'economic') {
      if (question.id === 'econ_1') {
        ideologicalDirection = 'left'; // Government role
        framing = 'positive';
      } else if (question.id === 'econ_2') {
        ideologicalDirection = 'right'; // Private providers
        framing = 'positive';
      } else if (question.id === 'econ_3') {
        ideologicalDirection = 'left'; // Minimum wage
        framing = 'positive';
      } else if (question.id === 'econ_4') {
        ideologicalDirection = 'right'; // Tax cuts
        framing = 'positive';
      } else if (question.id === 'econ_5') {
        ideologicalDirection = 'right'; // Private efficiency
        framing = 'positive';
      } else if (question.id === 'econ_6') {
        ideologicalDirection = 'left'; // Universal services
        framing = 'positive';
      }
    }
    
    // Analyze social questions
    if (axis === 'social') {
      if (question.id === 'social_1') {
        ideologicalDirection = 'conservative'; // Traditional roles
        framing = 'positive';
      } else if (question.id === 'social_2') {
        ideologicalDirection = 'progressive'; // Diversity in schools
        framing = 'positive';
      } else if (question.id === 'social_3') {
        ideologicalDirection = 'conservative'; // Religious role
        framing = 'positive';
      } else if (question.id === 'social_4') {
        ideologicalDirection = 'progressive'; // Immigration benefits
        framing = 'positive';
      } else if (question.id === 'social_5') {
        ideologicalDirection = 'conservative'; // Traditional family
        framing = 'positive';
      } else if (question.id === 'social_6') {
        ideologicalDirection = 'progressive'; // Progressive policies
        framing = 'positive';
      }
    }
    
    // Analyze authority questions
    if (axis === 'authority') {
      if (question.id === 'auth_1') {
        ideologicalDirection = 'libertarian'; // Individual freedoms
        framing = 'positive';
      } else if (question.id === 'auth_2') {
        ideologicalDirection = 'authoritarian'; // Government monitoring
        framing = 'positive';
      } else if (question.id === 'auth_3') {
        ideologicalDirection = 'libertarian'; // Protest rights
        framing = 'positive';
      } else if (question.id === 'auth_4') {
        ideologicalDirection = 'authoritarian'; // Police powers
        framing = 'positive';
      } else if (question.id === 'auth_5') {
        ideologicalDirection = 'libertarian'; // Lifestyle choice
        framing = 'positive';
      } else if (question.id === 'auth_6') {
        ideologicalDirection = 'libertarian'; // Free expression
        framing = 'positive';
      }
    }
    
    // Analyze sovereignty questions
    if (axis === 'sovereignty') {
      if (question.id === 'sovereign_1') {
        ideologicalDirection = 'globalist'; // EU integration
        framing = 'positive';
      } else if (question.id === 'sovereign_2') {
        ideologicalDirection = 'nationalist'; // National sovereignty
        framing = 'positive';
      } else if (question.id === 'sovereign_3') {
        ideologicalDirection = 'globalist'; // Global cooperation
        framing = 'positive';
      } else if (question.id === 'sovereign_4') {
        ideologicalDirection = 'nationalist'; // Border controls
        framing = 'positive';
      } else if (question.id === 'sovereign_5') {
        ideologicalDirection = 'globalist'; // International institutions
        framing = 'positive';
      } else if (question.id === 'sovereign_6') {
        ideologicalDirection = 'nationalist'; // National independence
        framing = 'positive';
      }
    }
    
    // Analyze environment questions
    if (axis === 'environment') {
      if (question.id === 'env_1') {
        ideologicalDirection = 'green'; // Climate action
        framing = 'positive';
      } else if (question.id === 'env_2') {
        ideologicalDirection = 'growth'; // Economic growth
        framing = 'positive';
      } else if (question.id === 'env_3') {
        ideologicalDirection = 'green'; // Renewable energy
        framing = 'positive';
      } else if (question.id === 'env_4') {
        ideologicalDirection = 'growth'; // Fossil fuels
        framing = 'positive';
      } else if (question.id === 'env_5') {
        ideologicalDirection = 'green'; // Environmental protection
        framing = 'positive';
      } else if (question.id === 'env_6') {
        ideologicalDirection = 'growth'; // Economic development
        framing = 'positive';
      }
    }
    
    // Analyze welfare questions
    if (axis === 'welfare') {
      if (question.id === 'welfare_1') {
        ideologicalDirection = 'welfare'; // Universal services
        framing = 'positive';
      } else if (question.id === 'welfare_2') {
        ideologicalDirection = 'market'; // Market solutions
        framing = 'positive';
      } else if (question.id === 'welfare_3') {
        ideologicalDirection = 'welfare'; // Unemployment benefits
        framing = 'positive';
      } else if (question.id === 'welfare_4') {
        ideologicalDirection = 'market'; // Work requirements
        framing = 'positive';
      } else if (question.id === 'welfare_5') {
        ideologicalDirection = 'welfare'; // Social safety net
        framing = 'positive';
      } else if (question.id === 'welfare_6') {
        ideologicalDirection = 'market'; // Personal responsibility
        framing = 'positive';
      }
    }
    
    analysis.push({
      id: question.id,
      text: question.text,
      axis,
      ideologicalDirection,
      framing
    });
  });
  
  // Count ideological directions by axis
  const axisCounts: Record<string, Record<string, number>> = {};
  
  analysis.forEach(q => {
    if (!axisCounts[q.axis]) {
      axisCounts[q.axis] = {};
    }
    if (!axisCounts[q.axis][q.ideologicalDirection]) {
      axisCounts[q.axis][q.ideologicalDirection] = 0;
    }
    axisCounts[q.axis][q.ideologicalDirection]++;
  });
  
  // Display results
  console.log('📊 Question Balance Analysis:\n');
  
  Object.entries(axisCounts).forEach(([axis, counts]) => {
    console.log(`${axis.toUpperCase()} AXIS:`);
    Object.entries(counts).forEach(([direction, count]) => {
      console.log(`  ${direction}: ${count} questions`);
    });
    console.log('');
  });
  
  // Identify imbalances
  console.log('⚠️  IDENTIFIED IMBALANCES:\n');
  
  Object.entries(axisCounts).forEach(([axis, counts]) => {
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const entries = Object.entries(counts);
    
    if (entries.length === 2) {
      const [dir1, count1] = entries[0];
      const [dir2, count2] = entries[1];
      
      if (count1 !== count2) {
        console.log(`${axis}: ${dir1} (${count1}) vs ${dir2} (${count2}) - UNBALANCED`);
      } else {
        console.log(`${axis}: ${dir1} (${count1}) vs ${dir2} (${count2}) - BALANCED`);
      }
    } else {
      console.log(`${axis}: Multiple directions - needs review`);
    }
  });
  
  // Show detailed breakdown
  console.log('\n📋 DETAILED BREAKDOWN:\n');
  analysis.forEach(q => {
    console.log(`${q.id}: ${q.ideologicalDirection} (${q.axis})`);
  });
}

analyzeQuestionBalance();
