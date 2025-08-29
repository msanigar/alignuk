#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '../lib/scoring';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const quizId = 'c310bc2c-fbe2-47f7-90fa-63cce6f80505';

async function forceUpdateSpecificQuiz() {
  console.log(`🔄 Force-updating Quiz: ${quizId}\n`);

  // Get the quiz record
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', quizId)
    .single();

  if (quizError) {
    console.error('Error fetching quiz:', quizError);
    return;
  }

  console.log('📊 Quiz Details:');
  console.log(`ID: ${quiz.id}`);
  console.log(`Created: ${quiz.created_at}`);

  // Get the answers
  const { data: answers, error: answersError } = await supabase
    .from('answers')
    .select('*')
    .eq('quiz_id', quizId);

  if (answersError) {
    console.error('Error fetching answers:', answersError);
    return;
  }

  console.log(`📋 Found ${answers.length} answers`);

  // Format answers for the scoring algorithm
  const formattedAnswers = answers.map(answer => ({
    questionId: answer.question_id,
    value: answer.value
  }));

  // Create mock session for scoring
  const mockSession = {
    id: quiz.id,
    userId: quiz.profile_id,
    answers: formattedAnswers,
    createdAt: new Date(quiz.created_at)
  };

  // Calculate new scores
  console.log('🧮 Calculating new scores...');
  const newScores = calculateScores(mockSession);

  console.log('📈 New scores calculated:');
  newScores.scores.forEach(score => {
    console.log(`  ${score.axis}: ${score.score} (confidence: ${score.confidence})`);
  });

  // Delete existing scores for this quiz
  console.log('🗑️ Deleting existing scores...');
  const { error: deleteError } = await supabase
    .from('scores')
    .delete()
    .eq('quiz_id', quizId);

  if (deleteError) {
    console.error('Error deleting existing scores:', deleteError);
    return;
  }

  console.log('✅ Existing scores deleted');

  // Insert new scores
  console.log('💾 Inserting new scores...');
  const scoreData = newScores.scores.map(score => ({
    quiz_id: quizId,
    axis: score.axis,
    score: score.score,
    confidence: score.confidence
  }));

  const { error: insertError } = await supabase
    .from('scores')
    .insert(scoreData);

  if (insertError) {
    console.error('Error inserting new scores:', insertError);
    return;
  }

  console.log('✅ New scores inserted successfully');

  // Verify the update
  const { data: verifyScores, error: verifyError } = await supabase
    .from('scores')
    .select('*')
    .eq('quiz_id', quizId);

  if (verifyError) {
    console.error('Error verifying scores:', verifyError);
    return;
  }

  console.log('\n🎯 Verification - Current scores in database:');
  verifyScores.forEach(score => {
    console.log(`  ${score.axis}: ${score.score} (confidence: ${score.confidence})`);
  });

  console.log('\n✅ Force-update completed successfully!');
  console.log('🔄 The quiz results page should now show the updated scores.');
}

forceUpdateSpecificQuiz().catch(console.error);
