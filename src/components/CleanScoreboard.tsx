'use client';

import React from 'react';
import { CurrentMatchState, MatchDetails } from '@/lib/types/cricket';
import { ArrowLeft } from 'lucide-react';

interface CleanScoreboardProps {
  details: MatchDetails;
  state: CurrentMatchState;
  onBackToCentre: () => void;
}

export function CleanScoreboard({ details, state, onBackToCentre }: CleanScoreboardProps) {
  const chaseLine = state.status === 'live'
    ? `${details.secondInnings.team} need ${state.runsNeeded} runs from ${state.ballsRemaining} balls.`
    : state.statusMessage;

  return (
    <section className="rounded-2xl border border-charcoal-700/70 bg-charcoal-850/70 p-4 sm:p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button onClick={onBackToCentre} className="text-xs font-medium text-slate-400 transition hover:text-lime">
          <ArrowLeft className="mr-1 inline h-3.5 w-3.5" /> All matches
        </button>
        <span className="rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-lime">
          {details.isSimulated ? 'Demo match' : details.statusText}
        </span>
      </div>

      <p className="mb-4 text-center text-xs text-slate-400">{details.title} · {details.matchType}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-300">{details.secondInnings.team}</p>
          <p className="mt-1 text-4xl font-black tracking-tight text-lime sm:text-5xl">{state.runs}/{state.wickets}</p>
          <p className="mt-1 text-xs text-slate-400">{state.oversFormatted} overs</p>
          <span className="mt-2 inline-block rounded-full bg-lime/10 px-2 py-0.5 text-[10px] font-semibold text-lime">Batting</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-300">{details.firstInnings.team}</p>
          <p className="mt-1 text-4xl font-black tracking-tight text-white sm:text-5xl">{details.firstInnings.score}/{details.firstInnings.wickets}</p>
          <p className="mt-1 text-xs text-slate-400">{details.firstInnings.overs}.0 overs</p>
          <span className="mt-2 inline-block rounded-full bg-charcoal-700 px-2 py-0.5 text-[10px] text-slate-400">1st innings</span>
        </div>
      </div>
      <div className="mt-5 rounded-xl bg-charcoal-900/70 px-4 py-3 text-center">
        <p className="text-sm font-medium text-white">{chaseLine}</p>
        {details.isSimulated && <p className="mt-1 text-[10px] text-slate-500">Scores and events are simulated for this demo.</p>}
      </div>
    </section>
  );
}
