'use client';

import React from 'react';
import { PARTY_VECTORS } from '@/lib/partyVectors';
import { rankParties, isClustered, type PartyMatch } from '@/lib/similarity';
import { PartyMatchBars } from '@/components/PartyMatchBars';
import { Vector6 } from '@/lib/partyVectors';
import { buildNonNegotiables, applyNonNegotiables } from '@/lib/nonnegotiables';

export function PartyMatches({ 
  userScores, 
  answers 
}: { 
  userScores: Vector6;
  answers?: Record<string, number>; // questionId -> value in [-3..+3]
}) {
  // Default axis weights with higher importance for sovereignty and authority
  const axisWeights = {
    sovereignty: 1.25,
    authority: 1.15,
    // leave others at default or tweak as desired
  };

  // Step 1: Base ranking (with weighting improvements from earlier)
  const baseMatches = rankParties(userScores, PARTY_VECTORS, {
    method: 'inverseDistance',   // sharper separation
    temperature: 0.3,            // used if you switch to 'cosineSoftmax'
    axisWeights,
  });

  // Step 2: Build non-negotiables from extreme answers (Likert ±3)
  const nn = answers ? buildNonNegotiables(answers, {
    extremeThreshold: 3,
    strengthPerExtreme: 0.6,
    capStrength: 1.0,
  }) : [];

  // Step 3: Apply non-negotiables (soft penalty by default)
  const { adjusted: ranked, notes } = applyNonNegotiables(baseMatches, nn, {
    mode: 'soft', // switch to 'hard' to veto
    lambda: 2.0,
    minKeep: 1,
  });

  const clustered = isClustered(userScores, PARTY_VECTORS, axisWeights, 0.04);

  const chartData = ranked.map((m) => ({
    name: m.partyName,
    percent: m.percent,
  }));

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Party Alignment Analysis
          {ranked.length >= 2 && (
            <span className="block text-sm font-normal text-neutral-600 mt-1">
              Lead: {ranked[0].percent - ranked[1].percent} pp over {ranked[1].partyName}
            </span>
          )}
        </h3>
        <p className="text-sm text-neutral-600">
          Based on your quiz results, here's how your views align with major UK political parties
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Method: Inverse distance · Weights: custom
        </p>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <PartyMatchBars data={chartData} />
      </div>

      {clustered && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-2">Analysis Note</h4>
          <p className="text-sm text-amber-800">
            Parties appear similarly positioned relative to your scores. Try answering more questions or increasing axis weights for the issues you care about.
          </p>
        </div>
      )}

      {nn.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Non-negotiables Applied</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-blue-600">
            Your strong positions on certain issues have been factored into the analysis. 
            Parties with conflicting stances have been penalized.
          </p>
        </div>
      )}

      <div className="bg-neutral-50 rounded-lg p-4">
        <h4 className="font-medium text-neutral-900 mb-3">Detailed Breakdown</h4>
        <ul className="text-sm text-neutral-600 space-y-2">
          {ranked.map((m) => (
            <li key={m.partyId} className="flex justify-between items-center">
              <span className="font-medium">{m.partyName}</span>
              <div className="flex items-center gap-4">
                <span className="text-primary-600 font-semibold">{m.percent}% match</span>
                <span className="text-xs text-neutral-500">
                  (similarity: {m.cosine.toFixed(2)})
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Important Notes</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• This is a guide based on policy positions, not an endorsement</li>
          <li>• Party positions are estimated from recent manifestos and voting records</li>
          <li>• Individual candidates may differ from party positions</li>
          <li>• Always research candidates in your constituency before voting</li>
        </ul>
      </div>

      <div className="text-xs text-neutral-500 text-center">
        <p>
          Analysis based on 6-axis political alignment using cosine similarity. 
          Party vectors updated for 2024-25 context.
        </p>
      </div>
    </section>
  );
}
