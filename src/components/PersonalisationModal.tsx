'use client';

import React, { useState } from 'react';
import { UserPreferences } from '@/lib/types/cricket';
import { PLAYERS_DATABASE } from '@/data/matches/ind_vs_aus_t20';
import { X, Check, Star, Sliders, Volume2, Shield } from 'lucide-react';

interface PersonalisationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSave: (newPrefs: UserPreferences) => void;
}

export function PersonalisationModal({
  isOpen,
  onClose,
  preferences,
  onSave,
}: PersonalisationModalProps) {
  const [team, setTeam] = useState<string>(preferences.favouriteTeam);
  const [player, setPlayer] = useState<string>(preferences.favouritePlayer);
  const [style, setStyle] = useState<'concise' | 'detailed'>(preferences.summaryStyle);
  const [autoSpeech, setAutoSpeech] = useState<boolean>(preferences.autoSpeech);
  const [speechRate, setSpeechRate] = useState<number>(preferences.speechRate);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      favouriteTeam: team,
      favouritePlayer: player,
      summaryStyle: style,
      autoSpeech,
      speechRate,
    });
    onClose();
  };

  const playersList = PLAYERS_DATABASE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-charcoal-900 border border-charcoal-700 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-charcoal-700/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime/20 border border-lime/30 flex items-center justify-center text-lime glow-lime-subtle">
              <Sliders className="w-5 h-5 text-lime" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                Fan Personalisation
              </h2>
              <p className="text-xs text-slate-400">
                Tailor Catch Me Up briefings and AI insights to your loyalty
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Favourite Team */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-lime" />
            Favourite Team
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTeam('IND')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-bold transition-all ${
                team === 'IND'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                  : 'bg-charcoal-850 border-charcoal-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span>India (IND)</span>
              {team === 'IND' && <Check className="w-4 h-4 text-blue-400 ml-auto" />}
            </button>

            <button
              type="button"
              onClick={() => setTeam('AUS')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-bold transition-all ${
                team === 'AUS'
                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300 shadow-sm'
                  : 'bg-charcoal-850 border-charcoal-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span>Australia (AUS)</span>
              {team === 'AUS' && <Check className="w-4 h-4 text-yellow-400 ml-auto" />}
            </button>
          </div>
        </div>

        {/* 2. Favourite Player */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-lime" />
            Favourite Player Spotlight
          </label>
          <select
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="w-full bg-charcoal-850 border border-charcoal-700 focus:border-lime rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all font-sans"
          >
            {playersList.map((p) => (
              <option key={p.id} value={p.name} className="bg-charcoal-900 text-white">
                {p.name} ({p.team} • {p.role})
              </option>
            ))}
          </select>

          {/* Quick select chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Virat Kohli', 'Rohit Sharma', 'Hardik Pandya', 'Pat Cummins', 'Travis Head'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setPlayer(name)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  player === name
                    ? 'bg-lime text-charcoal-950 font-bold glow-lime-subtle'
                    : 'bg-charcoal-800 text-slate-400 hover:text-white border border-charcoal-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Summary Style */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            AI Summary Detail Level
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStyle('concise')}
              className={`p-3 rounded-xl border text-left transition-all ${
                style === 'concise'
                  ? 'bg-lime/10 border-lime text-white glow-lime-subtle'
                  : 'bg-charcoal-850 border-charcoal-700 text-slate-400'
              }`}
            >
              <div className="font-bold text-sm text-white">Concise</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Fast, punchy bullet points. Ideal for glancing.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStyle('detailed')}
              className={`p-3 rounded-xl border text-left transition-all ${
                style === 'detailed'
                  ? 'bg-lime/10 border-lime text-white glow-lime-subtle'
                  : 'bg-charcoal-850 border-charcoal-700 text-slate-400'
              }`}
            >
              <div className="font-bold text-sm text-white">Detailed</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Tactical depth, turning points & full metrics.
              </div>
            </button>
          </div>
        </div>

        {/* 4. Audio Controls */}
        <div className="p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-700/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-lime" />
              <span className="text-xs font-bold text-white">Audio Commentary Speed</span>
            </div>
            <span className="font-mono text-xs text-lime font-bold">{speechRate}x</span>
          </div>

          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-lime"
          />

          <label className="flex items-center gap-2 pt-1 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSpeech}
              onChange={(e) => setAutoSpeech(e.target.checked)}
              className="rounded accent-lime w-4 h-4 cursor-pointer"
            />
            <span>Auto-read Catch Me Up summaries aloud when generated</span>
          </label>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-lime hover:bg-lime-400 text-charcoal-950 font-extrabold text-sm transition-all glow-lime shadow-lg active:scale-95"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
