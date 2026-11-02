'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Bookmark, FastForward, StepForward, Check } from 'lucide-react';

interface SimulatorControlsProps {
  currentBallIndex: number;
  totalBalls: number;
  onNextBall: () => void;
  onNextOver: () => void;
  onJumpToBall: (ballIndex: number) => void;
  onReset: () => void;
  onSaveCheckpoint: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  checkpointOverDisplay: string | null;
}

export function SimulatorControls({
  currentBallIndex,
  totalBalls,
  onNextBall,
  onNextOver,
  onJumpToBall,
  onReset,
  onSaveCheckpoint,
  isAutoPlaying,
  onToggleAutoPlay,
  checkpointOverDisplay,
}: SimulatorControlsProps) {
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = () => {
    onSaveCheckpoint();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const currentOverFormatted = `${Math.floor(currentBallIndex / 6)}.${currentBallIndex % 6}`;

  const presets = [
    { label: 'Powerplay (6.0)', ball: 36 },
    { label: 'Midway (10.0)', ball: 60 },
    { label: 'Turning Point (13.0)', ball: 78 },
    { label: 'Death Overs (16.0)', ball: 96 },
    { label: 'Final Over (19.0)', ball: 114 },
    { label: 'Match Finish', ball: 120 },
  ];

  return (
    <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-4 sm:p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-700/60 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Match Simulator Engine
            {checkpointOverDisplay && (
              <span className="text-[10px] font-mono font-normal text-slate-400 bg-charcoal-850 px-2 py-0.5 rounded border border-charcoal-700">
                Checkpoint: Ov {checkpointOverDisplay}
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400">
            Advance deliveries, auto-simulate, or save checkpoints to test Catch Me Up
          </p>
        </div>

        {/* Checkpoint Save Button */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
            justSaved
              ? 'bg-emerald-500 text-charcoal-950 shadow-md glow-lime'
              : 'bg-charcoal-800 hover:bg-charcoal-750 text-slate-200 border border-charcoal-600 hover:border-lime/40'
          }`}
          title="Save this exact moment as your last-watched checkpoint"
        >
          {justSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-charcoal-950 stroke-[3]" />
              <span>Checkpoint Saved!</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5 text-lime" />
              <span>Save Checkpoint</span>
              <span className="font-mono text-slate-400 font-normal">
                (Ov {currentOverFormatted})
              </span>
            </>
          )}
        </button>
      </div>

      {/* Main Simulation Control Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        {/* Next Ball */}
        <button
          onClick={onNextBall}
          disabled={currentBallIndex >= totalBalls}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-600 hover:border-slate-500 text-white font-medium text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm"
        >
          <StepForward className="w-4 h-4 text-lime" />
          <span>Next Ball</span>
        </button>

        {/* Next Over */}
        <button
          onClick={onNextOver}
          disabled={currentBallIndex >= totalBalls}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-lime hover:bg-lime-400 text-charcoal-950 font-bold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 glow-lime shadow-md"
        >
          <FastForward className="w-4 h-4 fill-charcoal-950" />
          <span>Next Over</span>
        </button>

        {/* Auto Play / Pause */}
        <button
          onClick={onToggleAutoPlay}
          disabled={currentBallIndex >= totalBalls}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-95 border ${
            isAutoPlaying
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
              : 'bg-charcoal-800 hover:bg-charcoal-750 text-slate-200 border-charcoal-600'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4 text-amber-400" />
              <span>Pause Sim</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Auto Simulate</span>
            </>
          )}
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 hover:border-charcoal-600 text-slate-300 text-xs sm:text-sm transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Chase</span>
        </button>
      </div>

      {/* Scrubber slider */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Innings Progress</span>
          <span className="text-white font-semibold">
            {currentBallIndex} / {totalBalls} balls ({currentOverFormatted} ov)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={totalBalls}
          value={currentBallIndex}
          onChange={(e) => onJumpToBall(Number(e.target.value))}
          className="w-full h-2 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-lime"
        />
      </div>

      {/* Quick Jump Scenario Pills */}
      <div className="mt-3.5 pt-3 border-t border-charcoal-700/50 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-slate-400 mr-1 font-medium">Scenarios:</span>
        {presets.map((p) => {
          const isActive = currentBallIndex === p.ball;
          return (
            <button
              key={p.label}
              onClick={() => onJumpToBall(p.ball)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                isActive
                  ? 'bg-lime text-charcoal-950 font-bold shadow-sm glow-lime-subtle'
                  : 'bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 border border-charcoal-700/60'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
