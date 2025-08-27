/**
 * Party match visualisation (horizontal bars) using Recharts.
 * - Pass in the ranked matches from rankParties()
 * - Renders a simple, clean bar chart with percentages
 */

'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Create a no-SSR wrapper for the chart component
const ChartComponent = dynamic(() => import('./PartyMatchBarsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-64 md:h-80 flex items-center justify-center">Loading chart...</div>
});

export type MatchDatum = {
  name: string;
  percent: number;
};

export function PartyMatchBars({ data }: { data: MatchDatum[] }) {
  return <ChartComponent data={data} />;
}
