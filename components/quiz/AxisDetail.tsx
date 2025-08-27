'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AxisScore, Axis } from '@/lib/types';
import { getAxisLabel } from '@/lib/scoring';

interface AxisDetailProps {
  score: AxisScore;
  axis: Axis;
  summary: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AxisDetail({ score, axis, summary, isSelected, onClick }: AxisDetailProps) {
  const getConfidenceClass = (confidence: number) => {
    if (confidence >= 80) return 'confidence-high';
    if (confidence >= 60) return 'confidence-medium';
    return 'confidence-low';
  };

  const getScoreLabel = (score: number, axis: string) => {
    return getAxisLabel(axis, score);
  };

  const getScoreColor = (score: number) => {
    const absScore = Math.abs(score);
    if (absScore >= 80) return 'text-red-600';
    if (absScore >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <motion.div
      layout
      className={`card cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: axis.color }}
          />
          <h3 className="font-semibold text-neutral-900 truncate">{axis.name}</h3>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className={`text-sm font-medium ${getScoreColor(score.score)} text-right`}>
            {getScoreLabel(score.score, score.axis)}
          </span>
          {isSelected ? (
            <ChevronUp className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Score Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-neutral-600 mb-1">
          <span className="truncate pr-2">{axis.leftLabel}</span>
          <span className="font-medium flex-shrink-0">{score.score > 0 ? '+' : ''}{score.score}</span>
          <span className="truncate pl-2 text-right">{axis.rightLabel}</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${((score.score + 100) / 200) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Confidence Meter */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-neutral-600 mb-1">
          <span>Confidence</span>
          <span>{score.confidence}%</span>
        </div>
        <div className="confidence-meter">
          <motion.div
            className={`confidence-fill ${getConfidenceClass(score.confidence)}`}
            initial={{ width: 0 }}
            animate={{ width: `${score.confidence}%` }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>
      </div>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-3 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 leading-relaxed">
            {summary}
          </p>
          <p className="text-xs text-neutral-500 mt-2">
            {axis.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
