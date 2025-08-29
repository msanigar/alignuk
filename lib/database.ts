import { supabase } from './supabase';
import { QuizSession, Answer, AxisScore, AxisId } from './types';

/**
 * Creates an anonymous session for quiz taking
 */
export async function createAnonymousSession(): Promise<string> {
  const anonKey = crypto.randomUUID();
  
  const { data, error } = await supabase
    .from('sessions')
    .insert({ anon_key: anonKey })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }

  return data.id;
}

/**
 * Saves quiz results to database
 */
export async function saveQuizResults(
  session: QuizSession,
  scores: AxisScore[]
): Promise<string> {
  console.log('saveQuizResults called with session:', session.id, 'scores:', scores.length);
  
  const { data: { user } } = await supabase.auth.getUser();
  console.log('Current user:', user?.id);
  
  // Create quiz record
  console.log('Creating quiz record...');
  const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      profile_id: user?.id,
      session_id: session.id,
      version: '1.0',
      duration_ms: session.durationMs,
      importance_weights: session.importanceWeights,
    })
    .select('id')
    .single();

  if (quizError) {
    console.error('Error saving quiz:', quizError);
    throw new Error('Failed to save quiz');
  }

  console.log('Quiz created successfully with ID:', quizData.id);
  const quizId = quizData.id;

  // Save answers
  console.log('Saving answers...');
  const answerInserts = session.answers.map(answer => ({
    quiz_id: quizId,
    question_id: answer.questionId,
    value: answer.value,
  }));

  const { error: answersError } = await supabase
    .from('answers')
    .insert(answerInserts);

  if (answersError) {
    console.error('Error saving answers:', answersError);
    throw new Error('Failed to save answers');
  }

  console.log('Answers saved successfully');

  // Save scores
  console.log('Saving scores...');
  const scoreInserts = scores.map(score => ({
    quiz_id: quizId,
    axis: score.axis,
    score: score.score,
    confidence: score.confidence,
  }));

  const { error: scoresError } = await supabase
    .from('scores')
    .insert(scoreInserts);

  if (scoresError) {
    console.error('Error saving scores:', scoresError);
    throw new Error('Failed to save scores');
  }

  console.log('Scores saved successfully, returning quiz ID:', quizId);
  return quizId;
}

/**
 * Retrieves quiz history for authenticated user
 */
export async function getQuizHistory(): Promise<Array<{
  id: string;
  createdAt: Date;
  scores: AxisScore[];
  tags: string[];
}>> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  console.log('getQuizHistory: Fetching for user:', user.id);

  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .select(`
      id,
      created_at,
      scores (
        axis,
        score,
        confidence
      )
    `)
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quiz history:', error);
    return [];
  }

  console.log('getQuizHistory: Found quizzes:', quizzes?.length, 'quizzes');
  quizzes?.forEach(quiz => {
    console.log(`Quiz ${quiz.id}:`, {
      createdAt: quiz.created_at,
      scoresCount: quiz.scores?.length,
      scores: quiz.scores?.map(s => `${s.axis}:${s.score}`).join(', ')
    });
  });

  return quizzes.map(quiz => ({
    id: quiz.id,
    createdAt: new Date(quiz.created_at),
    scores: quiz.scores.map((score: { axis: string; score: number; confidence: number }) => ({
      axis: score.axis as AxisId,
      score: score.score,
      confidence: score.confidence,
    })),
    tags: [], // Will be calculated client-side
  }));
}

/**
 * Retrieves quiz results by ID
 */
export async function getQuizResults(quizId: string): Promise<{
  scores: AxisScore[];
  answers: Answer[];
  createdAt: Date;
} | null> {
  console.log('getQuizResults: Fetching quiz:', quizId);

  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('created_at')
    .eq('id', quizId)
    .single();

  if (quizError) {
    console.error('Error fetching quiz:', quizError);
    return null;
  }

  const { data: scores, error: scoresError } = await supabase
    .from('scores')
    .select('axis, score, confidence')
    .eq('quiz_id', quizId);

  if (scoresError) {
    console.error('Error fetching scores:', scoresError);
    return null;
  }

  const { data: answers, error: answersError } = await supabase
    .from('answers')
    .select('question_id, value')
    .eq('quiz_id', quizId);

  if (answersError) {
    console.error('Error fetching answers:', answersError);
    return null;
  }

  console.log('getQuizResults: Quiz data:', {
    quizId,
    createdAt: quiz.created_at,
    scoresCount: scores?.length,
    scores: scores?.map(s => `${s.axis}:${s.score}`).join(', '),
    answersCount: answers?.length
  });

  return {
    scores: scores.map((score: { axis: string; score: number; confidence: number }) => ({
      axis: score.axis as AxisId,
      score: score.score,
      confidence: score.confidence,
    })),
    answers: answers.map((answer: { question_id: string; value: number }) => ({
      questionId: answer.question_id,
      value: answer.value,
    })),
    createdAt: new Date(quiz.created_at),
  };
}

/**
 * Deletes a quiz and all associated data (scores, answers)
 */
export async function deleteQuiz(quizId: string): Promise<boolean> {
  console.log('deleteQuiz: Deleting quiz:', quizId);
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('deleteQuiz: No authenticated user');
    throw new Error('Authentication required');
  }

  // First, verify the quiz belongs to the current user
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('id, profile_id')
    .eq('id', quizId)
    .single();

  if (quizError) {
    console.error('Error fetching quiz for deletion:', quizError);
    throw new Error('Quiz not found');
  }

  if (quiz.profile_id !== user.id) {
    console.error('deleteQuiz: Quiz does not belong to user');
    throw new Error('Unauthorized to delete this quiz');
  }

  // Delete in the correct order to respect foreign key constraints
  // 1. Delete scores
  const { error: scoresError } = await supabase
    .from('scores')
    .delete()
    .eq('quiz_id', quizId);

  if (scoresError) {
    console.error('Error deleting scores:', scoresError);
    throw new Error('Failed to delete quiz scores');
  }

  // 2. Delete answers
  const { error: answersError } = await supabase
    .from('answers')
    .delete()
    .eq('quiz_id', quizId);

  if (answersError) {
    console.error('Error deleting answers:', answersError);
    throw new Error('Failed to delete quiz answers');
  }

  // 3. Delete the quiz record
  const { error: quizDeleteError } = await supabase
    .from('quizzes')
    .delete()
    .eq('id', quizId);

  if (quizDeleteError) {
    console.error('Error deleting quiz:', quizDeleteError);
    throw new Error('Failed to delete quiz');
  }

  console.log('deleteQuiz: Successfully deleted quiz:', quizId);
  return true;
}

/**
 * Creates or updates user profile
 */
export async function upsertProfile(profile: {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
}): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      avatar_url: profile.avatarUrl,
    });

  if (error) {
    console.error('Error upserting profile:', error);
    throw new Error('Failed to save profile');
  }
}

/**
 * Gets user profile
 */
export async function getProfile(userId: string): Promise<{
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  createdAt: Date;
} | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatar_url,
    createdAt: new Date(data.created_at),
  };
}
