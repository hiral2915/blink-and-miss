'use client';

import React from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { SpeechState } from '@/lib/audio/speech';

interface AudioVisualizerBarProps {
  speechState: SpeechState;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export function AudioVisualizerBar({
  speechState,
  onPause,
  onResume,
  onStop,
}: AudioVisualizerBarProps) {
  if (!speechState.isPlaying && !speechState.isPaused) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-bounce-subtle">
      <div className="rounded-2xl glass-panel-highlight border border-lime/40 bg-charcoal-900/95 p-3.5 shadow-2xl flex items-center justify-between gap-3 glow-lime">
        {/* Animated Sound Wave bars */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-lime text-charcoal-950 flex items-center justify-center font-bold">
            <Volume2 className="w-4 h-4 fill-charcoal-950" />
          </div>

          <div className="flex items-end gap-1 h-5 px-1">
            {[40, 75, 100, 60, 90, 45, 80].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-lime transition-all duration-150 ${
                  speechState.isPaused ? 'h-1.5' : 'animate-pulse'
                }`}
                style={{
                  height: speechState.isPaused ? '4px' : `${h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <div className="overflow-hidden max-w-[200px] sm:max-w-xs">
            <div className="text-[11px] font-bold text-lime uppercase tracking-wider">
              {speechState.isPaused ? 'Speech Paused' : 'Playing Audio Commentary'}
            </div>
            <p className="text-xs text-slate-300 truncate">
              {speechState.currentText || 'Cricket Companion Live Voice'}
            </p>
          </div>
        </div>

        {/* Play/Pause/Stop Buttons */}
        <div className="flex items-center gap-1.5">
          {speechState.isPaused ? (
            <button
              onClick={onResume}
              className="p-2 rounded-xl bg-lime hover:bg-lime-400 text-charcoal-950 transition-all active:scale-95"
              title="Resume speech"
            >
              <Play className="w-4 h-4 fill-charcoal-950" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-lime border border-lime/30 transition-all active:scale-95"
              title="Pause speech"
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onStop}
            className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 hover:text-rose-400 border border-charcoal-700 transition-all active:scale-95"
            title="Stop speech"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
