#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
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

console.log('🔍 Checking for Duplicate Scores...\n');

async function checkDuplicateScores() {
  try {
    // Fetch all scores
    console.log('📊 Fetching all scores...');
    const { data: scores, error: scoresError } = await supabase
      .from('scores')
      .select('*')
      .order('quiz_id');

    if (scoresError) {
      console.error('❌ Error fetching scores:', scoresError);
      return;
    }

    console.log(`📋 Found ${scores.length} total scores`);

    // Group by quiz_id and check for duplicates
    const scoresByQuiz: Record<string, any[]> = {};
    
    scores.forEach(score => {
      if (!scoresByQuiz[score.quiz_id]) {
        scoresByQuiz[score.quiz_id] = [];
      }
      scoresByQuiz[score.quiz_id].push(score);
    });

    console.log('\n📊 Analysis by Quiz:');
    console.log('==================');

    let totalDuplicates = 0;
    let quizzesWithDuplicates = 0;

    Object.entries(scoresByQuiz).forEach(([quizId, quizScores]) => {
      console.log(`\nQuiz ${quizId}:`);
      console.log(`  Total scores: ${quizScores.length}`);
      
      // Check for duplicate axes
      const axes = quizScores.map(s => s.axis);
      const uniqueAxes = Array.from(new Set(axes));
      
      if (axes.length !== uniqueAxes.length) {
        console.log(`  ❌ DUPLICATES FOUND!`);
        console.log(`  Expected 6 unique axes, found ${uniqueAxes.length}`);
        
        // Show which axes are duplicated
        const axisCounts: Record<string, number> = {};
        axes.forEach(axis => {
          axisCounts[axis] = (axisCounts[axis] || 0) + 1;
        });
        
        Object.entries(axisCounts).forEach(([axis, count]) => {
          if (count > 1) {
            console.log(`    ${axis}: ${count} entries`);
            totalDuplicates += count - 1;
          }
        });
        
        quizzesWithDuplicates++;
      } else {
        console.log(`  ✅ No duplicates (${uniqueAxes.length} unique axes)`);
      }
      
      // Show all scores for this quiz
      quizScores.forEach(score => {
        console.log(`    ${score.axis}: ${score.score} (confidence: ${score.confidence})`);
      });
    });

    console.log('\n📊 SUMMARY:');
    console.log('============');
    console.log(`Total quizzes: ${Object.keys(scoresByQuiz).length}`);
    console.log(`Quizzes with duplicates: ${quizzesWithDuplicates}`);
    console.log(`Total duplicate entries: ${totalDuplicates}`);
    
    if (totalDuplicates > 0) {
      console.log('\n🔧 RECOMMENDATION:');
      console.log('Run the cleanup script to remove duplicate scores.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Run the check
checkDuplicateScores();
