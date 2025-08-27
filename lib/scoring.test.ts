import { calculateScores, mapLikertToScore, generateTags, generateSummary, getAxisLabel, generateOverallSummary } from './scoring';
import { QuizSession, Answer } from './types';

describe('Scoring System', () => {
  describe('mapLikertToScore', () => {
    it('should map Likert scale to correct scores', () => {
      expect(mapLikertToScore(1)).toBe(-3); // Strongly Disagree
      expect(mapLikertToScore(2)).toBe(-2); // Disagree
      expect(mapLikertToScore(3)).toBe(-1); // Somewhat Disagree
      expect(mapLikertToScore(4)).toBe(0);  // Neither Agree nor Disagree
      expect(mapLikertToScore(5)).toBe(1);  // Somewhat Agree
      expect(mapLikertToScore(6)).toBe(2);  // Agree
      expect(mapLikertToScore(7)).toBe(3);  // Strongly Agree
    });

    it('should handle invalid values', () => {
      expect(mapLikertToScore(0)).toBe(0);
      expect(mapLikertToScore(8)).toBe(0);
    });
  });

  describe('calculateScores', () => {
    it('should calculate scores for a complete session', () => {
      const answers: Answer[] = [
        { questionId: 'econ_1', value: 7 }, // Strongly agree with state intervention
        { questionId: 'econ_2', value: 1 }, // Strongly disagree with privatization
        { questionId: 'social_1', value: 7 }, // Strongly agree with same-sex marriage
        { questionId: 'social_2', value: 1 }, // Strongly disagree with religious influence
      ];

      const session: QuizSession = {
        id: 'test-session',
        answers,
        createdAt: new Date(),
      };

      const result = calculateScores(session);

      expect(result.scores).toHaveLength(6); // All axes should be present
      expect(result.hasSufficientData).toBe(false); // Not enough questions for all axes
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });

    it('should handle empty answers', () => {
      const session: QuizSession = {
        id: 'test-session',
        answers: [],
        createdAt: new Date(),
      };

      const result = calculateScores(session);

      expect(result.scores).toHaveLength(6);
      expect(result.hasSufficientData).toBe(false);
      expect(result.confidence).toBe(0);
    });
  });

  describe('generateTags', () => {
    it('should generate tags for strong positions', () => {
      const scores = [
        { axis: 'economic', score: 85, confidence: 90 },
        { axis: 'social', score: -90, confidence: 85 },
        { axis: 'authority', score: 45, confidence: 70 },
      ];

      const tags = generateTags(scores);

      expect(tags).toContain('Strongly Market-led');
      expect(tags).toContain('Strongly Traditional');
      expect(tags.length).toBeLessThanOrEqual(4);
    });

    it('should handle moderate positions', () => {
      const scores = [
        { axis: 'economic', score: 60, confidence: 80 },
        { axis: 'social', score: -55, confidence: 75 },
      ];

      const tags = generateTags(scores);

      expect(tags).toContain('Moderately Market-led');
      expect(tags).toContain('Moderately Traditional');
    });

    it('should handle neutral positions', () => {
      const scores = [
        { axis: 'economic', score: 10, confidence: 80 },
        { axis: 'social', score: -5, confidence: 75 },
      ];

      const tags = generateTags(scores);

      expect(tags.length).toBe(0); // No strong enough positions for tags
    });
  });

  describe('getAxisLabel', () => {
    it('should return correct labels for economic axis', () => {
      expect(getAxisLabel('economic', -90)).toBe('Strongly State-led');
      expect(getAxisLabel('economic', -50)).toBe('Moderately State-led');
      expect(getAxisLabel('economic', 0)).toBe('Balanced');
      expect(getAxisLabel('economic', 50)).toBe('Moderately Market-led');
      expect(getAxisLabel('economic', 90)).toBe('Strongly Market-led');
    });

    it('should return correct labels for social axis', () => {
      expect(getAxisLabel('social', -90)).toBe('Strongly Traditional');
      expect(getAxisLabel('social', 0)).toBe('Balanced');
      expect(getAxisLabel('social', 90)).toBe('Strongly Progressive');
    });

    it('should handle edge cases', () => {
      expect(getAxisLabel('economic', -100)).toBe('Strongly State-led');
      expect(getAxisLabel('economic', 100)).toBe('Strongly Market-led');
      expect(getAxisLabel('unknown', 0)).toBe('Unknown');
    });
  });

  describe('generateOverallSummary', () => {
    it('should generate summary for strong positions', () => {
      const scores = [
        { axis: 'economic', score: 85, confidence: 90 },
        { axis: 'social', score: 80, confidence: 85 },
        { axis: 'authority', score: 75, confidence: 80 },
        { axis: 'sovereignty', score: 20, confidence: 70 },
        { axis: 'environment', score: 15, confidence: 75 },
        { axis: 'welfare', score: 10, confidence: 80 },
      ];

      const summary = generateOverallSummary(scores);

      expect(summary).toContain('strong, well-defined positions');
      expect(summary).toContain('economic');
    });

    it('should generate summary for mixed positions', () => {
      const scores = [
        { axis: 'economic', score: 85, confidence: 90 },
        { axis: 'social', score: 45, confidence: 85 },
        { axis: 'authority', score: 35, confidence: 80 },
        { axis: 'sovereignty', score: 20, confidence: 70 },
        { axis: 'environment', score: 15, confidence: 75 },
        { axis: 'welfare', score: 10, confidence: 80 },
      ];

      const summary = generateOverallSummary(scores);

      expect(summary).toContain('strongest lean');
      expect(summary).toContain('economic');
    });

    it('should generate summary for balanced positions', () => {
      const scores = [
        { axis: 'economic', score: 15, confidence: 90 },
        { axis: 'social', score: 10, confidence: 85 },
        { axis: 'authority', score: 5, confidence: 80 },
        { axis: 'sovereignty', score: -5, confidence: 70 },
        { axis: 'environment', score: 85, confidence: 75 },
        { axis: 'welfare', score: 10, confidence: 80 },
      ];

      const summary = generateOverallSummary(scores);

      expect(summary).toContain('balanced, moderate positions');
      expect(summary).toContain('environmental');
    });
  });

  describe('generateSummary', () => {
    it('should generate strong summaries', () => {
      const scores = [
        { axis: 'economic', score: 85, confidence: 90 },
        { axis: 'social', score: -90, confidence: 85 },
      ];

      const summary = generateSummary(scores);

      expect(summary.economic).toContain('strongly support');
      expect(summary.social).toContain('strongly value');
    });

    it('should generate moderate summaries', () => {
      const scores = [
        { axis: 'economic', score: 60, confidence: 80 },
        { axis: 'social', score: -55, confidence: 75 },
      ];

      const summary = generateSummary(scores);

      expect(summary.economic).toContain('lean toward');
      expect(summary.social).toContain('lean toward');
    });

    it('should generate neutral summaries', () => {
      const scores = [
        { axis: 'economic', score: 20, confidence: 80 },
      ];

      const summary = generateSummary(scores);

      expect(summary.economic).toContain('balanced position');
    });
  });
});
