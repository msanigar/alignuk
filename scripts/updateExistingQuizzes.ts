#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '../lib/scoring';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_KEY!;

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is required');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ NEXT_SUPABASE_SERVICE_KEY is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🔄 Updating Existing Quiz Results with Improved Algorithm...\n');

async function updateExistingQuizzes() {
  try {
    // Fetch all quizzes
    console.log('📊 Fetching existing quizzes...');
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('*');

    if (quizzesError) {
      console.error('❌ Error fetching quizzes:', quizzesError);
      return;
    }

    console.log(`📋 Found ${quizzes.length} quizzes to update`);

    let updatedCount = 0;
    let errorCount = 0;

    for (const quiz of quizzes) {
      try {
        console.log(`\n🔄 Processing quiz: ${quiz.id}`);
        
        // Fetch answers for this quiz
        const { data: answers, error: answersError } = await supabase
          .from('answers')
          .select('*')
          .eq('quiz_id', quiz.id);

        if (answersError) {
          console.error(`❌ Error fetching answers for quiz ${quiz.id}:`, answersError);
          errorCount++;
          continue;
        }

        if (!answers || answers.length === 0) {
          console.log(`⚠️ No answers found for quiz ${quiz.id}, skipping...`);
          continue;
        }

        // Convert answers to the format expected by calculateScores
        const formattedAnswers = answers.map(answer => ({
          questionId: answer.question_id,
          value: answer.value
        }));

        // Create mock session for calculation
        const mockSession = {
          id: quiz.session_id || quiz.id,
          userId: quiz.profile_id,
          answers: formattedAnswers,
          createdAt: quiz.created_at || new Date().toISOString()
        };

        // Calculate new scores using improved algorithm
        const newScores = calculateScores(mockSession);

        // Update the scores for this quiz
        for (const score of newScores.scores) {
          const { error: updateError } = await supabase
            .from('scores')
            .upsert({
              quiz_id: quiz.id,
              axis: score.axis,
              score: score.score,
              confidence: score.confidence
            });

          if (updateError) {
            console.error(`❌ Error updating score for quiz ${quiz.id}, axis ${score.axis}:`, updateError);
            errorCount++;
            continue;
          }
        }

        console.log(`✅ Updated quiz ${quiz.id}`);
        console.log(`   Economic: ${newScores.scores.find(s => s.axis === 'economic')?.score || 0}`);
        console.log(`   Authority: ${newScores.scores.find(s => s.axis === 'authority')?.score || 0}`);
        console.log(`   Social: ${newScores.scores.find(s => s.axis === 'social')?.score || 0}`);
        updatedCount++;

      } catch (error) {
        console.error(`❌ Error processing quiz ${quiz.id}:`, error);
        errorCount++;
      }
    }

    console.log('\n📊 UPDATE SUMMARY:');
    console.log('==================');
    console.log(`Total quizzes: ${quizzes.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Success rate: ${((updatedCount / quizzes.length) * 100).toFixed(1)}%`);

    if (updatedCount > 0) {
      console.log('\n🎉 Successfully updated existing quiz results!');
      console.log('📈 Users will now see improved, more accurate results when viewing their past quizzes.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Run the update
updateExistingQuizzes();
