'use client';

import React from 'react';
import { CurrentMatchState, MatchDetails } from '@/lib/types/cricket';

interface ScorecardViewProps {
  state: CurrentMatchState;
  details: MatchDetails;
}

export function ScorecardView({ state, details }: ScorecardViewProps) {
  const batsmenList = Object.values(state.batsmenStats);
  const bowlersList = Object.values(state.bowlersStats);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. India Batting Scorecard */}
      <div className="rounded-3xl glass-panel border border-charcoal-700/70 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>India Innings</span>
              <span className="text-xs font-mono font-bold text-lime">
                {state.runs}/{state.wickets} ({state.oversFormatted} ov)
              </span>
            </h3>
            <span className="text-xs text-slate-400">Target: {details.target}</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            CRR: <strong className="text-white">{state.crr}</strong>
          </span>
        </div>

        {/* Batting Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-charcoal-700/50 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Batter</th>
                <th className="py-2.5 px-3">Dismissal</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">B</th>
                <th className="py-2.5 px-3 text-right">4s</th>
                <th className="py-2.5 px-3 text-right">6s</th>
                <th className="py-2.5 px-3 text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700/30 font-sans">
              {batsmenList.map((b) => {
                const hasBatted = b.balls > 0 || b.isOut;
                if (!hasBatted) return null;

                return (
                  <tr key={b.playerId} className="hover:bg-charcoal-850/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                      <span>{b.name}</span>
                      {b.isOnStrike && <span className="text-lime font-bold">*</span>}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-400">
                      {b.isOut ? (
                        <span className="text-rose-300 font-mono">{b.dismissalInfo}</span>
                      ) : (
                        <span className="text-lime font-semibold">not out</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-black text-white">
                      {b.runs}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {b.balls}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {b.fours}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {b.sixes}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-200">
                      {b.strikeRate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Australia Bowling Spell */}
      <div className="rounded-3xl glass-panel border border-charcoal-700/70 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white">
            Australia Bowling
          </h3>
          <span className="text-xs text-slate-400">Total Overs: 20.0</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-charcoal-700/50 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Bowler</th>
                <th className="py-2.5 px-3 text-right">O</th>
                <th className="py-2.5 px-3 text-right">M</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">Econ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700/30 font-sans">
              {bowlersList.map((bowl) => {
                if (bowl.overs === 0 && bowl.runs === 0) return null;

                return (
                  <tr key={bowl.playerId} className="hover:bg-charcoal-850/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">
                      {bowl.name}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-200">
                      {bowl.overs}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {bowl.maidens}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-200">
                      {bowl.runs}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-black text-amber-400">
                      {bowl.wickets}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-lime">
                      {bowl.economy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Australia 1st Innings Recap */}
      <div className="rounded-3xl glass-panel border border-charcoal-700/60 p-5 sm:p-6 text-xs sm:text-sm text-slate-300 space-y-2">
        <div className="flex items-center justify-between border-b border-charcoal-700/40 pb-2.5 font-bold text-white">
          <span>Australia 1st Innings Score</span>
          <span className="font-mono text-lime font-black">
            {details.firstInnings.score}/{details.firstInnings.wickets} (20.0 ov)
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed font-sans pt-1">
          {details.firstInnings.topPerformers}
        </p>
      </div>
    </div>
  );
}
