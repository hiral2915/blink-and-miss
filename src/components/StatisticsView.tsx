'use client';

import React from 'react';
import { CurrentMatchState } from '@/lib/types/cricket';
import { BarChart3 } from 'lucide-react';

interface StatisticsViewProps {
  state: CurrentMatchState;
}

export function StatisticsView({ state }: StatisticsViewProps) {
  const boundaryRuns = Object.values(state.batsmenStats).reduce(
    (acc, b) => acc + b.fours * 4 + b.sixes * 6,
    0
  );
  const boundaryPct = state.runs > 0 ? Math.round((boundaryRuns / state.runs) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-panel border border-charcoal-700/60 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Current Run Rate</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-lime mt-1">{state.crr}</div>
          <span className="text-[11px] text-slate-400">Target RR: 9.45</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-charcoal-700/60 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Required Run Rate</span>
          <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${state.rrr > 11 ? 'text-rose-400' : 'text-amber-400'}`}>
            {state.rrr}
          </div>
          <span className="text-[11px] text-slate-400">{state.runsNeeded} off {state.ballsRemaining} balls</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-charcoal-700/60 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Boundary Runs %</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1">{boundaryPct}%</div>
          <span className="text-[11px] text-slate-400">{boundaryRuns} runs in boundaries</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-charcoal-700/60 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Wickets in Hand</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400 mt-1">{10 - state.wickets}</div>
          <span className="text-[11px] text-slate-400">{state.wickets} wickets down</span>
        </div>
      </div>

      {/* Over-by-Over Progression Breakdown */}
      <div className="rounded-3xl glass-panel border border-charcoal-700/70 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-lime" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Over-by-Over Chase Progression
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {state.completedOvers.length} Completed Overs
          </span>
        </div>

        {state.completedOvers.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">
            Over progression will populate after the first full over is completed.
          </p>
        ) : (
          <div className="space-y-2">
            {state.completedOvers.map((over) => {
              const isHighScoring = over.totalRuns >= 12;
              const hasWicket = over.wickets > 0;

              return (
                <div
                  key={over.overNumber}
                  className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
                    hasWicket
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : isHighScoring
                      ? 'bg-lime/10 border-lime/30'
                      : 'bg-charcoal-850/60 border-charcoal-700/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-14 font-mono font-bold text-white text-xs">
                      {over.overDisplay}
                    </span>
                    <span className="text-slate-300 font-medium">
                      {over.bowlerName}
                    </span>
                    {isHighScoring && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-lime text-charcoal-950 uppercase">
                        Big Over
                      </span>
                    )}
                    {hasWicket && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-500 text-white uppercase">
                        Wicket
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 font-mono">
                    <span className="text-slate-400 text-xs">
                      End: <strong className="text-white">{over.scoreAtEnd.runs}/{over.scoreAtEnd.wickets}</strong>
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      (CRR {over.scoreAtEnd.crr})
                    </span>
                    <span className="font-bold text-sm text-lime w-10 text-right">
                      +{over.totalRuns}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
