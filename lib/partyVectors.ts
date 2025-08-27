/**
 * Party alignment dataset for AlignUK
 *
 * What this is:
 * --------------
 * Rough ideological "vectors" for major UK parties across AlignUK's six axes.
 * Scale per axis: -100 .. +100
 *  - Negative = left/liberal/globalist/decarb/universalist
 *  - Positive = right/traditional/national/growth/conditionalist
 *
 * How to use:
 *  1) Compute a user vector from quiz scores (same six keys).
 *  2) Compare the user vector to each party vector via cosine similarity.
 *  3) Convert similarities to % weights (softmax) → show ranked results + visual.
 *
 * Notes:
 *  - These are prototypes based on 2024–25 context. Update near elections.
 *  - Be transparent with users: this is a guide, not an endorsement.
 */

export type AxisKey =
  | 'economic'
  | 'social'
  | 'authority'
  | 'sovereignty'
  | 'environment'
  | 'welfare';

export type Vector6 = Record<AxisKey, number>;

export type PartyVector = {
  id: string;
  name: string;
  scores: Vector6;
};

export const PARTY_VECTORS: PartyVector[] = [
  {
    id: 'labour',
    name: 'Labour',
    scores: {
      economic: -60,
      social: +60,
      authority: +20,
      sovereignty: -50,
      environment: +70,
      welfare: +40,
    },
  },
  {
    id: 'conservative',
    name: 'Conservative',
    scores: {
      economic: +20,
      social: -20,
      authority: +50,
      sovereignty: +30,
      environment: -10,
      welfare: -20,
    },
  },
  {
    id: 'libdem',
    name: 'Liberal Democrats',
    scores: {
      economic: -20,
      social: +70,
      authority: -40,
      sovereignty: -60,
      environment: +60,
      welfare: +30,
    },
  },
  {
    id: 'greens',
    name: 'Green Party',
    scores: {
      economic: -70,
      social: +80,
      authority: -50,
      sovereignty: -70,
      environment: +90,
      welfare: +70,
    },
  },
  {
    id: 'reform',
    name: 'Reform UK',
    scores: {
      economic: +60,
      social: -60,
      authority: +60,
      sovereignty: +70,
      environment: -80,
      welfare: -50,
    },
  },
];
