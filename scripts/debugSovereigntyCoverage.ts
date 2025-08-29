#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '../lib/scoring';
import { QUESTIONS_FULL } from '../lib/questions';
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

async function debugSovereigntyCoverage() {
  console.log('🔍 Debugging Sovereignty Axis Coverage Issue\n');
  console.log('='.repeat(60));

  const quizId = 'c310bc2c-fbe2-47f7-90fa-63cce6f80505';

  try {
    // Get answers for this quiz
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('*')
      .eq('quiz_id', quizId);

    if (answersError) {
      console.error('Error fetching answers:', answersError);
      return;
    }

    console.log(`📋 Found ${answers.length} answers\n`);

    // Get sovereignty questions
    const sovereigntyQuestions = QUESTIONS_FULL.filter(q => 
      q.axisTargets.some(target => target.axis === 'sovereignty')
    );

    console.log(`📊 Sovereignty Questions (${sovereigntyQuestions.length}):`);
    console.log('='.repeat(50));

    let totalWeight = 0;
    let answeredWeight = 0;
    let absoluteWeightSum = 0;

    sovereigntyQuestions.forEach((question, index) => {
      const axisTarget = question.axisTargets.find(target => target.axis === 'sovereignty');
      const weight = axisTarget?.weight || 0;
      const answer = answers.find(a => a.question_id === question.id);
      
      totalWeight += weight;
      absoluteWeightSum += Math.abs(weight);

      if (answer) {
        answeredWeight += weight;
        console.log(`${index + 1}. ${question.id}: weight=${weight}, answer=${answer.value}/7 ✅`);
      } else {
        console.log(`${index + 1}. ${question.id}: weight=${weight}, NO ANSWER ❌`);
      }
    });

    console.log('\n📈 Weight Analysis:');
    console.log(`Total Weight: ${totalWeight}`);
    console.log(`Answered Weight: ${answeredWeight}`);
    console.log(`Absolute Weight Sum: ${absoluteWeightSum}`);
    console.log(`Confidence: ${totalWeight > 0 ? Math.round((answeredWeight / totalWeight) * 100) : 0}%`);

    // Check if totalWeight is 0
    if (totalWeight === 0) {
      console.log('\n🚨 PROBLEM FOUND: Total Weight is 0!');
      console.log('This means all sovereignty question weights sum to 0, causing 0% coverage.');
      console.log('\nPossible causes:');
      console.log('1. All sovereignty questions have weight 0');
      console.log('2. Positive and negative weights perfectly balance to 0');
      console.log('3. Question weights are not properly set');
    }

    // Show the actual weights
    console.log('\n🔍 Sovereignty Question Weights:');
    sovereigntyQuestions.forEach(q => {
      const axisTarget = q.axisTargets.find(target => target.axis === 'sovereignty');
      const weight = axisTarget?.weight || 0;
      console.log(`  ${q.id}: ${weight}`);
    });

    // Test with the scoring algorithm
    console.log('\n🧪 Testing with Scoring Algorithm:');
    const mockSession = {
      id: quizId,
      userId: 'test-user',
      answers: answers.map(answer => ({
        questionId: answer.question_id,
        value: answer.value
      })),
      createdAt: new Date()
    };

    const scoringResult = calculateScores(mockSession);
    const sovereigntyScore = scoringResult.scores.find(s => s.axis === 'sovereignty');
    
    console.log(`Algorithm result: ${sovereigntyScore?.confidence}% coverage`);
    console.log(`Score: ${sovereigntyScore?.score}`);

  } catch (error) {
    console.error('Error debugging sovereignty coverage:', error);
  }
}

debugSovereigntyCoverage();
