'use client';

import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-700/60 bg-charcoal-900/90 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime/30 bg-charcoal-800 text-lg">
            ⚡
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-black tracking-tight text-white">
              Blink <span className="text-lime">&</span> Miss
            </h1>
            <p className="hidden text-[11px] text-slate-400 sm:block">Never miss the story of the match</p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          aria-label="Open preferences"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal-700 bg-charcoal-850 text-slate-300 transition hover:border-lime/40 hover:text-lime"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
