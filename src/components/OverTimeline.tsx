'use client';

import React, { useState } from 'react';
import { BallEvent } from '@/lib/types/cricket';
import { Info, Gauge } from 'lucide-react';

interface OverTimelineProps {
  currentOverBalls?: BallEvent[];
  recentBalls: BallEvent[];
  currentOverNumber: number;
}

export function OverTimeline({
  recentBalls,
  currentOverNumber,
}: OverTimelineProps) {
  const [selectedBall, setSelectedBall] = useState<BallEvent | null>(
    recentBalls.length > 0 ? recentBalls[recentBalls.length - 1] : null
  );

  const getBallStyle = (ball: BallEvent) => {
    if (ball.isWicket) {
      return 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/30 scale-105';
    }
    if (ball.isSix) {
      return 'bg-lime text-charcoal-950 font-black shadow-md glow-lime scale-105';
    }
    if (ball.isBoundary) {
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-bold';
    }
    if (ball.runsScored === 0) {
      return 'bg-charcoal-800 text-slate-400 border border-charcoal-700 font-medium';
    }
    return 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold';
  };

  const getBallText = (ball: BallEvent) => {
    if (ball.isWicket) return 'W';
    if (ball.runsScored === 0) return '•';
    return ball.runsScored.toString();
  };

  return (
    <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Over {currentOverNumber + 1} & Recent Deliveries
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (Click any ball for pitch details)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Wkt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-lime inline-block" /> 6s
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> 4s
          </span>
        </div>
      </div>

      {/* Ball Chips Row */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {recentBalls.length === 0 ? (
          <span className="text-xs text-slate-400 italic py-2">
            Simulation ready. Click &quot;Next Ball&quot; or &quot;Next Over&quot; to begin play.
          </span>
        ) : (
          recentBalls.map((ball) => {
            const isSelected = selectedBall?.id === ball.id;
            return (
              <button
                key={ball.id}
                onClick={() => setSelectedBall(ball)}
                className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-mono transition-all duration-200 cursor-pointer active:scale-95 ${getBallStyle(
                  ball
                )} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-charcoal-900' : 'hover:opacity-90'}`}
                title={`Ball ${ball.overDisplay}: ${ball.runsScored} runs`}
              >
                {getBallText(ball)}
                <span className="absolute -bottom-4 text-[9px] font-mono text-slate-400 select-none">
                  {ball.overDisplay}
                </span>
              </button>
            );
          })
        )}
      </div>

      {/* Selected Ball Commentary Callout */}
      {selectedBall && (
        <div className="mt-5 p-3 rounded-xl bg-charcoal-850/80 border border-charcoal-700/60 flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-lime shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-lime text-xs">
                {selectedBall.overDisplay}
              </span>
              <span className="text-slate-300 font-semibold font-sans">
                {selectedBall.bowlerName} to {selectedBall.batsmanName}
              </span>
              {selectedBall.speedKph && (
                <span className="ml-auto font-mono text-[10px] text-slate-400 flex items-center gap-1 bg-charcoal-800 px-2 py-0.5 rounded">
                  <Gauge className="w-3 h-3 text-slate-400" />
                  {selectedBall.speedKph} km/h
                </span>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed font-sans">
              {selectedBall.commentary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
