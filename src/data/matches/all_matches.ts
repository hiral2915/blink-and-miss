import { MatchSummaryCard, MatchDetails } from '@/lib/types/cricket';
import { MATCH_DETAILS as IND_AUS_DETAILS } from './ind_vs_aus_t20';

export const MATCHES_CATALOG: MatchSummaryCard[] = [
  {
    id: 'ind-aus-t20-final-2024',
    title: 'India vs Australia — Super 8 Thriller',
    series: 'ICC Men\'s T20 World Cup 2024',
    venue: 'Daren Sammy National Cricket Stadium, St Lucia',
    matchType: 'T20 International',
    statusCategory: 'live',
    statusBadge: 'DEMO MATCH',
    statusEquation: 'India need 135 runs from 84 balls',
    team1: {
      name: 'Australia',
      code: 'AUS',
      score: '188/6',
      overs: '20.0',
      flagColor: 'bg-yellow-500',
    },
    team2: {
      name: 'India',
      code: 'IND',
      score: '54/1',
      overs: '6.0',
      isBatting: true,
      flagColor: 'bg-blue-600',
    },
    isSimulated: true,
    hasInteractiveSim: true,
  },
  {
    id: 'sa-eng-t20-2024',
    title: 'South Africa vs England — Super 8 Climax',
    series: 'ICC Men\'s T20 World Cup 2024',
    venue: 'Kensington Oval, Bridgetown, Barbados',
    matchType: 'T20 International',
    statusCategory: 'live',
    statusBadge: 'LIVE DEATH OVERS',
    statusEquation: 'England need 22 runs in 14 balls',
    team1: {
      name: 'South Africa',
      code: 'SA',
      score: '163/6',
      overs: '20.0',
      flagColor: 'bg-emerald-600',
    },
    team2: {
      name: 'England',
      code: 'ENG',
      score: '142/4',
      overs: '17.4',
      isBatting: true,
      flagColor: 'bg-rose-600',
    },
    isSimulated: true,
    hasInteractiveSim: false,
  },
  {
    id: 'ind-sa-final-2024',
    title: 'India vs South Africa — Grand Final',
    series: 'ICC Men\'s T20 World Cup 2024',
    venue: 'Kensington Oval, Bridgetown, Barbados',
    matchType: 'T20 International Final',
    statusCategory: 'upcoming',
    statusBadge: 'UPCOMING • 8:00 PM',
    statusEquation: 'Toss in 45 minutes • Pitch report favourable to pace',
    team1: {
      name: 'India',
      code: 'IND',
      flagColor: 'bg-blue-600',
    },
    team2: {
      name: 'South Africa',
      code: 'SA',
      flagColor: 'bg-emerald-600',
    },
    isSimulated: true,
    hasInteractiveSim: false,
  },
  {
    id: 'pak-usa-t20-2024',
    title: 'USA vs Pakistan — Historical Group Thriller',
    series: 'ICC Men\'s T20 World Cup 2024',
    venue: 'Grand Prairie Stadium, Dallas, Texas',
    matchType: 'T20 International',
    statusCategory: 'recent',
    statusBadge: 'RESULT • SUPER OVER',
    statusEquation: 'USA won the Super Over by 5 runs',
    team1: {
      name: 'Pakistan',
      code: 'PAK',
      score: '159/7',
      overs: '20.0',
      flagColor: 'bg-emerald-700',
    },
    team2: {
      name: 'United States',
      code: 'USA',
      score: '159/3',
      overs: '20.0',
      flagColor: 'bg-blue-700',
    },
    isSimulated: true,
    hasInteractiveSim: false,
  },
];

export function getMatchDetailsById(id: string): MatchDetails {
  if (id === 'ind-aus-t20-final-2024') {
    return {
      ...IND_AUS_DETAILS,
      statusCategory: 'live',
      statusText: 'In Progress • 2nd Innings Chase',
      isSimulated: true,
    };
  }

  // Fallback match details
  return {
    ...IND_AUS_DETAILS,
    id,
    statusCategory: 'live',
    statusText: 'Simulated Match Data',
    isSimulated: true,
  };
}
