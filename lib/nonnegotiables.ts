/**
 * Non-compensatory "deal-breakers" layer for AlignUK.
 *
 * Idea:
 * - If a user answers at an extreme (Likert 1 or 7 → score -3 or +3) on certain
 *   policy-tagged items, treat that as a "non-negotiable".
 * - Parties whose stance conflicts with those non-negotiables are penalised (soft) or excluded (hard).
 *
 * You can expand:
 * - POLICY_KEYS map (add more policy issues)
 * - QUESTION_POLICY_MAP (link more questionIds to policy keys)
 * - PARTY_POLICY_STANCES (party positions on each policy key: -1..+1)
 */

import type { PartyMatch } from './similarity';
import type { AxisKey } from './partyVectors';

// ------------- Policy keys you care about (expand freely) -------------
export type PolicyKey =
  | 'immigration_control'
  | 'echr_withdrawal'
  | 'net_zero_priority'
  | 'nhs_free_point_of_use'
  | 'national_service'
  | 'private_provision_public_services';

// ------------- Map quiz questionIds → policy keys -------------
// Add entries for any questions that strongly indicate a concrete policy preference.
export const QUESTION_POLICY_MAP: Record<string, PolicyKey> = {
  // Sovereignty / borders
  sovereign_4: 'immigration_control',      // tighter control even if labour supply impacted
  sovereign_9: 'immigration_control',      // caps tightened further

  // ECHR
  sovereign_7: 'echr_withdrawal',

  // Net Zero
  env_1: 'net_zero_priority',              // climate as top spend priority
  env_2: 'net_zero_priority',              // reverse worded (growth over emissions)

  // NHS
  welfare_3: 'nhs_free_point_of_use',
  welfare_4: 'nhs_free_point_of_use',      // reverse worded (more private costs)

  // National service
  auth_6: 'national_service',

  // Private provision in public services
  econ_2: 'private_provision_public_services',
};

// ------------- Party stances on each policy key: -1 .. +1 -------------
// -1 = opposed, 0 = mixed/nuanced, +1 = supportive.
// Prototype values; refine with manifesto/voting data.
export const PARTY_POLICY_STANCES: Record<string, Partial<Record<PolicyKey, number>>> = {
  labour: {
    immigration_control: -0.3,
    echr_withdrawal: -1,
    net_zero_priority: +0.8,
    nhs_free_point_of_use: +0.8,
    national_service: -0.4,
    private_provision_public_services: -0.2,
  },
  conservative: {
    immigration_control: +0.6,
    echr_withdrawal: -0.4,
    net_zero_priority: +0.2,
    nhs_free_point_of_use: +0.5,
    national_service: +0.5,
    private_provision_public_services: +0.4,
  },
  libdem: {
    immigration_control: -0.5,
    echr_withdrawal: -1,
    net_zero_priority: +0.7,
    nhs_free_point_of_use: +0.6,
    national_service: -0.6,
    private_provision_public_services: -0.1,
  },
  greens: {
    immigration_control: -0.8,
    echr_withdrawal: -0.8,
    net_zero_priority: +1.0,
    nhs_free_point_of_use: +0.8,
    national_service: -0.8,
    private_provision_public_services: -0.8,
  },
  reform: {
    immigration_control: +1.0,
    echr_withdrawal: +0.9,
    net_zero_priority: -0.9, // prioritise growth/energy security over Net Zero push
    nhs_free_point_of_use: -0.2,
    national_service: +0.7,
    private_provision_public_services: +0.6,
  },
  snp: {
    immigration_control: -0.2,
    echr_withdrawal: -0.6,
    net_zero_priority: +0.6,
    nhs_free_point_of_use: +0.7,
    national_service: -0.3,
    private_provision_public_services: -0.3,
  },
  plaid: {
    immigration_control: -0.3,
    echr_withdrawal: -0.7,
    net_zero_priority: +0.8,
    nhs_free_point_of_use: +0.6,
    national_service: -0.5,
    private_provision_public_services: -0.4,
  },
  dup: {
    immigration_control: +0.4,
    echr_withdrawal: +0.2,
    net_zero_priority: +0.1,
    nhs_free_point_of_use: +0.3,
    national_service: +0.6,
    private_provision_public_services: +0.3,
  },
  sinnfein: {
    immigration_control: -0.4,
    echr_withdrawal: -0.5,
    net_zero_priority: +0.5,
    nhs_free_point_of_use: +0.7,
    national_service: -0.7,
    private_provision_public_services: -0.5,
  },
  alliance: {
    immigration_control: -0.2,
    echr_withdrawal: -0.8,
    net_zero_priority: +0.6,
    nhs_free_point_of_use: +0.5,
    national_service: -0.4,
    private_provision_public_services: -0.2,
  },
  sdlp: {
    immigration_control: -0.3,
    echr_withdrawal: -0.6,
    net_zero_priority: +0.5,
    nhs_free_point_of_use: +0.6,
    national_service: -0.5,
    private_provision_public_services: -0.3,
  },
  uup: {
    immigration_control: +0.3,
    echr_withdrawal: -0.2,
    net_zero_priority: +0.2,
    nhs_free_point_of_use: +0.4,
    national_service: +0.4,
    private_provision_public_services: +0.2,
  },
};

// ------------- User extreme → desired direction: -1 (oppose) or +1 (support) -------------
// We infer from the question stem polarity. Use a per-question sign to interpret extremes.
const QUESTION_DESIRED_SIGN: Record<string, number> = {
  sovereign_4: +1,   // extreme agree => tighter control (support); extreme disagree => looser control (oppose)
  sovereign_9: +1,
  sovereign_7: +1,   // extreme agree => withdraw ECHR
  env_1: +1,         // extreme agree => prioritise Net Zero
  env_2: -1,         // extreme agree => prioritise growth over Net Zero
  welfare_3: +1,     // extreme agree => strong NHS free-at-point-of-use
  welfare_4: -1,     // extreme agree => shift costs private
  auth_6: +1,        // extreme agree => national service
  econ_2: +1,        // extreme agree => private provision ok
};

// ------------- API -------------

export type NonNegotiable = {
  policy: PolicyKey;
  direction: -1 | 0 | 1;     // user's implied direction
  strength: number;          // 0..1 (how hard to enforce)
  sourceQuestionIds: string[]; // which questions triggered this
};

export type BuildNNOpts = {
  extremeThreshold?: number;    // default 3 (i.e., ±3 mapped score)
  strengthPerExtreme?: number;  // base strength per extreme item (default 0.6)
  capStrength?: number;         // max strength per policy (default 1.0)
};

/**
 * Build non-negotiables from answered questions.
 * `answers` = map questionId -> value in [-3..+3]
 */
export function buildNonNegotiables(
  answers: Record<string, number>,
  opts?: BuildNNOpts
): NonNegotiable[] {
  const extreme = opts?.extremeThreshold ?? 3;
  const base = opts?.strengthPerExtreme ?? 0.6;
  const cap = opts?.capStrength ?? 1.0;

  const byPolicy = new Map<PolicyKey, NonNegotiable>();

  Object.entries(answers).forEach(([qid, val]) => {
    const policy = QUESTION_POLICY_MAP[qid];
    if (!policy) return;
    if (Math.abs(val) < extreme) return;

    const sign = QUESTION_DESIRED_SIGN[qid] ?? 0;
    if (!sign) return;

    const desired: -1 | 1 = (val > 0 ? sign : -sign) as -1 | 1;

    const existing = byPolicy.get(policy);
    if (!existing) {
      byPolicy.set(policy, {
        policy,
        direction: desired,
        strength: Math.min(cap, base),
        sourceQuestionIds: [qid],
      });
    } else {
      // If multiple extremes in same policy, reinforce direction and strength.
      const sameDir = existing.direction === desired;
      existing.direction = sameDir ? existing.direction : existing.direction; // keep first direction to avoid flip-flop
      existing.strength = Math.min(cap, existing.strength + base * 0.5);
      existing.sourceQuestionIds.push(qid);
    }
  });

  return Array.from(byPolicy.values());
}

export type ApplyNNMode = 'hard' | 'soft';

export type ApplyNNOptions = {
  mode?: ApplyNNMode;       // 'hard' excludes; 'soft' penalises
  lambda?: number;          // penalty intensity for soft mode (default 2.0)
  minKeep?: number;         // always keep top-N even if conflicted (avoid empty result) default 1
};

/**
 * Adjust party matches according to non-negotiables.
 * - HARD: remove parties with strong conflict against any non-negotiable
 * - SOFT: multiply weights by exp(-lambda * conflictScore)
 *
 * Conflict score per party = sum over policies of max(0, - userDir * partyStance) * strength
 *   If userDir=+1 (support), partyStance<0 → conflict. If userDir=-1 (oppose), partyStance>0 → conflict.
 */
export function applyNonNegotiables(
  matches: PartyMatch[],
  nn: NonNegotiable[],
  opts?: ApplyNNOptions
): { adjusted: PartyMatch[]; notes: string[] } {
  if (!nn.length) return { adjusted: matches, notes: [] };

  const mode = opts?.mode ?? 'soft';
  const lambda = opts?.lambda ?? 2.0;
  const minKeep = opts?.minKeep ?? 1;
  const notes: string[] = [];

  // Compute conflict per party
  const conflicts = new Map<string, number>();
  for (const m of matches) {
    let conf = 0;
    const stances = PARTY_POLICY_STANCES[m.partyId] || {};
    for (const rule of nn) {
      const ps = stances[rule.policy] ?? 0; // if unknown, assume neutral 0
      const signed = rule.direction * ps;   // + aligned, - conflict
      const c = signed < 0 ? (-signed) * rule.strength : 0;
      conf += c;
    }
    conflicts.set(m.partyId, conf);
  }

  if (mode === 'hard') {
    // Exclude parties with any significant conflict; keep at least minKeep best by weight
    const threshold = 0.5; // tuneable
    let kept = matches.filter((m) => (conflicts.get(m.partyId) ?? 0) < threshold);

    if (kept.length < minKeep) {
      kept = [...matches].sort((a, b) => (conflicts.get(a.partyId)! - conflicts.get(b.partyId)!)).slice(0, minKeep);
    }
    const dropped = matches.filter((m) => !kept.find((k) => k.partyId === m.partyId));
    dropped.forEach((d) => notes.push(`Excluded ${d.partyName} due to conflicts with your non-negotiables.`));
    // Renormalise percents
    const sum = kept.reduce((s, k) => s + k.percent, 0) || 1;
    kept.forEach((k) => (k.percent = Math.round((k.percent / sum) * 100)));
    const diff = 100 - kept.reduce((s, k) => s + k.percent, 0);
    if (diff !== 0) {
      const idx = kept.reduce((iMax, x, i, arr) => (x.percent > arr[iMax].percent ? i : iMax), 0);
      kept[idx].percent += diff;
    }
    return { adjusted: kept, notes };
  }

  // SOFT mode: down-weight by exp(-lambda * conflict)
  const adjusted = matches.map((m) => {
    const c = conflicts.get(m.partyId) ?? 0;
    const factor = Math.exp(-lambda * c); // 0..1
    return { ...m, weight: m.weight * factor };
  });

  // Convert weights → percents again
  const sumW = adjusted.reduce((s, x) => s + x.weight, 0) || 1;
  adjusted.forEach((m) => (m.percent = Math.round((m.weight / sumW) * 100)));
  const drift = 100 - adjusted.reduce((s, m) => s + m.percent, 0);
  if (drift !== 0) {
    const idx = adjusted.reduce((iMax, x, i, arr) => (x.percent > arr[iMax].percent ? i : iMax), 0);
    adjusted[idx].percent += drift;
  }

  // Notes for UI transparency
  nn.forEach((rule) => {
    notes.push(
      `Applied non-negotiable on ${rule.policy.replace(/_/g, ' ')} (${rule.direction > 0 ? 'support' : 'oppose'}).`
    );
  });

  return { adjusted: adjusted.sort((a, b) => b.weight - a.weight), notes };
}
