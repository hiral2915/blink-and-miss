'use client';

import React from 'react';
import { BatsmanInnings, BowlerSpell } from '@/lib/types/cricket';
import { Star, Zap } from 'lucide-react';

interface FanSpotlightProps {
  favouritePlayer: string;
  batsmenStats: Record<string, BatsmanInnings>;
  bowlersStats: Record<string, BowlerSpell>;
  striker: BatsmanInnings;
  nonStriker: BatsmanInnings;
  currentBowler: BowlerSpell;
  partnership: {
    runs: number;
    balls: number;
    batters: [string, string];
  };
}

export function FanSpotlight({
  favouritePlayer,
  batsmenStats,
  bowlersStats,
  striker,
  nonStriker,
  currentBowler,
  partnership,
}: FanSpotlightProps) {
  // Find favourite player data
  const favBat = Object.values(batsmenStats).find((b) =>
    b.name.toLowerCase().includes(favouritePlayer.toLowerCase())
  );
  const favBowl = Object.values(bowlersStats).find((b) =>
    b.name.toLowerCase().includes(favouritePlayer.toLowerCase())
  );

  const isFavAtCrease =
    striker.name.toLowerCase().includes(favouritePlayer.toLowerCase()) ||
    nonStriker.name.toLowerCase().includes(favouritePlayer.toLowerCase());

  return (
    <div className="space-y-5">
      {/* 1. Favourite Player Spotlight */}
      <div className="rounded-3xl glass-panel border border-lime/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-charcoal-700/50 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime">
            <Star className="w-4 h-4 fill-lime" />
            <span>Favourite Player Spotlight</span>
          </div>
          {isFavAtCrease && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-lime text-charcoal-950 uppercase">
              At Crease
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {favouritePlayer}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {favBat ? (favBat.isOut ? `Dismissed (${favBat.dismissalInfo})` : 'Batting • Key Anchor') : 'Bowler'}
            </p>
          </div>

          {favBat && (
            <div className="text-right font-mono">
              <div className="text-2xl sm:text-3xl font-black text-lime">
                {favBat.runs}
                <span className="text-sm font-normal text-slate-400 ml-1">({favBat.balls}b)</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {favBat.fours}x4 • {favBat.sixes}x6 • SR {favBat.strikeRate}
              </div>
            </div>
          )}

          {favBowl && !favBat && (
            <div className="text-right font-mono">
              <div className="text-2xl font-black text-amber-400">
                {favBowl.wickets}/{favBowl.runs}
              </div>
              <div className="text-[11px] text-slate-400">
                {favBowl.overs} ov • Econ {favBowl.economy}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Active Crease & Bowler Snapshot */}
      <div className="rounded-3xl glass-panel border border-charcoal-700/70 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-700/50 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-lime" />
            At the Crease
          </span>
          <span className="text-xs font-mono text-slate-400">
            Stand: <strong className="text-white">{partnership.runs}</strong> runs ({partnership.balls}b)
          </span>
        </div>

        {/* Striker & Non-striker list */}
        <div className="space-y-2.5">
          {/* Striker */}
          <div className="p-3.5 rounded-2xl bg-charcoal-850/80 border border-charcoal-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" title="On Strike" />
              <div>
                <span className="font-bold text-white text-sm sm:text-base">
                  {striker.name}
                  <span className="text-lime font-bold ml-1">*</span>
                </span>
                <span className="text-[11px] text-slate-400 block">Striker</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-base font-extrabold text-lime">{striker.runs}</span>
              <span className="text-xs text-slate-400 ml-1 font-normal">({striker.balls})</span>
              <div className="text-[10px] text-slate-400">
                {striker.fours}x4 • {striker.sixes}x6 • SR {striker.strikeRate}
              </div>
            </div>
          </div>

          {/* Non-striker */}
          <div className="p-3.5 rounded-2xl bg-charcoal-850/80 border border-charcoal-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 ml-0.5" />
              <div>
                <span className="font-bold text-slate-200 text-sm sm:text-base">
                  {nonStriker.name}
                </span>
                <span className="text-[11px] text-slate-400 block">Non-striker</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-base font-extrabold text-slate-200">{nonStriker.runs}</span>
              <span className="text-xs text-slate-400 ml-1 font-normal">({nonStriker.balls})</span>
              <div className="text-[10px] text-slate-400">
                {nonStriker.fours}x4 • {nonStriker.sixes}x6 • SR {nonStriker.strikeRate}
              </div>
            </div>
          </div>
        </div>

        {/* Current Bowler Strip */}
        <div className="pt-2 border-t border-charcoal-700/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-slate-400 font-sans">Bowling:</span>
            <span className="font-bold text-white">{currentBowler.name}</span>
          </div>

          <div className="font-mono text-slate-300">
            <strong className="text-amber-400">{currentBowler.wickets}/{currentBowler.runs}</strong>
            <span className="text-slate-500 mx-1">•</span>
            <span>{currentBowler.overs} ov</span>
            <span className="text-slate-500 mx-1">•</span>
            <span>Econ {currentBowler.economy}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
