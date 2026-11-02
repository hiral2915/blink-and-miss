'use client';

import React, { useState } from 'react';
import { MatchCheckpoint, CatchUpData, UserPreferences, CurrentMatchState } from '@/lib/types/cricket';
import { calculateMissedEvents } from '@/lib/match-engine/engine';
import {
  Bookmark,
  CheckCircle2,
  Loader2,
  Sparkles,
  Volume2,
  Play,
  Eye,
} from 'lucide-react';

interface CatchMeUpCardProps {
  checkpoint: MatchCheckpoint | null;
  currentState: CurrentMatchState;
  preferences: UserPreferences;
  onSpeak: (text: string) => void;
  isAudioPlaying: boolean;
  onSaveNewCheckpoint: () => void;
  onSimulateWhileAway: () => void;
  isDemoMatch: boolean;
}

/** Four states:
 *  1. no-checkpoint     → "I'm stepping away" button
 *  2. away-no-progress  → saved, waiting for match to progress + demo simulator
 *  3. returned          → "Welcome back" + "Catch Me Up" button
 *  4. recap-shown       → recap displayed + "I'm watching now" button
 */
export function CatchMeUpCard({
  checkpoint,
  currentState,
  preferences,
  onSpeak,
  isAudioPlaying,
  onSaveNewCheckpoint,
  onSimulateWhileAway,
  isDemoMatch,
}: CatchMeUpCardProps) {
  const [loading, setLoading] = useState(false);
  const [catchUpResult, setCatchUpResult] = useState<CatchUpData | null>(null);
  const [aiText, setAiText] = useState('');
  const [provider, setProvider] = useState<'gemini-live' | 'demo-fallback' | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const missedBalls = checkpoint
    ? Math.max(0, currentState.currentBallIndex - checkpoint.ballIndex)
    : 0;
  const hasMissed = Boolean(checkpoint && missedBalls > 0);
  const missedOversDisplay = `${Math.floor(missedBalls / 6)}.${missedBalls % 6}`;
  const isMatchFinished = currentState.currentBallIndex >= 120 || currentState.status !== 'live';

  // ── State 1: No checkpoint ─────────────────────────────────────────────────
  if (!checkpoint) {
    return (
      <CardShell>
        <CardTitle />
        <div className="rounded-xl bg-charcoal-900/70 p-4 sm:p-5">
          <p className="font-semibold text-white">Before you step away</p>
          <p className="mt-1 text-sm text-slate-400">
            Save your place in the match now. When you come back, we&apos;ll recap everything you missed.
          </p>
          <button
            onClick={onSaveNewCheckpoint}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-lime px-4 py-2.5 text-sm font-bold text-charcoal-950 transition hover:bg-lime-400 active:scale-95"
          >
            <Bookmark className="h-4 w-4" /> I&apos;m stepping away
          </button>
        </div>
      </CardShell>
    );
  }

  // ── State 2: Checkpoint saved, match hasn't moved yet ─────────────────────
  if (checkpoint && !hasMissed && !catchUpResult) {
    return (
      <CardShell>
        <CardTitle />
        <div className="rounded-xl bg-charcoal-900/70 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
            <div className="flex-1">
              <p className="font-semibold text-white">Place saved — enjoy your break!</p>
              <p className="mt-1 text-sm text-slate-400">
                Saved at <span className="font-semibold text-white">{checkpoint.overDisplay}</span> overs &nbsp;
                (<span className="font-mono text-lime">{checkpoint.scoreDisplay}</span>).
                When the match moves on, your recap will appear here.
              </p>

              {isDemoMatch && (
                <div className="mt-4 rounded-lg border border-charcoal-700 bg-charcoal-850 p-3">
                  <p className="text-xs font-semibold text-slate-200">Trying the demo?</p>
                  <p className="mt-1 text-xs text-slate-400">
                    This match doesn&apos;t update on its own. Click below to simulate 2 overs of play, then hit{' '}
                    <strong className="text-white">Catch Me Up</strong>.
                  </p>
                  <button
                    onClick={onSimulateWhileAway}
                    disabled={isMatchFinished}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-lime px-4 py-2.5 text-sm font-bold text-charcoal-950 transition hover:bg-lime-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Play className="h-4 w-4" /> Simulate 2 overs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardShell>
    );
  }

  // ── State 3 + 4: Match moved — "Welcome back" and/or recap ────────────────
  const handleCatchUp = async () => {
    if (!checkpoint || !hasMissed || loading) return;
    setLoading(true);
    setCatchUpResult(null);
    setAiText('');
    // setError(null);

    const data = calculateMissedEvents(
      checkpoint,
      currentState.currentBallIndex,
      preferences.favouritePlayer,
      // preferences.favouriteTeam
    );
    setCatchUpResult(data);

    // Try Gemini with one retry for 503/network errors
    let attempts = 0;
    const maxAttempts = 2;
    while (attempts < maxAttempts) {
      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            matchState: currentState,
            preferences: { ...preferences, summaryStyle: 'concise' },
            catchUpData: data,
          }),
        });

        if (response.status === 503 && attempts < maxAttempts - 1) {
          // Transient error — wait 1 s then retry
          await new Promise((r) => setTimeout(r, 1000));
          attempts++;
          continue;
        }

        if (!response.ok) {
          throw new Error(`Recap service responded with ${response.status}`);
        }

        const result = await response.json();
        const text = typeof result.text === 'string' ? result.text : '';
        if (!text) throw new Error('Empty response from recap service');

        setAiText(text);
        setProvider(result.provider === 'gemini-live' ? 'gemini-live' : 'demo-fallback');
        if (preferences.autoSpeech) onSpeak(text);
        break;
      } catch (err) {
        attempts++;
        if (attempts >= maxAttempts) {
          console.error('Catch Me Up failed, using local fallback:', err);
          const fallback = buildLocalRecap(data, preferences.favouritePlayer);
          setAiText(fallback);
          setProvider('demo-fallback');
          if (preferences.autoSpeech) onSpeak(fallback);
        }
      }
    }

    setLoading(false);
  };

  // "I'm watching now" — save new checkpoint and let parent reset the card
  const handleImWatchingNow = () => {
    onSaveNewCheckpoint();
    // Parent increments catchUpKey → this component remounts → state resets
  };

  const displaySummary = (aiText || catchUpResult?.momentumNarrative || '')
    .replace(/^#{1,4}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^-\s+/gm, '• ');

  const spokenSummary = aiText || catchUpResult?.momentumNarrative || '';
  const keyMoments = catchUpResult?.turningPoints.slice(0, 3) ?? [];

  return (
    <CardShell>
      <CardTitle />
      <div className="space-y-4 rounded-xl bg-charcoal-900/70 p-4 sm:p-5">
        {/* Welcome back banner */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-semibold text-white">Welcome back! 👋</p>
            <p className="mt-1 text-sm text-slate-400">
              The match moved on while you were away — you missed{' '}
              <span className="font-semibold text-white">{missedOversDisplay} overs</span> ({missedBalls} deliveries).
            </p>
          </div>
          <span className="rounded-full bg-lime/10 px-3 py-1 text-xs font-mono font-medium text-lime">
            {checkpoint.overDisplay} → {currentState.oversFormatted}
          </span>
        </div>

        {/* Demo sim shortcut (only while recap not yet shown) */}
        {isDemoMatch && !catchUpResult && !loading && (
          <div className="rounded-lg border border-charcoal-700 bg-charcoal-850 p-3">
            <p className="text-xs text-slate-400">
              Want to see even more? Simulate another 2 overs before catching up.
            </p>
            <button
              onClick={onSimulateWhileAway}
              disabled={isMatchFinished}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-charcoal-600 bg-charcoal-800 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:text-white active:scale-95 disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5" /> Simulate 2 more overs
            </button>
          </div>
        )}

        {/* Catch Me Up button */}
        {!catchUpResult && (
          <button
            onClick={handleCatchUp}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime px-4 py-3 text-sm font-bold text-charcoal-950 transition hover:bg-lime-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Preparing your recap…' : 'Catch Me Up'}
          </button>
        )}

        {/* Recap */}
        {catchUpResult && (
          <div className="space-y-4">
            {/* Score delta summary */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-bold text-lime">+{catchUpResult.runsAdded} runs</span>
              <span className="text-slate-300">
                {catchUpResult.wicketsFell} wicket{catchUpResult.wicketsFell !== 1 ? 's' : ''}
              </span>
              <span className="text-slate-400">
                {catchUpResult.boundaries.fours} fours · {catchUpResult.boundaries.sixes} sixes
              </span>
            </div>

            {/* Key moments */}
            {keyMoments.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Key moments you missed
                </p>
                {keyMoments.map((moment) => (
                  <div
                    key={moment.id}
                    className={`rounded-lg border px-3 py-2.5 ${
                      moment.isWicket
                        ? 'border-rose-500/30 bg-rose-950/20'
                        : 'border-charcoal-700 bg-charcoal-850'
                    }`}
                  >
                    <p className="text-[11px] font-semibold text-lime">Over {moment.overDisplay}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-200">{moment.commentary}</p>
                  </div>
                ))}
              </div>
            )}

            {keyMoments.length === 0 && catchUpResult.wicketsFell === 0 && (
              <p className="text-sm text-slate-400">
                No wickets or major turning points — the match continued with steady scoring.
              </p>
            )}

            {/* AI recap box */}
            <div className="rounded-lg border border-charcoal-700 bg-charcoal-850 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">Your recap</p>
                {provider && (
                  <span className="text-[10px] text-slate-500">
                    {provider === 'gemini-live' ? '✦ AI-generated' : '· Local recap'}
                  </span>
                )}
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">{displaySummary}</p>
              {spokenSummary && (
                <button
                  onClick={() => onSpeak(spokenSummary)}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-lime hover:text-lime-300 transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                  {isAudioPlaying ? 'Playing…' : 'Listen to recap'}
                </button>
              )}
            </div>

            {/* Favourite player note */}
            {catchUpResult.favouritePlayerImpact.length > 0 && (
              <p className="text-xs text-slate-400 leading-relaxed">
                {catchUpResult.favouritePlayerImpact.join(' ')}
              </p>
            )}

            {/* I'm watching now */}
            <button
              onClick={handleImWatchingNow}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-lime/40 px-4 py-3 text-sm font-semibold text-lime transition hover:bg-lime/10 active:scale-95"
            >
              <Eye className="h-4 w-4" /> I&apos;m watching now
            </button>
          </div>
        )}
      </div>
    </CardShell>
  );
}

// ── Shared layout helpers ─────────────────────────────────────────────────────
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-lime/30 bg-charcoal-850/80 p-4 shadow-xl sm:p-5">
      {children}
    </section>
  );
}

function CardTitle() {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-lime">
        <Sparkles className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-base font-bold text-white">Catch Me Up</h2>
        <p className="text-xs text-slate-400">Step away and come back for a smart recap of what you missed.</p>
      </div>
    </div>
  );
}

// ── Local fallback recap ──────────────────────────────────────────────────────
function buildLocalRecap(data: CatchUpData, favouritePlayer: string): string {
  const wicketLine =
    data.wicketsFell > 0
      ? `${data.wicketsFell} wicket${data.wicketsFell > 1 ? 's' : ''} fell: ${data.wicketsList.map((w) => `${w.batsman} dismissed by ${w.bowler}`).join('; ')}.`
      : 'No wickets fell during this period.';

  const boundaryLine = `${data.boundaries.fours} fours and ${data.boundaries.sixes} sixes were hit.`;

  const playerLine =
    data.favouritePlayerImpact.length > 0
      ? data.favouritePlayerImpact.join(' ')
      : `${favouritePlayer} had no recorded contribution in this period.`;

  return [
    `From over ${data.checkpoint.overDisplay} to ${data.currentOverDisplay}, India moved from ${data.checkpoint.scoreDisplay} to ${data.currentScoreDisplay}, adding ${data.runsAdded} runs.`,
    '',
    wicketLine,
    boundaryLine,
    '',
    playerLine,
  ].join('\n');
}
