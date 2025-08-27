import { cosineSimilarity, euclideanDistance, softmaxWeights, rankParties } from './similarity';
import { PARTY_VECTORS } from './partyVectors';
import type { Vector6 } from './partyVectors';

describe('Similarity Functions', () => {
  describe('cosineSimilarity', () => {
    it('should return 1 for identical vectors', () => {
      const vector: Vector6 = {
        economic: 10,
        social: 20,
        authority: 30,
        sovereignty: 40,
        environment: 50,
        welfare: 60,
      };
      expect(cosineSimilarity(vector, vector)).toBe(1);
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
      expect(cosineSimilarity(vector1, vector2)).toBeCloseTo(-1, 5);
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
      expect(cosineSimilarity(vector1, vector2)).toBe(0);
    });
  });

  describe('euclideanDistance', () => {
    it('should return 0 for identical vectors', () => {
      const vector: Vector6 = {
        economic: 10,
        social: 20,
        authority: 30,
        sovereignty: 40,
        environment: 50,
        welfare: 60,
      };
      expect(euclideanDistance(vector, vector)).toBe(0);
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
      expect(euclideanDistance(vector1, vector2)).toBeGreaterThan(0);
    });
  });

  describe('softmaxWeights', () => {
    it('should return weights that sum to 1', () => {
      const values = [1, 2, 3, 4, 5];
      const weights = softmaxWeights(values);
      const sum = weights.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1, 5);
    });

    it('should return all equal weights for equal values', () => {
      const values = [1, 1, 1, 1, 1];
      const weights = softmaxWeights(values);
      weights.forEach(weight => {
        expect(weight).toBeCloseTo(0.2, 5);
      });
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

      const matches = rankParties(userScores, PARTY_VECTORS);
      
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

      const matches = rankParties(extremeScores, PARTY_VECTORS);
      expect(matches).toHaveLength(PARTY_VECTORS.length);
      
      const totalPercent = matches.reduce((sum, match) => sum + match.percent, 0);
      expect(totalPercent).toBe(100);
    });
  });
});
