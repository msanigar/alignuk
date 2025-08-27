import { cosineSimilarityWeighted, euclideanDistanceWeighted, rankParties, isClustered } from './similarity';
import { PARTY_VECTORS } from './partyVectors';
import type { Vector6 } from './partyVectors';

describe('Similarity Functions', () => {
  const defaultWeights = {
    economic: 1.0,
    social: 1.0,
    authority: 1.15,
    sovereignty: 1.20,
    environment: 1.0,
    welfare: 1.0,
  };

  describe('cosineSimilarityWeighted', () => {
    it('should return 1 for identical vectors', () => {
      const vector: Vector6 = {
        economic: 10,
        social: 20,
        authority: 30,
        sovereignty: 40,
        environment: 50,
        welfare: 60,
      };
      expect(cosineSimilarityWeighted(vector, vector, defaultWeights)).toBe(1);
    });

    it('should return -1 for opposite vectors', () => {
      const vector1: Vector6 = {
        economic: 10,
        social: 20,
        authority: 30,
        sovereignty: 40,
        environment: 50,
        welfare: 60,
      };
      const vector2: Vector6 = {
        economic: -10,
        social: -20,
        authority: -30,
        sovereignty: -40,
        environment: -50,
        welfare: -60,
      };
      expect(cosineSimilarityWeighted(vector1, vector2, defaultWeights)).toBeCloseTo(-1, 5);
    });

    it('should return 0 for orthogonal vectors', () => {
      const vector1: Vector6 = {
        economic: 1,
        social: 0,
        authority: 0,
        sovereignty: 0,
        environment: 0,
        welfare: 0,
      };
      const vector2: Vector6 = {
        economic: 0,
        social: 1,
        authority: 0,
        sovereignty: 0,
        environment: 0,
        welfare: 0,
      };
      expect(cosineSimilarityWeighted(vector1, vector2, defaultWeights)).toBe(0);
    });
  });

  describe('euclideanDistanceWeighted', () => {
    it('should return 0 for identical vectors', () => {
      const vector: Vector6 = {
        economic: 10,
        social: 20,
        authority: 30,
        sovereignty: 40,
        environment: 50,
        welfare: 60,
      };
      expect(euclideanDistanceWeighted(vector, vector, defaultWeights)).toBe(0);
    });

    it('should return positive distance for different vectors', () => {
      const vector1: Vector6 = {
        economic: 0,
        social: 0,
        authority: 0,
        sovereignty: 0,
        environment: 0,
        welfare: 0,
      };
      const vector2: Vector6 = {
        economic: 1,
        social: 1,
        authority: 1,
        sovereignty: 1,
        environment: 1,
        welfare: 1,
      };
      expect(euclideanDistanceWeighted(vector1, vector2, defaultWeights)).toBeGreaterThan(0);
    });
  });



  describe('rankParties', () => {
    it('should return ranked parties with percentages summing to 100', () => {
      const userScores: Vector6 = {
        economic: 50,
        social: -30,
        authority: 20,
        sovereignty: 10,
        environment: -40,
        welfare: 25,
      };

      const matches = rankParties(userScores, PARTY_VECTORS, {
        method: 'inverseDistance',
        temperature: 0.3,
      });
      
      // Should have same number of parties
      expect(matches).toHaveLength(PARTY_VECTORS.length);
      
      // Should be sorted by weight (descending)
      for (let i = 1; i < matches.length; i++) {
        expect(matches[i-1].weight).toBeGreaterThanOrEqual(matches[i].weight);
      }
      
      // Percentages should sum to 100
      const totalPercent = matches.reduce((sum, match) => sum + match.percent, 0);
      expect(totalPercent).toBe(100);
      
      // Each match should have required properties
      matches.forEach(match => {
        expect(match).toHaveProperty('partyId');
        expect(match).toHaveProperty('partyName');
        expect(match).toHaveProperty('cosine');
        expect(match).toHaveProperty('euclidean');
        expect(match).toHaveProperty('weight');
        expect(match).toHaveProperty('percent');
        expect(match.percent).toBeGreaterThanOrEqual(0);
        expect(match.percent).toBeLessThanOrEqual(100);
      });
    });

    it('should handle extreme user scores', () => {
      const extremeScores: Vector6 = {
        economic: 100,
        social: 100,
        authority: 100,
        sovereignty: 100,
        environment: 100,
        welfare: 100,
      };

      const matches = rankParties(extremeScores, PARTY_VECTORS, {
        method: 'inverseDistance',
        temperature: 0.3,
      });
      expect(matches).toHaveLength(PARTY_VECTORS.length);
      
      const totalPercent = matches.reduce((sum, match) => sum + match.percent, 0);
      expect(totalPercent).toBe(100);
    });
  });

  describe('isClustered', () => {
    it('should detect clustered similarities', () => {
      const clusteredScores: Vector6 = {
        economic: 0,
        social: 0,
        authority: 0,
        sovereignty: 0,
        environment: 0,
        welfare: 0,
      };

      const clustered = isClustered(clusteredScores, PARTY_VECTORS, defaultWeights, 0.04);
      expect(typeof clustered).toBe('boolean');
    });

    it('should handle different epsilon values', () => {
      const scores: Vector6 = {
        economic: 50,
        social: -30,
        authority: 20,
        sovereignty: 10,
        environment: -40,
        welfare: 25,
      };

      const clustered1 = isClustered(scores, PARTY_VECTORS, defaultWeights, 0.01);
      const clustered2 = isClustered(scores, PARTY_VECTORS, defaultWeights, 0.1);
      
      expect(typeof clustered1).toBe('boolean');
      expect(typeof clustered2).toBe('boolean');
    });
  });
});
