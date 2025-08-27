/**
 * Similarity + ranking utilities for AlignUK party matching (v2).
 * - Weighted cosine similarity + softmax (default lower temperature)
 * - Alternative inverse-distance strategy for sharper separation
 * - Axis weighting support (global defaults or per-user)
 * - Diagnostics to detect clustered similarities
 */

import type { Vector6, PartyVector, AxisKey } from './partyVectors';

export type Strategy = 'cosineSoftmax' | 'inverseDistance';

export type PartyMatch = {
  partyId: string;
  partyName: string;
  cosine: number;      // -1 .. +1 (weighted)
  euclidean: number;   // weighted Euclidean distance
  weight: number;      // 0..1 softmax or normalized inverse-distance weight
  percent: number;     // 0..100 (rounded)
};

export type RankOptions = {
  /** Strategy to convert closeness to percents */
  method?: Strategy;               // default: 'inverseDistance'
  /** Softmax temperature for cosineSoftmax; lower = peakier */
  temperature?: number;            // default: 0.3
  /** Per-axis weights, e.g. give sovereignty/authority more influence */
  axisWeights?: Partial<Record<AxisKey, number>>;
  /** Minimum separation alert: if top and median within this diff, flag */
  clusterEpsilon?: number;         // default: 0.04 (cosine space)
};

export const axisKeys: AxisKey[] = [
  'economic',
  'social',
  'authority',
  'sovereignty',
  'environment',
  'welfare',
];

function mergedAxisWeights(overrides?: RankOptions['axisWeights']): Record<AxisKey, number> {
  // Reasonable, conservative defaults; tweak as needed
  const base: Record<AxisKey, number> = {
    economic: 1.0,
    social: 1.0,
    authority: 1.15,
    sovereignty: 1.20,
    environment: 1.0,
    welfare: 1.0,
  };
  return { ...base, ...(overrides || {}) } as Record<AxisKey, number>;
}

function dotWeighted(a: Vector6, b: Vector6, w: Record<AxisKey, number>): number {
  return axisKeys.reduce((sum, k) => sum + w[k] * a[k] * b[k], 0);
}

function normWeighted(a: Vector6, w: Record<AxisKey, number>): number {
  return Math.sqrt(axisKeys.reduce((sum, k) => sum + w[k] * a[k] * a[k], 0));
}

export function cosineSimilarityWeighted(a: Vector6, b: Vector6, w: Record<AxisKey, number>): number {
  const d = dotWeighted(a, b, w);
  const na = normWeighted(a, w);
  const nb = normWeighted(b, w);
  if (na === 0 || nb === 0) return 0;
  return d / (na * nb);
}

export function euclideanDistanceWeighted(a: Vector6, b: Vector6, w: Record<AxisKey, number>): number {
  const s = axisKeys.reduce((sum, k) => sum + w[k] * Math.pow(a[k] - b[k], 2), 0);
  return Math.sqrt(s);
}

function softmax(values: number[], temperature = 0.3): number[] {
  const t = Math.max(0.01, temperature);
  const logits = values.map((v) => v / t);
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sum = exps.reduce((s, x) => s + x, 0);
  return exps.map((x) => (sum === 0 ? 0 : x / sum));
}

function normalizeToPercents(weights: number[]): number[] {
  const sum = weights.reduce((s, x) => s + x, 0);
  const raw = sum > 0 ? weights.map((x) => x / sum) : weights.map(() => 0);
  const rounded = raw.map((p) => Math.round(p * 100));
  // fix rounding drift
  const diff = 100 - rounded.reduce((s, x) => s + x, 0);
  if (diff !== 0) {
    const idx = rounded.indexOf(Math.max(...rounded));
    rounded[idx] += diff;
  }
  return rounded;
}

function normalize(vals: number[]): number[] {
  const s = vals.reduce((a, b) => a + b, 0);
  return s > 0 ? vals.map((v) => v / s) : vals.map(() => 0);
}

export function rankParties(
  user: Vector6,
  parties: PartyVector[],
  opts?: RankOptions
): PartyMatch[] {
  const method: Strategy = opts?.method ?? 'inverseDistance';
  const temp = opts?.temperature ?? 0.3;
  const w = mergedAxisWeights(opts?.axisWeights);

  const cosines = parties.map((p) => cosineSimilarityWeighted(user, p.scores, w));
  const dists = parties.map((p) => euclideanDistanceWeighted(user, p.scores, w));

  let weights: number[] = [];

  if (method === 'cosineSoftmax') {
    weights = softmax(cosines, temp);
  } else {
    // inverse-distance weighting with stability
    const eps = 1e-6;
    const inv = dists.map((d) => 1 / Math.max(eps, d));
    weights = normalize(inv);
  }

  const percents = normalizeToPercents(weights);

  const matches: PartyMatch[] = parties.map((p, i) => ({
    partyId: p.id,
    partyName: p.name,
    cosine: cosines[i],
    euclidean: dists[i],
    weight: weights[i],
    percent: percents[i],
  })).sort((a, b) => b.weight - a.weight);

  return matches;
}

/**
 * Quick diagnostic: detects clustered cosines that can lead to "flat" bars.
 * Returns true if median and top cosine within epsilon.
 */
export function isClustered(
  user: Vector6,
  parties: PartyVector[],
  axisWeights?: RankOptions['axisWeights'],
  epsilon = 0.04
): boolean {
  const w = mergedAxisWeights(axisWeights);
  const cos = parties.map((p) => cosineSimilarityWeighted(user, p.scores, w)).sort((a, b) => b - a);
  const top = cos[0];
  const mid = cos[Math.floor(cos.length / 2)];
  return top - mid < epsilon;
}
