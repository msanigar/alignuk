#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const quizId = 'c310bc2c-fbe2-47f7-90fa-63cce6f80505';

async function checkSpecificQuiz() {
  console.log(`🔍 Checking Quiz: ${quizId}\n`);

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
  console.log(`Profile ID: ${quiz.profile_id}`);

  // Get the answers
  const { data: answers, error: answersError } = await supabase
    .from('answers')
    .select('*')
    .eq('quiz_id', quizId);

  if (answersError) {
    console.error('Error fetching answers:', answersError);
    return;
  }

  console.log(`\n📋 Answers: ${answers.length} total`);

  // Get the scores
  const { data: scores, error: scoresError } = await supabase
    .from('scores')
    .select('*')
    .eq('quiz_id', quizId);

  if (scoresError) {
    console.error('Error fetching scores:', scoresError);
    return;
  }

  console.log(`\n📈 Scores: ${scores.length} total`);
  console.log('Current scores in database:');
  scores.forEach(score => {
    console.log(`  ${score.axis}: ${score.score} (confidence: ${score.confidence})`);
  });

  // Check if we have the latest scores
  const latestScores = scores.filter(score => 
    score.confidence === 100 || score.confidence === 60
  );

  console.log(`\n🎯 Latest scores (confidence 60+):`);
  latestScores.forEach(score => {
    console.log(`  ${score.axis}: ${score.score} (confidence: ${score.confidence})`);
  });

  // Check if we have all 6 axes
  const axes = ['economic', 'social', 'authority', 'sovereignty', 'environment', 'welfare'];
  const missingAxes = axes.filter(axis => 
    !latestScores.some(score => score.axis === axis)
  );

  if (missingAxes.length > 0) {
    console.log(`\n⚠️ Missing axes: ${missingAxes.join(', ')}`);
  } else {
    console.log(`\n✅ All 6 axes present`);
  }
}

checkSpecificQuiz().catch(console.error);
