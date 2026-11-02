'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MatchCheckpoint,
  UserPreferences,
  CurrentMatchState,
  MatchDetails,
} from '@/lib/types/cricket';
import { getMatchDetailsById } from '@/data/matches/all_matches';
import { RAW_BALLS_DATA } from '@/data/matches/ind_vs_aus_t20';
import { calculateMatchState, getNextBallIndex, getNextOverIndex } from '@/lib/match-engine/engine';
import {
  loadUserPreferences,
  saveUserPreferences,
  loadCheckpoint,
  saveCheckpoint,
  clearCheckpoint,
  loadMatchProgress,
  saveMatchProgress,
  DEFAULT_PREFERENCES,
} from '@/lib/storage/storage';
import { CricketAudioAnnouncer, SpeechState } from '@/lib/audio/speech';
import { Header } from '@/components/Header';
import { MatchCentre } from '@/components/MatchCentre';
import { CleanScoreboard } from '@/components/CleanScoreboard';
import { NavigationTabs, DashboardTab } from '@/components/NavigationTabs';
import { CatchMeUpCard } from '@/components/CatchMeUpCard';
import { ScorecardView } from '@/components/ScorecardView';
import { CommentaryFeed } from '@/components/CommentaryFeed';
import { CollapsibleSimulator } from '@/components/CollapsibleSimulator';
import { PersonalisationModal } from '@/components/PersonalisationModal';
import { AudioVisualizerBar } from '@/components/AudioVisualizerBar';
import { FlaskConical } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'centre' | 'match'>('match');
  const [activeMatchId, setActiveMatchId] = useState('ind-aus-t20-final-2024');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [ballIndex, setBallIndex] = useState(36);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [checkpoint, setCheckpoint] = useState<MatchCheckpoint | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [speechState, setSpeechState] = useState<SpeechState>({ isPlaying: false, isPaused: false, currentText: '' });
  // Increment to force CatchMeUpCard to remount and clear recap state
  const [catchUpKey, setCatchUpKey] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load state on mount / match switch
  useEffect(() => {
    setPreferences(loadUserPreferences());
    setBallIndex(loadMatchProgress(activeMatchId, 36));
    setCheckpoint(loadCheckpoint(activeMatchId));
    setActiveTab('overview');
    setCatchUpKey((k) => k + 1);

    const announcer = CricketAudioAnnouncer.getInstance();
    announcer.onStateChange((newState) => setSpeechState({ ...newState }));
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      announcer.stop();
    };
  }, [activeMatchId]);

  // Persist ball progress whenever it changes
  useEffect(() => {
    saveMatchProgress(activeMatchId, ballIndex);
  }, [activeMatchId, ballIndex]);

  const currentState: CurrentMatchState = calculateMatchState(ballIndex);
  const matchDetails: MatchDetails = getMatchDetailsById(activeMatchId);
  const isDemoMatch = activeMatchId === 'ind-aus-t20-final-2024';

  // ── Simulator controls ─────────────────────────────────────────────────────
  const handleNextBall = useCallback(() => {
    setBallIndex((prev) => getNextBallIndex(prev));
  }, []);

  const handleNextOver = useCallback(() => {
    setBallIndex((prev) => getNextOverIndex(prev));
  }, []);

  const handleJumpToBall = useCallback((target: number) => {
    setBallIndex(Math.max(0, Math.min(target, RAW_BALLS_DATA.length)));
  }, []);

  const handleResetMatch = useCallback(() => {
    setIsAutoPlaying(false);
    setBallIndex(36);
    setCheckpoint(null);
    clearCheckpoint(activeMatchId);
    setCatchUpKey((k) => k + 1);
  }, [activeMatchId]);

  // Advance exactly 2 overs in a single synchronous update (no stale state)
  const handleSimulateWhileAway = useCallback(() => {
    setBallIndex((prev) => {
      const afterFirst = getNextOverIndex(prev);
      const afterSecond = getNextOverIndex(afterFirst);
      return afterSecond;
    });
  }, []);

  // ── Checkpoint ─────────────────────────────────────────────────────────────
  const handleSaveCheckpointFromState = useCallback(() => {
    const state = calculateMatchState(ballIndex);
    const newCheckpoint: MatchCheckpoint = {
      id: `cp-${Date.now()}`,
      matchId: activeMatchId,
      timestamp: Date.now(),
      ballIndex: state.currentBallIndex,
      overDisplay: state.oversFormatted,
      scoreDisplay: `${state.runs}/${state.wickets}`,
      runs: state.runs,
      wickets: state.wickets,
      label: `Over ${state.oversFormatted} (${state.runs}/${state.wickets})`,
    };
    setCheckpoint(newCheckpoint);
    saveCheckpoint(newCheckpoint);
    // Bump key so the CatchMeUpCard resets its internal recap state
    setCatchUpKey((k) => k + 1);
  }, [activeMatchId, ballIndex]);

  // ── Auto-play ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setBallIndex((prev) => {
          if (prev >= RAW_BALLS_DATA.length) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  // ── Audio ──────────────────────────────────────────────────────────────────
  const handleSpeak = (text: string) => CricketAudioAnnouncer.getInstance().speak(text, preferences.speechRate);
  const handlePauseAudio = () => CricketAudioAnnouncer.getInstance().pause();
  const handleResumeAudio = () => CricketAudioAnnouncer.getInstance().resume();
  const handleStopAudio = () => CricketAudioAnnouncer.getInstance().stop();

  const handleSavePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    saveUserPreferences(newPrefs);
  };

  const handleSelectMatchFromCentre = (matchId: string) => {
    setActiveMatchId(matchId);
    setActiveView('match');
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-charcoal-900 font-sans text-slate-100 selection:bg-lime selection:text-charcoal-950">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-7">
        {activeView === 'centre' ? (
          <MatchCentre onSelectMatch={handleSelectMatchFromCentre} activeMatchId={activeMatchId} />
        ) : (
          <div className="space-y-4">
            {/* ── Scoreboard (always visible) ───────────────────────────────── */}
            <CleanScoreboard
              details={matchDetails}
              state={currentState}
              onBackToCentre={() => setActiveView('centre')}
            />

            {/* ── Catch Me Up (always visible, regardless of tab) ──────────── */}
            <CatchMeUpCard
              key={catchUpKey}
              checkpoint={checkpoint}
              currentState={currentState}
              preferences={preferences}
              onSpeak={handleSpeak}
              isAudioPlaying={speechState.isPlaying}
              onSaveNewCheckpoint={handleSaveCheckpointFromState}
              onSimulateWhileAway={handleSimulateWhileAway}
              isDemoMatch={isDemoMatch}
            />

            {/* ── Tab bar ───────────────────────────────────────────────────── */}
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* ── Tab content ───────────────────────────────────────────────── */}
            <div className="animate-fadeIn">
              {activeTab === 'overview' && (
                <OverviewTab
                  currentState={currentState}
                  onViewCommentary={() => setActiveTab('commentary')}
                />
              )}
              {activeTab === 'scorecard' && (
                <ScorecardView state={currentState} details={matchDetails} />
              )}
              {activeTab === 'commentary' && (
                <CommentaryFeed
                  balls={currentState.allBallsBowled}
                  preferences={preferences}
                  onSpeak={handleSpeak}
                />
              )}
            </div>

            {/* Demo controls toggle */}
            {isDemoMatch && (
              <div className="flex justify-center pt-1">
                <button
                  onClick={() => setIsDemoControlsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 transition hover:bg-charcoal-850 hover:text-slate-300"
                >
                  <FlaskConical className="h-3.5 w-3.5" /> Demo controls
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating demo simulator panel */}
      <CollapsibleSimulator
        isOpen={isDemoControlsOpen}
        onToggle={() => setIsDemoControlsOpen(false)}
        currentBallIndex={ballIndex}
        totalBalls={RAW_BALLS_DATA.length}
        onNextBall={handleNextBall}
        onNextOver={handleNextOver}
        onJumpToBall={handleJumpToBall}
        onReset={handleResetMatch}
        onSaveCheckpoint={handleSaveCheckpointFromState}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={() => setIsAutoPlaying((v) => !v)}
        checkpointOverDisplay={checkpoint?.overDisplay ?? null}
      />

      {speechState.isPlaying && (
        <AudioVisualizerBar
          speechState={speechState}
          onPause={handlePauseAudio}
          onResume={handleResumeAudio}
          onStop={handleStopAudio}
        />
      )}

      <PersonalisationModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
      />

      <footer className="border-t border-charcoal-700/50 py-5 text-center text-xs text-slate-600">
        Blink &amp; Miss · Your personal cricket catch-up companion
      </footer>
    </div>
  );
}

// ── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab({
  currentState,
  onViewCommentary,
}: {
  currentState: CurrentMatchState;
  onViewCommentary: () => void;
}) {
  const latestMoments = currentState.allBallsBowled.slice(-5).reverse();

  return (
    <section className="rounded-2xl border border-charcoal-700/60 bg-charcoal-850/50 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Latest moments</h2>
        <button
          onClick={onViewCommentary}
          className="text-xs font-medium text-lime hover:text-lime-400 transition-colors"
        >
          Full commentary →
        </button>
      </div>

      {latestMoments.length === 0 ? (
        <p className="text-sm text-slate-400">Match events will appear here as the demo progresses.</p>
      ) : (
        <div className="space-y-2.5">
          {latestMoments.map((event) => (
            <div
              key={event.id}
              className={`flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                event.isWicket
                  ? 'border-rose-500/30 bg-rose-950/20'
                  : event.isSix
                  ? 'border-lime/20 bg-lime/5'
                  : 'border-charcoal-700/50 bg-charcoal-800/40'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-lime">Over {event.overDisplay}</p>
                <p className="mt-0.5 text-sm text-slate-300 leading-snug">{event.commentary}</p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${
                  event.isWicket
                    ? 'bg-rose-500 text-white'
                    : event.isSix
                    ? 'bg-lime text-charcoal-950'
                    : event.isBoundary
                    ? 'bg-emerald-500 text-charcoal-950'
                    : 'bg-charcoal-800 text-slate-300'
                }`}
              >
                {event.isWicket ? 'W' : event.isSix ? '6' : event.isBoundary ? '4' : `${event.runsScored}r`}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
