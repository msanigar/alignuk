#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import { buildNonNegotiables } from '../lib/nonnegotiables';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function analyzeQuizNonNegotiables(quizId: string) {
  console.log(`🔍 Analyzing Non-Negotiables for Quiz: ${quizId}\n`);

  try {
    // Fetch quiz answers
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('*')
      .eq('quiz_id', quizId);

    if (answersError) {
      console.error('Error fetching answers:', answersError);
      return;
    }

    if (!answers || answers.length === 0) {
      console.log('No answers found for this quiz');
      return;
    }

    console.log(`📊 Found ${answers.length} answers\n`);

    // Convert answers to the format expected by buildNonNegotiables
    const answerMap: Record<string, number> = {};
    answers.forEach(answer => {
      // Convert Likert 1-7 to -3 to +3 scale
      answerMap[answer.question_id] = answer.value - 4;
    });

    // Build non-negotiables
    const nonNegotiables = buildNonNegotiables(answerMap, {
      extremeThreshold: 3,
      strengthPerExtreme: 0.6,
      capStrength: 1.0,
    });

    console.log(`🎯 Non-Negotiables Detected: ${nonNegotiables.length}\n`);

    if (nonNegotiables.length === 0) {
      console.log('❌ No non-negotiables detected (no extreme answers)');
    } else {
      nonNegotiables.forEach((nn, index) => {
        console.log(`${index + 1}. ${nn.policy.replace(/_/g, ' ').toUpperCase()}`);
        console.log(`   Direction: ${nn.direction > 0 ? 'SUPPORT' : 'OPPOSE'}`);
        console.log(`   Strength: ${nn.strength.toFixed(2)}`);
        console.log(`   Source Questions: ${nn.sourceQuestionIds.join(', ')}`);
        
        // Show the actual answer values for source questions
        nn.sourceQuestionIds.forEach(qId => {
          const value = answerMap[qId];
          const likertValue = value + 4; // Convert back to Likert scale
          console.log(`     ${qId}: ${likertValue}/7 (${value > 0 ? '+' : ''}${value})`);
        });
        console.log('');
      });
    }

    // Show all extreme answers (potential non-negotiables)
    console.log('🔍 All Extreme Answers (|value| >= 3):');
    console.log('='.repeat(50));
    
    const extremeAnswers = Object.entries(answerMap)
      .filter(([_, value]) => Math.abs(value) >= 3)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

    if (extremeAnswers.length === 0) {
      console.log('No extreme answers found');
    } else {
      extremeAnswers.forEach(([qId, value]) => {
        const likertValue = value + 4;
        const direction = value > 0 ? 'AGREE' : 'DISAGREE';
        console.log(`${qId}: ${likertValue}/7 (${value > 0 ? '+' : ''}${value}) - ${direction}`);
      });
    }

    // Check which questions are mapped to non-negotiables
    console.log('\n📋 Questions Mapped to Non-Negotiables:');
    console.log('='.repeat(50));
    
    const { QUESTION_POLICY_MAP } = await import('../lib/nonnegotiables');
    const mappedQuestions = Object.keys(answerMap).filter(qId => QUESTION_POLICY_MAP[qId]);
    
    mappedQuestions.forEach(qId => {
      const policy = QUESTION_POLICY_MAP[qId];
      const value = answerMap[qId];
      const likertValue = value + 4;
      const isExtreme = Math.abs(value) >= 3;
      const status = isExtreme ? '🔥 EXTREME' : '⚪ Moderate';
      console.log(`${qId}: ${likertValue}/7 (${value > 0 ? '+' : ''}${value}) - ${policy} - ${status}`);
    });

  } catch (error) {
    console.error('Error analyzing quiz:', error);
  }
}

// Analyze the specific quiz
const quizId = 'c310bc2c-fbe2-47f7-90fa-63cce6f80505';
analyzeQuizNonNegotiables(quizId);
