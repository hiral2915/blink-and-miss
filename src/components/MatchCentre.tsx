'use client';

import React from 'react';
import { MATCHES_CATALOG } from '@/data/matches/all_matches';
import { Sparkles, Trophy, MapPin, ArrowRight } from 'lucide-react';

interface MatchCentreProps {
  onSelectMatch: (matchId: string) => void;
  activeMatchId: string;
}

export function MatchCentre({ onSelectMatch, activeMatchId }: MatchCentreProps) {
  // Only show fixtures that have their own working ball-by-ball simulation.
  // The remaining catalogue entries are placeholders and must not look playable.
  const playableMatches = MATCHES_CATALOG.filter((match) => match.hasInteractiveSim);

  return (
    <div className="mx-auto max-w-3xl space-y-5 animate-fadeIn">
      <div className="border-b border-charcoal-700/60 pb-5">
        <h2 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Match Centre
          <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase text-charcoal-950">Demo</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Choose a match to try the Catch Me Up experience.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-charcoal-700/60 bg-charcoal-850/70 p-3 text-sm text-slate-400">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
        <p>This prototype currently has one fully interactive demo match. Other fixtures are not yet connected to their own ball-by-ball data.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {playableMatches.map((match) => {
          const isSelected = match.id === activeMatchId;
          return (
            <button
              key={match.id}
              type="button"
              onClick={() => onSelectMatch(match.id)}
              className={`rounded-2xl border p-5 text-left transition hover:border-lime/60 hover:bg-charcoal-850/80 ${
                isSelected ? 'border-lime/50 bg-charcoal-850/80' : 'border-charcoal-700/60 bg-charcoal-850/50'
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-charcoal-700/50 pb-3">
                <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-200">
                  <Trophy className="h-4 w-4 shrink-0 text-lime" />
                  <span className="truncate">{match.series}</span>
                </div>
                <span className="shrink-0 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[10px] font-bold uppercase text-lime">Interactive demo</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <p className="text-lg font-bold text-white">{match.team2.name}</p>
                  <p className="mt-1 text-2xl font-black text-lime">{match.team2.score ?? 'Yet to bat'}</p>
                  {match.team2.overs && <p className="text-xs text-slate-400">{match.team2.overs} overs</p>}
                </div>
                <span className="text-xs font-bold text-slate-500">VS</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{match.team1.name}</p>
                  <p className="mt-1 text-2xl font-black text-white">{match.team1.score ?? 'Yet to bat'}</p>
                  {match.team1.overs && <p className="text-xs text-slate-400">{match.team1.overs} overs</p>}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal-700/50 pt-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400"><MapPin className="h-3.5 w-3.5" />{match.venue.split(',')[0]}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-lime">Open match <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
