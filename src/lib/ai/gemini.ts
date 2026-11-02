import { CatchUpData, CurrentMatchState, UserPreferences } from '@/lib/types/cricket';

interface GeminiResponse {
  text: string;
  isDemoFallback: boolean;
  provider: 'gemini-live' | 'demo-fallback';
}

export async function generateAiMatchInsight(
  matchState: CurrentMatchState,
  preferences: UserPreferences
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `You are the lead cricket analyst for "Blink & Miss", a live cricket companion.
Analyze the CURRENT live match state between India and Australia.

MATCH CONTEXT:
- Batting Team: India (IND) chasing target of ${matchState.target} in 20 overs
- Current Score: ${matchState.runs}/${matchState.wickets} in ${matchState.oversFormatted} overs
- Required Run Rate (RRR): ${matchState.rrr} | Current Run Rate (CRR): ${matchState.crr}
- Runs Needed: ${matchState.runsNeeded} from ${matchState.ballsRemaining} balls
- Striker: ${matchState.striker.name} ${matchState.striker.runs}* (${matchState.striker.balls} balls, ${matchState.striker.fours}x4, ${matchState.striker.sixes}x6, SR: ${matchState.striker.strikeRate})
- Non-Striker: ${matchState.nonStriker.name} ${matchState.nonStriker.runs} (${matchState.nonStriker.balls} balls)
- Current Bowler: ${matchState.currentBowler.name} (${matchState.currentBowler.overs} ov, ${matchState.currentBowler.runs} runs, ${matchState.currentBowler.wickets} wkts)
- Match Status: ${matchState.statusMessage}
- Fan Preferences: Favourite Team: ${preferences.favouriteTeam}, Favourite Player: ${preferences.favouritePlayer}, Summary Style: ${preferences.summaryStyle}

STRICT GUIDELINES:
1. Interpret ONLY the exact score and events up to this moment (Over ${matchState.oversFormatted}). NEVER mention events that happen in future overs.
2. Provide a vivid, sharp breakdown:
   - Match Momentum & Turning Points: Who holds the advantage right now and why?
   - Strategic Tactical Angle: What must the batting side do next vs Australia's bowling plan?
   - Favourite Player Spotlight: Highlight ${preferences.favouritePlayer}'s contribution so far.
3. Keep the tone enthusiastic, modern, sports-tech savvy, and ${preferences.summaryStyle === 'concise' ? 'tight (approx 90-110 words)' : 'comprehensive (approx 160-190 words)'}.`;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return {
      text: getFallbackInsight(matchState, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!res.ok) {
      console.warn('Gemini API call returned status:', res.status);
      return {
        text: getFallbackInsight(matchState, preferences),
        isDemoFallback: true,
        provider: 'demo-fallback',
      };
    }

    const data = await res.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return {
        text: getFallbackInsight(matchState, preferences),
        isDemoFallback: true,
        provider: 'demo-fallback',
      };
    }

    return {
      text: generatedText,
      isDemoFallback: false,
      provider: 'gemini-live',
    };
  } catch (error) {
    console.error('Error in Gemini API request:', error);
    return {
      text: getFallbackInsight(matchState, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }
}

export async function generateAiCatchUpSummary(
  catchUpData: CatchUpData,
  preferences: UserPreferences
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `You are the lead cricket analyst for "Blink & Miss". The fan stepped away and clicked "Catch Me Up".
Summarize ONLY what occurred between the saved checkpoint and the current moment.

CHECKPOINT DATA:
- Checkpoint: Over ${catchUpData.checkpoint.overDisplay} (Score: ${catchUpData.checkpoint.scoreDisplay})
- Current Position: Over ${catchUpData.currentOverDisplay} (Score: ${catchUpData.currentScoreDisplay})
- Overs Missed: ${catchUpData.oversPassed} overs
- Runs Added: +${catchUpData.runsAdded} runs
- Wickets Fallen: ${catchUpData.wicketsFell} (${catchUpData.wicketsList.map(w => `${w.batsman} out to ${w.bowler} (${w.description})`).join(', ') || 'None'})
- Boundaries in window: ${catchUpData.boundaries.fours} fours, ${catchUpData.boundaries.sixes} sixes
- User's Favourite Player: ${preferences.favouritePlayer}
- Player Impact Notes: ${catchUpData.favouritePlayerImpact.join(' ')}
- Momentum Verdict: ${catchUpData.momentumNarrative}
- Why It Matters: ${catchUpData.whyItMatters}

STRICT INSTRUCTIONS:
1. Explain what changed during these missed overs in a crisp broadcast style.
2. Structure your briefing with:
   - ⚡ The Big Picture: Runs added, current equation, momentum shift.
   - 🎯 Turning Points & Wickets: Critical moments during this window.
   - 💡 Why It Matters: Tactical significance of this phase.
   - 🌟 ${preferences.favouritePlayer} Check-in: Exactly what their favourite player did.
3. Length: ${preferences.summaryStyle === 'concise' ? 'approx 80-100 words' : 'approx 150-180 words'}.
4. Never invent events not in the data.`;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return {
      text: getFallbackCatchUpSummary(catchUpData, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();

      console.error(
        '[Gemini Catch-Up Error]',
        res.status,
        errorDetails
      );

      return {
        text: getFallbackCatchUpSummary(catchUpData, preferences),
        isDemoFallback: true,
        provider: 'demo-fallback',
      };
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      text: text || getFallbackCatchUpSummary(catchUpData, preferences),
      isDemoFallback: !text,
      provider: text ? 'gemini-live' : 'demo-fallback',
    };
  } catch (error) {
    console.error('Error generating catch up summary:', error);
    return {
      text: getFallbackCatchUpSummary(catchUpData, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }
}

export async function answerFanQuestion(
  question: string,
  matchState: CurrentMatchState,
  preferences: UserPreferences
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `You are "Blink & Miss AI Cricket Assistant", a witty, knowledgeable live cricket analyst.
Answer the fan's question using ONLY the verified match data provided below up to Over ${matchState.oversFormatted}.

MATCH CONTEXT:
- Match: India chasing Australia's 188/6 (Target 189)
- Current Score: India ${matchState.runs}/${matchState.wickets} in ${matchState.oversFormatted} overs
- Equation: ${matchState.runsNeeded} runs needed from ${matchState.ballsRemaining} balls (RRR: ${matchState.rrr}, CRR: ${matchState.crr})
- Status: ${matchState.statusMessage}
- At Crease: ${matchState.striker.name} (${matchState.striker.runs}* off ${matchState.striker.balls}b) & ${matchState.nonStriker.name} (${matchState.nonStriker.runs} off ${matchState.nonStriker.balls}b)
- Current Bowler: ${matchState.currentBowler.name} (${matchState.currentBowler.overs} ov, ${matchState.currentBowler.runs} runs, ${matchState.currentBowler.wickets} wkts)
- Fan's Favourite Player: ${preferences.favouritePlayer}
- Recent balls: ${matchState.recentBalls.map(b => `${b.overDisplay}: ${b.runsScored}r (${b.bowlerName} to ${b.batsmanName})`).join(' | ')}

FAN QUESTION: "${question}"

GUIDELINES:
1. Answer directly and informatively in 2 to 3 concise, conversational paragraphs.
2. Ground all points in actual events that have already occurred up to Over ${matchState.oversFormatted}. Never invent future scores or speculate outside this match.
3. Keep the tone modern, passionate, and analytical.`;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return {
      text: getFallbackAnswer(question, matchState, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!res.ok) {
      return {
        text: getFallbackAnswer(question, matchState, preferences),
        isDemoFallback: true,
        provider: 'demo-fallback',
      };
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      text: text || getFallbackAnswer(question, matchState, preferences),
      isDemoFallback: !text,
      provider: text ? 'gemini-live' : 'demo-fallback',
    };
  } catch (error) {
    console.error('Error answering fan question:', error);
    return {
      text: getFallbackAnswer(question, matchState, preferences),
      isDemoFallback: true,
      provider: 'demo-fallback',
    };
  }
}

// Dynamic, strictly chronological fallback generator (never references future overs)
function getFallbackInsight(state: CurrentMatchState, prefs: UserPreferences): string {
  const currentOver = state.currentOver;
  const kohli = state.batsmenStats['ind_kohli'];
  const favPlayerName = prefs.favouritePlayer;

  let momentumText = '';
  let tacticalText = '';

  if (currentOver < 6) {
    momentumText = `India has opened at a rapid pace in the Powerplay (**${state.runs}/${state.wickets} in ${state.oversFormatted} ov**). Rohit Sharma launched an early assault against Mitchell Starc, keeping the Current Run Rate (**${state.crr}**) right in line with the target of ${state.target}.`;
    tacticalText = `Australia's pace attack is searching for swinging lengths. Pat Cummins and Josh Hazlewood are probing the corridor outside off to test the top-order discipline.`;
  } else if (currentOver < 12) {
    momentumText = `The match has entered an absorbing middle-overs phase. India is **${state.runs}/${state.wickets} in ${state.oversFormatted} ov**, requiring **${state.runsNeeded} runs from ${state.ballsRemaining} balls** (RRR: **${state.rrr}**). Adam Zampa and Glenn Maxwell have introduced spin control to restrict boundaries.`;
    tacticalText = `India's priority is rotating the strike into the large outfield pockets without taking reckless risks against the turning ball.`;
  } else if (currentOver < 16) {
    momentumText = `India is surging forward at **${state.runs}/${state.wickets} in ${state.oversFormatted} ov**! With the required rate under control at **${state.rrr}**, the batting unit has found boundaries with clean striking through cover and backward point.`;
    tacticalText = `Australia must break this partnership immediately. Mitchell Marsh is recalling his frontline seamers to deliver hard lengths and yorkers into the blockhole.`;
  } else {
    momentumText = `Death-overs thriller in progress! India needs **${state.runsNeeded} runs from ${state.ballsRemaining} balls** with ${10 - state.wickets} wickets in hand. Every delivery is high-voltage drama.`;
    tacticalText = `Fielders are right on the boundary ropes. For Australia, boundary prevention is paramount; for India, smart running between the wickets will seal the chase.`;
  }

  // Favourite player spotlight based on actual current stats
  let playerSpotlight = '';
  if (favPlayerName.toLowerCase().includes('kohli') && kohli) {
    playerSpotlight = `**Virat Kohli** is batting with composure: **${kohli.runs} runs off ${kohli.balls} balls** (${kohli.fours}x4, ${kohli.sixes}x6, SR: ${kohli.strikeRate}), anchoring the chase with clinical gap placement.`;
  } else {
    const bat = Object.values(state.batsmenStats).find(b => b.name.toLowerCase().includes(favPlayerName.toLowerCase()));
    const bowl = Object.values(state.bowlersStats).find(b => b.name.toLowerCase().includes(favPlayerName.toLowerCase()));
    if (bat && bat.balls > 0) {
      playerSpotlight = `**${favPlayerName}** has contributed **${bat.runs} runs from ${bat.balls} balls** (SR: ${bat.strikeRate}) with ${bat.fours + bat.sixes} boundary hits.`;
    } else if (bowl && bowl.overs > 0) {
      playerSpotlight = `**${favPlayerName}** has figures of **${bowl.wickets}/${bowl.runs} in ${bowl.overs} overs** (Econ: ${bowl.economy}).`;
    } else {
      playerSpotlight = `**${favPlayerName}** is set to play a pivotal role as this contest reaches its decisive climax.`;
    }
  }

  return `### ⚡ Match Momentum
${momentumText}

### 🎯 Tactical Blueprint
${tacticalText}

### 🌟 ${favPlayerName} Spotlight
${playerSpotlight}`;
}

function getFallbackCatchUpSummary(data: CatchUpData, prefs: UserPreferences): string {
  const wicketsText = data.wicketsFell > 0
    ? `**${data.wicketsFell} wicket(s)** fell during your absence: ${data.wicketsList.map(w => `${w.batsman} (${w.description})`).join(', ')}.`
    : 'No wickets were conceded — India kept their wickets intact.';

  return `### ⚡ Catch-Up Briefing (Over ${data.checkpoint.overDisplay} ➔ ${data.currentOverDisplay})
During the **${data.oversPassed} overs** you missed, India scored **+${data.runsAdded} runs** to move from **${data.checkpoint.scoreDisplay}** to **${data.currentScoreDisplay}**.

- **Wickets & Impact:** ${wicketsText}
- **Boundaries Hit:** **${data.boundaries.fours} fours** and **${data.boundaries.sixes} sixes**.
- **Run Rate Trend:** CRR shifted from **${data.runRateTrend.beforeCRR}** to **${data.runRateTrend.afterCRR}**.
- **${prefs.favouritePlayer} Check-in:** ${data.favouritePlayerImpact.join(' ')}

### 💡 Why It Matters
${data.whyItMatters}`;
}

function getFallbackAnswer(query: string, state: CurrentMatchState, prefs: UserPreferences): string {
  const q = query.toLowerCase();

  if (q.includes('momentum') || q.includes('turning point') || q.includes('why')) {
    if (state.currentOver < 4) {
      return `Early on, Rohit Sharma's quick boundary striking against Mitchell Starc gave India the initial attacking momentum, keeping the score ahead of the required rate from the very first over.`;
    } else if (state.currentOver < 10) {
      return `Australia shifted momentum back in Over 4 when Josh Hazlewood had Rohit Sharma caught at mid-on for 24. Since then, Virat Kohli and Rishabh Pant have had to rebuild steadily against tight lines.`;
    } else if (state.currentOver < 13) {
      return `Adam Zampa struck a crucial blow in Over 10 by removing Rishabh Pant on 28 with a top-edged reverse sweep, briefly slowing India down and bringing Suryakumar Yadav to the crease.`;
    } else {
      return `The pivotal turning point arrived in the **13th over** bowled by Mitchell Starc. Suryakumar Yadav and Virat Kohli took **18 runs off 6 balls**, including an audacious scoop for six and clean cover drives. That over brought the required run rate well under control and gave India commanding momentum.`;
    }
  }

  if (q.includes('last three overs') || q.includes('recent') || q.includes('what happened')) {
    const recent = state.completedOvers.slice(-3);
    if (recent.length === 0) {
      return `Only ${state.oversFormatted} overs have been completed so far. India is currently at **${state.runs}/${state.wickets}** chasing **${state.target}**.`;
    }
    const summary = recent
      .map(o => `**${o.overDisplay}** (${o.bowlerName}): ${o.totalRuns} runs, ${o.wickets} wicket(s)`)
      .join('\n- ');
    return `Here is what happened in the last ${recent.length} completed overs:\n- ${summary}\n\nThe match equation is now **${state.runsNeeded} runs required from ${state.ballsRemaining} balls** at an RRR of **${state.rrr}**.`;
  }

  if (q.includes('kohli') || q.includes('virat') || q.includes(prefs.favouritePlayer.toLowerCase())) {
    const fav = prefs.favouritePlayer;
    const k = state.batsmenStats['ind_kohli'];
    if (q.includes(fav.toLowerCase()) && fav !== 'Virat Kohli') {
      const p = Object.values(state.batsmenStats).find(b => b.name.toLowerCase().includes(fav.toLowerCase()));
      if (p) {
        return `**${fav}** has scored **${p.runs} runs off ${p.balls} balls** (${p.fours}x4, ${p.sixes}x6, Strike Rate: ${p.strikeRate}) for India.`;
      }
    }
    if (!k) return `Virat Kohli is yet to bat.`;
    return `**Virat Kohli** has been instrumental in this chase. He is currently on **${k.runs} runs off ${k.balls} balls** (${k.fours}x4, ${k.sixes}x6, Strike Rate: ${k.strikeRate}). His rotation of strike and immaculate cover drives have anchored India's innings without taking unnecessary risks.`;
  }

  if (q.includes('australia') || q.includes('win') || q.includes('how can australia')) {
    return `For Australia to defend 188, Pat Cummins and Josh Hazlewood must strike through the middle order. Taking two wickets in quick succession would expose India's lower order and force the required rate above 11 an over.`;
  }

  return `Currently in Over **${state.oversFormatted}**, India is at **${state.runs}/${state.wickets}**, needing **${state.runsNeeded} runs from ${state.ballsRemaining} balls** to reach the target of ${state.target}. ${state.striker.name} (${state.striker.runs}*) and ${state.nonStriker.name} (${state.nonStriker.runs}) are at the crease.`;
}
