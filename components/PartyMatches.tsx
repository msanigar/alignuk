'use client';

import React from 'react';
import { PARTY_VECTORS } from '@/lib/partyVectors';
import { rankParties, type PartyMatch } from '@/lib/similarity';
import { PartyMatchBars } from '@/components/PartyMatchBars';
import { Vector6 } from '@/lib/partyVectors';

export function PartyMatches({ userScores }: { userScores: Vector6 }) {
  const ranked = rankParties(userScores, PARTY_VECTORS, { temperature: 0.7 });

  const chartData = ranked.map((m) => ({
    name: m.partyName,
    percent: m.percent,
  }));

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Party Alignment Analysis
        </h3>
        <p className="text-sm text-neutral-600">
          Based on your quiz results, here's how your views align with major UK political parties
        </p>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <PartyMatchBars data={chartData} />
      </div>

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
