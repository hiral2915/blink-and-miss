'use client';

import React, { useState } from 'react';
import { BallEvent, UserPreferences } from '@/lib/types/cricket';
import { Star, Flame, Trophy, Volume2 } from 'lucide-react';

interface CommentaryFeedProps {
  balls: BallEvent[];
  preferences: UserPreferences;
  onSpeak: (text: string) => void;
}

export function CommentaryFeed({
  balls,
  preferences,
  onSpeak,
}: CommentaryFeedProps) {
  const [filter, setFilter] = useState<'all' | 'wickets' | 'boundaries' | 'fav'>('all');

  // Reverse so newest balls appear at the top
  const reversed = [...balls].reverse();

  const filteredBalls = reversed.filter((b) => {
    if (filter === 'wickets') return b.isWicket;
    if (filter === 'boundaries') return b.isBoundary || b.isSix;
    if (filter === 'fav') {
      return (
        b.batsmanName.toLowerCase().includes(preferences.favouritePlayer.toLowerCase()) ||
        b.bowlerName.toLowerCase().includes(preferences.favouritePlayer.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-5 sm:p-6 shadow-xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-700/60 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Ball-by-Ball Commentary Stream
          </h3>
          <span className="text-xs font-mono text-slate-400">({balls.length} balls bowled)</span>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-lime text-charcoal-950 font-bold'
                : 'bg-charcoal-850 text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('wickets')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'wickets'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-charcoal-850 text-slate-400 hover:text-white'
            }`}
          >
            Wickets
          </button>
          <button
            onClick={() => setFilter('boundaries')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'boundaries'
                ? 'bg-emerald-500 text-charcoal-950 font-bold'
                : 'bg-charcoal-850 text-slate-400 hover:text-white'
            }`}
          >
            Boundaries
          </button>
          <button
            onClick={() => setFilter('fav')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
              filter === 'fav'
                ? 'bg-lime text-charcoal-950 font-bold'
                : 'bg-charcoal-850 text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3 h-3" />
            <span className="hidden sm:inline">{preferences.favouritePlayer.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
        {filteredBalls.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs italic">
            No deliveries match this filter yet.
          </div>
        ) : (
          filteredBalls.map((ball) => {
            const isFav =
              ball.batsmanName.toLowerCase().includes(preferences.favouritePlayer.toLowerCase()) ||
              ball.bowlerName.toLowerCase().includes(preferences.favouritePlayer.toLowerCase());

            return (
              <div
                key={ball.id}
                className={`p-3 rounded-xl border transition-all text-xs ${
                  ball.isWicket
                    ? 'bg-rose-950/20 border-rose-500/40 text-slate-100'
                    : ball.significance === 'turning_point'
                    ? 'bg-lime/10 border-lime/40 text-slate-100'
                    : isFav
                    ? 'bg-charcoal-800/90 border-lime/20 text-slate-200'
                    : 'bg-charcoal-850/60 border-charcoal-700/50 text-slate-300'
                }`}
              >
                {/* Top line of ball card */}
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lime text-xs">
                      {ball.overDisplay}
                    </span>
                    <span className="text-slate-300 font-semibold font-sans">
                      {ball.bowlerName} to {ball.batsmanName}
                    </span>
                    {isFav && (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-lime/20 text-lime text-[10px] font-sans font-bold">
                        ★ Fav
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {ball.speedKph && (
                      <span className="text-[10px] text-slate-400">
                        {ball.speedKph} km/h
                      </span>
                    )}
                    <button
                      onClick={() => onSpeak(`${ball.overDisplay}. ${ball.bowlerName} to ${ball.batsmanName}. ${ball.commentary}`)}
                      className="text-slate-400 hover:text-lime p-0.5 transition-colors"
                      title="Read commentary aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-black ${
                        ball.isWicket
                          ? 'bg-rose-500 text-white shadow-sm'
                          : ball.isSix
                          ? 'bg-lime text-charcoal-950 shadow-sm'
                          : ball.isBoundary
                          ? 'bg-emerald-500 text-charcoal-950 shadow-sm'
                          : ball.runsScored === 0
                          ? 'bg-charcoal-800 text-slate-400'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {ball.isWicket ? 'W' : `${ball.runsScored}r`}
                    </span>
                  </div>
                </div>

                {/* Milestone badge */}
                {ball.milestoneDescription && (
                  <div className="mb-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    {ball.milestoneDescription}
                  </div>
                )}

                {/* Turning point badge */}
                {ball.significance === 'turning_point' && (
                  <div className="mb-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-lime/20 text-lime border border-lime/40 text-[10px] font-bold uppercase tracking-wider">
                    <Flame className="w-3 h-3 text-lime" />
                    Crucial Turning Point
                  </div>
                )}

                {/* Commentary text */}
                <p className="leading-relaxed font-sans text-slate-200">
                  {ball.commentary}
                </p>

                {/* Wicket details */}
                {ball.wicketDetail && (
                  <div className="mt-1.5 font-mono text-[11px] text-rose-300 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                    {ball.wicketDetail.description}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
