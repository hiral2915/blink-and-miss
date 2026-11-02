import { MatchDetails, Player, BallEvent } from '@/lib/types/cricket';

export const MATCH_DETAILS: MatchDetails = {
  id: 'ind-aus-t20-final-2024',
  title: 'India vs Australia — Super 8 Thriller',
  series: 'ICC Men\'s T20 World Cup',
  matchType: 'T20 International',
  venue: 'Daren Sammy National Cricket Stadium, Gros Islet, St Lucia',
  date: 'June 24, 2024',
  target: 189,
  totalOvers: 20,
  statusCategory: 'live',
  statusText: 'In Progress • 2nd Innings Chase',
  isSimulated: true,
  firstInnings: {
    team: 'Australia',
    teamCode: 'AUS',
    score: 188,
    wickets: 6,
    overs: 20,
    runRate: 9.40,
    topPerformers: 'Travis Head 76 (43b, 9x4, 4x6), Mitchell Marsh 37 (28b); Kuldeep Yadav 2/24, Arshdeep Singh 3/37',
  },
  secondInnings: {
    team: 'India',
    teamCode: 'IND',
  },
};

export const PLAYERS_DATABASE: Player[] = [
  // India
  { id: 'ind_rohit', name: 'Rohit Sharma', team: 'IND', role: 'batsman', isCaptain: true },
  { id: 'ind_kohli', name: 'Virat Kohli', team: 'IND', role: 'batsman' },
  { id: 'ind_pant', name: 'Rishabh Pant', team: 'IND', role: 'wicketkeeper' },
  { id: 'ind_surya', name: 'Suryakumar Yadav', team: 'IND', role: 'batsman' },
  { id: 'ind_hardik', name: 'Hardik Pandya', team: 'IND', role: 'all-rounder' },
  { id: 'ind_dube', name: 'Shivam Dube', team: 'IND', role: 'all-rounder' },
  { id: 'ind_jadeja', name: 'Ravindra Jadeja', team: 'IND', role: 'all-rounder' },
  { id: 'ind_axar', name: 'Axar Patel', team: 'IND', role: 'all-rounder' },
  { id: 'ind_kuldeep', name: 'Kuldeep Yadav', team: 'IND', role: 'bowler' },
  { id: 'ind_arshdeep', name: 'Arshdeep Singh', team: 'IND', role: 'bowler' },
  { id: 'ind_bumrah', name: 'Jasprit Bumrah', team: 'IND', role: 'bowler' },

  // Australia
  { id: 'aus_head', name: 'Travis Head', team: 'AUS', role: 'batsman' },
  { id: 'aus_warner', name: 'David Warner', team: 'AUS', role: 'batsman' },
  { id: 'aus_marsh', name: 'Mitchell Marsh', team: 'AUS', role: 'all-rounder', isCaptain: true },
  { id: 'aus_maxwell', name: 'Glenn Maxwell', team: 'AUS', role: 'all-rounder' },
  { id: 'aus_stoinis', name: 'Marcus Stoinis', team: 'AUS', role: 'all-rounder' },
  { id: 'aus_david', name: 'Tim David', team: 'AUS', role: 'batsman' },
  { id: 'aus_wade', name: 'Matthew Wade', team: 'AUS', role: 'wicketkeeper' },
  { id: 'aus_cummins', name: 'Pat Cummins', team: 'AUS', role: 'bowler' },
  { id: 'aus_starc', name: 'Mitchell Starc', team: 'AUS', role: 'bowler' },
  { id: 'aus_zampa', name: 'Adam Zampa', team: 'AUS', role: 'bowler' },
  { id: 'aus_hazlewood', name: 'Josh Hazlewood', team: 'AUS', role: 'bowler' },
];

export const RAW_BALLS_DATA: BallEvent[] = [
  // --- OVER 1: Mitchell Starc to Rohit Sharma & Virat Kohli ---
  {
    id: 'b-1-1', overNumber: 0, ballInOver: 1, overDisplay: '0.1',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 143.2, winProbabilityIndia: 50,
    commentary: 'Starc starts with a searching full swinging delivery outside off, Rohit shoulders arms watchfully.',
    significance: 'regular'
  },
  {
    id: 'b-1-2', overNumber: 0, ballInOver: 2, overDisplay: '0.2',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 144.1, winProbabilityIndia: 52,
    commentary: 'FOUR! Rohit opens his account with trademark elegance. Leans into an overpitched ball and creams it past cover point.',
    significance: 'boundary'
  },
  {
    id: 'b-1-3', overNumber: 0, ballInOver: 3, overDisplay: '0.3',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 145.0, winProbabilityIndia: 51,
    commentary: 'Good bounce on a length, defended off the back foot towards mid-off by Rohit.',
    significance: 'regular'
  },
  {
    id: 'b-1-4', overNumber: 0, ballInOver: 4, overDisplay: '0.4',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 142.8, winProbabilityIndia: 56,
    commentary: 'SIX! Picked up into the Caribbean sky! Rohit pulls Starc high and handsome over deep square leg. What an authorative strike!',
    significance: 'boundary'
  },
  {
    id: 'b-1-5', overNumber: 0, ballInOver: 5, overDisplay: '0.5',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 141.5, winProbabilityIndia: 56,
    commentary: 'Tucked away off the hips behind square for a brisk single. Kohli on strike now.',
    significance: 'regular'
  },
  {
    id: 'b-1-6', overNumber: 0, ballInOver: 6, overDisplay: '0.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 146.1, winProbabilityIndia: 57,
    commentary: 'Kohli taps to mid-on and charges through for a quick single to retain strike. 12 off the 1st over!',
    significance: 'regular'
  },

  // --- OVER 2: Josh Hazlewood ---
  {
    id: 'b-2-1', overNumber: 1, ballInOver: 1, overDisplay: '1.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 136.2, winProbabilityIndia: 56,
    commentary: 'Hazlewood hits that immaculate test match length around fourth stump, Kohli plays with soft hands.',
    significance: 'regular'
  },
  {
    id: 'b-2-2', overNumber: 1, ballInOver: 2, overDisplay: '1.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 135.8, winProbabilityIndia: 59,
    commentary: 'FOUR! Signature Virat Kohli cover drive! Transferred weight onto the front foot and stroked between extra cover and mid-off.',
    significance: 'boundary'
  },
  {
    id: 'b-2-3', overNumber: 1, ballInOver: 3, overDisplay: '1.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.4, winProbabilityIndia: 59,
    commentary: 'Pushed gently wide of cover for a tidy single.',
    significance: 'regular'
  },
  {
    id: 'b-2-4', overNumber: 1, ballInOver: 4, overDisplay: '1.4',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 136.9, winProbabilityIndia: 58,
    commentary: 'Right on the money, angling into off stump, defended solidly back to the bowler.',
    significance: 'regular'
  },
  {
    id: 'b-2-5', overNumber: 1, ballInOver: 5, overDisplay: '1.5',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 138.1, winProbabilityIndia: 59,
    commentary: 'Clipped neatly off the pads into the deep midwicket pocket, great running between the wickets for a brace.',
    significance: 'regular'
  },
  {
    id: 'b-2-6', overNumber: 1, ballInOver: 6, overDisplay: '1.6',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.0, winProbabilityIndia: 60,
    commentary: 'Drop and run to third man. India 20/0 after 2 overs.',
    significance: 'regular'
  },

  // --- OVER 3: Pat Cummins ---
  {
    id: 'b-3-1', overNumber: 2, ballInOver: 1, overDisplay: '2.1',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 140.5, winProbabilityIndia: 63,
    commentary: 'FOUR! Cummins greeted with authority! Short ball and Rohit pounces on it instantly, pulling it hard in front of square.',
    significance: 'boundary'
  },
  {
    id: 'b-3-2', overNumber: 2, ballInOver: 2, overDisplay: '2.2',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 141.2, winProbabilityIndia: 62,
    commentary: 'Beaten! Cummins responds with an absolute peach that nips away slightly outside off.',
    significance: 'regular'
  },
  {
    id: 'b-3-3', overNumber: 2, ballInOver: 3, overDisplay: '2.3',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 139.7, winProbabilityIndia: 67,
    commentary: 'SIX! Oh that has gone onto the stadium roof! Rohit Sharma dancing down and carting Cummins straight back over long-on!',
    significance: 'boundary'
  },
  {
    id: 'b-3-4', overNumber: 2, ballInOver: 4, overDisplay: '2.4',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 140.1, winProbabilityIndia: 67,
    commentary: 'Sensible cricket, pushes it to long-off for one.',
    significance: 'regular'
  },
  {
    id: 'b-3-5', overNumber: 2, ballInOver: 5, overDisplay: '2.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.3, winProbabilityIndia: 68,
    commentary: 'Steered behind point to give Rohit the strike again.',
    significance: 'regular'
  },
  {
    id: 'b-3-6', overNumber: 2, ballInOver: 6, overDisplay: '2.6',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 143.0, winProbabilityIndia: 67,
    commentary: 'Yorker length fired into off stump, dug out safely. India 32/0 after 3 overs!',
    significance: 'regular'
  },

  // --- OVER 4: Josh Hazlewood — WICKET! ---
  {
    id: 'b-4-1', overNumber: 3, ballInOver: 1, overDisplay: '3.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rohit Sharma',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.1, winProbabilityIndia: 67,
    commentary: 'Glanced fine to deep backward square leg for a single.',
    significance: 'regular'
  },
  {
    id: 'b-4-2', overNumber: 3, ballInOver: 2, overDisplay: '3.2',
    batsmanId: 'ind_rohit', batsmanName: 'Rohit Sharma', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: true, isBoundary: false, isSix: false, isDot: true,
    speedKph: 138.5, winProbabilityIndia: 54,
    commentary: 'OUT! CAUGHT! Big breakthrough for Australia! Rohit goes for another lofted drive over mid-off, but mistimes it straight into the hands of Pat Cummins. The Indian skipper departs for a blistering 24 off 11 balls!',
    wicketDetail: {
      type: 'caught',
      batsmanName: 'Rohit Sharma',
      fielderName: 'Pat Cummins',
      description: 'c Cummins b Hazlewood 24 (11b, 2x4, 2x6)'
    },
    significance: 'wicket'
  },
  {
    id: 'b-4-3', overNumber: 3, ballInOver: 3, overDisplay: '3.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 136.2, winProbabilityIndia: 53,
    commentary: 'Pant walks in at No. 3. Hazlewood welcomes him with a testing back-of-a-length delivery, left alone.',
    significance: 'regular'
  },
  {
    id: 'b-4-4', overNumber: 3, ballInOver: 4, overDisplay: '3.4',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 134.8, winProbabilityIndia: 57,
    commentary: 'FOUR! Classic Rishabh Pant audacious whip! Flicked through midwicket with exquisite wrists to open his account.',
    significance: 'boundary'
  },
  {
    id: 'b-4-5', overNumber: 3, ballInOver: 5, overDisplay: '3.5',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 137.9, winProbabilityIndia: 56,
    commentary: 'Pushed firmly to cover fielder Mitchell Marsh, no run.',
    significance: 'regular'
  },
  {
    id: 'b-4-6', overNumber: 3, ballInOver: 6, overDisplay: '3.6',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 136.5, winProbabilityIndia: 56,
    commentary: 'Quick single into the covers. India 38/1 after 4 overs.',
    significance: 'regular'
  },

  // --- OVER 5: Mitchell Starc ---
  {
    id: 'b-5-1', overNumber: 4, ballInOver: 1, overDisplay: '4.1',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 144.6, winProbabilityIndia: 55,
    commentary: 'Starc fires an inswinging yorker, Pant jams his bat down in the nick of time.',
    significance: 'regular'
  },
  {
    id: 'b-5-2', overNumber: 4, ballInOver: 2, overDisplay: '4.2',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 143.0, winProbabilityIndia: 58,
    commentary: 'FOUR! What a shot! Shuffles across and scoops Starc over the wicketkeeper for four!',
    significance: 'boundary'
  },
  {
    id: 'b-5-3', overNumber: 4, ballInOver: 3, overDisplay: '4.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.1, winProbabilityIndia: 58,
    commentary: 'Driven down to long-on for a single.',
    significance: 'regular'
  },
  {
    id: 'b-5-4', overNumber: 4, ballInOver: 4, overDisplay: '4.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 145.4, winProbabilityIndia: 59,
    commentary: 'Kohli clips off his pads into deep midwicket. Rapid running turns one into two.',
    significance: 'regular'
  },
  {
    id: 'b-5-5', overNumber: 4, ballInOver: 5, overDisplay: '4.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 144.2, winProbabilityIndia: 58,
    commentary: 'Starc angles across off stump, Kohli pats towards backward point.',
    significance: 'regular'
  },
  {
    id: 'b-5-6', overNumber: 4, ballInOver: 6, overDisplay: '4.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.9, winProbabilityIndia: 59,
    commentary: 'Steered down to deep third for a single. India 46/1 after 5 overs.',
    significance: 'regular'
  },

  // --- OVER 6: Pat Cummins (End of Powerplay) ---
  {
    id: 'b-6-1', overNumber: 5, ballInOver: 1, overDisplay: '5.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 139.8, winProbabilityIndia: 59,
    commentary: 'Single to deep cover off Cummins.',
    significance: 'regular'
  },
  {
    id: 'b-6-2', overNumber: 5, ballInOver: 2, overDisplay: '5.2',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 141.0, winProbabilityIndia: 58,
    commentary: 'Good bouncer from Cummins! Pant sways out of the way gracefully.',
    significance: 'regular'
  },
  {
    id: 'b-6-3', overNumber: 5, ballInOver: 3, overDisplay: '5.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 138.4, winProbabilityIndia: 62,
    commentary: 'FOUR! Beautiful placement! Punched off the backfoot through the gap between cover and point.',
    significance: 'boundary'
  },
  {
    id: 'b-6-4', overNumber: 5, ballInOver: 4, overDisplay: '5.4',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 140.2, winProbabilityIndia: 62,
    commentary: 'Rotates strike with a push towards mid-on.',
    significance: 'regular'
  },
  {
    id: 'b-6-5', overNumber: 5, ballInOver: 5, overDisplay: '5.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 139.1, winProbabilityIndia: 63,
    commentary: 'Worked neatly through square leg for a single.',
    significance: 'regular'
  },
  {
    id: 'b-6-6', overNumber: 5, ballInOver: 6, overDisplay: '5.6',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.0, winProbabilityIndia: 63,
    commentary: 'Single off the last ball of the Powerplay. India 54/1 at 6 overs (CRR: 9.00, RRR: 9.64).',
    significance: 'regular'
  },

  // --- OVER 7: Adam Zampa (Spin introduced) ---
  {
    id: 'b-7-1', overNumber: 6, ballInOver: 1, overDisplay: '6.1',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 92.4, winProbabilityIndia: 63,
    commentary: 'Zampa into the attack. Floats a leg-break up, driven to long-off for one.',
    significance: 'regular'
  },
  {
    id: 'b-7-2', overNumber: 6, ballInOver: 2, overDisplay: '6.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 94.1, winProbabilityIndia: 63,
    commentary: 'Kohli milks the spinner with a low-risk push into the vacant extra cover ring.',
    significance: 'regular'
  },
  {
    id: 'b-7-3', overNumber: 6, ballInOver: 3, overDisplay: '6.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 89.5, winProbabilityIndia: 68,
    commentary: 'SIX! Slog sweep dispatched! Pant gets down on one knee and launches Zampa into the party stand at deep midwicket!',
    significance: 'boundary'
  },
  {
    id: 'b-7-4', overNumber: 6, ballInOver: 4, overDisplay: '6.4',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 95.0, winProbabilityIndia: 67,
    commentary: 'Zampa drags length back with a flatter slider, defended by Pant.',
    significance: 'regular'
  },
  {
    id: 'b-7-5', overNumber: 6, ballInOver: 5, overDisplay: '6.5',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 91.8, winProbabilityIndia: 67,
    commentary: 'Dinked into the leg side for a single.',
    significance: 'regular'
  },
  {
    id: 'b-7-6', overNumber: 6, ballInOver: 6, overDisplay: '6.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 93.2, winProbabilityIndia: 68,
    commentary: 'Worked to deep backward square leg. 10 runs off Zampa\'s first over. India 64/1 after 7 overs.',
    significance: 'regular'
  },

  // --- OVER 8: Glenn Maxwell ---
  {
    id: 'b-8-1', overNumber: 7, ballInOver: 1, overDisplay: '7.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 98.2, winProbabilityIndia: 68,
    commentary: 'Maxwell firing darts from around the wicket, tucked to long-on for one.',
    significance: 'regular'
  },
  {
    id: 'b-8-2', overNumber: 7, ballInOver: 2, overDisplay: '7.2',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 96.0, winProbabilityIndia: 68,
    commentary: 'Pushed down to deep cover for a single.',
    significance: 'regular'
  },
  {
    id: 'b-8-3', overNumber: 7, ballInOver: 3, overDisplay: '7.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 97.4, winProbabilityIndia: 69,
    commentary: 'Kohli plays against the spin gently into midwicket and sprints two effortlessly. Masterful running.',
    significance: 'regular'
  },
  {
    id: 'b-8-4', overNumber: 7, ballInOver: 4, overDisplay: '7.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 95.8, winProbabilityIndia: 69,
    commentary: 'Pushed into the offside ring for one more.',
    significance: 'regular'
  },
  {
    id: 'b-8-5', overNumber: 7, ballInOver: 5, overDisplay: '7.5',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 100.1, winProbabilityIndia: 68,
    commentary: 'Quicker ball on off stump, cut straight to point.',
    significance: 'regular'
  },
  {
    id: 'b-8-6', overNumber: 7, ballInOver: 6, overDisplay: '7.6',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 97.5, winProbabilityIndia: 68,
    commentary: 'Single down to long-off. India 70/1 after 8 overs.',
    significance: 'regular'
  },

  // --- OVER 9: Marcus Stoinis ---
  {
    id: 'b-9-1', overNumber: 8, ballInOver: 1, overDisplay: '8.1',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 128.5, winProbabilityIndia: 71,
    commentary: 'FOUR! Stoinis feeds a gentle half-volley, and Pant pummels it over mid-off with ferocious bat speed.',
    significance: 'boundary'
  },
  {
    id: 'b-9-2', overNumber: 8, ballInOver: 2, overDisplay: '8.2',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 126.0, winProbabilityIndia: 72,
    commentary: 'Flicked behind square leg, Kohli calls early for two and they get home easily.',
    significance: 'regular'
  },
  {
    id: 'b-9-3', overNumber: 8, ballInOver: 3, overDisplay: '8.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 129.1, winProbabilityIndia: 72,
    commentary: 'Steered to third man for a single.',
    significance: 'regular'
  },
  {
    id: 'b-9-4', overNumber: 8, ballInOver: 4, overDisplay: '8.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 127.4, winProbabilityIndia: 75,
    commentary: 'FOUR! Exquisite placement! Kohli stands tall and punches Stoinis between cover and point. 50 partnership between Kohli and Pant!',
    significance: 'milestone',
    milestoneDescription: '50-run Partnership (32 balls) between Kohli & Pant'
  },
  {
    id: 'b-9-5', overNumber: 8, ballInOver: 5, overDisplay: '8.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 128.0, winProbabilityIndia: 75,
    commentary: 'Pushed into the off side for a single.',
    significance: 'regular'
  },
  {
    id: 'b-9-6', overNumber: 8, ballInOver: 6, overDisplay: '8.6',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 129.8, winProbabilityIndia: 75,
    commentary: 'Glanced to fine leg for one. Big over for India — 13 runs off it! India 83/1 after 9 overs.',
    significance: 'high_scoring'
  },

  // --- OVER 10: Adam Zampa — WICKET of Pant! (Crucial Checkpoint Anchor) ---
  {
    id: 'b-10-1', overNumber: 9, ballInOver: 1, overDisplay: '9.1',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 91.2, winProbabilityIndia: 75,
    commentary: 'Pant cuts off the back foot to sweeper cover for a single.',
    significance: 'regular'
  },
  {
    id: 'b-10-2', overNumber: 9, ballInOver: 2, overDisplay: '9.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Rishabh Pant',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 93.0, winProbabilityIndia: 75,
    commentary: 'Kohli taps to mid-on and jogs through.',
    significance: 'regular'
  },
  {
    id: 'b-10-3', overNumber: 9, ballInOver: 3, overDisplay: '9.3',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 90.5, winProbabilityIndia: 76,
    commentary: 'Reverse sweep played into the backward point gap for two.',
    significance: 'regular'
  },
  {
    id: 'b-10-4', overNumber: 9, ballInOver: 4, overDisplay: '9.4',
    batsmanId: 'ind_pant', batsmanName: 'Rishabh Pant', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 0, extras: 0, isWicket: true, isBoundary: false, isSix: false, isDot: true,
    speedKph: 92.8, winProbabilityIndia: 64,
    commentary: 'OUT! CAUGHT! Zampa strikes back! Pant tries another audacious reverse sweep against the leg-spin, gets a top-edge that loops straight to Josh Hazlewood at backward point! Crucial wicket for Australia! Pant departs for 28 (18b).',
    wicketDetail: {
      type: 'caught',
      batsmanName: 'Rishabh Pant',
      fielderName: 'Josh Hazlewood',
      description: 'c Hazlewood b Zampa 28 (18b, 4x4, 1x6)'
    },
    significance: 'wicket'
  },
  {
    id: 'b-10-5', overNumber: 9, ballInOver: 5, overDisplay: '9.5',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 94.5, winProbabilityIndia: 63,
    commentary: 'Enter the ICC No. 1 T20 batter Suryakumar Yadav! Zampa tosses up a beauty, Surya defends carefully.',
    significance: 'regular'
  },
  {
    id: 'b-10-6', overNumber: 9, ballInOver: 6, overDisplay: '9.6',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 93.3, winProbabilityIndia: 64,
    commentary: 'Single off the back foot through midwicket. Halfway through the chase: India 88/2 in 10.0 overs (Need 101 runs in 60 balls, RRR: 10.10).',
    significance: 'regular'
  },

  // --- OVER 11: Josh Hazlewood (Tight control) ---
  {
    id: 'b-11-1', overNumber: 10, ballInOver: 1, overDisplay: '10.1',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 136.0, winProbabilityIndia: 64,
    commentary: 'Dabbed into the covers for a quick single.',
    significance: 'regular'
  },
  {
    id: 'b-11-2', overNumber: 10, ballInOver: 2, overDisplay: '10.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.5, winProbabilityIndia: 64,
    commentary: 'Kohli pushes Hazlewood towards long-on for one.',
    significance: 'regular'
  },
  {
    id: 'b-11-3', overNumber: 10, ballInOver: 3, overDisplay: '10.3',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 135.2, winProbabilityIndia: 65,
    commentary: 'Surya opens the face and steers between backward point and short third for a couple.',
    significance: 'regular'
  },
  {
    id: 'b-11-4', overNumber: 10, ballInOver: 4, overDisplay: '10.4',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 138.0, winProbabilityIndia: 63,
    commentary: 'Good tight line from Hazlewood, defended to extra cover.',
    significance: 'regular'
  },
  {
    id: 'b-11-5', overNumber: 10, ballInOver: 5, overDisplay: '10.5',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 136.8, winProbabilityIndia: 64,
    commentary: 'Worked away behind square on the leg side for one.',
    significance: 'regular'
  },
  {
    id: 'b-11-6', overNumber: 10, ballInOver: 6, overDisplay: '10.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.2, winProbabilityIndia: 64,
    commentary: 'Single down to deep point. 6 runs off the over. India 94/2 after 11 overs.',
    significance: 'regular'
  },

  // --- OVER 12: Glenn Maxwell ---
  {
    id: 'b-12-1', overNumber: 11, ballInOver: 1, overDisplay: '11.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 96.5, winProbabilityIndia: 64,
    commentary: 'Kohli pushes down the ground to long-off for one.',
    significance: 'regular'
  },
  {
    id: 'b-12-2', overNumber: 11, ballInOver: 2, overDisplay: '11.2',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 94.2, winProbabilityIndia: 68,
    commentary: 'FOUR! That is classic Suryakumar! Reads the flatter off-break, sweeps firmly behind square leg for four!',
    significance: 'boundary'
  },
  {
    id: 'b-12-3', overNumber: 11, ballInOver: 3, overDisplay: '11.3',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 97.0, winProbabilityIndia: 68,
    commentary: 'Single pushed into the covers.',
    significance: 'regular'
  },
  {
    id: 'b-12-4', overNumber: 11, ballInOver: 4, overDisplay: '11.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 95.3, winProbabilityIndia: 69,
    commentary: 'Kohli clips with soft wrists into deep midwicket, sharp sprint turns 1 into 2!',
    significance: 'regular'
  },
  {
    id: 'b-12-5', overNumber: 11, ballInOver: 5, overDisplay: '11.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 98.4, winProbabilityIndia: 69,
    commentary: 'Driven down to long-on for one.',
    significance: 'regular'
  },
  {
    id: 'b-12-6', overNumber: 11, ballInOver: 6, overDisplay: '11.6',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_maxwell', bowlerName: 'Glenn Maxwell',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 96.1, winProbabilityIndia: 70,
    commentary: 'Single down to long-off. 10 off the over. India 104/2 after 12 overs.',
    significance: 'regular'
  },

  // --- OVER 13: Mitchell Starc — MASSIVE TURNING POINT OVER (18 runs!) ---
  {
    id: 'b-13-1', overNumber: 12, ballInOver: 1, overDisplay: '12.1',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 144.5, winProbabilityIndia: 78,
    commentary: 'SIX! EXTRAORDINARY INNOVATION! Starc bowls a 144 km/h searing delivery, Surya walks across outside off and scoops it over fine leg all the way into the stands! Unreal execution!',
    significance: 'turning_point'
  },
  {
    id: 'b-13-2', overNumber: 12, ballInOver: 2, overDisplay: '12.2',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 145.2, winProbabilityIndia: 82,
    commentary: 'FOUR! BACK-TO-BACK CARNAGE! Starc goes full and wide, Surya opens the bat face and slices it over backward point like a laser!',
    significance: 'boundary'
  },
  {
    id: 'b-13-3', overNumber: 12, ballInOver: 3, overDisplay: '12.3',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 143.8, winProbabilityIndia: 82,
    commentary: 'Starc cramps him with a yorker on leg stump, Surya squeezes it out to midwicket for a single.',
    significance: 'regular'
  },
  {
    id: 'b-13-4', overNumber: 12, ballInOver: 4, overDisplay: '12.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 146.0, winProbabilityIndia: 83,
    commentary: 'Kohli guides a 146 km/h bullet past backward point, beats the infield and pushes hard for two.',
    significance: 'regular'
  },
  {
    id: 'b-13-5', overNumber: 12, ballInOver: 5, overDisplay: '12.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 143.9, winProbabilityIndia: 87,
    commentary: 'FOUR! PURE MASTERCLASS! Overpitched outside off, Kohli transfers his weight forward and punches an imperious cover drive to the fence! Mitchell Starc is under severe pressure!',
    significance: 'boundary'
  },
  {
    id: 'b-13-6', overNumber: 12, ballInOver: 6, overDisplay: '12.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 144.1, winProbabilityIndia: 87,
    commentary: 'Single to third man. A colossal over for India — 18 runs taken off Starc! India 122/2 after 13 overs (Need 67 in 42 balls, RRR dropped to 9.57)!',
    significance: 'turning_point'
  },

  // --- OVER 14: Adam Zampa ---
  {
    id: 'b-14-1', overNumber: 13, ballInOver: 1, overDisplay: '13.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 91.5, winProbabilityIndia: 87,
    commentary: 'Kohli works Zampa through midwicket for a single.',
    significance: 'regular'
  },
  {
    id: 'b-14-2', overNumber: 13, ballInOver: 2, overDisplay: '13.2',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 93.4, winProbabilityIndia: 87,
    commentary: 'Surya taps gently into the covers for one.',
    significance: 'regular'
  },
  {
    id: 'b-14-3', overNumber: 13, ballInOver: 3, overDisplay: '13.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 90.8, winProbabilityIndia: 87,
    commentary: 'Another controlled push down to long-on.',
    significance: 'regular'
  },
  {
    id: 'b-14-4', overNumber: 13, ballInOver: 4, overDisplay: '13.4',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 92.0, winProbabilityIndia: 90,
    commentary: 'FOUR! Surya goes inside-out over extra cover! He cleared the infield with ridiculous ease. Fifty partnership between Kohli and Surya!',
    significance: 'milestone',
    milestoneDescription: '50-run Partnership (23 balls) between Kohli & Surya'
  },
  {
    id: 'b-14-5', overNumber: 13, ballInOver: 5, overDisplay: '13.5',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 94.0, winProbabilityIndia: 90,
    commentary: 'Pushed into the gap at cover for a single.',
    significance: 'regular'
  },
  {
    id: 'b-14-6', overNumber: 13, ballInOver: 6, overDisplay: '13.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_zampa', bowlerName: 'Adam Zampa',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 92.6, winProbabilityIndia: 90,
    commentary: 'Tucked into midwicket for one. 9 runs off Zampa\'s final over. India 131/2 after 14 overs.',
    significance: 'regular'
  },

  // --- OVER 15: Pat Cummins ---
  {
    id: 'b-15-1', overNumber: 14, ballInOver: 1, overDisplay: '14.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 140.2, winProbabilityIndia: 90,
    commentary: 'Cummins back into the attack. Directed into the ribs, Kohli tucks it behind square.',
    significance: 'regular'
  },
  {
    id: 'b-15-2', overNumber: 14, ballInOver: 2, overDisplay: '14.2',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 139.0, winProbabilityIndia: 93,
    commentary: 'SIX! Incredible pickup over fine leg! Surya walks across his stumps and hooks Cummins clean out of the stadium! Surya moves to 31 off just 15 balls!',
    significance: 'boundary'
  },
  {
    id: 'b-15-3', overNumber: 14, ballInOver: 3, overDisplay: '14.3',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 141.5, winProbabilityIndia: 92,
    commentary: 'Cummins bowls a searing yorker on off stump, Surya digs it out back to the bowler.',
    significance: 'regular'
  },
  {
    id: 'b-15-4', overNumber: 14, ballInOver: 4, overDisplay: '14.4',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 140.0, winProbabilityIndia: 92,
    commentary: 'Dinked down towards third man for a single.',
    significance: 'regular'
  },
  {
    id: 'b-15-5', overNumber: 14, ballInOver: 5, overDisplay: '14.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 141.8, winProbabilityIndia: 93,
    commentary: 'Kohli whips Cummins between mid-on and midwicket, rapid sprinting yields two comfortably.',
    significance: 'regular'
  },
  {
    id: 'b-15-6', overNumber: 14, ballInOver: 6, overDisplay: '14.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.4, winProbabilityIndia: 93,
    commentary: 'Single to deep cover. India 142/2 after 15 overs (Need 47 in 30 balls, RRR: 9.40).',
    significance: 'regular'
  },

  // --- OVER 16: Josh Hazlewood — WICKET of Surya! ---
  {
    id: 'b-16-1', overNumber: 15, ballInOver: 1, overDisplay: '15.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Suryakumar Yadav',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 136.4, winProbabilityIndia: 93,
    commentary: 'Tucked into the leg side for a single.',
    significance: 'regular'
  },
  {
    id: 'b-16-2', overNumber: 15, ballInOver: 2, overDisplay: '15.2',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 135.0, winProbabilityIndia: 95,
    commentary: 'FOUR! Whipped through midwicket with lightning fast hands! Surya is in sublime touch.',
    significance: 'boundary'
  },
  {
    id: 'b-16-3', overNumber: 15, ballInOver: 3, overDisplay: '15.3',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 137.6, winProbabilityIndia: 94,
    commentary: 'Slower ball off-cutter, beating Surya\'s drive outside off.',
    significance: 'regular'
  },
  {
    id: 'b-16-4', overNumber: 15, ballInOver: 4, overDisplay: '15.4',
    batsmanId: 'ind_surya', batsmanName: 'Suryakumar Yadav', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: true, isBoundary: false, isSix: false, isDot: true,
    speedKph: 136.9, winProbabilityIndia: 84,
    commentary: 'OUT! CAUGHT! Hazlewood breaks the partnership! Surya goes for another ramp over short third man, but doesn\'t get enough elevation and Matthew Wade tracks back to pouch an easy catch. A scintillating cameo of 36 (18b) comes to an end!',
    wicketDetail: {
      type: 'caught',
      batsmanName: 'Suryakumar Yadav',
      fielderName: 'Matthew Wade',
      description: 'c Wade b Hazlewood 36 (18b, 4x4, 2x6)'
    },
    significance: 'wicket'
  },
  {
    id: 'b-16-5', overNumber: 15, ballInOver: 5, overDisplay: '15.5',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 138.2, winProbabilityIndia: 83,
    commentary: 'Hardik Pandya arrives in the middle. Hazlewood fires a tight length ball, defended to point.',
    significance: 'regular'
  },
  {
    id: 'b-16-6', overNumber: 15, ballInOver: 6, overDisplay: '15.6',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_hazlewood', bowlerName: 'Josh Hazlewood',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 137.0, winProbabilityIndia: 84,
    commentary: 'Hardik gets off the mark with a punch to sweeper cover. India 148/3 after 16 overs (Need 41 in 24 balls, RRR: 10.25). Hazlewood finishes his spell: 4-0-28-2.',
    significance: 'regular'
  },

  // --- OVER 17: Marcus Stoinis ---
  {
    id: 'b-17-1', overNumber: 16, ballInOver: 1, overDisplay: '16.1',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 128.0, winProbabilityIndia: 84,
    commentary: 'Stoinis bowls full outside off, pushed down to long-off for one.',
    significance: 'regular'
  },
  {
    id: 'b-17-2', overNumber: 16, ballInOver: 2, overDisplay: '16.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 127.3, winProbabilityIndia: 89,
    commentary: 'FOUR! FIFTY FOR VIRAT KOHLI! What an innings under immense pressure! Steps out and drives Stoinis through extra cover with surgical precision. 50 off 38 balls! The crowd is on its feet chanting KOHLI!',
    significance: 'milestone',
    milestoneDescription: 'Virat Kohli reaches 50* (38 balls, 5x4, 0x6)'
  },
  {
    id: 'b-17-3', overNumber: 16, ballInOver: 3, overDisplay: '16.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 129.0, winProbabilityIndia: 89,
    commentary: 'Kohli drops it into the off side and scampers across for a single.',
    significance: 'regular'
  },
  {
    id: 'b-17-4', overNumber: 16, ballInOver: 4, overDisplay: '16.4',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 6, extras: 0, isWicket: false, isBoundary: false, isSix: true, isDot: false,
    speedKph: 126.8, winProbabilityIndia: 94,
    commentary: 'SIX! HARDIK PANDYA FLEXES HIS MUSCLES! Stoinis misses his yorker, right in the slot, and Hardik bludgeons it 98 meters straight back over long-on!',
    significance: 'boundary'
  },
  {
    id: 'b-17-5', overNumber: 16, ballInOver: 5, overDisplay: '16.5',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 128.5, winProbabilityIndia: 95,
    commentary: 'Driven hard through extra cover, good fielding on the boundary by David Warner keeps it down to two.',
    significance: 'regular'
  },
  {
    id: 'b-17-6', overNumber: 16, ballInOver: 6, overDisplay: '16.6',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 127.0, winProbabilityIndia: 95,
    commentary: 'Single to retain strike. 15 runs from Stoinis\' over! India 163/3 after 17 overs (Need 26 in 18 balls, RRR: 8.67).',
    significance: 'high_scoring'
  },

  // --- OVER 18: Pat Cummins (Death bowling brilliance) ---
  {
    id: 'b-18-1', overNumber: 17, ballInOver: 1, overDisplay: '17.1',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 142.6, winProbabilityIndia: 93,
    commentary: 'Brilliant yorker from Cummins right at the base of off stump! Hardik jams it out to mid-off.',
    significance: 'regular'
  },
  {
    id: 'b-18-2', overNumber: 17, ballInOver: 2, overDisplay: '17.2',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 141.0, winProbabilityIndia: 93,
    commentary: 'Slower cutter wide outside off, dragged down to long-on for one.',
    significance: 'regular'
  },
  {
    id: 'b-18-3', overNumber: 17, ballInOver: 3, overDisplay: '17.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 143.2, winProbabilityIndia: 93,
    commentary: 'Kohli nudges it off his pads behind square for a single.',
    significance: 'regular'
  },
  {
    id: 'b-18-4', overNumber: 17, ballInOver: 4, overDisplay: '17.4',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 140.8, winProbabilityIndia: 94,
    commentary: 'Flicked into the vacant deep midwicket area, they hustle back for a frantic second!',
    significance: 'regular'
  },
  {
    id: 'b-18-5', overNumber: 17, ballInOver: 5, overDisplay: '17.5',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 142.1, winProbabilityIndia: 94,
    commentary: 'Yorker squeezed out into the cover ring for a single.',
    significance: 'regular'
  },
  {
    id: 'b-18-6', overNumber: 17, ballInOver: 6, overDisplay: '17.6',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_cummins', bowlerName: 'Pat Cummins',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 143.5, winProbabilityIndia: 94,
    commentary: 'Tapped gently to point, single taken. Cummins bowls a clutch over conceding just 6 runs! India 169/3 after 18 overs (Need 20 in 12 balls, RRR: 10.00).',
    significance: 'tight_over'
  },

  // --- OVER 19: Mitchell Starc (Penultimate drama) ---
  {
    id: 'b-19-1', overNumber: 18, ballInOver: 1, overDisplay: '18.1',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 144.8, winProbabilityIndia: 95,
    commentary: 'Kohli pierces extra cover, Cummins runs around on the rope, they take two.',
    significance: 'regular'
  },
  {
    id: 'b-19-2', overNumber: 18, ballInOver: 2, overDisplay: '18.2',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 145.6, winProbabilityIndia: 97,
    commentary: 'FOUR! SENSATIONAL VIRAT KOHLI! Starc serves full speed outside off, Kohli opens the face and carves it between backward point and short third man! Pure genius in the death overs!',
    significance: 'boundary'
  },
  {
    id: 'b-19-3', overNumber: 18, ballInOver: 3, overDisplay: '18.3',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Hardik Pandya',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 146.2, winProbabilityIndia: 97,
    commentary: 'Full toss pushed to long-on for a single.',
    significance: 'regular'
  },
  {
    id: 'b-19-4', overNumber: 18, ballInOver: 4, overDisplay: '18.4',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 0, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true,
    speedKph: 145.0, winProbabilityIndia: 96,
    commentary: 'Play and a miss! Starc fires a 145 km/h bouncer, Hardik swings hard across the line but misses.',
    significance: 'regular'
  },
  {
    id: 'b-19-5', overNumber: 18, ballInOver: 5, overDisplay: '18.5',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 143.8, winProbabilityIndia: 98,
    commentary: 'FOUR! EDGED AND GONE TO THE ROPE! Hardik slashes hard at a wide delivery, thick outside edge flies past the diving keeper Wade for four!',
    significance: 'boundary'
  },
  {
    id: 'b-19-6', overNumber: 18, ballInOver: 6, overDisplay: '18.6',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_starc', bowlerName: 'Mitchell Starc',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 144.4, winProbabilityIndia: 98,
    commentary: 'Single down to deep point. 12 runs off Starc\'s 19th over. India 181/3 after 19 overs. INDIA NEED 8 RUNS FROM 6 BALLS TO WIN!',
    significance: 'turning_point'
  },

  // --- OVER 20: Marcus Stoinis (Final over thriller!) ---
  {
    id: 'b-20-1', overNumber: 19, ballInOver: 1, overDisplay: '19.1',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 2, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 129.2, winProbabilityIndia: 99,
    commentary: 'Stoinis to bowl the final over! Hardik pulls through deep midwicket, Stoinis and fielders scramble, 2 runs taken! Need 6 from 5 balls.',
    significance: 'regular'
  },
  {
    id: 'b-20-2', overNumber: 19, ballInOver: 2, overDisplay: '19.2',
    batsmanId: 'ind_hardik', batsmanName: 'Hardik Pandya', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 0, extras: 0, isWicket: true, isBoundary: false, isSix: false, isDot: true,
    speedKph: 128.0, winProbabilityIndia: 88,
    commentary: 'OUT! CAUGHT! DRAMA IN THE FINAL OVER! Hardik Pandya tries to finish it with a six over long-off, but doesn\'t get under the slower ball! Tim David settles underneath it on the boundary line and holds on! Hardik departs for 17 (12b). India need 6 from 4 balls!',
    wicketDetail: {
      type: 'caught',
      batsmanName: 'Hardik Pandya',
      fielderName: 'Tim David',
      description: 'c David b Stoinis 17 (12b, 1x4, 1x6)'
    },
    significance: 'wicket'
  },
  {
    id: 'b-20-3', overNumber: 19, ballInOver: 3, overDisplay: '19.3',
    batsmanId: 'ind_jadeja', batsmanName: 'Ravindra Jadeja', nonStrikerName: 'Virat Kohli',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 127.5, winProbabilityIndia: 91,
    commentary: 'Ravindra Jadeja comes in, nudges Stoinis with soft hands to square leg and sprints a life-saving single to put King Kohli on strike! Need 5 from 3 balls!',
    significance: 'regular'
  },
  {
    id: 'b-20-4', overNumber: 19, ballInOver: 4, overDisplay: '19.4',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Ravindra Jadeja',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 4, extras: 0, isWicket: false, isBoundary: true, isSix: false, isDot: false,
    speedKph: 128.8, winProbabilityIndia: 99,
    commentary: 'FOUR! VIRAT KOHLI HAS SEALED IT! HE HAS DONE IT AGAIN! Slower delivery outside off, Kohli walks across and with wristwork from the heavens, pierces the gap between backward point and third man to the boundary rope! Scores are level!',
    significance: 'boundary'
  },
  {
    id: 'b-20-5', overNumber: 19, ballInOver: 5, overDisplay: '19.5',
    batsmanId: 'ind_kohli', batsmanName: 'Virat Kohli', nonStrikerName: 'Ravindra Jadeja',
    bowlerId: 'aus_stoinis', bowlerName: 'Marcus Stoinis',
    runsScored: 1, extras: 0, isWicket: false, isBoundary: false, isSix: false, isDot: false,
    speedKph: 129.5, winProbabilityIndia: 100,
    commentary: 'ONE RUN! INDIA WIN BY 6 WICKETS! Kohli punches Stoinis to mid-on, Jadeja and Kohli sprint across with arms aloft in jubilation! Virat Kohli finishes unbeaten on 63* (44 balls) in another legendary World Cup chase!',
    significance: 'turning_point'
  },
];
