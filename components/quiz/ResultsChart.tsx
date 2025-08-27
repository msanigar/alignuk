'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AxisScore } from '@/lib/types';
import { AXES } from '@/lib/axes';

interface ResultsChartProps {
  scores: AxisScore[];
}

// Dynamic import for Recharts to avoid SSR issues
let RadarChart: any = null;
let PolarGrid: any = null;
let PolarAngleAxis: any = null;
let PolarRadiusAxis: any = null;
let Radar: any = null;
let ResponsiveContainer: any = null;

export function ResultsChart({ scores }: ResultsChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCharts = async () => {
      const recharts = await import('recharts');
      RadarChart = recharts.RadarChart;
      PolarGrid = recharts.PolarGrid;
      PolarAngleAxis = recharts.PolarAngleAxis;
      PolarRadiusAxis = recharts.PolarRadiusAxis;
      Radar = recharts.Radar;
      ResponsiveContainer = recharts.ResponsiveContainer;
      setIsLoaded(true);
    };

    loadCharts();
  }, []);

  const chartData = scores.map(score => ({
    axis: AXES[score.axis].name,
    score: Math.abs(score.score), // Use absolute value for radar chart
    fullScore: score.score,
    color: AXES[score.axis].color,
  }));

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="axis" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {chartData.map((item) => (
          <motion.div
            key={item.axis}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-neutral-600">{item.axis}</span>
            <span className="text-sm font-medium text-neutral-900">
              {item.fullScore > 0 ? '+' : ''}{item.fullScore}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
