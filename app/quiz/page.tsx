'use client';

import { useState, useEffect } from 'react';
import { QuizOnboarding } from '@/components/quiz/QuizOnboarding';
import { QuizQuestions } from '@/components/quiz/QuizQuestions';
import { QuizResults } from '@/components/quiz/QuizResults';
import { QuizInsufficientData } from '@/components/quiz/QuizInsufficientData';
import { QuizSession, Answer } from '@/lib/types';
import { QUESTIONS_LITE, QUESTIONS_FULL } from '@/lib/questions';
import { calculateScores, generateTags, generateSummary, generateOverallSummary } from '@/lib/scoring';
import { createAnonymousSession, saveQuizResults } from '@/lib/database';
import { useAuth } from '@/components/providers/AuthProvider';

type QuizStep = 'onboarding' | 'questions' | 'insufficient' | 'results';

export default function QuizPage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<QuizStep>('onboarding');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizVersion, setQuizVersion] = useState<'lite' | 'full'>('lite');

  // Get current questions based on version
  const getCurrentQuestions = () => {
    return quizVersion === 'lite' ? QUESTIONS_LITE : QUESTIONS_FULL;
  };

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        console.log('Quiz: Creating anonymous session...');
        const sessionId = await createAnonymousSession();
        setSession({
          id: sessionId,
          answers: [],
          createdAt: new Date(),
        });
      } catch (error) {
        console.error('Failed to create session:', error);
        // Create a fallback session to prevent infinite loading
        setSession({
          id: 'fallback-session',
          answers: [],
          createdAt: new Date(),
        });
      }
    };

    if (!session) {
      initSession();
    }
  }, [session]);

  // Load saved answers from localStorage
  useEffect(() => {
    if (session) {
      const saved = localStorage.getItem(`quiz-answers-${session.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAnswers(parsed);
          setCurrentQuestionIndex(parsed.length);
        } catch (error) {
          console.error('Failed to load saved answers:', error);
        }
      }
    }
  }, [session]);

  // Save answers to localStorage
  useEffect(() => {
    if (session && answers.length > 0) {
      localStorage.setItem(`quiz-answers-${session.id}`, JSON.stringify(answers));
    }
  }, [answers, session]);

  const handleStartQuiz = (version: 'lite' | 'full') => {
    setQuizVersion(version);
    setCurrentStep('questions');
    setStartTime(new Date());
  };

  const handleAnswerQuestion = (questionId: string, value: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, value };
    } else {
      newAnswers.push({ questionId, value });
    }
    
    setAnswers(newAnswers);
    
    // Move to next question
    const currentQuestions = getCurrentQuestions();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      handleQuizComplete(newAnswers);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuickTest = () => {
    console.log('🚀 Quick test initiated - generating random answers...');
    
    // Generate random answers for all remaining questions
    const randomAnswers: Answer[] = [];
    
    // Add existing answers
    randomAnswers.push(...answers);
    
    // Generate random answers for remaining questions
    const currentQuestions = getCurrentQuestions();
    for (let i = currentQuestionIndex; i < currentQuestions.length; i++) {
      const question = currentQuestions[i];
      const randomValue = Math.floor(Math.random() * 7) + 1; // 1-7
      randomAnswers.push({ questionId: question.id, value: randomValue });
    }
    
    console.log('Generated random answers:', randomAnswers);
    
    // Complete the quiz with random answers
    handleQuizComplete(randomAnswers);
  };

  const handleQuizComplete = async (finalAnswers: Answer[]) => {
    setLoading(true);
    console.log('Starting quiz completion...', { finalAnswers, session });
    
    try {
      if (!session) throw new Error('No session available');
      
      const durationMs = startTime ? Date.now() - startTime.getTime() : 0;
      const updatedSession = {
        ...session,
        answers: finalAnswers,
        durationMs,
      };
      
      console.log('Calculating scores...');
      // Calculate scores
      const scoringResult = calculateScores(updatedSession);
      console.log('Scoring result:', scoringResult);
      
      if (!scoringResult.hasSufficientData) {
        console.log('Insufficient data, showing insufficient screen');
        setCurrentStep('insufficient');
        setLoading(false);
        return;
      }
      
      console.log('Generating tags and summary...');
      console.log('Scores for tag generation:', scoringResult.scores);
      // Generate additional results
      const tags = generateTags(scoringResult.scores);
      const summary = generateSummary(scoringResult.scores);
      const overallSummary = generateOverallSummary(scoringResult.scores);
      console.log('Generated tags:', tags, 'summary:', summary, 'overallSummary:', overallSummary);
      
      // Save to database if user is authenticated
      if (user) {
        try {
          console.log('Saving results to database...');
          // Add timeout to prevent hanging
          const savePromise = saveQuizResults(updatedSession, scoringResult.scores);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database save timeout')), 10000)
          );
          
          await Promise.race([savePromise, timeoutPromise]);
          console.log('Results saved successfully');
        } catch (error) {
          console.error('Failed to save results:', error);
          // Continue with the quiz completion even if save fails
        }
      }
      
      console.log('Storing results in session storage...');
      // Store results in session storage for results page
      const resultsData = {
        scores: scoringResult.scores,
        tags,
        summary,
        overallSummary,
        answers: finalAnswers,
        durationMs,
      };
      sessionStorage.setItem('quiz-results', JSON.stringify(resultsData));
      console.log('Results stored, transitioning to results page');
      
      setCurrentStep('results');
    } catch (error) {
      console.error('Error completing quiz:', error);
      // Show error to user
      alert('There was an error processing your quiz results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeInsufficient = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {currentStep === 'onboarding' && (
        <QuizOnboarding onStart={handleStartQuiz} onQuickTest={handleQuickTest} />
      )}
      
      {currentStep === 'questions' && (
        <QuizQuestions
          currentQuestion={getCurrentQuestions()[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={getCurrentQuestions().length}
          onAnswer={handleAnswerQuestion}
          onGoBack={handleGoBack}
          canGoBack={currentQuestionIndex > 0}
          currentAnswer={answers.find(a => a.questionId === getCurrentQuestions()[currentQuestionIndex]?.id)?.value}
          loading={loading}
          onQuickTest={handleQuickTest}
        />
      )}
      
      {currentStep === 'insufficient' && (
        <QuizInsufficientData onRetake={handleRetakeInsufficient} />
      )}
      
      {currentStep === 'results' && (
        <QuizResults />
      )}
    </div>
  );
}
