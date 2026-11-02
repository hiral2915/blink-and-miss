'use client';

import React from 'react';
import { CurrentMatchState, MatchDetails } from '@/lib/types/cricket';
import { Trophy, TrendingUp } from 'lucide-react';

interface MatchHeroProps {
  matchDetails: MatchDetails;
  state: CurrentMatchState;
}

export function MatchHero({ matchDetails, state }: MatchHeroProps) {
  const indWinProb = Math.min(100, Math.max(0, state.winProbabilityIndia));
  const ausWinProb = 100 - indWinProb;

  const isCompleted = state.status === 'india_won' || state.status === 'australia_won' || state.status === 'tied';

  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel border border-charcoal-700/80 p-5 sm:p-6 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top series & venue bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-700/60 pb-3 mb-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Trophy className="w-3.5 h-3.5 text-lime" />
          <span className="font-semibold text-slate-200">{matchDetails.series}</span>
          <span className="text-slate-600">•</span>
          <span className="truncate">{matchDetails.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span>Target: <strong className="text-white">{matchDetails.target}</strong></span>
          <span className="text-slate-600">•</span>
          <span>Max: <strong>20.0 Ov</strong></span>
        </div>
      </div>

      {/* Score Grid: AUS vs IND */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Australia 1st Innings */}
        <div className="md:col-span-5 flex items-center justify-between md:justify-start gap-4 p-3.5 rounded-xl bg-charcoal-850/60 border border-charcoal-700/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center font-bold text-yellow-400 text-sm shadow-inner">
              AUS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">Australia</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-charcoal-700 text-slate-400">
                  1st Inn
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[210px]">
                Head 76 (43), Marsh 37 (28)
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-100">
              {matchDetails.firstInnings.score}/{matchDetails.firstInnings.wickets}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {matchDetails.firstInnings.overs}.0 ov (RR: {matchDetails.firstInnings.runRate})
            </div>
          </div>
        </div>

        {/* VS / Match equation separator */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-charcoal-850 px-2 py-1 rounded-full border border-charcoal-700">
            VS
          </span>
          {!isCompleted && (
            <span className="text-[11px] font-mono font-medium text-lime mt-1 text-center">
              Need {state.runsNeeded} off {state.ballsRemaining}b
            </span>
          )}
        </div>

        {/* India 2nd Innings (Live Chase) */}
        <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-4 p-3.5 rounded-xl bg-gradient-to-r from-charcoal-850/80 to-charcoal-800/90 border border-lime/30 shadow-lg glow-lime-subtle">
          <div className="flex items-center gap-3 order-1 md:order-2">
            <div className="text-left md:text-right">
              <div className="flex items-center md:justify-end gap-2">
                <span className="font-bold text-white text-base">India</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Chasing
                </span>
              </div>
              <p className="text-xs text-lime truncate max-w-[210px]">
                {state.striker.name} {state.striker.runs}* • {state.nonStriker.name} {state.nonStriker.runs}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-sm shadow-inner">
              IND
            </div>
          </div>

          <div className="text-right md:text-left order-2 md:order-1">
            <div className="font-mono text-2xl sm:text-3xl font-black text-lime flex items-baseline gap-1">
              <span>{state.runs}</span>
              <span className="text-slate-400 text-lg">/{state.wickets}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-300">
              Overs <strong className="text-white">{state.oversFormatted}</strong> / 20.0
            </div>
          </div>
        </div>
      </div>

      {/* Metrics strip: CRR, RRR, Status */}
      <div className="mt-5 pt-4 border-t border-charcoal-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-charcoal-850/40 border border-charcoal-700/30">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Current RR</span>
          <span className="font-mono text-lg font-bold text-white">{state.crr}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-charcoal-850/40 border border-charcoal-700/30">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Required RR</span>
          <span className={`font-mono text-lg font-bold ${state.rrr > 12 ? 'text-rose-400' : state.rrr > 9 ? 'text-amber-400' : 'text-lime'}`}>
            {state.rrr}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-charcoal-850/40 border border-charcoal-700/30">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Runs Needed</span>
          <span className="font-mono text-lg font-bold text-lime">{state.runsNeeded}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-charcoal-850/40 border border-charcoal-700/30">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Balls Left</span>
          <span className="font-mono text-lg font-bold text-white">{state.ballsRemaining}</span>
        </div>
      </div>

      {/* Live Win Probability Bar */}
      <div className="mt-4 pt-3">
        <div className="flex items-center justify-between text-xs font-mono font-semibold mb-1.5">
          <span className="text-blue-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            India Win {indWinProb}%
          </span>
          <span className="text-yellow-400 flex items-center gap-1.5">
            Australia Win {ausWinProb}%
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
          </span>
        </div>
        <div className="w-full h-2.5 bg-charcoal-800 rounded-full overflow-hidden flex border border-charcoal-700/60 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-lime rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${indWinProb}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full transition-all duration-500 ease-out ml-0.5 shadow-sm"
            style={{ width: `${ausWinProb}%` }}
          />
        </div>
      </div>

      {/* Status banner */}
      <div className="mt-4 p-2.5 rounded-xl bg-charcoal-800/70 border border-charcoal-700/50 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-lime shrink-0" />
          <span className="text-slate-300 font-medium">
            {state.statusMessage}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 shrink-0">
          DLS Par: <span className="text-slate-200 font-bold">128</span>
        </div>
      </div>
    </div>
  );
}
