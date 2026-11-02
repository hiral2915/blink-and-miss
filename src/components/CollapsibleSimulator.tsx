'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Bookmark,
  FastForward,
  StepForward,
  Check,
  X,
  SlidersHorizontal,
} from 'lucide-react';

interface CollapsibleSimulatorProps {
  isOpen: boolean;
  onToggle: () => void;
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

export function CollapsibleSimulator({
  isOpen,
  onToggle,
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
}: CollapsibleSimulatorProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md px-4 sm:px-0 animate-fadeIn">
      <div className="rounded-3xl bg-charcoal-900/95 backdrop-blur-2xl border border-lime/40 p-5 shadow-2xl space-y-4 glow-lime-subtle">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-lime" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Demo Simulation Controls
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-charcoal-800 text-slate-300">
              Ov {currentOverFormatted}
            </span>
          </div>

          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Close Demo Controls"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onNextBall}
            disabled={currentBallIndex >= totalBalls}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-white font-medium text-xs border border-charcoal-600 transition-all disabled:opacity-40 active:scale-95"
          >
            <StepForward className="w-3.5 h-3.5 text-lime" />
            <span>Next Ball</span>
          </button>

          <button
            onClick={onNextOver}
            disabled={currentBallIndex >= totalBalls}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-lime hover:bg-lime-400 text-charcoal-950 font-bold text-xs transition-all disabled:opacity-40 active:scale-95 glow-lime shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5 fill-charcoal-950" />
            <span>Next Over (+6)</span>
          </button>

          <button
            onClick={onToggleAutoPlay}
            disabled={currentBallIndex >= totalBalls}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
              isAutoPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-charcoal-800 hover:bg-charcoal-750 text-slate-200 border-charcoal-600'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Auto-Sim</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto Simulate</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 text-xs border border-charcoal-700 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Chase</span>
          </button>
        </div>

        {/* Checkpoint Save Button */}
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
            justSaved
              ? 'bg-emerald-500 text-charcoal-950 shadow-md'
              : 'bg-charcoal-800 hover:bg-charcoal-750 text-lime border border-lime/30'
          }`}
        >
          {justSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-charcoal-950 stroke-[3]" />
              <span>Checkpoint Saved at Over {currentOverFormatted}!</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5 text-lime" />
              <span>
                Save Checkpoint (Ov {currentOverFormatted})
                {checkpointOverDisplay && (
                  <span className="text-[10px] text-slate-400 font-mono ml-1">
                    • Last: {checkpointOverDisplay}
                  </span>
                )}
              </span>
            </>
          )}
        </button>

        {/* Scrubber slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Innings Delivery Scrubber</span>
            <span className="text-white font-semibold">
              {currentBallIndex} / {totalBalls}b
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={totalBalls}
            value={currentBallIndex}
            onChange={(e) => onJumpToBall(Number(e.target.value))}
            className="w-full h-1.5 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-lime"
          />
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1 pt-1 border-t border-charcoal-700/40">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => onJumpToBall(p.ball)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                currentBallIndex === p.ball
                  ? 'bg-lime text-charcoal-950 font-bold'
                  : 'bg-charcoal-800 text-slate-400 hover:text-white border border-charcoal-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
