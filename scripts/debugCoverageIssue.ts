#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '../lib/scoring';
import { QUESTIONS_FULL } from '../lib/questions';
import { AXIS_IDS } from '../lib/axes';
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

async function debugCoverageIssue() {
  console.log('🔍 Debugging Coverage Issue - "Needs More Data" Problem\n');
  console.log('='.repeat(60));

  try {
    // Get recent quizzes with answers
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (quizzesError) {
      console.error('Error fetching quizzes:', quizzesError);
      return;
    }

    console.log(`📊 Found ${quizzes.length} recent quizzes\n`);

    for (const quiz of quizzes) {
      console.log(`\n🔍 Analyzing Quiz: ${quiz.id}`);
      console.log(`Created: ${quiz.created_at}`);
      console.log('-'.repeat(40));

      // Get answers for this quiz
      const { data: answers, error: answersError } = await supabase
        .from('answers')
        .select('*')
        .eq('quiz_id', quiz.id);

      if (answersError) {
        console.error('Error fetching answers:', answersError);
        continue;
      }

      console.log(`📋 Answers: ${answers.length}/60 questions answered`);

      // Check if all questions are answered
      if (answers.length !== 60) {
        console.log(`⚠️  INCOMPLETE: Missing ${60 - answers.length} answers`);
        continue;
      }

      // Create mock session
      const mockSession = {
        id: quiz.id,
        userId: 'test-user',
        answers: answers.map(answer => ({
          questionId: answer.question_id,
          value: answer.value
        })),
        createdAt: new Date(quiz.created_at)
      };

      // Calculate scores
      const scoringResult = calculateScores(mockSession);

      console.log(`🎯 Coverage Analysis:`);
      console.log(`Overall confidence: ${scoringResult.confidence}%`);
      console.log(`Has sufficient data: ${scoringResult.hasSufficientData ? '✅ YES' : '❌ NO'}`);
      
      if (scoringResult.missingAxes.length > 0) {
        console.log(`❌ Missing axes: ${scoringResult.missingAxes.join(', ')}`);
      }

      // Detailed axis analysis
      console.log('\n📊 Axis-by-Axis Analysis:');
      scoringResult.scores.forEach(score => {
        const status = score.confidence >= 60 ? '✅' : '❌';
        console.log(`  ${status} ${score.axis}: ${score.confidence}% coverage (score: ${score.score})`);
      });

      // Check question distribution per axis
      console.log('\n📋 Question Distribution:');
      AXIS_IDS.forEach(axisId => {
        const axisQuestions = QUESTIONS_FULL.filter(q => 
          q.axisTargets.some(target => target.axis === axisId)
        );
        const answeredQuestions = answers.filter(a => 
          axisQuestions.some(q => q.id === a.question_id)
        );
        console.log(`  ${axisId}: ${answeredQuestions.length}/${axisQuestions.length} questions answered`);
      });

      console.log('\n' + '='.repeat(60));
    }

  } catch (error) {
    console.error('Error debugging coverage issue:', error);
  }
}

debugCoverageIssue();
