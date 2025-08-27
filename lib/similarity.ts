/**
 * Similarity + ranking utilities for AlignUK party matching.
 * - Cosine similarity (default) in 6D axis space
 * - Optional Euclidean distance
 * - Softmax to convert similarities to a percentage distribution that sums to 100
 */

import type { Vector6, PartyVector } from './partyVectors';

export type PartyMatch = {
  partyId: string;
  partyName: string;
  cosine: number;      // -1 .. +1
  euclidean: number;   // distance
  weight: number;      // 0..1 softmax weight
  percent: number;     // 0..100 (rounded)
};

export const axisKeys: (keyof Vector6)[] = [
  'economic',
  'social',
  'authority',
  'sovereignty',
  'environment',
  'welfare',
];

function dot(a: Vector6, b: Vector6): number {
  return axisKeys.reduce((sum, k) => sum + a[k] * b[k], 0);
}

function norm(a: Vector6): number {
  return Math.sqrt(axisKeys.reduce((sum, k) => sum + a[k] * a[k], 0));
}

export function cosineSimilarity(a: Vector6, b: Vector6): number {
  const d = dot(a, b);
  const na = norm(a);
  const nb = norm(b);
  if (na === 0 || nb === 0) return 0;
  return d / (na * nb);
}

export function euclideanDistance(a: Vector6, b: Vector6): number {
  const s = axisKeys.reduce((sum, k) => sum + Math.pow(a[k] - b[k], 2), 0);
  return Math.sqrt(s);
}

/**
 * Convert raw similarities to a normalized probability-like distribution via softmax.
 * Temperature controls spread: lower = peakier, higher = flatter.
 * We map cosine [-1..+1] to logits directly; you can also rescale if desired.
 */
export function softmaxWeights(values: number[], temperature = 0.7): number[] {
  const t = Math.max(0.01, temperature);
  const logits = values.map((v) => v / t);
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sum = exps.reduce((s, x) => s + x, 0);
  return exps.map((x) => (sum === 0 ? 0 : x / sum));
}

/**
 * Rank parties for a given user vector. Returns sorted matches with percentages summing to 100.
 */
export function rankParties(
  user: Vector6,
  parties: PartyVector[],
  opts?: { temperature?: number }
): PartyMatch[] {
  const cosines = parties.map((p) => cosineSimilarity(user, p.scores));
  const weights = softmaxWeights(cosines, opts?.temperature ?? 0.7);

  const matches: PartyMatch[] = parties.map((p, i) => {
    const euc = euclideanDistance(user, p.scores);
    const pct = Math.round(weights[i] * 100);
    return {
      partyId: p.id,
      partyName: p.name,
      cosine: cosines[i],
      euclidean: euc,
      weight: weights[i],
      percent: pct,
    };
  });

  // Normalize rounding to sum exactly 100 (fix any off-by-1 from rounding)
  const total = matches.reduce((s, m) => s + m.percent, 0);
  if (total !== 100) {
    // adjust the largest item to make sum = 100
    const idx = matches.reduce(
      (best, m, i, arr) => (m.percent > arr[best].percent ? i : best),
      0
    );
    matches[idx].percent += 100 - total;
  }

  return matches.sort((a, b) => b.weight - a.weight);
}
