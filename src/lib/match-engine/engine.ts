import {
  CurrentMatchState,
  BatsmanInnings,
  BowlerSpell,
  OverSummary,
  CatchUpData,
  MatchCheckpoint,
} from '@/lib/types/cricket';
import { MATCH_DETAILS, RAW_BALLS_DATA } from '@/data/matches/ind_vs_aus_t20';

export function calculateMatchState(ballIndex: number): CurrentMatchState {
  const clampedIndex = Math.max(0, Math.min(ballIndex, RAW_BALLS_DATA.length));
  const ballsBowled = RAW_BALLS_DATA.slice(0, clampedIndex);

  let totalRuns = 0;
  let totalWickets = 0;

  // Initialize batsmen stats for full innings
  const batsmenStats: Record<string, BatsmanInnings> = {
    ind_rohit: { playerId: 'ind_rohit', name: 'Rohit Sharma', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
    ind_kohli: { playerId: 'ind_kohli', name: 'Virat Kohli', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
    ind_pant: { playerId: 'ind_pant', name: 'Rishabh Pant', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
    ind_surya: { playerId: 'ind_surya', name: 'Suryakumar Yadav', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
    ind_hardik: { playerId: 'ind_hardik', name: 'Hardik Pandya', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
    ind_jadeja: { playerId: 'ind_jadeja', name: 'Ravindra Jadeja', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isOut: false },
  };

  // Initialize bowler spells
  const bowlersStats: Record<string, BowlerSpell> = {
    aus_starc: { playerId: 'aus_starc', name: 'Mitchell Starc', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
    aus_hazlewood: { playerId: 'aus_hazlewood', name: 'Josh Hazlewood', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
    aus_cummins: { playerId: 'aus_cummins', name: 'Pat Cummins', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
    aus_zampa: { playerId: 'aus_zampa', name: 'Adam Zampa', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
    aus_maxwell: { playerId: 'aus_maxwell', name: 'Glenn Maxwell', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
    aus_stoinis: { playerId: 'aus_stoinis', name: 'Marcus Stoinis', overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0 },
  };

  const bowlerBallsCount: Record<string, number> = {};

  // Sequential strike tracking to guarantee 100% authentic rotation and NO duplicate batters
  let strikerId = 'ind_rohit';
  let nonStrikerId = 'ind_kohli';
  const incomingQueue = ['ind_pant', 'ind_surya', 'ind_hardik', 'ind_jadeja'];
  let incomingIdx = 0;

  let partnershipRuns = 0;
  let partnershipBalls = 0;

  for (let i = 0; i < ballsBowled.length; i++) {
    const ball = ballsBowled[i];
    const ballRuns = ball.runsScored + ball.extras;
    totalRuns += ballRuns;
    partnershipRuns += ballRuns;
    partnershipBalls += 1;

    // Use ball's designated batsman to stay synchronized with author narrative
    const currentBatId = ball.batsmanId || strikerId;
    if (currentBatId !== strikerId && currentBatId === nonStrikerId) {
      // Batsmen swapped
      const t = strikerId;
      strikerId = nonStrikerId;
      nonStrikerId = t;
    } else {
      strikerId = currentBatId;
    }

    // Update batsman stats
    if (batsmenStats[strikerId]) {
      const bat = batsmenStats[strikerId];
      bat.runs += ball.runsScored;
      bat.balls += 1;
      if (ball.isBoundary) bat.fours += 1;
      if (ball.isSix) bat.sixes += 1;
      bat.strikeRate = bat.balls > 0 ? Number(((bat.runs / bat.balls) * 100).toFixed(1)) : 0;

      if (ball.isWicket) {
        bat.isOut = true;
        bat.dismissalInfo = ball.wicketDetail?.description || 'Out';
        totalWickets += 1;

        // Bring in next batsman
        if (incomingIdx < incomingQueue.length) {
          strikerId = incomingQueue[incomingIdx++];
        }
        partnershipRuns = 0;
        partnershipBalls = 0;
      }
    }

    // Update bowler stats
    if (bowlersStats[ball.bowlerId]) {
      const bowl = bowlersStats[ball.bowlerId];
      bowl.runs += ballRuns;
      bowlerBallsCount[ball.bowlerId] = (bowlerBallsCount[ball.bowlerId] || 0) + 1;
      if (ball.isWicket) {
        bowl.wickets += 1;
      }
    }

    // Strike rotation if no wicket
    if (!ball.isWicket) {
      if (ball.runsScored % 2 !== 0) {
        // Swap ends on odd runs
        const t = strikerId;
        strikerId = nonStrikerId;
        nonStrikerId = t;
      }
    }

    // Over completion rotation
    if (ball.ballInOver === 6) {
      const t = strikerId;
      strikerId = nonStrikerId;
      nonStrikerId = t;
    }
  }

  // Calculate bowler overs & economies
  for (const bowlerId of Object.keys(bowlersStats)) {
    const ballsCount = bowlerBallsCount[bowlerId] || 0;
    const completedOvers = Math.floor(ballsCount / 6);
    const remBalls = ballsCount % 6;
    const oversDecimal = completedOvers + remBalls / 6;
    const bowl = bowlersStats[bowlerId];
    bowl.overs = Number(`${completedOvers}.${remBalls}`);
    bowl.economy = oversDecimal > 0 ? Number((bowl.runs / oversDecimal).toFixed(2)) : 0;
  }

  // Current over metrics
  const totalCompletedOvers = Math.floor(clampedIndex / 6);
  const currentBallInOver = clampedIndex % 6;
  const oversFormatted = `${totalCompletedOvers}.${currentBallInOver}`;
  const oversDecimal = totalCompletedOvers + currentBallInOver / 6;

  // Run rates & equations
  const target = MATCH_DETAILS.target;
  const runsNeeded = Math.max(0, target - totalRuns);
  const totalMatchBalls = MATCH_DETAILS.totalOvers * 6;
  const ballsRemaining = Math.max(0, totalMatchBalls - clampedIndex);
  const oversRemainingDecimal = ballsRemaining / 6;

  const crr = oversDecimal > 0 ? Number((totalRuns / oversDecimal).toFixed(2)) : 0;
  const rrr = ballsRemaining > 0 && runsNeeded > 0
    ? Number((runsNeeded / oversRemainingDecimal).toFixed(2))
    : 0;

  // Status
  let status: CurrentMatchState['status'] = 'live';
  let statusMessage = `India need ${runsNeeded} runs in ${ballsRemaining} balls`;

  if (totalRuns >= target) {
    status = 'india_won';
    statusMessage = `India won by ${10 - totalWickets} wickets!`;
  } else if (ballsRemaining === 0 || totalWickets >= 10) {
    if (totalRuns === target - 1) {
      status = 'tied';
      statusMessage = 'Match tied! Thrilling finish!';
    } else {
      status = 'australia_won';
      statusMessage = `Australia won by ${runsNeeded} runs!`;
    }
  }

  // Active batters
  let striker = batsmenStats[strikerId] || batsmenStats['ind_kohli'];
  let nonStriker = batsmenStats[nonStrikerId] || batsmenStats['ind_pant'];

  // Ensure striker and nonStriker are NEVER identical
  if (striker.playerId === nonStriker.playerId) {
    const alternate = Object.values(batsmenStats).find(
      (b) => !b.isOut && b.playerId !== striker.playerId
    );
    if (alternate) {
      nonStriker = alternate;
    }
  }

  striker = { ...striker, isOnStrike: true };
  nonStriker = { ...nonStriker, isOnStrike: false };

  // Current bowler
  const lastBall = clampedIndex > 0 ? ballsBowled[clampedIndex - 1] : RAW_BALLS_DATA[0];
  const currentBowler = bowlersStats[lastBall.bowlerId] || bowlersStats['aus_starc'];

  // Current over balls & recent balls
  const currentOverIndex = Math.min(19, Math.floor((clampedIndex === 0 ? 0 : clampedIndex - 1) / 6));
  const currentOverBalls = ballsBowled.filter((b) => b.overNumber === currentOverIndex);
  const recentBalls = ballsBowled.slice(-8);

  const winProbabilityIndia = clampedIndex > 0
    ? ballsBowled[clampedIndex - 1].winProbabilityIndia ?? 50
    : 50;

  // Completed overs list
  const completedOvers: OverSummary[] = [];
  for (let o = 0; o < totalCompletedOvers; o++) {
    const overBalls = RAW_BALLS_DATA.filter((b) => b.overNumber === o);
    const overRuns = overBalls.reduce((acc, b) => acc + b.runsScored + b.extras, 0);
    const overWkts = overBalls.filter((b) => b.isWicket).length;
    const overBowler = overBalls[0]?.bowlerName || 'Bowler';
    const endBallIndex = (o + 1) * 6;
    const partialBalls = RAW_BALLS_DATA.slice(0, endBallIndex);
    const endRuns = partialBalls.reduce((acc, b) => acc + b.runsScored + b.extras, 0);
    const endWkts = partialBalls.filter((b) => b.isWicket).length;
    const endOvers = o + 1;
    const endCRR = Number((endRuns / endOvers).toFixed(2));
    const endRRR = Number(((target - endRuns) / (20 - endOvers)).toFixed(2));

    completedOvers.push({
      overNumber: o,
      overDisplay: `Over ${o + 1}`,
      bowlerName: overBowler,
      totalRuns: overRuns,
      wickets: overWkts,
      balls: overBalls,
      scoreAtEnd: {
        runs: endRuns,
        wickets: endWkts,
        crr: endCRR,
        rrr: endRRR,
      },
    });
  }

  return {
    currentBallIndex: clampedIndex,
    currentOver: totalCompletedOvers,
    currentBallInOver,
    oversFormatted,
    runs: totalRuns,
    wickets: totalWickets,
    target,
    runsNeeded,
    ballsRemaining,
    crr,
    rrr,
    winProbabilityIndia,
    status,
    statusMessage,
    striker,
    nonStriker,
    currentBowler,
    recentBalls,
    currentOverBalls,
    allBallsBowled: ballsBowled,
    completedOvers,
    batsmenStats,
    bowlersStats,
    partnership: {
      runs: partnershipRuns,
      balls: partnershipBalls,
      batters: [striker.name, nonStriker.name],
    },
  };
}

export function getNextBallIndex(currentIndex: number): number {
  return Math.min(RAW_BALLS_DATA.length, currentIndex + 1);
}

export function getNextOverIndex(currentIndex: number): number {
  if (currentIndex >= RAW_BALLS_DATA.length) return RAW_BALLS_DATA.length;
  const remInOver = 6 - (currentIndex % 6);
  const ballsToAdd = remInOver === 0 ? 6 : remInOver;
  return Math.min(RAW_BALLS_DATA.length, currentIndex + ballsToAdd);
}

export function calculateMissedEvents(
  checkpoint: MatchCheckpoint,
  currentBallIndex: number,
  favouritePlayer: string = 'Virat Kohli',
  // favouriteTeam: string = 'IND'
): CatchUpData {
  const fromIndex = checkpoint.ballIndex;
  const toIndex = Math.min(currentBallIndex, RAW_BALLS_DATA.length);
  const missedBalls = RAW_BALLS_DATA.slice(fromIndex, toIndex);

  const runsAdded = missedBalls.reduce((acc, b) => acc + b.runsScored + b.extras, 0);
  const wickets = missedBalls.filter((b) => b.isWicket);
  const fours = missedBalls.filter((b) => b.isBoundary && !b.isSix).length;
  const sixes = missedBalls.filter((b) => b.isSix).length;

  const startState = calculateMatchState(fromIndex);
  const endState = calculateMatchState(toIndex);

  const wicketsList = wickets.map((w) => ({
    batsman: w.wicketDetail?.batsmanName || w.batsmanName,
    bowler: w.bowlerName,
    over: w.overDisplay,
    description: w.wicketDetail?.description || `Out by ${w.bowlerName}`,
  }));

  const turningPoints = missedBalls.filter(
    (b) => b.significance === 'turning_point' || b.significance === 'wicket' ||
      b.significance === 'milestone' || b.significance === 'boundary' || b.isSix
  );

  // Keep favourite-player statements precise: batting and bowling involvement differ.
  const favouritePlayerKey = favouritePlayer.toLowerCase();
  const favouriteBattingBalls = missedBalls.filter(
    (b) => b.batsmanName.toLowerCase().includes(favouritePlayerKey)
  );
  const favouriteBowlingBalls = missedBalls.filter(
    (b) => b.bowlerName.toLowerCase().includes(favouritePlayerKey)
  );

  const favouritePlayerImpact: string[] = [];
  if (favouriteBattingBalls.length > 0) {
    const favRuns = favouriteBattingBalls.reduce((acc, b) => acc + b.runsScored, 0);
    const favBoundaries = favouriteBattingBalls.filter((b) => b.isBoundary || b.isSix).length;
    favouritePlayerImpact.push(
      `${favouritePlayer} faced ${favouriteBattingBalls.length} deliveries and scored ${favRuns} runs, including ${favBoundaries} boundary hits.`
    );
    const milestoneBall = favouriteBattingBalls.find((b) => b.milestoneDescription);
    if (milestoneBall) favouritePlayerImpact.push(`Milestone: ${milestoneBall.milestoneDescription}`);
  } else if (favouriteBowlingBalls.length > 0) {
    const wicketsTaken = favouriteBowlingBalls.filter((b) => b.isWicket).length;
    favouritePlayerImpact.push(
      `${favouritePlayer} bowled ${favouriteBowlingBalls.length} deliveries and took ${wicketsTaken} wicket(s) during this period.`
    );
  } else {
    favouritePlayerImpact.push(
      `No notable batting or bowling event involving ${favouritePlayer} was recorded during this period.`
    );
  }

  // Keep the deterministic recap grounded in the actual events and calculated scores.
  const scoreDifference = endState.runs - startState.runs;
  let momentumNarrative = `India added ${scoreDifference} runs between ${checkpoint.overDisplay} and ${endState.oversFormatted} overs, moving from ${startState.runs}/${startState.wickets} to ${endState.runs}/${endState.wickets}.`;
  let whyItMatters = `India now need ${endState.runsNeeded} runs from ${endState.ballsRemaining} balls.`;

  if (wickets.length >= 2) {
    momentumNarrative += ` ${wickets.length} wickets fell during this period.`;
    whyItMatters += ' Losing wickets means fewer batters remain to complete the chase.';
  } else if (wickets.length === 1) {
    momentumNarrative += ' One wicket fell during this period.';
    whyItMatters += ' India will need the incoming batter to settle into the chase.';
  } else {
    momentumNarrative += ' India did not lose a wicket during this period.';
    whyItMatters += ' India kept its wickets intact while adding runs.';
  }

  const oversPassed = Number(((toIndex - fromIndex) / 6).toFixed(1));

  return {
    checkpoint,
    currentBallIndex: toIndex,
    currentOverDisplay: endState.oversFormatted,
    currentScoreDisplay: `${endState.runs}/${endState.wickets}`,
    oversPassed,
    runsAdded,
    wicketsFell: wickets.length,
    wicketsList,
    boundaries: {
      fours,
      sixes,
    },
    favouritePlayerImpact,
    turningPoints,
    runRateTrend: {
      beforeCRR: startState.crr,
      afterCRR: endState.crr,
      rrrDelta: Number((endState.rrr - startState.rrr).toFixed(2)),
    },
    momentumNarrative,
    whyItMatters,
    generatedAt: new Date().toLocaleTimeString(),
  };
}
