import { Axis } from './types';

export const AXES: Record<string, Axis> = {
  economic: {
    id: 'economic',
    name: 'Economic',
    description: 'Views on the role of government in the economy',
    leftLabel: 'State-led',
    rightLabel: 'Market-led',
    color: '#3b82f6', // blue
  },
  social: {
    id: 'social',
    name: 'Social',
    description: 'Attitudes toward social change and traditional values',
    leftLabel: 'Progressive',
    rightLabel: 'Traditional',
    color: '#8b5cf6', // purple
  },
  authority: {
    id: 'authority',
    name: 'Authority',
    description: 'Preference for individual freedom vs collective control',
    leftLabel: 'Libertarian',
    rightLabel: 'Authoritarian',
    color: '#ef4444', // red
  },
  sovereignty: {
    id: 'sovereignty',
    name: 'Sovereignty',
    description: 'Views on national independence vs international cooperation',
    leftLabel: 'Globalist',
    rightLabel: 'National',
    color: '#f59e0b', // amber
  },
  environment: {
    id: 'environment',
    name: 'Environment',
    description: 'Priority between environmental protection and economic growth',
    leftLabel: 'Decarbonisation-first',
    rightLabel: 'Growth/Energy-security-first',
    color: '#10b981', // emerald
  },
  welfare: {
    id: 'welfare',
    name: 'Welfare',
    description: 'Approach to social support and public services',
    leftLabel: 'Universalist',
    rightLabel: 'Conditionalist',
    color: '#06b6d4', // cyan
  },
};

export const AXIS_IDS = Object.keys(AXES) as Array<keyof typeof AXES>;
