'use client';

import React from 'react';
import { BatsmanInnings, BowlerSpell } from '@/lib/types/cricket';
import { Star, Zap } from 'lucide-react';

interface CreaseStatusProps {
  striker: BatsmanInnings;
  nonStriker: BatsmanInnings;
  currentBowler: BowlerSpell;
  favouritePlayer: string;
}

export function CreaseStatus({
  striker,
  nonStriker,
  currentBowler,
  favouritePlayer,
}: CreaseStatusProps) {
  const isFav = (name: string) => name.toLowerCase().includes(favouritePlayer.toLowerCase());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Batters at crease */}
      <div className="lg:col-span-2 rounded-2xl glass-panel border border-charcoal-700/80 p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-2.5 mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-lime" />
            Batters at Crease
          </span>
          <span className="text-[11px] font-mono text-slate-400">R (B) • 4s • 6s • SR</span>
        </div>

        <div className="space-y-3">
          {/* Striker */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              isFav(striker.name)
                ? 'bg-lime/10 border-lime/40 shadow-sm glow-lime-subtle'
                : 'bg-charcoal-850/60 border-charcoal-700/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-lime animate-pulse" title="On Strike" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-sm sm:text-base">
                    {striker.name}
                  </span>
                  <span className="text-lime font-bold text-xs">*</span>
                  {isFav(striker.name) && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded bg-lime text-charcoal-950">
                      <Star className="w-2.5 h-2.5 fill-charcoal-950" />
                      Fav
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Striker</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-sm sm:text-base font-extrabold text-white">
                <span className="text-lime">{striker.runs}</span>
                <span className="text-slate-400 text-xs ml-1 font-normal">({striker.balls})</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {striker.fours}x4 • {striker.sixes}x6 • SR {striker.strikeRate}
              </div>
            </div>
          </div>

          {/* Non-striker */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              isFav(nonStriker.name)
                ? 'bg-lime/10 border-lime/40 shadow-sm glow-lime-subtle'
                : 'bg-charcoal-850/60 border-charcoal-700/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-slate-600 ml-0.5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-200 text-sm sm:text-base">
                    {nonStriker.name}
                  </span>
                  {isFav(nonStriker.name) && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded bg-lime text-charcoal-950">
                      <Star className="w-2.5 h-2.5 fill-charcoal-950" />
                      Fav
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Non-striker</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-sm sm:text-base font-extrabold text-slate-200">
                <span>{nonStriker.runs}</span>
                <span className="text-slate-400 text-xs ml-1 font-normal">({nonStriker.balls})</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {nonStriker.fours}x4 • {nonStriker.sixes}x6 • SR {nonStriker.strikeRate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Bowler */}
      <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-2.5 mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Current Bowler
          </span>
          <span className="text-[11px] font-mono text-slate-400">O • M • R • W</span>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isFav(currentBowler.name)
              ? 'bg-lime/10 border-lime/40'
              : 'bg-charcoal-850/60 border-charcoal-700/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base">
                  {currentBowler.name}
                </span>
                {isFav(currentBowler.name) && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded bg-lime text-charcoal-950">
                    <Star className="w-2.5 h-2.5 fill-charcoal-950" />
                    Fav
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Fast / Pace</span>
            </div>

            <div className="text-right font-mono">
              <span className="text-lg font-black text-amber-400">
                {currentBowler.wickets}
              </span>
              <span className="text-slate-400 text-sm">/{currentBowler.runs}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-charcoal-700/40 text-center font-mono text-xs">
            <div className="bg-charcoal-800/80 py-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-sans">OVERS</span>
              <strong className="text-slate-200">{currentBowler.overs}</strong>
            </div>
            <div className="bg-charcoal-800/80 py-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-sans">MAIDENS</span>
              <strong className="text-slate-200">{currentBowler.maidens}</strong>
            </div>
            <div className="bg-charcoal-800/80 py-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-sans">ECON</span>
              <strong className="text-lime">{currentBowler.economy}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
