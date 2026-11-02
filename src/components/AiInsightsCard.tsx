'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CurrentMatchState, UserPreferences } from '@/lib/types/cricket';
import { Volume2, RefreshCw, ShieldCheck, Zap } from 'lucide-react';

interface AiInsightsCardProps {
  state: CurrentMatchState;
  preferences: UserPreferences;
  onSpeak: (text: string) => void;
  isAudioPlaying: boolean;
}

export function AiInsightsCard({
  state,
  preferences,
  onSpeak,
  isAudioPlaying,
}: AiInsightsCardProps) {
  const [loading, setLoading] = useState(false);
  const [insightText, setInsightText] = useState<string | null>(null);
  const [provider, setProvider] = useState<'gemini-live' | 'demo-fallback'>('gemini-live');
  const [lastAnalyzedOver, setLastAnalyzedOver] = useState<string>('');

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

      if (!res.ok) throw new Error('Failed to fetch insights');

      const data = await res.json();
      setInsightText(data.text);
      setProvider(data.provider);
      setLastAnalyzedOver(state.oversFormatted);

      if (preferences.autoSpeech && data.text) {
        onSpeak(data.text);
      }
    } catch (err) {
      console.error('Insights fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [state, preferences, onSpeak]);

  // Refresh when an over completes
  useEffect(() => {
    fetchInsights();
  }, [state.currentOver, fetchInsights]);

  return (
    <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-700/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Zap className="w-4 h-4 text-lime" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Gemini AI Match Insights
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-slate-300">
                Ov {lastAnalyzedOver || state.oversFormatted}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Momentum detection, turning points & tactical analysis for {preferences.favouritePlayer}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 border border-charcoal-700 transition-all disabled:opacity-50"
            title="Refresh Insights"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-lime' : ''}`} />
          </button>

          {/* Listen button */}
          <button
            onClick={() => insightText && onSpeak(insightText)}
            disabled={!insightText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-lime/15 hover:bg-lime/25 text-lime border border-lime/30 transition-all active:scale-95 glow-lime-subtle"
            title="Listen to match insights"
          >
            <Volume2 className="w-3.5 h-3.5 text-lime" />
            <span className="hidden sm:inline">{isAudioPlaying ? 'Playing' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* Provider badge note */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-lime" />
          Verified match facts • No hallucinated scores
        </span>
        <span
          className={`px-2 py-0.5 rounded ${
            provider === 'gemini-live'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
          }`}
        >
          {provider === 'gemini-live' ? '⚡ Gemini 2.5 Flash' : 'AI Demo Fallback'}
        </span>
      </div>

      {/* Insights Content */}
      {loading && !insightText ? (
        <div className="p-8 text-center space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-lime mx-auto" />
          <p className="text-xs text-slate-400">Analyzing current field placements, run rates and momentum...</p>
        </div>
      ) : (
        <div className="prose prose-invert prose-xs max-w-none text-slate-200 leading-relaxed text-xs sm:text-sm bg-charcoal-850/50 p-4 rounded-xl border border-charcoal-700/50 space-y-2">
          {insightText ? (
            <div
              dangerouslySetInnerHTML={{
                __html: insightText
                  .replace(/^### (.*$)/gim, '<h4 class="text-lime font-bold text-sm mt-3 mb-1.5 flex items-center gap-1.5">$1</h4>')
                  .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-bold">$1</strong>')
                  .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300 my-0.5">$1</li>'),
              }}
            />
          ) : (
            <p className="text-slate-400 italic">Click refresh to generate AI insights.</p>
          )}
        </div>
      )}
    </div>
  );
}
