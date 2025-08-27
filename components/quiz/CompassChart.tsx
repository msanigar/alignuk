'use client';

import { motion } from 'framer-motion';
import { AxisScore } from '@/lib/types';

interface CompassChartProps {
  scores: AxisScore[];
}

export function CompassChart({ scores }: CompassChartProps) {
  // Find economic and authority scores
  const economicScore = scores.find(s => s.axis === 'economic')?.score || 0;
  const authorityScore = scores.find(s => s.axis === 'authority')?.score || 0;
  
  // Convert from -100 to +100 scale to 0 to 100 scale for positioning
  // Economic: State-led (left) to Market-led (right)
  const x = ((economicScore + 100) / 200) * 100;
  
  // Authority: Libertarian (top) to Authoritarian (bottom)
  // In CSS: 0% = top, 100% = bottom
  // So: Libertarian (negative scores) = top, Authoritarian (positive scores) = bottom
  const y = ((authorityScore + 100) / 200) * 100;
  
  // For Y-axis: 0% = top (Libertarian), 100% = bottom (Authoritarian)
  // This is already correct - no inversion needed
  
  // Debug positioning
  console.log('Compass positioning:', {
    economicScore,
    authorityScore,
    x: `${x}%`,
    y: `${y}%`,
    expectedX: economicScore >= 0 ? 'Market-led (right)' : 'State-led (left)',
    expectedY: authorityScore >= 0 ? 'Authoritarian (bottom)' : 'Libertarian (top)',
    quadrant: `${economicScore >= 0 ? 'Market-led' : 'State-led'} ${authorityScore >= 0 ? 'Authoritarian' : 'Libertarian'}`
  });

  return (
    <div className="relative w-full h-80 bg-neutral-50 rounded-lg border border-neutral-200 p-4" style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-neutral-300"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-neutral-300"></div>
      </div>
      
      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-400 rounded-full"></div>
      

      
      {/* Quadrant labels */}
      <div className="absolute top-2 left-2 text-xs font-medium text-neutral-600 max-w-[40%]">
        Libertarian Left
      </div>
      <div className="absolute top-2 right-2 text-xs font-medium text-neutral-600 text-right max-w-[40%]">
        Libertarian Right
      </div>
      <div className="absolute bottom-2 left-2 text-xs font-medium text-neutral-600 max-w-[40%]">
        Authoritarian Left
      </div>
      <div className="absolute bottom-2 right-2 text-xs font-medium text-neutral-600 text-right max-w-[40%]">
        Authoritarian Right
      </div>
      
      {/* Axis labels */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-medium text-neutral-600 max-w-[30%]">
        State-led
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-neutral-600 text-right max-w-[30%]">
        Market-led
      </div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-600 max-w-[40%] text-center">
        Libertarian
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-600 max-w-[40%] text-center">
        Authoritarian
      </div>
      
      {/* User position */}
      <motion.div
        className="absolute w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-lg z-10"
        initial={{ x: '50%', y: '50%' }}
        animate={{ 
          x: `${x}%`, 
          y: `${y}%`,
          translateX: '-50%',
          translateY: '-50%'
        }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Position indicator */}
      <motion.div
        className="absolute bg-white border border-neutral-200 rounded-lg px-2 py-1 text-xs font-medium shadow-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          marginTop: '-20px'
        }}
      >
        You
      </motion.div>
      
      {/* Score display - moved outside chart area */}
      <div className="mt-4 bg-white rounded-lg p-3 border border-neutral-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <span className="font-medium text-neutral-700">Economic:</span>
            <span className="ml-1 text-neutral-600">
              {economicScore > 0 ? '+' : ''}{economicScore}
            </span>
          </div>
          <div className="text-center">
            <span className="font-medium text-neutral-700">Authority:</span>
            <span className="ml-1 text-neutral-600">
              {authorityScore > 0 ? '+' : ''}{authorityScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
