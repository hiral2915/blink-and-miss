export type TeamCode = 'IND' | 'AUS' | 'ENG' | 'SA' | 'USA' | 'PAK';

export interface Player {
  id: string;
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicketkeeper';
  avatar?: string;
  isCaptain?: boolean;
}

export interface BatsmanInnings {
  playerId: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  isOnStrike?: boolean;
  dismissalInfo?: string;
}

export interface BowlerSpell {
  playerId: string;
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export type MomentSignificance = 
  | 'turning_point' 
  | 'wicket' 
  | 'boundary' 
  | 'milestone' 
  | 'tight_over' 
  | 'high_scoring' 
  | 'regular';

export interface BallEvent {
  id: string;
  overNumber: number; // 0 to 19
  ballInOver: number; // 1 to 6
  overDisplay: string; // e.g. "14.3"
  batsmanId: string;
  batsmanName: string;
  nonStrikerName: string;
  bowlerId: string;
  bowlerName: string;
  runsScored: number;
  extras: number;
  isWicket: boolean;
  wicketDetail?: {
    type: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped';
    batsmanName: string;
    fielderName?: string;
    description: string;
  };
  isBoundary: boolean;
  isSix: boolean;
  isDot: boolean;
  commentary: string;
  speedKph?: number;
  significance?: MomentSignificance;
  milestoneDescription?: string;
  winProbabilityIndia?: number; // 0 to 100
}

export interface OverSummary {
  overNumber: number; // 0-based
  overDisplay: string; // "Over 1", "Over 2"
  bowlerName: string;
  totalRuns: number;
  wickets: number;
  balls: BallEvent[];
  scoreAtEnd: {
    runs: number;
    wickets: number;
    crr: number;
    rrr: number;
  };
}

export interface MatchDetails {
  id: string;
  title: string;
  series: string;
  matchType: string;
  venue: string;
  date: string;
  target: number;
  totalOvers: number;
  statusCategory: 'live' | 'upcoming' | 'recent';
  statusText: string;
  isSimulated: boolean;
  firstInnings: {
    team: string;
    teamCode: string;
    score: number;
    wickets: number;
    overs: number;
    runRate: number;
    topPerformers: string;
  };
  secondInnings: {
    team: string;
    teamCode: string;
  };
}

export interface MatchSummaryCard {
  id: string;
  title: string;
  series: string;
  venue: string;
  matchType: string;
  statusCategory: 'live' | 'upcoming' | 'recent';
  statusBadge: string;
  statusEquation?: string;
  team1: {
    name: string;
    code: string;
    score?: string;
    overs?: string;
    flagColor: string;
  };
  team2: {
    name: string;
    code: string;
    score?: string;
    overs?: string;
    isBatting?: boolean;
    flagColor: string;
  };
  isSimulated: boolean;
  hasInteractiveSim: boolean;
}

export interface CurrentMatchState {
  currentBallIndex: number;
  currentOver: number;
  currentBallInOver: number;
  oversFormatted: string;
  runs: number;
  wickets: number;
  target: number;
  runsNeeded: number;
  ballsRemaining: number;
  crr: number;
  rrr: number;
  winProbabilityIndia: number;
  status: 'live' | 'india_won' | 'australia_won' | 'tied';
  statusMessage: string;
  striker: BatsmanInnings;
  nonStriker: BatsmanInnings;
  currentBowler: BowlerSpell;
  recentBalls: BallEvent[];
  currentOverBalls: BallEvent[];
  allBallsBowled: BallEvent[];
  completedOvers: OverSummary[];
  batsmenStats: Record<string, BatsmanInnings>;
  bowlersStats: Record<string, BowlerSpell>;
  partnership: {
    runs: number;
    balls: number;
    batters: [string, string];
  };
}

export interface UserPreferences {
  favouriteTeam: string;
  favouritePlayer: string;
  summaryStyle: 'concise' | 'detailed';
  autoSpeech: boolean;
  speechRate: number;
}

export interface MatchCheckpoint {
  id: string;
  matchId: string;
  timestamp: number;
  ballIndex: number;
  overDisplay: string;
  scoreDisplay: string;
  runs: number;
  wickets: number;
  label: string;
}

export interface CatchUpData {
  checkpoint: MatchCheckpoint;
  currentBallIndex: number;
  currentOverDisplay: string;
  currentScoreDisplay: string;
  oversPassed: number;
  runsAdded: number;
  wicketsFell: number;
  wicketsList: Array<{
    batsman: string;
    bowler: string;
    over: string;
    description: string;
  }>;
  boundaries: {
    fours: number;
    sixes: number;
  };
  favouritePlayerImpact: string[];
  turningPoints: BallEvent[];
  runRateTrend: {
    beforeCRR: number;
    afterCRR: number;
    rrrDelta: number;
  };
  momentumNarrative: string;
  whyItMatters: string;
  aiSummary?: string;
  generatedAt?: string;
}

export interface AskAiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isAiGenerated?: boolean;
}
