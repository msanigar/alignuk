'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';

export type MatchDatum = {
  name: string;
  percent: number;
};

// UK Party Colors
const PARTY_COLORS: Record<string, string> = {
  'Labour': '#DC241f', // Labour Red
  'Conservative': '#0087DC', // Conservative Blue
  'Liberal Democrats': '#FDBB30', // Lib Dem Yellow
  'Green Party': '#6AB023', // Green Party Green
  'Reform UK': '#00B4FF', // Reform UK Light Blue
  'SNP': '#FDF38E', // SNP Yellow
  'Plaid Cymru': '#3F8428', // Plaid Cymru Green
  'DUP': '#D46A4C', // DUP Red
  'Sinn Féin': '#326760', // Sinn Féin Green
  'Alliance': '#F6CB2F', // Alliance Yellow
  'SDLP': '#2AA82C', // SDLP Green
  'UUP': '#48A5EE', // UUP Blue
};

export default function PartyMatchBarsChart({ data }: { data: MatchDatum[] }) {
  // Sort descending just in case
  const sorted = [...data].sort((a, b) => b.percent - a.percent);

  return (
    <div className="w-full h-56 sm:h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
          layout="vertical"
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={(props) => {
              const { x, y, payload } = props;
              const isTopParty = payload.value === sorted[0]?.name;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={4}
                    textAnchor="end"
                    fill={isTopParty ? '#1f2937' : '#6b7280'}
                    fontSize={isTopParty ? 12 : 11}
                    fontWeight={isTopParty ? '600' : '400'}
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Match']}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          />
          <Bar 
            dataKey="percent" 
            radius={[4, 4, 4, 4]}
          >
            {sorted.map((entry, index) => {
              const isTopParty = index === 0;
              const baseColor = PARTY_COLORS[entry.name] || '#6B7280';
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={baseColor}
                  opacity={isTopParty ? 1 : 0.85}
                />
              );
            })}
            <LabelList
              dataKey="percent"
              position="right"
              formatter={(v: number) => `${v}%`}
              className="text-sm"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
