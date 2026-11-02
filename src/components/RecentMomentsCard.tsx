'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CurrentMatchState, UserPreferences } from '@/lib/types/cricket';
import { Flame, Trophy, Volume2, RefreshCw, ShieldCheck } from 'lucide-react';

interface RecentMomentsCardProps {
  state: CurrentMatchState;
  preferences: UserPreferences;
  onSpeak: (text: string) => void;
  isAudioPlaying: boolean;
}

export function RecentMomentsCard({
  state,
  preferences,
  onSpeak,
  isAudioPlaying,
}: RecentMomentsCardProps) {
  const [loading, setLoading] = useState(false);
  const [insightText, setInsightText] = useState<string | null>(null);
  const [provider, setProvider] = useState<'gemini-live' | 'demo-fallback'>('gemini-live');

  // Filter turning points that have actually occurred up to this ball index
  const pastTurningPoints = state.allBallsBowled.filter(
    (b) => b.isWicket || b.significance === 'turning_point' || b.milestoneDescription
  ).slice(-4);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchState: state,
          preferences,
        }),
      });

      if (!res.ok) throw new Error('Insights fetch failed');

      const data = await res.json();
      setInsightText(data.text);
      setProvider(data.provider);
    } catch (err) {
      console.error('Insights error:', err);
    } finally {
      setLoading(false);
    }
  }, [state, preferences]);

  // Fetch initial insights on mount
  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <div className="rounded-3xl glass-panel border border-charcoal-700/70 p-5 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal-700/50 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-lime" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Important Match Moments
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 hover:text-white border border-charcoal-700 transition-all disabled:opacity-50"
            title="Refresh AI Analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-lime' : ''}`} />
          </button>

          {insightText && (
            <button
              onClick={() => onSpeak(insightText)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-lime/15 hover:bg-lime/25 text-lime border border-lime/30 transition-all"
              title="Listen to analysis"
            >
              <Volume2 className="w-3.5 h-3.5 text-lime" />
              <span>{isAudioPlaying ? 'Playing' : 'Listen'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Recent Key Event Chips (Chronological, no future spoilers) */}
      <div className="space-y-2.5">
        {pastTurningPoints.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            Opening overs in progress. Major turning points and milestones will appear here as play advances.
          </p>
        ) : (
          pastTurningPoints.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                b.isWicket
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  : b.milestoneDescription
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-lime/10 border-lime/30 text-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-charcoal-900/60 px-2 py-0.5 rounded">
                    Ov {b.overDisplay}
                  </span>
                  {b.isWicket && (
                    <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider">
                      Wicket Fallen
                    </span>
                  )}
                  {b.milestoneDescription && (
                    <span className="font-bold text-amber-400 text-[10px] flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Milestone
                    </span>
                  )}
                  {b.significance === 'turning_point' && !b.isWicket && (
                    <span className="font-bold text-lime text-[10px] uppercase tracking-wider">
                      Turning Point
                    </span>
                  )}
                </div>
                <p className="text-slate-200 font-sans leading-relaxed">
                  {b.commentary}
                </p>
              </div>

              <span className="font-mono font-bold text-xs bg-charcoal-900 px-2 py-1 rounded shrink-0">
                {b.isWicket ? 'WKT' : `+${b.runsScored}r`}
              </span>
            </div>
          ))
        )}
      </div>

      {/* AI Tactical Snapshot Box */}
      <div className="p-4 rounded-2xl bg-charcoal-850/70 border border-charcoal-700/50 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-charcoal-700/40 pb-2">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-lime" />
            AI Match Context (Ov {state.oversFormatted})
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            {provider === 'gemini-live' ? '⚡ Gemini Live' : 'Verified Fallback'}
          </span>
        </div>

        {loading ? (
          <div className="py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-lime" />
            <span>Updating tactical situation...</span>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-2">
            {insightText ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: insightText
                    .replace(/^### (.*$)/gim, '<h5 class="text-lime font-bold text-xs mt-2 mb-0.5">$1</h5>')
                    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-bold">$1</strong>'),
                }}
              />
            ) : (
              <p className="italic text-slate-400">Click refresh to load tactical commentary.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
