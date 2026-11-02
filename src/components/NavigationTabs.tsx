'use client';

import React from 'react';
import { LayoutDashboard, FileSpreadsheet, Radio } from 'lucide-react';

export type DashboardTab = 'overview' | 'scorecard' | 'commentary' | 'statistics' | 'ask_ai';

interface TabItem {
  id: DashboardTab;
  label: string;
  icon: React.ElementType;
}

interface NavigationTabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const tabs: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'scorecard', label: 'Scorecard', icon: FileSpreadsheet },
  { id: 'commentary', label: 'Commentary', icon: Radio },
];

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <nav
      aria-label="Match navigation"
      className="flex gap-1 rounded-xl border border-charcoal-700/60 bg-charcoal-850/70 p-1"
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const selected = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            aria-pressed={selected}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              selected
                ? 'bg-lime text-charcoal-950 shadow-sm'
                : 'text-slate-400 hover:bg-charcoal-800 hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.slice(0, 4)}</span>
          </button>
        );
      })}
    </nav>
  );
}
