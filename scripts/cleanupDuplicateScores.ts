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

console.log('🧹 Cleaning Up Duplicate Scores...\n');

async function cleanupDuplicateScores() {
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

    // Group by quiz_id and axis
    const scoresByQuizAndAxis: Record<string, Record<string, any[]>> = {};
    
    scores.forEach(score => {
      if (!scoresByQuizAndAxis[score.quiz_id]) {
        scoresByQuizAndAxis[score.quiz_id] = {};
      }
      if (!scoresByQuizAndAxis[score.quiz_id][score.axis]) {
        scoresByQuizAndAxis[score.quiz_id][score.axis] = [];
      }
      scoresByQuizAndAxis[score.quiz_id][score.axis].push(score);
    });

    let totalDeleted = 0;
    let quizzesCleaned = 0;

    // For each quiz and axis, keep only the most recent score
    for (const [quizId, axes] of Object.entries(scoresByQuizAndAxis)) {
      console.log(`\n🔄 Processing quiz: ${quizId}`);
      
      for (const [axis, axisScores] of Object.entries(axes)) {
        if (axisScores.length > 1) {
          console.log(`  ${axis}: ${axisScores.length} entries found`);
          
          // Sort by created_at (most recent first) and keep only the first one
          const sortedScores = axisScores.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          const scoresToDelete = sortedScores.slice(1); // Keep first, delete the rest
          
          console.log(`    Keeping: ${sortedScores[0].score} (confidence: ${sortedScores[0].confidence})`);
          console.log(`    Deleting: ${scoresToDelete.length} duplicates`);
          
          // Delete duplicate scores
          for (const scoreToDelete of scoresToDelete) {
            const { error: deleteError } = await supabase
              .from('scores')
              .delete()
              .eq('id', scoreToDelete.id);
              
            if (deleteError) {
              console.error(`    ❌ Error deleting score ${scoreToDelete.id}:`, deleteError);
            } else {
              totalDeleted++;
            }
          }
        }
      }
      
      quizzesCleaned++;
    }

    console.log('\n📊 CLEANUP SUMMARY:');
    console.log('==================');
    console.log(`Quizzes processed: ${quizzesCleaned}`);
    console.log(`Total duplicate scores deleted: ${totalDeleted}`);
    
    if (totalDeleted > 0) {
      console.log('\n✅ Cleanup completed successfully!');
      console.log('🎯 Quiz results should now display correctly without duplicates.');
    } else {
      console.log('\nℹ️ No duplicates found to clean up.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Run the cleanup
cleanupDuplicateScores();
