import { Answer, AxisScore, Question, QuizSession } from './types';
import { QUESTIONS_FULL } from './questions';
import { AXIS_IDS } from './axes';

// Constants for scoring
const LIKERT_TO_SCORE = {
  1: -3, // Strongly Disagree
  2: -2, // Disagree
  3: -1, // Somewhat Disagree
  4: 0,  // Neither Agree nor Disagree
  5: 1,  // Somewhat Agree
  6: 2,  // Agree
  7: 3,  // Strongly Agree
};

const MIN_COVERAGE_PERCENTAGE = 0.6; // 60% minimum coverage per axis
const MAX_SCORE = 100;
const MIN_SCORE = -100;

export interface ScoringResult {
  scores: AxisScore[];
  confidence: number;
  hasSufficientData: boolean;
  missingAxes: string[];
}

/**
 * Maps Likert scale (1-7) to score (-3 to +3)
 */
export function mapLikertToScore(likertValue: number): number {
  return LIKERT_TO_SCORE[likertValue as keyof typeof LIKERT_TO_SCORE] ?? 0;
}

/**
 * Calculates raw score for a single axis
 */
function calculateRawAxisScore(
  axisId: string,
  answers: Answer[],
  questions: Question[],
  importanceWeights?: Record<string, number>
): { score: number; totalWeight: number; answeredWeight: number; absoluteWeightSum: number } {
  let totalScore = 0;
  let totalWeight = 0;
  let answeredWeight = 0;
  let absoluteWeightSum = 0;

  // Get questions that target this axis
  const axisQuestions = questions.filter(q => 
    q.axisTargets.some(target => target.axis === axisId)
  );

  for (const question of axisQuestions) {
    const answer = answers.find(a => a.questionId === question.id);
    const axisTarget = question.axisTargets.find(target => target.axis === axisId);
    
    if (!axisTarget) continue;

    const weight = axisTarget.weight;
    const importanceMultiplier = importanceWeights?.[axisId] ?? 1.0;
    const adjustedWeight = weight * importanceMultiplier;
    
    totalWeight += adjustedWeight;
    absoluteWeightSum += Math.abs(adjustedWeight);

    if (answer !== undefined) {
      const questionScore = mapLikertToScore(answer.value); // answer.value should already be 1-7
      totalScore += questionScore * adjustedWeight;
      answeredWeight += adjustedWeight;
    }
  }

  return { score: totalScore, totalWeight, answeredWeight, absoluteWeightSum };
}

/**
 * Normalizes score to -100 to +100 range
 */
function normalizeScore(rawScore: number, maxPossibleScore: number): number {
  if (maxPossibleScore === 0) return 0;
  
  const normalized = (rawScore / maxPossibleScore) * MAX_SCORE;
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, normalized));
}

/**
 * Calculates confidence percentage for an axis
 */
function calculateConfidence(answeredWeight: number, totalWeight: number): number {
  if (totalWeight === 0) return 0;
  return Math.round((answeredWeight / totalWeight) * 100);
}

/**
 * Checks if there's sufficient data coverage for an axis
 */
function hasSufficientCoverage(answeredWeight: number, totalWeight: number): boolean {
  if (totalWeight === 0) return false;
  return (answeredWeight / totalWeight) >= MIN_COVERAGE_PERCENTAGE;
}

/**
 * Main scoring function
 */
export function calculateScores(session: QuizSession): ScoringResult {
  const answers = session.answers;
  const questions = QUESTIONS_FULL;
  const importanceWeights = session.importanceWeights;

  const scores: AxisScore[] = [];
  const missingAxes: string[] = [];
  let overallConfidence = 0;

  for (const axisId of AXIS_IDS) {
    const { score: rawScore, totalWeight, answeredWeight, absoluteWeightSum } = calculateRawAxisScore(
      axisId,
      answers,
      questions,
      importanceWeights
    );

    // Calculate maximum possible score for this axis
    // Use absolute sum of weights to handle balanced positive/negative weights
    const maxPossibleScore = absoluteWeightSum * 3; // Maximum score per question is 3
    const normalizedScore = normalizeScore(rawScore, maxPossibleScore);
    const confidence = calculateConfidence(answeredWeight, totalWeight);
    const hasSufficientData = hasSufficientCoverage(answeredWeight, totalWeight);

    scores.push({
      axis: axisId as any,
      score: Math.round(normalizedScore),
      confidence,
    });

    if (!hasSufficientData) {
      missingAxes.push(axisId);
    }

    overallConfidence += confidence;
  }

  overallConfidence = Math.round(overallConfidence / AXIS_IDS.length);

  return {
    scores,
    confidence: overallConfidence,
    hasSufficientData: missingAxes.length === 0,
    missingAxes,
  };
}

/**
 * Gets axis label based on score (0-100 scale, 50 = balanced)
 */
export function getAxisLabel(axis: string, score: number): string {
  // Convert from -100 to +100 scale to 0 to 100 scale
  const normalizedScore = Math.max(0, Math.min(100, (score + 100) / 2));
  console.log(`getAxisLabel called: axis=${axis}, score=${score}, normalizedScore=${normalizedScore}`);
  
  const labelMaps: Record<string, string[]> = {
    economic: [
      'Strongly State-led',
      'Moderately State-led', 
      'Balanced',
      'Moderately Market-led',
      'Strongly Market-led'
    ],
    social: [
      'Strongly Traditional',
      'Moderately Traditional',
      'Balanced', 
      'Moderately Progressive',
      'Strongly Progressive'
    ],
    authority: [
      'Strongly Libertarian',
      'Moderately Libertarian',
      'Balanced',
      'Moderately Authoritarian', 
      'Strongly Authoritarian'
    ],
    sovereignty: [
      'Strongly Globalist',
      'Moderately Globalist',
      'Balanced',
      'Moderately Nationalist',
      'Strongly Nationalist'
    ],
    environment: [
      'Strongly Growth-oriented',
      'Moderately Growth-oriented',
      'Balanced',
      'Moderately Sustainability-focused',
      'Strongly Sustainability-focused'
    ],
    welfare: [
      'Strongly Minimal Welfare',
      'Moderately Minimal Welfare',
      'Balanced',
      'Moderately Universal Welfare',
      'Strongly Universal Welfare'
    ]
  };

  const labels = labelMaps[axis] || ['Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown'];
  console.log(`Labels for ${axis}:`, labels);
  
  let result;
  if (normalizedScore <= 20) result = labels[0];
  else if (normalizedScore <= 40) result = labels[1];
  else if (normalizedScore <= 60) result = labels[2];
  else if (normalizedScore <= 80) result = labels[3];
  else result = labels[4];
  
  console.log(`getAxisLabel result for ${axis}: ${result}`);
  return result;
}

/**
 * Generates overall summary sentence
 */
export function generateOverallSummary(scores: AxisScore[]): string {
  // Find the strongest lean (highest absolute score)
  const strongestScore = scores.reduce((max, score) => 
    Math.abs(score.score) > Math.abs(max.score) ? score : max
  );
  
  // Count balanced vs non-balanced positions
  const balancedCount = scores.filter(score => Math.abs(score.score) < 20).length;
  const moderateCount = scores.filter(score => 
    Math.abs(score.score) >= 20 && Math.abs(score.score) < 60
  ).length;
  const strongCount = scores.filter(score => Math.abs(score.score) >= 60).length;
  
  const strongestLabel = getAxisLabel(strongestScore.axis, strongestScore.score);
  const axisName = getAxisDisplayName(strongestScore.axis);
  
  if (strongCount >= 3) {
    return `You have strong, well-defined positions across multiple areas, with your strongest lean being ${strongestLabel.toLowerCase()} on ${axisName} issues.`;
  } else if (strongCount >= 1 && moderateCount >= 2) {
    return `Your strongest lean is on ${axisName} issues, where you are ${strongestLabel.toLowerCase()}, while your other views show moderate variation.`;
  } else if (balancedCount >= 4) {
    return `You tend toward balanced, moderate positions across most areas, with your most distinctive view being ${strongestLabel.toLowerCase()} on ${axisName} issues.`;
  } else {
    return `You have a mixed political profile, with your strongest lean being ${strongestLabel.toLowerCase()} on ${axisName} issues.`;
  }
}

function getAxisDisplayName(axis: string): string {
  const names: Record<string, string> = {
    economic: 'economic',
    social: 'social',
    authority: 'authority and governance',
    sovereignty: 'international relations',
    environment: 'environmental',
    welfare: 'welfare and social policy'
  };
  return names[axis] || axis;
}

/**
 * Generates tags based on scores
 */
export function generateTags(scores: AxisScore[]): string[] {
  const tags: string[] = [];
  console.log('generateTags called with scores:', scores);

  for (const score of scores) {
    const absScore = Math.abs(score.score);
    console.log(`Processing ${score.axis}: score=${score.score}, absScore=${absScore}`);
    
    if (absScore >= 60) {
      // Strong positions
      const label = getAxisLabel(score.axis, score.score);
      console.log(`Strong position for ${score.axis}: ${label}`);
      tags.push(label);
    } else if (absScore >= 20) {
      // Moderate positions
      const label = getAxisLabel(score.axis, score.score);
      console.log(`Moderate position for ${score.axis}: ${label}`);
      tags.push(label);
    }
  }

  console.log('Final tags:', tags);
  return tags.slice(0, 4); // Limit to 4 tags
}

/**
 * Generates summary text for each axis
 */
export function generateSummary(scores: AxisScore[]): Record<string, string> {
  const summaries: Record<string, string> = {};

  for (const score of scores) {
    const absScore = Math.abs(score.score);
    
    if (absScore >= 80) {
      summaries[score.axis] = getStrongSummary(score.axis, score.score > 0);
    } else if (absScore >= 50) {
      summaries[score.axis] = getModerateSummary(score.axis, score.score > 0);
    } else {
      summaries[score.axis] = getNeutralSummary(score.axis);
    }
  }

  return summaries;
}

function getStrongSummary(axis: string, isPositive: boolean): string {
  const summaryMap: Record<string, { positive: string; negative: string }> = {
    economic: { 
      positive: 'You strongly support government intervention in the economy',
      negative: 'You strongly prefer market-driven economic policies'
    },
    social: { 
      positive: 'You strongly support progressive social change',
      negative: 'You strongly value traditional social institutions'
    },
    authority: { 
      positive: 'You strongly support collective control and authority',
      negative: 'You strongly value individual freedom and autonomy'
    },
    sovereignty: { 
      positive: 'You strongly support international cooperation and integration',
      negative: 'You strongly prioritize national independence and sovereignty'
    },
    environment: { 
      positive: 'You strongly prioritize environmental protection over economic growth',
      negative: 'You strongly prioritize economic growth and energy security'
    },
    welfare: { 
      positive: 'You strongly support universal welfare provision',
      negative: 'You strongly support conditional welfare policies'
    },
  };

  return summaryMap[axis]?.[isPositive ? 'positive' : 'negative'] ?? 
    `You have a strong position on ${axis} issues`;
}

function getModerateSummary(axis: string, isPositive: boolean): string {
  const summaryMap: Record<string, { positive: string; negative: string }> = {
    economic: { 
      positive: 'You lean toward government intervention in the economy',
      negative: 'You lean toward market-driven economic policies'
    },
    social: { 
      positive: 'You lean toward progressive social change',
      negative: 'You lean toward traditional social values'
    },
    authority: { 
      positive: 'You lean toward collective control and authority',
      negative: 'You lean toward individual freedom and autonomy'
    },
    sovereignty: { 
      positive: 'You lean toward international cooperation',
      negative: 'You lean toward national independence'
    },
    environment: { 
      positive: 'You lean toward environmental protection',
      negative: 'You lean toward economic growth priorities'
    },
    welfare: { 
      positive: 'You lean toward universal welfare provision',
      negative: 'You lean toward conditional welfare policies'
    },
  };

  return summaryMap[axis]?.[isPositive ? 'positive' : 'negative'] ?? 
    `You have a moderate position on ${axis} issues`;
}

function getNeutralSummary(axis: string): string {
  return `You have a balanced position on ${axis} issues`;
}
